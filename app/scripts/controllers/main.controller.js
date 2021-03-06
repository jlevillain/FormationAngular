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
    .controller('MainController', MainController);

    MainController.$inject = ['$scope', '$window', '$location', 'ComputerService', 'CompanyService', 'i18nService']

    function MainController($scope, $window, $location, ComputerService, CompanyService, i18nService) {
      var vm = this;
      vm.deleteComputer = deleteComputer;
      vm.page = null;
      vm.companyList = {};
      vm.computerList = {};
      vm.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];
      vm.pagination = [];

      initVariable();
      init();

      function deleteComputer(id) {
        var r = $window.confirm(i18nService.getString('Delete.message'));
        if (r == true)
          {
            ComputerService.deleteComputer(id);
            $window.location.reload();
          }
      }

      function computeNbPages () {
        vm.nbPages = Math.floor(vm.computerSize/vm.nbPage);
        if((vm.computerSize/vm.nbPage)-vm.nbPages > 0) {
          vm.nbPages = vm.nbPages+1;
          vm.end = vm.nbPages;
          if(vm.pageNumber<0) {
            vm.begin = 1;
          }
          if(vm.pageNumber > vm.end) {
            vm.end = vm.nbPages;
          }
        }
        vm.pagination = [];
        var begin = ((vm.pageNumber-vm.interval)<vm.begin)?vm.begin:vm.pageNumber-vm.interval;
        var end = ((vm.pageNumber+vm.interval)>vm.end)?vm.end:vm.pageNumber+vm.interval;
        for(var i=begin;i<=end;i++) {
          vm.pagination.push(i);
        }
      }

      function initVariable() {
        vm.computerSize = 0;
        vm.pageNumber = 1;
        vm.search = "";
        vm.orderBy = 2;
        vm.nbPage = 10;
        vm.isDesc = false;
        vm.interval = 5;
        vm.begin = 1;
      }

      function init() {
        var searchObject = $location.search();

        if(jQuery.isEmptyObject(searchObject)) {
          ComputerService.getAll().then(function(data) {
              vm.computerList = data.computerList;
              vm.computerSize = data.computerSize;
              computeNbPages();
              return vm.computerList;
          });
        }else {
          vm.pageNumber = searchObject.page;
          vm.search = searchObject.search;
          vm.orderBy = searchObject.orderBy;
          vm.nbPage = searchObject.nbPage;
          vm.isDesc = searchObject.isDesc;
          ComputerService.getPage(vm.search, vm.pageNumber, vm.orderBy, vm.isDesc, vm.nbPage).then(function(data) {
              vm.computerList = data.computerList;
              vm.computerSize = data.computerSize;
              vm.pageNumber = data.page;
              vm.search = data.search;
              vm.orderBy = data.orderBy;
              vm.isDesc = data.desc;
              vm.interval = data.interval;
              vm.nbPage = data.nbPage;
              computeNbPages();
              return vm.computerList;
          });
        }

      }
    }
})();
