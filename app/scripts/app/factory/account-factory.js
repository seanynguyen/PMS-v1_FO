'use strict';
app.factory('AccountFactory', ['$http', '$appConfig',
    function(http, appConfig) {
        var url = appConfig.host + '/api/admin/account';
        return {
            adminSignIn: function(tokenObject) {
                return http({
                    url: url + '/signIn',
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: tokenObject
                });
            },
            signOut: function(tokenObject) {
                return http({
                    url: appConfig.host +'/api/account/signOut',
                    method: 'GET'
                });
            },
            getAccounts: function(keyword, pageIndex, pageSize) {
                return http({
                    url: url + '/getAccounts',
                    method: 'GET',
                    params: {
                        keyword: keyword,
                        pageIndex :pageIndex,
                        pageSize: pageSize
                    }
                });
            },
            getAdminProfile: function(tokenObject) {
                return http({
                    url: url + '/getAdminProfile',
                    method: 'GET'
                });
            },
            getAccountsById: function(accountId){
                return http({
                    url : url + '/getById',
                    method: 'GET',
                    params:{
                        accountId : accountId
                    }
                });
            },
            lockAccount:function(accountId){
                
                return http({
                    url : url + '/lockAccount',
                    method: 'PUT',
                    params:{
                        accountId : accountId
                    }
                });
            },
            unlockAccount:function(accountId){
                return http({
                    url : url + '/unlockAccount',
                    method: 'PUT',
                    params:{
                        accountId : accountId
                    }
                });
            },
            setAdmin:function(accountId){
                return http({
                    url : url + '/setAdmin',
                    method: 'PUT',
                    params:{
                        accountId : accountId
                    }
                });
            },
            unsetAdmin:function(accountId){
                return http({
                    url : url + '/unSetAdmin',
                    method: 'PUT',
                    params:{
                        accountId : accountId
                    }
                });
            }

        }
    }
]);
