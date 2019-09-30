var eventDash = new Dashboard();

var req = new XMLHttpRequest();

// req.open('GET', 'http://localhost:9000/.netlify/functions/event');
req.open('GET', '/.netlify/functions/event');
req.responseType = 'json';

var fields = {
    _id: {
        name: 'ID',
        readOnly: true,
        identifier: true
    },
    title: {
        name: 'Title'
    },
    location: {
        name: 'Location'
    },
    date: {
        name: 'Date'
    },
    description: {
        name: 'Description',
        textarea: true
    },
    date: {
        name: 'Date'
    },
    image: {
        name: 'Image URL'
    }
};

eventDash.fields = fields;
req.onload = function() {
    var res = req.response;

    for (var i=0; i < res.length; i++) {
        eventDash.items.push(res[i]);
    }

    eventDash.construct('wrapper');
}

req.send();