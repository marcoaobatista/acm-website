var eventDash = new Dashboard('event');
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

    eventDash.constructDash('eventsWrapper');
}

req.send();

var boardDash = new Dashboard('board');
var req2 = new XMLHttpRequest();
// req2.open('GET', 'http://localhost:9000/.netlify/functions/board');
req.open('GET', '/.netlify/functions/board');
req2.responseType = 'json';

var fields = {
    _id: {
        name: 'ID',
        readOnly: true,
        identifier: true
    },
    name: {
        name: 'Name'
    },
    title: {
        name: 'Title'
    },
    image: {
        name: 'Image URL'
    }
};

boardDash.fields = fields;
req2.onload = function() {
    var res = req2.response;

    for (var i=0; i < res.length; i++) {
        boardDash.items.push(res[i]);
    }

    boardDash.constructDash('boardWrapper');
}

req2.send();