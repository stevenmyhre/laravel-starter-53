angular.module('app.services')
    .factory('TodoService', function($http, ENDPOINT) {
        var TodoService = {};

        TodoService.all = function() {
            return $http.get(ENDPOINT.url + '/todo')
                .then(function(resp) {
                    return resp.data;
                });
        };

        TodoService.save = function(model) {
            return $http.post(ENDPOINT.url + '/todo', {
                model: model
            })
                .then(function(resp) {
                    return resp.data;
                });
        };

        return TodoService;
    });