var TodoList = /** @class */ (function () {
    // Get the list and its children
    function TodoList() {
        var _this = this;
        this.todosArray = [];
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
                        _this.handleClickOnItem(i + 1);
                    });
                };
                for (var i = 0; i < liElements.length; i++) {
                    _loop_1(i);
                }
                ;
            }
        };
        //Handle the add task button clikc event
        this.addButtonHandler = function () {
            if (_this.button) {
                _this.button.addEventListener('click', function (event) {
                    event.preventDefault();
                    _this.addToList(_this.input.value);
                });
            }
        };
        // add task from input to todosArray array
        this.addToList = function (message) {
            if (_this.input.value.trim().length === 0) {
                return;
            }
            _this.result = '';
            //console.log(`this a ${message}`);
            _this.todosArray.push({
                id: _this.todosArray.length + 1,
                task: message,
                completed: false,
            });
            //reset field after adding to list
            _this.input.value = '';
            console.table(_this.todosArray);
            _this.disPlayHandlerTrigger();
        };
        this.disPlayHandlerTrigger = function () {
            //reset field
            var taskArea = document.querySelector('#listdiv');
            if (taskArea) {
                taskArea.innerHTML = "";
            }
            console.log('disPlayHandlerTrigger');
            var item = "";
            _this.todosArray.forEach(function (el) {
                if (el.completed === false) {
                    item = "<li> <input type=\"checkbox\"  id=\"".concat(el.id, "\" > ").concat(el.task, " </li> ");
                }
                else {
                    item = "<li> <input type=\"checkbox\" checked id=\"".concat(el.id, "\" > ").concat(el.task, " </li> ");
                }
                _this.result += (item);
            });
            if (taskArea) {
                taskArea.innerHTML = _TodoList.result;
            }
            _this.addEventHandler();
            _this.addStyleChange();
        };
        console.log('App is initialized');
        //initial setup
        this.addButtonHandler();
    }
    TodoList.prototype.addStyleChange = function () {
        console.log('style is called');
        // Select all <li> elements
        var liElements = document.querySelectorAll("li");
        // Iterate through each <li> element
        liElements.forEach(function (liElement) {
            // Find the checkbox within the current <li> element
            var checkbox = liElement.querySelector("input[type='checkbox']");
            // Check if the checkbox is checked
            if (checkbox && checkbox.checked) {
                // Checkbox is checked
                liElement.style.textDecoration = 'line-through';
            }
            else if (checkbox && !checkbox.checked) {
                liElement.style.textDecoration = 'none';
            }
        });
    };
    TodoList.prototype.handleClickOnItem = function ($id) {
        var checkboxInstance = document.getElementById("".concat($id));
        console.log(checkboxInstance);
        checkboxInstance.checked = !checkboxInstance.checked;
        var itemObject = this.todosArray.find(function (el) { return el.id === $id; });
        if (itemObject) {
            itemObject.completed = !itemObject.completed;
        }
        this.addStyleChange();
    };
    TodoList.prototype.chekcTheItem = function (id) {
        /*
             let todo = this.todosArray.find((todo) => todo.id === id);
            console.log(todo);
         
          if(todo){
               todo.completed = !todo.completed;
             }
            
             this.disPlayHandlerTrigger();
        */
    };
    return TodoList;
}());
//main function
var _TodoList = new TodoList();
// var all:string = '';
//  const displayTask = (tab:Todo[]):void => {
//   tab.forEach(element => {
//     all.concat(element.task);
//   });
//   console.log('all',all);
//  }
