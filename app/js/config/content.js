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

      function eventsByname(name, max) {
        var returnedEvents=[];

        for(var i =0; i < events.length; i++){
          if(events[i].artistname == name && returnedEvents.length <= max){
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
                returnArtist.events = eventsByname(artistName, 5);
                break;
              }
            }
            returnArtist.releases = returnArtist.releases.sort(function(a,b){return b.date - a.date;});
            return returnArtist;
          }
        },
        events: {
          all: function(){
            var sortedEvents = events.sort(function(a,b){return b.date - a.date;});

            // Get artist image
            for(var i =0; i < sortedEvents.length; i++){
              for(var j =0; j < artists.length; j++){
                if(sortedEvents[i].artistname == artists[j].name ){
                  sortedEvents[i].artistimg = artists[j].image;
                }
              }
            }

            return sortedEvents;
          }
        },
        news: {
          all: function(){
            $filter('orderBy')(news, "-date");
            return news;
          },
          byName: function(articleName){
            var article = null;
            for(var i =0; i < news.length; i++){
              if(news[i].title == articleName){
                article = news[i];
                break;
              }
            }
            return article;
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
        releases: {
          all: function(){
            var returnReleases = [];

            for(var i =0; i < artists.length; i++) {
              var tmpList = artists[i].releases;
              for(var j=0; j < tmpList.length; j++){
                tmpList[j].artists = artists[i].name;
              }
              returnReleases = returnReleases.concat(tmpList);
            }
            $filter('orderBy')(returnReleases, "-date");
            return returnReleases;
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
              {"name":"GANDHI ALI", "quote":"Real Live", "bio":"Mind Control Empire's first solo artist","image":"GandhiAli/GandhiAli.png",
                "addimages":["GandhiAli/GandhiAli1.jpg","GandhiAli/GandhiAli2.jpg","GandhiAli/GandhiAli3.jpg","GandhiAli/GandhiAli4.jpg","GandhiAli/GandhiAli5.jpg","GandhiAli/GandhiAli6.jpg","GandhiAli/GandhiAli7.jpg"],
              "social":[
                  {"site":"twitter","handle":"gandhi3x"},
                  {"site":"instagram","handle":"gandhi3x"},
                  {"site":"soundcloud","handle":"gandhi3x"}],
              "releases":[
                  {"title":"Kill Em All", "type":"soundcloud-track","date":new Date("2016-10-09"),"url":"https://soundcloud.com/gandhi3x/gandhi-ali-kill-em-all-prod-by-trackanometry-drty-warhol-rough","text":"Gandhi Ali - Kill Em All"},
                  {"title":"100% ft. Yung Sonic", "type":"soundcloud-track","date":new Date("2016-08-20"),"url":"https://soundcloud.com/gandhi3x/100-ft-yung-sonic","text":"Gandhi Ali ft. Yung Sonic - 100%"},
                  {"title":"Sorry", "type":"soundcloud-track","date":new Date("2016-08-20"),"url":"https://soundcloud.com/gandhi3x/gandhi-ali-sorry","text":"Gandhi Ali - Sorry"},
                  {"title":"Dirty Work", "type":"spinrilla-mixtape", "date":new Date("2016-07-12"), "url":"https://spinrilla.com/mixtapes/gandhi-ali-dirty-work/embed","text":"Drty Work by Gandhi Ali"},
                  {"title":"SoundCloudProfile", "type":"soundcloud-profile","date":"","url":"https://soundcloud.com/gandhi3x","text":"Gandhi Ali Sound Cloud Profile"},

                  {"title":"Dapper", "type":"youtube","date":new Date("2016-08-13"),"url":"https://www.youtube.com/embed/cy4Jhd16VJE", "urlcode":"cy4Jhd16VJE","text":"'Dapper' video shot by TOA$T"},
                  {"title":"100%", "type":"youtube","date":new Date("2016-06-17"),"url":"https://www.youtube.com/embed/vKIc3P1o798", "urlcode":"vKIc3P1o798","text":"'100%' video produced by DWJproductions"},
                  {"title":"Tell The People", "type":"youtube","date":new Date("2016-06-09"),"url":"https://www.youtube.com/embed/H0G2iBe0axQ", "urlcode":"H0G2iBe0axQ","text":"'Tell The People' video produced by DWJproductions"},

                  {"title":"New Ballin feat. J.A.", "type":"youtube","date":new Date("2016-10-12"),"url":"https://www.youtube.com/embed/EY_1yEP8PJ8","text":"New Ballin feat. J.A.", "art":"art/new_ballin.PNG"},
                  {"title":"Real Live", "type":"youtube","date":new Date("2015-08-20"),"url":"https://www.youtube.com/embed/UwYWQNkdF1Y","text":"The first track on Mind Control Empire"},
                  {"title":"Poetic Justice Freestyle", "type":"youtube","date":new Date("2015-02-13"),"url":"https://www.youtube.com/embed/-JYqJd3irRw","text":"A freestyle to the classic poetic justice track"},
                  {"title":"Call Em In", "type":"youtube","date":new Date("2016-02-04"),"url":"https://www.youtube.com/embed/OUaHK84TkBY","text":"'Call Em In' video produced by DWJproductions", "art":"art/Call_em_in.PNG"},
                  {"title":"Loyal", "type":"youtube","date":new Date("2016-02-25"),"url":"https://www.youtube.com/embed/j5kak2e0S-8","text":"'Loyal' video produced by DWJproductions"},
                  {"title":"Whole Time", "type":"youtube","date":new Date("2016-02-11"),"url":"https://www.youtube.com/embed/aM2K9vl5Z2Y","text":"'Whole Time' video produced by DWJproductions"},
                  {"title":"Radio Remix Vol 1: Jackin Beats", "type":"spinrilla-mixtape", "date":new Date("2016-04-13"), "url":"https://spinrilla.com/mixtapes/gandhi-ali_dmv-radio-remix-vol-1-jackin-beats-by-gandhi-ali/embed","text":"Radio Remix Vol 1. by Gandhi Ali","content":"<iframe width='100%' height='450px' style='border: 0' src='https://spinrilla.com/mixtapes/gandhi-ali_dmv-radio-remix-vol-1-jackin-beats-by-gandhi-ali/embed' allowtransparency='true'></iframe>"}
              ]}
          ],
          "events":[
              { "eventname":"SXSW Performance", "location":"South by Southwest Festival: Austin, Tx", "date":new Date( "2016-03-17 10:00:00"), "artistname":"GANDHI ALI", "tags":[]},
              { "eventname":"Hiphopyogalive performance", "location":"Washington Dc-Amsterdam Lounge", "date":new Date("2015-12-02 22:00:00"), "artistname":"GANDHI ALI",  "tags":[]},
              { "eventname":"Performance", "location":"Washington Dc:Zeba Bar", "date":new Date("2015-09-18 21:00:00"), "artistname":"MIND CONTROL EMPIRE",  "tags":[]},
              { "eventname":"Video Shoot", "location":"Hyattsville, Md: Hoodroach Tv", "date":new Date("2015-08-01 00:00:00"), "artistname":"MIND CONTROL EMPIRE",  "tags":[]},
              { "eventname":"Performance", "location":"Silver Spring, MD FestAfrica", "date":new Date("2015-08-08 00:00:00"), "artistname":"GANDHI ALI", "time":"00:00:00", "tags":[]},
              { "eventname":"Video Shoot", "location":"Hyattsville, Md: DWJ Productions", "date":new Date("2015-08-15 00:00:00"), "artistname":"MIND CONTROL EMPIRE",  "tags":[]},
              { "eventname":"Radio Interview", "location":"Temple Hills, MD: WinDC Radio", "date":new Date("2015-09-21 00:00:00"), "artistname":"MIND CONTROL EMPIRE",  "tags":[]},
              { "eventname":"Photo Shoot", "location":"National Harbor", "date":new Date("2015-08-21  00:00:00"), "artistname":"MIND CONTROL EMPIRE", "tags":[]},
              { "eventname":"Performance", "location":"Washington, DC: Pure Lounge", "date":new Date("2015-09-29 00:00:00"), "artistname":"MIND CONTROL EMPIRE",  "tags":[]},
              { "eventname":"Photo/Video Shoot", "location":"Germantown, MD: DWJ Productions", "date":new Date("2015-10-08 00:00:00"), "artistname":"MIND CONTROL EMPIRE",  "tags":[]},
              { "eventname":"Video Shoot", "location":"Washington, DC: ClipstarTV", "date":new Date("2015-11-05 00:00:00"), "artistname":"MIND CONTROL EMPIRE", "tags":[]},
              { "eventname":"Radio Interview", "location":"Washington, DC: Eddie Kayne Show", "date":new Date("2015-11-21 00:00:00"), "artistname":"MIND CONTROL EMPIRE", "tags":[]}
              ],
          "mcempire":[
              {"name":"'G'", "position":"CEO", "img":"site-images/GField.jpg","icon":"fa-building", "bio":"", "social":[{"site":"twitter", "handle":"Sir_CEO"}, {"site":"instagram", "handle":"CEO_KING_FIELDMOB"}]},
              {"name":"Dwayne", "position":"Videographer & Photographer", "img":"site-images/Dwayne.png","icon":"fa-video-camera", "bio":"", "social":[{"site":"twitter", "handle":"DWJproduction"}, {"site":"instagram", "handle":"DWJproduction"}]},
              {"name":"Drty Warhaul", "position":"Producer", "img":"site-images/Fields.jpg", "icon":"fa-headphones", "bio":"", "social":[{"site":"twitter", "handle":"inspiredmindz"},{"site":"soundcloud", "handle":"inspiredmindz"}]}
              ],
          "news":[
              {"title":"SXSW Performance", "date":new Date("2016-03-18 00:00:00"), "img":"imgs/site-images/Gandhi-sxsw.png", "content":"GANDHI Ali will be performing at this years SXSW (South By Southwest) music festival in Austin, TX. Visit http://www.sxsw.com/music for event and ticket information.", "tags":["GANDHI ALI","SXSW"]},
              {"title":"GANDHI Ali is releasing Drty Work Vol. 1", "date":new Date("2016-02-25 00:00:00"), "img":"imgs/art/DrtyWorkCover.jpg", "content":"GANDHI Ali is releasing Drty Work Vol. 1 produced by Drty Warhol in late February.  The Mixtape will be released here, Live Mixtapes, Spinrilla, & Soundcloud", "tags":["GANDHI ALI","Drty Work Vol. 1"]},
              {"title":"Website Launch", "date":new Date("2015-12-03 00:00:00"), "content":"The New Mind Control Empire website has officially been launched.  Welcome to the new Mind Control Empire Website", "tags":["Website","Mind Control Empire"]},
              {"title":"Drty Warhol Vol.1 coming soon", "date":new Date("2015-12-02 00:00:00"), "content":"Drty Warhol Vol.1 Mixtape coming in January will be released on the site.", "tags":["Mixtape","Mind Control Empire"], "image":"art/DrtyWorkCover.jpg"},
              {"title":"'The City' on the way", "date":new Date("2015-12-02 00:00:00"), "content":"The Video for 'The City' will be released this December.", "tags":["Video","Mind Control Empire"]}
              ],
          "spotlights":[
              {"order":1, "artist":"GANDHI ALI","title":"Chocolate City (Teaser)", "type":"youtube","date":"2016-08-25","urlcode":"LUHaEGtSHmc","text":"Walk with Gandhi Ali as he takes his new song through DC aka 'Chocolate City'"},
              {"order":2, "artist":"GANDHI ALI", "title":"100%", "type":"youtube","date":"2015-06-17","urlcode":"vKIc3P1o798","text":"'100%' video produced by DWJproductions"},
              {"order":3, "artist":"GANDHI ALI", "title":"Tell The People", "type":"youtube","date":"2015-06-09","urlcode":"H0G2iBe0axQ","text":"'Tell The People' video produced by DWJproductions"},
              {"order":4, "artist":"GANDHI ALI","title":"Interview & Cypher @ The Eddie Kayne Show", "type":"youtube","date":"2015-11-05","urlcode":"dIi6AySJsI0","text":"Interview and Cypher with Gandhi Ali on the The Eddie Kayne Show"}
            ],
          "slider": [{"image":"imgs/slider/IMG0.jpg", "title":"Mind Control Empire", "text":""}, {"image":"imgs/art/DrtyWorkCover.jpg", "title":"New Release: DRTY WORKs VOL. 1", "text":"Download now on Spinrilla or Listen on the Releases Page"}, {"image":"imgs/art/RadioRemix.jpg", "title":"RADIO REMIX VOL. 1", "text":"Download Now on spinrella.com"}, {"image":"imgs/slider/MCE1.jpg", "title":"Music Production And Management", "text":"Our Management team brings the world to the artist."}]
      };

     }

     return new MCEInfoData();
    }]);

})();
