(function(){
 "use strict";

  angular.module('empireCtrl').controller('EmpireController', ['$state','mceInfo', function($state,mceInfo){
    var vm = this;
    vm.mcEmpire = mceInfo.mcempire.all();

    /*Function*/
    vm.goToSocial = goToSocial;

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
    
  }]);
})();
