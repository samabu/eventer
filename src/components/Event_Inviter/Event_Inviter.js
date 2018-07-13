import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFriends } from '../../ducks/reducer';
import axios from 'axios';

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
                <div key={ key++ }>
                    { e.username }<br/>
                    <img src={ e.profile_pic } alt="friend"/><br/>
                    <button onClick={ () => this.inviteFriend(e, i) }>SEND INVITE</button><br/>
                </div>
            )})
        return friendsToDisplay;
    }

    render() {
        this.getFriends()
        return (
            <div>
                Search for friends to invite:<br/>
                <input onChange={ (e) => this.handleChange('username', e.target.value) } type="text" placeholder="Friend Username"/><br/>
                <button onClick={ () => this.showAll() }>SHOW ALL FRIENDS</button>
                { this.mapFriends() }
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