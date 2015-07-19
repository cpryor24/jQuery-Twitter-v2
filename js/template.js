'use strict';

var Handlebars = require('hbsfy/runtime');

var compose = require('../templates/template-compose.handlebars');

var tweet = require('../templates/template-tweet.handlebars');

var thread = require('../templates/template-thread.handlebars');

module.exports = {
	compose: compose,
	tweet: tweet,
	thread: thread
}