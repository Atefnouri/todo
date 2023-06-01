var TodoList = /** @class */ (function () {
    function TodoList() {
        var _this = this;
        this.result = "";
        this.addToList = function (message) {
            _this.result = '';
            console.log("this a ".concat(message));
            _this.todos.push({
                id: _this.todos.length + 1,
                task: message,
                completed: false,
            });
            console.table(_this.todos);
            _this.disPlayHandler();
        };
        this.disPlayHandler = function () {
            console.log('disPlayHandler');
            _this.todos.forEach(function (el) {
                var item = "<li>".concat(el.task, "</li> \n");
                _this.result += (item);
            });
            console.log('result', _this.result);
            var taskArea = document.querySelector('#listdiv');
            if (taskArea) {
                taskArea.innerHTML = _TodoList.result;
            }
        };
        this.todos = [];
        console.log('App is running ');
    }
    return TodoList;
}());
//main function
var _TodoList = new TodoList();
var button = document.querySelector('#addButton');
var input = document.querySelector('#task');
var all = '';
var displayTask = function (tab) {
    tab.forEach(function (element) {
        all.concat(element.task);
    });
    console.log('all', all);
};
if (button) {
    button.addEventListener('click', function (event) {
        event.preventDefault();
        _TodoList.addToList(input.value);
    });
}
