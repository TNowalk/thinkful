'use strict';

var countriesFactoryResponse = {
  geonames: [{
    continent:     'EU',
    capital:       'Andorra la Vella',
    languages:     'ca',
    geonameId:     3041565,
    south:         42.42849259876837,
    isoAlpha3:     'AND',
    north:         42.65604389629997,
    fipsCode:      'AN',
    population:    '84000',
    east:          1.7865427778319827,
    isoNumeric:    '020',
    areaInSqKm:    '468.0',
    countryCode:   'AD',
    west:          1.4071867141112762,
    countryName:   'Andorra',
    continentName: 'Europe',
    currencyCode:  'EUR'
  },{
    continent:     'AS',
    capital:       'Abu Dhabi',
    languages:     'ar-AE,fa,en,hi,ur',
    geonameId:     290557,
    south:         22.633329391479492,
    isoAlpha3:     'ARE',
    north:         26.08415985107422,
    fipsCode:      'AE',
    population:    '4975593',
    east:          56.38166046142578,
    isoNumeric:    '784',
    areaInSqKm:    '82880.0',
    countryCode:   'AE',
    west:          51.58332824707031,
    countryName:   'United Arab Emirates',
    continentName: 'Asia',
    currencyCode:  'AED'
  }]
};

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