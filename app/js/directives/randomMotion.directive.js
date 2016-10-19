(function(){
   "use strict";

    angular.module('directives').directive('randomMotion', ['$timeout', function($timeout) {
      return {
        restrict: 'EA',
        link: function ($scope, element, attrs) {
          console.log("Start Motion");
          var parentContainer = element[0].offsetParent;

          // Randomly Set Postion & Velocity
          var maxVelocity = 150;
          var posX = (Math.random() * parentContainer.clientWidth);//Math.min(0, Math.max(20, (Math.random() * 0)));
          var posY = (Math.random() * parentContainer.clientHeight);//Math.min(0, Math.max(20, (Math.random() * 10)));
          var velX = (Math.random() * maxVelocity);
          var velY = (Math.random() * maxVelocity);
          var timestamp = null;



          // Move Object
          (function tick() {
            var now = new Date().getTime();
            var borderX = 250; //parentContainer.clientWidth *.05;
            var borderY = 250; //parentContainer.clientHeight *.20;

            var maxX = parentContainer.clientWidth - borderX;
            var maxY = parentContainer.clientHeight - borderY;

            var elapsed = (timestamp || now) - now;
            timestamp = now;
            posX += elapsed * velX / 1000;
            posY += elapsed * velY / 1000;

            if (posX > maxX) {
                posX = 2 * maxX - posX;
                velX *= -1;
            }
            if (posX < -60) {
                posX = -60;
                velX *= -1;
            }
            if (posY > maxY) {
                posY = 2 * maxY - posY;
                velY *= -1;
            }
            if (posY < -60) {
                posY = -60;
                velY *= -1;
            }
            element.css({ "top": posY, "left": posX });
            // Set Position to $element top and left
            // Loop to Move object
            $timeout(tick, 30);
          })();
        }
      }
    }]);

})();
