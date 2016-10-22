(function(){
 "use strict";

  angular.module('releasesCtrl').controller('ReleasesController', ['$state', 'mceInfo', '$sce',function($state,mceInfo,$sce){
    var vm = this;
    vm.releasesList = mceInfo.releases.all();
    vm.allReleases = {"videos":[], "mixtapes":[], "tracks":[]};
    vm.backSVG = "views/templates/_gravity.html";

    var itemDisplayMax = 3;

    for(var i =0; i < vm.releasesList.length; i++)
    {
      var tmpRelease = vm.releasesList[i];
      if(tmpRelease.type == "youtube"){
        vm.allReleases.videos.push(tmpRelease);
      }
      else if(tmpRelease.type.includes("mixtape")){
        vm.allReleases.mixtapes.push(tmpRelease);
      }
      else if(tmpRelease.type.includes("track")){
        vm.allReleases.tracks.push(tmpRelease);
      }
    }

    vm.displayedReleases = {
      "videos":{"page":1, "totalpages":Math.ceil(vm.allReleases.videos.length / itemDisplayMax), "releases":vm.allReleases.videos.slice(0,3)},
      "mixtapes":{"page":1, "totalpages":vm.allReleases.mixtapes.length , "releases":vm.allReleases.mixtapes[0]},
      "profiles":{"page":1, "totalpages":Math.ceil(vm.allReleases.tracks.length / itemDisplayMax), "releases":vm.allReleases.tracks.slice(0,3)},
    };

    /*Functions*/
    vm.releasePaging = releasePaging;
    vm.checkButton = checkButton;
    vm.URLClean = URLClean;

    function URLClean(url) {
      return $sce.trustAsResourceUrl(url);
    }

    function checkButton(direction, type) {
      var bool = false;

      if(direction == "up"){
        if((vm.displayedReleases[type].page + 1) <= vm.displayedReleases[type].totalpages) {bool = true;}
      }
      else{
        if((vm.displayedReleases[type].page - 1) > 0) { bool = true;}
      }
      return bool;
    }

    function releasePaging(direction, type){
      if(direction == "up"){
        if((vm.displayedReleases[type].page + 1) <= vm.displayedReleases[type].totalpages)
        {
          vm.displayedReleases[type].page +=1;
        }
      }
      else{
        if((vm.displayedReleases[type].page - 1) > 0)
        {
          vm.displayedReleases[type].page -=1;
        }
      }
      var first = itemDisplayMax * (vm.displayedReleases[type].page  - 1);
      vm.displayedReleases[type].releases = (type != "mixtapes" ? vm.allReleases[type].slice(first,first+ itemDisplayMax) : vm.allReleases[type][(vm.displayedReleases[type].page  - 1)]);
    }

  }]);

})();
