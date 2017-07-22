// Ubicación de los Posts.
var ref = firebase.database().ref("/Blog/Posts/");

var plantillaPublicacion = " <div class='Contenido-Articulo'> <div class='Contenido-Title'> TITLE </div> <div class='Contenido-Author'> AUTHOR </div> <div class='Contenido-Date'> DATE </div> <hr style='width:100%; height:2px; background-color: black; border: none;' /> <div class='Contenido-Image'> <img src='IMAGEURL' alt='' class='Image-Content'> </div> <div class='Contenido-Content'> CONTENT </div> <div class='Contenido-Comments'> </div> </div>"

ref.on('child_added',function(data){

    var publicacionesContainer = document.getElementById("Contenido");

    var titleVal     = data.child("title").val();
    var authorVal    = data.child("author").val();
    var contentVal   = data.child("content").val();
    var dateVal      = data.child("date").val();
    var imageUrlVal  = data.child("imageUrl").val();
    var key          = data.child("key").val();

    var newPost = plantillaPublicacion
        .replace("TITLE", titleVal)
        .replace("AUTHOR", authorVal)
        .replace("DATE", convertirTiempo(dateVal))
        .replace("CONTENT", contentVal)
        .replace("IMAGEURL", imageUrlVal);

    publicacionesContainer.innerHTML = newPost + publicacionesContainer.innerHTML;
});

//-------------------------------------------------------------------------------------------------

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