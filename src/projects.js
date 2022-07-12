export{projectList, createProject, addProject, removeProject}

const projectList =[];

class Project{
    constructor(name) {
        this.name = name;
        this.toDos = [];
    }

    add(item) {
        this.toDos.push(item);
    }

    get(item) {
        return this.toDos[item];
    }

    remove(item) {
        const index = this.toDos.indexOf(item);
        this.toDos.splice(index, 1);
    }
}

function createProject(name) {
    addProject(new Project(name));
}

function addProject(project) {
    projectList.push(project);
}

function removeProject(project) {
    const index = projectList.indexOf(project);
    projectList.splice(index, 1);
}

