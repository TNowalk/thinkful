describe('Country Factory', function() {
  beforeEach(module('CountriesApp'));

  it('should query GEONAMES for a single country', inject(function(CountryFactory, $rootScope, $httpBackend) {
    $httpBackend.expect('GET', 'http://api.geonames.org/countryInfoJSON?country=US&username=tnowalk').respond(countryFactoryGetResponse);
    var country = null;
    CountryFactory.get('US').then(function(res) {
      country = res;
    });
    $rootScope.$digest();
    $httpBackend.flush();
    expect(typeof country).toBe('object');
    expect(country.countryName).toBe('United States');
    $httpBackend.verifyNoOutstandingRequest();
  }));

  it('should query GEONAMES for a single capital', inject(function(CountryFactory, $rootScope, $httpBackend) {
    $httpBackend.expect('GET', 'http://api.geonames.org/search?country=US&isNameRequired=true&name_equals=Washington&q=Washington&type=JSON&username=tnowalk').respond(countryFactoryCaptialResponse);
    var capital = null;
    CountryFactory.capital('US', 'Washington').then(function(res) {
      capital = res;
    });
    $rootScope.$digest();
    $httpBackend.flush();
    expect(typeof capital).toBe('object');
    expect(capital.name).toBe('Washington');
    expect(capital.toponymName).toBe('Washington, D.C.');
    $httpBackend.verifyNoOutstandingRequest();
  }));

  it('should query GEONAMES for neighbors of country', inject(function(CountryFactory, $rootScope, $httpBackend) {
    $httpBackend.expect('GET', 'http://api.geonames.org/neighbours?geonameId=6252001&type=JSON&username=tnowalk').respond(countryFactoryNeighborsResponse);
    var neighbors = null;
    CountryFactory.neighbors(6252001).then(function(res) {
      neighbors = res;
    });
    $rootScope.$digest();
    $httpBackend.flush();
    expect(typeof neighbors).toBe('object');
    expect(neighbors.length).toBe(3);
    $httpBackend.verifyNoOutstandingRequest();
  }));

  it('should crate valid flag URL', inject(function(CountryFactory) {
    var countryCode = 'US';
    var flag = CountryFactory.flag(countryCode);
    expect(flag).toBe('http://www.geonames.org/flags/x/us.gif');
  }));

  it('should crate valid map URL', inject(function(CountryFactory) {
    var countryCode = 'US';
    var map = CountryFactory.map(countryCode);
    expect(map).toBe('http://www.geonames.org/img/country/250/US.png');
  }));
});