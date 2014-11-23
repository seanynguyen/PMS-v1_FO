'use strict';
app.controller('ProductCtrl', ['$scope',
    '$location',
    'AlertService',
    'ProductFactory',
    function(scope, location, alertService, productFactory) {
    	function demo() {
/*    		productFactory.demo().success(function(data){
    			console.log(data);
    		}).error();*/
    	}
    	demo();
    }
]);
