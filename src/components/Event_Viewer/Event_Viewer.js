import React, { Component } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUserData } from '../../ducks/reducer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Event_Viewer.css';

const socket = io()

class Event_Viewer extends Component {
    constructor(){
        super();
        this.state = {
            user: '',
            users: [],
            message: '',
            messages: [],
            search_input: '',
            event_type: 'all',
            preferred_price: '4',
            businesses_to_show: [],
            single_business: false,
            business_info: 
            <div className="one_business_view">
                ''
            </div>,
            index: 0
        }

        this.updateMessages = this.updateMessages.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.setUserId = this.setUserId.bind(this);
    }

    componentDidMount() {
        socket.on(`message dispatched`, data => {
            const messages = [ ...this.state.messages, data]
            this.setState({messages})
        })
        socket.on('welcome', this.setUserId)
        axios.get('/api/user-data').then(res => {
            this.props.getUserData(res.data)
        })
    }

    componentWillMount() {
        document.addEventListener("keydown", this.arrowKey.bind(this));
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.arrowKey.bind(this));
    }

    handleChange = (property, input) => {
        this.setState({ [property]: input })
    }

    onSelectChanged = (property, value) => {
      this.setState({
        [property]: value
      });
    }

    searchBusinesses = () => {
        if (this.props.user.user.zipcode) {
            axios.get('/api/businesses', {
                params: {
                    event_type: this.state.event_type,
                    preferred_price: this.state.preferred_price,
                    search_input: this.state.search_input,
                    zipcode: this.props.user.user.zipcode
                }
            }).then(res => {
                this.setState({ businesses_to_show: res.data })
            })
        }
        else {
            toast.info('⚠️ MUST INPUT A ZIPCODE TO RETURN SEARCH RESULTS ⚠️', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
        
    }

    updateMessages(data) {
        const updatedMessages = this.state.messages.slice()
        updatedMessages.push(data.message)
        this.setState({
          messages: updatedMessages
        })
    }
    
    setUserId(user) {
        this.setState(user)
    }

    
    
    sendMessage() {
        let obj = {
            id: this.props.user.user.id,
            username: this.props.user.user.username,
            user_pic: this.props.user.user.profile_pic,
            message: this.refs.message.value
        }
        socket.emit('message sent', obj)
        this.refs.message.value = '';
    }

    keypress = (e) => {
        if (e.key === 'Enter') {
            this.sendMessage();
        }
    }

    arrowKey = (e) => {
        if (e.key === 'ArrowLeft' && this.state.single_business) {
            this.displayBusiness(this.state.businesses_to_show, this.state.index > 0? this.state.index - 1 : this.state.index)
        }
        else if (e.key === 'ArrowRight' && this.state.single_business) {
            this.displayBusiness(this.state.businesses_to_show, this.state.index < this.state.businesses_to_show.length - 1? this.state.index + 1 : this.state.index)
        }
    }

    displayBusiness = (businesses, i) => {
        this.setState({ business_info: 
        <div className="one_business_view">
            <a onClick={ () => this.setState({ single_business: false }) } href='/#/eventviewer' className="quit_button">X</a>
            <div>{ businesses[i].name }</div>
            <div>{ "Rating: " + businesses[i].rating + " stars" }</div>
            <div>{ "Price: " }{ businesses[i].price ? businesses[i].price : "N/A" }</div>
            <div>{ "Address: " }{ businesses[i].location.display_address }</div>
            <div>{ "Phone: " }{ businesses[i].display_phone }</div>
            <div className="next_button_yelp">
                <img onClick={ () => this.displayBusiness(businesses, i > 0? i - 1 : i) } className="arrow_buttons" src="https://image.flaticon.com/icons/svg/32/32542.svg" alt=""/>
                <img src={ businesses[i].image_url? businesses[i].image_url : "http://www.tccia.com/edirectory/oc-content/themes/osclasswizards/images/no_photo.gif" } alt="N/A"/>
                <img onClick={ () => this.displayBusiness(businesses, i < businesses.length - 1? i + 1 : i) } className="arrow_buttons" src="https://image.flaticon.com/icons/svg/32/32213.svg" alt=""/>
            </div>
            <a className="yelp" href={ businesses[i].url }>See Yelp Page</a>
        </div> , index: i, single_business: true })
    }

    mapBusinesses = () => {
        let key = 0;
        let businessesToDisplay = this.state.businesses_to_show.map( (e, i) => {
            return(
                <div onClick={ () => this.displayBusiness(this.state.businesses_to_show, i) } className="individual_businesses" key={ key++ }>
                    <h2 className="business_name">{ e.name }</h2>
                    <img className="business_url" src={ e.image_url? e.image_url : "http://www.tccia.com/edirectory/oc-content/themes/osclasswizards/images/no_photo.gif" } alt="N/A"/>
                </div>
            )})
        return businessesToDisplay;
    }

    render() {
        

        const messages = this.state.messages.map((e,i) => {
            const styles = e.username === this.props.user.user.username ? {alignSelf: "flex-end", backgroundColor: "#1F2833", color: "#C5C6C7"} : {alignSelf: "flex-start", backgroundColor: "#C5C6C7", color: "#1F2833"}
            return (
              <p className="individual_message" key={i} style={ styles }>{ e.username + ": " } <br/> { e.message }</p>
            )
        })

        return (
            <div className="Event_Viewer_body">
                <div className="left_side">
                    <div className="filters">
                        {"EVENT TYPE: "}
                        <select onChange={ (e) => this.onSelectChanged( 'event_type', e.target.value ) } className="food_or_entertainment" name="food_or_entertainment" id="">
                            <option value="all">All</option>
                            <option value="food">Food</option>
                            <option value="entertainment">Entertainment</option>
                        </select>
                        {"PREFERRED PRICE: "}
                        <select onChange={ (e) => this.onSelectChanged( 'preferred_price', e.target.value ) } className="price_select" name="price" id="">
                            <option value="1,2,3,4">All</option>
                            <option value="1">$</option>
                            <option value="1,2">$$</option>
                            <option value="1,2,3">$$$</option>
                            <option value="1,2,3,4">$$$$</option>
                        </select>
                        {"SEARCH TERM: "}
                        <input className="business_search_input" onChange={ (e) => this.handleChange( 'search_input', e.target.value ) } type="text" placeholder="search by keyword"/>
                        <button className="search_businesses_button" onClick={ () => this.searchBusinesses() }>SEARCH</button>
                    </div>
                    <div className="businesses">
                        {this.state.single_business? this.state.business_info : this.mapBusinesses() }
                    </div>
                </div>
                <div className="chat_box">
                    <div className="messages">
                        {messages}
                    </div>
                    <div className="input">
                        <input onKeyDown={ this.keypress } className="message_input" ref="message" />
                        <button className="send_message" onClick={this.sendMessage}>Send</button>
                    </div>
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

export default connect( mapStateToProps, { getUserData })(Event_Viewer);