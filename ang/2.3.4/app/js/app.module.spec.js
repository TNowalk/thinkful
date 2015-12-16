'use strict';

describe('Module Routes', function() {
  var ctrl, scope, $location;

  beforeEach(module('CountriesApp'));

  beforeEach(inject(function($controller, $rootScope, _$location_) {
    // The injector unwraps the underscores (_) from around the parameter names when matching
    scope = $rootScope.$new();
    $location = _$location_;
  }));

  it('should load home template for / route', inject(function($httpBackend, $rootScope, $route, $location) {
    $httpBackend.expect('GET', 'js/home/home.html').respond(200);

    $rootScope.$apply(function() {
      $location.path('/');
    });

    expect($route.current.loadedTemplateUrl).toBe('js/home/home.html');
  }));

  it('should load error template for invalid route', inject(function($httpBackend, $rootScope, $route, $location) {
    $rootScope.$apply(function() {
      $location.path('/foo');
    });

    expect($route.current.template).toBe('<p>Error - Page Not Found</p>');
  }));
});