## Preuve CNIL enregistrement des données Anabelle

- Dans [index.js](https://github.com/MathieuDuboy/BotDesign/blob/master/index.js), le code permettant de stocker sur la base de données principale contenant toutes les datas est : 
`````
var checkAndCreate = (sessionId, fbid, prenom, nom, genre) => {
  return new Promise((resolve, reject) => {
    var userz = firebase.database().ref().child("accounts").orderByChild("fbid").equalTo(fbid).once("value").then(
      function(snapshot) {
        var exists = (snapshot.val() !== null);
        if (exists) {
          for (var key in snapshot.val()) break;
          console.log("ouiii jexiste" + key);
          sessions[sessionId].key = key;
          // I have the key we can continue
          snapshot.forEach(function(childSnapshot) {
            console.log('snapshot.dernier_message' + childSnapshot.val().dernier_message);
            sessions[sessionId].dernier_message = childSnapshot.val().dernier_message;
            resolve(childSnapshot.val().dernier_message);
          });
        } else {
          admin.auth().createCustomToken(fbid).then((customToken) => firebase.auth().signInWithCustomToken(
            customToken)).then(() => {
            var user2 = firebase.auth().currentUser;
            var keyid = firebase.database().ref().child('accounts').push();
            sessions[sessionId].key = keyid.key;
            // I have the key we can continue
            sessions[sessionId].dernier_message = new Date();
            firebase.database().ref().child('accounts').child(keyid.key).set({
              fbid: fbid,
              cgu: false,
              prenom: prenom,
              nom: nom,
              nb_agression: 0,
              dernier_message: new Date(),
              genre: genre,
              date: new Date().toISOString()
            });
            
            resolve(keyid.key);
          }).catch((error) => {
            console.log("erreur from firebas 10");
            reject(error)
          });
        }
      }).catch((error) => {
      console.log("erreur from firebas new");
      reject(error)
    });
  });
};
`````
Au meme moment, le stockage dans la deuxième base de données se fait de manière anonymisée : 
`````
var otherDatabase = otherApp.database();
	otherDatabase.ref().child('accounts').child(keyid.key).set({
	nb_agression: 0,
	dernier_message: new Date(),
	genre: genre,
	date: new Date().toISOString()
});
`````
Le reste des stockages des données s'effectue au fil du temps et de l'expérience utilisateur : <br/>
Ligne 405-409 : https://github.com/MathieuDuboy/BotDesign/blob/master/index.js#L405-L409<br />
Ligne 415-419 : https://github.com/MathieuDuboy/BotDesign/blob/master/index.js#L415-L419<br />
Ligne 426-443 : https://github.com/MathieuDuboy/BotDesign/blob/master/index.js#L426-L443<br />
Ligne 447-458 : https://github.com/MathieuDuboy/BotDesign/blob/master/index.js#L447-L458<br />
Ligne 463-480 : https://github.com/MathieuDuboy/BotDesign/blob/master/index.js#L463-L480<br />
Ligne 482-501 : https://github.com/MathieuDuboy/BotDesign/blob/master/index.js#L482-L501<br />

et de manière ponctuelle lors des intéractions avec le ChatBot.