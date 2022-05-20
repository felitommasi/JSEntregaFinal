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
  const btnCancelar = document.querySelector("#btnCancelar").addEventListener('click', () => {
    formulario.reset();
    btnComprar.disabled = true;
  });

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

			//validacion de campos
			validaCampos(selectPartida);
			validaCampos(selectDestino);

			//obtener secciones para valor de pasaje
			//obtener seccion de estacion de partida
			let obtenerSeccionPartida = arrayData.find(
				(e) => e.estacion == estacionPartida
			);

			if (obtenerSeccionPartida) {
				seccionPartida = obtenerSeccionPartida.seccion;
				console.log(seccionPartida);
			}

			//obtener seccion de estacion de destino
			let obtenerSeccionDestino = arrayData.find(
				(e) => e.estacion == estacionDestino
			);
			if (obtenerSeccionDestino) {
				seccionDestino = obtenerSeccionDestino.seccion;
				console.log(seccionDestino);
			}

      //obtener valor del pasaje solo ida o ida y vuelta
			if (selectPasaje.value == 1) {
				obtenerValorPasaje();
			} else if (selectPasaje.value == 2) {
				obtenerIdaYVuelta();
			} else {
				console.log("error");
			}

      if ((inputPrecio.value != 0 || '$0') && (inputPrecio.value !== 'Seleccione estaciones distintas')){
        //habilitar boton de compra
        btnComprar.disabled = false;
        inputPrecio.style.border = '2px solid green';
      }else if (inputPrecio.value === 'Seleccione estaciones distintas'){
        btnCalcular.addEventListener('click', () =>{
          inputPrecio.classList.add('animate__animated', 'animate__headShake');
        })
      }else{
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
		if (((estacionPartida == estacionDestino) && ((selectPartida.value || selectDestino.value) !== 0))) {
			//console.log("seleccione estaciones distintas");
			inputPrecio.value = 'Seleccione estaciones distintas';
      inputPrecio.style.border = '2px solid red';
		} else if (
			seccionPartida == 1 &&
			seccionDestino == 1 &&
			selectPasaje.value == 1
		) {
			inputPrecio.value = `${50}`;
		} else if (
			(seccionPartida == 1 && seccionDestino == 2) ||
			(seccionDestino == 1 && seccionPartida == 2 && selectPasaje.value == 1)
		) {
			inputPrecio.value = `${70}`;
		} else if (
			(seccionPartida == 1 && seccionDestino == 3) ||
			(seccionDestino == 1 && seccionPartida == 3 && selectPasaje.value == 1)
		) {
			inputPrecio.value = `${90}`;
		} else if (
			(seccionPartida == 2 && seccionDestino == 1) ||
			(seccionDestino == 2 && seccionPartida == 1 && selectPasaje.value == 1)
		) {
			inputPrecio.value = `${70}`;
		} else if (
			seccionPartida == 2 &&
			seccionDestino == 2 &&
			selectPasaje.value == 1
		) {
			inputPrecio.value = `${50}`;
		} else if (
			(seccionPartida == 2 && seccionDestino == 3) ||
			(seccionDestino == 2 && seccionPartida == 3 && selectPasaje.value == 1)
		) {
			inputPrecio.value = `${70}`;
		} else if (
			(seccionPartida == 3 && seccionDestino == 1) ||
			(seccionDestino == 3 && seccionPartida == 1 && selectPasaje.value == 1)
		) {
			inputPrecio.value = `${90}`;
		} else if (
			(seccionPartida == 3 && seccionDestino == 2) ||
			(seccionDestino == 3 && seccionPartida == 2 && selectPasaje.value == 1)
		) {
			inputPrecio.value = `${70}`;
		} else if (
			seccionPartida == 3 &&
			seccionDestino == 3 &&
			selectPasaje.value == 1
		) {
			inputPrecio.value = `${50}`;
		} /* else {
			console.log("error");
		} */
	}

	//funcion para calcular el pasaje Ida y Vuelta
	//(%25 de descuento en el pasaje de vuelta)
	function obtenerIdaYVuelta() {
		//validacion para no seleccionar la misma estacion
		if (((estacionPartida == estacionDestino) && ((selectPartida.value || selectDestino.value) !== 0))) {
			//console.log("seleccione estaciones distintas");
			inputPrecio.value = 'Seleccione estaciones distintas';
			inputPrecio.style.border = '2px solid red';
		} else if (
			seccionPartida == 1 &&
			seccionDestino == 1 &&
			selectPasaje.value == 2
		) {
			inputPrecio.value = `${50 + 50 * 0.75}`;
		} else if (
			(seccionPartida == 1 && seccionDestino == 2) ||
			(seccionDestino == 1 && seccionPartida == 2 && selectPasaje.value == 2)
		) {
			inputPrecio.value = `${70 + 70 * 0.75}`;
		} else if (
			(seccionPartida == 1 && seccionDestino == 3) ||
			(seccionDestino == 1 && seccionPartida == 3 && selectPasaje.value == 2)
		) {
			inputPrecio.value = `${90 + 90 + 0.75}`;
		} else if (
			(seccionPartida == 2 && seccionDestino == 1) ||
			(seccionDestino == 2 && seccionPartida == 1 && selectPasaje.value == 2)
		) {
			inputPrecio.value = `${70 + 70 * 0.75}`;
		} else if (
			seccionPartida == 2 &&
			seccionDestino == 2 &&
			selectPasaje.value == 1
		) {
			inputPrecio.value = `${50 + 50 * 0.75}`;
		} else if (
			(seccionPartida == 2 && seccionDestino == 3) ||
			(seccionDestino == 2 && seccionPartida == 3 && selectPasaje.value == 1)
		) {
			inputPrecio.value = `${70 + 70 * 0.75}`;
		} else if (
			(seccionPartida == 3 && seccionDestino == 1) ||
			(seccionDestino == 3 && seccionPartida == 1 && selectPasaje.value == 2)
		) {
			inputPrecio.value = `${90 + 90 * 0.75}`;
		} else if (
			(seccionPartida == 3 && seccionDestino == 2) ||
			(seccionDestino == 3 && seccionPartida == 2 && selectPasaje.value == 2)
		) {
			inputPrecio.value = `${70 + 70 * 0.75}`;
		} else if (
			seccionPartida == 3 &&
			seccionDestino == 3 &&
			selectPasaje.value == 2
		) {
			inputPrecio.value = `${50 + 50 * 0.75}`;
		} /* else {
			console.log("error");
		} */
	}

  //validacion de campos
	function validaCampos(select) {
    console.log(select);
    const valorSelect = select.value;
    console.log(valorSelect);
		valorSelect == 0 ? validError(select) : validOk(select);

    if(validError){
      select.addEventListener('change', ()=>{
        validOk(select);
        });
    }  
  }

  //funcion en caso de select invalido
  function validError(select){
    const formControl = select.parentElement;
    const textoError = formControl.querySelector('.text-danger');
    console.log(textoError);
    console.log(formControl);

    //aniimacion
    select.classList.add('animate__animated', 'animate__headShake');
    
    //mostrar mensaje de error
    textoError.classList.remove('d-none');

    //añadir borde de color
    select.style.border = '2px solid red';
  }

  //funcion en caso de select valido
  function validOk(select){
    const formControl = select.parentElement;
    const textoError = formControl.querySelector('.text-danger');
    const textoOk = formControl.querySelector('.text-success');

    //borrar mensaje de error
    textoError.classList.add('d-none');

    //mostrar mensaje de valido
    textoOk.classList.remove('d-none');
    
    //añadir borde de color
    select.style.border = '2px solid green';
  }



	//ejecutar funcion nuevo viaje con submit
	formulario.addEventListener("submit", nuevoViaje);

	//agregar nuevo viaje
	function nuevoViaje(e) {
		//parar envio de form
		e.preventDefault();

		//validacion campos: el boton de compra solo se habilita
    //cuando todos los campos son validos

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
		sessionStorage.setItem("historial", JSON.stringify(arrayViajesRealizados));

		//precio pasaje
		precioPasaje = parseInt(valor);

		//mostrar viajes cuando se agregan
		mostrarViajes(historialViaje);

		//alert compra correcta
		Swal.fire({
			position: "center",
			icon: "success",
			title: "Listo, ¡buen viaje!",
			showConfirmButton: false,
			timer: 2000,
		});

    //reiniciar formulario
    setTimeout(function (){
      formulario.reset();
      btnComprar.disabled = true;
      location.reload()
    }, 2000); 

	}
};

//TODO: agregar inicio de sesion con animacion tarjeta
//console.log(parseInt(precioTotalInput.value))
