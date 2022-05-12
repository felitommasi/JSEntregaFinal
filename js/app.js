//popper sidebar
//init popper segun documentacion
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})

//Fetch local
const cargarData = async () => {
	try {
		const respuesta = await fetch("JSON/tabla.json");
		const arrayData = await respuesta.json();
    //?console.log(arrayData);
    pintarOptions(arrayData);

	} catch (error) {
		console.log(error);
	}
};
cargarData();

//seleccionar nodos 
const selectPartida = document.querySelector('#selectPartida');
const selectDestino = document.querySelector('#selectDestino');
const form = document.querySelector('#formCompra');
const btnCalcular = document.querySelector('#btnCalcular');
const btnComprar = document.querySelector('#btnComprar');
const btnCancelar = document.querySelector('#btnCancelar');


//pintar data en options
const pintarOptions = (arrayData) => {	
	for (let i = 0; i < arrayData.length; i++) {
    //crear nodos option
    let optionPartida = document.createElement('option');
    optionPartida.classList.add("partida");

    //agregar nodos al select
    selectPartida.appendChild(optionPartida);
		
    //traer texto de JSON para completar option's
    let estacionesPartida = document.createTextNode(`${arrayData[i].estacion}`);
    optionPartida.append(estacionesPartida);
	} 

  for (let i = 0; i < arrayData.length; i++) {
    //crear nodos option
    let optionDestino = document.createElement('option');
    optionDestino.classList.add("destino");

    //agregar nodos al select
    selectDestino.appendChild(optionDestino);
		
    //traer texto de JSON para completar option's
    let estacionesDestino = document.createTextNode(`${arrayData[i].estacion}`);
    optionDestino.append(estacionesDestino);
	} 
}


form.addEventListener('submit', (e) => {
  e.preventDefault()

  //esperar a que cargue el DOM
  const optionPartida = document.getElementsByTagName('option');
  
  //obtener datos ingresados en select's
  for (let i = 0 ; i < optionPartida.length; i++) {
    console.log(optionPartida.length)
  }


})



/*
let obtenerTextoPartida = optionPartida.addEventListener('click', () =>{
    console.log(selectPartida.value);
    console.log(selectPartida.textContent);
})

 */


