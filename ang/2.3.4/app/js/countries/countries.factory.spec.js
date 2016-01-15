'use strict';

describe('Countries Factory', function() {
  beforeEach(module('CountriesApp'));

  beforeEach(inject(function($httpBackend) {
    $httpBackend.expect('GET', 'http://api.geonames.org/countryInfoJSON?username=tnowalk').respond(countriesFactoryResponse);
  }));

  it('should query GEONAMES countryInfoJSON endpoint', inject(function(CountriesFactory, $rootScope, $httpBackend) {
    var countries = [];
    CountriesFactory.get().then(function(res) {
      countries = res;
    });
    $rootScope.$digest();
    $httpBackend.flush();
    expect(countries.length).toBe(2);
    $httpBackend.verifyNoOutstandingRequest();
  }));

  it('should cache GEONAMES countryInfoJSON results', inject(function(CountriesFactory, $rootScope, $httpBackend) {
    var countries = [];
    CountriesFactory.get();
    $rootScope.$digest();
    $httpBackend.flush();
    expect(CountriesFactory.cache.length).toBe(2);
    $httpBackend.verifyNoOutstandingRequest();
  }));
});