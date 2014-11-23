'use strict';
//Config route
app.config(['$routeProvider', function(routeProvider) {
    routeProvider.when('/product', {
        templateUrl: 'views/product.html',
    })/*.otherwise({
        redirectTo: '/product'
    })*/;
}]);
