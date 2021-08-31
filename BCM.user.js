// ==UserScript==
// @name         BCM
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @require      https://code.jquery.com/jquery-3.2.1.min.js
// @grant        none
// ==/UserScript==

'use strict';

(function() {

    $(document).ready(function() {
        var minsPerDay = Number.parseFloat($('table.table2 td.table2Col6').first().text().replace(',', '.')) / 5 * 60;
        var monthdiff = 0;
        $('.mainTable tr').each(function(index, elem) {
            if ($(elem).children().length == 15){
                var cellIs = $(elem).find(':nth-Child(10)');
                var celldiff = $(elem).find(':nth-Child(11)');
                if (celldiff.length > 0 && cellIs.html().trim() != '<br>') {
                    var diff = parseHours(celldiff.text().trim());
                    monthdiff += diff;
                }
            }
        });

        var lastRow = $('.mainTable .lastRow');
        var cell = lastRow.find(':nth-Child(11)');
        var sum = cell.clone();
        cell.after(sum);
        sum.text(showHoursMin(monthdiff));
    });

    function parseHours(s) {
        var factor = 1;
        if (s[0] == "-") {
            s = s.substring(1);
            factor = -1;
        }

        var a = s.split(':'); // split it at the colons
        return factor * ((+a[0] * 60) + (+a[1]));
    }

    function showHoursMin(n) {
        if (!isNaN(n)) {
            var min = Math.round(Math.abs(n % 60));
            return ((n<0)?"-":(n>0)?"+":"") + Math.floor(Math.abs(n/60)) + ":" + ((min < 10)?"0":"") + min;
        }
    }
})();
