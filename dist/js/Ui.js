function Ui() {
    this.events = [];
    this.pastEvents = [];
    this.slider = {};
}

/* Adds an event data object to the UI
@param  {AcmEvent}    event */
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
        var eventsPlaceholder = document.querySelector('.events__placeholder');
        var eventsPlaceholderStyles = window.getComputedStyle(eventsPlaceholder);
        
        if (eventsPlaceholderStyles.getPropertyValue('display') === 'block') {
            eventsPlaceholder.style.display = 'none';
        }
        
        document.querySelector('.events__wrapper').appendChild(
            this.constructUpcomingEventHtml(event)
        );
        this.events.push(event);
    }
}

/* Adds a board member to the UI
@param  {AcmEvent}    event */
Ui.prototype.addMember = function(member) {
    var memberHtml = this.constructMemberHtml(member);

    document.querySelector('.board__wrapper').appendChild(memberHtml);
}

/* Constructs HTML for upcoming event
@param  {AcmEvent}          event
@return {HTMLDivElement}    HTML that can be appended to the page */
Ui.prototype.constructUpcomingEventHtml = function(event) {
    var close = document.createElement('div');
    close.className = 'event__close';

    var closeIcon = document.createElement('i');
    closeIcon.className = 'fas fa-times';

    close.appendChild(closeIcon);
    
    var title = document.createElement('h1');
    title.innerHTML = event.title;
    title.className = 'event__head';

    var date = document.createElement('p');
    date.innerHTML = '<i class="far fa-calendar-alt"></i>' + this.formatDate(event.dateString, false);
    date.className = 'event__date';

    var location = document.createElement('p');
    location.innerHTML = '<i class="fas fa-map-marked-alt"></i>' + event.location;
    location.className = 'event__location';

    var description = document.createElement('p');
    description.innerHTML = event.description;
    description.className = 'event__desc';

    var image = document.createElement('div');
    image.className = 'event__image';
    image.alt = event.imageDescription;
    image.style.backgroundImage = 'url(' + event.image + ')';
    image.style.backgroundRepeat = 'no-repeat';
    image.style.backgroundSize = 'cover';

    var infoButton = document.createElement('button');
    infoButton.className = 'event__button';
    infoButton.innerHTML = 'More info';

    var eventHtmlWrapper = document.createElement('div');
    eventHtmlWrapper.className = 'event__wrapper';

    var eventHtml = document.createElement('div');
    eventHtml.className = 'event';

    eventHtmlWrapper.appendChild(image);
    eventHtmlWrapper.appendChild(title);
    eventHtmlWrapper.appendChild(date);
    eventHtmlWrapper.appendChild(location);    
    eventHtmlWrapper.appendChild(description);
    eventHtmlWrapper.appendChild(infoButton);

    eventHtml.appendChild(eventHtmlWrapper);
    
    var eventsWrapper = document.querySelector('.events__wrapper');
    infoButton.addEventListener('click', function() {
        var newNode = eventHtml.cloneNode(true);

        var close = document.createElement('div');
        close.className = 'event__close';
        var closeIcon = document.createElement('i');
        closeIcon.className = 'fas fa-times';
        close.appendChild(closeIcon);
        newNode.firstChild.insertBefore(close, newNode.firstChild.firstChild);

        var imageFull = document.createElement('img');
        imageFull.className = 'event__image-full';
        imageFull.alt = event.imageDescription;
        imageFull.src = event.image;
        newNode.firstChild.insertBefore(imageFull, newNode.firstChild.children[1]);

        var description = newNode.firstChild.children[6];
        var button = newNode.firstChild.children[0];
        var image = newNode.firstChild.children[2];
        var infoButton = newNode.firstChild.children[7];

        image.style.display = 'none';
        infoButton.style.display = 'none';

        newNode.style.position = 'fixed';
        newNode.style.borderRadius = '0px';
        newNode.style.margin = '0';
        newNode.style.overflowY = 'scroll';
        newNode.style.overflowX = 'hidden';
        document.body.style.overflow = 'hidden';

        eventsWrapper.appendChild(newNode);

        eventHtml.style.visibility = 'hidden';

        setTimeout(function() {
            button.style.display = 'block';
            newNode.style.width = '100vw';
            newNode.style.height = '100vh';
            newNode.style.top = 0;
            newNode.style.left = 0;
            
            newNode.style.paddingTop = '36px';
            
            newNode.style.zIndex = '1000000';
            description.style.display = 'block';
            description.style.opacity = '1';

        }, 10);

        button.addEventListener('click', function() {
            eventsWrapper.removeChild(eventsWrapper.lastChild);
            eventHtml.style.visibility = 'visible';
            document.body.style.overflowY = 'scroll';
        });
    });

    return eventHtml;
}

/* Constructs HTML for past event
@param  {AcmEvent}          event
@return {HTMLDivElement}    HTML that can be appended to the page */
Ui.prototype.constructPastEventHtml = function(event) {
    var title = document.createElement('h1');
    title.innerHTML = event.title;
    title.className = 'pastEvent__head';

    var date = document.createElement('p');
    date.innerHTML = '<i class="far fa-calendar-alt"></i>' + this.formatDate(event.dateString, true);
    date.className = 'pastEvent__date';

    var description = document.createElement('p');
    description.innerHTML = event.description;
    description.className = 'pastEvent__desc';

    var image = document.createElement('div');
    image.className = 'pastEvent__image';
    image.alt = event.imageDescription;
    image.style.backgroundImage = 'url(' + event.image + ')';

    var infoButton = document.createElement('button');
    infoButton.className = 'pastEvent__button';
    infoButton.innerHTML = 'More info';

    var eventHtml = document.createElement('div');
    eventHtml.className = 'pastEvent glide__slide';

    var eventHtmlWrapper = document.createElement('div');
    eventHtmlWrapper.className = 'pastEvent__wrapper';

    eventHtmlWrapper.appendChild(image);
    eventHtmlWrapper.appendChild(title);
    eventHtmlWrapper.appendChild(date);
    eventHtmlWrapper.appendChild(description);
    eventHtmlWrapper.appendChild(infoButton);

    eventHtml.appendChild(eventHtmlWrapper);

    var eventsWrapper = document.querySelector('.past');
    infoButton.addEventListener('click', function() {
        var newNode = eventHtml.cloneNode(true);
        
        var close = document.createElement('div');
        close.className = 'pastEvent__close';
        var closeIcon = document.createElement('i');
        closeIcon.className = 'fas fa-times';
        close.appendChild(closeIcon);
        newNode.firstChild.insertBefore(close, newNode.firstChild.firstChild);

        var imageFull = document.createElement('img');
        imageFull.className = 'pastEvent__image-full';
        imageFull.alt = event.imageDescription;
        imageFull.src = event.image;
        newNode.firstChild.insertBefore(imageFull, newNode.firstChild.children[1]);

        var description = newNode.firstChild.children[5];
        var closeButton = newNode.firstChild.children[0];
        var image = newNode.firstChild.children[2];
        var infoButton = newNode.firstChild.children[6];

        infoButton.style.display = 'none';
        image.style.display = 'none';

        newNode.style.overflowY = 'auto';
        newNode.style.overflowX = 'auto';
        newNode.style.position = 'fixed';
        newNode.style.top = 0;
        newNode.style.left = 0;
        newNode.style.borderRadius = '0px';
        newNode.style.margin = '0';
        document.body.style.overflowY = 'hidden';

        eventsWrapper.appendChild(newNode);

        eventHtml.style.visibility = 'hidden';

        closeButton.style.display = 'block';
        newNode.style.width = '100vw';
        newNode.style.height = '100vh';
        newNode.style.top = 0;
        newNode.style.left = 0;
        
        newNode.style.paddingTop = '36px';
        
        newNode.style.zIndex = '1000000';
        description.style.display = 'block';
        description.style.opacity = '1';

        closeButton.addEventListener('click', function() {
            eventsWrapper.removeChild(eventsWrapper.lastChild);
            eventHtml.style.visibility = 'visible';
            document.body.style.overflowY = 'auto';
        });
    });

    return eventHtml;
}

/* Constructs HTML for board member
@param  {AcmEvent}          event
@return {HTMLDivElement}    HTML that can be appended to the page */
Ui.prototype.constructMemberHtml = function(member) {
    var top = document.createElement('div');
    top.className = 'member__top';

    var image = document.createElement('img');
    image.className = 'member__image';
    image.src = member.image;

    top.appendChild(image);

    var head = document.createElement('h2');
    head.className = 'member__head';
    head.innerHTML = member.name;

    var title = document.createElement('p');
    title.className = 'member__title';
    title.innerHTML = member.title;

    var memberHtml = document.createElement('div');
    memberHtml.className = 'member';

    memberHtml.appendChild(top);
    memberHtml.appendChild(head);
    memberHtml.appendChild(title);

    return memberHtml;
}

/* Initializes a slider on the selected element
@param  {String}    elementSelector */
Ui.prototype.constructSlider = function(elementSelector) {
    this.slider = new Glide(elementSelector, {
        perView: 3.15,
        gap: 40,
        focusAt: 'center',
        breakpoints: {
            1400: {
                perView: 2.15,
                gap: 30
            },
            675: {
                perView: 1.15,
                gap: 20
            }
        }
    }).mount();

    var sliderRightArrow = document.querySelector('.glide__arrow--right');
    var sliderLeftArrow = document.querySelector('.glide__arrow--left');

    sliderLeftArrow.style.display = 'none';
    
    var pastEventsAmount = this.pastEvents.length;

    if (pastEventsAmount > 0) {
        sliderRightArrow.style.display = 'block';
    }
    
    var pastEventsAmount = this.pastEvents.length;

    if (this.slider.index === pastEventsAmount-1) {
        sliderRightArrow.style.display = 'none';
    }

    var slideChanged = function() {
        if (this.slider.index === 0) {
            sliderLeftArrow.style.display = 'none';
        } else if (this.slider.index > 0) {
            sliderLeftArrow.style.display = 'block';
        }

        if (pastEventsAmount > 1) {
            sliderRightArrow.style.display = 'block';
        } else {
            sliderRightArrow.style.display = 'none';
        }

        if (pastEventsAmount-1 === this.slider.index) {
            sliderRightArrow.style.display = 'none';
        }

        // var pastSection = document.querySelector('.past');

        // console.log(this.pastEvents[this.slider.index].image);

        // pastSection.style.background = 'radial-gradient(hsla(240, 10%, 30%, 1), hsla(240, 10%, 30%, 0.8) ), url(' + 
        //                                this.pastEvents[this.slider.index].image + ')';
        // pastSection.style.backgroundSize = 'cover';
        // pastSection.style.backgroundRepeat = 'no-repeat';
    }

    this.slider.on('run', slideChanged.bind(this));
}

/* Formats raw date that is displayed in event card
@param  {Date}              d
@return {String}            Formatted date string */
Ui.prototype.formatDate = function(d, isPast) {
    var months = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 
        'August', 'September', 'October', 'November', 'December'
    ];

    console.log(d);

    var date = d.split('/')[1];
    var month = d.split('/')[0];
    var year = d.split('/')[2].split(',')[0];
    var hours = d.split('/')[2].split(' ')[1].split(':')[0];
    var minutes = d.split('/')[2].split(' ')[1].split(':')[1];
    var meridiem = d.split('/')[2].split(' ')[2];

    console.log(meridiem);
    
    var dateSuffix = 'th';
    if (((date % 10) === 1) && (date !== 11)) {
        dateSuffix = 'st';
    } else if (((date % 10) === 2) && (date !== 12)) {
        dateSuffix = 'nd';
    }

    var minutesString = String(minutes);
    if (minutesString.length <= 1)
        minutesString = '0' + minutesString;


    var dateString = months[month] + ' ' + date + dateSuffix + 
                     ', ' + year;
    
    if (!isPast)
        dateString += ' at ' + 
        hours + ':' + minutesString + ' ' + meridiem;

    return dateString;
}

/* Initializes dynamic "typed" text on param element
@param  {String}             element */
Ui.prototype.constructTyped = function(element) {
    var typedOptions = {
        strings: ['students', 'developers', 'hobbyists', 'spartans'],
        typeSpeed: 100,
        startDelay: 300,
        backSpeed: 50,
        backDelay: 3000,
        loop: true
    }
    
    new Typed(element, typedOptions);
}