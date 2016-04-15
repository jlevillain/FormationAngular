(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name formationAngularApp.controller:MainCtrl
   * @description
   * # MainCtrl
   * Controller of the formationAngularApp
   */
  angular.module('formationAngularApp')
    .controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['$scope', 'ComputerService', 'CompanyService']

    function MainCtrl($scope, ComputerService, CompanyService) {
      var vm = this;
      vm.page = {};
      vm.companyList = {};
      vm.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];
      vm.computerSize = 100;
      ComputerService.getAll().then(function(data) {
          vm.page = data;
          console.log(vm.page);
          return vm.page;
      });
      ComputerService.getPage("",1,2,false,5).then(function(data) {
          vm.page = data;
          console.log(vm.page);
          return vm.page;
      });
      ComputerService.getNewComputer().then(function(data) {
          vm.page = data;
          console.log(vm.page);
          return vm.page;
      });
      /*ComputerService.addComputer({id:0, name:"totoutou", introduced:"", discontinued:"",company:{id:0,name:""}}).then(function(data) {
          vm.page = data;
          console.log(vm.page);
          return vm.page;
      });*/
      ComputerService.modifyComputer(50).then(function(data) {
        vm.page = data;
        console.log(vm.page);
        return vm.page;
      });

      CompanyService.getAll().then(function(data) {
          vm.companyList = data;
          console.log(vm.companyList);
          return vm.companyList;
      });
      $scope.deleteComputer = function(url,text) {
      	var r = confirm(text);
      	if (r == true)
      	  {
      			window.location.href = url;
      	  }
      }
    }
})();
