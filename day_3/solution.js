/**
 * solution_2.js
 * js_advent_of_code
 *
 * Created by wuotr on 04/12/15.
 */

/**
 * PART 1:
 * ---------------------------------------------------------------------------------------------------------------------
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
 *
 * PART 2:
 * ---------------------------------------------------------------------------------------------------------------------
 * The next year, to speed up the process, Santa creates a robot version of himself, Robo-Santa, to
 * deliver presents with him.
 *
 * Santa and Robo-Santa start at the same location (delivering two presents to the same starting house), then
 * take turns moving based on instructions from the elf, who is eggnoggedly reading from the same script as
 * the previous year.
 *
 * For example:
 * '^v' delivers presents to 3 houses, because Santa goes north, and then Robo-Santa goes south.
 * '^>v<' now delivers presents to 3 houses, and Santa and Robo-Santa end up back where they started.
 * '^v^v^v^v^v' now delivers presents to 11 houses, with Santa going one direction and Robo-Santa going the other.
 *
 * QUESTION: This year, how many houses receive at least one present?
 *
 */

// Make sure we got a filename + stepValue on the command line.
if (process.argv.length < 4) {
    console.log('Usage: node ' + process.argv[1] + ' <<FILENAME>> <<NUMBER-OF-CONCURRENT-ROUTES>>');
    process.exit(1);
}

var fs = require('fs');
var filename = process.argv[2];
var stepValue = parseInt(process.argv[3], 10);

function getNewPointForChar(x, y, char) {
    switch (char) {
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

    return {xPos: x, yPos: y};
}

fs.readFile(filename, 'utf8', function (err, data) {
    if (err) throw err;

    var xPositions = [], yPositions = [];

    var visitedPoints = [];
    var positionString;
    var i, j;

    // Fill the start positions.
    for (j = 0; j < stepValue; j++) {
        xPositions[j] = 0;
        yPositions[j] = 0;
    }

    // Fill the visitedPoints array with unique (string) values.
    for (i = 0; i < data.length; i += stepValue) {

        for (j = 0; j < stepValue; j++) {

            var newPoint = getNewPointForChar(xPositions[j], yPositions[j], data.charAt(i + j));

            xPositions[j] = newPoint.xPos;
            yPositions[j] = newPoint.yPos;

            positionString = 'x:' + newPoint.xPos + '-y:' + newPoint.yPos;

            if (visitedPoints.indexOf(positionString) < 0) {
                visitedPoints.push(positionString);
            }
        }
    }

    console.log('' + visitedPoints.length + ' houses receive at least one present.');
});