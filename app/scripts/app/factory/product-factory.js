'use strict';
app.factory('ProductFactory', ['$http', '$appConfig',
    function(http, appConfig) {
        var url = appConfig.host + '/item';
        return {
            getProducts: function() {
                return http({
                    url: url,
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
            },
            getProductById: function(id) {
                return http({
                    url: url + '/' + id,
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
            },
            deleteProduct: function(id) {
                return http({
                    url: url + '/' + id,
                    method: 'DELETE',
                });
            },
            createProduct: function(model) {
                return http({
                    url: url,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: model
                });
            },
            editProduct: function(model) {
                return http({
                    url: url,
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: model
                });
            }
        }
    }
]);
