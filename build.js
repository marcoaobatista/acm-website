'use strict';

const fs = require('fs');
const path = require('path');
const fsp = fs.promises;
const process = require('process');
const { copyDir, logErrorAndExit } = require('./util');


async function build()
{
    // Copy `src` to `build`.
    // `build` will be removed if it already exists.
    await copyDir(
            path.join(process.cwd(), 'src'), 
            path.join(process.cwd(), 'build')
        )
        .catch(err => logErrorAndExit(new Error(err)));

    await fsp.mkdir(path.join(process.cwd(), 'build/events'))
        .catch(err => logErrorAndExit(new Error(err)));

    // Read json text and convert to an object.
    const eventContent = require('./content/events.json');

    // Will be used to create event page links in `build/events.html`.
    const eventsMap = {};

    for (let event of eventContent.events)
    {
        // Create event HTML file.
        await createEventPage(event)
            .catch(err => logErrorAndExit(new Error(err)));
        
        const eventDate = new Date(event.date);
        const eventYear = eventDate.getFullYear();

        if (!eventsMap.hasOwnProperty(eventYear))
            eventsMap[eventYear] = {};
        
        // Will be used to create event page links in `build/events.html`.
        eventsMap[eventYear][
            `${eventDate.getMonth()+1}/${eventDate.getDate()} - ${event.title}`
        ] = path.join('events/', path.basename(event.htmlPath));
    }

    // Adds event page links in `build/events.html`.
    await populateEventsMapHtml(eventsMap)
        .catch(err => logErrorAndExit(new Error(err)));
}


// Creates event page in `build/events/`.
// @param {Object}  event
// @param {string}  event.title     Title of event
// @param {string}  event.date      ISO stamp of when event is
// @param {string}  event.location  Actual location of the event
// @param {string}  event.htmlPath  Where event HTML is stored that will 
//                                  replace placeholder in `eventTemplate`
async function createEventPage(event)
{
    // Load event template HTML.
    // Contains placeholders that we will replace with event data.
    const eventTemplate = await fsp.readFile(
            'content/event-template.html',
            { encoding: 'utf-8' }
        )
        .catch(err => logErrorAndExit(new Error(err)));

    // Set to the fresh event template with placeholders.
    let newEventPage = eventTemplate;
    
    // Grab HTML for the `newEventPage` @EVENT placeholder from 
    // `event.htmlPath`.
    const newEventHtml = await fsp.readFile(
            event.htmlPath,
            { encoding: 'utf-8' }
        )
        .catch(err => logErrorAndExit(new Error(err)));
    
    // used for @DATE placeholder
    const dateFormatted = formatDate(new Date(event.date));

    // replace placeholders
    newEventPage = newEventPage.replace(/<!-- @TITLE -->/g, event.title);
    newEventPage = newEventPage.replace(/<!-- @DATE -->/g, dateFormatted);
    newEventPage = newEventPage.replace(/<!-- @EVENT -->/g, newEventHtml);

    const newEventPagePath = path.join(
        process.cwd(),
        'build/events/',
        path.basename(event.htmlPath)
    );

    // writes to `/build/events/<event.htmlPath>.html`
    fsp.appendFile(newEventPagePath, newEventPage)
        .catch(err => logErrorAndExit(new Error(err)));
}


// Adds links to event pages in `build/events.html`.
// @param {Object}  eventsMap       Just console.log to see what's inside
async function populateEventsMapHtml(eventsMap)
{
    let eventsPage = await fsp.readFile(
            'build/events.html',
            { encoding: 'utf-8' }
        )
        .catch(err => logErrorAndExit(new Error(err)));

    // Order by year (number), descending.
    const eventsYearsOrderedDesc = Object.getOwnPropertyNames(eventsMap);
    eventsYearsOrderedDesc.sort((a, b) => b-a);
    
    let eventsMapHtml = '';
    for (let year of eventsYearsOrderedDesc) {
        eventsMapHtml += `<h2 class="events__year">${year}</h2>`;

        // Order by event title (string), descending.
        const eventsOrderedDesc = Object.getOwnPropertyNames(eventsMap[year]);
        eventsOrderedDesc.sort(function (a, b) {
            if (a > b) return -1;
            if (b > a) return 1;
            return 0;
        });

        // Create headings and unordered lists.
        eventsMapHtml += '<ul class="events__list">';
        for (let eventTitle of eventsOrderedDesc) {
            eventsMapHtml += `<li><a href="${eventsMap[year][eventTitle]}">${eventTitle}</a></li>`;
        }
        eventsMapHtml += '</ul>';
    }

    // Replace placeholder.
    eventsPage = eventsPage.replace(/<!-- @EVENTS -->/g, eventsMapHtml);

    fsp.writeFile(path.join(process.cwd(), 'build/events.html'), eventsPage)
        .catch(err => logErrorAndExit(new Error(err)));
}


// Formats a Date object to a pretty string.
// @param  {Date}   d
// @return {string} Formatted date
function formatDate(d)
{
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 
        'August', 'September', 'October', 'November', 'December'
    ];

    d = d.toLocaleString('en-US', {timeZone: 'America/New_York' });

    const date = d.split('/')[1];
    const month = d.split('/')[0] - 1;
    const year = d.split('/')[2].split(',')[0];
    const hours = d.split(' ')[1].split(':')[0];
    const minutes = d.split(' ')[1].split(':')[1];
    const meridiem = d.split(' ')[2];

    let dateSuffix = 'th';
    if (((date % 10) === 1) && (date !== 11)) {
        dateSuffix = 'st';
    } else if (((date % 10) === 2) && (date !== 12)) {
        dateSuffix = 'nd';
    }

    const dateString = months[month] + ' ' + date + dateSuffix + ', ' + year +
        ' at ' + hours + ':' + minutes + '' + meridiem.toLowerCase() + ' EST';

    return dateString;
}

build()
    .catch(err => logErrorAndExit(new Error(err)));


exports.build = build;