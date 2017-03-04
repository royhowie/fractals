/*
  `IFS` stands for "Iterated function sequence." It is a finite set of
  contraction mappings.

  A contraction mapping is a function f of metric spaces
    f: X -> X
  with the property that there is a 0 ≤ k < 1 such that
    d(f(x),f(y)) ≤ k*d(x,y)
  for all x and y in X; d refers to the distance (metric) function. The idea
  here is that each time f is applied to the metric space X, the image of f
  is "smaller" than it was previously, i.e. it has contracted.

  Contraction maps are the basis for storing fractal representations. An IFS
  contains a finite set of contraction mapping, often represented in the form
    a b c d e f p
  where a through f are coefficients of a linear map and p is the probability
  that this particular map in the IFS will be applied next. If p is omitted, the
  distribution is assumed to be uniform.

  Given a function f in our IFS, it sends a point (x,y) to the point
    (ax + by + e, cx + dy + f)
  This point is then run through the IFS again. This process is repeated a given
  number of times and produces a fractal.

  Related links:
    IFS:
      https://en.wikipedia.org/wiki/Iterated_function_system
      http://mathworld.wolfram.com/IteratedFunctionSystem.html
    Contraction Mapping:
      https://en.wikipedia.org/wiki/Contraction_mapping
    Inspiration:
      https://www.reddit.com/r/dailyprogrammer/comments/5xaoxb/
*/
const WEIGHT_OFFSET = 6
class IFS {
  constructor (system, colors=[]) {
    this.system = system
    this.point = new Point()

    if (!system)
      throw new Error('Must provide a system.')
    else if (!Array.isArray(system))
      throw new Error('System must be an array of contraction mappings.')
    else if (!system.length)
      throw new Error('Given system is of length zero.')

    // If the system contains probability parameters, do a little precalculation
    // to speed up the selection of contaction maps during runtime. This
    // involves calculating the cumulative sum of the given probability
    // distribution.
    if (system[0].length === WEIGHT_OFFSET + 1) {
      this.weighted = true
      this.cumulative_sum = [0]

      for (let i = 0; i < system.length; i++) {
        if (system[i].length !== WEIGHT_OFFSET + 1) {
          throw new Error(`Malformed system. Map ${i} of incorrect length.`)
        }

        let weight = system[i][WEIGHT_OFFSET]
        this.cumulative_sum[i+1] = this.cumulative_sum[i] + weight
      }
    }

    // Record colors for each branch. Make sure the number of colors matches the
    // number of contraction mappings.
    this.colors = colors
    while (this.colors.length < this.system.length) {
      this.colors.push(Math.random() * 0xFFFFFF | 0)
    }
  }

  // Randomly select a contraction map. Chooses based on the specified
  // probability distribution. If no distribution was specified, chooses based
  // on a uniform distribution.
  choose_fn () {
    let random_index = null

    if (this.weighted) {
      let random_weight = Math.random()
      let index = 0

      while (this.cumulative_sum[index+1] < random_weight) {
        index += 1
      }

      random_index = index
    } else {
      random_index = Math.random() * this.system.length | 0
    }

    // Record index so the color of the current branch can be later retrieved.
    this.color_index = random_index

    return this.system[random_index]
  }

  get_color () {
    return this.colors[this.color_index]
  }

  iterate () {
    return this.point = this.point.times(this.choose_fn())
  }
}

class Point {
  constructor (x=0, y=0) {
    this.x = x
    this.y = y
  }

  times ([ a, b, c, d, e, f ]) {
    return new Point(
      (a * this.x) + (b * this.y) + e,
      (c * this.x) + (d * this.y) + f
    )
  }
}

module.exports = { IFS }
