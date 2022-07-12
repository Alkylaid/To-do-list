export {createItem}

class Item{
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.isCompleted = false;
    }

    getTitle() {
        return this.title;
    }

    getDescription() {
        return this.description;
    }

    getDueDate() {
        return this.dueDate;
    }

    getPriority() {
        return this. priority;
    }
}

function createItem(title, description, dueDate, priority) {
    return new Item(title, description, dueDate, priority);
}
