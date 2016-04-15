describe("The sync TodoStore", function() {

  beforeEach(module('leanTodoStore'));

  var store;

  beforeEach(inject(function(_todoStoreAsync_) { store = _todoStoreAsync_; }));
  afterEach(delete localStorage.todos);

  it("getAll-Method should return an array", function(done) {
    store.getAll(function(data) {
      expect(Array.isArray(data)).toBe(true);
      done();
    });
  });

  it("should have initially zero items", function(done) {
    store.getAll(function(data) {
      expect(data.length).toBe(0);
      done();
    });
  });

  // it("should create new todos", function() {
  //   store.create('TODO', function(t) {
  //     expect(t.txt).toBe('TODO');
  //   });
  // });

});
