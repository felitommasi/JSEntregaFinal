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


//crear texto para <option></option> dentro de <select></select> 
//textoOption se reemplaza con texto del JSON


//pintar data en options
const pintarOptions = (arrayData) => {	
	for (let i = 0; i < arrayData.length; i++) {
    let option = document.createElement('option');
    selectPartida.appendChild(option);
		let textoOption = document.createTextNode(`${arrayData[i].estacion}`);
    option.append(textoOption);
	}
}





