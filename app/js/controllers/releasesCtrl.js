(function(){
 "use strict";

  angular.module('releasesCtrl').controller('ReleasesController', ['$state', 'mceInfo',function($state,mceInfo){
    var vm = this;
    vm.releasesList = mceInfo.releases.all();
    vm.allReleases = {"videos":[], "mixtapes":[], "tracks":[]};

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

  }]);

})();
