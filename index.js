/*eslint-env node*/
/*eslint no-console:0*/

var fs = require('fs');

function getFileName() {
    return [
        "C:\Users\kitchen\Documents\Josh\encoding-fixer\csvFiles\FP CSV files\csv files\L1FP.csv",
        "C:\Users\kitchen\Documents\Josh\encoding-fixer\csvFiles\FP CSV files\csv files\L2FP.csv",
        "C:\Users\kitchen\Documents\Josh\encoding-fixer\csvFiles\FP CSV files\csv files\L3FP.csv",
        "C:\Users\kitchen\Documents\Josh\encoding-fixer\csvFiles\FP CSV files\csv files\L4FP.csv",
        "C:\Users\kitchen\Documents\Josh\encoding-fixer\csvFiles\FP CSV files\csv files\R1FP.csv",
        "C:\Users\kitchen\Documents\Josh\encoding-fixer\csvFiles\FP CSV files\csv files\R2FP.csv",
        "C:\Users\kitchen\Documents\Josh\encoding-fixer\csvFiles\FP CSV files\csv files\R3FP.csv",
        "C:\Users\kitchen\Documents\Josh\encoding-fixer\csvFiles\FP CSV files\csv files\R4FP.csv",
        "C:\Users\kitchen\Documents\Josh\encoding-fixer\csvFiles\FP CSV files\csv files\S1FP.csv",
        "C:\Users\kitchen\Documents\Josh\encoding-fixer\csvFiles\FP CSV files\csv files\S2FP.csv",
        "C:\Users\kitchen\Documents\Josh\encoding-fixer\csvFiles\FP CSV files\csv files\S3FP.csv",
        "C:\Users\kitchen\Documents\Josh\encoding-fixer\csvFiles\FP CSV files\csv files\S4FP.csv",
        "C:\Users\kitchen\Documents\Josh\encoding-fixer\csvFiles\FP CSV files\csv files\W1FP.csv",
        "C:\Users\kitchen\Documents\Josh\encoding-fixer\csvFiles\FP CSV files\csv files\W2FP.csv",
        "C:\Users\kitchen\Documents\Josh\encoding-fixer\csvFiles\FP CSV files\csv files\W3FP.csv",
        "C:\Users\kitchen\Documents\Josh\encoding-fixer\csvFiles\FP CSV files\csv files\W4FP.csv",
        "C:\Users\kitchen\Documents\Josh\encoding-fixer\csvFiles\MC CSV files\csv files\L1MC.csv",
        "C:\Users\kitchen\Documents\Josh\encoding-fixer\csvFiles\MC CSV files\csv files\L2MC.csv",
        "C:\Users\kitchen\Documents\Josh\encoding-fixer\csvFiles\MC CSV files\csv files\L3MC.csv",
        "C:\Users\kitchen\Documents\Josh\encoding-fixer\csvFiles\MC CSV files\csv files\L4MC.csv",
        "C:\Users\kitchen\Documents\Josh\encoding-fixer\csvFiles\MC CSV files\csv files\R1MC.csv",
        "C:\Users\kitchen\Documents\Josh\encoding-fixer\csvFiles\MC CSV files\csv files\R2MC.csv",
        "C:\Users\kitchen\Documents\Josh\encoding-fixer\csvFiles\MC CSV files\csv files\R3MC.csv",
        "C:\Users\kitchen\Documents\Josh\encoding-fixer\csvFiles\MC CSV files\csv files\R4MC.csv",
        "C:\Users\kitchen\Documents\Josh\encoding-fixer\csvFiles\MC CSV files\csv files\S1MC.csv",
        "C:\Users\kitchen\Documents\Josh\encoding-fixer\csvFiles\MC CSV files\csv files\S2MC.csv",
        "C:\Users\kitchen\Documents\Josh\encoding-fixer\csvFiles\MC CSV files\csv files\S3MC.csv",
        "C:\Users\kitchen\Documents\Josh\encoding-fixer\csvFiles\MC CSV files\csv files\S4MC.csv",
        "C:\Users\kitchen\Documents\Josh\encoding-fixer\csvFiles\MC CSV files\csv files\W1MC.csv",
        "C:\Users\kitchen\Documents\Josh\encoding-fixer\csvFiles\MC CSV files\csv files\W2MC.csv",
        "C:\Users\kitchen\Documents\Josh\encoding-fixer\csvFiles\MC CSV files\csv files\W3MC.csv",
        "C:\Users\kitchen\Documents\Josh\encoding-fixer\csvFiles\MC CSV files\csv files\W4MC.csv"
    ];
}

function listBadChars(fileName, callback) {

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

        callback(null, {
            fileName: fileName,
            nastyChars: nastyChars
        });
    });

}



/*
[ { base10: 133, base16: '85', char: '…', replace:'...' },
 { base10: 145, base16: '91', char: '‘', replace:"'" },
 { base10: 146, base16: '92', char: '’', replace:"'" },
 { base10: 147, base16: '93', char: '“', replace:'"' },
 { base10: 148, base16: '94', char: '”', replace:'"' },
 { base10: 160, base16: 'a0', char: '&nbsp;', replace:' ' } ]


*/
