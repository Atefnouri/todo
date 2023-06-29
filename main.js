var TodoList = /** @class */ (function () {
    function TodoList() {
        var _this = this;
        // Displays the completed Todo items in a separate area.
        this.completedDisplayHandler = function () {
            //reset field
            var completedArea = document.querySelector('#completedList');
            if (completedArea) {
                completedArea.innerHTML = "";
            }
            _this.CompletedTodosArray.forEach(function (item) {
                var li = document.createElement('li');
                li.textContent = item.task;
                li.style.color = 'gray';
                li.style.textDecoration = 'line-through';
                //add to the main area
                completedArea === null || completedArea === void 0 ? void 0 : completedArea.appendChild(li);
            });
        };
        //Sets up event listeners for each Todo item in the list.
        //   addEventHandler =  ( ) => {
        //    const myList = document.getElementById("listdiv");
        //    const liElements = myList?.getElementsByTagName("li");
        //     if(liElements){
        //       for (let i = 0; i < liElements.length; i++) {
        //         liElements[i].addEventListener("click", () => {
        //           console.log(`Clicked on item ${i+1}`);
        //           this.handleClickOnItem(i+1);
        //         })};
        //     }
        // }
        this.addEventHandler = function () {
            var myList = document.getElementById("listdiv");
            var liElements = myList === null || myList === void 0 ? void 0 : myList.getElementsByTagName("li");
            if (liElements) {
                var _loop_1 = function (i) {
                    var li = liElements[i];
                    var id = li.getAttribute("id");
                    li.addEventListener("click", function () {
                        console.log("Clicked on item ".concat(id));
                        _this.handleClickOnItem(Number(id));
                    });
                };
                for (var i = 0; i < liElements.length; i++) {
                    _loop_1(i);
                }
            }
        };
        //: Handles the click event on the add task button.
        this.addButtonHandler = function () {
            if (_this.button) {
                _this.button.addEventListener('click', function (event) {
                    event.preventDefault();
                    _this.addToList(_this.input.value);
                    _this.emptyMsg.hidden = true;
                });
            }
        };
        //Adds a new task to the todosArray.
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
            _this.disPlayHandlerTrigger();
        };
        //Displays the Todo items in the main list area.
        this.disPlayHandlerTrigger = function () {
            //reset field
            _this.result = "";
            var taskArea = document.querySelector('#listdiv');
            if (taskArea) {
                taskArea.innerHTML = "";
            }
            console.log('🔥 todosArray 🔥');
            console.table(_this.todosArray);
            console.log('disPlayHandlerTrigger');
            var item = "";
            _this.todosArray.forEach(function (el) {
                // if(el.completed === false){
                item = "<li  id=\"".concat(el.id, "\">  ").concat(el.task, " </li> ");
                //} 
                _this.result += (item);
            });
            if (taskArea) {
                taskArea.innerHTML = _this.result;
            }
            console.log('loop trough items ✅');
            _this.addEventHandler();
            //this.addStyleChange();
        };
        //initialasting
        this.emptyMsg = document.getElementById("emptymsg");
        this.button = document.querySelector('#addButton');
        this.input = document.querySelector('#task');
        this.result = "";
        this.CompletedTodosArray = [];
        this.todosArray = [];
        console.log('hello my darkness my only friends');
        this.addButtonHandler();
    }
    //Modifies the style of the Todo items based on their completion status.
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
    //Handles the click event on a Todo item. Toggles the completion status and updates the corresponding arrays.
    TodoList.prototype.handleClickOnItem = function ($id) {
        console.log("clicked on item ".concat($id));
        //return;
        //toggle the checkbox
        //let checkboxInstance = document.getElementById(`${$id}`) as HTMLInputElement;
        //console.log(checkboxInstance);
        //checkboxInstance.checked = !checkboxInstance.checked;
        var itemObject = this.todosArray.find(function (el) { return el.id === $id; });
        if (itemObject) {
            //filtet the check item from the todos arra
            itemObject.completed = true;
            this.todosArray = this.todosArray.filter(function (item) { return item.id !== $id; });
            console.table(this.todosArray);
            this.CompletedTodosArray.push(itemObject);
            this.disPlayHandlerTrigger();
            this.completedDisplayHandler();
        }
        else {
            console.log('item not found');
        }
        //  if(itemObject) {
        //     itemObject.completed = !itemObject.completed;
        //   }
        //  if(itemObject?.completed ){
        //  }
        //this.addStyleChange();
    };
    return TodoList;
}());
//main function
var _TodoList = new TodoList();
