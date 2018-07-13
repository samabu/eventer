import React, { Component } from 'react';
import './Login.css';
// import axios from 'axios';

class Login extends Component {
    constructor() {
        super();

        this.state = {
            mounted: false,
            button: false,
            link: false
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({mounted: true})
        }, 500);
    }

    loginButtonAnimation() {
        this.setState({ button: true })
        setTimeout(() => {
            this.setState({button: false})
        }, 100);
        this.login();
    }

    registerLinkAnimation() {
        this.setState({ link: true })
        setTimeout(() => {
            this.setState({link: false})
        }, 100);
        this.login();
    }

    login() {
        const redirectUri = encodeURIComponent(`http://localhost:3005/auth/callback`);
        window.location = `https://${process.env.REACT_APP_DOMAIN}/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`;
    }

    render() {
      return (
        <div className="home_page">
            <div className={this.state.mounted ? "home_elements_transition" : "home_elements"}>
                <h1 className="login_logo">EVENTER</h1>
                <button className={this.state.button ? "login_button_click" : "login_button"} onClick={ () => this.loginButtonAnimation() }>LOGIN</button>
                <button className={this.state.link ? "register_link_click" : "register_link"} onClick={ () => this.registerLinkAnimation() }>REGISTER</button>
            </div>
        </div>
      );
    }
  }

export default Login;