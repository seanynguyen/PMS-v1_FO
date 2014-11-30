'use strict';
app.controller('ProductCtrl', ['$scope',
    '$location',
    'AlertService',
    'ProductFactory',
    '$routeParams',

    function(scope, location, alertService, productFactory, routeParams) {
        scope.product = {};

        scope.categories = [{
            'id': 1,
            'name': 'category 1'
        }, {
            'id': 2,
            'name': 'category 2'
        }, {
            'id': 3,
            'name': 'category 3'
        }, {
            'id': 4,
            'name': 'category 4'
        }];
        scope.category = scope.categories[0];

        scope.itemPrices = [{
            'id': 1,
            'price': 35,
            'statusId': 1,
            'statusName':'Hot'
        }, {
            'id': 2,
            'price': 20000,
            'statusId': 2,
            'statusName':'Ice'
        },{
            'id': 3,
            'price': 25000,
            'statusId': 3,
            'statusName':'Default'
        }];
        scope.itemPrice = scope.itemPrices[0];
        
        scope.listStatus = [ {
            'id': 2,
            'price': 20000,
            'statusId': 2,
            'statusName':'Ice'
        },{
            'id': 3,
            'price': 25000,
            'statusId': 3,
            'statusName':'Default'
        }];

        function loadProduct(id) {
            productFactory.getProductById(id).success(function(data) {
                console.log(data);
                scope.product = data;
            }).error(alertService.onError);
        }

        loadProduct(routeParams.id);

        scope.addItemPrice = function(itemPrice) {
            var g = true;
            angular.forEach(scope.listStatus, function(obj){
                if(itemPrice.id == obj.id) {
                    alertService.alert('item price đã tồn tại', function() {});
                    g = false;
                    return;
                }
            });
            if(g) {
                scope.listStatus.push(itemPrice);
                console.log(scope.listStatus);
            }
        };

        scope.deleteItemPriceSelected = function(id) {
            alertService.confirm('Xóa item price khỏi danh sách ?', function(e) {
                if (e) {
                    angular.forEach(scope.listStatus, function(obj, key){
                        if(obj.id == id) {
                            scope.listStatus.splice(key, 1);
                            return;
                        } 
                    });
                    scope.$apply();
                    console.log(scope.listStatus);
                }
            })
        };

    }
]);
