# fractals

#### Generate fractals with Iterated Function Systems (IFS).

##### How to run:
Make sure to install dependencies (`node-gd`) first with `npm install`. Then,
run `node run.js FILE_NAME` in terminal, where `FILE_NAME` is the name of the
file containing the iterated function system.

##### Definition:
`IFS` stands for "Iterated function sequence." It is a finite set of
contraction mappings.

##### Explanation:
A contraction mapping is a function f of metric spaces
`f: X -> X` with the property that there is a `0 ≤ k < 1` such that
`d(f(x),f(y)) ≤ k*d(x,y)` for all `x` and `y` in `X`. `d` refers to the distance
(metric) function. The idea here is that each time `f` is applied to the metric
space `X`, the image of `f` is "smaller" than it was previously, i.e. it has
contracted.

Contraction maps are the basis for storing fractal representations. An IFS
contains a finite set of contraction mapping, often represented in the form
`a b c d e f p` where `a` through `f` are coefficients of a linear map and `p`
is the probability that this particular map in the IFS will be applied next. If
`p` is omitted, the distribution is assumed to be uniform.

Given a function `f` in our IFS, it sends a point ``(x,y)`` to the point
`(ax + by + e, cx + dy + f)`. This point is then run through the IFS again.
This process is repeated a given number of times and produces a fractal.

##### Relevant Links:
  * Iterated Function System:
    * https://en.wikipedia.org/wiki/Iterated_function_system
    * http://mathworld.wolfram.com/IteratedFunctionSystem.html
  * Contraction Mapping:
    * https://en.wikipedia.org/wiki/Contraction_mapping
  * Inspiration:
    * https://www.reddit.com/r/dailyprogrammer/comments/5xaoxb/
