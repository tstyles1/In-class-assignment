class TodoList extends HTMLElement {
  constructor() {
    super();
    const template = document.createElement('template');
    template.innerHTML = `
      <div>
        <h2>Todo List</h2>
        <button id="add-todo">Add Todo</button>
        <p>Number of Tasks: <span id="task-count"></span></p>
        <ul id="todo-items"></ul>
      </div>
    `;
    const templateContent = template.content;

    this.attachShadow({mode: 'open'}).appendChild(templateContent.cloneNode(true));
    this.taskCount = 0;

    this.shadowRoot.querySelector('#add-todo').addEventListener('click', () => {
      this.addTodo();
    });

    this.shadowRoot.querySelector('#todo-items').addEventListener('click', (event) => {
      if (event.target.tagName === 'LI') {
        this.completeTask(event.target);
      }
    });
  }

  addTodo() {
    const newItem = document.createElement('li');
    newItem.textContent = `Task ${Math.floor(Math.random() * 100)}`;
    this.shadowRoot.querySelector('#todo-items').appendChild(newItem);
    this.updateTaskCount(1);
  }

  completeTask(item) {
    item.remove();
    this.updateTaskCount(-1);
  }

  updateTaskCount(change) {
    this.taskCount += change;
    this.shadowRoot.querySelector('#task-count').textContent = this.taskCount;
  }
}

customElements.define('todo-list', TodoList);
