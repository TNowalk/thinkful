(function() {
  'use strict';

  var tipCalculator = {
    baseCost: 0.00,
    taxRate: 0.00,
    tipRate: 0.00,
    taxTotal: 0.00,
    subTotal: 0.00,
    tipTotal: 0.00,
    grandTotal: 0.00,
    setBaseCost: function() {
      this.baseCost = parseFloat(prompt('Enter the dollar value for your meal, pre-tax (e.g., $15.74): $'));
      return this;
    },
    setTaxRate: function() {
      this.taxRate = parseFloat(prompt('Enter the tax rate as a percentage (e.g., 22): ')) / 100;
      return this;
    },
    setTipRate: function() {
      this.tipRate = parseFloat(prompt('Enter the percentage tip you\'d like to leave (e.g., 15): ')) / 100;
      return this;
    },
    calculateTip: function() {
      this.tipTotal = this.baseCost * this.tipRate;
      return this;
    },
    calculateTax: function() {
      this.taxTotal = (this.baseCost + this.tipTotal) * this.taxRate;
      return this;
    },
    calculateGrandTotal: function() {
      this.grandTotal = this.baseCost + this.tipTotal + this.taxTotal;
      return this;
    },
    message: function() {
      alert('Tax for your meal is $' + this.taxTotal.toFixed(2) + '. ' +
            'You should leave $' + this.tipTotal.toFixed(2) + ' for tip.' +
            'The total cost of your meal is $' + this.grandTotal.toFixed(2) + '.');
      return this;
    },
    init: function() {
      this
        .setBaseCost()
        .setTaxRate()
        .setTipRate()
        .calculateTip()
        .calculateTax()
        .calculateGrandTotal()
        .message();
    }
  };

  tipCalculator.init();
})();