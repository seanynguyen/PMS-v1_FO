importCss({
    libs: [
        'bootstrap.min.css',
        'bootstrap-theme.min.css',
        'alertify.core.css',
        'alertify.bootstrap.css',
        'font-awesome.css',
        'owl.carousel.css',
        'owl.transitions.css',
        /*        'summernote.css',
                'summernote-bs3.css',*/
        'bootstrap-responsive.min.css'
    ],
    customs: [
        // teamplate will use
        'pages/dashboard.css',
        'pages/faq.css',
        'pages/plans.css',
        'pages/reports.css',
        'pages/fullcalendar.css',
        'product.css',
        'style.css'
    ]
});

importJs({
    libs: [
        //Jquery
        'lib/jquery/jquery-1.11.1.min.js',
        'lib/jquery/jquery-ui.min.js',
        'lib/jquery/jquery-migrate-1.2.1.min.js',
        'lib/jquery/jquery.browser.min.js',

        //Bootstrap
        'lib/bootstrap/bootstrap.min.js',

        //Summernote Editor
        'lib/summernote.min.js',

        //Angularjs
        'lib/angular/angular.min.js',
        'lib/angular/angular-animate.min.js',
        'lib/angular/angular-cookies.min.js',
        'lib/angular/angular-route.min.js',
        'lib/angular/angular-resource.min.js',
        'lib/angular/angular-local-storage.min.js',
        'lib/angular/angular-ui-bootstrap-0.10.0.min.js',
        'lib/angular/angular-strap.min.js',
        'lib/angular/angular-strap.tpl.min.js',
        'lib/angular/angular-summernote.min.js',
        'lib/angular/angular-ui.min.js',
        //Alertify
        'lib/alertify.min.js',
        'lib/commonjs.js',
        'lib/date.js',
        '../zeroclip/ZeroClipboard.min.js',
        'lib/base.js',
        'lib/chart.min.js',
        'lib/excanvas.min.js',
        'lib/faq.js',
        //Calendar
        'lib/fullcalendar.min.js'



        // template will use

    ],
    application: [
        //Custom alert
        'app/module/angular-subview.js',
        'app/module/angular-file-reader.js',
        'app/app.js',
        'app/module/app-http-provider.js',
        'app/module/app-run.js',
        'app/module/app-route-config.js',

        //Directive
        'app/directive/context-menu-directive.js',
        'app/directive/filestyle-directive.js',
        'app/directive/schange-directive.js',

        //Factory
        'app/factory/product-factory.js',
        'app/factory/category-factory.js',
        'app/factory/account-factory.js',

        //Service
        'app/service/account-service.js',
        'app/service/localdata-service.js',
        'app/service/alert-service.js',
        'app/service/resource-service.js',

        //Controller
        'app/controller/category-controller.js',
        'app/controller/products-controller.js',
        'app/controller/product-controller.js'

    ]
});
