import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserData } from '../../ducks/reducer';
import './Events.css';

class Events extends Component {
    constructor() {
        super();

        this.state = {
            eventsToDisplay: []
        }
    }

    componentDidMount() {
        this.getEvents();
        axios.get('/api/user-data').then(res => {
            this.props.getUserData(res.data)
        })
    }

    getEvents = () => {
        axios.get('/api/events').then( results => {
            this.setState({ eventsToDisplay: results.data });
        })
    }

    deleteEvent = (event, i) => {
        if (this.props.user.user.username === event.username) {
            axios.delete(`/api/deleteevent/${event.event_id}`)
            .then(this.getEvents())
        }
        else {
            axios.delete(`/api/deleteinvite/${event.event_id}`)
            .then(this.getEvents())
        }
    }

    mapEvents = () => {
        let key = 0;
        let eventsToShow = this.state.eventsToDisplay.map( (e, i) => {
            return (
                <div className="single_event" key={key++}>
                    <div>{"Event Name: "}
                    { e.event_name }</div>
                    <div>{"Event Host: "}
                    { e.username }</div>
                    <div>
                            <Link to="/eventviewer"><button className="go_to_event_button">GO TO EVENT</button></Link>
                            <button onClick={ () => this.deleteEvent(e, i) } className="delete_event_button">DELETE EVENT</button>
                    </div>
                </div>
            )
        })
        return eventsToShow;
    }

    render() {
        this.getEvents();
        return (
            <div className="events_body">
                <h1>YOUR EVENTS:</h1>
                <div className="events_list">
                    { this.mapEvents() }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state
    }
}

export default connect( mapStateToProps, { getUserData })(Events);