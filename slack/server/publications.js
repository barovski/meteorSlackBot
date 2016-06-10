/*
 publications.js
 Copyright (c) 2016
 Bogdan Pshonyak, Stephen King, Yegor Shemereko
 3/15/16

 This is server side message publishing. It draws the messages from
 the MongoDB server by username (specifically using github in the
 second method).
 */

/*
 This finds all messages in the message database
 */
Meteor.publish('messages', function (channel) {
    return Messages.find({channel: channel});
});


/*
 This publishes the channels collection
 making it available for the client to subscribe to it
 */
Meteor.publish('channels', function () {
    return Channels.find();
});

/*
 This finds all registered users in the database
 */
Meteor.publish("allUsernames", function () {

    //find meteor users by github id
    return Meteor.users.find({}, {
        fields: {
            "username": 1,
            "services.github.username": 1
        }
    });
})