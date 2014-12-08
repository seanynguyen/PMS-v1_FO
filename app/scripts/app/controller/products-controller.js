'use strict';
app.controller('ProductsCtrl', ['$scope',
    '$location',
    'AlertService',
    'ProductFactory',
    function(scope, location, alertService, productFactory) {
        scope.pruducts = [];
        getProducts();
        function getProducts() {
            productFactory.getProducts().success(function(data){
                console.log(data);
                scope.products = data;
            }).error(alertService.onError);
        };
        scope.editProduct = function(id) {
            location.path('/product/'+id);
        };
        scope.createProduct = function() {
            location.path('/product/create');
        };
        scope.deleteProduct = function(id) {
            alertService.confirm('Bạn có muốn xóa!', function(e) {
                if (e) {
                    productFactory.deleteProduct(id).success(function(){
                        alertify.success('Xóa thành công');
                        getProducts();
                    }).error(alertService.onError);
                }
            });
        }
    }
]);
