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
    .controller('HomeCtrl', function ($scope, $stateParams, Restangular, ENDPOINT, $http, $compile) {
        $scope.loading = true;
        $scope.todos = Restangular.all('todo').getList().$object;

        $scope.dtOptions = {
            ajax: function(data, callback, settings) {
                $http.post(ENDPOINT.url + '/todo-dt', data).then(function(resp) {
                    callback(
                        {
                            recordsTotal: resp.data.recordsTotal,
                            recordsFiltered: resp.data.recordsFiltered,
                            data: resp.data.data.map(function (i) {
                                return i;
                            })
                        }
                    );
                });
            },
            sAjaxDataProp: 'data',
            processing: true,
            serverSide: true,
            pagingType: 'full_numbers',
            pageLength: 10,
            searchDelay: 600,
            order: [ [0, "desc"] ],
            createdRow: function(row, data, dataIndex) {
                $compile(angular.element(row).contents())($scope);
            }
        };

        $scope.dtColumns = [
            {
                data: "created_at",
                name: "created_at",
                title: 'Time',
                render: function(data) {
                    var dt = moment(data).local();
                    if(moment().diff(dt, 'months') > 6) {
                        return dt.format('MM/DD/YY hh:mm A');
                    }
                    return dt.format("MM/DD hh:mm A");
                }
            },
            {
                data: "email",
                name: "email",
                title: 'Email'
            },
            {
                data: "id",
                name: "id",
                title: 'ID',
                render: function(data) {
                    return '<div tooltip-append-to-body="false" tooltip-trigger="outsideClick" uib-tooltip="' + data + '">' + (data ? data : '') + '</div>';
                }
            }
        ];
    });