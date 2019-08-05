function Ui() {
    this.events = [];
    this.pastEvents = [];
    this.slider = Object();
}

/*
Adds an event data object to the UI

@param  {AcmEvent}    event
*/
Ui.prototype.addEvent = function(event) {
    if (event.past) {
        // We only want 5 past events to show up at a time
        if (this.pastEvents.length < 5) {
            document.querySelector('.past__events').appendChild(
                this.constructPastEventHtml(event)
            );
            this.pastEvents.push(event);
        }
    } else {
        document.querySelector('.events').appendChild(
            this.constructUpcomingEventHtml(event)
        );
        this.events.push(event);
    }
}

/*
Constructs HTML for upcoming event

@param  {AcmEvent}          event
@return {HTMLDivElement}    HTML that can be appended to the page
*/
Ui.prototype.constructUpcomingEventHtml = function(event) {
    var title = document.createElement('h1');
    title.innerHTML = event.title;
    title.className = 'event__head';

    var date = document.createElement('p');
    date.innerHTML = event.date;
    date.className = 'event__date';

    var location = document.createElement('p');
    date.innerHTML = event.date;
    date.className = 'event__date';

    var description = document.createElement('p');
    description.innerHTML = event.description;
    description.className = 'event__desc';

    var image = document.createElement('img');
    image.src = event.image;
    image.className = 'event__image';
    image.alt = event.imageDescription;

    var eventHtml = document.createElement('div');
    eventHtml.className = 'event';

    eventHtml.appendChild(title);
    eventHtml.appendChild(date);
    eventHtml.appendChild(location);
    eventHtml.appendChild(description);
    eventHtml.appendChild(image);

    return eventHtml;
}

/*
Constructs HTML for past event

@param  {AcmEvent}          event
@return {HTMLDivElement}    HTML that can be appended to the page
*/
Ui.prototype.constructPastEventHtml = function(event) {
    var title = document.createElement('h1');
    title.innerHTML = event.title;
    title.className = 'past-event__head';

    var date = document.createElement('p');
    date.innerHTML = event.date;
    date.className = 'past-event__date';

    var image = document.createElement('img');
    image.src = event.image;
    image.className = 'past-event__image';
    image.alt = event.imageDescription;

    var eventHtml = document.createElement('div');
    eventHtml.className = 'past-event glide__slide';

    eventHtml.appendChild(title);
    eventHtml.appendChild(date);
    eventHtml.appendChild(image);

    return eventHtml;
}

/*
Initializes a slider on the selected element

@param  {String}    elementSelector
*/
Ui.prototype.constructSlider = function(elementSelector) {
    this.slider = new Glide(elementSelector, {
        perView: 1.15,
        focusAt: 'center'
    }).mount();

    var sliderRightArrow = document.querySelector('.glide__arrow--right');
    var sliderLeftArrow = document.querySelector('.glide__arrow--left');

    sliderLeftArrow.style.display = 'none';
    
    var pastEventsAmount = this.pastEvents.length;

    if (pastEventsAmount > 0) {
        sliderRightArrow.style.display = 'block';
    }
    
    var pastEventsAmount = this.pastEvents.length;

    var slideChanged = function() {    
        if (this.slider.index === 0) {
            sliderLeftArrow.style.display = 'none';
        } else if (this.slider.index > 0) {
            sliderLeftArrow.style.display = 'block';
        }

        if (pastEventsAmount > 0) {
            sliderRightArrow.style.display = 'block';
        }

        if ((pastEventsAmount) === this.slider.index) {
            sliderRightArrow.style.display = 'none';
        }
    }

    this.slider.on('run', slideChanged.bind(this));
}
