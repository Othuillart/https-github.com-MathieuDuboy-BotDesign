## Preuve CNIL enregistrement des données Anabelle

- Dans [index.js](https://github.com/MathieuDuboy/BotDesign/blob/master/index.js), le code permettant de stocker sur la base de données principale contenant toutes les datas est : 

        var checkAndCreate = (sessionId, fbid, prenom, nom, genre) = {
          return new Promise((resolve, reject) = {
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
                  admin.auth().createCustomToken(fbid).then((customToken) = firebase.auth().signInWithCustomToken(
                    customToken)).then(() = {
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
                    var otherDatabase = otherApp.database();
                    otherDatabase.ref().child('accounts').child(keyid.key).set({
                      nb_agression: 0,
                      dernier_message: new Date(),
                      genre: genre,
                      date: new Date().toISOString()
                    });
                    resolve(keyid.key);
                  }).catch((error) = {
                    console.log("erreur from firebas 10");
                    reject(error)
                  });
                }
              }).catch((error) = {
              console.log("erreur from firebas new");
              reject(error)
            });
          });
        };
