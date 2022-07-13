export {initButtons};
import {projectList, createProject} from './projects.js'
const container = document.getElementById('container');

function initButtons() {
    const newProjectButton = document.getElementById('add-new-project');
    newProjectButton.addEventListener('click', newProjectForm)
}



function newProjectForm() {
    const addNewProjectBtn = document.getElementById('add-new-project');
    addNewProjectBtn.style.display = "none";
    const projects = document.getElementById('projects');

    const newProjectFormTitle = document.createElement('p');
    newProjectFormTitle.classList.add('title');
    newProjectFormTitle.setAttribute('id', 'new-project-title');
    newProjectFormTitle.textContent = "Create New Project";

    const form = document.createElement('form');
    form.setAttribute('id', 'new-project-form');


    const nameInput = document.createElement('input');
    nameInput.setAttribute('id', 'project-name-input');

    const formBtnsContainer = document.createElement('div');
    formBtnsContainer.setAttribute('id', 'form-btn-container');

    const submitBtn = document.createElement('button');
    submitBtn.classList.add('button');
    submitBtn.setAttribute('id', 'new-project-submit-btn');
    submitBtn.textContent = 'Add';
    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        newProjectSubmit();
    })

    const cancelBtn = document.createElement('button');

    cancelBtn.setAttribute('id', 'new-project-cancel-button');
    cancelBtn.innerHTML = 'Cancel';
    cancelBtn.addEventListener('click', (e) => {
        e.preventDefault();
        projectFormClose();
    })
  

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
    addNewProjectBtn.style.display = "";

}

function newProjectSubmit() {
    
    const projectName = document.getElementById('project-name-input');
    createProject(projectName.value);
    projectFormClose();
    updateProjectList();
}

function updateProjectList() {
    const projects = document.getElementById('projects');
        const div = document.createElement('div');
        div.classList.add('projectlist');
        div.setAttribute('id', `project-[${projectList.length-1}]`);
        div.innerHTML = `${projectList[projectList.length-1].getName()}`;
        projects.append(div);
    }

