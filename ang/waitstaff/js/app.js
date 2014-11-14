'use strict';

angular.module('WaitstaffApp',[]).controller('MainCtrl', ['$scope', function($scope) {
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

  var defaultEarnings = {
    tipTotal: 0.00,
    mealCount: 0
  };

  $scope.charges = angular.copy(defaultCharges);

  $scope.earnings = angular.copy(defaultEarnings);

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

  $scope.refresh = function() {
    $scope.resetDetails();
    resetCharges();
    resetEarnings();
  };

  /**
   * Reset the meal details
   * @return {null}
   */
  var resetCharges = function() {
    $scope.charges = angular.copy(defaultCharges);
  };

  /**
   * Reset the earnings
   * @return {null}
   */
  var resetEarnings = function() {
    $scope.earnings = angular.copy(defaultEarnings);
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
   * Calculate earnings
   * @return {null}
   */
  var calculateEarnings = function() {
    $scope.earnings.tipTotal += $scope.charges.tipTotal;
    $scope.earnings.mealCount++;
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