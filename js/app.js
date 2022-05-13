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
    //console.log(arrayData);
    pintarOptions(arrayData);

	} catch (error) {
		console.log(error);
	}
};
cargarData();

//seleccionar nodos 
const selectPartida = document.querySelector('#selectPartida');
const selectDestino = document.querySelector('#selectDestino');
const formulario = document.querySelector('#formCompra');
const btnCalcular = document.querySelector('#btnCalcular');
const btnComprar = document.querySelector('#btnComprar');
//deshabilitado hasta obtener valor de pasaje != a 0
btnComprar.disabled = true;
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

//recuperar valor ingresado en select partida
//TODO: determinar como calcular el valor
selectPartida.addEventListener('change', (e) =>{
  let estacionPartida = e.target.value;
  console.log(estacionPartida);
});

//recuperar valor ingresado en select destino
//TODO: determinar como calcular el valor 
selectDestino.addEventListener('change', (e) =>{
  let estacionDestino = e.target.value;
  console.log(estacionDestino);
});


//TODO: calcular precio pasajes
//?asignar secciones de las estaciones
function asignarSeccionEstacion (){
}



//funcion validacion campos
//TODO: function validaCampos(){}


//TODO: control de form
formulario.addEventListener('submit', (e) =>{
  e.preventDefault;
}); 






