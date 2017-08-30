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
    vm.displayedImg = null;
    var itemDisplayMax = 3;

    if(vm.artistId != undefined)
    {
      vm.artistProfile = mceInfo.artists.byName(vm.artistId);
      vm.displayedImg = vm.artistProfile.image;
      vm.allReleases = {"videos":[], "mixtapes":[], "profiles":[], "itunes":[]};

      for(var i =0; i < vm.artistProfile.releases.length; i++)
      {
        var tmpRelease = vm.artistProfile.releases[i];
        if(tmpRelease.type == "youtube"){
          vm.allReleases.videos.push(tmpRelease);
        }
        else if(tmpRelease.type.includes("mixtape")){
          vm.allReleases.mixtapes.push(tmpRelease);
        }
        else if(tmpRelease.type.includes("profile")){
          vm.allReleases.profiles.push(tmpRelease);
        }
        else if(tmpRelease.type.includes("itunes")){
          vm.allReleases.itunes.push(tmpRelease);
        }
      }

      vm.displayedReleases = {
        "imgs":{"page":1, "totalpages":Math.ceil(vm.artistProfile.addimages.length / 4), "display": vm.artistProfile.addimages.slice(0,4)},
        "videos":{"page":1, "totalpages":Math.ceil(vm.allReleases.videos.length / itemDisplayMax), "releases":vm.allReleases.videos.slice(0,3)},
        "mixtapes":{"page":1, "totalpages":vm.allReleases.mixtapes.length , "releases":vm.allReleases.mixtapes[0]},
        "itunes":{"page":1, "totalpages":Math.ceil(vm.allReleases.itunes.length / itemDisplayMax), "releases":vm.allReleases.itunes.slice(0,3)},
        "profiles":vm.allReleases.profiles,
        "defaultImg": "imgs/logos/logoR.png"
      };
    }

    /*Functions*/
    vm.imgChange = imgChange;
    vm.imagePaging = imagePaging;
    vm.checkImgButton = checkImgButton;

    vm.replaceSpace = replaceSpace;
    vm.URLClean = URLClean;
    vm.releasePaging = releasePaging;
    vm.checkButton = checkButton;
    vm.isPassed = isPassed;
    vm.goToSocial = goToSocial;
    vm.buildArray = buildArray;
    vm.youtubeURL = youtubeURL;
    vm.cleanUrl = cleanUrl;

    function cleanUrl(url){
      return $sce.trustAsResourceUrl(url);
    }

    function youtubeURL(urlcode, type){
      var returnUrl = "";
      switch (type) {
        case "site":
          returnUrl = "https://www.youtube.com/watch?v="+urlcode;
          break;
        case "video":
          returnUrl = "https://www.youtube.com/embed/"+urlcode;
          break;
        case "image":
          returnUrl = "http://img.youtube.com/vi/"+urlcode+"/hqdefault.jpg";
          break;
        default:
          returnUrl = "";
          break;
      }
      return $sce.trustAsResourceUrl(returnUrl);
    }

    function buildArray(num) {
      return new Array(num);
    }

    function goToSocial(social){
      var newUrl = "";
      switch(social.site){
        case "twitter":
          newUrl = "https://twitter.com/" + social.handle;
          break;
        case "instagram":
          newUrl = "https://www.instagram.com/"+social.handle;
          break;
        case "soundcloud":
          newUrl = "https://soundcloud.com/"+social.handle;
          break;
      }
      return newUrl;
    }

    function isPassed(date){
      var today = new Date();
      return (date < today ? "passed" : "");
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

    function URLClean(url) {
      return $sce.trustAsResourceUrl(url);
    }

    function replaceSpace(string){
      return string.split(' ').join('_');
    }

    function checkImgButton(direction){
      var bool = false;

      if(direction == "up"){
        if((vm.displayedReleases.imgs.page + 1) <= vm.displayedReleases.imgs.totalpages) {bool = true;}
      }
      else{
        if((vm.displayedReleases.imgs.page - 1) > 0) { bool = true;}
      }
      return bool;
    }

    function imagePaging(direction) {
      if(direction == "up"){
        if((vm.displayedReleases.imgs.page + 1) <= vm.displayedReleases.imgs.totalpages)
        {
          vm.displayedReleases.imgs.page +=1;
        }
      }
      else{
        if((vm.displayedReleases.imgs.page - 1) > 0)
        {
          vm.displayedReleases.imgs.page -=1;
        }
      }
      var first = 4 * (vm.displayedReleases.imgs.page  - 1);
      vm.displayedReleases.imgs.display = vm.artistProfile.addimages.slice(first,first+ 4);
    }
    function imgChange(img) {
      vm.displayedImg = img;
    }



  }]);

})();
