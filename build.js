'use strict';

const fs = require('fs');
const path = require('path');
const fsp = fs.promises;
const process = require('process');
const { copyDir } = require('./util');


(async () =>
{
    // copy `src` to `build`
    // `build` will be removed if it already exists
    await copyDir(path.join(process.cwd(), 'src'), path.join(process.cwd(), 'build'))
        .catch(err => new Error(err));

    // read json text and convert to an object
    const eventContent = require('./content/events.json');

    // will be used to create event page links in `build/events.html`
    const eventsMap = {};

    for (let event of eventContent.events)
    {
        // create event HTML file
        await createEventPage(event)
            .catch(err => console.error(err));
        
        const eventDate = new Date(event.date);
        const eventYear = eventDate.getFullYear();

        if (!eventsMap.hasOwnProperty(eventYear))
            eventsMap[eventYear] = {};
        
        // will be used to create event page links in `build/events.html`
        eventsMap[eventYear][
            `${eventDate.getMonth()+1}/${eventDate.getDate()} - ${event.title}`
        ] = path.join('events/', path.basename(event.htmlPath));
    }

    // adds event page links in `build/events.html`
    await populateEventsMapHtml(eventsMap)
        .catch(err => {
            console.error(err);
            process.exit(1);
        });
})();


// Creates event page in `build/events/`.
// @param {Object}  event
// @param {string}  event.title     Title of event
// @param {string}  event.date      ISO stamp of when event is
// @param {string}  event.location  Actual location of the event
// @param {string}  event.htmlPath  Where event HTML is stored that will 
//                                  replace placeholder in `eventTemplate`
async function createEventPage(event)
{
    // load event template HTML
    // contains placeholders that we will replace with event data
    const eventTemplate = await fsp.readFile(
            'content/event-template.html',
            { encoding: 'utf-8' }
        )
        .catch(err => {
            console.error(new Error(err));
            process.exit(1);
        });

    // set to the fresh event template with placeholders
    let newEventPage = eventTemplate;
    
    // grab HTML for the `newEventPage` @EVENT placeholder from `event.htmlPath`
    const newEventHtml = await fsp.readFile(
            event.htmlPath,
            { encoding: 'utf-8' }
        )
        .catch(err => {
            console.error(new Error(err));
            process.exit(1);
        });
    
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
        .catch(err => {
            console.error(new Error(err));
            process.exit(1);
        });
}


// Adds links to event pages in `build/events.html`.
// @param {Object}  eventsMap       Just console.log to see what's inside
async function populateEventsMapHtml(eventsMap)
{
    let eventsPage = await fsp.readFile(
            'build/events.html',
            { encoding: 'utf-8' }
        )
        .catch(err => {
            console.error(new Error(err));
            process.exit(1);
        });

    // order by year (number), descending
    const eventsYearsOrderedDesc = Object.getOwnPropertyNames(eventsMap);
    eventsYearsOrderedDesc.sort((a, b) => b-a);
    
    let eventsMapHtml = '';
    for (let year of eventsYearsOrderedDesc) {
        eventsMapHtml += `<h2 class="events__year">${year}</h2>`;

        // order by event title (string), descending
        const eventsOrderedDesc = Object.getOwnPropertyNames(eventsMap[year]);
        eventsOrderedDesc.sort(function (a, b) {
            if (a > b) return -1;
            if (b > a) return 1;
            return 0;
        });

        // create headings and unordered lists
        eventsMapHtml += '<ul class="events__list">';
        for (let eventTitle of eventsOrderedDesc) {
            eventsMapHtml += `<li><a href="${eventsMap[year][eventTitle]}">${eventTitle}</a></li>`;
        }
        eventsMapHtml += '</ul>';
    }

    // replace placeholder
    eventsPage = eventsPage.replace(/<!-- @EVENTS -->/g, eventsMapHtml);

    fsp.writeFile(path.join(process.cwd(), 'build/events.html'), eventsPage)
        .catch(err => {
            console.error(new Error(err));
            process.exit(1);
        });
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

    const date = d.getDate();
    const month = d.getMonth();
    const year = d.getFullYear();
    const hours = d.getHours();
    const minutes = d.getMinutes();
    
    let dateSuffix = 'th';
    if (((date % 10) === 1) && (date !== 11)) {
        dateSuffix = 'st';
    } else if (((date % 10) === 2) && (date !== 12)) {
        dateSuffix = 'nd';
    }

    let meridiem = 'AM';
    let meridiemHours = hours;
    if (hours >= 12) {
        meridiem = 'PM';
        if (hours !== 12)
            meridiemHours -= 12;
    }
    if (hours === 0)
        meridiemHours = 12;

    let minutesString = String(minutes);
    if (minutesString.length <= 1)
        minutesString = '0' + minutesString;


    const dateString = months[month] + ' ' + date + dateSuffix + ', ' + year +
        ' at ' + meridiemHours + ':' + minutesString + ' ' + meridiem;

    return dateString;
}