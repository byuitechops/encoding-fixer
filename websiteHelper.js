// "http://www.utf8-chartable.de/"


Array.from(document.querySelectorAll('.codetable tr:not(.head)')).forEach(function (row, i) {
    ele = document.createElement('td');
    text = document.createTextNode(i);
    row.appendChild(ele.appendChild(text))
})

