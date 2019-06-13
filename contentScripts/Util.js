const Util = {
    /**
     * @Description
     * QueryString 을 받아 JSON 형태로 반환합니다. QueryString 이 없을 경우 location.href 를 사용합니다.
     * (ex) "?a=b&c=d" => {"a":"b", "c":"d"}
     *
     * @param {string|undefined} [search=location.search] QueryString
     * @return {JSON}
     */
    getSearchObject: function (search) {
        let result = {};
        if (search === undefined) search = location.search;
        if (search === '') return result;
        search.substr(1).split('&').map((v) => {
            let [key, val] = v.split('=');
            if (!key || !val) return;
            result[key] = val;
        });
        return result;
    },

    /**
     * JSON 을 받아 QueryString 형태로 반환합니다.
     * (ex) {"a":"b", "c":"d"} => "?a=b&c=d"
     *
     * @param {JSON} obj
     * @returns {string}
     */
    objectToQueryString: function (obj) {
        let result = [];
        for (let k in obj) {
            if (obj.hasOwnProperty(k)) {
                result[result.length] = k + '=' + obj[k];
            }
        }
        return '?' + result.join('&');
    },
};