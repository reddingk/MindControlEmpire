(function(){
  'use strict';

  angular
    .module('dataconfig')
    .service('mceInfo', [ 'MCEData', '$filter', '$http', function MCEInfo(MCEData, $filter, $http){
      var artists = MCEData.siteData.artists;
      var events = MCEData.siteData.events;
      var news = MCEData.siteData.news;
      var mcempire = MCEData.siteData.mcempire;
      var spotlights = MCEData.siteData.spotlights;
      var slider = MCEData.siteData.slider;
      var media = MCEData.siteData.media;

      function eventsByname(name, max) {
        var returnedEvents=[];

        for(var i =0; i < events.length; i++){
          if(events[i].artistname == name && returnedEvents.length <= max){
            returnedEvents.push(events[i]);
          }
        }
        return returnedEvents;
      }

      function stringFormat(str, args) {
         var content = str;
         for (var i=0; i < args.length; i++) {
              var replacement = '{' + i + '}';
              content = content.replace(replacement, args[i]);
         }
         return content;
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
        },
        media: {
          all: function (){
            var mediaList=[];
            for(var i=0; i< media.length; i++){
              mediaList.push({"id":i, "img":media[i]});
            }
            return mediaList;
          },
          flickrAll: function(callback){
            var url = "https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key={0}&photoset_id={1}&user_id={2}&format=json&nojsoncallback=1";
            var fullUrl = stringFormat(url, ["37ecabdfda65c6e2cf2847f4bc54ce44", "72157680164158474", "149188780@N02"]);

            $http({
              method: 'GET',
              url: fullUrl,
              headers: {
                'Content-Type': 'application/json'
              }
            }).then(function successCallback(response) {
                var responseList = response.data.photoset.photo;
                var photoUrl = "http://c1.staticflickr.com/{0}/{1}/{2}_{3}_b.jpg";
                var tmpObj = [];
                for(var j=0; j < responseList.length; j++){
                  tmpObj.push({"id":j, "title":responseList[j].title, "img":stringFormat(photoUrl, [responseList[j].farm, responseList[j].server, responseList[j].id, responseList[j].secret])});
                }
                callback(tmpObj);
            }, function errorCallback(response){

            });

          }
        }
      }
    }])
    .factory("MCEData", ['$q', '$http', function($q, $http){
     function MCEInfoData() {
       var vm = this;


       vm.siteData = {
          "artists":[
              {"name":"GANDHI ALI", "quote":"Real Live", "bio":"Mind Control Empire's first solo artist","image":"GandhiAli/GandhiAli.jpg",
                "addimages":["GandhiAli/GandhiAli.png", "GandhiAli/GandhiAli1.jpg","GandhiAli/GandhiAli2.jpg","GandhiAli/GandhiAli3.jpg","GandhiAli/GandhiAli4.jpg","GandhiAli/GandhiAli5.jpg","GandhiAli/GandhiAli6.jpg","GandhiAli/GandhiAli7.jpg"],
              "social":[
                  {"site":"twitter","handle":"gandhi3x"},
                  {"site":"instagram","handle":"gandhi3x"},
                  {"site":"soundcloud","handle":"gandhi3x"}],
              "releases":[
                  {"title":"Never Mind Em", "type":"youtube","date":new Date("2017-06-18"),"urlcode":"5WkiBOylzC0","text":"Gandhi Ali Never Mind Em"},

                  {"title":"Never Mind Em", "type":"itunes", "url":"https://itunes.apple.com/us/album/never-mind-em-single/id1227808499", "img":"imgs/art/neverMindEm.png"},
                  {"title":"Kill Em All", "type":"itunes", "url":"https://itunes.apple.com/album/id1167613517?ls=1&amp;app=itunes", "img":""},
                  {"title":"D.D.M.", "type":"itunes", "url":"https://itunes.apple.com/album/id1135657412?ls=1&amp;app=itunes", "img":"imgs/art/DDM.jpg"},
                  {"title":"Sorry", "type":"itunes", "url":"https://itunes.apple.com/album/id1137842803?ls=1&amp;app=itunes", "img":""},

                  {"title":"Five", "type":"youtube","date":new Date("2016-09-15"),"urlcode":"8YyLoJkPYRI","text":"Gandhi Ali Five"},
                  {"title":"Riding", "type":"youtube","date":new Date("2016-12-07"),"urlcode":"34YuaewcAzo","text":"Gandhi Ali Ridin' ft. King Kla$$"},
                  {"title":"Jumpman", "type":"youtube","date":new Date("2015-12-12"),"urlcode":"bjMnCi8KEFg","text":"Jumpman"},

                  {"title":"Yeah2x", "type":"spinrilla-track","date":new Date("2017-04-15"),"url":"https://spinrilla.com/singles/1139484-gandhi-ali-yeah2x","text":"Gandhi Ali - Yeah2x", "img":"https://cdn.spinrilla.com/tracks/1139484/large/1139484.png?1492712270"},
                  {"title":"Freestyle", "type":"youtube","date":new Date("2017-04-15"),"urlcode":"BlCM6L4Gbss","text":"Freestyle  shot by: @ShotByRayGun"},
                  {"title":"Lucky", "type":"youtube","date":new Date("2017-02-24"),"urlcode":"DJGjXKln8L8","text":"Lucky"},

                  {"title":"TD And Dab", "type":"spinrilla-track","date":new Date("2016-10-15"),"url":"https://spinrilla.com/singles/846503-gandhi-ali-td-and-dab","text":"Gandhi Ali - TD And Dab", "img":"https://cdn.spinrilla.com/tracks/846503/large/846503.jpg?1477514437"},
                  {"title":"Lil Bih", "type":"spinrilla-track","date":new Date("2016-10-15"),"url":"https://spinrilla.com/singles/834636-gandhi-ali-lil-bih","text":"Gandhi Ali - Lil Bih", "img":"https://cdn.spinrilla.com/tracks/834636/large/834636.png?1476733332"},
                  {"title":"Kill Em All", "type":"soundcloud-track","date":new Date("2016-10-09"),"url":"https://soundcloud.com/gandhi3x/gandhi-ali-kill-em-all-prod-by-trackanometry-drty-warhol-rough","text":"Gandhi Ali - Kill Em All", "img":"https://i1.sndcdn.com/artworks-000187342796-09tszq-t200x200.jpg"},
                  {"title":"100% ft. Yung Sonic", "type":"soundcloud-track","date":new Date("2016-08-20"),"url":"https://soundcloud.com/gandhi3x/100-ft-yung-sonic","text":"Gandhi Ali ft. Yung Sonic - 100%" , "img":"https://i1.sndcdn.com/artworks-000175223671-v5zlyr-t200x200.jpg"},
                  {"title":"Sorry", "type":"soundcloud-track","date":new Date("2016-08-20"),"url":"https://soundcloud.com/gandhi3x/gandhi-ali-sorry","text":"Gandhi Ali - Sorry", "img":"https://i1.sndcdn.com/artworks-000173467761-h8v0ax-t200x200.jpg"},
                  {"title":"Dirty Work", "type":"spinrilla-mixtape", "date":new Date("2016-07-12"), "url":"https://spinrilla.com/mixtapes/gandhi-ali-dirty-work/embed","text":"Drty Work by Gandhi Ali"},
                  {"title":"SoundCloudProfile", "type":"soundcloud-profile","date":"","url":"https://soundcloud.com/gandhi3x","text":"Gandhi Ali Sound Cloud Profile"},
                  {"title":"Girlfriend Remix", "type":"soundcloud-track","date":new Date("2016-06-20"),"url":"https://soundcloud.com/gandhi3x/gandhi-ali-girlfriend-remix","text":"Gandhi Ali - Girlfriend Remix", "img":"https://i1.sndcdn.com/artworks-000166403193-lgnbsc-t200x200.jpg"},
                  {"title":"Savages", "type":"soundcloud-track","date":new Date("2016-05-10"),"url":"https://soundcloud.com/gandhi3x/gandhi-ali-savages","text":"Gandhi Ali - Girlfriend Remix", "img":"https://i1.sndcdn.com/artworks-000162387810-4so50q-t200x200.jpg"},
                  {"title":"Publicly Intoxicated ft. JA", "type":"soundcloud-track","date":new Date("2016-04-24"),"url":"https://soundcloud.com/gandhi3x/publiclyintoxicated","text":"Gandhi Ali - Girlfriend Remix", "img":"https://i1.sndcdn.com/artworks-000157641977-43mb86-t200x200.jpg"},
                  {"title":"Legal", "type":"soundcloud-track","date":new Date("2016-02-13"),"url":"https://soundcloud.com/gandhi3x/gandhi-ali-legal","text":"Gandhi Ali - Girlfriend Remix", "img":"https://i1.sndcdn.com/artworks-000148553495-n6d8ig-t200x200.jpg"},
                  {"title":"Deal (Prod By Drty Warhol x Carlos Montiel)", "type":"soundcloud-track","date":new Date("2016-2-20"),"url":"https://soundcloud.com/gandhi3x/gandhi-ali-deal-freestyle","text":"Gandhi Ali - Girlfriend Remix", "img":"https://i1.sndcdn.com/artworks-000147494836-o2mx79-t200x200.jpg"},

                  {"title":"Dapper", "type":"youtube","date":new Date("2016-08-13"),"url":"https://www.youtube.com/embed/cy4Jhd16VJE", "urlcode":"cy4Jhd16VJE","text":"'Dapper' video shot by TOA$T"},
                  {"title":"100%", "type":"youtube","date":new Date("2016-06-17"),"url":"https://www.youtube.com/embed/vKIc3P1o798", "urlcode":"vKIc3P1o798","text":"'100%' video produced by DWJproductions"},
                  {"title":"Tell The People", "type":"youtube","date":new Date("2016-06-09"),"url":"https://www.youtube.com/embed/H0G2iBe0axQ", "urlcode":"H0G2iBe0axQ","text":"'Tell The People' video produced by DWJproductions"},

                  {"title":"New Ballin feat. J.A.", "type":"youtube","date":new Date("2016-10-12"),"url":"https://www.youtube.com/embed/EY_1yEP8PJ8", "urlcode":"EY_1yEP8PJ8" ,"text":"New Ballin feat. J.A.", "art":"art/new_ballin.PNG"},
                  {"title":"Real Live", "type":"youtube","date":new Date("2015-08-20"),"url":"https://www.youtube.com/embed/UwYWQNkdF1Y",  "urlcode":"UwYWQNkdF1Y" ,"text":"The first track on Mind Control Empire"},
                  {"title":"Poetic Justice Freestyle", "type":"youtube","date":new Date("2015-02-13"),"url":"https://www.youtube.com/embed/-JYqJd3irRw",  "urlcode":"-JYqJd3irRw" ,"text":"A freestyle to the classic poetic justice track"},
                  {"title":"Call Em In", "type":"youtube","date":new Date("2016-02-04"),"url":"https://www.youtube.com/embed/OUaHK84TkBY",  "urlcode":"OUaHK84TkBY" ,"text":"'Call Em In' video produced by DWJproductions", "art":"art/Call_em_in.PNG"},
                  {"title":"Loyal", "type":"youtube","date":new Date("2016-02-25"),"url":"https://www.youtube.com/embed/j5kak2e0S-8",  "urlcode":"j5kak2e0S-8" ,"text":"'Loyal' video produced by DWJproductions"},
                  {"title":"Whole Time", "type":"youtube","date":new Date("2016-02-11"),"url":"https://www.youtube.com/embed/aM2K9vl5Z2Y",  "urlcode":"aM2K9vl5Z2Y" ,"text":"'Whole Time' video produced by DWJproductions"},
                  {"title":"Radio Remix Vol 1: Jackin Beats", "type":"spinrilla-mixtape", "date":new Date("2016-04-13"), "url":"https://spinrilla.com/mixtapes/gandhi-ali_dmv-radio-remix-vol-1-jackin-beats-by-gandhi-ali/embed","text":"Radio Remix Vol 1. by Gandhi Ali","content":"<iframe width='100%' height='450px' style='border: 0' src='https://spinrilla.com/mixtapes/gandhi-ali_dmv-radio-remix-vol-1-jackin-beats-by-gandhi-ali/embed' allowtransparency='true'></iframe>"}
              ]}
          ],
          "events":[
              { "eventname":"Basement Tuesdays", "location":"Pure Lounge - 1326 U Street, NW, DC", "date":new Date( "2017-07-25 19:00:00"), "artistname":"GANDHI ALI", "tags":[]},
              { "eventname":"Midnight Flow 2", "location":"8241 Georgia Ave., Silver Spring, Md. 20910", "date":new Date( "2016-11-02 21:00:00"), "artistname":"GANDHI ALI", "tags":[]},
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
              {"name":"Dwayne", "position":"Videographer & Photographer", "img":"site-images/Dwayne.jpg","icon":"fa-video-camera", "bio":"", "social":[{"site":"twitter", "handle":"DWJproduction"}, {"site":"instagram", "handle":"DWJproduction"}]},
              {"name":"Drty Warhol", "position":"Producer", "img":"site-images/Fields.jpg", "icon":"fa-headphones", "bio":"", "social":[{"site":"twitter", "handle":"inspiredmindz"},{"site":"soundcloud", "handle":"inspiredmindz"}]}
              ],
          "news":[
              {"title":"Gandhi Ali Live @ Basement Tuesdays", "date":new Date("2017-07-23 00:00:00"), "img":"imgs/media/basementEvent.jpg", "content":"Gandhi Ali will be performing Live at Pure Lounge's Basement Tuesday's.  This Tuesday, July 25 Doors open at 7pm, 21 and up, @ 1326 U Street, NW, DC", "tags":["GANDHI ALI","Basement Tuesday"]},
              {"title":"'Never Mind Em' Out Now", "date":new Date("2017-04-18 00:00:00"), "img":"imgs/site-images/nevermindem.jpg", "content":"Never Mind Em Single Out now on ITunes, Spotify, and more....", "link":{"url":"https://itunes.apple.com/us/album/never-mind-em-single/id1227808499", "text":"Itunes Download"}, "tags":["GANDHI ALI","Spotify", "Itunes"]},
              {"title":"SXSW Performance", "date":new Date("2016-03-18 00:00:00"), "img":"imgs/site-images/Gandhi-sxsw.png", "content":"GANDHI Ali will be performing at this years SXSW (South By Southwest) music festival in Austin, TX. Visit http://www.sxsw.com/music for event and ticket information.", "tags":["GANDHI ALI","SXSW"]},
              {"title":"GANDHI Ali is releasing Drty Warhol Vol. 1", "date":new Date("2016-02-25 00:00:00"), "img":"imgs/art/DrtyWorkCover.jpg", "content":"GANDHI Ali is releasing Drty Work Vol. 1 produced by Drty Warhol in late February.  The Mixtape will be released here, Live Mixtapes, Spinrilla, & Soundcloud", "tags":["GANDHI ALI","Drty Work Vol. 1"]},
              {"title":"Website Launch", "date":new Date("2015-12-03 00:00:00"), "content":"The New Mind Control Empire website has officially been launched.  Welcome to the new Mind Control Empire Website", "tags":["Website","Mind Control Empire"]},
              {"title":"Drty Warhol Vol.1 coming soon", "date":new Date("2015-12-02 00:00:00"), "content":"Drty Warhol Vol.1 Mixtape coming in January will be released on the site.", "tags":["Mixtape","Mind Control Empire"], "image":"art/DrtyWorkCover.jpg"},
              {"title":"'The City' on the way", "date":new Date("2015-12-02 00:00:00"), "content":"The Video for 'The City' will be released this December.", "tags":["Video","Mind Control Empire"]}
              ],
          "spotlights":[
              {"order":1, "artist":"GANDHI ALI","title":"Never Mind Em", "type":"youtube","date":"2016-06-18","urlcode":"5WkiBOylzC0","text":"Gandhi Ali Never Mind Em"},
              {"order":2, "artist":"GANDHI ALI","title":"Gandhi Ali - Freestyle", "type":"youtube","date":"2017-04-15","urlcode":"BlCM6L4Gbss","text":"Listen to Gandhi Ali's Freestyle  shot by: @ShotByRayGun"},
              {"order":3, "artist":"GANDHI ALI","title":"Gandhi Ali - Lucky", "type":"youtube","date":"2017-02-24","urlcode":"DJGjXKln8L8","text":"Listen to Gandhi Ali's Lucky"},
              {"order":4, "artist":"GANDHI ALI","title":"Chocolate City (Teaser)", "type":"youtube","date":"2016-08-25","urlcode":"LUHaEGtSHmc","text":"Walk with Gandhi Ali as he takes his new song through DC aka 'Chocolate City'"}
            ],
          "slider": [
            {"image":"imgs/media/basementEvent.jpg", "title":"Basement Tuesdays Performance", "text":"Gandhi Ali will be performing this tuesday at Pure Lounge's 'Basement Tuesdays'" , "link":{"url":"http://www.mindcontrolempire.com/news/article/Gandhi%20Ali%20Live%20@%20Basement%20Tuesdays", "text":"More Info"}},
            {"image":"imgs/site-images/NevermindemVid.JPG", "title":"New Video 'Never Mind Em'", "text":"Video for Gandhi's Single 'Never Mind Em' now avaliable on Youtube", "link":{"url":"https://www.youtube.com/watch?v=5WkiBOylzC0", "text":"Watch Now"}},

            {"image":"imgs/slider/main1.png", "title":"Mind Control Empire", "text":""},
            {"image":"imgs/art/neverMindEm.png", "title":"Never Mind Em Now Avaliable", "text":"Gandhi's Single 'Never Mind Em' now avaliable on ITunes", "link":{"url":"https://itunes.apple.com/us/album/never-mind-em-single/id1227808499", "text":"Download Now"}},
            {"image":"imgs/site-images/doubleDrop2.jpg", "title":"Gandhi Video's Drop", "text":"Check out Gandhi's two new video release's 'Freestyle' & 'Lucky' "}        
          ],
          "media":["imgs/media/IMG1.jpg","imgs/media/IMG2.jpg","imgs/media/IMG4.jpg","imgs/media/IMG5.jpg","imgs/media/IMG6.jpg","imgs/media/IMG7.jpg","imgs/media/IMG8.jpg","imgs/media/IMG9.jpg","imgs/media/IMG10.png","imgs/media/IMG11.jpg","imgs/media/IMG12.jpg","imgs/media/IMG13.jpg","imgs/media/IMG14.jpg","imgs/media/IMG15.jpg"]
      };
     }

     return new MCEInfoData();
    }]);

})();
