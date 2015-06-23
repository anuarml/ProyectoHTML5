
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
		videolnk = firstPart + "embed/" + secondPart;
		//console.log(videolnk);
		$("#postVideo").attr("src",videolnk);
		//$("#postVideo")[0].load();
		//$("#postVideo").html(postStorage.vidLink);
	}
	$("#postDescription").html(postStorage.description);
	$("#postTag").html(postStorage.tag);
	$("#postDate").html(postStorage.date);
});


