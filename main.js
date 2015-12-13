(function() {

    $(document).on('click', '.postArticle--full .readingTime', function() {

        $('body').append("<medium-reader><p></p><input value='500' type='range' min='10' max='1000' /></medium-reader>");

        var $mediumReader = $('medium-reader');
        var $readerWord = $('medium-reader p');
        var $readerInput = $('medium-reader input');
        var $postActionBar = $('.postActionsBar.js-postActionsBar');
        var $postRecommend = $('.postActions .js-actionRecommend').eq(0);
        var $postContent = $('.section-content');

        $postActionBar.addClass('is-visible');
        $readerWord.html($postContent.find('h3').eq(0).clone());
        $readerWord.append('<span>PRESS SPACEBAR TO START</span>')

        var pause = true;
        var word = 0;
        var timer;

        var startReading = function() {
            $postActionBar.removeClass('is-visible');
            pause = false;
            setTimer();
        }

        var pauseReading = function() {
            $postActionBar.addClass('is-visible');
            if (timer) clearInterval(timer);
            pause = true;
        }

        var words = $postContent.text()
            .replace(/<img[^>]*>/g, '')
            .replace(/[^\w\W\s]/g, ' ')
            .replace(/[.,-\/!\^&\*;:{}\-_`~()“—…”\[\]\?→|]/g, ' ')
            .replace(/\s+/g, ' ')
            .toLowerCase()
            .split(' ');

        var read = function() {
            if (word < words.length) {
                $readerWord.text(words[word]);
                word++;
            } else {
                $readerWord.html($postRecommend.clone())
                pauseReading();
                word = 0;
            }
        }

        var setTimer = function() {
            if (timer) clearInterval(timer);
            timer = setInterval(read, 60000 / $readerInput.val());
        }

        $mediumReader.on('click', function(e) {
            if ($mediumReader.is(e.target)) {
                pauseReading();
                $mediumReader.remove();
                $postActionBar.removeClass('is-visible');
            }
        });

        $readerInput.on('change', function() {
            setTimer();
        });

        window.addEventListener('keydown', function(e) {
            if (e.keyCode == 32) {
                e.preventDefault();
                if (pause) startReading();
                else pauseReading();
            }
        });

    });

})();
