import React from 'react';
import { render } from 'react-dom';

import App from '../../ui/App.jsx';

FlowRouter.route('/', {
    action: function(params) {
        Tracker.autorun(function() {
              render(<App />, document.getElementById('render-target'));
        });
      },
      name: 'home'
});
