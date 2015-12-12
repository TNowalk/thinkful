'use strict';

describe('Countries Controller', function() {
  var ctrl, scope, $location, CountriesFactory;

  beforeEach(module('CountriesApp'));

  beforeEach(inject(function($controller, $rootScope, _$location_, _CountriesFactory_) {
    scope = $rootScope.$new();
    $location = _$location_;
    CountriesFactory = _CountriesFactory_;

    ctrl = $controller("CountriesCtrl", {
      $scope: scope,
      $location: $location,
      CountriesFactory: CountriesFactory
    });
  }));

  it('should route to country view when goToCountry is called', inject(function($httpBackend, $rootScope, $route, $location) {
    $httpBackend.expect('GET', 'http://api.geonames.org/countryInfoJSON?username=tnowalk').respond(countriesFactoryResponse);
    $httpBackend.expect('GET', 'js/countries/countries.html').respond(200);
    $httpBackend.expect('GET', 'js/country/country.html').respond(200);

    $rootScope.$apply(function() {
      $location.path('/countries');
    });

    $rootScope.$apply(function() {
      scope.goToCountry({countryCode: 'US'});
    });

    expect($route.current.originalPath).toBe('/countries/:id/capital');
    expect($route.current.params.id).toBe('US');
  }));
});