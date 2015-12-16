'use strict';

describe('Opt In Directiv', function() {
  var $compile, $rootScope, element, elm;

  // Load the myApp module, which contains the directive
  beforeEach(module('SignUpApp'));

  // load the templates
  beforeEach(module('js/opt-in/opt-in.html'));

  // Store references to $rootScope and $compile
  // so they are available to all tests in this describe block
  beforeEach(inject(function(_$compile_, _$rootScope_) {
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $compile = _$compile_;
    $rootScope = _$rootScope_;

    // Compile a piece of HTML containing the directive
    element = $compile('<opt-in><div class="brand-logo"></div></opt-in>')($rootScope);

    // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
    $rootScope.$digest();

    // For query selectors, like searching for a class, we need the raw HTML
    elm = element[0];
  }));

  it('should contain the transcluded element', function() {
    // Find the transcluded .brand-logo element
    var brandLogo = elm.querySelector('.brand-logo');

    // Check that the compiled element contains the transcluded element
    expect(brandLogo.outerHTML).toEqual('<div class="brand-logo ng-scope"></div>');
  });

  it('should create the necessary elements', function() {
    // Find the .form-holder
    var formHolder = elm.querySelector('.form-holder');

    // Check that the element was found
    expect(formHolder).not.toBe(null);

    // Find the form
    var form = element.find('form');

    // Check that the element was found
    expect(form.length).toBe(1);

    // Find the button
    var button = element.find('button');

    // Check that the element was found
    expect(button.length).toBe(1);

    // Check that the element has the correct text
    expect(button.text()).toBe('Give us yr infoz!');
  });
});