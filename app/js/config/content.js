(function(){
  'use strict';

  angular
    .module('dataconfig')
    .service('mceInfo', [ 'MCEData', '$filter', function MCEInfo(MCEData, $filter){
      var artists = MCEData.siteData.artists;
      var events = MCEData.siteData.events;
      var news = MCEData.siteData.news;
      var mcempire = MCEData.siteData.mcempire;
      var spotlights = MCEData.siteData.spotlights;
      var slider = MCEData.siteData.slider;

      function eventsByname(name) {
        var returnedEvents=[];

        for(var i =0; i < events.length; i++){
          if(events[i].artistname == name){
            returnedEvents.push(events[i]);
          }
        }

        return returnedEvents;
      }

      return {
        artists: {
          all: function(){
            return artists;
          },
          top: function() {
            return artists.slice(0, 3);
          },
          byName: function(artistName) {
            var returnArtist = null;
            for(var i =0; i < artists.length; i++){
              if(artists[i].name == artistName){
                returnArtist = artists[i];
                // Add Events
                returnArtist.events = eventsByname(artistName);
                break;
              }
            }
            return returnArtist;
          }
        },
        events: {
          all: function(){
            return events;
          }
        },
        news: {
          all: function(){
            return news;
          },
          latests: function(){
            $filter('orderBy')(news, "-date");
            return news.slice(0, 4);
          }
        },
        mcempire: {
          all: function(){
            return mcempire;
          }
        },
        spotlights: {
          all: function(){
            return spotlights;
          }
        },
        slider: {
          all: function(){
            for(var i=0; i < slider.length; i++){
              slider[i].id = i;
            }
            return slider;
          }
        }
      }
    }])
    .factory("MCEData", ['$q', '$http', function($q, $http){
     function MCEInfoData() {
       var vm = this;


       vm.siteData = {
          "artists":[
              {"name":"GANDHI ALI", "quote":"Real Live", "bio":"Mind Control Empire's first solo artist","image":"GandhiAli.png",
              "social":[
                  {"site":"twitter","handle":"GandhiGandhiAli"},
                  {"site":"instagram","handle":"Gandhi_Ali"}],
              "releases":[
                  {"title":"What I Need", "type":"soundcloud-playlist", "date":"2016-01-06", "url":"https://soundcloud.com/the-real-gandhi-ali","text":"What I Need by Gandhi Ali","content":"<iframe width='100%' height='166' scrolling='no' frameborder='no' src='https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/240896276&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false'></iframe>"},
                  {"title":"New Ballin feat. J.A.", "type":"youtube","date":"2015-11-13","url":"https://www.youtube.com/embed/WCuePpLdgdc","text":"New Ballin feat. J.A.", "art":"art/new_ballin.PNG"},
                  {"title":"100 Remix", "type":"sitetrack","date":"2015-12-01","url":"GandhiAli-100Remix.mp3","text":"100 remixed by Gandhi Ali"},
                  {"title":"Flavors", "type":"sitetrack","date":"2015-12-01","url":"GandhiAli-flavors.mp3","text":"Flavors track"},
                  {"title":"Jumpman Remix", "type":"sitetrack","date":"2015-12-01","url":"GandhiAli-jumpman.mp3","text":"Jumpman remixed by Gandhi Ali"},
                  {"title":"Real Live", "type":"youtube","date":"2015-08-20","url":"https://www.youtube.com/embed/UwYWQNkdF1Y","text":"The first track on Mind Control Empire"},
                  {"title":"Poetic Justice Freestyle", "type":"youtube","date":"2015-02-13","url":"https://www.youtube.com/embed/-JYqJd3irRw","text":"A freestyle to the classic poetic justice track"},
                  {"title":"Call Em In", "type":"youtube","date":"2016-02-04","url":"https://www.youtube.com/embed/OUaHK84TkBY","text":"'Call Em In' video produced by DWJproductions", "art":"art/Call_em_in.PNG"},
                  {"title":"Loyal", "type":"youtube","date":"2016-02-25","url":"https://www.youtube.com/embed/j5kak2e0S-8","text":"'Loyal' video produced by DWJproductions"},
                  {"title":"Whole Time", "type":"youtube","date":"2016-02-11","url":"https://www.youtube.com/embed/aM2K9vl5Z2Y","text":"'Whole Time' video produced by DWJproductions"},
                  {"title":"Legal", "type":"soundcloud-playlist", "date":"2016-02-25", "url":"https://soundcloud.com/the-real-gandhi-ali/gandhi-ali-legal","text":"Legal by Gandhi Ali","content":"<iframe width='100%' height='166' scrolling='no' frameborder='no' src='https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/248818061&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false'></iframe>", "art":"art/Gandhi-Legal.PNG"},
                  {"title":"Thru (Rambo Remix)", "type":"soundcloud-playlist", "date":"2016-01-25", "url":"https://soundcloud.com/the-real-gandhi-ali/gandhi-ali-thru-rambo-remix","text":"Thru (Rambo Remix) by Gandhi Ali","content":"<iframe width='100%' height='166' scrolling='no' frameborder='no' src='https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/245357082&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false'></iframe>"},
                  {"title":"Deal (Freestyle)", "type":"soundcloud-playlist", "date":"2016-02-17", "url":"https://soundcloud.com/the-real-gandhi-ali/gandhi-ali-deal-freestyle","text":"Deal (Freestyle) by Gandhi Ali","content":"<iframe width='100%' height='166' scrolling='no' frameborder='no' src='https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/247481088&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false'></iframe>", "art":"art/Gandhi-Deal.PNG"},
                  {"title":"Radio Remix Vol 1: Jackin Beats", "type":"spinrilla-playlist", "date":"2016-04-13", "url":"https://spinrilla.com/mixtapes/gandhi-ali_dmv-radio-remix-vol-1-jackin-beats-by-gandhi-ali","text":"Radio Remix Vol 1. by Gandhi Ali","content":"<iframe width='100%' height='450px' style='border: 0' src='https://spinrilla.com/mixtapes/gandhi-ali_dmv-radio-remix-vol-1-jackin-beats-by-gandhi-ali/embed' allowtransparency='true'></iframe>", "art":"art/RadioRemix.PNG"}
              ]}
          ],
          "events":[
              { "eventname":"SXSW Performance", "location":"South by Southwest Festival: Austin, Tx", "date":"2016-03-17", "artistname":"GANDHI ALI", "time":"10:00:00", "tags":[]},
              { "eventname":"Hiphopyogalive performance", "location":"Washington Dc-Amsterdam Lounge", "date":"2015-12-02", "artistname":"GANDHI ALI", "time":"22:00:00", "tags":[]},
              { "eventname":"Performance", "location":"Washington Dc:Zeba Bar", "date":"2015-09-18", "artistname":"MIND CONTROL EMPIRE", "time":"21:00:00", "tags":[]},
              { "eventname":"Video Shoot", "location":"Hyattsville, Md: Hoodroach Tv", "date":"2015-08-01", "artistname":"MIND CONTROL EMPIRE", "time":"00:00:00", "tags":[]},
              { "eventname":"Performance", "location":"Silver Spring, MD FestAfrica", "date":"2015-08-08", "artistname":"GANDHI ALI", "time":"00:00:00", "tags":[]},
              { "eventname":"Video Shoot", "location":"Hyattsville, Md: DWJ Productions", "date":"2015-08-15", "artistname":"MIND CONTROL EMPIRE", "time":"00:00:00", "tags":[]},
              { "eventname":"Radio Interview", "location":"Temple Hills, MD: WinDC Radio", "date":"2015-09-21", "artistname":"MIND CONTROL EMPIRE", "time":"00:00:00", "tags":[]},
              { "eventname":"Photo Shoot", "location":"National Harbor", "date":"2015-08-21", "artistname":"MIND CONTROL EMPIRE", "time":"00:00:00", "tags":[]},
              { "eventname":"Performance", "location":"Washington, DC: Pure Lounge", "date":"2015-09-29", "artistname":"MIND CONTROL EMPIRE", "time":"00:00:00", "tags":[]},
              { "eventname":"Photo/Video Shoot", "location":"Germantown, MD: DWJ Productions", "date":"2015-10-08", "artistname":"MIND CONTROL EMPIRE", "time":"00:00:00", "tags":[]},
              { "eventname":"Video Shoot", "location":"Washington, DC: ClipstarTV", "date":"2015-11-05", "artistname":"MIND CONTROL EMPIRE", "time":"00:00:00", "tags":[]},
              { "eventname":"Radio Interview", "location":"Washington, DC: Eddie Kayne Show", "date":"2015-11-21", "artistname":"MIND CONTROL EMPIRE", "time":"00:00:00", "tags":[]}
              ],
          "mcempire":[
              {"name":"'G'", "position":"CEO", "icon":"fa-building", "bio":"", "social":[{"site":"twitter", "handle":"Sir_CEO"}, {"site":"instagram", "handle":"CEO_KING_FIELDMOB"}]},
              {"name":"Dwayne", "position":"Videographer & Photographer", "icon":"fa-video-camera", "bio":"", "social":[{"site":"twitter", "handle":"DWJproductions"}]},
              {"name":"Drty Warhaul", "position":"Producer", "icon":"fa-headphones", "bio":"", "social":[{"site":"twitter", "handle":"inspiredmindz"}]}
              ],
          "news":[
              {"title":"SXSW Performance", "date":new Date("2016-03-18 00:00:00"), "img":"imgs/site-images/Gandhi-sxsw.png", "content":"GANDHI Ali will be performing at this years SXSW (South By Southwest) music festival in Austin, TX. Visit http://www.sxsw.com/music for event and ticket information.", "tags":["GANDHI ALI","SXSW"]},
              {"title":"GANDHI Ali is releasing Drty Work Vol. 1", "date":new Date("2016-02-25 00:00:00"), "img":"imgs/art/DrtyWorkCover.jpg", "content":"GANDHI Ali is releasing Drty Work Vol. 1 produced by Drty Warhol in late February.  The Mixtape will be released here, Live Mixtapes, Spinrilla, & Soundcloud", "tags":["GANDHI ALI","Drty Work Vol. 1"]},
              {"title":"Website Launch", "date":new Date("2015-12-03 00:00:00"), "content":"The New Mind Control Empire website has officially been launched.  Welcome to the new Mind Control Empire Website", "tags":["Website","Mind Control Empire"]},
              {"title":"Drty Warhol Vol.1 coming soon", "date":new Date("2015-12-02 00:00:00"), "content":"Drty Warhol Vol.1 Mixtape coming in January will be released on the site.", "tags":["Mixtape","Mind Control Empire"], "image":"art/DrtyWorkCover.jpg"},
              {"title":"'The City' on the way", "date":new Date("2015-12-02 00:00:00"), "content":"The Video for 'The City' will be released this December.", "tags":["Video","Mind Control Empire"]}
              ],
          "spotlights":[
              {"order":1, "artist":"GANDHI ALI","title":"Loyal", "type":"youtube","date":"2016-02-25","urlcode":"j5kak2e0S-8","text":"'Loyal' video produced by DWJproductions"},
              {"order":2, "artist":"GANDHI ALI","title":"Whole Time", "type":"youtube","date":"2016-02-11","urlcode":"aM2K9vl5Z2Y","text":"'Whole Time' video produced by DWJproductions"},
              {"order":3, "artist":"GANDHI ALI", "title":"Call Em In", "type":"youtube","date":"2016-02-04","urlcode":"OUaHK84TkBY","text":"Call Em In video produced by DWJproductions"},
              {"order":4, "artist":"GANDHI ALI", "title":"New Ballin feat. J.A.", "type":"youtube","date":"2015-11-13","urlcode":"WCuePpLdgdc","text":"New Ballin feat. J.A."}
            ],
          "slider": [{"image":"imgs/slider/IMG0.jpg", "title":"Mind Control Empire", "text":""}, {"image":"imgs/art/RadioRemix.jpg", "title":"RADIO REMIX VOL 1 RELEASE", "text":"Download Now on spinrella.com"}, {"image":"imgs/art/DrtyWorkCover.jpg", "title":"DRTY WORKs VOL. 1", "text":"Releasing Soon"}, {"image":"imgs/slider/MCE1.jpg", "title":"Music Production And Management", "text":"Our Management team brings the world to the artist."}]
      };

     }

     return new MCEInfoData();
    }]);

})();
