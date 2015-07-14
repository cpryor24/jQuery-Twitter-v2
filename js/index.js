'use strict';

var $ = require('jquery');
var templates = require('./template.js');


var currentUser = {
  handle: '@bradwestfall',
  img: 'brad.png',
  id: 1
};

$(function () {
  
  function renderCompose() {
    return composeTmpl();
    
  }
  
  function renderTweet(User, message) {
    return tweetTmpl({
      img: User.img,
      handle: User.handle,
      message: message
    })
  }

  function renderThread(User, message) {
	return threadTmpl({
	  tweet: renderTweet(User, message),
	  compose: renderCompose()
	})
  }

  $('#main').on('click', 'textarea', function() {
    $(this).parent().addClass('expand');
  })

  $('body').on('click', '.tweet', function () {
    $(this).parent().toggleClass('expand');
   })

  $('main').on('submit', 'form', function (event) {
    event.preventDefault();
    var txt = $(this).find("textarea").val()

      if ($(this).parents('.replies').length) {
          $(this).parents('.replies').append(renderTweet(User, txt)) 
      } else {
        $('.tweets').append(renderThread(User, txt)) 
      }

    $(this).find('textarea').val('')
    $(this).removeClass('expand')
  })

});
