$(document).ready(function(){
	loadVideoIndex();
});

function loadVideoIndex(){
	getPosts(function(tx, result){
		//alert("Obteniendo..");
		//alert("hola");
		console.log(result.rows);
		if(result.rows.length){
			//console.log("entro");
			for (var i = 0; i < result.rows.length; i++) {
				//console.log("entro");
				post = new Post(result.rows.item(i));
				if(post.vidLink){
					var videolnk = post.vidLink;
					//videolnk = "https://www.youtube.com/watch?v=KE0Ez8dGBIU";
					var	linkPart = videolnk.split('watch');
					var firstPart = linkPart[0];
					linkPart = linkPart[1].split('=');
					var secondPart = linkPart[1];
					//console.log(firstPart + " " + secondPart);
					videolnk = firstPart + "embed/" + secondPart;
					$('#videoIndex').append("<div class='articleIndex'>"+
											"<h2>"+
												"<a href='javascript: showMorePost("+post.id+")'</a>"+post.title+
											"</h2>"+
											"<iframe src='"+videolnk+"' width='227' height='205' class='fl' /></iframe>"+
											"</div>");
				}
				
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