import React from 'react';
import '/imports/startup/client/routes.jsx';
import { Meteor } from 'meteor/meteor';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

FlowRouter.wait();

Meteor.startup(() => {
    FlowRouter.initialize();
});
