var ref = firebase.database().ref("mensajes");

ref.on("child_added", function(data){

	var dataMsg = data.child("msg").val();
	var dataAutor = data.child("autor").val();

	var toPrint = dataAutor + ": " + dataMsg;

	console.log(toPrint);

})

function cambiarUrl(){
	var imgView = document.getElementById('img')

	imgView.src = "https://firebasestorage.googleapis.com/v0/b/intelectivos-95f27.appspot.com/o/Blog%2FIm%C3%A1genes%2Fcropped-1435774755.jpg?alt=media&token=ad582144-6b10-4443-9ae9-2e81c9053225"
}

function subir(){
	var autorText = $('#autor_ip').val();
	var msgText = $('#msg_ip').val();

	ref.push().set({
		msg: msgText,
		autor: autorText
	});
}

function test(){
	alert(convertirTiempo(1500340282041))
}

/*
	Función para calcular el tiempo que ha transcurrido desde la publicación de un artículo hasta ahora.

	Toma como parámetro los milisegundos almacenados en la publicación (date).
	Regresa un texto indicando el tiempo transcurrido en la forma más conveniente.
*/
function convertirTiempo(msThen){

	// Se crea una variable con los milisegundos actuales.
	var msNow = Date.now();

	// Variable que dice cuántos segundos hay de diferencia entre ambos valores.
	var difSegs = Math.floor((msNow - msThen)/1000);
	if (difSegs <= 60) return "Hace unos segundos"; // Si han pasado menos de 1 minuto, regresa "Hace unos segundos"

	// Si ha pasado más de un minuto, se crea una variable almacenando los minutos que han pasado desde
	// la publicación.
	var difMins = Math.ceil(difSegs/60);
	if(difMins < 60) return "Hace " + difMins + " minuto(s)"; //Si ha pasado menos de una hora, regresa "Hace X minutos", siendo 'X' los minutos transcurridos.

	// Si ha pasado más de una hora, se crea una variable almacenando las horas transcurridas.
	var difHoras = Math.floor(difMins/60);
	if(difHoras < 24) return "Hace " + difHoras + " hora(s)"; // Si han pasado menos de 24 horas, regresa "Hace X horas", siendo 'X' las horas transcurridas.

	var difDias = Math.floor(difHoras/24);
	if(difDias <= 3) return "Hace " + difDias + " dia(s)"; // Si han pasado menos de 3 días, regresa "Hace X dia(s)", siendo 'X' los días transcurridos.

	// Si hasta el momento no se ha cumplido ninguna condición IF, se regresará la fecha y hora de publicación.
	// Ejemplo de formato:
	//		"22:50, 20 de Julio del 2017"

	var dateThen = new Date(msThen);

	var meses = [
		"Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
		"Julio", "Agosto", "Septiembre", "Octubre", "Noviembre",
		"Diciembre"
	];

	var hora    = dateThen.getHours();
	var minutos = dateThen.getMinutes();
	var dia     = dateThen.getDate();
	var mes     = meses[dateThen.getMonth()];
	var year    = dateThen.getFullYear();

	return hora + ":" + minutos + ", " + dia + " de " + mes + " del " + year;
}