'use strict';
app.service('LocalDataService', ['localStorageService',
    function(localStorage) {
        //Set logged user
        this.setAuthor = function(author) {
            localStorage.add('Author', author);
        };

        //Get logged user
        this.getAuthor = function() {
            return localStorage.get('Author');
        };

        //Clear all data
        this.clearAll = function() {
            localStorage.clearAll();
        };

        this.getCookie = function(cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i].trim();
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return null;
        };

        this.setCookie = function(cname, cvalue, exminutes) {
            var d = new Date();
            d.setTime(d.getTime() + (exminutes * 60 * 1000));
            var expires = "expires=" + d.toGMTString();
            document.cookie = cname + "=" + cvalue + "; " + expires;
        };
    }
]);
