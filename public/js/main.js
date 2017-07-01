require.config({
// alias libraries paths
    //baseUrl: '',
    paths: {
        //'domReady': '../lib/domReady/domReady',
        'jquery': '../lib/jquery/dist/jquery',
        'angular': '../lib/angular/angular',
        'angular-ui-router': '../lib/angular-ui-router/release/angular-ui-router',
        'oclazyload': '../lib/oclazyload/dist/oclazyload',
        'fileUpload': '../lib/ng-file-upload/ng-file-upload.min',
        'd3': '../lib/d3/d3',
        'angularCharts':'../lib/angular-charts/dist/angular-charts',
        'uibootstrap':'../lib/angular-bootstrap/ui-bootstrap-tpls.min'
        // Load Module
        //'coreModule': '../js/modules/core/coreModule',
        //'testModule': '../js/modules/testModule/testModule'
    },

    // angular does not support AMD out of the box, put it in a shim
    shim: {
        // 'angular':{
        //   deps:['jquery']
        // },
        'angular-ui-router':{
            deps:['angular']
        },
        'oclazyload': {
            deps: ['angular']
        },
        'fileUpload':{
          deps: ['angular']
        },
        'angularCharts':{
          deps: ['d3','angular']
        },
        'uibootstrap':{
          deps: ['angular']
        }
        // 'coreModule': {
        //     deps: ['angular-route', 'testModule']
        // }
        // 'angular':{
        //    exports:['angular']
        // },
    },

    // kick start application
    deps: ['./js/bootstrap.js']
});

//bootstrap everything in angular

// require(['coreModule'], function () {
      //angular.bootstrap(document, ['app']);
// });

// require(['application'], function (app) {
//      app.bootstrap();
// });
