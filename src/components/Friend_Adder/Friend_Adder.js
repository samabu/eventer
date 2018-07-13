import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { getUserData } from '../../ducks/reducer';

class Friend_Adder extends Component {
    constructor() {
        super();

        this.state = {
            friend_username: '',
            friendsToShow: []
        }
    }

    componentDidMount() {
        axios.get('/api/user-data').then(res => {
            this.props.getUserData(res.data)
        })
    };

    handleChange = (property, input) => {
        this.setState({ [property]: input })
        this.searchFriends(input)
    }

    searchFriends = (input) => {        
        axios.get(`/api/search/${input}`).then( res => {
            this.setState({friendsToShow: res.data})
        })
    }

    addFriend = (friend, i) => {
        axios.post('/api/addfriend', friend)
        let newState = this.state.friendsToShow;
        newState.splice(i, 1);
        this.setState({ friendsToShow: newState });
    }

    mapFriendsToShow() {
        if (this.state.friendsToShow.length === 0) {
            return (
                <div>Sorry, no one has a username including: {this.state.friend_username}</div>
            )
        }
        let key = 0;
        let potentialFriends = this.state.friendsToShow.map( (e, i) => {
            return (
                <div key={key++}>
                    {e.username}<br/>
                    <img src={e.profile_pic} alt="friend"/><br/>
                    <button onClick={ () => this.addFriend(e, i) }>ADD FRIEND</button>
                </div>
            )
        })
        return potentialFriends;
    }

    render() {
        return (
            <div>
                {"Search for your friend's username: "}<input onChange={ (e) => this.handleChange('friend_username', e.target.value) } type="text" placeholder="username"/><br/>
                { this.mapFriendsToShow() }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state
    }
}

export default connect( mapStateToProps, { getUserData } )(Friend_Adder);