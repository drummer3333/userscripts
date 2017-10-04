// ==UserScript==
// @name         DWTF - Uncomment
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Uncomment HTML Comments in arctiles
// @author       drummer
// @match        http://thedailywtf.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var articleBody = document.getElementsByClassName("article-body");
    articleBody = articleBody[0];
    articleBody.innerHTML = articleBody.innerHTML.replace(/<!--/g, '<span style="color: #9ae59a;white-space: pre-line;">&lt;!--').replace(/-->/g, '--&gt;</span>');
})();