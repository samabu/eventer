import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUserData } from '../../ducks/reducer';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import Confetti from 'react-dom-confetti';

const config = {
  angle: 90,
  spread: 320,
  startVelocity: 50,
  elementCount: 150,
  decay: .85
};


class Dashboard extends Component {
    constructor() {
        super();

        this.state = {
            confetti: false
        }
    }

    componentDidMount() {
        axios.get('/api/user-data').then(res => {
            this.props.getUserData(res.data);
        })
    };

    componentDidUpdate(prevProps) {
        let flag = false;
        for (const prop in this.props) {
            if (this.props[prop] !== prevProps[prop]) {
                flag = true;
            }
        }
        if (flag) {
            axios.get('/api/user-data').then(res => {
                this.props.getUserData(res.data)
            })
        }
    }

    logout() {
        axios.get('/api/logout')
    };

    throw_confetti = () => {
        this.setState({ confetti: true });
        setTimeout(() => {
            this.setState({ confetti: false })
        }, 1000);
    }

    render() {
    
    let { user } = this.props;
      return (
        <div className="dashboard_body">
            <div className="dashboard">
                <img className="dashboard_profile_pic" src={ user.profile_pic? user.profile_pic : "https://i.stack.imgur.com/l60Hf.png" } alt="prof"/><br/>
                <h2>{ user.username }</h2><br/>
            </div>
            <div className="new_event_button_div" onClick={ () => this.throw_confetti() }>
                <Confetti active={ this.state.confetti } config={ config }/>
                <h1>GET THE PARTY STARTED:</h1>
                <Link to="/event"><button onClick={ () => this.throw_confetti() } className="new_event_button">CREATE NEW EVENT</button></Link>
                <div></div>
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

export default connect(mapStateToProps, { getUserData })(Dashboard)