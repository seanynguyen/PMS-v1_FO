'use strict';
app.controller('CategoryCtrl', ['$scope',
    '$location',
    'AlertService',
    'CategoryFactory',
    function(scope, location, alertService, categoryFactory) {
        scope.categories = [];
        loadCategory();
        function loadCategory() {
            categoryFactory.loadCategory().success(function(data) {
                scope.categories = data;
                console.log(data);
            }).error(alertService.onError);
        };
        scope.editCategory = function(item) {
            if (!item.isEdit) {
                item.isEdit = true;
            } else {
                alertService.confirm('Do you want update category?', function(e) {
                    if (e) {
                        alertify.success('update success');
                    }
                });
                item.isEdit = false;
            }
        };
        scope.deleteCategory = function(item) {
            alertService.confirm('Do you want delete category?', function(e) {
                if (e) {
                    alertify.success('delete success');
                }
            });
        };
    }
]);
