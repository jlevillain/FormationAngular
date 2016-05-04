'use strict';

describe('Controller: ComputerCtrl', function () {

  // load the controller's module
  beforeEach(module('formationAngularApp'));

  var ComputerCtrl, scope, location, companyService, computerService, i18nServiceMock, createController, locationUrl;
  beforeEach(inject(function ($controller, $rootScope) {
      scope = $rootScope.$new();
      locationUrl = "";
      location = {search : function() {return {}}, url : function(data) { locationUrl : data}};

      companyService = {
        getAll : function() {return {then:function(callback) {return callback([{id : 0, name : "company1"}, {id : 1,name : "company2"}])}}}
      }

      computerService = {
        modifyComputer : function(id) {return {then:function(callback) {return callback({id : id, name : "computer", company:null})}}},
        addComputer : function() {return {then:function(callback) {return callback({})}}}
      }

      i18nServiceMock = {
        getString : function(message) {return "message"}
      }

      createController = function() {
        return $controller("ComputerCtrl", {
          $scope: scope,
          $location : location,
          ComputerService : computerService,
          CompanyService : companyService,
          i18nService : i18nServiceMock
        });
      };
  }));

  it('should init variable without search', function () {
    ComputerCtrl = createController();
    expect(ComputerCtrl.computer).toEqual({id:0, company:{id:0,name:""}})
  });

  it('should init variable with search', function() {
    location = {search : function() {return {id : 10}}}
    var expected = {id : 10, name : "computer", company : {id:0, name:""}}
    ComputerCtrl = createController();
    expect(ComputerCtrl.computer).toEqual(expected);
  });

  it('should init companyList', function () {
    var expected = [{id:0, name:"--"}, {id : 0, name : "company1"}, {id : 1,name : "company2"}];
    ComputerCtrl = createController();
    expect(ComputerCtrl.companyList).toEqual(expected);
  });

  it('should send form', function() {
    ComputerCtrl = createController();
    spyOn(location, 'url');
    ComputerCtrl.sendForm({});
    expect(location.url).toHaveBeenCalledWith("/");

  });
});
