import React, { Component } from "react";
import { Redirect, Link } from 'react-router-dom';
import axios from "axios";

class SingleEvent extends Component {
    state = {
        singleEvent: {
            name: '',
            description: '',
            time: '',
            location: ''
        },
        weather: null,
        redirectToHome: false,
        isEditFormDisplayed: false
    }

    getWeather = () => {
        axios.get("/API/weather").then(res => {
            console.log('THE WEATHER SHOULD BE HERE');
            this.setState({ weather: res.data });
        })
    };

    getSingleEvent = () => {
        axios.get(`/API/events/${this.props.match.params.id}`).then(res => {
            console.log(res.data)
            this.setState({ singleEvent: res.data })
        })
    }

    componentDidMount = () => {
        console.log("sup");
        this.getSingleEvent()
        this.getWeather()

    }

    deleteSingleEvent = () => {
        axios.delete(`/API/events/${this.props.match.params.id}`).then(res => {
            this.setState({ redirectToHome: true })
        })
    }

    toggleEditForm = () => {
        this.setState((state, props) => {
            return { isEditFormDisplayed: !state.isEditFormDisplayed }
        })
    }

    handleChange = (e) => {
        const cloneSingleEvent = { ...this.state.singleEvent }
        cloneSingleEvent[e.target.name] = e.target.value
        this.setState({ singleEvent: cloneSingleEvent })
    }

    updateSingleEvent = (e) => {
        e.preventDefault()
        axios
            .put(`/API/events/${this.props.match.params.id}`, {
                name: this.state.singleEvent.name,
                description: this.state.singleEvent.description,
                time: this.state.singleEvent.time,
                location: this.state.singleEvent.location
            })
            .then(res => {
                this.setState({ city: res.data, isEditFormDisplayed: false, redirectToHome: true })
            })
        this.getSingleEvent()
    }

    render() {
        if (this.state.redirectToHome) {
            return (<Redirect to="/events" />)
        }

        return (
            <div className="singleEvent">
                <Link to="/events">Back to Events</Link>

                <button onClick={this.toggleEditForm}>Edit</button>
                {
                    this.state.isEditFormDisplayed
                        ? <form onSubmit={this.updateSingleEvent}>
                            <div>
                                <label htmlFor="name">Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    onChange={this.handleChange}
                                    value={this.state.singleEvent.name}
                                />
                            </div>

                            <button>Update</button>
                        </form>

                        : <div>
                            <div className="singleEventList">
                                Name: {this.state.singleEvent.name}
                                <br></br>
                                Time: {this.state.singleEvent.time}
                                <br></br>
                                Description: {this.state.singleEvent.description}
                                <br></br>
                                Location: {this.state.singleEvent.location}
                            </div>
                            <button onClick={this.deleteSingleEvent}>Delete</button>
                        </div>
                }
                {this.state.weather && <div className="singleEventWeather">{this.state.weather.name} <br></br> {this.state.weather.weather[0].description} </div>}

            </div>
        );
    }
}

export default SingleEvent;