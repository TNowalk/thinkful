'use strict';

describe('Country Controller', function() {
  var ctrl, scope, $q, $route, $location, CountryFactory;

  beforeEach(module('CountriesApp'));

  beforeEach(inject(function($controller, $rootScope, _$q_, _$route_, _$location_, _CountryFactory_) {
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

  it('should route to country view when goToCountry is called', inject(function($httpBackend, $rootScope, $route, $location) {
    $httpBackend.expect('GET', 'http://api.geonames.org/countryInfoJSON?country=US&username=tnowalk').respond(200);
    $httpBackend.expect('GET', 'js/country/country.html').respond(200);

    $rootScope.$apply(function() {
      $location.path('/country/US/capital');
    });

    $rootScope.$apply(function() {
      scope.goToCountry({countryCode: 'CA'});
    });

    expect($route.current.originalPath).toBe('/countries/:id/capital');
    expect($route.current.params.id).toBe('CA');
  }));
});