const Ilbe = {
    /**
     * @type {string}
     * @description view | list | unknown
     */
    pageType: '',
    /**
     * @type {jQuery}
     */
    $boardList: null,

    init: function () {
        console.log('Ilbe.js is injected');
        // pageType 확인
        if (location.pathname.indexOf('/view') === 0) {
            this.pageType = 'view';
        } else if (location.pathname.indexOf('/list') === 0) {
            this.pageType = 'list';
        } else {
            this.pageType = 'unknown';
        }
        // 게시물 목록
        this.$boardList = $('ul.board-body > li')
            .not('.title-line')
            .not('.notice-line')
            .not('.ad-line');
        // 이벤트 할당
        this.addEvent();
    },

    addEvent: function () {
        $(document).on('keydown', (e) => {
            console.log(e.key, e.which, this);
            switch (e.which) {
                case 192 : // `
                    this.goToLatestDoc();
                    break;
                case 49 : // 1
                    this.goToPrevDoc();
                    break;
                case 50 : // 2
                    this.goToNextDoc();
                    break;
                case 51 : // 3
                    this.goToPrevPage();
                    break;
                case 52 : // 4
                    this.goToNextPage();
                    break;
            }
        });
    },
    goToPrevDoc: function () {
        console.log('goToPrevDoc');
    },
    goToNextDoc: function () {
        console.log('goToNextDoc');
    },
    goToPrevPage: function () {
        console.log('goToPrevPage');
    },
    goToNextPage: function () {
        console.log('goToNextPage');
    },

    goToLatestDoc: function () {
        $.get(
            $('#list_back').attr('onclick').replace(/location.href='(.+)'/, '$1')
            , function (r) {
                location.href = $(r.replace(/src=/gi, 'data-src='))
                    .find('ul.board-body > li')
                    .not('.title-line')
                    .not('.notice-line')
                    .not('.ad-line')
                    .eq(0)
                    .find('a.subject')
                    .attr('href');
            });
    },
    getBoardUrl: function () {

    },
    getCurrentDocIndex: function () {
        for (var i = 0, end = this.$boardList.length; i < end; ++i)
            if (this.$boardList.eq(i).hasClass('list-current-doc'))
                return i;
    }
};
Ilbe.init();