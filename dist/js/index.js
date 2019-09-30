var ui = new Ui();

// var rawEvents = [
//     {
//         title: 'Microsoft Tech Talk',
//         date: '2019-09-17T18:00:00',
//         location: '1225 Engineering Building',
//         description: 'Principal Engineer of Microsoft’s “AI for Earth” group, Jennifer Marsman is coming to MSU to talk about AI for Earth. Here is an abstract:<br><br>The AI for Earth program applies machine learning and data science to hard challenges in agriculture, water, climate, and biodiversity.  In this talk, we will discuss how the AI for Earth team, Microsoft Research, and AI for Earth grant recipients are using machine learning to enable precision agriculture, to predict outbreaks of disease, to detect poachers in real time, and to classify animals for conservation.  Finally, we will briefly provide details on the AI for Earth grant program to obtain resources for everyone to work on these challenges.',
//         image: 'https://i.imgur.com/jwHTQ7S.jpg',
//         imageDescription: ''
//     },
//     {
//         title: 'Hacking Workshop by @amirootyet',
//         date: '2018-03-20T18:30:00',
//         location: '1279 Anthony Hall',
//         description: 'Interested in learning about system flaws and issues? Perhaps you\'d been hacked before and would like to learn more about how security isses arise? We will be having Pranshu Bajpai, a graduate student under Professor Enbody be doing demos showcasing the flaws that exist from everyday software you might encounter.',
//         image: 'https://i.imgur.com/phKqd6c.png',
//         imageDescription: 'Hacking workshop'
//     },
//     {
//         title: 'Google: Building Your Technical Career',
//         date: '2019-03-13T18:00:00',
//         location: '1145 Engineering Building',
//         description: 'Learn how to maximize each year of school to ensure that you\'re industry-ready for internships and full-time opportunities. Learn tips on updating your resume, communicating effectively with your recruiter, and what you can be doing outside of class to showcase your passions.',
//         image: 'https://i.imgur.com/IZytGCF.png',
//         imageDescription: 'Building your technical career'
//     },
//     {
//         title: 'Intro to Developing with Hyperledger Composing',
//         date: '2019-02-13T18:30:00',
//         location: '1260 Anothony Hall',
//         description: 'Hyperledger is a set of software frameworks and tools developed by the Linux Foundation and IBM, and Hyperledger Composer is a specific framework for developing business blockchain networks. We would like to provide a workshop showing participants how to develop business blockchain networks using the Hyperledger Composer web application. All they would need is a laptop and internet connection.',
//         image: 'https://i.imgur.com/NDo1jr5.png',
//         imageDescription: 'Intro to Developing with Hyperledger Composing'
//     },
//     {
//         title: 'Experience At Ford with Amanda LaBelle',
//         date: '2019-02-06T19:00:00',
//         location: ' 1279 Anthony Hall',
//         description: 'Learn how to maximize each year of school to ensure that you\'re industry-ready for internships and full-time opportunities. Learn tips on updating your resume, communicating effectively with your recruiter, and what you can be doing outside of class to showcase your passions.',
//         image: 'https://i.imgur.com/8WoCQXU.png',
//         imageDescription: 'Experience At Ford with Amanda LaBelle'
//     },
//     {
//         title: 'Code Rush: Movie and Pizza Night!',
//         date: '2019-01-26T20:30:00',
//         location: '1279 Anthony Hall',
//         description: 'This event is a screening of the documentary Code Rush. Software engineers from Mozilla will be joining in the event to answer questions on working on Open-Source software! Pizza will be provided.',
//         image: 'https://i.imgur.com/k47E66z.jpg',
//         imageDescription: 'Code Rush: Movie and Pizza Night!'
//     },
//     {
//         title: 'Sparticipation',
//         date: '2019-08-27T16:00:00',
//         location: 'Cherry Lane Field',
//         description: 'Come visit our booth at Sparticipation to learn more about ACM and what you can look forward to throughout the year!',
//         image: 'https://i.imgur.com/hkzECtF.jpg',
//         imageDescription: 'Sparticipation'
//     },
//     {
//         title: 'CSE Mixer',
//         date: '2019-08-29T19:00:00',
//         location: 'The Hive, Wilson Hall',
//         description: 'Learn more about MSU organizations such as ACM, Women in Computing (WIC), SpartanHackers, and Spartahack.',
//         image: 'https://i.imgur.com/TpIKVPW.jpg',
//         imageDescription: 'The Hive at MSU'
//     },
//     {
//         title: 'ACM Elections',
//         date: '2019-09-25T18:00:00',
//         location: '1260 Anthony Hall',
//         description: 'It\'s that time of the year to fill ACM board positions, and whether you\'re interested in joining the board or just want to be a part of the voting process, feel free to join us on September 25th.<br><br>Current positions that need to be filled: <br>Co-President <br>Co-President <br>Event Manager <br>Marketing <br>Treasurer <br>Webmaster <br>Secretary',
//         image: 'https://i.imgur.com/R7hIzHi.jpg',
//         imageDescription: 'ACM Elections'
//     },
//     {
//         title: 'Panda Express Fundraiser',
//         date: '2019-10-01T12:00:00',
//         location: 'International Center',
//         description: 'Do you like Panda Express? Want to support ACM? Stop by the International Center food court and grab a flyer from us; when you order something from Panda Express with the flyer, 20% goes towards ACM. Flyers will be handed out from 12-5pm.',
//         image: 'https://i.imgur.com/MqJ4Xqz.jpg',
//         imageDescription: 'Panda Express Fundraiser'
//     },
//     {
//         title: 'Atomic Object: A Day in the Life of an Atomic Developer',
//         date: '2019-10-15T18:00:00',
//         location: '1345 Engineering Building',
//         description: 'What\'s it like to work at a small custom software consultancy? Join me to learn about our favorite tools, workplace, culture, and team process. We\'ll discuss what makes a consultancy an especially great place to start a career.',
//         image: 'https://i.imgur.com/aDjK8gG.jpg',
//         imageDescription: 'Panda Express Fundraiser'
//     },
//     {
//         title: 'Atomic Object: Git for Everyday Development',
//         date: '2019-10-22T18:00:00',
//         location: '1345 Engineering Building',
//         description: 'Git is one of the most common software development tools in the industry. It’s used by developers every day, but it often isn’t taught in college. This hands-on workshop will give you the foundational skills necessary to start using Git in your classwork and projects. Join us to “git” ready for internships and beyond!',
//         image: 'https://i.imgur.com/aDjK8gG.jpg',
//         imageDescription: 'Panda Express Fundraiser'
//     }
// ];

var rawBoard = [
    {
        name: 'Justin Newman',
        title: 'Co-President',
        image: 'https://dummyimage.com/90x90/000/fff'
    },
    {
        name: 'Rohit Sen',
        title: 'Co-President',
        image: 'https://dummyimage.com/90x90/000/fff'
    },
    {
        name: 'Kingston Tran',
        title: 'Secretary',
        image: 'https://dummyimage.com/90x90/000/fff'
    },
    {
        name: 'Andrew Kim',
        title: 'Treasurer',
        image: 'https://dummyimage.com/90x90/000/fff'
    },
    {
        name: 'Caleb Kish',
        title: 'Co-Webmaster',
        image: 'https://dummyimage.com/90x90/000/fff'
    },
    {
        name: 'Nahom Ghebredngl',
        title: 'Co-Webmaster',
        image: 'https://dummyimage.com/90x90/000/fff'
    },
    {
        name: 'Kevin Le',
        title: 'Social Media',
        image: 'https://dummyimage.com/90x90/000/fff'
    },
    {
        name: 'Sebnem Onsay',
        title: 'Faculty Advisor',
        image: 'https://dummyimage.com/90x90/000/fff'
    }
]

var req = new XMLHttpRequest();
req.open('GET', '/.netlify/functions/event');
req.responseType = 'json';
req.onload = function() {
    var res = req.response;
    
    if (res.errors) {
        console.log(res.errors);
    } else {
        var rawEvents = res;

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
    }
}
req.send();

// var events = [];

// for (var i=0; i < rawEvents.length; i++)
//     events.push(new AcmEvent(rawEvents[i]));

// events.sort(function(event1, event2) {
//     if (event1.past && (event1.date > event2.date)) return -1;
//     if (event1.past && (event1.date < event2.date)) return 1;
// });

// for (var i=0; i < events.length; i++)
//     ui.addEvent(events[i]);

for (var i=0; i < rawBoard.length; i++)
    ui.addMember(rawBoard[i]);

ui.constructTyped('.header__who');

