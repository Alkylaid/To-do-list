export { initButtons };
import {load, initAddTaskButton, showTaskButton} from './content.js';
const projectList = [];

function initButtons() {
  const inboxBtn = document.getElementById('inbox-button');

  inboxBtn.addEventListener('click', () => {
    clearActiveClasses();
    document.getElementById('inbox-container').classList.add('active');
    resetContent();
    load();
  });

  const todayBtn = document.getElementById('today-button');
  todayBtn.addEventListener('click', () => {
    clearActiveClasses();
    document.getElementById('today-container').classList.add('active');
    resetContent();
    load();
  });

  const weeklyBtn = document.getElementById('weekly-button');
  weeklyBtn.addEventListener('click', () => {
    clearActiveClasses();
    document.getElementById('weekly-container').classList.add('active');
    resetContent();
    load();
  });

  const newProjectButton = document.getElementById('add-new-project-container');
  newProjectButton.addEventListener('click', newProjectForm);
}

function newProjectForm() {
  const newProjectContainer = document.createElement('div');
  newProjectContainer.setAttribute('id', 'new-project-container');

  const addNewProjectBtn = document.getElementById('add-new-project-container');
  addNewProjectBtn.style.display = 'none';

  const newProjectFormTitle = document.createElement('p');
  newProjectFormTitle.classList.add('title');
  newProjectFormTitle.setAttribute('id', 'new-project-title');
  newProjectFormTitle.textContent = 'Create New Project';

  const form = document.createElement('form');
  form.setAttribute('id', 'new-project-form');

  const nameInput = document.createElement('input');
  nameInput.setAttribute('id', 'project-name-input');
  nameInput.setAttribute('maxlength', '25');
  nameInput.setAttribute('placeholder', 'Enter a project name');

  const formBtnsContainer = document.createElement('div');
  formBtnsContainer.setAttribute('id', 'form-btn-container');

  const submitBtn = document.createElement('button');
  submitBtn.classList.add('button');
  submitBtn.setAttribute('id', 'new-project-submit-btn');
  submitBtn.textContent = 'Add';
  submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    newProjectSubmit();
  });

  const cancelBtn = document.createElement('button');

  cancelBtn.setAttribute('id', 'new-project-cancel-button');
  cancelBtn.classList.add('button');
  cancelBtn.innerHTML = 'Cancel';
  cancelBtn.addEventListener('click', (e) => {
    e.preventDefault();
    projectFormClose();
  });

  form.append(nameInput);
  formBtnsContainer.append(cancelBtn);
  formBtnsContainer.append(submitBtn);
  form.append(formBtnsContainer);
  const title = document.getElementById('add-projects-title');
  title.after(form);
}

function projectFormClose() {
  const projects = document.getElementById('projects');
  const form = document.getElementById('new-project-form');
  projects.removeChild(form);
  const addNewProjectBtn = document.getElementById('add-new-project-container');
  addNewProjectBtn.style.display = '';
}

function newProjectSubmit() {
  const projectName = document.getElementById('project-name-input');
  if (projectList.includes(projectName.value)) {
    alert('Cannot have duplicate project names');
  } else {
    projectList.push(projectName.value);
    projectFormClose();
    updateProjectList();
  }
}

function updateProjectList() {
  const list = document.getElementById('projects-container');
  if (list) {
    list.remove();
  }
  const projects = document.getElementById('projects');
  const projectsContainer = document.createElement('div');
  projectsContainer.setAttribute('id', 'projects-container');
  projects.appendChild(projectsContainer);
  for (let i = 0; i < projectList.length; i++) {
    const project = document.createElement('div');
    project.classList.add('project');
    const frontSpan = document.createElement('span');
    frontSpan.classList.add('fa-solid');
    frontSpan.classList.add('fa-list-check');
    project.appendChild(frontSpan);
    project.value = projectList[i];
    const projectName = document.createElement('div');
    projectName.classList.add('project-name');
    projectName.setAttribute('id', `project-[${i}]`);
    projectName.innerHTML = `${projectList[i]}`;
    
    projectName.addEventListener('click', () => {
      clearActiveClasses();
      project.classList.add('active');
      resetContent();
      load();
    });
    project.appendChild(projectName);
    const backSpan = document.createElement('span');
    backSpan.classList.add('project-delete');
    backSpan.classList.add('fa-regular');
    backSpan.classList.add('fa-circle-xmark');
    backSpan.addEventListener('click', () => deleteProject(i));
    project.appendChild(backSpan);

    projectsContainer.append(project);
  }
}

function deleteProject(index) {
  projectList.splice(index, 1);
  const projects = document.getElementById(`project-[${index}]`);
  projects.remove();
  updateProjectList();
}

function clearActiveClasses() {
  const activeClasses = document.querySelectorAll('.active');
  activeClasses.forEach((active) => {
    active.classList.remove('active');
  });
}

function resetContent() {
  const taskForm = document.getElementById('task-form');
  const addTaskBtn = document.getElementById('add-task-btn');
  if (taskForm) {
    taskForm.remove();
    showTaskButton();}
  }
