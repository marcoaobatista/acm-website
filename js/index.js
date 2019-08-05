var ui = new Ui();

var rawEvents = [
    {
        'title': 'Event',
        'date': '1995-12-17T03:24:00',
        'location': 'Wilson Hall, Room A101',
        'description': 'Test',
        'image': 'https://dummyimage.com/160x90/000/fff',
        'imageDescription': 'Test image'
    },
    {
        'title': 'Event 2',
        'date': '2020-12-17T03:24:00',
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
