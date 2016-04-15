(function() {
  'use strict';

  var app = angular.module('leanTodoStore');

  var baseUrl = 'http://localhost:9000/api';

  function TodoStore($http) {
    this.$http = $http;
  }

  TodoStore.prototype.getAll = function(cb) {
    this.$http.get(baseUrl).then(function(response) {
      cb(response.data);
    });
  };

  TodoStore.prototype.create = function(txt,cb) {
    var todo = {
      txt: txt,
      completed: false
    }
    this.$http.post(baseUrl,todo).then(function(response) {
      cb(response.data[0]);
    });
  };

  TodoStore.prototype.update = function(todo,cb) {
    // ES6: Array.find
    var todos = JSON.parse(localStorage.todos);
    var ix = indexOf(todos,function(t) { return todo.id === t.id; });
    if( ix !== -1 ) {
      todos[ix] = todo;
      localStorage.todos = JSON.stringify(todos);
      cb(true);
    } else {
      cb(false);
    }

  };

  TodoStore.prototype.delete = function(todo,cb) {
    // Lodash: _.remove
    var todos = JSON.parse(localStorage.todos);
    var ix = indexOf(todos,function(t) { return todo.id === t.id; });
    if( ix !== -1 ) {
      todos.splice(ix,1);
      localStorage.todos = JSON.stringify(todos);
      cb(true);
    } else {
      cb(false);
    }
  };

  function indexOf(array, predicate) {
      for (var i = 0; i < array.length; i++) {
        if( predicate(array[i]) )
        {
          return i;
        }
      }
      return -1;
  }

  app.factory('todoStoreAjax', ['$http', function($http) {
    return new TodoStore($http);
  }]);

}());
