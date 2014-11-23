'use strict';
app.run(['AccountService', 'com.agilsun.InitService',
    function(accountService, initService) {    
/*        function checkLocation(route, location) {
            //Check permision require
            if (route.require) {
                if (route.require == 'login') {
                    if (!accountService.isSignedIn()) {
                        location.path('/sign-in');
                    }
                } else if (route.require == 'no-login') {
                    if (accountService.isSignedIn()) {
                        location.path('/');
                    }
                } else if (route.require != 'none') {
                    throw 'The reoute require "' + route.require + '" does not support!';
                }
            }
        }*/
        //Prepare data
        console.log('Preparing...');
/*        accountService.prepareData({
            success: function() {
                initService.init(app, checkLocation);
            },
            unauthor: function() {
                initService.init(app, checkLocation);
            },
            error: initService.error
        });*/

    }
]);
