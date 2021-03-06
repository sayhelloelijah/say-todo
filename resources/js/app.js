document.addEventListener('DOMContentLoaded', () => {
    const dialog = document.querySelector('.todo__dialog');
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const tasksList = document.querySelector('.todo__list');
    const taskButton = document.querySelector('.todo__add-task');
    const taskForm = document.querySelector('.todo__dialog-form');
    const closeButton = document.querySelector('.todo__dialog-close');
    const deleteAllButton = document.querySelector('.todo__delete-all');
    const day = document.querySelector('.todo__date-day');
    const date = document.querySelector('.todo__date-date');
    const month = document.querySelector('.todo__date-month');
    const year = document.querySelector('.todo__date-year');
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    function addTask(e) {
        e.preventDefault();
        const text = (this.querySelector('.todo__dialog-input')).value;
        const task = {
            text,
            done: false
        }
        if(!task.text) {
            return false;
        }
        tasks.push(task);
        populateList(tasks, tasksList);
        isEmpty();
        localStorage.setItem('tasks', JSON.stringify(tasks));
        this.reset();
        dialog.close();
    }

    function populateList(task = [], tasksList) {
        tasksList.innerHTML = task.map((task, i) => {
          return `
            <li class="todo__list-item ${task.done ? "todo__list-item--done" : ""}" data-index="${i}">
              ${task.text}
              <svg class="todo__list-item-svg" data-index="${i}" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 59 59" style="enable-background:new 0 0 59 59;" xml:space="preserve">
                <g><path d="M29.5,51c0.552,0,1-0.447,1-1V17c0-0.553-0.448-1-1-1s-1,0.447-1,1v33C28.5,50.553,28.948,51,29.5,51z"/>
                <path d="M19.5,51c0.552,0,1-0.447,1-1V17c0-0.553-0.448-1-1-1s-1,0.447-1,1v33C18.5,50.553,18.948,51,19.5,51z"/>
                <path d="M39.5,51c0.552,0,1-0.447,1-1V17c0-0.553-0.448-1-1-1s-1,0.447-1,1v33C38.5,50.553,38.948,51,39.5,51z"/>
                <path d="M52.5,6H38.456c-0.11-1.25-0.495-3.358-1.813-4.711C35.809,0.434,34.751,0,33.499,0H23.5c-1.252,0-2.31,0.434-3.144,1.289 C19.038,2.642,18.653,4.75,18.543,6H6.5c-0.552,0-1,0.447-1,1s0.448,1,1,1h2.041l1.915,46.021C10.493,55.743,11.565,59,15.364,59 h28.272c3.799,0,4.871-3.257,4.907-4.958L50.459,8H52.5c0.552,0,1-0.447,1-1S53.052,6,52.5,6z M21.792,2.681 C22.24,2.223,22.799,2,23.5,2h9.999c0.701,0,1.26,0.223,1.708,0.681c0.805,0.823,1.128,2.271,1.24,3.319H20.553 C20.665,4.952,20.988,3.504,21.792,2.681z M46.544,53.979C46.538,54.288,46.4,57,43.636,57H15.364 c-2.734,0-2.898-2.717-2.909-3.042L10.542,8h37.915L46.544,53.979z"/>
                </g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>
              </svg>
            </li>
          `
        }).join('');
        isEmpty();
    }

    function isEmpty() {
        if(tasksList.innerHTML === "") {
            tasksList.classList.add('todo__list--empty');
            deleteAllButton.classList.add('todo__delete-all--hidden');
        } else {
            tasksList.classList.remove('todo__list--empty');
            deleteAllButton.classList.remove('todo__delete-all--hidden');
        }
    }

    function toggleDone(e) {
        if(!e.target.matches('.todo__list-item')) return;
        const el = e.target;
        const index = el.dataset.index;
        tasks[index].done = !tasks[index].done;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        populateList(tasks, tasksList);
    }

    function deleteTask(e) {
        if(!e.target.matches('.todo__list-item-svg')) return;
        const el = e.target;
        const index = el.dataset.index;
        if(window.confirm(`Are you sure you want to delete this task?`)) {
            el.parentNode.classList.add('todo__list-item--deleting');

            setTimeout(() => {
                tasks.splice(index, 1);
                localStorage.setItem('tasks', JSON.stringify(tasks));
                populateList(tasks, tasksList);
            }, 450);
        }
    }

    function deleteAllTasks() {
        if(window.confirm(`Are you sure you want to delete the list?`)) {
            tasksList.querySelectorAll('.todo__list-item');
            Array.from(tasksList.querySelectorAll('.todo__list-item')).forEach(task => {
                task.classList.add('todo__list-item--deleting');
            });

            setTimeout(() => {
                localStorage.removeItem('tasks');
                location.reload();
            }, 450);
        }
    }

    function setDate() {
        let today = new Date();
        date.innerText = today.getDate();
        day.innerText = days[today.getDay()];
        month.innerText = months[today.getMonth()];
        year.innerText = today.getFullYear();
    }

    setDate();
    populateList(tasks, tasksList);
    taskButton.addEventListener('click', () => {
        dialog.showModal();
    });

    taskForm.addEventListener('submit', addTask);
    dialog.addEventListener('keyup', (e) => {
        if(e.key === 13) {
            e.preventDefault();
        }
    });
    
    function closeModal(e) {
      if(!e.target.matches('.todo__dialog-close')) return;
      dialog.close();
    }

    closeButton.addEventListener('click', closeModal);
    tasksList.addEventListener('click', toggleDone);
    tasksList.addEventListener('click', deleteTask);
    deleteAllButton.addEventListener('click', deleteAllTasks);
});