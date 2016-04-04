/*
 index.js
 Copyright (c) 2016
 Bogdan Pshonyak, Stephen King, Yegor Shemereko
 3/15/16

 */

Meteor.npmRequire = function (moduleName) {
    var module = Npm.require(moduleName);
    return module;
};

Meteor.require = function (moduleName) {
    console.warn('Meteor.require is deprecated. Please use Meteor.npmRequire instead!');
    return Meteor.npmRequire(moduleName);
};