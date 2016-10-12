(function(){
   "use strict";

    angular.module('directives').directive('sectionSelect', ['$window', function($window) {
      return {
        restrict: 'EA',
        link: function ($scope, element, attrs) {

          angular.element($window).bind("scroll", function() {

            var selectOffset = 200;

            var windowp = angular.element($window)[0];
            var topThreshHold = element[0].offsetTop - selectOffset;
            var bottomThreshHold = (element[0].offsetTop + element[0].offsetHeight) - selectOffset;

            if(windowp.pageYOffset >= topThreshHold && windowp.pageYOffset < bottomThreshHold){
              if(!element.hasClass("screenSelect")){
                element.addClass("screenSelect");
              }
            }
            else {
              if(element.hasClass("screenSelect")){
                element.removeClass("screenSelect");
              }
            }

          });
        }
      }

    }]);

})();
