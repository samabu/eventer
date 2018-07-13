import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Events extends Component {
    constructor() {
        super();

        this.state = {
            eventsToDisplay: []
        }
    }

    componentDidMount() {
        this.getEvents();
    }

    getEvents = () => {
        axios.get('/api/events').then( results => {
            this.setState({ eventsToDisplay: results.data });
        })
    }

    mapEvents = () => {
        let key = 0;
        let eventsToShow = this.state.eventsToDisplay.map( (e) => {
            return (
                <div key={key++}>
                    {"Event Name: "}
                    { e.event_name }<br/>
                    {"Event Host: "}
                    { e.username }<br/>
                    <Link to="/eventviewer"><button>GO TO EVENT</button></Link>
                </div>
            )
        })
        return eventsToShow;
    }

    render() {
        this.getEvents();
        return (
            <div>
                <h1>EVENTS: </h1><br/>
                { this.mapEvents() }
            </div>
        )
    }
}

export default Events;