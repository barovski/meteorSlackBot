/*
 routes.js
 Copyright (c) 2016
 Bogdan Pshonyak, Stephen King, Yegor Shemereko
 3/15/16

 This handles custom routes
 */

Router.configure({
    layoutTemplate: 'app'
});

/*
 sends the user to the page with their current channel
 -->sets session variable to whatever channel user clicks on
 */
Router.route('/:channel', function () {
    Session.set('channel', this.params.channel);
    this.render('messages');
});

/*
 if the user goes to the home page
 -->redirected to the general channel
 */
Router.route('/', function () {
    this.redirect('/general');
});
