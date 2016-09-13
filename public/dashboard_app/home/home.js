angular.module('dashboard')
    .config(function ($stateProvider) {
        $stateProvider.state('home', {
            url: '/',
            templateUrl: 'dashboard_app/home/home.html',
            controller: 'HomeCtrl',
            resolve: {
                // todos: function($stateParams, TodoService) {
                //     return TodoService.all();
                // }
            }
        });
    })
    .controller('HomeCtrl', function ($scope, $stateParams, Restangular) {
        $scope.loading = true;
        $scope.todos = Restangular.all('todo').getList().$object;
    });