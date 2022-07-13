export {loadInbox};
const content = document.getElementById('content');

function loadInbox() {
   initAddTaskButton();

}


function initAddTaskButton() {
    const addTaskBtn = document.createElement('button');
    addTaskBtn.setAttribute('id', 'add-task-btn');
    addTaskBtn.classList.add('fa-solid');
    addTaskBtn.classList.add('fa-plus');
    addTaskBtn.addEventListener('click', () => {
        hideTaskButton();
        initTaskForm();
    });
    content.appendChild(addTaskBtn);
}


function initTaskForm() {
    const taskForm = document.createElement('form');
    taskForm.setAttribute('id', 'task-form');
    const nameLabel = document.createElement('label');
    nameLabel.innerHTML = 'Name:';

    taskForm.appendChild(nameLabel);

    const taskName = document.createElement('input');
    taskName.setAttribute('id', 'task-name-field');
    taskForm.appendChild(taskName);

    const dateLabel = document.createElement('label');
    dateLabel.innerHTML = 'Due Date:'
    taskForm.appendChild(dateLabel);

    const date = document.createElement('input');
    date.setAttribute('type', 'date');
    date.setAttribute('id', 'date-input-field');
    taskForm.appendChild(date);

    const descLabel = document.createElement('label');
    descLabel.innerHTML = 'Description:';
    taskForm.appendChild(descLabel);

    const description = document.createElement('input');
    description.setAttribute('id', 'description-input-field');
    taskForm.appendChild(description);

    const priorityLabel = document.createElement('label');
    priorityLabel.innerHTML = 'Priority:'
    taskForm.appendChild(priorityLabel);

    const priorityContainer = document.createElement('div')
    const priority = document.createElement('button');
    priority.setAttribute('id', 'priority-box');
    priority.value = 'low';
    priority.addEventListener('click', (e) => {
        e.preventDefault();
        changePriority();
    })

    const span = document.createElement('span');
    span.setAttribute('id', 'priority-text');
    span.innerHTML = 'Low';
    priorityContainer.appendChild(priority);
    priorityContainer.appendChild(span);
    taskForm.appendChild(priorityContainer);

    content.appendChild(taskForm);
    
    const buttonContainer = document.createElement('div');
    buttonContainer.setAttribute('id', 'task-form-button-container');
    const cancelButton = document.createElement('button');
    cancelButton.setAttribute('id', 'task-cancel-button');
    cancelButton.innerHTML = 'Cancel';
    cancelButton.addEventListener('click', (e) => {
        e.preventDefault();
        taskForm.remove();
        showTaskButton();
    })
    buttonContainer.appendChild(cancelButton);

    const submitButton = document.createElement('button');
    submitButton.setAttribute('id', 'task-add-button');
   submitButton.innerHTML = 'Add';
   submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    addTasks();
   });
    buttonContainer.appendChild(submitButton);
    taskForm.appendChild(buttonContainer);
}

function hideTaskButton() {
    const addTaskBtn = document.getElementById('add-task-btn');
    addTaskBtn.style.display = 'none';
}

function showTaskButton() {
    const addTaskBtn = document.getElementById('add-task-btn');
    addTaskBtn.style.display = '';
}

function changePriority() {
       const priority = document.getElementById('priority-box');
       const priorityText = document.getElementById('priority-text');
       if (priority.value === 'low') {
        priority.style.background = 'yellow';
        priority.value = 'med'
        priorityText.innerHTML = 'Med'
       } else if (priority.value === 'med') {
        priority.style.background = 'red';
        priority.value = 'high'
        priorityText.innerHTML = 'High'
       } else if (priority.value === 'high') {
        priority.style.background = 'green'
        priority.value = 'low'
        priorityText.innerHTML = 'Low'
       }

}

function addTasks() {
    const name = document.getElementById('task-name-field').value;
    const date = document.getElementById('date-input-field').value;
    const description = document.getElementById('description-input-field').value;
    const priority = document.getElementById('priority-box').value;

    console.log (name, date, description, priority);
}