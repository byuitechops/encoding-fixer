var fs = require('fs');

fs.readFile("L1MC.csv", function (err, data) {
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
    .map(function (hex) {
        return parseInt(hex, 16);
    })
    .filter(function (hex) {
        if ((hex >= 65 && hex <= 90) || (hex >= 97 && hex <= 122) || (hex >= 48 && hex <= 57) || (hex >= 91 && hex <= 95)) {
            return false;
        } else {
            return true;
        }
    })
    .filter(function(item, i, daList){
        return i == daList.indexOf(item);
    })
    .map(function(item){
        return item.toString(16);
    });

    
    
    console.log(nastyChars.length, nastyChars);

});
