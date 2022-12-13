//Creamos el socket del lado del cliente
const socket = io();
//Buscamos los parametros de la url
const params = new URLSearchParams(window.location.search);
//Creamos el objeto usuario en donde obtenemos de la url el nombre y la sala
const usuario = {
	nombre: params.get("nombre"),
	sala: params.get("sala")
};

//Si nombre o la sala no vienen en la url, entonces redirecciona al index y tira un error
if (!params.get("nombre") || !params.get("sala")) {
	window.location = "index.html";
	throw new Error("El nombre y la sala son necesarios");
}

//Cuando el socket esta conectado, tiramos un mensaje en la consola y mostramos los usuarios conectados
socket.on('connect', () => {
	console.log('Conectado al servidor');
	socket.emit("entrarChat", usuario, function (resp) {
		console.log("Usuarios conectados: ", resp);
	});
});

//Cuando el socket se desconecta mostramos un mensaje en la consola
socket.on('disconnect', () => {
	console.log('Perdimos conexión con el servidor');
});

// Enviar información
/* socket.emit('crearMensaje', {
	mensaje: 'Hola Mundo'
}, resp => {
	console.log('respuesta server: ', resp);
});
 */

//Escuchamos crearMensaje, mostramos en la consola el mensaje enviado
socket.on('crearMensaje', mensaje => {
	console.log('Servidor:', mensaje);
});

//Escuchamos listaPersonas, mostramos en la consola las personas conectadas
socket.on("listaPersonas", personas => {
	console.log(personas);
})

//Escuchamos mensajePrivado, mostramos los mensajes enviado solo al usuario que se lo enviamos
socket.on("mensajePrivado", mensaje => {
	console.log("Mensaje privado: ", mensaje);
});