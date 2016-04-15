(function() {
  'use strict';

  var app = angular.module('leanTodoStore');

  function TodoStore() {

    if( typeof localStorage.todos === 'undefined' ) {
      localStorage.todos = JSON.stringify([]);
      localStorage.maxId = 0;
    }
  }

  TodoStore.prototype.getAll = function(cb) {
    cb(JSON.parse(localStorage.todos));
  };

  TodoStore.prototype.create = function(txt,cb) {
    var todo = {
      txt: txt,
      completed: false,
      id: JSON.parse(localStorage.maxId) + 1
    }
    var todos = JSON.parse(localStorage.todos);
    todos.push(todo);
    localStorage.todos = JSON.stringify(todos);
    localStorage.maxId = todo.id;
    cb(todo);
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

  app.factory('todoStoreAsync', function() {
    return new TodoStore();
  });

}());
