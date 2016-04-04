/*
 methods.js
 Copyright (c) 2016
 Bogdan Pshonyak, Stephen King, Yegor Shemereko
 3/15/16

 */


// Require yelp api module
var Yelp = Meteor.npmRequire('yelp');

// Instantiate instance of yelp api class with auth info
var yelp = new Yelp({
    consumer_key: 'M9Fc3B9F4EHLwiJ8TWtqzg',
    consumer_secret: 'EuouIj-HUToj5XMFo-UU8lqeHio',
    token: 'kKzYMBaZVgkse63VCoO9O9hdA7oRvGIK',
    token_secret: 'I4HCPT026IJcfaW4PQhiEypPymA'
});

/*
 Meteor server side methods
 */
Meteor.methods({
    newMessage: function (message) {

        // Yelp API
        var tokens = message.text.split(" ");

        if (tokens.length === 4 && tokens[0] === "/yelp" && tokens[2] === "in") {

            yelp.search(
                {
                    term: tokens[1],
                    location: tokens[3],
                    limit: 3,
                    sort: 1, //sort by distance
                })
                .then(function (data) {
                    // Save business data
                    var businesses = data.businesses;
                    var entry = {
                        data: businesses,
                        channel: message.channel,
                        yelp: true,
                        timestamp: message.timestamp = Date.now(),
                        user: "Yelp Bot"
                    };

                    Messages.insert(entry);
                })
                .catch(function (err) {
                    console.error(err);
                });
        }

        message.timestamp = Date.now();
        message.user = Meteor.userId();
        Messages.insert(message);
    },

    newChannel: function (channel) {

        channel.name = channel.name.toLowerCase();

        var dups = Channels.find({ name: channel.name}).count();

        if(dups != 0){
            console.log("Error: Duplicate Channel Name.");
        } else if (channel.name.length > 8){
            console.log("Error: Channel Name Too Long.");
        } else {
            Channels.insert(channel);
        }

    },

    removeChannel: function (channel) {
        Channels.remove(channel);
        Messages.remove({channel: channel.name});
    }

});
