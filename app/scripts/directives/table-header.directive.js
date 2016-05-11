(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name formationAngularApp.directive:tableHeader
   * @description
   * # tableHeader
   * Directive of the formationAngularApp
   */

  angular.module('formationAngularApp')
    .directive('tableHeader', tableHeader);

    function tableHeader() {
      return {
        restrict:'E',
        replace:true,
        transclude:true,
        scope:{
          orderBy:"=",
          main:"="
        },
        templateUrl:'views/directives/table-header.html',
        link:link
      }

      function link(scope, element, attrs) {
        console.log(scope.orderBy);
      }
    }
})();
