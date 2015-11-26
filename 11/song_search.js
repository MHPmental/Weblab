document.observe("dom:loaded", function() {
	$("b_xml").observe("click", function(){
		new Ajax.Request("songs_xml.php",{
			method: "get",
			parameters: {top: $F("top")},
			onSuccess: showSongs_XML,
			onFailure: ajaxFailed,
			onException: ajaxFailed
		});
	});
	$("b_json").observe("click", function(){
		new Ajax.Request("songs_json.php",{
			method:"get",
			parameters: {top: $F("top")},
			onSuccess: showSongs_JSON,
			onFailure: ajaxFailed,
			onException: ajaxFailed
		});
	});
});

function showSongs_XML(ajax) {
	alert(ajax.responseText);
	while($("songs").firstChild){
		$("songs").removeChild($("songs").firstChild);
	}
	var Song = ajax.responseXML.getElementsByTagName("song");
	for(var i = 0 ; i<Song.length ; i++){
		var li = document.createElement("li");
		var title = Song[i].getElementsByTagName("title")[0].firstChild.nodeValue;
		var artist = Song[i].getElementsByTagName("artist")[0].firstChild.nodeValue;
		var genre = Song[i].getElementsByTagName("genre")[0].firstChild.nodeValue;
		var time = Song[i].getElementsByTagName("time")[0].firstChild.nodeValue;
		li.innerHTML = title + " - " + artist + " [" + genre + "] (" + time + ")";
		$("songs").appendChild(li);

	}
}

function showSongs_JSON(ajax) {
	alert(ajax.responseText);
	while($("songs").firstChild){
		$("songs").removeChild($("songs").firstChild);
	}
	var Song = JSON.parse(ajax.responseText);
	for(var i = 0;i<Song.songs.length;i++){
		var li = document.createElement("li");
		var title = Song.songs[i].title;
		var artist = Song.songs[i].artist;
		var genre = Song.songs[i].genre;
		var time = Song.songs[i].time;
		li.innerHTML = title + " - " + artist + " [" + genre + "] (" + time + ")";
		$("songs").appendChild(li);
	}
}

function ajaxFailed(ajax, exception) {
	var errorMessage = "Error making Ajax request:\n\n";
	if (exception) {
		errorMessage += "Exception: " + exception.message;
	} else {
		errorMessage += "Server status:\n" + ajax.status + " " + ajax.statusText + 
						"\n\nServer response text:\n" + ajax.responseText;
	}
	alert(errorMessage);
}
