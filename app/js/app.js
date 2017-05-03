(function () {
	"use strict";
		angular.module('dataconfig', []);
		angular.module('config', [ 'ngMaterial' ]);
		angular.module('headerCtrl', ['ui.bootstrap']);
		angular.module('homeCtrl', ['ui.bootstrap', 'ngAnimate']);
		angular.module('artistsCtrl', ['ui.bootstrap', 'ngAnimate']);
		angular.module('empireCtrl', ['ui.bootstrap', 'ngAnimate']);
		angular.module('mediaCtrl', ['ui.bootstrap', 'ngAnimate', 'infinite-scroll']);
		angular.module('newsCtrl', ['ui.bootstrap', 'ngAnimate', 'ngSanitize']);
		angular.module('eventsCtrl', ['ui.bootstrap', 'ngAnimate', 'ui.calendar']);
		angular.module('releasesCtrl', ['ui.bootstrap', 'ngAnimate']);
		angular.module('contactUsCtrl', ['ui.bootstrap', 'ngAnimate']);

		angular.module('directives', []);

		/**/
    angular.module('MCEApp', ['ngMaterial','ngAnimate', 'ngScrollbars','ui.router', 'infinite-scroll', 'dataconfig', 'config','directives','headerCtrl','homeCtrl','artistsCtrl','empireCtrl','mediaCtrl','newsCtrl','eventsCtrl','releasesCtrl','contactUsCtrl']);

})();
