'use strict';
angular.module('com.agilsun.AppModule', ['ngResource', 'ngRoute'])
    .service('com.agilsun.Preparer', function() {
            var isLoading;
            var isReady = false;
            var readyFuncs = [];
            var loadingFunc;

            this.ready = function() {
                isReady = true;
                while (readyFuncs.length > 0) {
                    //Get the first item
                    var func = readyFuncs[0];

                    //Remove item
                    readyFuncs.splice(0, 1);

                    //Exec function
                    func();
                }
            };

            this.clearSubviewHandler = function() {
                function indexOfSubview() {
                    for (var i = 0; i < readyFuncs.length; i++) {
                        if (readyFuncs[i].isSubview) {
                            return i;
                        }
                    }
                    return -1;
                }

                var ix;
                while ((ix = indexOfSubview()) != -1) {
                    readyFuncs.splice(ix, 1);
                }
            };

            this.bindReadyEvent = function(func) {
                if (isReady) {
                    func();
                } else {
                    readyFuncs.push(func);
                }
            };

            this.bindLoadingEvent = function(func) {
                loadingFunc = func;
                if (isLoading !== undefined) {
                    func(isLoading);
                }
            };

            this.loading = function(state) {
                isLoading = state;
                if (loadingFunc) {
                    loadingFunc(isLoading);
                }
            };
        }
    )
    .config(['$routeProvider',
        function(routeProvider) {
            routeProvider.subview = function(masterPagePath) {
                function parseParams(params) {
                    params.subviewUrl = params.templateUrl;
                    params.templateUrl = masterPagePath;
                }

                var result = {
                    when: function(path, params) {
                        parseParams(params);
                        routeProvider.when(path, params);
                        return result;
                    },
                    otherwise: function(params) {
                        parseParams(params);
                        routeProvider.otherwise(params);
                        return result;
                    }
                };

                return result;
            };
        }
    ])
    .directive('ngAwait', ['com.agilsun.Preparer',
        function(preparer) {
            return {
                priority: 0,
                restrict: 'A',
                link: function(scope) {
                    if (scope.initialize) {
                        preparer.bindReadyEvent(scope.initialize);
                    }
                }
            };
        }
    ])
    .directive('ngBusy', ['$rootScope', 'com.agilsun.Preparer',
        function(rootScope, preparer) {
            return {
                priority: 2,
                restrict: 'A',
                link: function(scope, element, attrs) {
                    preparer.bindLoadingEvent(function(isLoading) {
                        //console.log('NgBusy apply ' + isLoading);
                        var jtarget = $('#' + attrs.ngBusy);
                        if (isLoading) {
                            element.css('display', '');
                            jtarget.css('display', 'none');
                        } else {
                            element.css('display', 'none');
                            jtarget.css('display', '');
                        }
                    });
                }
            };
        }
    ])
    .directive('ngSubview', ['$route', '$compile', '$rootScope', 'com.agilsun.Preparer',
        function(route, compile, rootScope, preparer) {
            function applySubview(scope, element, attrs) {
                var current = route.current;
                var cls = '';
                var clazz = element.attr('class');
                if (clazz) {
                    cls = ' class="' + clazz + '"';
                }
                var url = current.subviewUrl + '?i=' + randomUUID();
                var newElm = angular.element('<div' + cls + ' ng-include="\'' + url + '\'"></div>');
                var rpel = compile(newElm)(scope);
                element.replaceWith(rpel);
                var commentEl = newElm[0];
                commentEl.textContent = ' ngSubview: ' + current.subviewUrl;
            }

            return {
                replace: true,
                scope: false,
                priority: 1,
                restrict: 'A',
                link: function(scope, element, attrs) {
                    var handler = function() {
                        //console.log('NgSubview apply');
                        applySubview(scope, element, attrs);
                    };
                    handler.isSubview = true;
                    preparer.bindReadyEvent(handler);
                    //console.log('Registered ng-subview');
                }
            };
        }
    ])
    .service('com.agilsun.InitService', ['$route', '$rootScope', '$location', 'com.agilsun.Preparer',
        function(route, rootScope, location, preparer) {
            function getRoute(url) {
                var routes = route.routes;

                for (var key in routes) {
                    var ro = routes[key];
                    if (ro.regexp && ro.regexp.exec(url)) {
                        return ro;
                    }
                }
                //No route matched; fallback to "otherwise" route
                return routes[null];
            }

            function onPanelReady(routeObj) {
                if (routeObj.panelClass) {
                    var newClas = ' ' + routeObj.panelClass;
                    if (newClas != rootScope.panelClass) {
                        rootScope.panelClass = newClas;
                    }
                } else {
                    rootScope.panelClass = undefined;
                }

                //Chuyen sang trang thai san sang
                //console.log('App prepared');
                preparer.ready();
            }

            this.init = function(app, redirectHandler) {
                //Define method ready for app
                app.ready = function(pageTitle, pageBackPath) {
                    rootScope.pageTitle = pageTitle;
                    rootScope.pageBackPath = pageBackPath;
                    preparer.loading(false);
                };

                //Define method busy for app
                app.busy = function() {
                    preparer.loading(true);
                };

                //Raise event onLocationChanging
                if (route.current) {
                    var firstPath = location.path();
                    redirectHandler(route.current, location);
                    if (firstPath == location.path()) {
                        onPanelReady(route.current);
                    }
                }

                //Handle location change start
                rootScope.$on('$locationChangeStart', function() {
                    var next = getRoute(location.path());
                    if (!next.redirectTo) {
                        redirectHandler(next, location);
                    }

                    //Fix bug close popup menu
                    $('div.modal-backdrop').remove();
                    $('body').removeClass('modal-open');

                    //Fix bug double apply subview
                    preparer.clearSubviewHandler();
                    //console.log('Clear subview handler');
                });

                rootScope.$on('$locationChangeSuccess', function() {
                    if (route.current && !route.current.redirectTo) {
                        onPanelReady(route.current);
                    }
                });
            };

            this.error = function(code, status) {
                var data;
                if (code) {
                    data = '/' + encodeURIComponent(code);
                } else {
                    data = '';
                }
                var url = '/error/' + status + data;
                location.path(url);
            };
        }
    ]);
