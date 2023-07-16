"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TodoList = /** @class */ (function () {
    function TodoList() {
        var _this = this;
        // Displays the completed Todo items in a separate area.
        this.completedDisplayHandler = function () {
            _this.updateLocalStorageCompleteArray();
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
        //add eventlistener to the main task list
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
        this.addEnterKeyOnEditField = function () {
            var myList = document.getElementById("listdiv");
            var inputArray = myList === null || myList === void 0 ? void 0 : myList.getElementsByTagName("input");
            if (inputArray) {
                var _loop_2 = function (i) {
                    var field = inputArray[i];
                    var id = field.getAttribute("id");
                    field.addEventListener("click", function () {
                        console.log("Clicked on item ".concat(id));
                        //this.showEditFiedl(id);
                        //this.handleClickOnItem(Number(id));
                    });
                };
                for (var i = 0; i < inputArray.length; i++) {
                    _loop_2(i);
                }
            }
        };
        this.updateTaskList = function (id, newText) {
            var selecteTaskIndex = _this.findObjectById(Number(id));
            _this.todosArray[selecteTaskIndex].task = newText;
            _this.disPlayHandlerTrigger();
        };
        //show edit field and addevet ok key enter evenr listener
        this.showEditFiedl = function (id) {
            console.log("show filter: ".concat(id));
            var myList = document.getElementById("listdiv");
            var textField = myList === null || myList === void 0 ? void 0 : myList.querySelector('#text' + id);
            // const editButton = myList?.querySelector<HTMLButtonElement>('#'+id);
            // if (editButton) {
            //   editButton.textContent = "confim";
            // }
            console.log(textField);
            if (textField) {
                textField.hidden = false;
                textField.addEventListener("keypress", function (event) {
                    if (event.key === "Enter") {
                        _this.updateTaskList(id, textField.value);
                        textField.hidden = true;
                    }
                });
            }
        };
        //add event listeners to the edit button
        this.editButtonEventListener = function () {
            var myList = document.getElementById("listdiv");
            var buttonArray = myList === null || myList === void 0 ? void 0 : myList.getElementsByTagName("button");
            if (buttonArray) {
                var _loop_3 = function (i) {
                    var bt = buttonArray[i];
                    var id = bt.getAttribute("id");
                    bt.addEventListener("click", function () {
                        console.log("Clicked on item ".concat(id));
                        _this.showEditFiedl(id);
                        //this.handleClickOnItem(Number(id));
                    });
                };
                for (var i = 0; i < buttonArray.length; i++) {
                    _loop_3(i);
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
            _this.todosArray.length > 0 ? _this.emptyMsg.hidden = true : _this.emptyMsg.hidden = false;
            _this.updateLocalStorages();
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
                item = "<li  id=\"".concat(el.id, "\">  ").concat(el.task, " </li> <button id=\"").concat(el.id, "\" >edit</button>\n          <input type=\"text\" id=\"text").concat(el.id, "\" value=\"").concat(el.task, "\" hidden > ");
                //} 
                _this.result += (item);
            });
            if (taskArea) {
                taskArea.innerHTML = _this.result;
            }
            console.log('loop trough items ✅');
            _this.addEventHandler();
            _this.editButtonEventListener();
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
        this.completedDisplayHandler();
    }
    TodoList.prototype.localStorageHandler = function () {
        // Retrieve the string from local storage
        var todoLocalStorageInstce = localStorage.getItem("todosArray");
        var completeLocalStorageInstce = localStorage.getItem("CompletedTodosArray");
        todoLocalStorageInstce ? this.todosArray = JSON.parse(todoLocalStorageInstce) : this.todosArray = [];
        completeLocalStorageInstce ? this.CompletedTodosArray = JSON.parse(completeLocalStorageInstce) : this.CompletedTodosArray = [];
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
    TodoList.prototype.findObjectById = function (id) {
        var equalid = function (element) { return element.id === id; };
        var foundObject = this.todosArray.findIndex(equalid);
        return foundObject;
    };
    TodoList.prototype.updateLocalStorages = function () {
        // Convert the array to a string
        var elementsString = JSON.stringify(this.todosArray);
        // Save the string in local storage
        localStorage.setItem("todosArray", elementsString);
    };
    TodoList.prototype.updateLocalStorageCompleteArray = function () {
        // Convert the array to a string
        var elementsString = JSON.stringify(this.CompletedTodosArray);
        // Save the string in local storage
        localStorage.setItem("CompletedTodosArray", elementsString);
    };
    return TodoList;
}());
//main function
var _TodoList = new TodoList();
