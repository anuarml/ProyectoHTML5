"use strict"
// User object.
var comment;

function Comment(obj){

	if(!obj) obj = {};

	this.id = obj.id || 0;
	this.idPost = obj.idPost || 0;
	this.name = obj.name || null;
	this.email = obj.email || null;
	this.comment = obj.comment || null;
}

function addNewComment(){
	var name = document.getElementById('name').value;
	var email = document.getElementById('email').value;
	var comment = document.getElementById('comment').value;
	//var title = document.getElementById('title').value;

	if(!name || !email || !comment){
		alert('Te faltan campos por llenar.');
		return;
	}

	var idPost = storage.getItem('post').id;

	addComment(idPost, name, email, comment, function(){

		alert('Comentario enviado.');
		window.location = 'postIndividual.html';

	}, function(t, e){
		// Mensajes de error al acceder a la base de datos.
		if(e.code === e.CONSTRAINT_ERR){
			alert('Ya existe un comentario igual.');
		}
		else{
			alert(e.message);
		}
	});
}
