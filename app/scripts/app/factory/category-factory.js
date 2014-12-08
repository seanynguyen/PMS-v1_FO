'use strict';
app.factory('CategoryFactory', ['$http', '$appConfig',
    function(http, appConfig) {
        var url = appConfig.host + '/category';
        return {
            loadCategory: function() {
                return http({
                    url: url,
                    method: 'GET',
                });
            }
        }
    }
]);
