function isBrowserSupportHtml5() {
    //Test browser
    var test_canvas = document.createElement('canvas'); //try and create sample canvas element
    if (!test_canvas.getContext) {
        return false;
    }

    var test_audio = document.createElement('audio'); //try and create sample audio element
    if (!test_audio.play) {
        return false;
    }

    var test_video = document.createElement('video'); //try and create sample video element

    if (!test_video.play) {
        return false;
    }

    var testrange = document.createElement('input');
    testrange.setAttribute('type', 'range'); //set INPUT element to the type we're testing for
    if (testrange.type != 'range') {
        return false;
    }

    return true;
}

//Check html5
if (!isBrowserSupportHtml5()) {
    window.location = 'html5error.html';
}


//Import resources
function importRes(tag, params, endTag) {
    for (var key in params) {
        var items = params[key];
        document.write('<!-- Resources of ' + key + ' -->');
        for (var i = 0; i < items.length; i++) {
            var url = items[i];
            document.write(tag + url + endTag);
        };
    }
}

function importCss(params) {
    document.write('\n<!-- Import Css Resources-->');
    importRes('<link type="text/css" rel="stylesheet" href="styles/', params, '">');
}

function importJs(params) {
    document.write('\n<!-- Import Javascript Resources-->');
    importRes('<script type="text/javascript" src="scripts/', params, '"></script>');
}
