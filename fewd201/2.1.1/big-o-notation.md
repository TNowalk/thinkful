### Big O Notation

Course Example:

```
var sum = function(array) {
    var sum = 0;                          // O(1)
    for (var i=0; i<array.length; i++) {  // O(n)
        sum += array[i];
    }
    return sum;                           // O(1)
};
```

The assignment of `var sum = 0` takes the same amount of time regardless of how many elements are in the `array` passed  into the `sum` function.  Because the amount of time it takes to perform the assignment remains the same, it can be considered `O(1)` or "Constant time".  For our purposes, let's represent this bit of code as `a`.

The same is true for the `return` statement, this happens only once during the execution of the function and is not influenced by the number of elements in the array.  We'll represent the return as `b`.

If these were the only two things in the function, then this function (algorithm) could be considered `O(1)` as the time it takes to execute stays the same regardless of how many elements are in the array that is passed into it.  But, that's not all there is to our function.  We have to take a look at the for loop, let's break down the 3 parts:

```
var i = 0;
```

This is part of the initialization phase and happens only one time, therefore it can be considered `O(1)`.  

```
i < array.length;
```

This is the conditional, this tells the `for` loop how many times it should run.  In this case the length of the array (We can start to think of this length as `n` for purposes of determining the efficiency).  This condition is evaluated for each iteration of the array which means it's directly affected by the number of elements in the array.  If there are 5 elements in the array, the condition is evaluated 5 times, if there are 100 elements then it's evaluated 100 times.  This would be an example of `O(n)` (See where that `n` comes in?) which represents a linear progression.

```
i++;
```

And lastly is the increment expression (or sometimes decrement).  Basically a counter to keep track of where we are in the array.  The increment/decrement expression is executed after every iteration of the array.  Just like the conditional expression, this is also directly related to the number of the elements in the array.  So if there are 5 elements in the array, the expression will be executed after each one (5 times).  Again, this is a representation of `O(n)`.

```
sum += array[i];
```

And finally, the inside of the `for` loop.  This will be executed once per element in the array and only works on the current iteration which means that if there are 5 elements in the array it will be executed 5 times.  Once again, this is a linear progression represented as `O(n)`.

Usually when profiling an algorithm, you try to measure the worst case scenario.  Most of the times, it will work out to be faster than the worst case scenario but it's good to understand the potential impact.  So putting it all together, we could represent this function with: `a + b + (t * n)` where `t` is the total time it takes the `for` loop to complete one iteration, `a` is the time it takes to perform the assignment and `b` is the time it takes to return the sum.  For the sake of simplicity, let's use the following values:

```
a = 1ms
b = 1ms
t = 2ms
```

In reality, the times will be much faster but these will be easy numbers to math with.  Now, let's say we have 10 elements in the array:

```
a + b + (t * n)
1 + 1 + (2 * 10)
Result: 22ms
```

And for 20:

```
a + b + (t * n)
1 + 1 + (2 * 20)
Result: 42ms
```

And for 100:

```
a + b + (t * n)
1 + 1 + (2 * 100)
Result: 202ms
```

If you were to plot these on a graph, you'd notice a straight line that goes up.  Something like this:

![O(n) - Linear Time](linear-graph.png "O(n) - Linear Time")

Click through the following links for some examples of each time complexity:

[O(1) - Constant Time](constant-time.md)  
[O(n) - Linear Time](linear-time.md)  
[O(log(n)) - Logarithmic Time](logarithmic-time.md)  
[O(n^2) - Polynomial Time](polynomial-time.md)  
[O(2^n) - Exponential Time](exponential-time.md)  
[O(n!) - Factorial Time](factorial-time.md)
