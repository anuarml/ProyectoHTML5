"use strict"
// User object.
var post;

function Post(obj){

	if(!obj) obj = {};

	this.id = obj.id || 0;
	this.title = obj.title || null;
	this.description = obj.description || null;
	this.teaser = obj.teaser || null;
	this.vidLink = obj.vidLink || null;
	this.imgLink = obj.imgLink || null;
	this.tag = obj.tag || null;
}

function createNewPost(){
	var title = document.getElementById('title').value;
	var description = document.getElementById('description').value;
	var teaser = document.getElementById('teaser').value;
	var vidLink = document.getElementById('vidLink').value;
	var imgLink = document.getElementById('imgLink').value;
	var tag = document.getElementById('tag').value;

	if(!title || !description || !teaser || !tag){
		alert('Le faltan campos por llenar.');
		return;
	}

	addPost(title, description, teaser, vidLink, imgLink, tag, function(){

		alert('Post creado.');
		window.location = 'inicio.html';

	}, function(t, e){
		// Mensajes de error al acceder a la base de datos.
		if(e.code === e.CONSTRAINT_ERR){
			alert('Ya existe un post con ese titulo.');
		}
		else{
			alert(e.message);
		}
	});
}
