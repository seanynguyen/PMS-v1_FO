'use strict';
app.directive('filestyle', ['$parse', '$timeout', 
    function(parse, timeout) {
        return function(scope, element, attrs) {
            var model = parse(attrs.filestyle)(scope);
            element.attr('tabindex', '-1');
            element.attr('style', 'position: absolute;left: -999999999px;');
            element.change(function(event) {
            	if(event.target.files && event.target.files.length > 0) {
                    var file = event.target.files[0];
                    timeout(function() {
                        model(element, file);
                    });
            	} else {
                    timeout(function() {
                        model(element, null);
                    });
            	}
            });

            //Fix bug error when click
            element.click(function(e){
                e.stopPropagation();
            });
        };
    }
]);
