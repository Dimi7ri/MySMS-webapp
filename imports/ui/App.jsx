import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';


export default class App extends TrackerReact(Component) {

  constructor(props, context) {
    super(props, context);
    this.state = {
        subscriptions: {
            userSubscription: Meteor.subscribe('user.info')
        },
        screen: 'main'
    }
  }


  render() {
      return (
        <div className="mainpan">
          <div className="container">
              <h1>Meteor and React is ready to go.</h1>
          </div>
        </div>
      );
  }

}
