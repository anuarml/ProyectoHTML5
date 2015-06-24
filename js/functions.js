$(document).ready(function(){ 	
						   
						   
	// radius Box
	$('.menu_nav ul li a').css({"border-radius": "6px", "-moz-border-radius":"6px", "-webkit-border-radius":"6px"});
	$('ul.fmenu li a').css({"border-radius": "6px", "-moz-border-radius":"6px", "-webkit-border-radius":"6px"});
	// end radius Box
	loadVariedRecipes();
	
	$('#btnSearch').click(searchPost);
	 
});	

$('#register').on("click",function(){
	window.location = "registro.html";
});

function loadVariedRecipes(){
	getPostsASC(function(tx, result){
		//console.log(result.rows);
		if(result.rows.length){
			//console.log("entro");
			for (var i = 0; i < result.rows.length; i++) {
				//console.log("entro");
				post = new Post(result.rows.item(i));
				$('#variedRecipes').append("<li>"+
												"<a href='javascript: showMorePost("+post.id+")'>"+
												post.title+
												"</a>"+
											"</li>");
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

function showMorePost(postId){
	getPostById(postId,function(tx, result){
		//alert("Obteniendo..");
		//alert("hola");
		//console.log(result.rows);
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
}

function searchPost(){
	
	var searchedVal = $('#editbox_search').val();
	//alert($('#editbox_search').val());
	getSearchedPosts(searchedVal,function(tx, result){
		//alert("Obteniendo..");
		//alert("hola");
		//console.log(result.rows);
		//window.location = "inicio.html";
		$('#postIndex').empty();
		if(result.rows.length){

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

			/*post = new Post(result.rows.item(0));
			storage.saveItem('post',post);
			window.location = 'postIndividual.html';*/
		}
		else{
			alert('No se encontro ningun post con esa busqueda.');
		}
	}, function(tx, error){
		// Mensaje de error al acceder a la base de datos.
		alert(error.message);
	});		
}