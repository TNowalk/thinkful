#!/usr/bin/python
'''
Thinkful: Unit 1, Lesson 5
Tip Calculator Revisited

@author Trevor Nowalk <tnowalk@thinkful.com>
@date 2014-01-16
'''

# Import the OptionParser
from optparse import OptionParser

# Initialize the OptionParser
parser = OptionParser()

# Set up the named args
parser.add_option("-m", "--meal", dest="meal", help="Enter the base meal price", default=0.00)
parser.add_option("-x", "--tax", dest="tax", help="Enter the tax rate", default=0.00)
parser.add_option("-t", "--tip", dest="tip", help="Enter the tip percentage", default=0.00)

# Parse the arguments
(opts, args) = parser.parse_args()

# Init the variables that will be used
meal = float(opts.meal) # Base price of the meal
tax  = float(opts.tax)  # Tax rate for the meal
tip  = float(opts.tip)  # Tip rate for the meal

# Calculate the tax and tip amount
tax_value = meal * (tax / 100)
meal_with_tax = meal + tax_value
tip_value = meal_with_tax * (tip / 100)

# Get the total cost
total = meal_with_tax + tip_value

# Output to the user
print "Base Meal Cost: $%.2f" % (meal)
print "Total Tax (%d%%): $%.2f" % (tax, tax_value)
print "Tip Total (%d%%): $%.2f" % (tip, tip_value)
print "Grand Total: $%.2f" % (total)