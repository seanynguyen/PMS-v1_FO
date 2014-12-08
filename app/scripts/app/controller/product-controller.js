'use strict';
app.controller('ProductCtrl', ['$scope',
    '$location',
    'AlertService',
    'ProductFactory',
    '$routeParams',

    function(scope, location, alertService, productFactory, routeParams) {
        scope.product = {};
        scope.itemPrices = [];
        scope.isCreate = true;

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
            'id': 6,
            'name': 'category 6'
        }];
        scope.category = scope.categories[0];

        scope.listStatus = [{
            'statusId': 1,
            'statusName': 'Hot'
        }, {
            'statusId': 4,
            'statusName': 'Ice'
        }, {
            'statusId': 3,
            'statusName': 'Default'
        }];

        scope.status = scope.listStatus[0];
        scope.priceTemp = 0;

        if (routeParams.id != 'create') {
            loadProduct(function(data) {
                // load category of product
                angular.forEach(scope.categories, function(obj, key) {
                    if (data.categoryId == obj.id) {
                        scope.category = scope.categories[key];
                        return;
                    }
                });
                // load item price of product
                scope.itemPrices = data.itemPrices;

            });
            scope.isCreate = false;
        }

        function loadProduct(onsuccess) {
            productFactory.getProductById(routeParams.id).success(function(data) {
                scope.product = data;
                console.log(scope.product);
                if (onsuccess) {
                    onsuccess(data);
                }
            }).error(alertService.onError);
        }

        scope.addItemPrice = function(status) {
            var g = true;
            angular.forEach(scope.itemPrices, function(obj) {
                if (status.statusId == obj.statusId) {
                    alertService.alert('item price đã tồn tại');
                    g = false;
                    return;
                }
            });
            if (g) {
                if (scope.priceTemp == 0) {
                    alertService.alert('Vui lòng nhập giá tiền');
                    return;
                }
                if (isNaN(scope.priceTemp)) {
                    alertService.alert('Vui lòng nhập giá là số');
                    return;
                }
                status.price = scope.priceTemp;
                scope.itemPrices.push(status);
                alertify.success('Add item price success');
                console.log(scope.itemPrices);
            }
        };

        scope.deleteItemPriceSelected = function(itemPrice) {
            alertService.confirm('Xóa item price khỏi danh sách ?', function(e) {
                if (e) {
                    angular.forEach(scope.itemPrices, function(obj, key) {
                        if (itemPrice.statusId == obj.statusId) {
                            scope.itemPrices.splice(key, 1);
                            alertify.success('Delete item price success');
                            return;
                        }
                    });
                    scope.$apply();
                    console.log(scope.itemPrices);
                }
            })
        };

        scope.createProduct = function() {
            if (scope.product.name == null) {
                alertService.alert('Vui lòng nhập tên item');
                return;
            }
            if (scope.product.description == null) {
                alertService.alert('Vui lòng nhập mô tả cho item');
                return;
            }
            if(scope.itemPrices.length==0) {
                alertService.alert('Vui lòng nhập item price');
                return;
            }
            scope.sendItemPrices = [];
            angular.forEach(scope.itemPrices, function(obj) {
                scope.sendItemPrices.push({
                    'price' : obj.price,
                    'statusId' : obj.statusId
                });
            });            
            scope.sendCreate = {
                'categoryId': scope.category.id,
                'description': scope.product.description,
                'name': scope.product.name,
                'itemPrices' : scope.sendItemPrices
            };
            console.log(scope.sendCreate);
            productFactory.createProduct(scope.sendCreate).success(function() {
                location.path('#/product');
                alertify.success('Create item success');
            }).error(alertService.onError);
        };

        scope.editProduct = function() {
            if (scope.product.name == null) {
                alertService.alert('Vui lòng nhập tên item');
                return;
            }
            if (scope.product.description == null) {
                alertService.alert('Vui lòng nhập mô tả cho item');
                return;
            }
            scope.sendItemPrices = [];
            angular.forEach(scope.itemPrices, function(obj) {
                scope.sendItemPrices.push({
                    'price' : obj.price,
                    'statusId' : obj.statusId
                });
            });
            scope.sendEdit = {
                'id': scope.product.id,
                'type': scope.product.type,
                'categoryId': scope.category.id,
                'description': scope.product.description,
                'name': scope.product.name,
                'itemPrices' : scope.sendItemPrices
            };
            console.log(scope.sendEdit);
            productFactory.editProduct(scope.sendEdit).success(function() {
                location.path('#/product');
                alertify.success('Edit item success');
            }).error(alertService.onError);
        };        

    }
]);
