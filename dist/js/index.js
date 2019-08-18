var ui = new Ui();

var rawEvents = [
    {
        'title': 'Hacking Workshop by @amirootyet',
        'date': '2018-03-20T18:30:00',
        'location': '1279 Anthony Hall',
        'description': 'Interested in learning about system flaws and issues? Perhaps you\'d been hacked before and would like to learn more about how security isses arise? We will be having Pranshu Bajpai, a graduate student under Professor Enbody be doing demos showcasing the flaws that exist from everyday software you might encounter.',
        'image': 'https://gallery.mailchimp.com/59eef9f23d14282ba12289188/images/6509eff3-ac46-413d-9893-9aab156e9da6.png',
        'imageDescription': 'Hacking workshop'
    },
    {
        'title': 'Google: Building Your Technical Career',
        'date': '2019-03-13T18:00:00',
        'location': '1145 Engineering Building',
        'description': 'Learn how to maximize each year of school to ensure that you\'re industry-ready for internships and full-time opportunities. Learn tips on updating your resume, communicating effectively with your recruiter, and what you can be doing outside of class to showcase your passions.',
        'image': 'https://gallery.mailchimp.com/59eef9f23d14282ba12289188/images/a344181f-9e43-4d52-ada6-aa2f76f408da.png',
        'imageDescription': 'Building your technical career'
    },
    {
        'title': 'Intro to Developing with Hyperledger Composing',
        'date': '2019-02-13T18:30:00',
        'location': '1260 Anothony Hall',
        'description': 'Hyperledger is a set of software frameworks and tools developed by the Linux Foundation and IBM, and Hyperledger Composer is a specific framework for developing business blockchain networks. We would like to provide a workshop showing participants how to develop business blockchain networks using the Hyperledger Composer web application. All they would need is a laptop and internet connection.',
        'image': 'https://gallery.mailchimp.com/59eef9f23d14282ba12289188/images/753eac06-687b-45c3-8905-b9f33354c273.png',
        'imageDescription': 'Intro to Developing with Hyperledger Composing'
    },
    {
        'title': 'Experience At Ford with Amanda LaBelle',
        'date': '2019-02-06T19:00:00',
        'location': ' 1279 Anthony Hall',
        'description': 'Learn how to maximize each year of school to ensure that you\'re industry-ready for internships and full-time opportunities. Learn tips on updating your resume, communicating effectively with your recruiter, and what you can be doing outside of class to showcase your passions.',
        'image': 'https://gallery.mailchimp.com/59eef9f23d14282ba12289188/images/6006957a-ee32-4968-8ee4-55a75ef2b2da.png',
        'imageDescription': 'Experience At Ford with Amanda LaBelle'
    },
    {
        'title': 'Code Rush: Movie and Pizza Night!',
        'date': '2019-01-26T20:30:00',
        'location': '1279 Anthony Hall',
        'description': 'This event is a screening of the documentary Code Rush. Software engineers from Mozilla will be joining in the event to answer questions on working on Open-Source software! Pizza will be provided.',
        'image': 'https://gallery.mailchimp.com/59eef9f23d14282ba12289188/images/df219bc4-2fd8-4619-811f-016d91ad1686.png',
        'imageDescription': 'Code Rush: Movie and Pizza Night!'
    },
    {
        'title': 'Sparticipation',
        'date': '2019-08-27T16:00:00',
        'location': 'Cherry Lane Field',
        'description': 'Come visit our booth at Sparticipation to learn more about ACM and what you can look forward to throughout the year!',
        'image': 'images/sparticipation.jpg',
        'imageDescription': 'Sparticipation'
    },
    {
        'title': 'CSE Mixer',
        'date': '2019-08-29T19:00:00',
        'location': 'The Hive, Wilson Hall',
        'description': 'Learn more about MSU organizations such as ACM, Women in Computing (WIC), SpartanHackers, and Spartahack.',
        'image': 'images/hive.jpg',
        'imageDescription': 'The Hive at MSU'
    }
];

var rawBoard = [
    {
        'name': 'Justin Newman',
        'title': 'Co-President',
        'image': 'https://dummyimage.com/90x90/000/fff'
    },
    {
        'name': 'Rohit Sen',
        'title': 'Co-President',
        'image': 'https://dummyimage.com/90x90/000/fff'
    },
    {
        'name': 'Kingston Tran',
        'title': 'Secretary',
        'image': 'https://dummyimage.com/90x90/000/fff'
    },
    {
        'name': 'Andrew Kim',
        'title': 'Treasurer',
        'image': 'https://dummyimage.com/90x90/000/fff'
    },
    {
        'name': 'Caleb Kish',
        'title': 'Co-Webmaster',
        'image': 'https://dummyimage.com/90x90/000/fff'
    },
    {
        'name': 'Nahom Ghebredngl',
        'title': 'Co-Webmaster',
        'image': 'https://dummyimage.com/90x90/000/fff'
    },
    {
        'name': 'Kevin Le',
        'title': 'Social Media',
        'image': 'https://dummyimage.com/90x90/000/fff'
    }
]

var events = [];
var i = 0;

for (var i=0; i < rawEvents.length; i++)
    events.push(new AcmEvent(rawEvents[i]));

for (var i=0; i < events.length; i++)
    ui.addEvent(events[i]);

for (var i=0; i < rawBoard.length; i++)
    ui.addMember(rawBoard[i]);

ui.constructTyped('.header__who');

// Initialize the slider only AFTER the events are added to the UI
ui.constructSlider('.glide');

ui.initializeLightbox();