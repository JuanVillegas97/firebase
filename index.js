import {
  getTasks,
  updateTask,
  saveTask,
  onGetTasks,
  deleteTask,
  getTask,
} from './firebase.js' //*Importamos nuestras funciones de firebase.js

//*Creamos una variables
let editStatus = false
let id = ''
//* Obtenemos nuestro elemento taskContainer
const taskContainer = document.getElementById('tasks-container')
//*Obtenemos el form de nuestro html
const taskForm = document.getElementById('task-form')

//*Evento que una vez que se este cargando el index.html va estar constantemente esucuchando asincronamente
window.addEventListener('DOMContentLoaded', async () => {
  onGetTasks((querySnapshot) => {
    //*Concatenamos todos nuestros docs en una variable html en un formato
    let html = ''

    querySnapshot.forEach((doc) => {
      const task = doc.data()
      html += `<div class="card card-body mt-2 border-primary">
    <h3 class="h5">${task.title}</h3>
    <p>${task.description}</p>
    <div>
      <button class="btn btn-primary btn-delete" data-id="${doc.id}">
        🗑 Delete
      </button>
      <button class="btn btn-secondary btn-edit" data-id="${doc.id}">
        🖉 Edit
      </button>
    </div>
  </div>`
    })
    //*Empujamos nuesto string dentro del div
    taskContainer.innerHTML = html

    //& Regresa un objeto con todos los elementos con esa clase
    const btnsDelete = taskContainer.querySelectorAll('.btn-delete')
    const btnsEdit = taskContainer.querySelectorAll('.btn-edit')
    //&For each loop que itera a traves de todo el array de botones, agregandoles un eventLister a la espera de ser clickeados mandar el id que tienen
    btnsDelete.forEach((btn) => {
      btn.addEventListener('click', ({ target: { dataset } }) => {
        deleteTask(dataset.id)
      })
    })

    //!Foreach loop que va estar iterando en cada boton de edit agregandole un eventlistener en donde en donde le pase los valores de esa task al input a su vez de cambiar el editStatus y obtener su ID
    btnsEdit.forEach((btn) => {
      btn.addEventListener('click', async ({ target: { dataset } }) => {
        const doc = await getTask(dataset.id)
        const task = doc.data()
        taskForm['task-title'].value = task.title
        taskForm['task-description'].value = task.description
        taskForm['btn-task-save'].innerText = 'Update'
        editStatus = true
        id = doc.id
      })
    })
  })
})

//*Agregamos un evento que va a estare suchando los cambios en dentro del form
taskForm.addEventListener('submit', (e) => {
  e.preventDefault()

  //*Obtenemos estos dos elementos dentro del form
  const title = taskForm['task-title']
  const description = taskForm['task-description']

  //*Le manda los valores que estan en los inputs de nuestro .html
  //!Hacemos esta condicional si editStatus es false entonces llamamos a nuestra funcion de saveTask de lo contrario tiene la funcionabilidad de editar
  if (!editStatus) {
    saveTask(title.value, description.value)
  } else {
    updateTask(id, {
      title: title.value,
      description: description.value,
    })
    taskForm['btn-task-save'].innerText = 'Update'
    editStatus = false
  }

  taskForm.reset()
})
