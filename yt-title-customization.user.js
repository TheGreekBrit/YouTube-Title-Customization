// ==UserScript==
// @name         YT Customization
// @version      1.0
// @description  adds view count, channel name, and publsh date
// @description  to the 'title' in the fullscreen youtube player
// @author       Alexander Houston
// @match        https://*.youtube.com/watch?v=*
// @grant        none
// ==/UserScript==

function updateTitle() {
    'use strict';

    let title_new = [];

    let title_original = document.getElementsByClassName('ytp-title-link').length ?
		//handle no title
        document.getElementsByClassName('ytp-title-link')[0].innerText :
        '<GM ERROR: NO TITLE>';

    let channel_name = document.getElementById('owner-container').children.length ?
        //handle no uploader
		document.getElementById('owner-container').children[0].children[0].innerHTML :
        '<GM ERROR: NO UPLOADER>';

    let publish_date = document.getElementsByClassName('date').length ?
        //handle no date
		document.getElementsByClassName('date')[0].innerText :
        '<GM ERROR: NO DATE>';

    let view_count = document.getElementsByClassName('view-count').length ?
        //handle no views
		document.getElementsByClassName('view-count')[0].innerHTML :
        'Views Hidden';

    //concat original title + extras
    title_new.push(title_original, channel_name, publish_date, view_count);
    //console.log(title_new);

	//update title data
    document.getElementsByClassName('ytp-title-link')[0].innerText = title_new.join('\n');
}

//run after player loads
let interval = setInterval(() => {
    if (document.getElementsByClassName('date').length) {
        clearInterval(interval);
        updateTitle();
    }
}, 1000);
