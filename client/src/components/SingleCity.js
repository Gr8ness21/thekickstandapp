import React, { Component } from "react";
import { Redirect, Link } from 'react-router-dom';
import axios from "axios";

class SingleCity extends Component {
    state = {
        city: {
            name: ''
        },
        resInfo: {
            city: {
                _id: '',
                name: ''
            },
            events: []
        },
        redirectToHome: false,
        isEditFormDisplayed: false
    }




    getcity = () => {
        axios.get(`/API/City/${this.props.match.params.id}`).then(res => {
            console.log(res.data)
            this.setState({ resInfo: res.data })
        })
    }

    componentDidMount = () => {
        this.getcity()

    }

    deleteCity = () => {
        axios.delete(`/API/City/${this.props.match.params.id}`).then(res => {
            this.setState({ redirectToHome: true })
        })
    }

    toggleEditForm = () => {
        this.setState((state, props) => {
            return { isEditFormDisplayed: !state.isEditFormDisplayed }
        })
    }

    handleChange = (e) => {
        const cloneCity = { ...this.state.city }
        cloneCity[e.target.name] = e.target.value
        this.setState({ city: cloneCity })
    }

    updateCity = (e) => {
        e.preventDefault()
        axios
            .put(`/API/City/${this.props.match.params.id}`, {
                name: this.state.city.name,
            })
            .then(res => {
                this.setState({ city: res.data, isEditFormDisplayed: false, redirectToHome: true })
            })
        this.getcity()
    }

    render() {
        if (this.state.redirectToHome) {
            return (<Redirect to="/cities" />)
        }

        return (
            <div className="singleCity">
                <Link to="/cities">Back to Cities</Link>
                <h1>{this.state.resInfo.city.name}</h1>
                <p>{this.state.resInfo.city.description}</p>
                <div className='buttonContain'>
                <button onClick={this.toggleEditForm}>Edit</button>
                <button onClick={this.deleteCity}>Delete</button>
                </div>
                {
                    this.state.isEditFormDisplayed
                        ? <form onSubmit={this.updateCity}>
                            <div>
                                <label htmlFor="name">Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    onChange={this.handleChange}
                                    value={this.state.city.name}
                                />
                            </div>

                            <button>Update</button>
                        </form>
                        : <div>
                            <div>
                                {this.state.city.name}
                            </div>
                           <div>
                               <h3>Checkout What's New!</h3>
                           </div>
                            
                        </div>
                }
                <Link to="/events"><div className="eventsLink">View Events</div></Link>
            </div>
        );
    }
}

export default SingleCity;