
$(document).ready(function(){

 	var postStorage = storage.getItem('post');
  	//console.log(postStorage.imgLink);

  	$("#postTitle").html(postStorage.title);
	//$("#postUser").html(postStorage.);
	if(!postStorage.imgLink){
		$("#postImage").hide();
	}else{
		$("#postImage").attr("src",postStorage.imgLink);
	}
	if(!postStorage.vidLink){
		$("#postVideo").hide();
	}else{
		var videolnk = postStorage.vidLink;
		//videolnk = "https://www.youtube.com/watch?v=KE0Ez8dGBIU";
		var	linkPart = videolnk.split('watch');
		var firstPart = linkPart[0];
		linkPart = linkPart[1].split('=');
		var secondPart = linkPart[1];
		//console.log(firstPart + " " + secondPart);
		videolnk = firstPart + "embed/" + secondPart + "?autoplay=1";
		//console.log(videolnk);
		$("#postVideo").attr("src",videolnk);
		//$("#postVideo")[0].load();
		//$("#postVideo").html(postStorage.vidLink);
	}
	$("#postDescription").html(postStorage.description);
	$("#postTag").html(postStorage.tag);
	$("#postDate").html(postStorage.date);

	getComments(postStorage.id, function(tx, result){
		//alert("Obteniendo..");
		//console.log(result.rows.item(0));
		if(result.rows.length){
			
			for (var i = 0; i < result.rows.length; i++) {
				comment = new Comment(result.rows.item(i));
				$('#replys').append("<div class='comment'>"+
										"<img src='images/userpic.gif' width='40' height='40' class='userpic'/>"+
										"<p><a>"+comment.name+"</a> dice:</p>"+
										"<p>"+comment.comment+"</p>"+
									"</div>");
			}

			/*<div class="comment"> <a href="#"><img src="images/userpic.gif" width="40" height="40" alt="" class="userpic" /></a>
                <p><a href="#">CarlosR</a> dice:<br />
                  April 20th, 2009 at 2:17 pm</p>
                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec libero. Suspendisse bibendum.</p>
              </div>*/

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

});


