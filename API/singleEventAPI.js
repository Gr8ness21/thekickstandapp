const mongoose = require('../db/connection.js');
const ObjectId = mongoose.Schema.Types.ObjectId;

// Defining the shape of the player object
// Constructors have capital letters instead of camel case
const SingleEventSchema = mongoose.Schema({
    name: String,
    comment: String,
    userId: ObjectId
});

// API that will take the "Single Event" collection in mongo
let SingleEventCollection = mongoose.model("Event", SingleEventSchema);

// Function to Create New event
function createSingleEvent(newSingleEvent, singleEventId) {
    newSingleEvent.singleEventId = singleEventId;
    return SingleEventCollection.create(newSingleEvent);
}

// Fuction to get all Single Events
function getAllSingleEvents() {
    //using mongoose to get all single events
    return SingleEventCollection.find();
}

// Function to Get all single events by Id
function getSingleEventByEventId(seId) {
    return SingleEventCollection.find({ singleEventId: seId });
}

// Function to get single event by Id
function getSingleEventById(singleEventId) {
    return SingleEventCollection.findById(singleEventId);
}

//function to delete single event by Id
function deleteSingleEventById(singleEventId) {
    return SingleEventCollection.deleteOne({ _id: singleEventId });
}


function getSingleEventByEventsId(pId) {
    return SingleEventCollection.find({ userId: seId });
}

// Function to update Single Event
function updateSingleEventById(singleEventId, singleEvent) {
    return SingleEventCollection.updateOne({ _id: singleEventId }, singleEvent);
    //possible bug: not sure if it works
}

// calls all established functions to be exported
module.exports = {
    createSingleEvent,
    getAllSingleEvents,
    getSingleEventByEventId,
    getSingleEventById,
    deleteSingleEventById,
    getSingleEventByEventsId,
    updateSingleEventById
};