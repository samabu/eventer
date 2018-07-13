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
            <div>
                <h1>EVENT CREATOR PAGE</h1>
                <div>
                    Event Name:<br/>
                    <input onChange={ (e) => this.handleChange('input', e.target.value) } type="text" placeholder="Event Name"/><br/>
                    <Link to="/eventinviter"><button onClick={ () => this.createEventer() }>CREATE EVENT</button></Link><br/>
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
