var today = new Date();

/*
For creating an event data object

@param  {Object}    event
@param  {String}    event.title
@param  {String}    event.date
@param  {String}    event.location
@param  {String}    event.description
@param  {String}    event.image
@param  {String}    event.imageDescription
*/
function AcmEvent(event) {
    this.title = event.title;
    this.date = new Date(event.date);
    this.location = event.location;
    this.description = event.description;
    this.image = event.image;
    this.imageDescription = event.imageDescription;
    

    var dayAhead = new Date(this.date.getTime());
    dayAhead.setDate(dayAhead.getDate() + 1);

    this.past = (dayAhead < today);
}
