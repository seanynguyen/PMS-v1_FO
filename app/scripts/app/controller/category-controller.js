'use strict';
app.controller('CategoryCtrl', ['$scope',
    '$location',
    'AlertService',
    function(scope, location, alertService) {
        scope.item = {
            'name': 'category 1',
            'description': 'description of category 1'
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
        }
    }
]);
