#!/usr/bin/python
'''
Learn Python the Hard Way
Exercise 12: Prompting People

@author Trevor Nowalk <tnowalk@thinkful.com>
@date 2014-01-16
'''

age = raw_input("How old are you?")
height = raw_input("How tall are you?")
weight = raw_input("How much do you weigh?")

print "So, you are %r old, %r tall, and %r heavy." % (age, height, weight)