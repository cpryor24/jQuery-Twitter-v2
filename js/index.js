'use strict';

var $ = require('jquery')
var tmpl = require('./template.js')

var currentUser = {
  handle: '@cpryor',
  img: '/images/colts.jpg',
  id: 6
};


$(function () {
  var usersUrl = 'http://localhost:3000/users/'
  var tweetsUrl = 'http://localhost:3000/tweets/'
  var repliesUrl = 'http://localhost:3000/replies/'

  function getUsers() {
    return $.get(usersUrl)
  }

  function getReplies(id) {
    return $.get(tweetsUrl + id + '/replies')
  }

  function getAllReplies() {
    return $.get(repliesUrl)
  }

  function getTweets() {
    return $.get(tweetsUrl) 
  }

  function tweetsByUser(id) {
    return $.get(usersUrl + id +'/tweets')
  }

  var renderCompose = tmpl.compose

  var replies = getAllReplies()
  var users = getUsers()
  var tweeting = getTweets()

  users.done(function (users) {
    users.forEach(function (user) {
      tweetsByUser(user.id)
        .done(function (tweets) {
          tweets.forEach(function (tweet) {
            $('#tweets').append(renderThread(user, tweet.message, tweet.id))
        })
      })
    })
  })

  $('#main').on('click', 'textarea', function () {
    $(this).parent().addClass('expand')
  })

  $('#main').on('submit', '.compose', function (event) {
    event.preventDefault()

    var message = $(this).find('textarea').val()
    var replyTweet = $(this).closest('.replies')
    var twitterId = replyTweet.siblings('.tweet').attr('id')
    if (twitterId) {
      var tweetId = twitterId.split('-')[1]
    }

    if(!!replyTweet.length) {
      postReply(currentUser, tweetId, message)
    } else {
      postTweet(currentUser, message)
    }

    $(this).removeClass('expand')
    $(this).find('textarea').val('')
    $(this).find('count').text(140)
  }) 

  $('#tweets').on('click', '.tweet', function () {
    $(this).closest('.thread').toggleClass('expand')
    var appendReplies = $(this).parents('#tweets').find('.replies > .tweet')
    if (!appendReplies.length) {
      getAllReplies()
        .done(function (replies) {
          replies.forEach(function (reply) {
            users.done(function (usersData) {
              usersData.forEach(function (user) {
                if (reply.userId === user.id) {
                  var html = renderTweet(user, reply.message, reply.tweetId)
                  var search = $('#tweet-' + reply.tweetId).siblings('.replies').append(html)
                  search
                }
              })
            })
          })
        })
    }
  })

  function postTweet(user, message){
    $.post(tweetsUrl,{
      userId: user.id,
      message: message
    }).done(function (post) {
      console.log('Is this working...Yes!')
      $('#tweets').append(renderThread(currentUser, message, post.id))
    }).fail(function () {
      console.log('Sorry, this code did not work!')
    })
  } 

  function postReply(user, tweetId, message){
    $.post(repliesUrl, {
      userId: user.id,
      tweetId: tweetId,
      message: message
    }).done(function (post) {
      console.log('Works fine!')
      var html = tmpl.thread({
        tweet: renderTweet(user, message),
      })
      var search = $('#tweet-' + tweetId).siblings('.replies').append(html)
      search
    }).fail(function () {
      console.log('This is not working!')
    })
  }

  function renderThread(user, message, id) {
    var html = tmpl.thread({
        tweet: renderTweet(user, message, id),
        compose: renderCompose
    })
    return html
  }

  function renderTweet(user, message, tweetId) {
    var html = tmpl.tweet({
          img: user.img,
          userId: user.id,
          handle: user.handle,
          message: message,
          id: tweetId
        })
    return html
  }
});








