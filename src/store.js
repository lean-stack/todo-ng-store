(function() {
  'use strict';

  var app = angular.module('leanTodoStore',[]);

  function TodoStore() {

    if( typeof localStorage.todos === 'undefined' ) {
      localStorage.todos = JSON.stringify([]);
      localStorage.maxId = 0;
    }
  }

  TodoStore.prototype.getAll = function() {
    return JSON.parse(localStorage.todos);
  };

  TodoStore.prototype.create = function(txt) {
    var todo = {
      txt: txt,
      completed: false,
      id: JSON.parse(localStorage.maxId) + 1
    }
    var todos = this.getAll();
    todos.push(todo);
    localStorage.todos = JSON.stringify(todos);
    localStorage.maxId = todo.id;
    return todo;
  };

  TodoStore.prototype.update = function(todo) {
    // ES6: Array.find
    var todos = this.getAll();
    var ix = indexOf(todos,todo);
    if( ix !== -1 ) {
      todos[ix] = todo;
      localStorage.todos = JSON.stringify(todos);
      return true;
    } else {
      return false;
    }

  };

  TodoStore.prototype.delete = function(todo) {
    // Lodash: _.remove
    var todos = this.getAll();
    var ix = indexOf(todos,todo);
    if( ix !== -1 ) {
      todos.splice(ix,1);
      localStorage.todos = JSON.stringify(todos);
      return true;
    } else {
      return false;
    }
  };

  function indexOf(array, predicate) {
      var ix = -1;
      for (var i = 0; i < array.length; i++) {
        predicate(array[i]) && ix = i;
      }
      return ix;
  }

  app.factory('todoStore', function() {
    return new TodoStore();
  });

}());
