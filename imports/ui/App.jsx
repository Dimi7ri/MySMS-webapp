import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Alert from '../components/Alert.jsx';

export default class App extends TrackerReact(Component) {

  constructor(props, context) {
    super(props, context);
    this.state = {
        subscriptions: {
            userSubscription: Meteor.subscribe('user.info')
        },
        screen: 'home',
        number:'',
        numberEmpty: false,
        message:'',
        messageEmpty: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.numberChange = this.numberChange.bind(this);
    this.messageChange = this.messageChange.bind(this);
  }

  numberChange(event){
    this.setState({number: event.target.value});
  }

  messageChange(event){
    this.setState({message: event.target.value});
  }

  handleSubmit(e) {
    event.preventDefault();

    if(!this.state.number){
      this.setState({numberEmpty: true});
      return;
    }
    this.setState({numberEmpty: false});

    if(!this.state.message){
      this.setState({messageEmpty: true});
      return;
    }
    this.setState({messageEmpty: false});

    console.log(this.state.number);
    console.log(this.state.message);
    Meteor.call('sendSMS', this.state.number, this.state.message, () => {
      console.log("client side send sms")
    });

  }

  render() {
      return (
        <div className="mainpan">
          <div className="container">
              <h1>My SMS Web App</h1>
              {(() => {
                  if (this.state.numberEmpty) {
                      return (<Alert {...{message: ' Type a valid phone number.'}}/>)
                  }
                  else if (this.state.messageEmpty) {
                      return (<Alert {...{message: ' Type the message.'}}/>)
                  }
                  else {
                    return(
                      <p className="text-center">Send text messages</p>
                    )
                  }
              })()}
              {(() => {
                if (this.state.numberEmpty) {
                  return(
                    <div>
                      <div className="form-group has-error">
                        <label className="text-danger">Mobile Number:</label>
                        <input type="text" className="form-control" value={this.state.number} onChange={this.numberChange}></input>
                      </div>
                      <div className="form-group">
                        <label>Message:</label>
                        <textarea className="form-control" rows="5" value={this.state.message} onChange={this.messageChange}></textarea>
                      </div>
                    </div>
                  )
                }
                if (this.state.messageEmpty) {
                  return(
                    <div>
                      <div className="form-group">
                        <label>Mobile Number:</label>
                        <input type="text" className="form-control" value={this.state.number} onChange={this.numberChange}></input>
                      </div>
                      <div className="form-group has-error">
                        <label className="text-danger">Message:</label>
                        <textarea className="form-control" rows="5" value={this.state.message} onChange={this.messageChange}></textarea>
                      </div>
                    </div>
                  )
                }
                else{
                  return(
                    <div>
                      <div className="form-group">
                        <label>Mobile Number:</label>
                        <input type="text" className="form-control" value={this.state.number} onChange={this.numberChange}></input>
                      </div>
                      <div className="form-group">
                        <label>Message:</label>
                        <textarea className="form-control" rows="5" value={this.state.message} onChange={this.messageChange}></textarea>
                      </div>
                    </div>
                  )
                }
              })()}
              <button type="button" className="btn btn-info" onClick={this.handleSubmit}>Send Now</button>
          </div>
        </div>
      );
  }

}
