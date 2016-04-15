describe("The sync TodoStore", function() {

  beforeEach(module('leanTodoStore'));

  var store;

  beforeEach(inject(function(_todoStore_) { store = _todoStore_; }));

  it("getAll-Method should return an array", function() {
    expect(Array.isArray(store.getAll())).toBe(true);
  });

  it("should have initially zero items", function() {
    expect(store.getAll().length).toBe(0);
  });

  it("should create new todos", function() {
    var t = store.create('TODO');
    expect(t.txt).toBe('TODO');
    expect(store.getAll().length).toBe(1);
  });

  it("should delete todos", function() {
    var t = store.create('TODO');
    store.delete(t);
    expect(store.getAll().length).toBe(1);
  });

});
