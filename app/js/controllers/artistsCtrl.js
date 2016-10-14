(function(){
 "use strict";

  angular.module('artistsCtrl').controller('ArtistsController', ['$state','$stateParams','mceInfo','$sce', function($state, $stateParams, mceInfo, $sce){
    var vm = this;
    vm.title = "artists";

    vm.allArtists = mceInfo.artists.all();

    /*Artist Details*/
    vm.artistId = $stateParams.artistId;
    vm.artistProfile = null;
    vm.displayedReleases = null;
     
    if(vm.artistId != undefined){
      vm.artistProfile = mceInfo.artists.byName(vm.artistId);
      vm.displayedReleases = {"page":1, "totalpages":Math.ceil(vm.artistProfile.releases.length / 6) , "releases":vm.artistProfile.releases.slice(0,6)};
    }

    /*Functions*/
    vm.replaceSpace = replaceSpace;
    vm.URLClean = URLClean;
    vm.releasePaging = releasePaging;
    vm.checkButton = checkButton;

    function checkButton(direction) {
      var bool = false;
      if(direction == "up"){
        if((vm.displayedReleases.page + 1) <= vm.displayedReleases.totalpages) {bool = true;}
      }
      else{
        if((vm.displayedReleases.page - 1) > 0) { bool = true;}
      }
      return bool;
    }

    function releasePaging(direction){
      if(direction == "up"){
        if((vm.displayedReleases.page + 1) <= vm.displayedReleases.totalpages)
        {
          vm.displayedReleases.page +=1;
        }
      }
      else{
        if((vm.displayedReleases.page - 1) > 0)
        {
          vm.displayedReleases.page -=1;
        }
      }
      var first = 6 * (vm.displayedReleases.page  - 1);
      vm.displayedReleases.releases = vm.artistProfile.releases.slice(first,first+6);
    }

    function URLClean(url) {
      return $sce.trustAsResourceUrl(url);
    }

    function replaceSpace(string){
      return string.split(' ').join('_');
    }

  }]);

})();
