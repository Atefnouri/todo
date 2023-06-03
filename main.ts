interface Todo {
  id: number;
  task: string;
  completed: boolean;
}

class TodoList {
    public todos: Todo[];
    public result:string = "";
    input   = document.querySelector('#task') as HTMLInputElement
    button : Element | null = document.querySelector('#addButton');
    // Get the list and its children


    constructor() {
      console.log('App is initialized');
      //initial setup
      this.todos = [];
  
      this.initInput();
    }


    addEventHandler =  ( ) => {
     const myList = document.getElementById("listdiv");
     const liElements = myList?.getElementsByTagName("li");
      if(liElements){
        for (let i = 0; i < liElements.length; i++) {
          liElements[i].addEventListener("click", () => {
            console.log(`Clicked on item ${i + 1}`);
          })};
      }
  }




    initInput = ():void =>{
      if (this.button) {
        this.button.addEventListener('click', (event) => {
          event.preventDefault();
          _TodoList.addToList(this.input.value);
        });
       }
      
    }


     addToList = (message:string) =>  {
      this.result = '';
      //console.log(`this a ${message}`);

      this.todos.push({
              id: this.todos.length + 1,
              task: message,
              completed: false,
            });
            this.input.value = '';
            //console.table(this.todos); 
            this.disPlayHandler(); 
    }


    disPlayHandler = () => {
      console.log('disPlayHandler');
      this.todos.forEach(el => {
        let item:string = `
        <li> <input type="checkbox" id="${el.id}" > ${el.task} </li>
        `;
        this.result += (item);
      });
      console.log('result',this.result);
      let taskArea = document.querySelector('#listdiv');
      if(taskArea){
        taskArea.innerHTML = _TodoList.result;
        }

        this.addEventHandler();
    }



  }


//main function
 const _TodoList = new TodoList();
 
var all:string = '';
 const displayTask = (tab:Todo[]):void => {
  tab.forEach(element => {
    all.concat(element.task);
  });
  console.log('all',all);
 }









