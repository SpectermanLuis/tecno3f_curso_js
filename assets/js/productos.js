// let urlApi = "https://www.freetogame.com/api/games"
let datosObtenidos = {}
let datosObtenidos1 = {}
let tarjetasContenedor = document.querySelector("#contenedor_tarjetas")
let chekboxesContenedor = document.querySelector("#contenedor-checkboxes")
let detalleContenedor = document.querySelector("#contenedor_detalle")
let novedadesContenedor = document.querySelector("#seccion-novedades")

// const url = 'https://free-to-play-games-database.p.rapidapi.com/api/filter?tag=3d.mmorpg.fantasy.pvp&platform=pc';
// const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games';
// const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games?platform=pc';
// const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games?platform=pc';

const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=alphabetical';

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '017c8eb89bmsh86d069438677a3ep13ae98jsn43c886387eca',
    'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
  }
};


  traerDatosIndex(url, options);
  traerDatos(url, options);


function traerDatosIndex(url, opcion) {
  // Obtener datos desde la api (url) 
  // Procesar segun que pagina este activada
  fetch(url, opcion)
    .then(response => response.json())
    .then(datosApi => {
      datosObtenidos = datosApi
      console.log(datosObtenidos)
      console.log(datosObtenidos.length)

      // Llamar a la función para obtener 6 números al azar
      let numerosAlAzar1 = seleccionarNumerosAlAzar(12);
      /*      console.log("Números seleccionados al azar: " + numerosAleatorios);
           console.log(datosObtenidos[numerosAleatorios[0]])
           console.log(datosObtenidos[numerosAleatorios[1]])
           console.log(datosObtenidos[numerosAleatorios[2]])
           console.log(datosObtenidos[numerosAleatorios[3]])
           console.log(datosObtenidos[numerosAleatorios[4]])
           console.log(datosObtenidos[numerosAleatorios[5]])
       */
      crearMostrarImagenesNovedad(datosObtenidos, numerosAlAzar1, novedadesContenedor);


    })
    .catch(error => console.log(error))
}

function crearMostrarImagenesNovedad(arregloJuegos, numeros, ubicacion) {

  console.log(numeros)
  console.log(ubicacion)


  let imagenes = ""

  for (let i = 0; i < numeros.length; i++) {
    imagenes += `<div class="imagen-novedad">
  <img src="${arregloJuegos[numeros[i]].thumbnail}" class="imagen-redondeada" alt="Juego 1">
</div>`

  }

  console.log(imagenes)
  ubicacion.innerHTML = imagenes
}




function traerDatos(url, opcion) {
  // Obtener datos desde la api (url) 
  // Procesar segun que pagina este activada
  fetch(url, opcion)
    .then(response => response.json())
    .then(datosApi => {
      datosObtenidos = datosApi
      console.log(datosObtenidos)

      crearMostrarCheckboxes(datosObtenidos, chekboxesContenedor)

      crearMostrarTarjetas(datosObtenidos, tarjetasContenedor);

    })
    .catch(error => console.log(error))
}


function crearMostrarTarjetas(arregloJuegos, ubicacion) {

  let tarjetas = ""

  arregloJuegos.forEach(juego => {
    tarjetas += `<div class="juego">
       <img src="${juego.thumbnail}" alt="Juego 1">
    <p class="descripcion">${juego.title}</p>
    <p class="genero">Genero : ${juego.genre}</p>
    <a href="#" class="boton">Más Detalles</a>
    </div>`

  }) 

  ubicacion.innerHTML = tarjetas

  const botones = ubicacion.querySelectorAll('.boton');

  // Crea un contenedor para el mensaje flotante
  const mensajeFlotante = document.createElement('div');
  mensajeFlotante.className = 'mensaje-flotante';
  mensajeFlotante.textContent = 'Aquí se debería mostrar una página con más detalles del juego. Sin embargo, esta funcionalidad no está implementada porque excede los requisitos del trabajo práctico.';
  document.body.appendChild(mensajeFlotante);

  botones.forEach(boton => {
    boton.addEventListener('click', (event) => {
      event.preventDefault(); // Cancela la acción predeterminada

      const botonRect = boton.getBoundingClientRect(); // Obtén la posición del botón
      mensajeFlotante.style.left = `${botonRect.left}px`;
      mensajeFlotante.style.top = `${botonRect.bottom + window.scrollY + 5}px`;
      mensajeFlotante.style.display = "block"; // Muestra el mensaje

      // Ocultar el mensaje después de 3 segundos
      setTimeout(() => {
        mensajeFlotante.style.display = "none";
      }, 3000);
    });
  });

}


function seleccionarNumerosAlAzar(cantidadNumeros) {

  const numerosDisponibles = [];
  for (let i = 1; i <= 388; i++) {
    numerosDisponibles.push(i);
  }

  const numerosSeleccionados = [];

  while (numerosSeleccionados.length < cantidadNumeros) {
    const indiceAleatorio = Math.floor(Math.random() * numerosDisponibles.length);
    const numeroSeleccionado = numerosDisponibles.splice(indiceAleatorio, 1)[0];
    numerosSeleccionados.push(numeroSeleccionado);
  }

  return numerosSeleccionados;
}


// filtros
const inputTexto = document.querySelector("#texto")
if (inputTexto) {
  inputTexto.addEventListener("input", () => { filtroCruzado() })
}

const divChecks = document.getElementById("contenedor-checkboxes")
if (divChecks) {
  divChecks.addEventListener("change", filtroCruzado)
}

function filtroCruzado() {

  let filtradoPorTexto = filtrarPorTexto(datosObtenidos, inputTexto.value)
  let filtradoPorTextoYCheckboxes = filtrarPorCategoria(filtradoPorTexto)

  if (filtradoPorTextoYCheckboxes.length === 0) {
    // Si no hay resultados, muestra el mensaje de notificación.
    document.getElementById("mensajeNoResultados").style.display = "block";
  } else {
    document.getElementById("mensajeNoResultados").style.display = "none";
  }

  crearMostrarTarjetas(filtradoPorTextoYCheckboxes, tarjetasContenedor)
}

function filtrarPorTexto(arregloDeElementos, texto) {
  let elementosFiltrados = arregloDeElementos.filter(elemento => elemento.title.toLowerCase().includes(texto.toLowerCase()))
  return elementosFiltrados
}

function filtrarPorCategoria(arregloDeElementos) {
  let checkboxes = document.querySelectorAll("input[type='checkbox']")
  let arrayCheckboxes = Array.from(checkboxes)
  let checksPrendidos = arrayCheckboxes.filter(check => check.checked)
  let valoresChecks = checksPrendidos.map(check => check.value)

  if (valoresChecks.length == 0) {
    return arregloDeElementos
  }

  let elementosFiltrados = arregloDeElementos.filter(elemento => valoresChecks.some(categoria => elemento.genre.toLowerCase().includes(categoria.toLowerCase())))

  return elementosFiltrados
}


function crearMostrarCheckboxes(arregloEventos, ubicacion) {

  let categoriasUnicas = []

  let soloCategorias = arregloEventos.map(evento => evento.genre.trim())

  soloCategorias.forEach(categoria => {
    if (!categoriasUnicas.includes(categoria)) {
      categoriasUnicas.push(categoria)
    }


    let checkboxes = "";
    for (categoria of categoriasUnicas) {
      checkboxes += `
    <div class="checkbox-container" >
    <input value="${categoria}" class="custom-checkbox" type="checkbox" id="${categoria}">
        <label class="checkbox-label" for="${categoria}">${categoria}</label>
     </div>`;
    }
    ubicacion.innerHTML = checkboxes

  })
}


// Obtener los elementos del formulario y los campos de entrada
const form = document.querySelector('form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const addressInput = document.getElementById('address');
const messageInput = document.getElementById('message');

// Función para mostrar el mensaje de error
function showError(input, message) {
    const errorSpan = input.nextElementSibling; // Seleccionar el <span> de error
    errorSpan.textContent = message;
    errorSpan.style.display = 'block';
}

// Función para ocultar el mensaje de error
function hideError(input) {
    const errorSpan = input.nextElementSibling;
    errorSpan.style.display = 'none';
}

// Validación del formulario
form.addEventListener('submit', function (e) {
  
  e.preventDefault();
  
  let valid = true;

    // Validación de nombre
    if (nameInput.value.trim() === '') {
        showError(nameInput, 'Campo requerido');
        valid = false;
    } else {
        hideError(nameInput);
    }

    // Validación de correo electrónico
    if (emailInput.value.trim() === '') {
        showError(emailInput, 'Campo requerido');
        valid = false;
    } else if (!/\S+@\S+\.\S+/.test(emailInput.value)) {
        showError(emailInput, 'Correo electrónico inválido');
        valid = false;
    } else {
        hideError(emailInput);
    }

    // Validación de teléfono (debe ser 10 dígitos)
    if (phoneInput.value.trim() === '') {
        showError(phoneInput, 'Campo requerido');
        valid = false;
    } else if (!/^\d{10}$/.test(phoneInput.value)) {
        showError(phoneInput, 'Ingrese un teléfono válido (10 dígitos)');
        valid = false;
    } else {
        hideError(phoneInput);
    }

    // Validación de dirección
    if (addressInput.value.trim() === '') {
        showError(addressInput, 'Campo requerido');
        valid = false;
    } else {
        hideError(addressInput);
    }

    // Validación de mensaje
    if (messageInput.value.trim() === '') {
        showError(messageInput, 'Campo requerido');
        valid = false;
    } else {
        hideError(messageInput);
    }

    // Si hay algún error, evitar que se envíe el formulario
    if (!valid) {
        e.preventDefault(); // Evita el envío del formulario
    }
});

// Evento para el botón de "Borrar" que limpia los mensajes de error
const clearBtn = document.getElementById('clearBtn');
clearBtn.addEventListener('click', function () {
    // Ocultar todos los mensajes de error cuando se hace clic en "Borrar"
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(function (errorMessage) {
        errorMessage.style.display = 'none';
    });
});
