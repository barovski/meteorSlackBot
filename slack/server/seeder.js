/*
 seeder.js
 Copyright (c) 2016
 Bogdan Pshonyak, Stephen King, Yegor Shemereko
 3/15/16

 This is strictly for testing and should remain disabled. Enabling this
 WILL DELETE THE CURRENT DATABASE!!!!
 ---Stephen King
 */

/*
 Setup/Reset server side environment
 */
Meteor.startup(function () {


    /*Channels.remove({});

    Channels.insert({
        name: "general"
    });
    Channels.insert({
        name: "random"
    });
    //Session.set('channel', 'general');
    /*
     The below written code is just for sample generated text
     --->the Factory package is for generating random inputs
     */
    //Factory.define('message', Messages, {
    //    text: function () {
    //        return Fake.sentence();
    //    },
    //    user: Meteor.users.findOne()._id,
    //    timestamp: Date.now(),
    //    channel: 'general'
    //});

    // Add this if you want to remove all messages before seeding
   /* Messages.remove({});


    if (Messages.find().count() === 0) {
        for (var i = 0; i < 5; i++) {
            Messages.insert({text: "A dummy message " + i});
        }
    }

    // Channels by Yegor Shemereko


    /*
        Sets the current channel to general
     */


});