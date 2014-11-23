'use strict';
app.service('ResourceService', ['$http',
    function(http, localize) {
        //Get value from i18n
        this.getValue = function(key) {
            return key;
        };
    }
]);
