/**
 * solution_1.js
 * js_advent_of_code
 *
 * Created by wuotr on 04/12/15.
 */

/**
 * Santa is delivering presents to an infinite two-dimensional grid of houses.
 *
 * He begins by delivering a present to the house at his starting location, and then an elf at the North Pole
 * calls him via radio and tells him where to move next. Moves are always exactly one house to the north '^',
 * south 'v', east '>', or west '<'. After each move, he delivers another present to the house at his new location.
 *
 * However, the elf back at the north pole has had a little too much eggnog, and so his directions are a little
 * off, and Santa ends up visiting some houses more than once.
 *
 * For example:
 * '>' delivers presents to 2 houses: one at the starting location, and one to the east.
 * '^>v<' delivers presents to 4 houses in a square, including twice to the house at his starting/ending location.
 * '^v^v^v^v^v' delivers a bunch of presents to some very lucky children at only 2 houses.
 *
 * QUESTION: How many houses receive at least one present?
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

    // We start at point 0, 0.
    var x = 0, y = 0;

    var visitedPoints = [];
    var positionString;
    var i = 0;

    do {
        positionString = 'x:' + x + '-y:' + y;

        if (visitedPoints.indexOf(positionString) < 0) {
            visitedPoints.push(positionString);
        }

        switch (data.charAt(i)) {
            case '>':
                x++;
                break;
            case '<':
                x--;
                break;
            case '^':
                y++;
                break;
            case 'v':
                y--;
                break;
        }

        i++;

    } while (i <= data.length);

    console.log('' + visitedPoints.length + ' houses receive at least one present.');
});