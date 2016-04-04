/*
 input.js
 Copyright (c) 2016
 Bogdan Pshonyak, Stephen King, Yegor Shemereko
 3/15/16

 This is a secure method of inserting new messages into the database. It is
 utilized after removing the Insecure dependency.
 */

/*
 create the new message
 */
Template.footer.events({
    'keypress input': function (e) {
        var inputVal = $('.input-box_text').val();
        if (!!inputVal) {
            var charCode = (typeof e.which == "number") ? e.which : e.keyCode;
            if (charCode == 13) {
                e.stopPropagation();
                Meteor.call('newMessage', {
                    text: $('.input-box_text').val(),
                    channel: Session.get('channel')
                });
                $("#allMsg").scrollTop($("#allMsg")[0].scrollHeight);
                $('.input-box_text').val("");
                return false;
            }
        }
    }
});

