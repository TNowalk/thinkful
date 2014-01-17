#!/usr/bin/python
'''
Learn Python the Hard Way
Exercise 11: Asking Questions

@author Trevor Nowalk <tnowalk@thinkful.com>
@date 2014-01-16
'''

print "How old are you?",
age = raw_input()
print "How tall are you?",
height = raw_input()
print "How much do you weigh?",
weight = raw_input()

print "So, you're %r old, %r tall and %r heavy." % (age, height, weight)