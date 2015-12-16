var countryFactoryGetResponse = {
  geonames: [{
    continent:    'NA',
    capital:      'Washington',
    languages:    'en-US,es-US,haw,fr',
    geonameId:     6252001,
    south:         24.544245,
    isoAlpha3:     'USA',
    north:         49.388611,
    fipsCode:      'US',
    population:    '310232863',
    east:          -66.954811,
    isoNumeric:    '840',
    areaInSqKm:    '9629091.0',
    countryCode:   'US',
    west:          -124.733253,
    countryName:   'United States',
    continentName: 'North America',
    currencyCode:  'USD'
  }]
};

var countryFactoryCaptialResponse = {
  totalResultsCount: 41,
  geonames: [{
    adminCode1:  'DC',
    lng:         '-77.03637',
    geonameId:    4140963,
    toponymName: 'Washington, D.C.',
    countryId:   '6252001',
    fcl:         'P',
    population:  601723,
    countryCode: 'US',
    name:        'Washington',
    fclName:     'city, village,...',
    countryName: 'United States',
    fcodeName:   'capital of a political entity',
    adminName1:  'Washington, D.C.',
    lat:         '38.89511',
    fcode:       'PPLC'
  },{
    adminCode1:  'UT',
    lng:         '-113.50829',
    geonameId:   5549222,
    toponymName: 'Washington',
    countryId:   '6252001',
    fcl:         'P',
    population:  18761,
    countryCode: 'US',
    name:        'Washington',
    fclName:     'city, village,...',
    countryName: 'United States',
    fcodeName:   'populated place',
    adminName1:  'Utah',
    lat:         '37.13054',
    fcode:       'PPL'
  }]
};

var countryFactoryNeighborsResponse = {
  totalResultsCount: 3,
  geonames: [{
    adminCode1: '00',
    lng:         '-113.64258',
    geonameId:   6251999,
    toponymName: 'Canada',
    countryId:   '6251999',
    fcl:         'A',
    population:  33679000,
    countryCode: 'CA',
    name:        'Canada',
    fclName:     'country, state, region,...',
    countryName: 'Canada',
    fcodeName:   'independent political entity',
    adminName1:  '',
    lat:         '60.10867',
    fcode:       'PCLI'
  },{
    adminCode1:  '00',
    lng:         '-79.5',
    geonameId:   3562981,
    toponymName: 'Republic of Cuba',
    countryId:   '3562981',
    fcl:         'A',
    population:  11423000,
    countryCode: 'CU',
    name:        'Cuba',
    fclName:     'country, state, region,...',
    countryName: 'Cuba',
    fcodeName:   'independent political entity',
    adminName1:  '',
    lat:         '22',
    fcode:       'PCLI'
  },{
    adminCode1:  '00',
    lng:         '-102',
    geonameId:   3996063,
    toponymName: 'Mexico',
    countryId:   '3996063',
    fcl:         'A',
    population:  112468855,
    countryCode: 'MX',
    name:        'Mexico',
    fclName:     'country, state, region,...',
    countryName: 'Mexico',
    fcodeName:   'independent political entity',
    adminName1:  '',
    lat:         '23',
    fcode:       'PCLI'
  }]
};

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