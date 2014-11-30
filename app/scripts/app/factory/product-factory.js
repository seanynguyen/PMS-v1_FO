'use strict';
app.factory('ProductFactory', ['$http', '$appConfig',
    function(http, appConfig) {
        var url = appConfig.host + '/item';
        return {
            getProductById: function(id) {
                return http({
                    url: url + '/'+id,
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
            }
        }
    }
]);
