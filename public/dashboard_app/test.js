angular.module('dashboard')
    .config(function ($stateProvider) {
        $stateProvider.state('test', {
            url: '/test',
            templateUrl: 'dashboard_app/test.html',
            controller: 'TestCtrl',
            resolve: {
                // todos: function($stateParams, TodoService) {
                //     return TodoService.all();
                // }
            }
        });
    })
    .controller('TestCtrl', function ($scope, $stateParams, Restangular, ENDPOINT, $http, $compile) {

    });