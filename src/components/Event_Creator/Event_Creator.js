import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getEventID } from '../../ducks/reducer';
import './Event_Creator.css';

class Event_Creator extends Component {
    constructor() {
        super();

        this.state = {
            input: '',
        }
    }

    handleChange = (property, input) => {
        this.setState({ [property]: input })
    }

    createEventer = () => {  
        axios.post('/api/create', this.state).then( res => {
            this.props.getEventID(res.data)
        })
    }

    render() {
        return (
            <div className="event_creator_body">
                <h1>EVENT CREATOR PAGE</h1>
                <div className="event_creator_div">
                    <h2>Event Name:</h2>
                    <input className="event_name_input" onChange={ (e) => this.handleChange('input', e.target.value) } type="text" placeholder="ex. Super Awesome Mega Party"/>
                    <Link to="/eventinviter"><button className="event_creator_button" onClick={ () => this.createEventer() }>CREATE EVENT</button></Link>
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

export default connect( mapStateToProps, { getEventID })(Event_Creator);
