const mongoose = require('../db/connection.js');
const ObjectId = mongoose.Schema.Types.ObjectId;

// Defining the shape of the event object
// Constructors have capital letters instead of camel case
const EventsSchema = mongoose.Schema({
    name: String,
    description: String,
    time: String,
    location: String,
    eventId: ObjectId
});

// API that will take the "city" collection in mongo
let EventsCollection = mongoose.model("Events", EventsSchema);

// Function to Create New events
function createEvent(newEvent, eventId) {
    newEvent.eventId = eventId;
    // newEvent.userId = userId;
    return EventsCollection.create(newEvent);
}

// Fuction to get all Events
function getAllEvents() {
    //using mongoose to get all events
    return EventsCollection.find();
}

// Function to Get all events by Id
function getAllEventsByEventId(eId) {
    return EventsCollection.find({ userId: eId });
}

// Function to get event by Id
function getEventById(eventId) {
    return EventsCollection.findById(eventId);
}

//function to delete event by Id
function deleteEventById(eventId) {
    return EventsCollection.deleteOne({ _id: eventId });
}


function getEventsByCityId(eId) {
    return EventsCollection.find({ userId: eId });
}

// Function to update events
function updateEventById(eventId, event) {
    return EventsCollection.updateOne({ _id: eventId }, event);
}

// calls all established functions to be exported
module.exports = {
    createEvent,
    getAllEvents,
    getAllEventsByEventId,
    getEventById,
    deleteEventById,
    getEventsByCityId,
    updateEventById
};