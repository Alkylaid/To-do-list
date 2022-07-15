export { load, loadToday, loadWeekly, initAddTaskButton, showTaskButton };
import { parse, format, addWeeks, compareAsc } from 'date-fns';
import { createItem, itemList, removeItem } from './items.js';
import {getLocalStorage, save} from './localstorage.js'

const content = document.getElementById('content');

function load() {
    getLocalStorage();
  if (!document.getElementById('add-task-btn')) {
    initAddTaskButton();
  }
  if (document.getElementById('task-list')) {
    document.getElementById('task-list').remove();
  }
  if (itemList.length !== 0) {
    const taskList = document.createElement('div');
    taskList.setAttribute('id', 'task-list');
    content.prepend(taskList);
    const activeClasses = document.querySelectorAll('.active');
    activeClasses.forEach((active) => {
      if (active === document.getElementById('today-container')) {
        loadToday();
      } else if (active === document.getElementById('weekly-container')) {
        loadWeekly();
      } else if (active === document.getElementById('inbox-container')) {
        for (let i = 0; i < itemList.length; i++) {
          createTask(i);
        }
      } else {
        loadProjects();
      }
    });
  }
}

function loadToday() {
  for (let i = 0; i < itemList.length; i++) {
    const taskDueDate = format(itemList[i].dueDate, 'MM/dd/yyyy');
    const currentDate = format(new Date(), 'MM/dd/yyyy');
    if (taskDueDate === currentDate) {
      createTask(i);
    }
  }
}

function loadWeekly() {
  for (let i = 0; i < itemList.length; i++) {
    const today = new Date();
    const nextWeek = addWeeks(today, 1);
    const taskDueDate = itemList[i].dueDate;
    const comparedDates = compareAsc(taskDueDate, nextWeek);
    if (comparedDates === -1 || comparedDates === 0) {
      createTask(i);
    }
  }
}

function loadProjects() {
  const activeProject = document.querySelector('.active').value;

  for (let i = 0; i < itemList.length; i++) {
    if (itemList[i].project === activeProject) {
      createTask(i);
    }
  }
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
  taskName.required = true;

  const dateLabel = document.createElement('label');
  dateLabel.innerHTML = 'Due Date:';
  taskForm.appendChild(dateLabel);

  const date = document.createElement('input');
  date.setAttribute('type', 'date');
  date.setAttribute('id', 'date-input-field');

  date.value = format(new Date(), 'yyyy-MM-d');


  taskForm.appendChild(date);

  const descLabel = document.createElement('label');
  descLabel.innerHTML = 'Description:';
  taskForm.appendChild(descLabel);

  const description = document.createElement('textarea');
  description.style.resize = 'none';
  description.setAttribute('id', 'description-input-field');
  taskForm.appendChild(description);

  const priorityLabel = document.createElement('label');
  priorityLabel.innerHTML = 'Priority:';
  taskForm.appendChild(priorityLabel);

  const priorityContainer = document.createElement('div');
  const priority = document.createElement('button');
  priority.setAttribute('id', 'priority-box-form');
  priority.classList.add('priority-box');
  priority.value = 'low';
  priority.addEventListener('click', (e) => {
    e.preventDefault();
    changePriority(priority);
  });

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
  });
  buttonContainer.appendChild(cancelButton);

  const submitButton = document.createElement('button');
  submitButton.setAttribute('type', 'submit');
  submitButton.setAttribute('id', 'task-add-button');
  submitButton.innerHTML = 'Add';
  submitButton.addEventListener('click', (e) => {
    if (taskName.value === ''){
    taskForm.reportValidity();
    } else {
    addTasks();
    taskForm.remove();
    showTaskButton();
    save();
    load();
    }

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

function changePriority(node) {
  const priorityText = document.getElementById('priority-text');
  if (node.value === 'low') {
    node.style.background = 'yellow';
    node.value = 'med';
    if (node === document.getElementById('priority-box-form')) {
      priorityText.innerHTML = 'Med';
    }
  } else if (node.value === 'med') {
    node.style.background = 'red';
    node.value = 'high';
    if (node === document.getElementById('priority-box-form')) {
      priorityText.innerHTML = 'High';
    }
  } else if (node.value === 'high') {
    node.style.background = 'green';
    node.value = 'low';
    if (node === document.getElementById('priority-box-form')) {
      priorityText.innerHTML = 'Low';
    }
  }
}

function addTasks() {
  const taskName = document.getElementById('task-name-field').value;
  const date = parse(
    document.getElementById('date-input-field').value,
    'yyyy-MM-d',
    new Date()
  );
  const description = document.getElementById('description-input-field').value;
  const priority = document.getElementById('priority-box-form').value;
  const currentProject = document.querySelector('.active').value;
  createItem(
    taskName,
    description,
    date,
    priority,
    currentProject
  );

}

function createTask(index) {
  const taskList = document.getElementById('task-list');
  const task = document.createElement('div');
  task.classList.add('task-item');
  task.setAttribute('id', `task-item-${index}`);
  const circle = document.createElement('span');

  circle.classList.add('fa-regular');
  if (!itemList[index].isCompleted) {
    circle.classList.add('fa-circle');
  } else {
    circle.classList.add('fa-circle-check');
  }
  circle.setAttribute('id', `completion-circle-${index}`);
  circle.addEventListener('click', () => {
    toggleTaskCompletion(index);
  });
  task.appendChild(circle);

  const taskName = document.createElement('p');
  taskName.innerHTML = itemList[index].name;
  task.appendChild(taskName);

  const dueDate = document.createElement('p');
  dueDate.innerHTML = `Due Date: ${format(
    itemList[index].dueDate,
    'MM/dd/yyyy'
  )}`;
  task.appendChild(dueDate);

  const priorityDiv = document.createElement('div');
  const priority = document.createElement('p');
  priority.innerHTML = 'Priority: ';
  const priorityBtn = document.createElement('button');
  priorityBtn.value = itemList[index].priority;
  priorityBtn.setAttribute('id', `priority-box-${index}`);
  priorityBtn.classList.add('priority-box');

  if (itemList[index].priority === 'low') {
    priorityBtn.style.background = 'green';
  } else if (itemList[index].priority === 'med') {
    priorityBtn.style.background = 'yellow';
  } else if (itemList[index].priority === 'high') {
    priorityBtn.style.background = 'red';
  }

  priorityDiv.appendChild(priority);
  priorityDiv.appendChild(priorityBtn);

  task.appendChild(priorityDiv);
  const taskEditContainer = document.createElement('div');
  taskEditContainer.setAttribute('id', 'task-edit-container');
  const editButton = document.createElement('span');
  editButton.classList.add('fa-regular');
  editButton.classList.add('fa-pen-to-square');
  editButton.addEventListener('click', () => {
    hideTaskButton();
    viewTask(index)});
  
  const deleteBtn = document.createElement('span');
  deleteBtn.classList.add('fa-regular');
  deleteBtn.classList.add('fa-trash-can');
  deleteBtn.addEventListener('click', () => {
    deleteTask(index);
  });
  taskEditContainer.appendChild(editButton);
  taskEditContainer.appendChild(deleteBtn);
  task.appendChild(taskEditContainer);
  taskList.appendChild(task);
 
}

function toggleTaskCompletion(index) {
  const circle = document.getElementById(`completion-circle-${index}`);
  if (!itemList[index].isCompleted) {
    circle.classList.remove('fa-circle');
    circle.classList.add('fa-circle-check');
    itemList[index].isCompleted = true;
  } else if (itemList[index].isCompleted) {
    circle.classList.remove('fa-circle-check');
    circle.classList.add('fa-circle');
    itemList[index].isCompleted = false;
  }
}

function deleteTask(index) {
  removeItem(index);
  save();
  load();

}

function viewTask(index) {
  const taskViewWindow = document.createElement('form');
  taskViewWindow.setAttribute('id', 'task-view-window');
  const taskItem = document.getElementById(`task-item-${index}`);
  const taskList = document.getElementById('task-list');

  const nameLabel = document.createElement('label');
  nameLabel.innerHTML = 'Name:';

  taskViewWindow.appendChild(nameLabel);
  const taskName = document.createElement('input');
  taskName.setAttribute('id', 'task-name-field');
  taskName.value = itemList[index].name;
  taskName.disabled = true;
  taskName.required = true;
  taskViewWindow.appendChild(taskName);

  const dateLabel = document.createElement('label');
  dateLabel.innerHTML = 'Due Date:';
  taskViewWindow.appendChild(dateLabel);

  const date = document.createElement('input');
  date.setAttribute('type', 'date');
  date.setAttribute('id', 'date-input-field');

  date.value = format(itemList[index].dueDate, 'yyyy-MM-d');
  date.disabled = true;
  if (
    document.querySelector('.active') ===
    document.getElementById('weekly-container')
  ) {
    const maxDate = format(addWeeks(new Date(), 1), 'yyyy-MM-d');
    date.max = maxDate;
    date.min = date.value;
  } else if (
    document.querySelector('.active') ===
    document.getElementById('today-container')
  ) {
    date.max = date.value;
    date.min = date.value;
  }

  taskViewWindow.appendChild(date);

  const descLabel = document.createElement('label');
  descLabel.innerHTML = 'Description:';
  taskViewWindow.appendChild(descLabel);

  const description = document.createElement('textarea');
  description.style.resize = 'none';
  description.value = itemList[index].description;
  description.setAttribute('id', 'description-input-field');
  description.disabled = true;
  taskViewWindow.appendChild(description);

  const priorityLabel = document.createElement('label');
  priorityLabel.innerHTML = 'Priority:';
  taskViewWindow.appendChild(priorityLabel);

  const priorityContainer = document.createElement('div');
  const priority = document.createElement('button');
  priority.setAttribute('id', 'priority-box-form');
  priority.classList.add('priority-box');
  priority.value = itemList[index].priority;
  
  priority.disabled = true;
  
  const span = document.createElement('span');
  span.setAttribute('id', 'priority-text');
  
  if (itemList[index].priority === 'low') {
    priority.style.background = 'green';
    span.innerHTML = 'Low';
  } else if (itemList[index].priority === 'med') {
    span.innerHTML = 'Med';
    priority.style.background = 'yellow';
  } else if (itemList[index].priority === 'high') {
    priority.style.background = 'red';
    span.innerHTML = 'High';
  }

  priority.addEventListener('click', (e) => {
    e.preventDefault();
    changePriority(priority);
  });

  priorityContainer.appendChild(priority);
  priorityContainer.appendChild(span);
  taskViewWindow.appendChild(priorityContainer);

  taskList.replaceChild(taskViewWindow, taskItem);

  const buttonContainer = document.createElement('div');
  buttonContainer.setAttribute('id', 'view-form-button-container');
  const closeButton = document.createElement('button');
  closeButton.setAttribute('id', 'task-close-button');
  closeButton.innerHTML = 'Close';
  closeButton.addEventListener('click', (e) => {
    e.preventDefault();
    load();
    showTaskButton();
  });
  buttonContainer.appendChild(closeButton);

  const editButton = document.createElement('button');
  editButton.setAttribute('id', 'edit-button');
  editButton.innerHTML = 'Edit';
  editButton.addEventListener('click', (e) => {
    e.preventDefault();
    taskName.disabled = false;
    description.disabled = false;
    date.disabled = false;
    priority.disabled = false;
    saveButton.style.display = '';
    editButton.style.display = 'none';
  });
  buttonContainer.appendChild(editButton);

  const saveButton = document.createElement('button');
  saveButton.setAttribute('id', 'save-button');
  saveButton.innerHTML = 'Save';
  saveButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (taskName.value === ''){
      taskViewWindow.reportValidity();
      } else {
    taskName.disabled = true;
    description.disabled = true;
    date.disabled = true;
    priority.disabled = true;
    itemList[index].name = taskName.value;
    itemList[index].dueDate = parse(date.value, 'yyyy-MM-d', new Date());
    itemList[index].description = description.value;
    itemList[index].priority = priority.value;
    save();
    load();}
  });
  saveButton.style.display = 'none';
  buttonContainer.appendChild(saveButton);

  taskViewWindow.appendChild(buttonContainer);
}
