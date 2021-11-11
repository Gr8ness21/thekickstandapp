const mongoose = require('../db/connection.js');

//when defining constructors capital first letters will be used.
//defining the entities

const CitySchema = mongoose.Schema({
    name: String
});

//creating an API that will take the "City" collection in mongodb
let CityCollection = mongoose.model("City", CitySchema);

// Fuction to get all Cities
function getAllCities() {
    //using mongoose to get all teams
    return CityCollection.find();
}

// Function to create new City
function createNewCity(newCityData){
    return CityCollection.create(newCityData);
}

// Function to get city by Id
function getCityById(cityId) {
    return CityCollection.findById(cityId);
}

// Function to delete team by Id *admin only*
function deleteCityById(cityId) {
    return CityCollection.deleteOne({ _id: cityId });
}

// Function to update city *admin only
function updateCityById(cityId, city) {
    return CityCollection.updateOne({ _id: cityId }, city);
}

// calls all established functions to be exported
module.exports = {
    getAllCities,
    createNewCity,
    getCityById,
    deleteCityById,
    updateCityById
};