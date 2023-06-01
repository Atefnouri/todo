var TodoList = /** @class */ (function () {
    function TodoList() {
        this.addToList = function (message) {
            console.log("this a ".concat(message));
        };
        this.todos = [];
        alert("test");
    }
    return TodoList;
}());
var _TodoList = new TodoList();
