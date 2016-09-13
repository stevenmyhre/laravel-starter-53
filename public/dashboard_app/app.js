'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('dashboard', [
    'ui.router',
    // 'ngSanitize',
    // 'ngAnimate',
    //'ngCookies',
    // 'angularMoment',
    //'ui.bootstrap',
    //'ui.mask',
    'angular-jwt.jwt',
    //'infinite-scroll',
    // 'datatables',
    //'ngFileUpload',
    //'ui.select',
    //'angular-growl',
    'restangular',

    // 'globalErrors',

    'app.templates',
    'app.services',

])
    .constant('ENDPOINT', {
        url: '/api', // user relative url for the web app
        base: ''
    })
    .constant('ENDPOINT_DEFAULTS', {
        url: '/api',
        resource_url: '/resource'
    })
    .config(function($httpProvider, $stateProvider, $urlRouterProvider, RestangularProvider,
                     $urlMatcherFactoryProvider, $logProvider, $animateProvider) {
        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
        if(!window.jwt_token) {
            alert("Not authenticated");
        } else {
            $httpProvider.defaults.headers.common["Authorization"] = "Bearer " + window.jwt_token;
        }

        $urlRouterProvider.otherwise("/");
        $urlMatcherFactoryProvider.strictMode(false);

        $logProvider.debugEnabled(true);

        $animateProvider.classNameFilter(/(animate)|(growl)/);

        RestangularProvider.setBaseUrl('/api');
        RestangularProvider.setRestangularizePromiseInterceptor(function(promise) {
            promise.$object.$isLoading = true;
            promise.finally(function() {
                delete promise.$object.$isLoading;
            });
        });
    })
    .constant('angularMomentConfig', {
        //preprocess: 'utc',
        statefulFilters: false
    })
    .run(function($rootScope, $state, $stateParams, $timeout, jwtHelper) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.autoScroll = true;

        if(window.jwt_token) {
            // var data = jwtHelper.decodeToken(window.jwt_token);
            // if(data) {
            //     $rootScope.userId = parseInt(data.sub);
            // }
        }

        $rootScope.$on('$stateChangeError',
            function(event, toState, toParams, fromState, fromParams, error){ console.error(error); });
    })

angular.module('app.templates', []);
angular.module('app.services', []);
