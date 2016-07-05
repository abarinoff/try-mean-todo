angular.module('todo.models').factory('todoModel', ['$resource',
    function ($resource) {
        return $resource('/api/todos/:id', {}, {
            'query': {method: 'GET', isArray: true},
            'save': {method: 'POST', isArray: true},
            'delete': {method: 'DELETE', isArray: true}
        });
    }
]);
