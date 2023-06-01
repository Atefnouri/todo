interface Todo {
  id: number;
  task: string;
  completed: boolean;
}

class TodoList {
    private todos: Todo[];
  
    constructor() {
      this.todos = [];
        
      alert("test");
    
    }


     addToList = (message:string) =>  {

      console.log(`this a ${message}`);
  
    }

  }

 const _TodoList = new TodoList(); 
