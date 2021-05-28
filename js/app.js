// Variables
const formulario = document.querySelector("#formulario");
const title = document.querySelector("#title");
const desc = document.querySelector("#description");
const contenidoTask = document.querySelector("#add-tasks");

let tasks = [];






// Eventos

addeventlistener();

function addeventlistener() {
  formulario.addEventListener("submit", enviarTarea);
}

// Cargar El DOM
document.addEventListener('DOMContentLoaded', () => {
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    console.log(tasks);

    crearHTML();
})

// funciones
function enviarTarea(e) {
  e.preventDefault();

  const setTitle = title.value;
  const setDescription = desc.value;
  const idTask = Date.now();

  // validar si existen taras
  if (setTitle === "" && setDescription === "") {
    mostrarError("Debes Agregar una Tarea");

    return;
  }

  // objeto con las tareas.
  const tasksObj = {
    setTitle,
    setDescription,
    idTask,
  };

  tasks = [...tasks, tasksObj];

  // Crear la lista de tareas

  crearHTML();

  // Reiniciar el formulario.

  formulario.reset();
}

// Mostrar el error en DOM

function mostrarError(error) {
  const mensajeError = document.createElement("p");
  mensajeError.textContent = error;
  mensajeError.classList.add("error");

  const contenido = document.querySelector("#contenido");

  contenido.appendChild(mensajeError);

  setTimeout(() => {
    mensajeError.remove();
  }, 3000);
}

// Mostrar el Arreglo de Tareas

// Crear El HTML

function crearHTML() {
  limpiarHTML();

   
  if (tasks.length > 0) {

    tasks.map((task) => {
      const btnEliminar = document.createElement("a");
      btnEliminar.classList.add("btn", "btn-danger", "mt-3")
      btnEliminar.innerText = "Delete";
        
      const div = document.createElement("div");
      div.innerHTML = `
            <div class="card py-4" style="width: 18rem;">
            <div class="card-body">
           
              <h4 class="card-text">${task.setTitle}</h4>
              <p class="card-text">${task.setDescription}</p>
            
            </div>
          </div>
    
            `;
            btnEliminar.onclick = () => {
                eliminarTarea(task.idTask);
              };

              div.appendChild(btnEliminar)
        contenidoTask.appendChild(div);
    });
  }

  saveStorage();
}


// mapear el elemento a (botón eliminar)
function eliminarTarea(idTask) {
    tasks =  tasks.filter((task) => task.idTask !== idTask) 

    crearHTML();
  }


  function saveStorage () {
      localStorage.setItem("tasks", JSON.stringify(tasks));
  }

function limpiarHTML() {
  while (contenidoTask.firstChild) {
    contenidoTask.removeChild(contenidoTask.firstChild);
  }
}
