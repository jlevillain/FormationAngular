(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name formationAngularApp.controller:AboutCtrl
   * @description
   * # AboutCtrl
   * Controller of the formationAngularApp
   */
  angular.module('formationAngularApp')
    .controller('ComputerCtrl', ComputerCtrl);

    ComputerCtrl.$inject = ['$scope', '$window', '$location', 'ComputerService', 'CompanyService', 'i18nService'];


    function ComputerCtrl($scope, $window, $location, ComputerService, CompanyService, i18nService) {
      var vm = this;
      vm.computer = null;
      vm.error = null;
    };
})();
