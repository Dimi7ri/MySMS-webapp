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
        messageEmpty: false,
        chars_left: 459,
        numberInvalid: false,
        SMSSent: false,
        SMSError: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.numberChange = this.numberChange.bind(this);
    this.messageChange = this.messageChange.bind(this);
  }
  numberChange(event){
    this.setState({number: event.target.value});
  }
  messageChange(event){
    this.setState({
      message: event.target.value,
      chars_left: 459 - event.target.value.length
    });
  }

  handleSubmit(e) {
    event.preventDefault();

    if(!this.state.number){
      this.setState({numberEmpty: true});
      return;
    }
    this.setState({numberEmpty: false});

    if(isNaN(this.state.number)){
      this.setState({numberInvalid: true});
      return;
    }
    this.setState({numberInvalid: false});

    if(!this.state.message){
      this.setState({messageEmpty: true});
      return;
    }
    this.setState({messageEmpty: false});
    this.setState({SMSError: false});

    Meteor.call('sendSMS', this.state.number, this.state.message, (err, data) => {
        if (err) {
          this.setState({ServerError: true});
          return;
        }
        if (data) {
          if(data.statusCode == 200){
            this.setState({
              SMSSent: true,
              number: '',
              message:'',
              chars_left: 459
            });
            return;
          }
          if(data.response.statusCode == 400){
            this.setState({SMSError: true});
            return;
          }
        }
    });
  }

  render() {
      return (
        <div className="mainpan">
          <div className="container">
              <h2>My SMS Web App</h2>
              {(() => {
                  if (this.state.numberInvalid) {
                      return (<Alert {...{message: ' Type a valid phone number. Ex: 61412345678'}}/>)
                  }
                  else if (this.state.SMSError) {
                      return (<Alert {...{type: 'severe', message: ' The number you tried to reach is unavailable.'}}/>)
                  }
                  else if (this.state.numberEmpty) {
                      return (<Alert {...{message: ' Fill up phone number.'}}/>)
                  }
                  else if (this.state.SMSSent) {
                      return (<Alert {...{type: 'success', message: ' Your message was delivered!.'}}/>)
                  }
                  else if (this.state.messageEmpty) {
                      return (<Alert {...{message: ' Type the message.'}}/>)
                  }
                  else {
                    return(
                      <p className="text-center">Send text messages.</p>
                    )
                  }
              })()}
              {(() => {
                if (this.state.numberEmpty || this.state.numberInvalid || this.state.SMSError) {
                  return(
                    <div>
                      <div className="form-group has-error">
                        <label className="text-danger">Mobile Number:</label>
                        <input type="text" className="form-control" value={this.state.number} onChange={this.numberChange}></input>
                      </div>
                      <div className="form-group">
                        <label>Message:</label>
                        <textarea className="form-control" rows="5" maxLength="459" value={this.state.message} onChange={this.messageChange}></textarea>
                        <p>Characters Left: {this.state.chars_left}</p>
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
                        <textarea className="form-control" rows="5" maxLength="459" value={this.state.message} onChange={this.messageChange}></textarea>
                        <p>Characters Left: {this.state.chars_left}</p>
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
                        <textarea className="form-control" rows="5" maxLength="459" value={this.state.message} onChange={this.messageChange}></textarea>
                        <p>Characters Left: {this.state.chars_left}</p>
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
