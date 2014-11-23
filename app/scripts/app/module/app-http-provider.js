'use strict';
app.config(['$httpProvider',
    function(http) {
        http.defaults.headers.common = {};
        http.defaults.headers.get = {};
        http.defaults.headers.post = {};
        http.defaults.headers.put = {};
        http.defaults.headers.patch = {};
        http.defaults.withCredentials = true;
        http.defaults.useXDomain = true;
        delete http.defaults.headers.common['X-Requested-With'];
    }
]);