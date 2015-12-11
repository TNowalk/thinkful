'use strict';

angular.module('WaitstaffApp', ['ngRoute', 'ngAnimate']);

angular.module('WaitstaffApp').run(['$rootScope', '$location', function($rootScope, $location) {
  $rootScope.$on('$routeChangeError', function() {
    $location.path('/error');
  });

  $rootScope.defaultEarnings = {
    tipTotal: 0.00,
    mealCount: 0
  };

  $rootScope.earnings = angular.copy($rootScope.defaultEarnings);
}]);

angular.module('WaitstaffApp').config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/home.html'
    })
    .when('/new-meal', {
      templateUrl: 'partials/new-meal.html',
      controller: 'NewMealCtrl'
    })
    .when('/my-earnings', {
      templateUrl: 'partials/my-earnings.html',
      controller: 'EarningsCtrl'
    })
    .when('/error', {
      template : '<p>Error - Page Not Found</p>'
    })
    .otherwise('/error');
}]);

angular.module('WaitstaffApp').controller('NewMealCtrl', ['$rootScope', '$scope', function($rootScope, $scope) {
  $scope.submitted = false;
  $scope.showError = false;

  var defaultCharges = {
    basePrice: 0.00,
    taxRate: 0,
    tipRate: 0,
    taxTotal: 0.00,
    tipTotal: 0.00,
    subTotal: 0.00,
    total: 0.00
  };

  $scope.charges = angular.copy(defaultCharges);

  $scope.submit = function() {
    if (!$scope.mealDetailsForm.$valid) {
      $scope.showError = true;
      return;
    }

    resetCharges();

    $scope.charges.basePrice = $scope.data.basePrice;
    $scope.charges.taxRate = $scope.data.taxRate / 100;
    $scope.charges.tipRate = $scope.data.tipRate / 100;

    calculateCharges();
    calculateEarnings();

    $scope.resetDetails();
  };

  $scope.resetDetails = function() {
    $scope.submitted = false;
    $scope.showError = false;
    $scope.data = '';
    $scope.mealDetailsForm.$setPristine();
  };

  /**
   * Calculate the total bill
   * @return {null}
   */
  var calculateCharges = function() {
    $scope.charges.taxTotal = $scope.charges.basePrice * $scope.charges.taxRate;
    $scope.charges.subTotal = $scope.charges.basePrice + $scope.charges.taxTotal;

    $scope.charges.tipTotal = $scope.charges.subTotal * $scope.charges.tipRate;
    $scope.charges.total = $scope.charges.subTotal + $scope.charges.tipTotal;
  };

  /**
   * Reset the meal details
   * @return {null}
   */
  var resetCharges = function() {
    $scope.charges = angular.copy(defaultCharges);
  };

  /**
   * Calculate earnings
   * @return {null}
   */
  var calculateEarnings = function() {
    $rootScope.earnings.tipTotal += $scope.charges.tipTotal;
    $rootScope.earnings.mealCount++;
  };
}]);

angular.module('WaitstaffApp').controller('EarningsCtrl', ['$rootScope', '$scope', function($rootScope, $scope) {
  $scope.refresh = function() {
    resetEarnings();
  };

  /**
   * Reset the earnings
   * @return {null}
   */
  var resetEarnings = function() {
    $rootScope.earnings = angular.copy($rootScope.defaultEarnings);
  };

  /**
   * Calculate average
   * @param  {int} total Accumulative total tips
   * @param  {int} count Count of meals
   * @return {float}     Average
   */
  $scope.calculateAverage = function(total, count) {
    return count > 0 ? total / count : 0;
  };
}]);