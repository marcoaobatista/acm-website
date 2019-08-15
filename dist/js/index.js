var ui = new Ui();

var testImage = 'https://previews.dropbox.com/p/thumb/AAgk_2KZ1o9CdlFv7WSnef53Y_rYn56sMLU7rue1-W6Jp1hm1RTufV8EC3qeXxefHi365L1HFzmH6qxK8mqx4AzTLQ2MkEIms940B-GfckGxoselmzN58wo0sHEMPj2kbTrJTbQIt1krA6sL35QhkqTfdshhfsiREQ9-IZjYKy81wMTuEjy3-Ju15y0P78SEmWe3xTYfpbZU4FG0d3p6gKVKXs64DFjKBEh3NnUTOcIzOJ0w2N5Yo96q0Ls33idJFMWiUj10pLPnRqt3rXpNn81EGAYcnk3FCuJJ8Zy-dlgAWNGB8xXXS2-5W4p7MmIzZfI8chnZbXNN_8aB_VGYFZ61/p.jpeg';

var rawEvents = [
    {
        'title': 'Event',
        'date': '1995-12-17T03:24:00',
        'location': 'Wilson Hall, Room A101',
        'description': 'Test',
        'image': testImage,
        'imageDescription': 'Test image'
    },
    {
        'title': 'Event',
        'date': '1995-12-17T03:24:00',
        'location': 'Wilson Hall, Room A101',
        'description': 'Test',
        'image': testImage,
        'imageDescription': 'Test image'
    },
    {
        'title': 'Event',
        'date': '1995-12-17T03:24:00',
        'location': 'Wilson Hall, Room A101',
        'description': 'Test',
        'image': testImage,
        'imageDescription': 'Test image'
    },
    {
        'title': 'Event',
        'date': '1995-12-17T03:24:00',
        'location': 'Wilson Hall, Room A101',
        'description': 'Test',
        'image': testImage,
        'imageDescription': 'Test image'
    },
    {
        'title': 'Event 2',
        'date': '2020-12-12T00:00:00',
        'location': 'Wilson Hall, Room A101',
        'description': 'Cool description 2',
        'image': testImage,
        'imageDescription': 'Test image'
    },
    {
        'title': 'Event 2',
        'date': '2020-12-12T00:00:00',
        'location': 'Wilson Hall, Room A101',
        'description': 'Cool description 2',
        'image': testImage,
        'imageDescription': 'Test image'
    },
    {
        'title': 'Event 2',
        'date': '2020-12-12T00:00:00',
        'location': 'Wilson Hall, Room A101',
        'description': 'Cool description 2',
        'image': testImage,
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