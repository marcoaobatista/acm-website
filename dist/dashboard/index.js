var eventDash = new Dashboard('event');

var eventFields = {
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

eventDash.fields = eventFields;

fetch('/.netlify/functions/event')
// fetch('http://localhost:9000/.netlify/functions/event')
    .then(res => res.json())
    .then(data => {
        console.log(data);
        
        for (var i=0; i < data.length; i++) {
            eventDash.items.push(data[i]);
        }
    
        eventDash.constructDash('eventsWrapper');
    })
    .catch(err => console.log(err));

var boardDash = new Dashboard('board');
var boardFields = {
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

boardDash.fields = boardFields;

fetch('/.netlify/functions/board')
// fetch('http://localhost:9000/.netlify/functions/board')
    .then(res => res.json())
    .then(data => {
        for (var i=0; i < data.length; i++) {
            boardDash.items.push(data[i]);
        }
    
        boardDash.constructDash('boardWrapper');
    })
    .catch(err => console.log(err));