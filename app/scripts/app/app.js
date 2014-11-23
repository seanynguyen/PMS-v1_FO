'use strict';
var app = angular.module('app', [
    'ngResource',
    'ngRoute',
    'ngCookies',
    'LocalStorageModule',
    'mgcrea.ngStrap',
    'ui.bootstrap',
    'plunk-y5n16v',
    'summernote',
    'com.agilsun.AppModule',
    'ui'
]);

app.value('$appConfig', {
    version: '0.0.1',
    host: 'http://192.168.1.192:8080/PMS-v1/PMS',
    dateFormat: 'dd/MM/yyyy',
    fullDateFormat: 'dd/MM/yyyy - HH:mm:ss',
    getImageUrl: function(relativeUrl) {
        if(relativeUrl) {
            return this.host + '/resources/' + relativeUrl;
        }
    },
    getThumbUrl: function (relativeUrl) {
        if(relativeUrl) {
            return this.host + '/thumbs/' + relativeUrl;
        }
    }
}).value('$enumValue', {
    ROLES: {
        USER: 'USER',
        ADMIN: 'ADMIN',
        SUPER_ADMIN: 'SUPER_ADMIN'
    }
});
