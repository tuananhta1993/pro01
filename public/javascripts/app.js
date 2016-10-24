'use strict';
// Declare app level module which depends on filters, and services
angular.module('restApp', ['ngAnimate', 'ui.bootstrap', 'toastr']);

angular.module('restApp')
    .controller('mainController', function($scope, $http, $uibModal, toastr) {
        $scope.tasks = [];
        $scope.newTask = "";

        $http({
            method: 'GET',
            url: '/api/tasks'
        }).then(function(tasks) {
            $scope.tasks = tasks.data;
        }, function(err) {
            console.error(err);
        });

        $scope.add = function() {
            if($scope.newTask.length == 0) {
                return toastr.error('Can not be null task!!!!');
            }

            var index = $scope.tasks.findIndex(function(task) {
                return task.title == $scope.newTask;
            });

            if (index >= 0) {
                return toastr.error('Can not duplicate title! Please choose another')
            }

            $http({
                method: 'POST',
                url: '/api/tasks',
                data: {
                    title: $scope.newTask
                }
            }).then(function(res) {
                console.log(res.data);
                $scope.tasks.push({
                    title: $scope.newTask
                });
                $scope.newTask = "";
            }, function(err) {
                console.error(err);
            });
        };

        $scope.edit = function(title) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title-top',
                ariaDescribedBy: 'modal-body-top',
                templateUrl: 'editTask.html',
                resolve: {
                    titleToEdit: function() {
                        return angular.copy(title);
                    },
                    tasks : function() {
                        return angular.copy($scope.tasks)
                    }
                },
                size: 'md',
                controller: 'taskEditController'
            });

            modalInstance.result.then(
                function (result) {
                    var index = $scope.tasks.findIndex(function(task) {
                        return task.title == result.oldTitle;
                    });

                    $scope.tasks[index].title = result.newTitle;
                }, function (err) {
                    if(angular.isString(err)) {
                        return toastr.error(err);
                    }
                    console.error(err);
                });
        }

        $scope.remove = function(title) {
            $http({
                method: 'POST',
                url: '/api/task/delete',
                data: {
                    title: title
                }
            }).then(function(res) {
                console.log(res.data);
                var index = $scope.tasks.findIndex(function(task) {
                    return task.title == title;
                });
                $scope.tasks.splice(index, 1);
            }, function(err) {
                console.error(err);
            });
        };
    })
    .controller('taskEditController', function($scope, $http, $uibModalInstance, titleToEdit, tasks) {
        $scope.titleToEdit = titleToEdit;

        $scope.edit = function () {
            var index = tasks.findIndex(function(task) {
                return task.title == $scope.titleToEdit;
            });

            if(index < 0) {
                $http({
                    method: 'POST',
                    url: '/api/task/edit',
                    data: {
                        oldTitle: titleToEdit,
                        newTitle: $scope.titleToEdit
                    }
                }).then(function(res) {
                    $uibModalInstance.close({
                        oldTitle: titleToEdit,
                        newTitle: $scope.titleToEdit
                    });
                }, function (err) {
                    $uibModalInstance.dismiss(err);
                });
            } else {
                $uibModalInstance.dismiss('duplicate title! Check again!');
            }
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss();
        }
    });
