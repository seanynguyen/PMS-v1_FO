'use strict';
//Config route
app.config(['$routeProvider', function(routeProvider) {
    routeProvider.when('/product', {
        templateUrl: 'views/products.html',
    }).when('/product/:id', {
        templateUrl: 'views/product.html',
    }).when('/category', {
        templateUrl: 'views/category.html',
    }).otherwise({
        redirectTo: '/product'
    });
}]);
