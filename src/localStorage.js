import { itemList } from './items.js'
import { projectList } from './ui.js'
import { parseISO } from 'date-fns'
export { save, getLocalStorage }
function save () {
  localStorage.setItem('itemList', JSON.stringify(itemList))
  localStorage.setItem('projectList', JSON.stringify(projectList))
}

function getLocalStorage () {
  itemList = JSON.parse(localStorage.getItem('itemList'))
  projectList = JSON.parse(localStorage.getItem('projectList'))
  if (itemList === null) {
    itemList = []
  }
  if (projectList === null) {
    projectList = []
  }
  for (let i = 0; i < itemList.length; i++) {
    itemList[i].dueDate = parseISO(itemList[i].dueDate, 'yyyy-MM-d', new Date())
  }
}
