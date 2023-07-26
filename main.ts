import { Todo } from './ITodo';

class TodoList {
 
    public todosArray: Todo[];
    public CompletedTodosArray: Todo[];
    public result:string;
    public completeResult:string;
    input: HTMLInputElement | null ;
    button : Element | null;
    emptyMsg:HTMLElement | null;
  

    constructor() {
    
      //initialasting
      this.emptyMsg = document.getElementById("emptymsg");
      this.button = document.querySelector('#addButton');
      this.input = document.querySelector('#task') as HTMLInputElement;
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



    clearLocalStorage  = () => {

      let clearButton = document.getElementById("clear") as HTMLElement;
clearButton.addEventListener("click", () => {
  const confirmation = window.confirm("Are you sure you want to clear your local storage");
  if (confirmation) {
    // Get the localStorage object.
const localStorage = window.localStorage;

// Clear the localStorage object.
localStorage.clear();

  }  
});

}


     localStorageHandler() {

      // Retrieve the string from local storage
      const todoLocalStorageInstce  = localStorage.getItem("todosArray");
      const completeLocalStorageInstce = localStorage.getItem("CompletedTodosArray");

      todoLocalStorageInstce ? this.todosArray = JSON.parse(todoLocalStorageInstce): this.todosArray = [];
      completeLocalStorageInstce ? this.CompletedTodosArray = JSON.parse(completeLocalStorageInstce): this.CompletedTodosArray = [];

}



  //Modifies the style of the Todo items based on their completion status.
    addStyleChange() {
      console.log('style is called');

        // Select all <li> elements
      const liElements = document.querySelectorAll("li");

      // Iterate through each <li> element
      liElements.forEach((liElement: HTMLElement) => {
        // Find the checkbox within the current <li> element
        const checkbox = liElement.querySelector("input[type='checkbox']") as HTMLInputElement;

        // Check if the checkbox is checked
        if (checkbox && checkbox.checked) {
          // Checkbox is checked
          liElement.style.textDecoration = 'line-through';
        }  else if (checkbox && !checkbox.checked) {
          liElement.style.textDecoration = 'none';
        }
      });

    }
  

    //Handles the click event on a Todo item. Toggles the completion status and updates the corresponding arrays.
    handleClickOnItem($id:number) {
      
      console.log(`clicked on item ${$id}`);
      //return;
      //toggle the checkbox
      //let checkboxInstance = document.getElementById(`${$id}`) as HTMLInputElement;
      //console.log(checkboxInstance);
      //checkboxInstance.checked = !checkboxInstance.checked;

      let itemObject = (this.todosArray as Array<Todo>).find((el) => el.id === $id);
      if(itemObject){
     //filtet the check item from the todos arra
     itemObject.completed = true;
    this.todosArray = this.todosArray.filter((item) => item.id !== $id);
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
  }


    // Perform the necessary actions for deleting the item from the completed list with the provided ID
   handleButtonClick  (liId: string)  {
    console.log(`Delete button clicked for item with ID: ${liId}`);
    const confirmation = window.confirm("Are you sure you want to delete this item?");
    if (confirmation) {
      // Perform the necessary actions for deleting the item with the provided ID
      console.log(`Item with ID ${liId} will be deleted.`);
      this.CompletedTodosArray = this.CompletedTodosArray.filter((element) => element.id !== Number(liId));

      this.completedDisplayHandler();

    } else {
      // Cancelled deletion
      console.log("Deletion cancelled.");
  
  }

}




  // Displays the completed Todo items in a separate area.
  completedDisplayHandler = () => {

    this.updateLocalStorageCompleteArray(); 

        //reset field
      this.completeResult = "";
      let completedArea = document.querySelector('#completedList');
      if(completedArea) {
        completedArea.innerHTML = "";
      }

            //count how many task in the array
            let completeCounter = document.querySelector('#itemCompletedCounter');
            if (completeCounter){
              completeCounter.innerHTML = this.CompletedTodosArray.length.toString();
            } 

  
    let completeItem :string  = ""; 
    this.CompletedTodosArray.forEach((item) => {

     completeItem = `<div class="col-md-12 complete-task-item" id="${item.id}">
     <span class="complete-task-dot"></span>
     <span class="completed-task"> ${item.task}</span>
     <button 
     type="button"
     alt="delete item"
     id="del"
     class="btn btn-outline-danger btn-sm action-button">
     <i class="fa-solid fa-trash"></i>
    </button> 
 
    <button 
    type="button"
    id="undo"
    alt="restore item"
    class="btn btn-outline-light btn-sm action-button">
    <i class="fa-solid fa-rotate-left"></i>
   </button> 
   
     <div class="row">
       <div class="col-md-12 task-date">
       ${item.date}
       </div>
     </div>
     </div>`; 


      // const li = document.createElement('li');
      // li.textContent = item.task;
      // li.setAttribute('id',item.id.toString());
      // li.style.color = 'gray';
      // li.style.textDecoration = 'line-through';

      // Create the button element
      // const deleteButton = document.createElement("button");
      // deleteButton.textContent = "Delete";
      // deleteButton.setAttribute('id',"del");
      //   // Add the button to the list item
      //   li.appendChild(deleteButton);

      //create the untdo button element  
    //  const undoButton = document.createElement("button");
    //   undoButton.textContent = "Undo";
    //   undoButton.setAttribute('id',"undo");
    //   li.appendChild(undoButton);

      //add to the main area
      // completedArea?.appendChild(li);
      this.completeResult += (completeItem);
    });

    if(completedArea){
      completedArea.innerHTML = this.completeResult;
      }

    //console.table(this.CompletedTodosArray);
    if(this.todosArray.length === 0) {
      this.emptyMsg!.hidden = false;
    }

    //add the event listeners
    this.addClickEventsToButtons();
    this.undoButtonEventHandler();

  }
  


  //delete button event handler
   addClickEventsToButtons = () => {

    const listItems = document.querySelectorAll('div.complete-task-item');
    listItems.forEach((item) => {
      const deleteButton = item.querySelector<HTMLButtonElement>("#del");
      const itemId = item.id;
      console.log(itemId);
  
      if (deleteButton) {
        deleteButton.addEventListener("click", () => {
          this.handleButtonClick(itemId);
        });
      }
    });

  }


  //undo button event handler
  undoButtonEventHandler= () => {

    const listItems = document.querySelectorAll('div.complete-task-item');
    listItems.forEach((item) => {
      const undoButton = item.querySelector<HTMLButtonElement>("#undo");
      const itemId = item.id;
  
      if (undoButton) {
        undoButton.addEventListener("click", () => {
          this.undoButtonHandler(itemId);
        });
      }
    });
  }
  




  // Perform the necessary actions for deleting the item with the provided ID
  undoButtonHandler = (liId: string) => {
    console.log(`undo button clicked for item with ID: ${liId}`);
    let restoredObject  = this.CompletedTodosArray.find((element) => element.id === Number(liId));
      const confirmation = window.confirm("Are you sure you want to restore this item back?");
  //return;
    if (confirmation) {
      //restore the item to the todo list
      if(restoredObject){
        this.todosArray.push(restoredObject);
      }
      //delete the item with the provided ID
      this.CompletedTodosArray = this.CompletedTodosArray.filter((element) => element.id !== Number(liId));
      //disply result
      this.completedDisplayHandler();
      this.disPlayHandlerTrigger();

    } else {
      // Cancelled deletion
      console.log("Restoer cancelled.");
  
  }

}
 



//add eventlistener to the main task list
  addEventHandler = () => {
   
    const listItems = document.querySelectorAll('div.task-item');
    listItems.forEach((item) => {
      const checkButton = item.querySelector<HTMLButtonElement>("#check");
      const itemId = item.id;
  
      if (checkButton) {
        checkButton.addEventListener("click", () => {
          console.log(`Clicked on item ${itemId}`);
          this.handleClickOnItem(Number(itemId));
        });
      }
    });


    return;
    const myList = document.getElementById("listdiv");
    //const liElements = myList?.getElementsByTagName("li");
    const divArray = myList?.querySelectorAll('div.task-item');
  
    if (divArray) {
      for (let i = 0; i < divArray.length; i++) {
        const item = divArray[i];
        const id = item.getAttribute("id");
  
        item.addEventListener("click", () => {
          console.log(`Clicked on item ${id}`);
          this.handleClickOnItem(Number(id));
        });
      }
    }


  }
  



  addEnterKeyOnEditField = () => {
    const myList = document.getElementById("listdiv");
    const inputArray = myList?.getElementsByTagName("input");
  
    if (inputArray) {
      for (let i = 0; i < inputArray.length; i++) {
        const field = inputArray[i];
        const id = field.getAttribute("id");
  
        field.addEventListener("click", () => {
          console.log(`Clicked on item ${id}`);
          //this.showEditFiedl(id);
          //this.handleClickOnItem(Number(id));
        });
      }
    }

   }

    findObjectById(id: number): any | undefined {
    
      const equalid = (element) => element.id === id;
      const foundObject = this.todosArray.findIndex(equalid);
      return foundObject;
  }


   updateTaskList  = (id:string,newText:string) => { 

    let selecteTaskIndex = this. findObjectById(Number(id));
    this.todosArray[selecteTaskIndex].task = newText;
    this.disPlayHandlerTrigger(); 

   }

//show edit field and addevet ok key enter evenr listener
  showEditFiedl = (id:string) => {
    console.log(`show filter: ${id}`);
    const myList = document.getElementById("listdiv");
    const textField = myList?.querySelector<HTMLInputElement>('#text'+id);
    // const editButton = myList?.querySelector<HTMLButtonElement>('#'+id);
    // if (editButton) {
    //   editButton.textContent = "confim";
    // }
    console.log(textField);
    if (textField) {
      textField.hidden = false;
      textField.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
  
          this.updateTaskList(id,textField.value);
          textField.hidden = true;
          
        }
      });
    }

   }



  //add event listeners to the edit button
  editButtonEventListener = () => {
    const myList = document.getElementById("listdiv");
    const buttonArray = myList?.getElementsByTagName("button");
  
    if (buttonArray) {
      for (let i = 0; i < buttonArray.length; i++) {
        const bt = buttonArray[i];
        const id = bt.getAttribute("id");
  
        bt.addEventListener("click", () => {
          console.log(`Clicked on item ${id}`);
          this.showEditFiedl(id);
          //this.handleClickOnItem(Number(id));
        });
      }
    }
  }
  

  updateLocalStorages() {
    // Convert the array to a string
const elementsString = JSON.stringify(this.todosArray);
// Save the string in local storage
localStorage.setItem("todosArray", elementsString);
}


updateLocalStorageCompleteArray() {

// Convert the array to a string
const elementsString = JSON.stringify(this.CompletedTodosArray);
// Save the string in local storage
localStorage.setItem("CompletedTodosArray", elementsString);
}



 // Handles the enter key event to add task to listSt.
  enterKeyHandler = ():void =>{
       if (this.input) {
      
        this.input.addEventListener("keypress", (event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            this.addToList(this.input!.value);
            this.emptyMsg!.hidden = true;        
          }
        });
      }
    }

    //Adds a new task to the todosArray.
     addToList = (message:string) =>  {

      if(this.input!.value.trim().length === 0){
        return;
      }

      this.result = '';
      //console.log(`this a ${message}`);

      let _date = new Date();
      let FormatDate:string = '';
      FormatDate = _date.toLocaleDateString('en-GB'); 

      this.todosArray.push({
              id: this.todosArray.length + 1,
              task: message,
              completed: false,
              date: FormatDate
            });


        //reset field after adding to list
        this.input!.value = '';


        //this.updateLocalStorages();  
        this.disPlayHandlerTrigger(); 
    }




    //Displays the Todo items in the main list area.
    disPlayHandlerTrigger = () => {

      this.todosArray.length > 0 ?  this.emptyMsg!.hidden = true : this.emptyMsg!.hidden = false;

      this.updateLocalStorages();
      //reset field
        this.result = "";
        let taskArea = document.querySelector('#listdiv');
        if(taskArea){
          taskArea.innerHTML = "";
          }

          //count how many task in the array
          let counterArea = document.querySelector('#itemCounter');
          if (counterArea){
            counterArea.innerHTML = this.todosArray.length.toString();
          } 

     
      

      console.log('🔥 todosArray 🔥');
      console.table(this.todosArray); 

      console.log('disPlayHandlerTrigger');
      let item :string  = "";
      this.todosArray.forEach(el => {
      
          item = `  <div class="col-md-12 task-item" id="${el.id}">
          <span class="task-dot"></span><span>  ${el.task}</span> 
          <button 
          type="button"
          id="edit"
          alt="restore item"
          class="btn btn-outline-light btn-sm action-button">
          <i class="fa-solid fa-pen"></i>
         </button> 

        <!--- check button  --->
         <button 
         type="button"
         id="check"
         alt="restore item"
         class="btn btn-outline-light btn-sm action-button">
         <i class="fa-solid fa-circle-check"></i>
        </button> 

         
          <div class="row">
            <div class="col-md-12 task-date">
            ${el.date}
            </div>
          </div>
          </div>`;
        //} 
      
        this.result += (item);
      });
      
      if(taskArea){
      taskArea.innerHTML = this.result;
      }
      console.log('loop trough items ✅');

    this.addEventHandler();
    this.editButtonEventListener();
    //this.addStyleChange();
    }



    public static clearStorages = () =>{

      console.log('test clearStorages');

    }



  }


//main function
 const _TodoList = new TodoList();
 







