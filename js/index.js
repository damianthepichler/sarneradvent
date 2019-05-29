moment.locale('de');

var dateNow = moment().format('YYYYMMDD');
if (findGetParameter('chuck') == 'testa') {
    var dateNow = 20181224;
}
var dateNow = 20181224;
var dateFrom = 20181201;
var dateTo = 20181224;
var $pageTemplate = $('.js-page-template');
var $pages = $('.js-pages');
var pages = [];

var filesBasePath = 'files/';
var filesEnding = '.mp3';
var files = {
    1: 'joke-1',
    2: 'joke-2',
    3: 'joke-3',
    4: 'joke-4',
    5: 'joke-5',
    6: 'joke-6',
    7: 'joke-7',
    8: 'joke-8',
    9: 'joke-9',
    10: 'joke-10',
    11: 'joke-11',
    12: 'joke-12',
    13: 'joke-13',
    14: 'joke-14',
    15: 'joke-15',
    16: 'joke-16',
    17: 'joke-17',
    18: 'joke-18',
    19: 'joke-19',
    20: 'joke-20',
    21: 'joke-21',
    22: 'joke-22',
    23: 'joke-23',
    24: 'joke-24',
};

$(function () {

    if (dateNow >= dateFrom) {
        var iterationNumber = 0;

        for (var thisDateString = dateFrom; thisDateString <= dateNow; thisDateString++) {
            iterationNumber++;
            var thisPageDate = moment(thisDateString, 'YYYYMMDD');
            var $thisPageObject = $pageTemplate.clone();
            // var thisNativePlayer = $thisPageObject.find('.js-native-player');
            $thisPageObject.removeClass('hide-me');
            $thisPageObject.addClass('page-' + thisDateString);
            $thisPageObject.find('.js-audio-source').attr('src', filesBasePath + files[iterationNumber] + filesEnding);
            $thisPageObject.find('.js-week-day').html(thisPageDate.format('dddd') + ',');
            $thisPageObject.find('.js-day').html(thisPageDate.format('D'));
            $thisPageObject.find('.js-month').html(thisPageDate.format('MMMM'));
            pages.push({content: $thisPageObject.prop('outerHTML')});
        }

        var $buttonPlayPause = $('.js-button-play-pause');
        $(document).on('click touchstart', $buttonPlayPause, function (e) {
            var $this = $(e.target);
            if (!$this.hasClass('js-button-play-pause')) {
                $this = $this.closest('.js-button-play-pause');
            }

            if ($this.length == 0) {
                return;
            }

            $this.toggleClass('button--play-pause--play button--play-pause--pause');

            var thisPlayer = $this.closest('.js-page-content').find('.js-native-player')[0];
            thisPlayer[thisPlayer.paused ? 'play' : 'pause']();
            $(thisPlayer).off('ended').on('ended', function () {
                $this.toggleClass('button--play-pause--play button--play-pause--pause');
            });
        });

        var slider = new iSlider(document.getElementById('js-pages'), pages, {
            initIndex: (iterationNumber - 1),
            isOverspread: 1,
            animateTime: 800,
            animateType: 'flow',
            isVertical: true
        });

        var $overlay = $('.js-check-overlay');
        var $overlayBg = $('.js-overlay-background');
        var $inputPw = $('.js-input-special-content-pw');
        var $inputButtonSubmit = $('.js-button-special-content-submit');
        var $inputButtonCancel = $('.js-button-special-content-cancel');
        var $messageError = $('.js-message-error');

        slider.on('slideChanged', function (slideIndex) {
            day = slider.slideIndex + 1;
            if (day == 24) {
                $overlay.addClass('overlay--shown  overlay--check-shown');
            }
        });
        slider.fire('slideChanged');

        $inputPw.on('keydown', function () {
            $messageError.removeClass('error-message--shown');
        });

        $inputButtonCancel.on('click', closeOverlay);
        $overlayBg.on('click', closeOverlay);


        $inputButtonSubmit.on('click', function () {
            if ($inputPw.val() == 'carosadvent') {
                $overlay.removeClass('overlay--check-shown');
                $overlay.addClass('overlay--video-shown');
            } else {
                $messageError.addClass('error-message--shown');
            }
            $inputPw.val('');
        });

        function closeOverlay() {
            $overlay.removeClass('overlay--shown');
            $overlay.removeClass('overlay--check-shown');
            $overlay.removeClass('overlay--video-shown');
            $inputPw.val('');
        }
    }

});


function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
            tmp = item.split("=");
            if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}