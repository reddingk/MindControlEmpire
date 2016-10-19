(function(){
 "use strict";

  angular.module('eventsCtrl').controller('EventsController', ['$state', 'mceInfo', function($state, mceInfo){
    var vm = this;
    vm.allEvents = mceInfo.events.all();

    
  }]);

})();
