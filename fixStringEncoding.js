/*eslint-env node*/
/*eslint no-unused-vars:0, no-console:0*/
var fs = require('fs');

var replacements = [
    {
        name: 'ellipsis',
        find: "…",
        replace: "&hellip;",
    }, {
        name: 'euro',
        //find: String.fromCodePoint(128),
        find: "€",
        replace: "&euro;",
    }
];

function replaceInArray(array, index, replacement) {
    return array.slice(0, index)
        //new middle
        .concat(replacement)
        //end skipping the index char
        .concat(array.slice(index + 1));
}

function getBadIndexList(array, bad) {
    var badList = [],
        find = 0;

    while (find !== -1) {
        find = array.indexOf(bad, find);
        badList.push(find);
    }

    return badList;
}

function stringToSplitHexArray(string) {
    function splitHexString(hex) {
        var hexArray = [];
        for (var i = 0; i < hex.length; i += 2) {
            hexArray.push(hex.slice(i, i + 2));
        }
        return hexArray;
    }
    return splitHexString(Buffer.from(string).toString('hex'));
}

//do the replacements
module.exports = function fixCsvs(string) {
    var hexArray = stringToSplitHexArray(string);
    return replacements.reduce(function (string, replacement) {

        return string.replace(RegExp(replacement.find, 'g'), replacement.replace);
    }, string);
}
