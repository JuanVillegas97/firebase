import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js'
import {
  getFirestore, //* Para hacer la conexion con la base de datos
  doc, //*Para seleccionar solo un documento
  getDoc, //*Para obtener un solo documento
  updateDoc, //*Para actualizar un documento
  addDoc, //* Para agregar un solo documento
  deleteDoc, //* Para eliminar un solo documento
  collection, //* Para crear una tabla o collecion de datos
  getDocs, //* Para obtener los documentos
  onSnapshot, //*Cuando ocurra un cambio
} from 'https://www.gstatic.com/firebasejs/9.8.2/firebase-firestore.js'

const firebaseConfig = {
  apiKey: 'AIzaSyDdz-55FEqTiF7AiL9qmpFt7dW5nbAS_tY',
  authDomain: 'fir-javascript-crud-af4cf.firebaseapp.com',
  projectId: 'fir-javascript-crud-af4cf',
  storageBucket: 'fir-javascript-crud-af4cf.appspot.com',
  messagingSenderId: '937167844449',
  appId: '1:937167844449:web:7ded9577cdb2b8ddf0e620',
}

const app = initializeApp(firebaseConfig)

const db = getFirestore() //*Obtenemos el objeto "base de datos" que me trae la conexion

//*Creamos una funcion que sera utilizada en el archivo index.js la cual guardara una tarea en nuestra base de datos, basicamente recibe como parametro el titulo y descripcion y los agrega como objeto en formato de documento en la collecion de nuestra db llamada tasks
export const saveTask = (title, description) =>
  addDoc(collection(db, 'tasks'), { title, description })

//*Creamos una funcion que regresa todos los documentos en nuestra coleccion
export const getTasks = () => getDocs(collection(db, 'tasks'))

//*Funcion para llamar a la base de datos en tiempo real
export const onGetTasks = (callback) =>
  onSnapshot(collection(db, 'tasks'), callback)

//*Creamos una funcion que elimina un documento dentro de nuestra coleccion
export const deleteTask = (id) => deleteDoc(doc(db, 'tasks', id))

//*Creamos una funcion que regresa un documento dentro de nuestra coleccion
export const getTask = (id) => getDoc(doc(db, 'tasks', id))

//*Creamos una funcion que actualiza un documento dentro de nuestra coleccion
export const updateTask = (id, newFields) =>
  updateDoc(doc(db, 'tasks', id), newFields)
