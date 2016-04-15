(function() {
  'use strict';

  var app = angular.module('leanTodoStore');

  var baseUrl = 'http://localhost:9000/api';

  function TodoStore($http,$q) {
    this.$http = $http;
    this.$q = $q;
  }

  TodoStore.prototype.getAll = function() {
    var self = this;
    return this.$q(function(resolve,reject){
      self.$http.get(baseUrl).then(function(response) {
        resolve(response.data);
      });
    });

  };

  TodoStore.prototype.create = function(txt,cb) {
    var deferred = this.$q.defer();

    var todo = {
      txt: txt,
      completed: false
    }
    this.$http.post(baseUrl,todo).then(function(response) {
      deferred.resolve(response.data[0]);
    });

    return deferred.promise;
  };

  TodoStore.prototype.update = function(todo) {
    var deferred = this.$q.defer();

    this.$http.put(baseUrl + '/' + todo._id, todo).then(function(response){
      var msg = response.data.msg;
      if( msg === 'success') {
        deferred.resolve(true);
      } else {
        deferred.reject('Todo not found');
      }
    });

    return deferred.promise;
  };

  TodoStore.prototype.delete = function(todo) {
    var deferred = this.$q.defer();

    this.$http.delete(baseUrl + '/' + todo._id).then(function(response){
      var msg = response.data.msg;
      if( msg === 'success') {
        deferred.resolve(true);
      } else {
        deferred.reject('Todo not found');
      }
    });

    return deferred.promise;
  };

  app.provider('todoStorePromise', function() {

    this.setBaseUrl = function(url) {
      baseUrl = url;
    }

    this.$get = ['$http','$q', function($http,$q) {
      var store = new TodoStore($http,$q);
      return store
    }];

  });

}());
