import React, { Component } from 'react';


import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Cities from "./components/Cities"
import SingleCity from "./components/SingleCity"
import Events from "./components/Events"
import SingleEvent from "./components/SingleEvent"
import Nav from "./components/Nav"
import Home from "./components/Home"


class App extends Component {
  render() {

    return (
      <Router>

        <div>


          <Switch>

            <Route exact path="/" component={Home} />
            <Route exact path="/cities" component={Cities} />
            <Route exact path="/events" component={Events} />
            <Route exact path="/cities/:id" component={SingleCity} />
            <Route exact path="/events/:id" component={SingleEvent} />

          </Switch>

          <div>
            <Nav />
          </div>
          
        </div>

      </Router>
    )
  }
}

export default App;
