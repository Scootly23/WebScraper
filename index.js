//#region initialize
var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var messageService = require('./MessageService');
var firebase = require('firebase');
var config = {
    apiKey: "AIzaSyBWK8eQRMEY8u7vtQC0GQ7Vg0yYItHrJg8",
    authDomain: "craigslist-scraper-2963c.firebaseapp.com",
    databaseURL: "https://craigslist-scraper-2963c.firebaseio.com",
    projectId: "craigslist-scraper-2963c",
    storageBucket: "craigslist-scraper-2963c.appspot.com",
    messagingSenderId: "343457473285"
  };
firebase.initializeApp(config);
const rootRef = firebase.database().ref();
//#endregion

var url = 'http://lonesomegrovebeagles.blogspot.com/';
var init = function(){
    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);
            $('.blog-posts').filter(function(){
                var data = $(this);

                post = data.children().first().text().replace(/(\r\n\t|\n|\r\t)/gm,"") .replace(/\s{2,}/g,'\n');
                
                var add = true;
                rootRef.child('blogposts').once('value',function(snap){
                    snap.forEach(element => {
                        var text = element.val();
                        if(text == post){add = false}
                    });
                    if(add)
                    {
                        rootRef.child('blogposts').push(post);
                        messageService.sendMessage(post);
                    }
                });
            });
            setTimeout(()=>{init()},1800000);
        }
    });
}
init();
