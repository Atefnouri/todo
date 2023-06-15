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
  


    handleClickOnItem($id:number) {
     
      //toggle the checkbox
      let checkboxInstance = document.getElementById(`${$id}`) as HTMLInputElement;
      console.log(checkboxInstance);
      checkboxInstance.checked = !checkboxInstance.checked;

      let itemObject = (this.todosArray as Todo[]).find((el) => el.id === $id);
   if(itemObject) {
      itemObject.completed = !itemObject.completed;
    }
   if(itemObject?.completed ){
    this.CompletedTodosArray.push(itemObject);
    this.completedDisplayHandler();
   }

    this.addStyleChange();
  }



  completedDisplayHandler = () => {

          //reset field
      let completedArea = document.querySelector('#completedList');
      if(completedArea) {
        completedArea.innerHTML = "";
      }
       
    this.CompletedTodosArray.forEach((item) => {

      const li = document.createElement('li');
      li.textContent = item.task;
      li.style.color = 'gray';
  
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = true;
  
      li.appendChild(checkbox);
      //add to the main area
      completedArea?.appendChild(li);
    });
  }
  




    addEventHandler =  ( ) => {
      
     const myList = document.getElementById("listdiv");
     const liElements = myList?.getElementsByTagName("li");
      if(liElements){
        for (let i = 0; i < liElements.length; i++) {
          liElements[i].addEventListener("click", () => {
            console.log(`Clicked on item ${i+1}`);
            
            this.handleClickOnItem(i+1);
  
          })};
      }

  }




  //Handle the add task button clikc event
  addButtonHandler = ():void =>{
      if (this.button) {
        this.button.addEventListener('click', (event) => {
          event.preventDefault();
          this.addToList(this.input.value);
          this.emptyMsg!.hidden = true;
        });
       }
      
    

    }

    // add task from input to todosArray array
     addToList = (message:string) =>  {

      if(this.input.value.trim().length === 0){
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
        this.input.value = '';
        console.table(this.todosArray); 
        this.disPlayHandlerTrigger(); 
    }


    disPlayHandlerTrigger = () => {

      //reset field
        let taskArea = document.querySelector('#listdiv');
        if(taskArea){
          taskArea.innerHTML = "";
          }

      console.log('disPlayHandlerTrigger');
      let item :string  = "";
      this.todosArray.forEach(el => {
        if(el.completed === false){
          item = `<li> <input type="checkbox"  id="${el.id}" > ${el.task} </li> `;
        } else {
          item = `<li> <input type="checkbox" checked id="${el.id}" > ${el.task} </li> `;
        }
      
        this.result += (item);
      });
      
      if(taskArea){
      taskArea.innerHTML = _TodoList.result;
      }
    this.addEventHandler();
    this.addStyleChange();
    }






  }


//main function
 const _TodoList = new TodoList();
 







