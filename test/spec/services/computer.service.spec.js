'use strict';

describe('Service: ComputerService', function () {

  // load the controller's module
  beforeEach(module('formationAngularApp'));

  var ComputerService, $httpBackend, cookies;

  beforeEach(inject(function (_ComputerService_, _$httpBackend_, $cookies) {
    ComputerService = _ComputerService_;
    $httpBackend = _$httpBackend_;
    $cookies.put('locale', '"fr"');;
  }));

  it('should recuperate all computer', function () {

      $httpBackend.expectGET(VM+PATH+'/getAll?lang=fr').respond(200, '');
      $httpBackend.expectGET('views/main.html').respond(200, '');

      ComputerService.getAll();

      $httpBackend.flush();
    });

  it('should recuperate computer page', function () {
    var search = "";
    var page = 1;
    var orderBy = 2;
    var isDesc = false;
    var nbPage = 5;
    $httpBackend.expectGET(VM+PATH+'/getAll?search='+search+
      '&page='+page+
      '&orderBy='+orderBy+
      '&isDesc='+isDesc+
      '&nbPage='+nbPage+
      '&lang=fr').respond(200, '');
    $httpBackend.expectGET('views/main.html').respond(200, '');
    ComputerService.getPage(search, page, orderBy, isDesc, nbPage);

    $httpBackend.flush();
  });

  it('should recuperate new computer', function() {
    $httpBackend.expectGET(VM+PATH+'/addComputer').respond(200, '');
    $httpBackend.expectGET('views/main.html').respond(200, '');

    ComputerService.getNewComputer();

    $httpBackend.flush();
  });

  it('should recuperate add computer', function() {
      var computer = {id:2, name:"toutou"};
      $httpBackend.expectPOST(VM+PATH+'/addComputer', computer).respond(200, '');
      $httpBackend.expectGET('views/main.html').respond(200, '');

      ComputerService.addComputer(computer);

      $httpBackend.flush();
    });

  it('should recuperate one computer', function() {
    var id = 2;
    $httpBackend.expectGET(VM+PATH+'/modifyComputer?id='+id).respond(200, '');
    $httpBackend.expectGET('views/main.html').respond(200, '');

    ComputerService.modifyComputer(id);

    $httpBackend.flush();
  });

  it('should delete a computer', function() {
    var id = 2;
    $httpBackend.expectGET(VM+PATH+'/delete?delete='+id).respond(200, '');
    $httpBackend.expectGET('views/main.html').respond(200, '');

    ComputerService.deleteComputer(id);

    $httpBackend.flush();
  });
});
