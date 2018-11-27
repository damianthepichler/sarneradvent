
//var dateNow  = moment();
moment.locale('de');
var dateNow  = 20181203;
var dateFrom = 20181201;
var dateTo   = 20181224;
var $pageTemplate   = $('.js-page-template');
var $pages          = $('.js-pages');
var pages = [];

var filesBasePath = 'files/';
var filesEnding   = '.mp3';
var files = {
    1 : 'test1',
    2 : 'test2',
    3 : 'test3',
    4 : 'test4',
    5 : 'test5',
};

$(function() {

  if (dateNow >= dateFrom) {
    var iterationNumber = 0;

    for (var thisDateString = dateFrom; thisDateString <= dateNow; thisDateString++) {
        iterationNumber++;
        var thisPageDate = moment(thisDateString, 'YYYYMMDD');
        var $thisPageObject  = $pageTemplate.clone();
        // var thisNativePlayer = $thisPageObject.find('.js-native-player');
        $thisPageObject.removeClass('hide-me');
        $thisPageObject.addClass('page-' + thisDateString);
        $thisPageObject.find('.js-audio-source').attr('src', filesBasePath + files[iterationNumber] + filesEnding);
        $thisPageObject.find('.js-week-day').html(thisPageDate.format('dddd') + ',');
        $thisPageObject.find('.js-day').html(thisPageDate.format('D'));
        $thisPageObject.find('.js-month').html(thisPageDate.format('MMMM'));
        pages.push({content : $thisPageObject.prop('outerHTML')});
    }

    var $buttonPlayPause = $('.js-button-play-pause');

    $(document).on('click', $buttonPlayPause, function(e){
        alert()
        var $this = $(e.target);
        if (!$this.hasClass('js-button-play-pause')) {
            $this = $this.closest('.js-button-play-pause');
        }

        $this.toggleClass('button--play-pause--play button--play-pause--pause');

        var thisPlayer = $this.closest('.js-page-content').find('.js-native-player')[0];
        thisPlayer[thisPlayer.paused ? 'play' : 'pause']();
        $(thisPlayer).off('ended').on('ended', function(){
            $this.toggleClass('button--play-pause--play button--play-pause--pause');
        });
    });

    var slider = new iSlider(document.getElementById('js-pages'), pages, {
        initIndex : (iterationNumber - 1),
        isOverspread: 1,
        animateTime: 800,
        animateType: 'flow',
        isVertical: true
    });
  }

});
