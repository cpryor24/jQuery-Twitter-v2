'use strict';

var Handlebars = require('hbsfy/runtime');

var composeTmpl = require('../templates/template-compose.handlebars');

var tweetTmpl = require('../templates/template-tweet.handlebars');

var threadTmpl = require('../templates/template-thread.handlebars');

module.exports = {
	composeTmpl: composeTmpl,
	tweetTmpl: tweetTmpl,
	threadTmp: threadTmpl
}