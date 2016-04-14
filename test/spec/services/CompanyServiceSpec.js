'use strict';

describe('Service: CompanyService', function () {

  // load the controller's module
  beforeEach(module('formationAngularApp'));

  var CompanyService, httpBackend;

  beforeEach(inject(function (_CompanyService_, $httpBackend) {
    CompanyService = _CompanyService_;
    httpBackend = $httpBackend;
  }));

  it('should recuperate all company', function () {

    httpBackend.expectGET(VM+PATH+'/companyList').respond(200, '');
    httpBackend.expectGET('views/main.html').respond(200, '');

    CompanyService.getAll();

    httpBackend.flush();
  });
});
