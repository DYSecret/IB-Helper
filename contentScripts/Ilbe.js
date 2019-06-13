const Ilbe = {
    /**
     * @type {('view'|'list'|'unknown')}
     */
    pageType: 'unknown',

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

        // 이벤트 할당
        $(document).on('keydown', (e) => {
            console.log(e.key, e.which);
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

    /**
     * @description 게시판 이름을 반환합니다.
     * @returns {string}
     */
    getBoardName: function () {
        let href = $('div.board-header a').attr('href');
        return href.substr(href.lastIndexOf('/') + 1);
    },

    /**
     * @description
     * 페이지번호(n)를 넣으면 현재 게시판의 해당페이지 게시물 목록을 반환합니다.
     * 페이지번호를 넣지 않으면 현재 페이지의 게시물 목록을 반환합니다
     * @param {number} [n]
     */
    getPageList: function (n) {
        let doc = '';
        if (n === undefined) {
            doc = document.body;
        } else {
            let searchObject = Util.getSearchObject();
            searchObject.page = n;
            let $ajax = $.ajax({
                type: "GET",
                async: false,
                url: '/list/' + this.getBoardName() + Util.objectToQueryString(searchObject),
            });
            doc = $ajax.responseText.replace(/src=/gi, 'data-src=');
        }
        return $(doc).find('ul.board-body > li')
            .not('.title-line')
            .not('.notice-line')
            .not('.ad-line');
    },

    /**
     * @description 개발필요
     */
    goToLatestDoc: function () {
        // $.ajax({
        //     type: "GET",
        //     url: ('/list/' + this.getBoardName()),
        //     success: function (r) {
        //         location.href = $(r.replace(/src=/gi, 'data-src='))
        //             .find('ul.board-body > li')
        //             .not('.title-line')
        //             .not('.notice-line')
        //             .not('.ad-line')
        //             .eq(0)
        //             .find('a.subject')
        //             .attr('href');
        //     })
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


    getBoardUrl: function () {

    },
    getCurrentDocIndex: function () {
        for (var i = 0, end = this.$boardList.length; i < end; ++i)
            if (this.$boardList.eq(i).hasClass('list-current-doc'))
                return i;
    }
};
Ilbe.init();