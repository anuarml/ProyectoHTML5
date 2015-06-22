"use strict"
// User object.
var user;

function User(obj){

	if(!obj) obj = {};

	this.id = obj.id || 0;
	this.userName = obj.userName || null;
	this.password = obj.password || null;
	this.name = obj.name || null;
	this.lastName = obj.lastName || null;
	this.email = obj.email || null;
}

function registerUser(){
	var userName = document.getElementById('userName').value;
	var password = document.getElementById('password').value;
	var name = document.getElementById('name').value;
	var lastName = document.getElementById('lastName').value;
	var email = document.getElementById('email').value;

	if(!userName || !password || !name || !lastName || !email){
		alert('Es necesario llenar todos los campos.');
		return;
	}

	addUser(userName, password, name, lastName, email, function(){

		alert('Usuario creado.');
		window.location = 'inicio.html';

	}, function(t, e){
		// Mensajes de error al acceder a la base de datos.
		if(e.code === e.CONSTRAINT_ERR){
			alert('Ya existe el usuario.');
		}
		else{
			alert(e.message);
		}
	});
}
