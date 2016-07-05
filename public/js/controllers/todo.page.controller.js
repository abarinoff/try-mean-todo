angular.module("todo.controllers").controller("todoPageController", ["$scope", "todoModel",
    function ($scope, todoModel) {

        $scope.getTodos = function() {
            todoModel.query({}, function (todos) {
                console.log(todos);
                $scope.todos = todos;
            });
        };

        $scope.createTodo = function() {
            console.log("Creating todo: ", $scope.text);

            todoModel.save({text: $scope.text}, function(todos) {
                $scope.text = "";
                $scope.todos = todos;
            });
        };

        $scope.deleteTodo = function(id) {
            console.log("deleting:", id);
            todoModel.delete({id: id}, function(todos) {
                $scope.todos = todos;
            });
        }
    }
]);
