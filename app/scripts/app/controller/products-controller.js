'use strict';
app.controller('ProductsCtrl', ['$scope',
    '$location',
    'AlertService',
    'ProductFactory',
    function(scope, location, alertService, productFactory) {
        function demo() {
            /*          productFactory.demo().success(function(data){
                            console.log(data);
                        }).error();*/
        }
        demo();
        scope.editProduct = function() {
            location.path('/product/1');
        };
        scope.createProduct = function() {
            location.path('/product/create');
        };
        scope.deleteProduct = function() {
            alertService.confirm('Bạn có muốn xóa!', function(e) {
                if (e) {
                    alertify.success('Xóa thành công');
                }
            });
        }
    }
]);
