#!/usr/bin/python
'''
Thinkful: Unit 1, Lesson 5
Tip Calculator Revisited

@author Trevor Nowalk <tnowalk@thinkful.com>
@date 2014-01-16
'''

# Init the variables that will be used
meal = float(raw_input("Enter the meal price: "))     # Base price of the meal
tax  = float(raw_input("Enter the tax Rate: "))       # Tax rate for the meal
tip  = float(raw_input("Enter the tip Percentage: ")) # Tip rate for the meal

# Calculate the tax and tip amount
tax_value = meal * (tax / 100)
meal_with_tax = meal + tax_value
tip_value = meal_with_tax * (tip / 100)

total = meal_with_tax + tip_value

print "Base Meal Cost: $%.2f" % (meal)
print "Total Tax (%d%%): $%.2f" % (tax, tax_value)
print "Tip Total (%d%%): $%.2f" % (tip, tip_value)
print "Grand Total: $%.2f" % (total)