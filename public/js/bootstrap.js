/**
 * bootstraps angular onto the window.document node
 */
define([
    'require',
    'angular',
    'angular-ui-router',
    'oclazyload',
    'fileUpload',
    'd3',
    'angularCharts',
    'uibootstrap'
], function (require, angular) {

    'use strict';
     require(['application'], function (app) {
         //angular.bootstrap(document, ['app']);
         //angular.bootstrap(document,['application']);
         app.bootstrap();
     });

     // Angular Bootstrap
// require(['app', 'services', 'controllers'], function (app) {
//   // initialisation code defined within app.js
//   app.init();
// });
});
