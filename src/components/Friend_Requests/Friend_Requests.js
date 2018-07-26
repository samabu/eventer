import React, { Component } from 'react';
import axios from 'axios';
import './Friend_Requests.css';

class Friend_Requests extends Component {
    constructor() {
        super();

        this.state = {
            friend_requests: []
        }
    }

    componentDidMount() {
        axios.get('/api/friendrequests').then( res => {
            this.setState({ friend_requests: res.data })
        })
    }

    acceptFriend = (friend) => {
        axios.post('/api/accept', friend).then( results => {
            this.setState({ friend_requests: results.data })
            console.log(results.data, "    ", this.state.friend_requests)
        })
    }

    rejectFriend = (friend) => {
        axios.delete(`/api/reject/${friend.userid}`).then( results => {
            this.setState({ friend_requests: results.data })
        })
    }

    mapRequests = () => {
        var key = 0;
        if (this.state.friend_requests.length > 0) {
            var requestsToDisplay = this.state.friend_requests.map( (e, i) => {
                return (
                    <div className="friend_request_body" key={key++}>
                        <div className="request">
                            { e.username }<br/>
                            <img src={ e.profile_pic } alt=""/><br/>
                            <button className="request_buttons" onClick={ () => this.acceptFriend(e, i) }>ACCEPT</button>
                            <button className="request_buttons" onClick={ () => this.rejectFriend(e, i) }>REJECT</button>
                        </div>
                    </div>
                )
            })
            return requestsToDisplay;
        }


        else if (this.state.friend_requests.length === 0) {
            return(
                <div className="no_friend_request_body">
                    Sorry, no one has requested to be your friend.<br/>
                    <img className="haha" src="https://media.giphy.com/media/3orieLHXgpfkKO9Iju/giphy.gif" alt="you suck"/><br/>
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                { this.mapRequests() }
            </div>
        )
    }
}

export default Friend_Requests;