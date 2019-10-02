var ui = new Ui();


// Send request to server for events
// var eventReq = new XMLHttpRequest();
// eventReq.open('GET', 'http://localhost:9000/.netlify/functions/event');
// // eventReq.open('GET', '/.netlify/functions/event');
// eventReq.responseType = 'json';
// eventReq.onload = function() {
//     var res = eventReq.response;

//     if (res.errors) {
//         console.log(res.errors);
//         return;
//     }

//     var rawEvents = res;

//     console.log('RES:', res);

//     var events = [];
//     for (var i=0; i < rawEvents.length; i++)
//         events.push(new AcmEvent(rawEvents[i]));
    
//     events.sort(function(event1, event2) {
//         if (event1.past && (event1.date > event2.date)) return -1;
//         if (event1.past && (event1.date < event2.date)) return 1;
//     });

//     for (var i=0; i < events.length; i++)
//         ui.addEvent(events[i]);

//     // Initialize the slider only AFTER the events are added to the UI
//     ui.constructSlider('.glide');
// }
// eventReq.send();

fetch('/.netlify/functions/event')
// fetch('http://localhost:9000/.netlify/functions/event')
    .then(res => res.json())
    .then(data => {
        console.log(data);
        
        var rawEvents = data;

        var events = [];
        for (var i=0; i < rawEvents.length; i++)
            events.push(new AcmEvent(rawEvents[i]));
        
        events.sort(function(event1, event2) {
            if (event1.past && (event1.date > event2.date)) return -1;
            if (event1.past && (event1.date < event2.date)) return 1;
        });

        for (var i=0; i < events.length; i++)
            ui.addEvent(events[i]);

        // Initialize the slider only AFTER the events are added to the UI
        ui.constructSlider('.glide');
    });


// Send request to server for board members
var boardReq = new XMLHttpRequest();
// boardReq.open('GET', 'http://localhost:9000/.netlify/functions/board');
boardReq.open('GET', '/.netlify/functions/board');
boardReq.responseType = 'json';
boardReq.onload = function() {
    var res = boardReq.response;

    console.log('RES:', res);

    if (res.errors) {
        console.log(res.errors);
        return;
    }
    
    var rawBoard = res;

    for (var i=0; i < rawBoard.length; i++)
        ui.addMember(rawBoard[i]);
}
boardReq.send();

ui.constructTyped('.header__who');