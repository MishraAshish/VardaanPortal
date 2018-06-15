define(function () {

    var app = angular.module('mainModule', ['ui.router','oc.lazyLoad','ngFileUpload']);//todo remove "ngfileuplod if not used"

    app.config(['$ocLazyLoadProvider','$stateProvider', '$urlRouterProvider','$locationProvider',
        function ($ocLazyLoadProvider,$stateProvider, $urlRouterProvider, $locationProvider) {

            $ocLazyLoadProvider.config({
                loadedModules: ['mainModule'],
                asyncLoader: require
            });

            $locationProvider.html5Mode(true);

            $stateProvider
                .state('home', { url: '/home', templateUrl: 'home.html' })
                .state('cPCreateuser', {
                    url: '/createuser',
                    templateUrl: '/js/createPatient/createuserView.html',
                    controller: 'cPCreateuserController',
                    resolve: {
                        load: function($ocLazyLoad) {
                            return $ocLazyLoad.load ({
                                name: 'cPCreateuser',
                                files: ['js/createPatient/createuserModule.js']
                            });
                        }
                    }
                })
                .state('todaysPatient', {
                    url: '/todaysPatient',
                    templateUrl: '/js/createReports/todaysPatientView.html',
                    controller: 'todaysPatientController',
                    resolve: {
                        load: function($ocLazyLoad) {
                            return $ocLazyLoad.load ({
                                name: 'todaysPatient',
                                files: ['js/createReports/todaysPatientModule.js']
                            });
                        }
                    }
                })
                .state('cPCreateDoctorProfile', {
                    url: '/cPCreateDoctorProfile',
                    templateUrl: '/js/createPatient/cPCreateDoctorProfileView.html',
                    controller: 'cPCreateDoctorProfileController',
                    resolve: {
                        load: function($ocLazyLoad) {
                            return $ocLazyLoad.load ({
                                name: 'cPCreateDoctorProfile',
                                files: ['js/createPatient/cPCreateDoctorProfileModule.js']
                            });
                        }
                    }
                })
                .state('cECheifComplaints', {
                    url: '/chiefComplaints',
                    templateUrl: '/js/createEntities/cECheifComplaintsView.html',
                    controller: 'cECheifComplaintsController',
                    resolve: {
                        load: function($ocLazyLoad) {
                            return $ocLazyLoad.load ({
                                name: 'cECheifComplaints',
                                files: ['js/createEntities/cECheifComplaintsModule.js']
                            });
                        }
                    }
                })
                .state('cEDiagnosis', {
                    url: '/createDiagnosis',
                    templateUrl: '/js/createEntities/cEDiagnosisView.html',
                    controller: 'cEDiagnosisController',
                    resolve: {
                        load: function($ocLazyLoad) {
                            return $ocLazyLoad.load ({
                                name: 'cEDiagnosis',
                                files: ['js/createEntities/cEDiagnosisModule.js']
                            });
                        }
                    }
                })
                .state('cETreatments', {
                    url: '/createTreatments',
                    templateUrl: '/js/createEntities/cETreatmentsView.html',
                    controller: 'cETreatmentsController',
                    resolve: {
                        load: function($ocLazyLoad) {
                            return $ocLazyLoad.load ({
                                name: 'cETreatments',
                                files: ['js/createEntities/cETreatmentsModule.js']
                            });
                        }
                    }
                })
                .state('cEOccupation', {
                    url: '/createOccupation',
                    templateUrl: '/js/createEntities/cEOccupationView.html',
                    controller: 'cEOccupationController',
                    resolve: {
                        load: function($ocLazyLoad) {
                            return $ocLazyLoad.load ({
                                name: 'cEOccupation',
                                files: ['js/createEntities/cEOccupationModule.js']
                            });
                        }
                    }
                })
                .state('cELocation', {
                    url: '/createUserLocation',
                    templateUrl: '/js/createEntities/cEUserLocationView.html',
                    controller: 'cELocationController',
                    resolve: {
                        load: function($ocLazyLoad) {
                            return $ocLazyLoad.load ({
                                name: 'createUserLocation',
                                files: ['js/createEntities/cEUserLocationModule.js']
                            });
                        }
                    }
                })
                .state('cECenter', {
                    url: '/createCenter',
                    templateUrl: '/js/createEntities/cECenterView.html',
                    controller: 'cECenterController',
                    resolve: {
                        load: function($ocLazyLoad) {
                            return $ocLazyLoad.load ({
                                name: 'createCenter',
                                files: ['js/createEntities/cECenterModule.js']
                            });
                        }
                    }
                })
                .state('cEDoctor', {
                    url: '/createDoctor',
                    templateUrl: '/js/createEntities/cEDoctorView.html',
                    controller: 'cEDoctorController',
                    resolve: {
                        load: function($ocLazyLoad) {
                            return $ocLazyLoad.load ({
                                name: 'createDoctor',
                                files: ['js/createEntities/cEDoctorModule.js']
                            });
                        }
                    }
                })
                .state('cERefer', {
                    url: '/createReferences',
                    templateUrl: '/js/createEntities/cEReferView.html',
                    controller: 'cEReferController',
                    resolve: {
                        load: function($ocLazyLoad) {
                            return $ocLazyLoad.load ({
                                name: 'createReferences',
                                files: ['js/createEntities/cEReferModule.js']
                            });
                        }
                    }
                })
                .state('cEFee', {
                    url: '/createExpenses',
                    templateUrl: '/js/createEntities/cEFeeView.html',
                    controller: 'cEFeeController',
                    resolve: {
                        load: function($ocLazyLoad) {
                            return $ocLazyLoad.load ({
                                name: 'createExpenses',
                                files: ['js/createEntities/cEFeeModule.js']
                            });
                        }
                    }
                })
                .state('createrefer', {
                    url: '/createrefer',
                    templateUrl: '/js/createrefer/createreferView.html',
                    controller: 'createreferController',
                    resolve: {
                        load: function($ocLazyLoad) {
                            return $ocLazyLoad.load ({
                                name: 'createrefer',
                                files: ['js/createrefer/createreferModule.js']
                            });
                        }
                    }
                })
                .state('createoccupation', {
                    url: '/createoccupation',
                    templateUrl: '/js/createrefer/createreferView.html',
                    controller: 'createoccupationController',
                    resolve: {
                        load: function($ocLazyLoad) {
                            return $ocLazyLoad.load ({
                                name: 'createrefer',
                                files: ['js/createrefer/createoccupationModule.js']
                            });
                        }
                    }
                })
                .state('submitFee', {
                    url: '/submitFee',
                    templateUrl: '/js/createAccount/submitFeeView.html',
                    controller: 'submitFeeController',
                    resolve: {
                        load: function($ocLazyLoad) {
                            return $ocLazyLoad.load ({
                                name: 'submitFee',
                                files: ['js/createAccount/submitFeeModule.js']
                            });
                        }
                    }
                })
                .state('submitExpenses', {
                    url: '/submitExpenses',
                    templateUrl: '/js/createExpenses/submitExpensesView.html',
                    controller: 'submitExpensesController',
                    resolve: {
                        load: function($ocLazyLoad) {
                            return $ocLazyLoad.load ({
                                name: 'submitExpenses',
                                files: ['js/createExpenses/submitExpensesModule.js']
                            });
                        }
                    }
                })
                .state('createExpenseType', {
                    url: '/createExpenseType',
                    templateUrl: '/js/createExpenses/createExpenseTypeView.html',
                    controller: 'createExpenseTypeController',
                    resolve: {
                        load: function($ocLazyLoad) {
                            return $ocLazyLoad.load ({
                                name: 'createExpenseType',
                                files: ['js/createExpenses/createExpenseTypeModule.js']
                            });
                        }
                    }
                })
                .state('viewReports', {
                    url: '/viewReports',
                    templateUrl: '/js/createReports/createreportsView.html',
                    controller: 'createreportsController',
                    resolve: {
                        load: function($ocLazyLoad) {
                            return $ocLazyLoad.load ({
                                name: 'viewReports',
                                files: ['js/createReports/createreportsModule.js']
                            });
                        }
                    }
                });

              $urlRouterProvider.otherwise('/home');
        }]);

    app.bootstrap = function () {
        angular.bootstrap(document, ['mainModule']);
    };

    return app;
});
