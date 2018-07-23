var config = {
	apiKey: "AIzaSyD7jeOTj9qJmDT4SZxsLDtHUVY-R2c5gDo",
	authDomain: "naturactive-48171.firebaseapp.com",
	databaseURL: "https://naturactive-48171.firebaseio.com",
	projectId: "naturactive-48171",
	storageBucket: "naturactive-48171.appspot.com",
	messagingSenderId: "781857594331"
};
firebase.initializeApp(config);
var snap = [];
firebase.database().ref('accounts/-KxPYflYVYzSJ0hs2nMn').once('value').then(function(snapshot) {
	snap.push({
		date_inscription: snapshot.val().date,
		fbid: snapshot.val().fbid,
		genre: snapshot.val().genre,
		prenom: snapshot.val().prenom,
		nom: snapshot.val().nom
	});
	var reads = [];
	firebase.database().ref('accounts/-KxPYflYVYzSJ0hs2nMn/fil').once('value').then(function(snapshot) {
		snapshot.forEach(function(childSnapshot) {
			var id = childSnapshot.key;
			var promise = firebase.database().ref('fil/' + id).once('value').then(function(snapi) {
				// The Promise was fulfilled.
				//alert('id'+snapi.val().message)
				snap.push({
					date: snapi.val().date,
					message: snapi.val().message
				});
			}, function(error) {
				// The Promise was rejected.
				console.error(error);
			});
			reads.push(promise);
		});
		Promise.all(reads).then(function() {
			$('pre').text(JSON.stringify(snap));
      var a = 0;
      var text="";
      snap.forEach(function(value) {
      if(a == 0){
      		$('#date_inscription').text(value.date_inscription);
          $('#fbid').text(value.fbid);
          $('#genre').text(value.genre);
          $('#prenom').text(value.prenom);
          $('#nom').text(value.nom);
      }
      else{
      	text += "Date :"+value.date+" - "+value.message+"<br />";
      }

      a++;
      })
      $('#text').text(text);
		});
	});
});
