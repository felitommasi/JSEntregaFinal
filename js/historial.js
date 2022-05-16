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
//console.log(arrayViajesRealizados);


//recuperar info de local storage
let historialViaje = JSON.parse(sessionStorage.getItem("historial"));
//console.log(historialViaje);

//mostrar historial de viajes por pantalla
function mostrarViajes(historialViaje) {
	if ((historialViaje == null) || (historialViaje == undefined)){
        //crear mensaje de informacion
        console.log(historialViaje);
		console.log("no hay viajes registrados");
	}
    else if ((historialViaje != null) || (historialViaje != undefined)) {
        //ocultar imagen y texto
        document.querySelector("#imagenViajes").style.display = 'none';
        document.querySelector("#textoImagen").style.display = 'none';
		//crear card por cada viaje
        console.log(historialViaje)
		let div = document.createElement("div");
		div.className = "container card shadow-sm row pt-2 pb-2 mt-3";
		div.innerHTML = `
            <p><strong>Pasaje: </strong>${historialViaje.pasaje}</p>
            <p><strong>Partida: </strong>${historialViaje.partida}</p>	
            <p><strong>Destino: </strong>${historialViaje.destino}</p>	
            <p><strong>Valor: </strong>${historialViaje.valor}</p>		
          `;
		cardViajes.appendChild(div);
		console.log("se añadio un viaje al historial");
	}  else{
        console.log('error');
    }
}
//mostrarViajes(historialViaje);

//recuperar valores de local storage
function recuperar() {
	if (historialViaje) {
        console.log(historialViaje)
		historialViaje.forEach((el) => {
			mostrarViajes(el);
			arrayViajesRealizados.push(el);
		});
	}
}
recuperar();
