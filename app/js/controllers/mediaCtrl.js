(function(){
   "use strict";

    angular.module('mediaCtrl').controller('MediaController', ['$state','mceInfo','$sce', '$mdDialog', function($state, mceInfo, $sce, $mdDialog){
      var vm = this;
      vm.title = "Media";
      var selectedImg = "";
      var itemDisplayMax = 8;
      var page = 0;
      //vm.media = mceInfo.media.all();
      vm.loading = true;
      mceInfo.media.flickrAll(function(res){
        vm.media = res;
        vm.displayItems = vm.media.slice(0,itemDisplayMax);
        page = 1;
        vm.selectedid = vm.displayItems[0].id;
        vm.loading = false;
      });

      /*Functions */
      vm.isSelected = isSelected;
      vm.changeSelected = changeSelected;
      vm.navSelected = navSelected;
      vm.enlargeImage = enlargeImage;
      vm.loadMore = loadMore;

      function loadMore(){
        page +=1;
        var first = itemDisplayMax * (page  - 1);
        if(vm.loading == false && vm.media.length > vm.displayItems.length ){
          vm.loading = true;
          var addItems = vm.media.slice(first, first + itemDisplayMax);
          vm.displayItems = vm.displayItems.concat(addItems);
          vm.loading = false;
        }
      }
      function enlargeImage(ev, item) {
        // Open Dialog
        selectedImg = item.img;
        $mdDialog.show({
          controller: DialogController,
          templateUrl: 'views/templates/_galleryPop.tmpl.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true,
          fullscreen: true
        });
      }

      function isSelected(id) {
        return (id == vm.selectedid ? "selected" : "");
      }
      function changeSelected(item) {
        vm.selectedid = item.id;
      }
      function navSelected(item) {
        return (item.images == vm.displayItems ? "selected" : "");
      }

      /**/

      function DialogController($scope, $mdDialog) {
        $scope.img = selectedImg;
        $scope.hide = function() {
          $mdDialog.hide();
        };

        $scope.cancel = function() {
          $mdDialog.cancel();
        };
      }

    }]);

})();
