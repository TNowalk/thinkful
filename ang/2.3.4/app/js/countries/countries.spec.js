'use strict';

describe('Countries Routes', function() {
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

  it('should load correct controller and template for countries route', inject(function($httpBackend, $rootScope, $route, $location) {
    $httpBackend.expect('GET', 'http://api.geonames.org/countryInfoJSON?username=tnowalk').respond(200);
    $httpBackend.expect('GET', 'js/countries/countries.html').respond(200);

    $rootScope.$apply(function() {
      $location.path('/countries');
    });

    expect($route.current.controller).toBe('CountriesCtrl');
    expect($route.current.loadedTemplateUrl).toBe('js/countries/countries.html');
  }));
});