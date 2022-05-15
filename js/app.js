//!PESTAÑA COMPRA PASAJE
//popper sidebar
//init popper segun documentacion
var tooltipTriggerList = [].slice.call(
	document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
	return new bootstrap.Tooltip(tooltipTriggerEl);
});

window.onload = function () {
	//Fetch local
	const cargarData = async () => {
		try {
			const respuesta = await fetch("JSON/tabla.json");
			const arrayData = await respuesta.json();
			//console.log(arrayData);
			pintarOptions(arrayData);
			asignarSeccionEstacion(arrayData);
		} catch (error) {
			console.log(error);
		}
	};
	cargarData();

	//seleccionar nodos
	const selectPartida = document.querySelector("#selectPartida");
	const selectDestino = document.querySelector("#selectDestino");
	const selectPasaje = document.querySelector("#tipoPasaje");
	const formulario = document.querySelector("#formCompra");
	const inputPrecio = document.querySelector("#precioTotalInput");
	const btnCalcular = document.querySelector("#btnCalcular");
	const btnComprar = document.querySelector("#btnComprar");
	//deshabilitado hasta obtener valor de pasaje != a 0
	btnComprar.disabled = true;
	const btnCancelar = document.querySelector("#btnCancelar");

	//pintar data en options
	const pintarOptions = (arrayData) => {
		for (let i = 0; i < arrayData.length; i++) {
			//crear nodos option
			let optionPartida = document.createElement("option");
			optionPartida.classList.add("partida");

			//agregar nodos al select
			selectPartida.appendChild(optionPartida);

			//traer texto de JSON para completar option's
			let estacionesPartida = document.createTextNode(
				`${arrayData[i].estacion}`
			);
			optionPartida.append(estacionesPartida);
		}

		for (let i = 0; i < arrayData.length; i++) {
			//crear nodos option
			let optionDestino = document.createElement("option");
			optionDestino.classList.add("destino");

			//agregar nodos al select
			selectDestino.appendChild(optionDestino);

			//traer texto de JSON para completar option's
			let estacionesDestino = document.createTextNode(
				`${arrayData[i].estacion}`
			);
			optionDestino.append(estacionesDestino);
		}
	};

	//recuperar valor ingresado en select partida
	selectPartida.addEventListener("change", (e) => {
		estacionPartida = e.target.value;
		console.log(estacionPartida);
	});

	//recuperar valor ingresado en select destino
	selectDestino.addEventListener("change", (e) => {
		estacionDestino = e.target.value;
		console.log(estacionDestino);
	});

	//obtener secciones de las estaciones
	const asignarSeccionEstacion = (arrayData) =>
		btnCalcular.addEventListener("click", () => {
			//console.table(arrayData);

			//obtener seccion de estacion de partida
			let obtenerSeccionPartida = arrayData.find(
				(e) => e.estacion == estacionPartida
			);
			seccionPartida = obtenerSeccionPartida.seccion;
			console.log(seccionPartida);

			//obtener seccion de estacion de destino
			let obtenerSeccionDestino = arrayData.find(
				(e) => e.estacion == estacionDestino
			);
			seccionDestino = obtenerSeccionDestino.seccion;
			console.log(seccionDestino);

			if (selectPasaje.value == 1) {
				obtenerValorPasaje();
				//habilitar btn de compra
				btnComprar.disabled = false;
			} else if (selectPasaje.value == 2) {
				obtenerIdaYVuelta();
				//habilitar btn de compra
				btnComprar.disabled = false;
			} else {
				console.log("error");
			}
		});

	//variables con valores recuperados
	let estacionPartida; //nombre de estacion seleccionada
	let estacionDestino; //nombre de estacion seleccionada
	let seccionPartida; //seccion de la estacion
	let seccionDestino; //seccion de la estacion

	//funcion para calcular el valor del pasaje Solo Ida
	function obtenerValorPasaje() {
		//validacion para no seleccionar la misma estacion
		if (estacionPartida == estacionDestino) {
			console.log("error, seleccione estaciones distintas");
			inputPrecio.value = `\$${(00, 00)}`;
			//TODO: agregar sweet alert
		} else if (
			seccionPartida == 1 &&
			seccionDestino == 1 &&
			selectPasaje.value == 1
		) {
			inputPrecio.value = `\$${50}`;
		} else if (
			(seccionPartida == 1 && seccionDestino == 2) ||
			(seccionDestino == 1 && seccionPartida == 2 && selectPasaje.value == 1)
		) {
			inputPrecio.value = `\$${70}`;
		} else if (
			(seccionPartida == 1 && seccionDestino == 3) ||
			(seccionDestino == 1 && seccionPartida == 3 && selectPasaje.value == 1)
		) {
			inputPrecio.value = `\$${90}`;
		} else if (
			(seccionPartida == 2 && seccionDestino == 1) ||
			(seccionDestino == 2 && seccionPartida == 1 && selectPasaje.value == 1)
		) {
			inputPrecio.value = `\$${70}`;
		} else if (
			seccionPartida == 2 &&
			seccionDestino == 2 &&
			selectPasaje.value == 1
		) {
			inputPrecio.value = `\$${50}`;
		} else if (
			(seccionPartida == 2 && seccionDestino == 3) ||
			(seccionDestino == 2 && seccionPartida == 3 && selectPasaje.value == 1)
		) {
			inputPrecio.value = `\$${70}`;
		} else if (
			(seccionPartida == 3 && seccionDestino == 1) ||
			(seccionDestino == 3 && seccionPartida == 1 && selectPasaje.value == 1)
		) {
			inputPrecio.value = `\$${90}`;
		} else if (
			(seccionPartida == 3 && seccionDestino == 2) ||
			(seccionDestino == 3 && seccionPartida == 2 && selectPasaje.value == 1)
		) {
			inputPrecio.value = `\$${70}`;
		} else if (
			seccionPartida == 3 &&
			seccionDestino == 3 &&
			selectPasaje.value == 1
		) {
			inputPrecio.value = `\$${50}`;
		} else {
			console.log("error");
		}
	}

	//funcion para calcular el pasaje Ida y Vuelta
	//(%25 de descuento en el pasaje de vuelta)
	function obtenerIdaYVuelta() {
		//validacion para no seleccionar la misma estacion
		if (estacionPartida == estacionDestino) {
			console.log("error, seleccione estaciones distintas");
			inputPrecio.value = `\$${(00, 00)}`;
			//TODO: agregar sweet alert
		} else if (
			seccionPartida == 1 &&
			seccionDestino == 1 &&
			selectPasaje.value == 2
		) {
			inputPrecio.value = `\$${50 + 50 * 0.75}`;
		} else if (
			(seccionPartida == 1 && seccionDestino == 2) ||
			(seccionDestino == 1 && seccionPartida == 2 && selectPasaje.value == 2)
		) {
			inputPrecio.value = `\$${70 + 70 * 0.75}`;
		} else if (
			(seccionPartida == 1 && seccionDestino == 3) ||
			(seccionDestino == 1 && seccionPartida == 3 && selectPasaje.value == 2)
		) {
			inputPrecio.value = `\$${90 + 90 + 0.75}`;
		} else if (
			(seccionPartida == 2 && seccionDestino == 1) ||
			(seccionDestino == 2 && seccionPartida == 1 && selectPasaje.value == 2)
		) {
			inputPrecio.value = `\$${70 + 70 * 0.75}`;
		} else if (
			seccionPartida == 2 &&
			seccionDestino == 2 &&
			selectPasaje.value == 1
		) {
			inputPrecio.value = `\$${50 + 50 * 0.75}`;
		} else if (
			(seccionPartida == 2 && seccionDestino == 3) ||
			(seccionDestino == 2 && seccionPartida == 3 && selectPasaje.value == 1)
		) {
			inputPrecio.value = `\$${70 + 70 * 0.75}`;
		} else if (
			(seccionPartida == 3 && seccionDestino == 1) ||
			(seccionDestino == 3 && seccionPartida == 1 && selectPasaje.value == 2)
		) {
			inputPrecio.value = `\$${90 + 90 * 0.75}`;
		} else if (
			(seccionPartida == 3 && seccionDestino == 2) ||
			(seccionDestino == 3 && seccionPartida == 2 && selectPasaje.value == 2)
		) {
			inputPrecio.value = `\$${70 + 70 * 0.75}`;
		} else if (
			seccionPartida == 3 &&
			seccionDestino == 3 &&
			selectPasaje.value == 2
		) {
			inputPrecio.value = `\$${50 + 50 * 0.75}`;
		} else {
			console.log("error");
		}
	}

	//TODO: comprar, crear array de historial, guardar en local storage y mostrar

	//funcion validacion campos
	//TODO: function validaCampos(){}


	//TODO: control de form
	formulario.addEventListener("submit", nuevoViaje);

	//agregar nuevo viaje
	function nuevoViaje(e) {
		//parar envio de form
		e.preventDefault();

		//TODO: agregar validacion campos

		//recuperar info inputs para mostar en historial
		const pasaje = selectPasaje.options[selectPasaje.selectedIndex].text;
		const partida = selectPartida.options[selectPartida.selectedIndex].text;
		const destino = selectDestino.options[selectDestino.selectedIndex].text;
		const valor = precioTotalInput.value;

		//crear objeto viaje
		const viaje = new Viaje(pasaje, partida, destino, valor);

		//pushear al array
		arrayViajesRealizados.push(viaje);

		//guardar el array en local storage y convertirlo en JSON
		localStorage.setItem("historial", JSON.stringify(arrayViajesRealizados));

    //mostrar viajes cuando se agregan
    mostrarViajes(historialViaje);

    //reiniciar valores del formulario
		formulario.reset();
		btnComprar.disabled = true;

		//TODO: agregar sweet alert
	}



	//TODO:
	//!PESTAÑA CARGA SALDO
};
