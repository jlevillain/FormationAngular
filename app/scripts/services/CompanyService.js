(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name formationAngularApp.service:CompanyService
   * @description
   * # CompanyService
   * Service of the formationAngularApp
   */

  angular.module('formationAngularApp').factory('CompanyService', CompanyService);

  CompanyService.$inject = ['$http'];

  function CompanyService($http) {
    var service = {
      getAll : getAll
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
      return $http.get(VM+PATH+'/companyList').then(success, error);
    }
  }


})();
