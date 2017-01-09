(function(){
   "use strict";

    angular.module('directives').directive('scrollAction', ['$window', function($window) {
      return {
        restrict: 'EA',
        link: function ($scope, element, attrs) {

          var selectOffset = (attrs.scrollAction == null ? 0 : attrs.scrollAction);
          var windowp = angular.element($window)[0];
          var offsetTop = element[0].offsetTop;
          var topThreshHold = element.position().top; //offsetTop - selectOffset;
          element.addClass("screenScroll");

          if(windowp.pageYOffset >= topThreshHold){
            if(!element.hasClass("screenAction")){
              element.addClass("screenAction");
            }
          }
          else {
            element.addClass("screenEmpty");
          }

          angular.element($window).bind("scroll", function() {
            selectOffset = (attrs.scrollAction == null ? 0 : attrs.scrollAction);
            windowp = angular.element($window)[0];
            offsetTop = element[0].offsetTop;
            //(element[0].offsetParent != null && element[0].offsetTop < element[0].offsetParent.offsetTop ? element[0].offsetParent.offsetTop : element[0].offsetTop);
            topThreshHold = offsetTop - selectOffset;

            if(windowp.pageYOffset >= topThreshHold){
              if(!element.hasClass("screenAction")){
                element.removeClass("screenEmpty");
                element.addClass("screenAction");
              }
            }

          });
        }
      }

    }]);

})();
