export { createItem, itemList, removeItem }

const itemList = []
class Item {
  constructor (name, description, dueDate, priority, project) {
    this.name = name
    this.description = description
    this.dueDate = dueDate
    this.priority = priority
    this.isCompleted = false
    this.project = project
  }

  getName () {
    return this.name
  }

  setName (newName) {
    this.name = newName
  }

  getDescription () {
    return this.description
  }

  setDescription (newDescription) {
    this.description = newDescription
  }

  getDueDate () {
    return this.dueDate
  }

  setDueDate (newDate) {
    this.dueDate = newDate
  }

  getPriority () {
    return this.priority
  }

  setPriority (newPriority) {
    this.priority = newPriority
  }

  setCompletion (completion) {
    this.isCompleted = completion
  }

  getCompletion () {
    return this.isCompleted
  }

  getProject () {
    return this.project
  }
}

function createItem (title, description, dueDate, priority, project) {
  itemList.push(new Item(title, description, dueDate, priority, project))
}

function removeItem (index) {
  itemList.splice(index, 1)
}
