import { Todo } from './src/ITodo';
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
      //this.playSound();
  
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
location.reload();

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
      let itemObject = (this.todosArray as Array<Todo>).find((el) => el.id === $id);
      if(itemObject){
     //filtet the check item from the todos arra
     itemObject.completed = true;
    this.todosArray = this.todosArray.filter((item) => item.id !== $id);
    console.table(this.todosArray);
    this.CompletedTodosArray.push(itemObject);
     this.playSound(); 
    this.disPlayHandlerTrigger();
    this.completedDisplayHandler();

      }
      else {
        console.log('item not found');
      }

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
    console.table(this.CompletedTodosArray);

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
   
    console.log(document.getElementById(id));
    const editField = document.getElementById('edit_'+id);

    //test visibility of edit field

    const isHidden = editField.style.display === "none";

    if (isHidden) {
      // The input field is hidden
      console.log('visible');

      editField.style.display = "inline";
      editField.focus();
      const inputValueLength = (editField as HTMLInputElement).value.length;
      (editField as HTMLInputElement).setSelectionRange(inputValueLength, inputValueLength);

      editField.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
  
          this.updateTaskList(id, (editField as HTMLInputElement).value);
          //console.log('new value' , (myTextField as HTMLInputElement).value);
          editField.hidden = true;
          
        }
      });

    } else {
      // The input field is not hidden
      console.log('hiddne');
      editField.style.display = "none";
    }
   }



  //add event listeners to the edit button
  editButtonEventListener = () => {

    const listItems = document.querySelectorAll('div.task-item');
    listItems.forEach((item) => {
      const checkButton = item.querySelector<HTMLButtonElement>("#edit");
      const itemId = item.id;
  
      if (checkButton) {
        checkButton.addEventListener("click", () => {
          console.log(`Clicked on item to edit ${itemId}`);
          //this.handleClickOnItem(Number(itemId));
          this.showEditFiedl(itemId);
        });
      }
    });

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
              id: (this.todosArray.length + this.CompletedTodosArray.length) + 1,
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

     
          this.handleDate();

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
          </div>
          <div class="col-md-12 under-task-item">
          <input type="text" value="${el.task}" style="display:none;"  id="edit_${el.id}">
          </div>
          
          `;
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

    handleDate = () => {


      console.log('date format started');

      const todayRefrence = new Date().toLocaleDateString('en-GB');

      const _yesterday = new Date();
      _yesterday.setDate(_yesterday.getDate() - 1);
      const yesterdayRefernce = _yesterday.toLocaleDateString('en-GB');
     

        this.todosArray.forEach(el => {


          console.log(todayRefrence,yesterdayRefernce);

          //let arrayDate = new Date(el.date);
          if(el.date === todayRefrence){
            console.log('Today is correct ');
            el.date = 'Today';
          } else if( el.date === yesterdayRefernce){ 
            el.date = 'Yesterday';
            console.log('Yesterday is correct ');
          }
        });
      
    }

    playSound = () => {
      const audio = new Audio("./check.mp3"); // Replace with the actual path to your sound file
      audio.play();
  }
  



  }

  


//main function
 const _TodoList = new TodoList();
 







