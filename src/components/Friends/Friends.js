import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFriends } from '../../ducks/reducer';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Friends.css';

class Friends extends Component {

    componentDidMount() {
        axios.get('/api/friends').then(res => {            
            this.props.getFriends(res.data)
        })
    }

    mapFriends() {
        let key = 0;
        let friendsToDisplay = this.props.user.friends.map( (e) => {
            return(
                <div className="actual_friends" key={ key++ }>
                    { e.username }<br/>
                    <img src={ e.profile_pic } alt="friend"/><br/>
                </div>
            )})
        return friendsToDisplay;
    }

    render() {
        return (
            <div className="friends_body">
                <div className="friend_buttons">
                    <Link to="/addfriend"><button className="friend_options_buttons">ADD NEW FRIEND</button></Link>
                    <Link to="/friendrequests"><button className="friend_options_buttons">SEE FRIEND REQUESTS</button></Link>
                </div>
                <div className="friend_heading">Friends ({ this.props.user.friends.length }):<br/></div>
                <div className="friends">  
                    { this.mapFriends() }
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

export default connect( mapStateToProps, { getFriends })(Friends);