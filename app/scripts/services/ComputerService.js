(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name formationAngularApp.service:ComputerService
   * @description
   * # ComputerService
   * Service of the formationAngularApp
   */

   angular.module('formationAngularApp').factory('ComputerService', ComputerService);

   ComputerService.$inject = ['$http'];

   function ComputerService($http) {
      var service = {
        getAll : getAll,
        getPage : getPage,
        getNewComputer : getNewComputer,
        addComputer : addComputer,
        modifyComputer : modifyComputer,
        deleteComputer : deleteComputer
      };
      return service;

      function success(response) {
        return response.data;
      }

      function error(response) {
        console.log(response)
        return "";
      }

      function getAll() {
        return $http.get(VM+PATH+'/getAll').then(success, error);
      }

      function getPage(search, page, orderBy, isDesc, nbPage) {
        console.log(search);
        return $http.get(VM+PATH+
          '/getAll?search='+search+
          '&page='+page+
          '&orderBy='+orderBy+
          '&isDesc='+isDesc+
          '&nbPage='+nbPage
          ).then(success, error);
      }

      function getNewComputer() {
        return $http.get(VM+PATH+'/addComputer').then(success, error);
      }

      function addComputer(computer) {
        return $http.post(VM+PATH+'/addComputer', computer).then(success, error);
      }

      function modifyComputer(id) {
        return $http.get(VM+PATH+'/modifyComputer?id='+id).then(success, error);
      }

      function deleteComputer(id) {
        return $http.get(VM+PATH+'/delete?delete='+id).then(success, error);
      }
   }
})();


