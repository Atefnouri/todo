"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TodoList = /** @class */ (function () {
    function TodoList() {
        var _this = this;
        this.clearLocalStorage = function () {
            var clearButton = document.getElementById("clear");
            clearButton.addEventListener("click", function () {
                var confirmation = window.confirm("Are you sure you want to clear your local storage");
                if (confirmation) {
                    // Get the localStorage object.
                    var localStorage_1 = window.localStorage;
                    // Clear the localStorage object.
                    localStorage_1.clear();
                    location.reload();
                }
            });
        };
        // Displays the completed Todo items in a separate area.
        this.completedDisplayHandler = function () {
            _this.updateLocalStorageCompleteArray();
            //reset field
            _this.completeResult = "";
            var completedArea = document.querySelector('#completedList');
            if (completedArea) {
                completedArea.innerHTML = "";
            }
            //count how many task in the array
            var completeCounter = document.querySelector('#itemCompletedCounter');
            if (completeCounter) {
                completeCounter.innerHTML = _this.CompletedTodosArray.length.toString();
            }
            var completeItem = "";
            _this.CompletedTodosArray.forEach(function (item) {
                completeItem = "<div class=\"col-md-12 complete-task-item\" id=\"".concat(item.id, "\">\n     <span class=\"complete-task-dot\"></span>\n     <span class=\"completed-task\"> ").concat(item.task, "</span>\n     <button \n     type=\"button\"\n     alt=\"delete item\"\n     id=\"del\"\n     class=\"btn btn-outline-danger btn-sm action-button\">\n     <i class=\"fa-solid fa-trash\"></i>\n    </button> \n \n    <button \n    type=\"button\"\n    id=\"undo\"\n    alt=\"restore item\"\n    class=\"btn btn-outline-light btn-sm action-button\">\n    <i class=\"fa-solid fa-rotate-left\"></i>\n   </button> \n   \n     <div class=\"row\">\n       <div class=\"col-md-12 task-date\">\n       ").concat(item.date, "\n       </div>\n     </div>\n     </div>");
                _this.completeResult += (completeItem);
            });
            if (completedArea) {
                completedArea.innerHTML = _this.completeResult;
            }
            //console.table(this.CompletedTodosArray);
            if (_this.todosArray.length === 0) {
                _this.emptyMsg.hidden = false;
            }
            //add the event listeners
            _this.addClickEventsToButtons();
            _this.undoButtonEventHandler();
            console.table(_this.CompletedTodosArray);
        };
        //delete button event handler
        this.addClickEventsToButtons = function () {
            var listItems = document.querySelectorAll('div.complete-task-item');
            listItems.forEach(function (item) {
                var deleteButton = item.querySelector("#del");
                var itemId = item.id;
                console.log(itemId);
                if (deleteButton) {
                    deleteButton.addEventListener("click", function () {
                        _this.handleButtonClick(itemId);
                    });
                }
            });
        };
        //undo button event handler
        this.undoButtonEventHandler = function () {
            var listItems = document.querySelectorAll('div.complete-task-item');
            listItems.forEach(function (item) {
                var undoButton = item.querySelector("#undo");
                var itemId = item.id;
                if (undoButton) {
                    undoButton.addEventListener("click", function () {
                        _this.undoButtonHandler(itemId);
                    });
                }
            });
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
            var listItems = document.querySelectorAll('div.task-item');
            listItems.forEach(function (item) {
                var checkButton = item.querySelector("#check");
                var itemId = item.id;
                if (checkButton) {
                    checkButton.addEventListener("click", function () {
                        console.log("Clicked on item ".concat(itemId));
                        _this.handleClickOnItem(Number(itemId));
                    });
                }
            });
        };
        this.updateTaskList = function (id, newText) {
            var selecteTaskIndex = _this.findObjectById(Number(id));
            _this.todosArray[selecteTaskIndex].task = newText;
            _this.disPlayHandlerTrigger();
        };
        //show edit field and addevet ok key enter evenr listener
        this.showEditFiedl = function (id) {
            console.log("show filter: ".concat(id));
            console.log(document.getElementById(id));
            var editField = document.getElementById('edit_' + id);
            //test visibility of edit field
            var isHidden = editField.style.display === "none";
            if (isHidden) {
                // The input field is hidden
                console.log('visible');
                editField.style.display = "inline";
                editField.focus();
                var inputValueLength = editField.value.length;
                editField.setSelectionRange(inputValueLength, inputValueLength);
                editField.addEventListener("keypress", function (event) {
                    if (event.key === "Enter") {
                        _this.updateTaskList(id, editField.value);
                        //console.log('new value' , (myTextField as HTMLInputElement).value);
                        editField.hidden = true;
                    }
                });
            }
            else {
                // The input field is not hidden
                console.log('hiddne');
                editField.style.display = "none";
            }
        };
        //add event listeners to the edit button
        this.editButtonEventListener = function () {
            var listItems = document.querySelectorAll('div.task-item');
            listItems.forEach(function (item) {
                var checkButton = item.querySelector("#edit");
                var itemId = item.id;
                if (checkButton) {
                    checkButton.addEventListener("click", function () {
                        console.log("Clicked on item to edit ".concat(itemId));
                        //this.handleClickOnItem(Number(itemId));
                        _this.showEditFiedl(itemId);
                    });
                }
            });
        };
        // Handles the enter key event to add task to listSt.
        this.enterKeyHandler = function () {
            if (_this.input) {
                _this.input.addEventListener("keypress", function (event) {
                    if (event.key === "Enter") {
                        event.preventDefault();
                        _this.addToList(_this.input.value);
                        _this.emptyMsg.hidden = true;
                    }
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
            var _date = new Date();
            var FormatDate = '';
            FormatDate = _date.toLocaleDateString('en-GB');
            _this.todosArray.push({
                id: (_this.todosArray.length + _this.CompletedTodosArray.length) + 1,
                task: message,
                completed: false,
                date: FormatDate
            });
            //reset field after adding to list
            _this.input.value = '';
            //this.updateLocalStorages();  
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
            _this.handleDate();
            console.log('🔥 todosArray 🔥');
            console.table(_this.todosArray);
            console.log('disPlayHandlerTrigger');
            var item = "";
            _this.todosArray.forEach(function (el) {
                item = "  <div class=\"col-md-12 task-item\" id=\"".concat(el.id, "\">\n          <span class=\"task-dot\"></span><span>  ").concat(el.task, "</span> \n         \n          <button \n          type=\"button\"\n          id=\"edit\"\n          alt=\"restore item\"\n          class=\"btn btn-outline-light btn-sm action-button\">\n          <i class=\"fa-solid fa-pen\"></i>\n         </button> \n\n        <!--- check button  --->\n         <button \n         type=\"button\"\n         id=\"check\"\n         alt=\"restore item\"\n         class=\"btn btn-outline-light btn-sm action-button\">\n         <i class=\"fa-solid fa-circle-check\"></i>\n        </button> \n\n         \n          <div class=\"row\">\n            <div class=\"col-md-12 task-date\">\n            ").concat(el.date, "\n            </div>\n          </div>\n          </div>\n          <div class=\"col-md-12 under-task-item\">\n          <input type=\"text\" value=\"").concat(el.task, "\" style=\"display:none;\"  id=\"edit_").concat(el.id, "\">\n          </div>\n          \n          ");
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
        this.handleDate = function () {
            console.log('date format started');
            var todayRefrence = new Date().toLocaleDateString('en-GB');
            var _yesterday = new Date();
            _yesterday.setDate(_yesterday.getDate() - 1);
            var yesterdayRefernce = _yesterday.toLocaleDateString('en-GB');
            _this.todosArray.forEach(function (el) {
                console.log(todayRefrence, yesterdayRefernce);
                //let arrayDate = new Date(el.date);
                if (el.date === todayRefrence) {
                    console.log('Today is correct ');
                    el.date = 'Today';
                }
                else if (el.date === yesterdayRefernce) {
                    el.date = 'Yesterday';
                    console.log('Yesterday is correct ');
                }
            });
        };
        this.playSound = function () {
            var audio = new Audio("./src/check.mp3"); // Replace with the actual path to your sound file
            audio.play();
        };
        //initialasting
        this.emptyMsg = document.getElementById("emptymsg");
        this.button = document.querySelector('#addButton');
        this.input = document.querySelector('#task');
        this.result = "";
        this.completeResult = "";
        this.CompletedTodosArray = [];
        this.todosArray = [];
        this.enterKeyHandler();
        this.localStorageHandler();
        this.disPlayHandlerTrigger();
        this.completedDisplayHandler();
        this.clearLocalStorage();
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
        var itemObject = this.todosArray.find(function (el) { return el.id === $id; });
        if (itemObject) {
            //filtet the check item from the todos arra
            itemObject.completed = true;
            this.todosArray = this.todosArray.filter(function (item) { return item.id !== $id; });
            console.table(this.todosArray);
            this.CompletedTodosArray.push(itemObject);
            this.playSound();
            this.disPlayHandlerTrigger();
            this.completedDisplayHandler();
        }
        else {
            console.log('item not found');
        }
    };
    // Perform the necessary actions for deleting the item from the completed list with the provided ID
    TodoList.prototype.handleButtonClick = function (liId) {
        console.log("Delete button clicked for item with ID: ".concat(liId));
        var confirmation = window.confirm("Are you sure you want to delete this item?");
        if (confirmation) {
            // Perform the necessary actions for deleting the item with the provided ID
            console.log("Item with ID ".concat(liId, " will be deleted."));
            this.CompletedTodosArray = this.CompletedTodosArray.filter(function (element) { return element.id !== Number(liId); });
            this.completedDisplayHandler();
        }
        else {
            // Cancelled deletion
            console.log("Deletion cancelled.");
        }
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
