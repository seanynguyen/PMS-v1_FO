'use strict';
app.directive('slecChange', ['$parse', 
    function(parse) {
        return function(scope, element, attrs) {
            element.change(function(event) {
            	var model = parse(attrs.slecChange)(scope);
                model[attrs.slecField] = element.val();
            });
        };
    }
]);
