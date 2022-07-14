export {createItem , itemList, removeItem}

const itemList = []
class Item{
    constructor(name, description, dateCreated, dueDate, priority, project) {
        this.name = name;
        this.description = description;
        this.dateCreated = dateCreated;
        this.dueDate = dueDate;
        this.priority = priority;
        this.isCompleted = false;
        this.project = project;
    }

    getName() {
        return this.name;
    }

    getDescription() {
        return this.description;
    }

    getDateCreated() {
        return this.dateCreated;
    }

    getDueDate() {
        return this.dueDate;
    }

    getPriority() {
        return this.priority;
    }

    setPriority(newPriority) {
        this.priority = newPriority;
    }

    setCompletion(completion) {
        this.isCompleted = completion;
    }

    getCompletion() {
        return this.isCompleted;
    }

    getProject() {
        return this.project;
    }

    
}

function createItem(title, description, dateCreated, dueDate, priority, project) {
    itemList.push(new Item(title, description, dateCreated, dueDate, priority, project));
}

function removeItem(index) {
    itemList.splice(index, 1);
}