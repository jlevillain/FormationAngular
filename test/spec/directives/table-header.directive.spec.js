'use strict';

describe('Directive: tableHeader', function () {

  // load the controller's module
  beforeEach(module('formationAngularApp'));
  beforeEach(module('ngHtml2JsPreprocessorModule'));

  var $compile, $scope, $httpBackend, element;

  beforeEach(inject(function(_$compile_, _$rootScope_){
      // The injector unwraps the underscores (_) from around the parameter names when matching
      $compile = _$compile_;
      $scope = _$rootScope_.$new();
      var main = {search:"search", pageNumber:"page", isDesc:false, nbPage:10};
      $scope.main = main;
      // Compile a piece of HTML containing the directive
      element = $compile('<table-header order-by="2" main="main">toto</table-header>')($scope);
      // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
      $scope.$digest();
  }));

  it('Replaces the element with the appropriate content', function() {
      // Check that the compiled element contains the templated content
      expect(element.is("a")).toBe(true);
      expect(element.attr('href')).toBe('/#/?search=search&page=page&orderBy=2&isDesc=true&nbPage=10');
      expect(element.find('span').find('span').html()).toBe("toto");
    });

});
