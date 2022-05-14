//constructor viajes realizados
class Viaje {
	constructor(pasaje, partida, destino, valor) {
		this.pasaje = pasaje;
		this.partida = partida;
		this.destino = destino;
		this.valor = valor;
	}
}

//array vacio para guardar viajes realizados
const arrayViajesRealizados = [];
console.log(arrayViajesRealizados);

//!PESTAÑA HISTORIAL VIAJES
//seleccionar nodos
const cardViajes = document.querySelector("#viajesRealizados");

//recuperar info de local storage
let historialViaje = JSON.parse(localStorage.getItem("historial"));
console.log(historialViaje);

//mostrar historial de viajes por pantalla
function mostrarViajes(historialViaje) {
	if (historialViaje != null) {
		for (let i = 0; i < historialViaje.length; i++) {
			//crear card por cada viaje
			let div = document.createElement("div");
			div.className = "container card shadow-sm row";
			div.innerHTML = `
            <p><strong>Pasaje: </strong>${historialViaje[i].pasaje}</p>
            <p><strong>Partida: </strong>${historialViaje[i].partida}</p>	
            <p><strong>Destino: </strong>${historialViaje[i].destino}</p>	
            <p><strong>Valor: </strong>${historialViaje[i].valor}</p>		
          `;
			cardViajes.appendChild(div);
			console.log("se añadio un viaje al historial");
		}
	} else {
		console.log(historialViaje);
		console.log("no hay viajes guardados");
	}
}
