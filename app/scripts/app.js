'use strict';

/**
 * @ngdoc overview
 * @name formationAngularApp
 * @description
 * # formationAngularApp
 *
 * Main module of the application.
 */
angular
  .module('formationAngularApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'i18n'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .when('/AddComputer', {
        templateUrl: 'views/computer.html',
        controller: 'ComputerControleur',
        controllerAs: 'computer'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

  var i18n = angular.module('i18n');
    i18n.config(['i18nServiceProvider', function(i18nServiceProvider) {
        //Set Locales for service
        i18nServiceProvider.setLocales({
          'default': '../../i18n/resources-locale_en_US.json',
          'en': '../../i18n/resources-locale_en_US.json',
          'fr': '../../i18n/resources-locale_fr.json',
      }, true);
    }]);
