import React, {Component} from 'react';

export default class Alert extends Component {

    constructor(props, context) {
        super(props, context);
    }
    render() {
      if(this.props.type == 'success'){
        return (
          <h4 className="text-success text-center">
              <span className="glyphicon glyphicon-ok-sign gi-2x"></span>
              {this.props.message}
          </h4>
        )
      }
      else if(this.props.type == 'severe') {
        return (
          <h4 className="text-danger text-center">
              <span className="glyphicon glyphicon-remove-sign gi-2x"></span>
              {this.props.message}
          </h4>
        )
      }
      else {
        return (
          <p className="text-danger text-center">
              <span className="glyphicon glyphicon-remove-sign gi-2x"></span>
              {this.props.message}
          </p>
        )
      }

    }
}
