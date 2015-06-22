"use strict"

var authentification = {};

// Valida que el usuario y la contraseña sean correctos.
authentification.validateUser = function () {

	var username = document.getElementById('userName').value;
	var password = document.getElementById('password').value;

	getUser(username, function(tx, result){
		
		if(result.rows.length){
			user = new User(result.rows.item(0));

			if(user.password !== password){
				alert('La contraseña es incorrecta.');
			}
			else{
				authentification.login(user);
			}
		}
		else{
			alert('El usuario no existe.');
		}
	}, function(tx, error){
		// Mensaje de error al acceder a la base de datos.
		alert(error.message);
	});
}

// Crea la sesión del usuario
authentification.login = function(user){
	storage.saveItem('user', user);
	window.location = 'inicio.html';
}

// Cierra la sesión del usuario
authentification.logout = function(){
	storage.deleteItem('user');
	window.location = 'inicioSesion.html';
}

authentification.verifySession = function(){

	user = storage.getItem('user');

	if(user){
		var linkSesion = document.getElementById('linkSesion');
		linkSesion.hidden = true;
		var linkCerrarSesion = document.getElementById('linkCerrarSesion');
		linkCerrarSesion.hidden = false;
		var greetings = document.getElementById('greetings');
		greetings.innerHTML = "Hola " + user.name;
		linkCerrarSesion.style.textAlign = "right";
		linkCerrarSesion.style.marginRight = "30px";
		greetings.style.marginRight = "10px";
		var nuevoPost = document.getElementById('nuevoPost');
		nuevoPost.hidden = false;
		//console.log(user.name);
		//alert("hola");
		//window.location = 'inicioSesion.html';
	}
}