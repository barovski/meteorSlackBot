/*
 stubs.js
 Copyright (c) 2016
 Bogdan Pshonyak, Stephen King, Yegor Shemereko
 3/15/16

 This applies the user name and a datetime stamp to each of the
 messages before inserting them into the database.
 */

Meteor.methods({
    newMessage: function (message) {

        //add timestamp
        message.timestamp = Date.now();

        //Add user id from database
        message.user = Meteor.userId();

        //Insert into database
        Messages.insert(message);
    }
});