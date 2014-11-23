'use strict';
app.directive('contextMenu', ['$parse', '$rootScope',
    function(parse, rootScope) {
        var doc = $(document);
        var win = $(window);
        rootScope.$on('$locationChangeStart', function() {
            doc.unbind('click');
        });

        return function(scope, element, attrs) {
            var menu = $('#' + attrs.contextMenu);
            var selectFunc = attrs.meiSelected ? parse(attrs.meiSelected) : null;
            var showFunc = attrs.mnuShow ? parse(attrs.mnuShow) : null;
            var disnableFunc = attrs.meiDisnable ? parse(attrs.meiDisnable) : null;

            var hideMenu = function(e) {
                menu.css('display', 'none');
            };

            if (!menu.data('binded')) {
                doc.click(hideMenu);
                var itemClick = function(e) {
                    hideMenu(e);
                    e.preventDefault();
                    var jel = $(e.target);
                    if (!jel.hasClass('disnable-mei')) {
                        var slcFn = menu.data('selectFunc');
                        if (slcFn) {
                            var sc = menu.data('scope');
                            scope.$apply(function() {
                                slcFn(sc, {
                                    $meiId: e.target.id
                                });
                            });
                        }
                    }
                };
                menu.find('.menu-item').bind('contextmenu', itemClick).click(itemClick);
                menu.data('binded', true);
            }

            element.bind('contextmenu', function(event) {
                event.preventDefault();
                if (disnableFunc) {
                    var drs = disnableFunc(scope);
                    menu.find('.menu-item').each(function(i, el) {
                        var jel = $(el);
                        var id = el.id;
                        if (drs && drs.indexOf(id) >= 0) {
                            jel.addClass('disnable-mei');
                        } else {
                            jel.removeClass('disnable-mei');
                        }
                    });
                }

                menu.css('display', 'block')
                    .data('scope', scope)
                    .data('selectFunc', selectFunc);

                var mw = menu.outerWidth();
                var dw = win.width();
                var l = event.clientX + mw;
                var left = l > dw ? event.pageX - mw : event.pageX;

                var mh = menu.outerHeight();
                var dh = win.height();
                var t = event.clientY + mh;
                var top = t > dh ? event.pageY - mh : event.pageY;

                menu.css('left', left)
                    .css('top', top);

                if (showFunc) {
                    scope.$apply(function() {
                        showFunc(scope);
                    });
                }
            });
        };
    }
]).directive('zeroCopy', ['$parse', '$timeout',
    function(parse, timeout) {
        return function(scope, element, attrs) {
            var clip = new ZeroClipboard(element);
            if (attrs.zeroCopy) {
                timeout(function() {
                    scope[attrs.zeroCopy] = clip;
                });
            }
        };
    }
]);
