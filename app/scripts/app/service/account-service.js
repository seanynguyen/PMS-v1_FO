'use strict';
app.service('AccountService', ['AccountFactory', 'LocalDataService',
    function(accountFactory, localDataService) {
        this.isSignedIn = function() {
            if (localDataService.getAuthor()) {
                return true;
            }
            return false;
        };

        this.getAuthor = localDataService.getAuthor;

        this.signIn = function(params) {
            accountFactory.adminSignIn(params.model)
                .success(function(data) {
                    localDataService.setAuthor({
                        fullName: data.fullName,
                        status: data.status,
                        id: data.id,
                        email: data.email
                    });
                    if (params.success) {
                        params.success();
                    }
                }).error(params.error);
        };

        this.signOut = function(params) {
            accountFactory.signOut().success(function() {
                localDataService.clearAll();
                if (params.success) {
                    params.success();
                }
            }).error(params.error);
        };

        this.prepareData = function(params) {
            accountFactory.getAdminProfile()
                .success(function(data) {
                    localDataService.setAuthor({
                        fullName: data.fullName,
                        status: data.status,
                        id: data.id,
                        email: data.email
                    });
                    if (params.success) {
                        params.success();
                    }
                }).error(function(code, status) { //Not Authenticated
                    if (status == 401) {
                        localDataService.clearAll();
                        if (params.unauthor) {
                            params.unauthor();
                        }
                    } else if (params.error) {
                        params.error(code, status);
                    }
                });
        };
    }
]);
