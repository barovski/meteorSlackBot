/*
 subscribe.js
 Copyright (c) 2016
 Bogdan Pshonyak, Stephen King, Yegor Shemereko
 3/15/16

 The client subscribes to the channels collection
 making all created channels available
 */

Meteor.subscribe('channels');

Meteor.subscribe('allUsernames');

/*
 Subscribes only to messages of the current channel
 */
Template.messages.onCreated(function () {
    var self = this;
    self.autorun(function () {
        self.subscribe('messages', Session.get('channel'));
    });
});