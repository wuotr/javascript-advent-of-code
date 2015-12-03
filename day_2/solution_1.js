/**
 * solution_1.js
 * js_advent_of_code
 *
 * Created by wuotr on 03/12/15.
 */

/**
 * The elves are running low on wrapping paper, and so they need to submit an order for more. They have a
 * list of the dimensions (length l, width w, and height h) of each present, and only want to order exactly
 * as much as they need.
 *
 * Fortunately, every present is a box (a perfect right rectangular prism), which makes calculating the required
 * wrapping paper for each gift a little easier: find the surface area of the box, which is 2*l*w + 2*w*h + 2*h*l.
 * The elves also need a little extra paper for each present: the area of the smallest side.
 *
 * For example:
 * A present with dimensions 2x3x4 requires 2*6 + 2*12 + 2*8 = 52 square feet of wrapping paper plus 6 square feet
 * of slack, for a total of 58 square feet.
 * A present with dimensions 1x1x10 requires 2*1 + 2*10 + 2*10 = 42 square feet of wrapping paper plus 1 square
 * foot of slack, for a total of 43 square feet.
 *
 * QUESTION: All numbers in the elves' list are in feet. How many total square feet of wrapping paper
 * should they order?
 *
 */

// Make sure we got a filename on the command line.
if (process.argv.length < 3) {
    console.log('Usage: node ' + process.argv[1] + ' FILENAME');
    process.exit(1);
}

var fs = require('fs');
var filename = process.argv[2];

fs.readFile(filename, 'utf8', function (err, data) {
    if (err) throw err;

    var lines = data.split(/\r?\n/);

    var result = lines.reduce(function (previousLineResult, line) {

        var values = line.split('x').sort(function (value1, value2) {
            return value1 - value2;
        });

        // Note that this isn't really failsafe!
        // I just assume the values array has a length of 3.
        var l = values[0];
        var w = values[1];
        var h = values[2];

        // Since the array is ordered, we can just use l * w for calculating the slack.
        var lineResult = (l * w) + (2 * l * w) + (2 * w * h) + (2 * h * l);

        return previousLineResult + lineResult;
    }, 0);

    console.log('The elves should order ' + result + ' square feet of wrapping paper.');
});

