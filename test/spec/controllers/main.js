'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('formationAngularApp'));

  var MainCtrl,
    scope, window, location, computerService, companyService, i18nServiceMock, createController;
  var computerSize = 60;
  var computerSizeSearh = 22;
  var computerList = {};
  var search ="toto";
  var orderBy = 6;
  var isDesc = true;
  var pageNumber = 2;
  var nbPage = 5;
  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    window = {
      confirm : function() {return true},
      location:{reload:function(){return true;}}
    };
    location = {search : function() {return {}}};
    companyService = {};
    computerService = {
      getAll : function() {return {then:function(callback) {return callback({computerSize:computerSize, computerList:computerList})}}},
      getPage : function(search, pageNumber, orderBy, isDesc, nbPage) {
        return {
          then:function(callback){return callback({
            search : search,
            page : pageNumber,
            orderBy : orderBy,
            desc : isDesc,
            nbPage : nbPage,
            interval : 5,
            computerSize : computerSizeSearh,
            computerList : computerList
            });
          }
        };
      },
      deleteComputer : function(id) {
        return {
          then:function(callback) {
            return callback("");
          }
        }
      }
    }
    i18nServiceMock = {
      getString : function(message) {return "message"}
    };
    createController = function() {
      return $controller("MainCtrl", {
        $scope: scope,
        $window : window,
        $location : location,
        ComputerService : computerService,
        CompanyService : companyService,
        i18nService : i18nServiceMock
      });
    };

  }));

  it('should attach a list of awesomeThings to the scope', function () {
    MainCtrl = createController();
    expect(MainCtrl.awesomeThings.length).toBe(3);
  });


  it('should init variable for first call to siteweb', function() {
    MainCtrl = createController();
    expect(MainCtrl.pageNumber).toBe(1);
    expect(MainCtrl.search).toBe("");
    expect(MainCtrl.orderBy).toBe(2);
    expect(MainCtrl.nbPage).toBe(10);
    expect(MainCtrl.isDesc).toBe(false);
    expect(MainCtrl.interval).toBe(5);
    expect(MainCtrl.begin).toBe(1);
    expect(MainCtrl.computerSize).toBe(computerSize);
    expect(MainCtrl.computerList).toEqual(computerList);
    expect(MainCtrl.nbPages).toBe(6);
    expect(MainCtrl.pagination.length).toBe(6);
  });

  it('should init variable with search', function() {
    location.search = function() {return {page:pageNumber, search:search, orderBy:orderBy, nbPage:nbPage, isDesc:isDesc}};
    MainCtrl = createController();
    expect(MainCtrl.pageNumber).toBe(pageNumber);
    expect(MainCtrl.search).toBe(search);
    expect(MainCtrl.orderBy).toBe(orderBy);
    expect(MainCtrl.nbPage).toBe(nbPage);
    expect(MainCtrl.isDesc).toBe(isDesc);
    expect(MainCtrl.interval).toBe(5);
    expect(MainCtrl.begin).toBe(1);
    expect(MainCtrl.computerSize).toBe(22);
    expect(MainCtrl.computerList).toEqual(computerList);
    expect(MainCtrl.nbPages).toBe(5);
    expect(MainCtrl.pagination.length).toBe(5);
  });

  it("should confirm item deletion", function() {
    MainCtrl = createController();

    spyOn(window.location, 'reload');
    spyOn(computerService, 'deleteComputer');
    spyOn(window, 'confirm').and.returnValue(true);

    MainCtrl.deleteComputer(10);
    
    expect(computerService.deleteComputer).toHaveBeenCalledWith(10);
    expect(window.confirm).toHaveBeenCalled();
    expect(window.location.reload).toHaveBeenCalled();
  });

  it('should not confirm item deletion', function() {
    MainCtrl = createController();

    spyOn(window.location, 'reload');
    spyOn(computerService, 'deleteComputer');
    spyOn(window, 'confirm').and.returnValue(false);

    MainCtrl.deleteComputer(10);

    expect(window.confirm).toHaveBeenCalled();
  });
});
