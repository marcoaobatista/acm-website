'use strict';

const fs = require('fs');
const path = require('path');
const fsp = fs.promises;
const { copyDir, logErrorAndExit } = require('./util');
const exec = require('util').promisify(require('child_process').exec);


async function build()
{
    // Copy `src` to `build`.
    // `build` will be removed if it already exists.
    await copyDir('src', 'build')
        .catch(err => logErrorAndExit(err));

    // Builds `build/css/styles.css` from SASS files.
    await exec('sass build/css/styles.scss build/css/styles.css --style compressed')
        .catch(err => console.error(new Error(err)));

    await fsp.mkdir('build/events')
        .catch(err => logErrorAndExit(new Error(err)));

    // Read json text and convert to an object.
    const eventContent = await fsp.readFile('content/events.json', { encoding: 'utf-8' })
        .then(data => JSON.parse(data))
        .catch(err => logErrorAndExit(new Error(err)));

    // Will be used to create event page links in `build/events.html`.
    const eventsMap = {};

    for (let event of eventContent.events)
    {
        // Create event HTML file.
        await createEventPage(event)
            .catch(err => logErrorAndExit(err));

        const eventDate = new Date(event.date);
        const eventYear = eventDate.getFullYear();

        let eventMonth = eventDate.getMonth() + 1;
        if (eventMonth.toString().length === 1)
        {
            eventMonth = '0' + eventMonth.toString();
        }

        let eventDay = eventDate.getDate();
        if (eventDay.toString().length === 1)
        {
            eventDay = '0' + eventDay.toString();
        }

        if (!eventsMap.hasOwnProperty(eventYear))
		{
            eventsMap[eventYear] = {};
		}

        // Will be used to create event page links in `build/events.html`.
        eventsMap[eventYear][
            `${eventMonth}/${eventDay} - ${event.title}`
        ] = path.join('events/', path.basename(event.htmlPath));
    }

    // Adds event page links in `build/events.html`.
    await populateEventsMapHtml(eventsMap)
        .catch(err => logErrorAndExit(err));
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
    eventsYearsOrderedDesc.sort((a, b) => b - a);

    let eventsMapHtml = '';
    for (let year of eventsYearsOrderedDesc) {
        // add heading for year.
		eventsMapHtml += `<h2 class="events__year">${year}</h2>`;

        // Order by event title (string), descending.
        const eventsOrderedDesc = Object.getOwnPropertyNames(eventsMap[year]);
        eventsOrderedDesc.sort(function (a, b) {
            if (a > b) return -1;
            if (b > a) return 1;
            return 0;
        });

        // Add list of events.
        eventsMapHtml += '<ul class="events__list">';
        for (let eventTitle of eventsOrderedDesc) {
            eventsMapHtml += `<li><a href="${eventsMap[year][eventTitle]}">${eventTitle}</a></li>`;
        }
        eventsMapHtml += '</ul>';
    }

    // Replace placeholder.
    eventsPage = eventsPage.replace(/<!-- @EVENTS -->/g, eventsMapHtml);

    fsp.writeFile('build/events.html', eventsPage)
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

    let date, month, year, hours, minutes, meridiem;
    try {
        d = d.toLocaleString('en-US', {timeZone: 'America/New_York' });
        date = d.split('/')[1];
        month = d.split('/')[0] - 1;
        year = d.split('/')[2].split(',')[0];
        hours = d.split(' ')[1].split(':')[0];
        minutes = d.split(' ')[1].split(':')[1];
        meridiem = d.split(' ')[2];
    } catch (err) {
        logErrorAndExit(new Error('Unable to parse ISO date string in `content/events.json`. It is likely formatted incorrectly or missing.'));
    }
    

    let dateSuffix = 'th';
    if (((date % 10) === 1) && (date !== 11)) {
        dateSuffix = 'st';
    } else if (((date % 10) === 2) && (date !== 12)) {
        dateSuffix = 'nd';
    }

	const dateString = `${months[month]} ${date}${dateSuffix}, ${year} ` +
	`at ${hours}:${minutes}${meridiem.toLowerCase()} EST`;

    return dateString;
}

// An anonymous, asychronous function that is immediately invoked.
(async () => {
	await build()
    	.catch(err => logErrorAndExit(err));
})();


exports.build = build;
