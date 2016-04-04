/*
 app.js
 Copyright (c) 2016
 Bogdan Pshonyak, Stephen King, Yegor Shemereko
 3/15/16

 This file contains template helpers
 */

/*
 Message helper, grabs all the messages from the 'messages'
 collection so the template can display
 */
Template.messages.helpers({
    messages: Messages.find({}),
});

/*
 Footer helper, generates the username for the bottom left
 */
Template.footer.helpers({
    userID: function () {
        var userId = Tracker.autorun(function () {
            Meteor.userId()
        });
        return Meteor.userId();
    }
});

/*
 Output messages, scrolls to the bottom each time a message
 gets added
 */
Template.messages.onRendered(function () {
    var template = this;

    this.autorun(function () {
        if (template.subscriptionsReady()) {
            Tracker.afterFlush(function () {
                $("#allMsg").scrollTop($("#allMsg")[0].scrollHeight);
            });
        }
    });

    Tracker.autorun(function () {
        Messages.find().count();
        $("#allMsg").scrollTop($("#allMsg")[0].scrollHeight);
    });
});

/*
 Manage accounts, makes user accounts only require a username
 */
Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
});

/*
 Register to a channel
 */
Template.registerHelper('currentChannel', function () {
    return Session.get('channel');
});

/*
 Format date/time to display in human readable style
 */
Template.registerHelper("timestampToTime", function (timestamp) {
    var date = new Date(timestamp);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    return hours + ':' + minutes.substr(minutes.length - 2) + ':' + seconds.substr(seconds.length - 2);
});

/*
 When a user is logged in, apply their username properly
 */
Template.registerHelper("usernameFromId", function (userId) {

    var user = Meteor.users.findOne({_id: userId});

    if (typeof user === "undefined") {
        return "Anonymous";
    }
    if (typeof user.services.github !== "undefined") {
        user.services.github.im

        return user.services.github.username;
    }

    return user.username;
});

/*
 Returns whether a user is logged in or anonymous for the avatar
 */
Template.registerHelper("isLoggedIn", function (userId) {

    var user = Meteor.users.findOne({_id: userId});

    if (typeof user === "undefined") {
        console.log("false");
        return false;
    }
    if (typeof user.services.github !== "undefined") {
        return true;
    }

    return user.username;
});

/*
 List the channels from the 'channels' collection
 */

Template.listings.helpers({
    channels: function () {
        return Channels.find();
    }
});

/*
 Make channel name active if at current channel, it will be highlighted in orange
 */
Template.channel.helpers({
    active: function () {
        if (Session.get('channel') === this.name) {
            return "active";
        } else {
            return "";
        }
    }
});

/*
 Create a new channel w/ given name when "Add" is clicked
 */
Template.modal.events({
    'submit form': function (e) {
        e.preventDefault();

        var channelName = ($(event.target).find('input[name=channelName]')).val().toLowerCase();

        var dups = Channels.find({ name: channelName}).count();

        if(dups != 0){
            $("#error-msg").html("Error: Duplicate Channel Name.");
        } else if (channelName.length > 8){
            $("#error-msg").html("Error: Channel Name Too Long.");
        } else {
            //call a function on the server and pass channelName
            //to create a new channel
            Meteor.call('newChannel', {
                name: channelName
            });
            Router.go('/' + channelName);
            $('#myModal').modal('hide');

            $("#error-msg").html("");
            $("#channel-name").val("");
        }

    },
    'click #modal-close': function(event){
        $("#error-msg").html("");
        $("#channel-name").val("");
        $("#myModal").modal("hide");
    }
});

/*
 Opens the delete channel modal
 */
Template.errorModal.events({
    'click button': function (e) {
        $('#deleteModal').modal('hide');
    }
});

/*
 Remove current channel on click of "Delete" button
 */
Template.deleteModal.events({
    'click #delete': function (e) {
        e.preventDefault();
        var channelName = Session.get('channel');

        // if the channel is general => do not remove
        if (Session.get('channel') === 'general') {

            //alert("Error: cannot remove general channel");
            $('#errorModal').modal('show');
        }
        else {

            $('#deleteModal').modal('hide');

            Meteor.call('removeChannel', {
                name: channelName
            });

            Router.go('/general');
        }


    }
});