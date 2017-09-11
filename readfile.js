var fs = require('fs');

fs.readFile("./csvFiles/MC CSV files/csv files/L1MC.csv", function (err, data) {
    if (err) {
        console.error(err);
        return;
    }

    //    console.log(data.toString('hex'));
    var hex = data.toString('hex'),
        hexArray = [];

    //    console.log(hex.slice(0, 2));
    //    console.log(hex.length);


    for (var i = 0; i < hex.length; i += 2) {
        hexArray.push(hex.slice(i, i + 2));
    }

    //console.log(hexArray.length, hexArray[0], hexArray[hexArray.length-1]);



    var nastyChars = hexArray
        //conver the hex to base 10 (ascii)
        .map(function (hex) {
            return parseInt(hex, 16);
        })
        //filter out know acceptable characters (ascii)
        .filter(function (hex) {
            //if ((hex >= 65 && hex <= 90) || (hex >= 97 && hex <= 122) || (hex >= 48 && hex <= 57) || (hex >= 91 && hex <= 95)) {

            if (
                //latin chars
                (hex >= 32 && hex <= 126) ||
                //newlines
                (hex == 13 || hex == 10)

            ) {
                return false;
            } else {
                return true;
            }
        })
        //unique the results
        .filter(function (item, i, daList) {
            return i == daList.indexOf(item);
        })
        //convert value back to to base 16 (hex)
        .map(function (item) {
            return {
                base10: item,
                base16: item.toString(16),
                char: String.fromCodePoint(item)
            };
        })
        .sort(function (a, b) {
            return a.base10 - b.base10;
        });



    console.log("bad chars count:", nastyChars.length);
    console.log("bad Chars:\n", nastyChars);

});
