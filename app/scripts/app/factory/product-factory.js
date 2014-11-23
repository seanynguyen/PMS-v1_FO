'use strict';
app.factory('ProductFactory', ['$http', '$appConfig',
    function(http, appConfig) {
        var url = appConfig.host + '/itemService';
        return {
            demo: function() {
                return http({
                    url: url + '/1',
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
            }
        }
    }
]);
