var TodoList = /** @class */ (function () {
    function TodoList() {
        var _this = this;
        // Displays the completed Todo items in a separate area.
        this.completedDisplayHandler = function () {
            //count how many task in the array
            var completeCounter = document.querySelector('#itemCompletedCounter');
            if (completeCounter) {
                completeCounter.innerHTML = _this.CompletedTodosArray.length.toString();
            }
            //reset field
            var completedArea = document.querySelector('#completedList');
            if (completedArea) {
                completedArea.innerHTML = "";
            }
            _this.CompletedTodosArray.forEach(function (item) {
                var li = document.createElement('li');
                li.textContent = item.task;
                li.setAttribute('id', item.id.toString());
                li.style.color = 'gray';
                li.style.textDecoration = 'line-through';
                // Create the button element
                var deleteButton = document.createElement("button");
                deleteButton.textContent = "Delete";
                deleteButton.setAttribute('id', "del");
                // Add the button to the list item
                li.appendChild(deleteButton);
                //create the untdo button element  
                var undoButton = document.createElement("button");
                undoButton.textContent = "Undo";
                undoButton.setAttribute('id', "undo");
                li.appendChild(undoButton);
                //add to the main area
                completedArea === null || completedArea === void 0 ? void 0 : completedArea.appendChild(li);
            });
            //console.table(this.CompletedTodosArray);
            if (_this.todosArray.length === 0) {
                _this.emptyMsg.hidden = false;
            }
            //add the event listeners
            _this.addClickEventsToButtons();
            _this.undoButtonEventHandler();
        };
        //delete button event handler
        this.addClickEventsToButtons = function () {
            var listItems = document.querySelectorAll("#completedList li");
            listItems.forEach(function (li) {
                var deleteButton = li.querySelector("#del");
                var liId = li.id;
                if (deleteButton) {
                    deleteButton.addEventListener("click", function () {
                        _this.handleButtonClick(liId);
                    });
                }
            });
        };
        //undo button event handler
        this.undoButtonEventHandler = function () {
            var listItems = document.querySelectorAll("#completedList li");
            listItems.forEach(function (li) {
                var undoButton = li.querySelector("#undo");
                var liId = li.id;
                if (undoButton) {
                    undoButton.addEventListener("click", function () {
                        _this.undoButtonHandler(liId);
                    });
                }
            });
        };
        // Perform the necessary actions for deleting the item from the completed list with the provided ID
        this.handleButtonClick = function (liId) {
            console.log("Delete button clicked for item with ID: ".concat(liId));
            var confirmation = window.confirm("Are you sure you want to delete this item?");
            if (confirmation) {
                // Perform the necessary actions for deleting the item with the provided ID
                console.log("Item with ID ".concat(liId, " will be deleted."));
                _this.CompletedTodosArray = _this.CompletedTodosArray.filter(function (element) { return element.id !== Number(liId); });
                _this.completedDisplayHandler();
            }
            else {
                // Cancelled deletion
                console.log("Deletion cancelled.");
            }
        };
        // Perform the necessary actions for deleting the item with the provided ID
        this.undoButtonHandler = function (liId) {
            console.log("undo button clicked for item with ID: ".concat(liId));
            var restoredObject = _this.CompletedTodosArray.find(function (element) { return element.id === Number(liId); });
            var confirmation = window.confirm("Are you sure you want to restore this item back?");
            //return;
            if (confirmation) {
                //restore the item to the todo list
                if (restoredObject) {
                    _this.todosArray.push(restoredObject);
                }
                //delete the item with the provided ID
                _this.CompletedTodosArray = _this.CompletedTodosArray.filter(function (element) { return element.id !== Number(liId); });
                //disply result
                _this.completedDisplayHandler();
                _this.disPlayHandlerTrigger();
            }
            else {
                // Cancelled deletion
                console.log("Restoer cancelled.");
            }
        };
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
            _this.updateLocalStorages();
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
            //count how many task in the array
            var counterArea = document.querySelector('#itemCounter');
            if (counterArea) {
                counterArea.innerHTML = _this.todosArray.length.toString();
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
        this.addButtonHandler();
        this.localStorageHandler();
        this.disPlayHandlerTrigger();
    }
    TodoList.prototype.localStorageHandler = function () {
        // Retrieve the string from local storage
        var todoArrayLocalStorage = localStorage.getItem("todosArray");
        if (todoArrayLocalStorage) {
            // Parse the string back into an array
            this.todosArray = JSON.parse(todoArrayLocalStorage);
            //remove the empty message string if table is not empty
            this.todosArray.length > 0 ? this.emptyMsg.hidden = true : this.emptyMsg.hidden = false;
        }
    };
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
            this.updateLocalStorages();
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
    TodoList.prototype.updateLocalStorages = function () {
        // Convert the array to a string
        var elementsString = JSON.stringify(this.todosArray);
        // Save the string in local storage
        localStorage.setItem("todosArray", elementsString);
    };
    return TodoList;
}());
//main function
var _TodoList = new TodoList();
