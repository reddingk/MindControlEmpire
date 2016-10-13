(function(){
   "use strict";

    angular.module('homeCtrl').controller('HomeController', ['$state','mceInfo','$sce', function($state, mceInfo, $sce){
      var vm = this;
      vm.title = "Home";

      vm.recentNews = mceInfo.news.latests();
      vm.newsBackSVG = "views/templates/_gravity.html";
      vm.topArtists = mceInfo.artists.top();
      vm.slider = mceInfo.slider.all();
      vm.spotlights = mceInfo.spotlights.all();
      vm.spotSelected = vm.spotlights[0];

      vm.active = 0;
      vm.interval = 0;
      vm.configScroll = {
          theme: 'dark-3',
          setHeight: false,
          scrollButtons: { enable: true },
          scrollInertia: 0
      };

      /*Functions */
      vm.youtubeURL = youtubeURL;
      vm.swapSelected = swapSelected;

      function youtubeURL(urlcode, type){
        return $sce.trustAsResourceUrl((type == "video"? "https://www.youtube.com/embed/"+urlcode : "http://img.youtube.com/vi/"+urlcode+"/default.jpg"));
      }
      function swapSelected(item) {
        vm.spotSelected = item;
      }

    }]);

})();
