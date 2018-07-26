import React, { Component } from 'react';
import './Login.css';
// import axios from 'axios';
import Confetti from 'react-dom-confetti';

const config = {
    angle: 90,
    spread: 320,
    startVelocity: 50,
    elementCount: 175,
    decay: .85
};

class Login extends Component {
    constructor() {
        super();

        this.state = {
            mounted: false,
            button: false,
            link: false,
            confetti: false
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

    throw_confetti = () => {
        this.setState({ confetti: true });
        setTimeout(() => {
            this.setState({ confetti: false })
        }, 1000);
    }

    login() {
        const redirectUri = encodeURIComponent(`${window.origin}/auth/callback`);
        window.location = `https://${process.env.REACT_APP_DOMAIN}/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`;
    }

    render() {
      return (
        <div onClick={ () => this.throw_confetti() } className="home_page">
            <div className={this.state.mounted ? "home_elements_transition" : "home_elements"}>
            <Confetti active={ this.state.confetti } config={ config }/>
                <h1 className="login_logo">EVENTER</h1>
                <button className={this.state.button ? "login_button_click" : "login_button"} onClick={ () => this.loginButtonAnimation() }>LOGIN</button>
                <button className={this.state.link ? "register_link_click" : "register_link"} onClick={ () => this.registerLinkAnimation() }>REGISTER</button>
            </div>
        </div>
      );
    }
  }

export default Login;