import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFriends } from '../../ducks/reducer';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Friends.css';

class Friends extends Component {
    constructor() {
        super();

        this.state = {
            friends: []
        }
    }

    componentDidMount() {
        this.getFriends()
    }

    getFriends = () => {
        axios.get('/api/friends').then(res => {            
            this.props.getFriends(res.data)
            this.setState({ friends: res.data })
        })
    }

    deleteFriend = (friend, i) => {
        let { userid } = friend
        axios.delete(`/api/delete/${userid}`)
        let newFriends = this.state.friends
        newFriends.splice(i, 1)
        this.setState({ friends: newFriends })
        this.getFriends()
    }

    mapFriends() {
        let key = 0;
        let friendsToDisplay = this.state.friends.map( (e, i) => {
            return(
                <div className="actual_friends" key={ key++ }>
                    { e.username }
                    <img src={ e.profile_pic } alt="friend"/>
                    <button onClick={ () => this.deleteFriend(e, i) } className="remove_friend_button">REMOVE FRIEND</button>
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