var TodoList = /** @class */ (function () {
    // Get the list and its children
    function TodoList() {
        var _this = this;
        this.result = "";
        this.input = document.querySelector('#task');
        this.button = document.querySelector('#addButton');
        this.addEventHandler = function () {
            var myList = document.getElementById("listdiv");
            var liElements = myList === null || myList === void 0 ? void 0 : myList.getElementsByTagName("li");
            if (liElements) {
                var _loop_1 = function (i) {
                    liElements[i].addEventListener("click", function () {
                        console.log("Clicked on item ".concat(i + 1));
                    });
                };
                for (var i = 0; i < liElements.length; i++) {
                    _loop_1(i);
                }
                ;
            }
        };
        this.initInput = function () {
            if (_this.button) {
                _this.button.addEventListener('click', function (event) {
                    event.preventDefault();
                    _TodoList.addToList(_this.input.value);
                });
            }
        };
        this.addToList = function (message) {
            if (_this.input.value.trim().length === 0) {
                return;
            }
            _this.result = '';
            //console.log(`this a ${message}`);
            _this.todos.push({
                id: _this.todos.length + 1,
                task: message,
                completed: false,
            });
            _this.input.value = '';
            //console.table(this.todos); 
            _this.disPlayHandler();
        };
        this.disPlayHandler = function () {
            console.log('disPlayHandler');
            _this.todos.forEach(function (el) {
                var item = "\n        <li> <input type=\"checkbox\" id=\"".concat(el.id, "\" > ").concat(el.task, " </li>\n        ");
                _this.result += (item);
            });
            console.log('result', _this.result);
            var taskArea = document.querySelector('#listdiv');
            if (taskArea) {
                taskArea.innerHTML = _TodoList.result;
            }
            _this.addEventHandler();
        };
        console.log('App is initialized');
        //initial setup
        this.todos = [];
        this.initInput();
    }
    return TodoList;
}());
//main function
var _TodoList = new TodoList();
var all = '';
var displayTask = function (tab) {
    tab.forEach(function (element) {
        all.concat(element.task);
    });
    console.log('all', all);
};
