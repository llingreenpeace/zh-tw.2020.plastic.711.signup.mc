import './main.scss'
const ProgressBar = require('progressbar.js')
const {$} = window

$(document).ready(function() {
    console.log( "ready!" );
    initProgressBar();
    init();
});

function initProgressBar() {
    let bar = new ProgressBar.Line('#progress-bar', {
        strokeWidth: 3,
        easing: 'easeInOut',
        duration: 1400,
        color: '#FFEA82',
        trailColor: '#eee',
        trailWidth: 1,
        svgStyle: {width: '100%', height: '100%'}
    });
    bar.animate(0.6);
}

function init () {
    // create the year options
    let currYear = new Date().getFullYear()
    for (var i = 0; i < 80; i++) {
        let option = `<option value="01/01/${currYear-i}">${currYear-i}</option>`

        $("#fake_supporter_birthYear").append(option);
        $('#en__field_supporter_NOT_TAGGED_6').append(option);
    }
}