import React from 'react';
import '/imports/startup/client/routes.jsx';
import { Meteor } from 'meteor/meteor';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import lodash from 'lodash';

FlowRouter.wait();

Meteor.startup(() => {
    FlowRouter.initialize();
});
