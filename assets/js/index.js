var ui = new Ui();

var rawEvents = [
    {
        'title': 'Event',
        'date': '1995-12-17T03:24:00',
        'location': 'Wilson Hall, Room A101',
        'description': 'Test',
        'image': 'assets/images/acm1.jpg',
        'imageDescription': 'Test image'
    },
    {
        'title': 'Event',
        'date': '1995-12-17T03:24:00',
        'location': 'Wilson Hall, Room A101',
        'description': 'Test',
        'image': 'assets/images/acm2.jpg',
        'imageDescription': 'Test image'
    },
    {
        'title': 'Event',
        'date': '1995-12-17T03:24:00',
        'location': 'Wilson Hall, Room A101',
        'description': 'Test',
        'image': 'assets/images/acm1.jpg',
        'imageDescription': 'Test image'
    },
    {
        'title': 'Event',
        'date': '1995-12-17T03:24:00',
        'location': 'Wilson Hall, Room A101',
        'description': 'Test',
        'image': 'assets/images/acm1.jpg',
        'imageDescription': 'Test image'
    },
    {
        'title': 'Event 2',
        'date': '2020-12-12T00:00:00',
        'location': 'Wilson Hall, Room A101',
        'description': 'Cool description 2',
        'image': 'https://dummyimage.com/160x90/555/fff',
        'imageDescription': 'Test image'
    },
    {
        'title': 'Event 2',
        'date': '2020-12-12T00:00:00',
        'location': 'Wilson Hall, Room A101',
        'description': 'Cool description 2',
        'image': 'https://dummyimage.com/160x90/555/fff',
        'imageDescription': 'Test image'
    },
    {
        'title': 'Event 2',
        'date': '2020-12-12T00:00:00',
        'location': 'Wilson Hall, Room A101',
        'description': 'Cool description 2',
        'image': 'https://dummyimage.com/160x90/555/fff',
        'imageDescription': 'Test image'
    }
];

var events = [];
var i = 0;

for (var i=0; i < rawEvents.length; i++) {
    events.push(new AcmEvent(rawEvents[i]));
}

for (var i=0; i < events.length; i++) {
    ui.addEvent(events[i]);
}

// Initialize the slider only AFTER the events are added to the UI
ui.constructSlider('.glide');

var options = {
  strings: ['students', 'developers', 'hobbyists', 'spartans'],
  typeSpeed: 100,
  startDelay: 300,
  backSpeed: 50,
  backDelay: 3000
}

var typed = new Typed(".header__who", options);