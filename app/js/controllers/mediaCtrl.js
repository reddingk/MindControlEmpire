(function(){
   "use strict";

    angular.module('mediaCtrl').controller('MediaController', ['$state','mceInfo','$sce', function($state, mceInfo, $sce){
      var vm = this;
      vm.title = "Media";

      vm.media = mceInfo.media.all();
      vm.displayItems = vm.media;
      vm.selectedid = vm.displayItems[0].id;

      /*Functions */
      vm.isSelected = isSelected;
      vm.changeSelected = changeSelected;
      vm.navSelected = navSelected;

      function isSelected(id) {
        return (id == vm.selectedid ? "selected" : "");
      }
      function changeSelected(item) {
        vm.selectedid = item.id;
      }
      function navSelected(item) {
        return (item.images == vm.displayItems ? "selected" : "");
      }


    }]);

})();
