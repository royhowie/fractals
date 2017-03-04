let gd = require('node-gd')
let fs = require('fs')
let IFS = require('./fractal.js').IFS

const ARGS = process.argv.slice(2)
// let color = gd.trueColor(255, 127, 127)

run(ARGS[0], 1000, 1000, 1e6)

function run (file_name, width, height, points, color) {
  let file

  try {
    file = fs.readFileSync(ARGS[0])
  } catch (err) {
    return console.error(`File '${file_name}' could not be found! Exiting.`)
  }

  const system = file
    .toString()
    .split('\n')
    .slice(0, -1)
    .map(line => line.split(' ').map(Number))

  const correct_formatting = system.every(row => {
    return Array.isArray(row) && (row.length == 6 || row.length == 7)
  })

  if (!correct_formatting) {
    return console.error(`System found in ${file_name} incorrectly formatted.`)
  }

  const image = gd.createTrueColorSync(width, height)

  let colors = color ? Array.fill(color) : []

  const ifs = new IFS(system, colors)

  const size = Math.min(width, height)
  const RADIUS = size * 1
  const OFFSET = size >> 1

  while (points-- > 0) {
    let point = ifs.iterate()

    image.setPixel(
      OFFSET + RADIUS * point.x | 0,
      OFFSET + RADIUS * point.y | 0,
      ifs.get_color()
    )
  }

  image.savePng('./output/' + new Date() + '.png', 0, function (err) {
    if (err) throw err
    image.destroy()
  })
}
