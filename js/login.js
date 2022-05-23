//formulario de login
const inputTarjeta = document.querySelector('#numeroTarjeta');
const btnIngresar = document.querySelector('#btnIngresar');
//deshabilitado hasta obtener los 16 numeros
btnIngresar.disabled = true;
const formLogin = document.querySelector('#loginForm');
//numeros para reemplazar con input
const numerosTarjeta = document.querySelector('#numerosTarjeta');

//validacion input
inputTarjeta.addEventListener('keyup', (e) => {
    let valorInput = e.target.value;

    inputTarjeta.value = valorInput
    //eliminar espacios en blanco
    .replace(/\s/g, '')
    //no permitir ingresar letras
    .replace(/\D/g, '')
    //espaciado cada 4 numeros
    .replace(/([0-9]{4})/g, '$1 ')
    .trim();

    numerosTarjeta.textContent = valorInput;

    if (valorInput.length === 19){
        btnIngresar.disabled = false;
    } 
})

//animacion carga y redireccion a pagina de inicio
formLogin.addEventListener('submit', (e) => {
    e.preventDefault();

    Swal.fire({
		html: "Ingresando...",
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
		}
    });

    window.location.replace("main.html");
    return false;
})