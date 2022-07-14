export {createItem}

class Item{
    constructor(name, description, dateCreated, dueDate, priority) {
        this.name = name;
        this.description = description;
        this.dateCreated = dateCreated;
        this.dueDate = dueDate;
        this.priority = priority;
        this.isCompleted = false;
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

    
}

function createItem(title, description, dateCreated, dueDate, priority) {
    return new Item(title, description, dateCreated, dueDate, priority);
}
