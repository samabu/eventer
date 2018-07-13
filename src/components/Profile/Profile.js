import React, { Component } from 'react';
import { getUserData } from '../../ducks/reducer';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Profile.css';

class Profile extends Component {

    componentDidMount() {
        axios.get('/api/user-data').then(res => {
            this.props.getUserData(res.data)
        })
    }

    render() {
        let { user } = this.props;
        return (
            <div className="profile_body">
                <div className="profile_body_div">
                    YOUR PROFILE:<br/>
                    <img src={ user.profile_pic } alt="prof"/><br/>
                    {"Username: "}
                    { user.username }<br/>
                    {"Email: "}
                    { user.email }<br/>
                    {"Zipcode: "}
                    { user.zipcode }<br/>
                    <Link to="/edit"><button className="edit_profile_button">EDIT PROFILE</button></Link>
                </div>
            </div>
        );
    }
  }

  function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { getUserData })(Profile)