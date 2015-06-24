$(document).ready(function(){
	loadPosts();
});

function loadPosts(){
	getPosts(function(tx, result){
		//alert("Obteniendo..");
		//alert("hola");
		//console.log(result.rows);
		if(result.rows.length){
			//console.log("entro");
			for (var i = 0; i < result.rows.length; i++) {
				//console.log("entro");
				post = new Post(result.rows.item(i));
				$('#postIndex').append("<div class='article'>"+
											"<h2>"+post.title+"</h2>"+
											"<div class='clr'></div>"+
											"<p>"+
												"<span class='date'>"+post.date+"</span>"+
												" &nbsp;|&nbsp;Tag: <a>"+post.tag+"</a>"+
											"</p>"+
											"<img src='"+post.imgLink+"' width='227' height='205' alt='' class='fl' />"+
											"<p style='height:190px;overflow:hidden'>"+post.teaser+"</p>"+
											"<p class='spec'>"+
												"<a href='javascript: showMorePost("+post.id+")' class='rm'> Leer más &raquo;</a></p>"+
										"</div>");
			}
			//post = new Post(result.rows.item(0));
			//console.log(post);
			//storage.saveItem('post',post);
			//window.location = 'postIndividual.html';
		}
		else{
			//alert('No hay un post con ese titulo.');
		}
	}, function(tx, error){
		// Mensaje de error al acceder a la base de datos.
		alert(error.message);
	});
}

/*function showMorePost(postId){
	getPostById(postId,function(tx, result){
		//alert("Obteniendo..");
		//alert("hola");
		console.log(result.rows);
		if(result.rows.length){
			post = new Post(result.rows.item(0));
			storage.saveItem('post',post);
			window.location = 'postIndividual.html';
		}
		else{
			//alert('No hay un post con ese titulo.');
		}
	}, function(tx, error){
		// Mensaje de error al acceder a la base de datos.
		alert(error.message);
	});
}*/
