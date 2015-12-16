'use strict';

describe('Country Routes', function() {
  var ctrl, scope, $q, $route, $location, CountryFactory;

  beforeEach(module('CountriesApp'));

  beforeEach(inject(function($controller, $rootScope, _$q_, _$route_, _$location_, _CountryFactory_) {
    // The injector unwraps the underscores (_) from around the parameter names when matching
    scope = $rootScope.$new();
    $q = _$q_;
    $route = _$route_;
    $location = _$location_;
    CountryFactory = _CountryFactory_;

    $route.current = {
      params: {
        id: 'US'
      }
    };

    ctrl = $controller("CountryCtrl", {
      $scope: scope,
      $q: $q,
      $location: $location,
      $route: $route,
      CountryFactory: _CountryFactory_
    });
  }));

  it('should load correct controller and template for country route', inject(function($httpBackend, $rootScope, $route, $location) {
    $httpBackend.expect('GET', 'http://api.geonames.org/countryInfoJSON?country=US&username=tnowalk').respond(200);
    $httpBackend.expect('GET', 'js/country/country.html').respond(200);

    $rootScope.$apply(function() {
      $location.path('/countries/US/capital');
    });

    expect($route.current.controller).toBe('CountryCtrl');
    expect($route.current.loadedTemplateUrl).toBe('js/country/country.html');
  }));
});