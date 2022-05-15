//botones sidebar
const navBtnCompra = document
	.querySelector("#navBtnCompra")
	.addEventListener("click", () => displayCards("cardCompra"));
const navBtnCarga = document
	.querySelector("#navBtnCarga")
	.addEventListener("click", () => displayCards("cardCarga"));
const navBtnViajes = document
	.querySelector("#navBtnViajes")
	.addEventListener("click", () => displayCards("cardViajes"));

//funcion display cards
function displayCards(display) {
    //display botones sidebar
    document.querySelector("#iconoCompra").style.display = "none";
    document.querySelector("#iconoCompraFill").style.display = "block";
    document.querySelector("#iconoCarga").style.display = "block";
    document.querySelector("#iconoCargaFill").style.display = "none";
    document.querySelector("#iconoViajes").style.display = "block";
    document.querySelector("#iconoViajesFill").style.display = "none";

	if (display == "cardCompra") {
		document.querySelector("#cardCompra").style.display = "block";
		document.querySelector("#cardCarga").style.display = "none";
		document.querySelector("#cardViajes").style.display = "none";
	} else if (display == "cardCarga") {
		document.querySelector("#cardCompra").style.display = "none";
		document.querySelector("#cardCarga").style.display = "block";
		document.querySelector("#cardViajes").style.display = "none";
		//display botones sidebar
        document.querySelector("#iconoCompra").style.display = "block";
        document.querySelector("#iconoCompraFill").style.display = "none";
        document.querySelector("#iconoCarga").style.display = "none";
        document.querySelector("#iconoCargaFill").style.display = "block";
        document.querySelector("#iconoViajes").style.display = "block";
        document.querySelector("#iconoViajesFill").style.display = "none";
	} else if (display == "cardViajes") {
		document.querySelector("#cardCompra").style.display = "none";
		document.querySelector("#cardCarga").style.display = "none";
		document.querySelector("#cardViajes").style.display = "block";
		//display botones sidebar
        document.querySelector("#iconoCompra").style.display = "block";
        document.querySelector("#iconoCompraFill").style.display = "none";
        document.querySelector("#iconoCarga").style.display = "block";
        document.querySelector("#iconoCargaFill").style.display = "none";
        document.querySelector("#iconoViajes").style.display = "none";
        document.querySelector("#iconoViajesFill").style.display = "block";
	} else {
		console.log("errror");
	}
}
displayCards()