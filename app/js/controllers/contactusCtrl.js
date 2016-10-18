(function(){
 "use strict";

  angular.module('contactUsCtrl').controller('ContactUsController', ['$state', function($state){
    var vm = this;
    vm.buildArray = buildArray;
    vm.setX = setX;

    function buildArray(num) {
      return new Array(num);
    }

    function setX(index) {
      var xval = Math.ceil((index/5) * 100);

      var max = 100;
      var min = 0;
      var rxval = Math.random() * (max - min) + min;
      var returnX = rxval + "%";

      return returnX;
    }
  }]);

})();
