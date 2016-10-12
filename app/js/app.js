(function () {
	"use strict";
		angular.module('dataconfig', []);
		angular.module('config', [ 'ngMaterial' ]);
		angular.module('headerCtrl', ['ui.bootstrap']);
		angular.module('homeCtrl', ['ui.bootstrap', 'ngAnimate']);
		angular.module('directives', []);

		/**/
    angular.module('MCEApp', ['ngMaterial','ngAnimate', 'ngScrollbars','ui.router', 'dataconfig', 'config','directives','headerCtrl','homeCtrl']);

})();
