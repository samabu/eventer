import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFriends } from '../../ducks/reducer';
import axios from 'axios';
import './Event_Inviter.css';

class Event_Inviter extends Component {
    constructor() {
        super();

        this.state = {
            username: '',
            friendsToShow: []
        }
    }

    componentDidMount() {
        this.getFriends()
    }

    getFriends() {
        axios.get('/api/friends').then(res => {            
            this.props.getFriends(res.data)
        })
    }

    handleChange = (property, input) => {
        this.setState({ [property]: input })
        this.searchFriends(input)
    }

    searchFriends = (input) => {
        axios.get(`/api/invitefriendsearch/${input}`).then( res => {
            this.setState({friendsToShow: res.data})
        })
    }

    showAll = () => {
        this.setState({friendsToShow: this.props.user.friends})
    }

    inviteFriend = (friend, i) => {
        axios.post('/api/invitefriend', friend)
        let newState = this.state.friendsToShow;
        newState.splice(i, 1);
        this.setState({ friendsToShow: newState });
    }

    mapFriends() {
        
        let key = 0;
        let friendsToDisplay = this.state.friendsToShow.map( (e, i) => {
            return(
                <div className="friends_to_invite" key={ key++ }>
                    { e.username }
                    <img src={ e.profile_pic } alt="friend"/>
                    <button className="invite_friend_button" onClick={ () => this.inviteFriend(e, i) }>SEND INVITE</button>
                </div>
            )})
        return friendsToDisplay;
    }

    render() {
        this.getFriends()
        return (
            <div>
                <div className="friend_inviter_header">
                    {"Search for friends to invite:"}
                    <input className="friend_username_input_inviter" onChange={ (e) => this.handleChange('username', e.target.value) } type="text" placeholder="Friend Username"/>
                    <button className="show_all_friends_button" onClick={ () => this.showAll() }>SHOW ALL FRIENDS</button>
                </div>
                <div className="friends_to_invite_list">
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

export default connect( mapStateToProps, { getFriends })(Event_Inviter);