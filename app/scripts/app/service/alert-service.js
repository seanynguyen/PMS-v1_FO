'use strict';
app.service('AlertService', ['ResourceService', '$location', 'LocalDataService', '$timeout',
    function(resourceService, location, localDataService, timeout) {
        alertify.set({
            labels: {
                ok: "Đồng ý",
                cancel: "Hủy bỏ"
            }
        });

        this.getValue = resourceService.getValue;

        this.onError = function(code, status) {
            switch (status) {
                case 401: 
                    alertify.alert(resourceService.getValue('INSIDE_UNAUTHORIZATION'), function() {
                        timeout(function() {
                            localDataService.clearAll();
                            location.path('/sign-in');
                        });
                    });
                    break;
                case 500: //Server error
                    alertify.error(resourceService.getValue('SERVER_ERROR'));
                    break;
                case 404: //Not found
                    alertify.error(resourceService.getValue('REQUESTED_RESOURCE_NOT_FOUND'));
                    break;
                case 400: //Bad request (using resource mapping)
                    if (!isEmpty(code)) {
                        alertify.alert(resourceService.getValue(code));
                    } else {
                        alertify.error(resourceService.getValue('SERVER_RESPONSE_UNDIFINED'));
                    }
                    break;
                default:
                    alertify.error(code);
            }
        };

        this.success = function(code) {
            alertify.success(resourceService.getValue(code));
        };

        this.log = function(code) {
            alertify.log(resourceService.getValue(code));
        };

        this.error = function(code, fn) {
            alertify.error(resourceService.getValue(code), fn);
        };

        this.confirm = function(code, func) {
            alertify.confirm(resourceService.getValue(code), func);
        };

        this.alert = function(code, fn) {
            alertify.alert(resourceService.getValue(code, fn));
        };

        this.prompt = function(code, fn) {
            alertify.prompt(resourceService.getValue(code), fn);
        };
    }
]);
