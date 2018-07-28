import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { getUserData } from '../../ducks/reducer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Friend_Adder.css';

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
        .then(toast.success('FRIEND REQUEST SENT', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        }))
        let newState = this.state.friendsToShow;
        newState.splice(i, 1);
        this.setState({ friendsToShow: newState });
    }

    mapFriendsToShow() {
        if (this.state.friendsToShow.length === 0) {
            return (
                <h1 className="no_matches">Sorry, no one has a username that matches your search</h1>
            )
        }
        let key = 0;
        let potentialFriends = this.state.friendsToShow.map( (e, i) => {
            return (
                <div className="friends_to_add" key={key++}>
                    {e.username}<br/>
                    <img src={e.profile_pic} alt="friend"/><br/>
                    <button className="friend_adder_button" onClick={ () => this.addFriend(e, i) }>ADD FRIEND</button>
                </div>
            )
        })
        return potentialFriends;
    }

    render() {
        return (
            <div className="friend_adder_body">
                <div className="input_username">
                    {"Search for your friend's username:   "}<input className="username_input" onChange={ (e) => this.handleChange('friend_username', e.target.value) } type="text" placeholder="username"/><br/>
                </div>
                <div className="map_friends_to_show">
                    { this.mapFriendsToShow() }
                </div>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnVisibilityChange
                    draggable
                    pauseOnHover
                    style={{"width": "550px"}}
                />
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