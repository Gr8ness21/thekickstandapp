const express = require('express');
const logger = require('morgan');
const app = express();

//calling all established functions in respective APIs
const cityAPI = require('./API/cityAPI.js');
const eventsAPI = require('./API/eventsAPI.js');
const singleEventAPI = require('./API/singleEventAPI.js');
const unirest = require('unirest');
const axios = require('axios');

app.use(logger('dev'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Linking CSS
app.use('/client/public', express.static("public"))

app.use(express.static(__dirname + '/client/build/'));




// _____________________________________
//              WEATHER API 
// _____________________________________

app.get("/API/weather", (req, res) => {
    axios.get("https://community-open-weather-map.p.rapidapi.com/weather?id=2172797&units=%22metric%22+or+%22imperial%22&mode=json%2C+html&q=Atlanta,USA",
    {headers: {
      "X-RapidAPI-Host": "community-open-weather-map.p.rapidapi.com",
      "X-RapidAPI-Key": process.env.KICKSTAND_APP_KEY
    }}).then(result => {
      res.send(result.data)
    })
  })


// _____________________________________
//              City Model 
// _____________________________________


app.get('/API/City', (req, res) => {
    cityAPI.getAllCities()
        .then(cities => {
            res.send(cities);
        });
});

// Posting a new City
app.post('/API/City', (req, res) => {
    cityAPI.createNewCity(req.body)
        .then((cities) => {
            res.send(cities);
        });
});

// Deleting a new City
app.delete('/API/City/:cityId', (req, res) => {
    cityAPI.deleteCityById(req.params.cityId)
        .then((cities) => {
            res.send(cities);
        });
});

// Access a single City
app.get('/API/City/:cityId', (req, res) => {
    //gets city
    cityAPI.getCityById(req.params.cityId)
        .then((city) => {

            //UNCOMMENT ONCE EVENTS ARE WORKING

            // cityAPI.getCityById(req.params.cityId)
            //     .then((cities) => {
            //         console.log(city)
                    
            //         console.log(events)
                  
            //         res.send({ city, events });
            //     });
            res.send({city});
        });

});

// Update a City
app.put('/API/City/:cityId', (req, res) => {
    cityAPI.updateCityById(req.params.cityId, req.body)
        .then((city) => {
            res.send(city)
        });
});

// _____________________________________
//              Events List Model 
// _____________________________________

app.get('/API/Events', (req, res) => {
    eventsAPI.getAllEvents()
        .then(events => {
            res.send(events);
        });
});

// Posting a new Event
app.post('/API/Events', (req, res) => {
    eventsAPI.createEvent(req.body)
        .then((events) => {
            res.send(events);
        });
});

// Deleting a Event
app.delete('/API/Events/:eventId', (req, res) => {
    eventsAPI.deleteEventById(req.params.eventId)
        .then((events) => {
            res.send(events);
        });
});

// Grab a single Event Object
app.get('/API/Events/:eventId', (req, res) => {
    //gets events
    eventsAPI.getEventById(req.params.eventId)
        .then(event => {
            res.send(event);
        });
});

// Updating an Event
app.put('/API/Events/:eventId', (req, res) => {
    eventsAPI.updateEventById(req.params.eventId, req.body)
        .then((event) => {
            res.send(event);
        });
});
// _____________________________________
//              Single Event Model 
// _____________________________________

app.get('/API/singleEvent', (req, res) => {
    singleEventAPI.getAllSingleEvents()
        .then(singleEvent => {
            res.send(singleEvent);
        });
});

// Posting a new Event
app.post('/API/singleEvent', (req, res) => {
    singleEventAPI.createSingleEvent(req.body)
        .then((singleEvent) => {
            res.send(singleEvent);
        });
});

// Deleting a Event
app.delete('/API/singleEvent/:singleEventId', (req, res) => {
    singleEventAPI.deleteSingleEventById(req.params.singleEventId)
        .then((singleEvent) => {
            res.send(singleEvent);
        });
});

// Grab a single Event Object
app.get('/API/singleEvent/:singleEventId', (req, res) => {
    //gets single event
    singleEventAPI.getSingleEventByEventId(req.params.singleEventId)
        .then(singleEvent => {
            res.send(singleEvent);
        });
});

// Updating an Event
app.put('/API/singleEvent/:singleEventId', (req, res) => {
    singleEventAPI.updateSingleEventById(req.params.singleEventId, req.body)
        .then((singleEvent) => {
            res.send(singleEvent);
        });
});

//_______________________________________________________________//

app.get('/*', (req,res) => {
    res.sendFile(__dirname + '/client/build/index.html')
   })

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("Magic happening on port " + PORT);
})

