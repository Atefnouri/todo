interface Todo {
  id: number;
  task: string;
  completed: boolean;
}

class TodoList {
    public todos: Todo[];
    public result:string = "";
  
    constructor() {
      this.todos = [];
    console.log('App is running ');
    }


     addToList = (message:string) =>  {
      this.result = '';
      console.log(`this a ${message}`);

      this.todos.push({
              id: this.todos.length + 1,
              task: message,
              completed: false,
            });

            console.table(this.todos); 
            this.disPlayHandler(); 
    }


    disPlayHandler = () => {
      console.log('disPlayHandler');
      this.todos.forEach(el => {
        let item:string = `<li>${el.task}</li> \n`;
        this.result += (item);
      });
      console.log('result',this.result);
      let taskArea = document.querySelector('#listdiv');
      if(taskArea){
        taskArea.innerHTML = _TodoList.result;
        }
    }

   

  }


//main function
 const _TodoList = new TodoList();

 const button = document.querySelector('#addButton');
 const input = document.querySelector('#task') as HTMLInputElement;

 
var all:string = '';
 const displayTask = (tab:Todo[]):void => {
  tab.forEach(element => {
    all.concat(element.task);
  });
  console.log('all',all);
 }


 if (button) {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    _TodoList.addToList(input.value);
  });

  

 }







