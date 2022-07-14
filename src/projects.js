export{projectList, createProject, addProject, removeProject, mergeTaskLists}

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

    remove(index) {
        this.toDos.splice(index, 1);
    }

    getName() {
        return this.name;
    }

    getLength() {
        return this.toDos.length;
    }

    getList() {
        return this.toDos;
    }
}

function createProject(name) {
    addProject(new Project(name));
}

function addProject(project) {
    projectList.push(project);
}

function removeProject(index) {
    projectList.splice(index, 1);

}

function mergeTaskLists(){
    let taskList = [];
    for (let i = 0; i < projectList.length; i++) {
        taskList.push(...projectList[i].getList());
    }
    return taskList;
}
