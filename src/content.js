export { load, loadToday, loadWeekly, setCurrentProject };
import { parse, format, addWeeks, compareAsc } from 'date-fns';
import { projectList, mergeTaskLists } from './projects.js';
import { createItem, itemList, removeItem } from './items.js';

const content = document.getElementById('content');
let currentProjectIndex = 0;

function setCurrentProject(index) {
  currentProjectIndex = index;
}

function load() {
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
    const taskDueDate = format(itemList[i].getDueDate(), 'MM/dd/yyyy');
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
    const taskDueDate = itemList[i].getDueDate();
    const comparedDates = compareAsc(taskDueDate, nextWeek);
    if (comparedDates === -1 || comparedDates === 0) {
      createTask(i);
    }
  }
}

function loadProjects() {
    const activeProject = document.querySelector('.active').value;

    for (let i = 0; i < itemList.length; i++) {
        if (itemList[i].getProject() === activeProject) {
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

  const description = document.createElement('input');
  description.setAttribute('id', 'description-input-field');
  taskForm.appendChild(description);

  const priorityLabel = document.createElement('label');
  priorityLabel.innerHTML = 'Priority:';
  taskForm.appendChild(priorityLabel);

  const priorityContainer = document.createElement('div');
  const priority = document.createElement('button');
  priority.classList.add('priority-box');
  priority.classList.add('priority-box-form');
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
  submitButton.setAttribute('id', 'task-add-button');
  submitButton.innerHTML = 'Add';
  submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    addTasks();
    taskForm.remove();
    showTaskButton();
    load();
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
  const priority = node;

  const priorityText = document.getElementById('priority-text');
  if (priority.value === 'low') {
    priority.style.background = 'yellow';
    priority.value = 'med';
    if (priorityText) {
      priorityText.innerHTML = 'Med';
    }
  } else if (priority.value === 'med') {
    priority.style.background = 'red';
    priority.value = 'high';
    if (priorityText) {
      priorityText.innerHTML = 'High';
    }
  } else if (priority.value === 'high') {
    priority.style.background = 'green';
    priority.value = 'low';
    if (priorityText) {
      priorityText.innerHTML = 'Low';
    }
  }
}

function addTasks() {
  const taskName = document.getElementById('task-name-field').value;
  const dateCreated = new Date();
  const date = parse(
    document.getElementById('date-input-field').value,
    'yyyy-MM-d',
    new Date()
  );
  const description = document.getElementById('description-input-field').value;
  const priority = document.querySelector('.priority-box-form').value;
  const currentProject = document.querySelector('.active').value;
  createItem(taskName, description, dateCreated, date, priority, currentProject);
}

function createTask(index) {
  const taskList = document.getElementById('task-list');
  const task = document.createElement('div');
  task.classList.add('task-item');
  const circle = document.createElement('span');
  circle.classList.add('fa-regular');
  circle.classList.add('fa-circle');
  circle.setAttribute('id', `completion-circle-${index}`);
  circle.addEventListener('click', () => {
    toggleTaskCompletion(index);
  });
  task.appendChild(circle);

  const taskName = document.createElement('p');
  taskName.innerHTML = itemList[index].getName();
  task.appendChild(taskName);

  const dueDate = document.createElement('p');
  dueDate.innerHTML = `Due Date: ${format(
    itemList[index].getDueDate(),
    'MM/dd/yyyy'
  )}`;
  task.appendChild(dueDate);

  const priorityDiv = document.createElement('div');
  const priority = document.createElement('p');
  priority.innerHTML = 'Priority: ';
  const priorityBtn = document.createElement('button');
  priorityBtn.value = itemList[index].getPriority();
  priorityBtn.setAttribute('id', `priority-box-${index}`);
  priorityBtn.classList.add('priority-box');

  if (itemList[index].getPriority() === 'low') {
    priorityBtn.style.background = 'green';
  } else if (itemList[index].getPriority() === 'med') {
    priorityBtn.style.background = 'yellow';
  } else if (itemList[index].getPriority() === 'high') {
    priorityBtn.style.background = 'red';
  }

  priorityBtn.addEventListener('click', () => {
    changePriority(priorityBtn);

    itemList[index].setPriority(priorityBtn.value);
  });

  priorityDiv.appendChild(priority);
  priorityDiv.appendChild(priorityBtn);

  task.appendChild(priorityDiv);

  const deleteBtn = document.createElement('span');
  deleteBtn.classList.add('fa-regular');
  deleteBtn.classList.add('fa-trash-can');
  deleteBtn.addEventListener('click', () => {
    deleteTask(index);
  });
  task.appendChild(deleteBtn);
  taskList.appendChild(task);
}

function toggleTaskCompletion(index) {
  const circle = document.getElementById(`completion-circle-${index}`);
  if (!itemList[index].getCompletion()) {
    circle.classList.remove('fa-circle');
    circle.classList.add('fa-circle-check');
    itemList[index].setCompletion(true);
  } else if (itemList[index].getCompletion()) {
    circle.classList.remove('fa-circle-check');
    circle.classList.add('fa-circle');
    itemList[index].setCompletion(false);
  }
}

function deleteTask(index) {
  removeItem(index);
  load();
}
