#!/usr/bin/python
'''
Thinkful: Unit 1, Lesson 5
Tip Calculator Revisited

@author Trevor Nowalk <tnowalk@thinkful.com>
@date 2014-01-16
'''

# Import the ArgParser
import argparse

# Initialize the parser
parser = argparse.ArgumentParser(description = "Tip Calculator")

# Set up the named arguments
parser.add_argument("-m", "--meal", type = float, help = "Enter the base meal price", default = 0.00)
parser.add_argument("-x", "--tax", type = float, help = "Enter the tax rate", default = 0.00)
parser.add_argument("-t", "--tip", type = float, help = "Enter the tip percentage", default = 0.00)

# Parse the arguments
opts = parser.parse_args()

# Init the variables that will be used
meal = opts.meal # Base price of the meal
tax  = opts.tax  # Tax rate for the meal
tip  = opts.tip  # Tip rate for the meal

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