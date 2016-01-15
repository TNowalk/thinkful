'use strict';

describe('Country Controller', function() {
  var ctrl, scope, $q, $route, $location, CountryFactory, deferred;

  beforeEach(module('CountriesApp'));

  beforeEach(inject(function($controller, $rootScope, _$q_, _$route_, _$location_, _CountryFactory_) {
    // The injector unwraps the underscores (_) from around the parameter names when matching
    scope = $rootScope.$new();
    $q = _$q_;
    $route = _$route_;
    $location = _$location_;
    CountryFactory = _CountryFactory_;

    // Initialze the route config
    $route.current = {
      params: {
        id: 'US'
      }
    };

    // Mock up a deferred objects
    deferred = {
      get: $q.defer(),
      capital: $q.defer(),
      neighbors: $q.defer()
    };

    // We need to watch the country factory and mock up the promise that is
    // returned so we can test the .then functions.
    spyOn(CountryFactory, 'get').and.returnValue(deferred.get.promise);
    spyOn(CountryFactory, 'capital').and.returnValue(deferred.capital.promise);
    spyOn(CountryFactory, 'neighbors').and.returnValue(deferred.neighbors.promise);

    ctrl = $controller("CountryCtrl", {
      $scope: scope,
      $q: $q,
      $location: $location,
      $route: $route,
      CountryFactory: CountryFactory
    });

    // Simulate the resolved promises for the .then
    deferred.get.resolve(countryFactoryGetResponse.geonames[0]);
    deferred.capital.resolve(countryFactoryCaptialResponse.geonames[0]);
    deferred.neighbors.resolve(countryFactoryNeighborsResponse.geonames);

    // Set the path to the US
    $location.path('/country/US/capital');
  }));

  it('should route to country view when goToCountry is called', inject(function($httpBackend, $rootScope, $route) {
    $httpBackend.expect('GET', 'js/country/country.html').respond(200);

    $rootScope.$apply(function() {
      scope.goToCountry({countryCode: 'CA'});
    });

    expect($route.current.originalPath).toBe('/countries/:id/capital');
    expect($route.current.params.id).toBe('CA');
  }));

  it('should initialize loading model to true', function() {
    expect(scope.loading).toBe(true);
  });

  it('should set loading model false after all promises are resolved', inject(function($httpBackend, $rootScope) {
    // The $apply will propagate the promise resolution to any .then functions
    $rootScope.$apply();

    expect(scope.loading).toBe(false);
  }));

  it('should set country model', inject(function($httpBackend, $rootScope) {
    // The $apply will propagate the promise resolution to any .then functions
    $rootScope.$apply();

    expect(scope.country).toEqual(countryFactoryGetResponse.geonames[0]);
  }));

  it('should set capital model', inject(function($httpBackend, $rootScope) {
    // The $apply will propagate the promise resolution to any .then functions
    $rootScope.$apply();

    expect(scope.capital).toEqual(countryFactoryCaptialResponse.geonames[0]);
  }));

  it('should set neighbors model', inject(function($httpBackend, $rootScope) {
    // The $apply will propagate the promise resolution to any .then functions
    $rootScope.$apply();

    expect(scope.neighbors).toEqual(countryFactoryNeighborsResponse.geonames);
  }));
});