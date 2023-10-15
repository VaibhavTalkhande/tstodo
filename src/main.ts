import './style.css'

interface Todo{
  title: string;
  isCompleted: boolean;
  readonly id: string;
}

const todos: Array<Todo> = [];
const todosContainer = document.querySelector('.todoContainer') as HTMLDivElement;
const todoInput = document.getElementsByName("title")[0] as HTMLInputElement;
const myForm = document.querySelector('#myform') as HTMLFormElement;

myForm.onsubmit= (e :SubmitEvent) => {
  e.preventDefault();
  const title = todoInput.value;
  const todo: Todo = {
    title,
    isCompleted: false,
    id: Math.random().toString()
  }
  todos.push(todo);
  todoInput.value = '';
  renderTodos();
}
const generateTodoTemplate = (todo: Todo) => {
  return `
   ${todo.isCompleted ? '<strike>' : ''}
    <div class="todo">
      <h3>${todo.title}</h3>
      <p>${todo.isCompleted ? 'Completed' : 'Not Completed'}</p>
      <input type="checkbox"  class="check" dataset-id="${todo.id}"  />
      <button class="delete" dataset-id="${todo.id}">Delete</button>
    </div>
  `
}
const renderTodos = () => {
  todosContainer.innerHTML = '';
  todos.forEach(todo => {
    const todoTemplate = generateTodoTemplate(todo);
    todosContainer.innerHTML += todoTemplate;
  })
}

todosContainer.addEventListener('click', (e: MouseEvent) => {
  const target = e.target as HTMLButtonElement;
  
  const id = target.dataset.id;
  if (target.classList.contains('delete')) {
    const todoIndex = todos.findIndex(todo => todo.id === id);
    todos.splice(todoIndex, 1);
    renderTodos();
  }
}
)

//change event where we can check if the checkbox is checked or not and then change the isCompleted property of the todo object
todosContainer.addEventListener('change', (e: Event) => {
  const target = e.target as HTMLInputElement;
  const id = target.dataset.id;
  const todoIndex = todos.findIndex(todo => todo.id === id);
  todos[todoIndex].isCompleted = !todos[todoIndex].isCompleted;
  renderTodos();
})
