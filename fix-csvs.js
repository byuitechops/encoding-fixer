/*eslint-env node*/
/*eslint no-unused-vars:0, no-console:0*/
function splitHexString(hex) {
    var hexArray = [];
    for (var i = 0; i < hex.length; i += 2) {
        hexArray.push(hex.slice(i, i + 2));
    }
    return hexArray;
}





var fs = require('fs'),
    path = require('path'),
    fixIt = require('./fixStringEncoding.js'),
    files = fs.readdirSync(__dirname)
    .filter(function (file) {
        return path.extname(file) === '.csv';
    })
    .map(function (filename) {
        var buffer = fs.readFileSync(filename),
            stringIn = buffer.toString('utf8'),
            fixed = fixIt(stringIn);
        return {
            filename: filename,
            bufferI: splitHexString(buffer.toString('hex')),
            bufferO: splitHexString(Buffer.from(fixed).toString('hex')),
            stringI: stringIn,
            stringO: fixed


        };
    });

console.log(files);
