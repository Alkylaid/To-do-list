export { initButtons };
import { projectList, createProject, removeProject } from './projects.js';
const container = document.getElementById('container');

function initButtons() {
  const newProjectButton = document.getElementById('add-new-project');
  newProjectButton.addEventListener('click', newProjectForm);
}

function newProjectForm() {
  const addNewProjectBtn = document.getElementById('add-new-project');
  addNewProjectBtn.style.display = 'none';
  const projects = document.getElementById('projects');

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
  const addNewProjectBtn = document.getElementById('add-new-project');
  addNewProjectBtn.style.display = '';
}

function newProjectSubmit() {
  const projectName = document.getElementById('project-name-input');
  if(projectName.value === '') {
    createProject("Default");
  } else {
  createProject(projectName.value);}
  projectFormClose();
  updateProjectList();
}

function updateProjectList() {

  const list = document.querySelectorAll('.projectList');
  list.forEach((project) => project.remove());
  const projects = document.getElementById('projects');
  for (let i = 0; i < projectList.length; i++) {
    const div = document.createElement('div');
    div.classList.add('projectList');
    div.setAttribute('id', `project-[${i}]`);
    div.innerHTML = `${projectList[i].getName()}`;
    const span = document.createElement('span');
    span.classList.add('project-delete');

    span.addEventListener('click', () => deleteProject(i));
    div.appendChild(span);

    projects.append(div);
  }
  
}


function deleteProject(index) {
    removeProject(index);
    const projects = document.getElementById(`project-[${index}]`);
    projects.remove();
    updateProjectList();

}