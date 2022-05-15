//nodos inputs
const saldoActualInput = document.querySelector("#saldoActualInput");
const nuevoSaldoInput = document.querySelector("#nuevoSaldoInput");

//nodos botones
const btnCarga = document.querySelector("#btnCargar");
//btn vaciar input carga saldo
const btnBorrarInputs = document.getElementById("btnBorrarInputs");

//carga saldo
restarSaldo();

//variables saldo
let saldoActual = 100;
let nuevoSaldo; 

//borrar inputs y volver al valor por defecto
btnBorrarInputs.addEventListener("click", () => {
	nuevoSaldoInput.value = "";
	saldoActualInput.value = 100;
});

//!funciones y eventos carga saldo
//sumar 10
document.querySelector("#btnCarga1").addEventListener("click", () => {
	sumar10(saldoActual);
});
function sumar10(n) {
	nuevoSaldo = n + 10;
	nuevoSaldoInput.value = nuevoSaldo;
}

//sumar 20
document.querySelector("#btnCarga2").addEventListener("click", () => {
	sumar20(saldoActual);
});
function sumar20(n) {
	nuevoSaldo = n + 20;
	nuevoSaldoInput.value = nuevoSaldo;
}

//sumar 50
document.querySelector("#btnCarga3").addEventListener("click", () => {
	sumar50(saldoActual);
});
function sumar50(n) {
	nuevoSaldo = n + 50;
	nuevoSaldoInput.value = nuevoSaldo;
}

//sumar 100
document.querySelector("#btnCarga4").addEventListener("click", () => {
	sumar100(saldoActual);
});
function sumar100(n) {
	nuevoSaldo = n + 100;
	nuevoSaldoInput.value = nuevoSaldo;
}

//sumar 100
document.querySelector("#btnCarga5").addEventListener("click", () => {
	sumar200(saldoActual);
});
function sumar200(n) {
	nuevoSaldo = n + 200;
	nuevoSaldoInput.value = nuevoSaldo;
}

//sumar 50
document.querySelector("#btnCarga6").addEventListener("click", () => {
	sumar500(saldoActual);
});
function sumar500(n) {
	nuevoSaldo = n + 500;
	nuevoSaldoInput.value = nuevoSaldo;
}

btnCarga.addEventListener("click", () => {
	let timerInterval;
	Swal.fire({
		html: "Un momento, se esta procesando tu pago...",
		timer: 2500,
		timerProgressBar: true,
		didOpen: () => {
			Swal.showLoading();
			const b = Swal.getHtmlContainer().querySelector("b");
			timerInterval = setInterval(() => {
				b.textContent = Swal.getTimerLeft();
			}, 100);
		},
		willClose: () => {
			clearInterval(timerInterval);
		},
		didClose: () => {
			Swal.fire({
				icon: "success",
				title: "¡Se acreditó tu carga!",
				text: `Tu nuevo saldo es $${nuevoSaldo}`,
			});
		},
	});
	nuevoSaldoInput.value = "";
    sessionStorage.setItem("saldo", JSON.stringify(nuevoSaldo));
});




//TODO: RESTAR SALDO CON LA COMPRA
/* //precio del pasaje (en app.js)
let precioPasaje;

//restar saldo a la tarjeta
let saldoStorage = JSON.parse(sessionStorage.getItem("saldo"));

//console.log(saldoStorage)
function restarSaldo(){
  nuevoSaldo = saldoStorage - precioPasaje; 
  saldoActualInput.value = nuevoSaldo;
  //console.log(nuevoSaldo);
  sessionStorage.setItem("saldo", JSON.stringify(nuevoSaldo));
}  */