import React, { Component } from 'react';
import { getUserData, updateUserData } from '../../ducks/reducer';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Profile_Editor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: props.user.username,
            email: props.user.email,
            profile_pic: props.user.profile_pic,
            zipcode: props.user.zipcode,
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            username: nextProps.user.username,
            email: nextProps.user.email,
            profile_pic: nextProps.user.profile_pic,
            zipcode: nextProps.user.zipcode,
            auth_id: nextProps.user.auth_id
        })
    }

    handleChange = (property, input) => {
        this.setState({ [property]: input })
    }

    updateProfile = (obj) => {
        axios.post('/api/update', obj)
        .then( () => {
            this.props.updateUserData(this.state)
        })      
    }
    
    deleteProfile = () => {
        axios.delete('/api/delete')
    }

    render() {
        let { user } = this.props;
        return (
            <div>
            <h1>WELCOME TO THE PROFILE EDITOR</h1><br/>
            <img src={ user.profile_pic } alt="prof"/><br/>
            <input onChange={ (e) => this.handleChange( 'profile_pic', e.target.value ) } type="text" placeholder="New Profile Picture URL" value={ this.state.profile_pic } /><br/>
            { "Current Username: " + user.username }<br/>
            <input onChange={ (e) => this.handleChange( 'username', e.target.value ) } type="text" placeholder="New Username" value={ this.state.username } /><br/>
            { user.email ? "Current Email: " + user.email : "No email yet" }<br/>
            <input onChange={ (e) => this.handleChange( 'email', e.target.value ) } type="text" placeholder="New Email" value={ this.state.email } /><br/>
            { user.zipcode ? "Current Zipcode: " + user.zipcode : "No zipcode yet" }<br/>
            <input onChange={ (e) => this.handleChange( 'zipcode', e.target.value ) } type="text" placeholder="New Zipcode" value={ this.state.zipcode } /><br/>
            <Link to="/profile"><button onClick={ () => this.updateProfile(this.state) }>SAVE CHANGES</button></Link>
            <Link to="/"><button onClick={ () => this.deleteProfile() }>DELETE ACCOUNT</button></Link>
            </div>
        );
    }
  }

  function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { getUserData, updateUserData })(Profile_Editor)