interface Todo {
  id: number;
  task: string;
  completed: boolean;
}

class TodoList {
 
    public todosArray: Todo[];
    public CompletedTodosArray: Todo[];
    public result:string;
    input: HTMLInputElement | null ;
    button : Element | null;
    emptyMsg:HTMLElement | null;

    constructor() {
    
      //initialasting
      this.emptyMsg = document.getElementById("emptymsg");
      this.button = document.querySelector('#addButton');
      this.input = document.querySelector('#task') as HTMLInputElement;
      this.result = "";
      this.CompletedTodosArray = [];
      this.todosArray = [];
 
      this.addButtonHandler();
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



  // Displays the completed Todo items in a separate area.
  completedDisplayHandler = () => {


            //count how many task in the array
            let completeCounter = document.querySelector('#itemCompletedCounter');
            if (completeCounter){
              completeCounter.innerHTML = this.CompletedTodosArray.length.toString();
            } 

      //reset field
      let completedArea = document.querySelector('#completedList');
      if(completedArea) {
        completedArea.innerHTML = "";
      }
       
    this.CompletedTodosArray.forEach((item) => {

      const li = document.createElement('li');
      li.textContent = item.task;
      li.setAttribute('id',item.id.toString());
      li.style.color = 'gray';
      li.style.textDecoration = 'line-through';
      // Create the button element
      const deleteButton = document.createElement("button");
     
      deleteButton.textContent = "Delete";
      deleteButton.setAttribute('id',"del");
        // Add the button to the list item
        li.appendChild(deleteButton);

     /* const undoButton = document.createElement("button");
      undoButton.textContent = "Undo";
      li.appendChild(undoButton);*/

    
 

      //add to the main area
      completedArea?.appendChild(li);
    });

    //console.table(this.CompletedTodosArray);
    if(this.todosArray.length === 0) {
      this.emptyMsg!.hidden = false;
    }

    this.addClickEventsToButtons();

  }
  


   addClickEventsToButtons = () => {
    const listItems = document.querySelectorAll<HTMLLIElement>("#completedList li");
  
    listItems.forEach((li) => {
      const deleteButton = li.querySelector<HTMLButtonElement>("#del");
      const liId = li.id;
  
      if (deleteButton) {
        deleteButton.addEventListener("click", () => {
          this.handleButtonClick(liId);
        });
      }
    });
  }
  
  // Perform the necessary actions for deleting the item with the provided ID
   handleButtonClick = (liId: string) => {
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


  addEventHandler = () => {
    const myList = document.getElementById("listdiv");
    const liElements = myList?.getElementsByTagName("li");
  
    if (liElements) {
      for (let i = 0; i < liElements.length; i++) {
        const li = liElements[i];
        const id = li.getAttribute("id");
  
        li.addEventListener("click", () => {
          console.log(`Clicked on item ${id}`);
          this.handleClickOnItem(Number(id));
        });
      }
    }
  }
  




 //: Handles the click event on the add task button.
  addButtonHandler = ():void =>{
      if (this.button) {
        this.button.addEventListener('click', (event) => {
          event.preventDefault();
          this.addToList(this.input!.value);
          this.emptyMsg!.hidden = true;
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

      this.todosArray.push({
              id: this.todosArray.length + 1,
              task: message,
              completed: false,
            });


        //reset field after adding to list
        this.input!.value = '';
  
        this.disPlayHandlerTrigger(); 
    }


    //Displays the Todo items in the main list area.
    disPlayHandlerTrigger = () => {

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
       // if(el.completed === false){
          item = `<li  id="${el.id}">  ${el.task} </li> `;
        //} 
      
        this.result += (item);
      });
      
      if(taskArea){
      taskArea.innerHTML = this.result;
      }
      console.log('loop trough items ✅');
    this.addEventHandler();
    //this.addStyleChange();
    }






  }


//main function
 const _TodoList = new TodoList();
 







