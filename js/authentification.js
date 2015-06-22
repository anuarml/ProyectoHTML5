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
	window.location = 'login.html';
}

// Si no se tiene una sesión activa redirige al login.
authentification.verifySession = function(){

	user = storage.getItem('user');

	if(user){
		var linkSesion = document.getElementById('linkSesion');
		linkSesion.hidden = "true";
		//window.location = 'inicioSesion.html';
	}
}