var things = [0, 1, 1, 3, 1, 5, 6, 1, 8];

function getBadIndexList(array, bad) {
    var badList = [],
        find = 0;

    while (find !== -1) {
        find = array.indexOf(bad, find);
        badList.push(find);
    }

    return badList;
}
getBadIndexList()
