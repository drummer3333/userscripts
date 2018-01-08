// ==UserScript==
// @name         BCM
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @require      https://code.jquery.com/jquery-3.2.1.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    $(document).ready(function() {
        var minsPerDay = Number.parseFloat($('table.table2 td.table2Col6').first().text().replace(',', '.')) / 5 * 60;
        var monthdiff = 0;
        $('.mainTable tr').each(function(index, elem) {
            if (index == 0) {
                $(elem).find('#closeBorderUpRight').attr('colspan', 5);
            }
            else if (index == 1) {
                $(elem).find(':contains(Mehr)').before('<td class="mainTableDark4Col">Differenz</td>');
            }
            else if ($(elem).children().length == 17){
                var cell = $(elem).find(':nth-Child(10)');
                var newCell = cell.clone();

                cell.before(newCell);

                var cellCurrHours = $(elem).find(':nth-Child(9)');
                if (cellCurrHours.length > 0 && cellCurrHours.text().trim() != '<br>') {
                    var diff = parseHours(cellCurrHours.text()) - minsPerDay;
                    if (!isNaN(diff)) {
                        newCell.text(showHoursMin(diff));
                        monthdiff += diff;
                    }
                }
            }
        });

        var lastRow = $('.mainTable .lastRow');
        var cell = lastRow.find(':nth-Child(10)');
        var sum = cell.clone();
        cell.before(sum);
        sum.text(showHoursMin(monthdiff));
    });

    function parseHours(s) {

        var a = s.split(':'); // split it at the colons

        return (+a[0] * 60) + (+a[1]);
    }

    function showHoursMin(n) {
        if (!isNaN(n)) {
            var min = Math.round(Math.abs(n % 60));
            return ((n<0)?"-":(n>0)?"+":"") + Math.floor(Math.abs(n/60)) + ":" + ((min < 10)?"0":"") + min;
        }
    }
})();
