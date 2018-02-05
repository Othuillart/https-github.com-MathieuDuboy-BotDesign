'use strict'
// ----------------------- NOS MODULES -------------------------
const bodyParser = require('body-parser');
const crypto = require('crypto');
const express = require('express');
const fetch = require('node-fetch');
const request = require('request');
const requestify = require('requestify');
const firebase = require('firebase');
const admin = require("firebase-admin");
let Wit = null;
let log = null;
try {
	Wit = require('../').Wit;
	log = require('../').log;
}
catch (e) {
	Wit = require('node-wit').Wit;
	log = require('node-wit').log;
}
// ----------------------- FIREBASE INIT -------------------------
firebase.initializeApp({
		apiKey: "AIzaSyD9n0awipZ7lrK-MEeTKzoJWmG5p2ToF2M",
    authDomain: "naturactive-894c1.firebaseapp.com",
    databaseURL: "https://naturactive-894c1.firebaseio.com",
    projectId: "naturactive-894c1",
    storageBucket: "naturactive-894c1.appspot.com",
    messagingSenderId: "880317619228"
});

var otherApp = firebase.initializeApp({
	apiKey: "AIzaSyAi-65gDpQ3cH6wd3cupR30KmOGlH4Y2-Q",
    authDomain: "naturactive-anonyme.firebaseapp.com",
    databaseURL: "https://naturactive-anonyme.firebaseio.com",
    projectId: "naturactive-anonyme",
    storageBucket: "naturactive-anonyme.appspot.com",
    messagingSenderId: "569250624503"
}, "other");

admin.initializeApp({
	credential: admin.credential.cert({
	  "type": "service_account",
	  "project_id": "naturactive-894c1",
	  "private_key_id": "54b6d84ae61f604910a766d181614ae701a23708",
	  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCv92ZJKkGDBcVY\nmhSiKd+xiHzuuaBMbBc1GRQ/TS8Ak6iBs9LASSc2CABj9utykL/1e88rOlaA7H5j\npC5X9on676UpHdGByacRzn0bpHKIKrhEEwdC9TQuoFhDIY7lQ3e0Uz8tVXRv3cyv\nqtjSvm++7MUUkWNe1oO70Qb3FsmQra6lq6jRgn6lu1H94oHysiwrFNTkdrV+sBQU\no7ZCRj6KUo6xvx1pQLMn2+kRpRaF94V4MsSqHIz2yRYheloHbGT6enXGvvANyavU\nLFPilU6MXF1ehXyU/WkuACnsTqfnUzNE4J4E3In80e6aWlPl80tvJmI3PkNUiYPN\nFmeLSL8fAgMBAAECggEADdj7SXpNnRqUKCyf8qidVbxDw9ZpzfnOB1V86Wpdu4uv\n/anOeQFVi52SyLGCxjyr6CahHzbARFvYEM4eM4ZPeQ1PQwgTF6w5Ci0X9vGFbdlm\nyaMLT3Kg2gmv4g1YnT3AKtNH30ptSlLH3wvwpwA2wDo9XCjNpOxetSYPu6jyBDRb\nzs0G8vAO+3PjszBByRV/DiPwSYUzNXXKQeczmm6KaD1imX9cc4gIlEv1mDpvJQcd\n+juYJiGLv2umFZJe5fBQ0xMwdPkZjGFNpIURR523i8V9E+V5rpydzgGkhIHNZgXF\ngBnAwLC/cvZsuftIKri/oTYp0xidsERNPxi/ESK4MQKBgQDVb8ha3xlHWfyr2Pfp\nDktWe8K6oK03EIoasokrDCedCb4qiuJJSthDbV/ieAM3YYp46RfdT4v2L5ueCFT2\nPOvusG7lZirKg4+kkoYmvcJcrfh1rZwjRXXJfRDOVEFo6i6ies7F9RY0oncKsmN0\nZfr3hPSBXu16nsb3UIeioaDWlwKBgQDTDrZa9q3wIVIvBT1sa4VGf7qJ0SZttZs9\n3kicqYoS9uVRbzTEzlauPD/pC++YYtO6j3vWKb8lHCq+ad+lUSCxhujuLIp9uMi0\net2chqtgMD2aNTKTNp3pASWOQaMQ/lsAdcNLi76A7dqaV9i+5dmdVJ4n0tLayzQs\nUbDw/yE0uQKBgEHNZbrGX3fFAYZFrSDX/Fgcbcu179EzMzDJ7EouRCRBNbTN/rfT\n8FrRZKdgkrVHSDbAvk/Hz4HF6bdOIEuOOrrrADWPSxAGgYmedueIx1xlcl1ted7R\n8l99RGooRcY/tML5E7iqN/9gO0079DeVnUskXXFpP9P3EaZ72GVGaVzfAoGAU4P1\n2sbUCzpUN/D93kIpqbzvRouxhiYfuPqVhxB7Z4e1NGUp31q66BVFQOWNOKKan68Z\nVKSOU5PywghJDDSvGDCHSX/siVUubmRT/xU3CUftiHDWg3RQRhxDDSih6x6LSgJP\ndjxk9MWqA/sQ9HEljGEoeB+veg6ApazptGNwc1kCgYEAplQpwNWMlPSoev7W4oHg\nvE40DcFKMNNTbkSF8ikkSkLPADj7gme52U9wtoY3itLM5hw+Vzi3gTnVSFyPEI5C\ndHq0NLM4sdckQywGjQK5USDpFNtEmJVSlSnEPaV61DxkVc9W8JEw5KDJogANL917\n2x7z7faTvJ3NkgohI1rZamo=\n-----END PRIVATE KEY-----\n",
	  "client_email": "firebase-adminsdk-o2utm@naturactive-894c1.iam.gserviceaccount.com",
	  "client_id": "103372006200657872941",
	  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
	  "token_uri": "https://accounts.google.com/o/oauth2/token",
	  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
	  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-o2utm%40naturactive-894c1.iam.gserviceaccount.com"
	}),
	databaseURL: "https://naturactive-894c1.firebaseio.com"
});
// ----------------------- API KEY openweathermap -------------------------
// ----------------------- PARAMETRES DU SERVEUR -------------------------
const PORT = process.env.PORT || 5000;
// Wit.ai parameters
const WIT_TOKEN = "CLVD7TIH4V6AM644JYJOPIUF4F255XXJ"; // saisir ici vos informations (infos sur session XX)
// Messenger API parameters
const FB_PAGE_TOKEN = "EAADHURv0ZB9kBAI8fe1LYGDp7YceIFz3Qud2ibQK4DuF2m1K3zOZASjOlEgOcR3A2CpQ5CnlzQGBjcKcJfOGFKxoYTzUmZAuG4G6ckfiOcQlSSA6NQebvurWhYbAjP7QuZAf1FYz95JuP9rYH7yxZAtqUqVkmF0ZB94lOK3g6DmgZDZD"; // saisir ici vos informations (infos sur session XX)
if (!FB_PAGE_TOKEN) {
	throw new Error('missing FB_PAGE_TOKEN')
}
const FB_APP_SECRET = "5c35ae0a66279de2280422e5b919b4b7"; // saisir ici vos informations (infos sur session XX)
if (!FB_APP_SECRET) {
	throw new Error('missing FB_APP_SECRET')
}
let FB_VERIFY_TOKEN = "mot_de_passe_33"; // saisir ici vos informations (infos sur session XX)
crypto.randomBytes(8, (err, buff) => {
	if (err) throw err;
	FB_VERIFY_TOKEN = buff.toString('hex');
	console.log(`/webhook will accept the Verify Token "${FB_VERIFY_TOKEN}"`);
});
// ----------------------- FONCTION POUR VERIFIER UTILISATEUR OU CREER ----------------------------
var checkAndCreate = (sessionId, fbid, prenom, nom, genre) => {
	return new Promise((resolve, reject) => {
		var userz = firebase.database()
		.ref()
		.child("accounts")
		.orderByChild("fbid")
		.equalTo(fbid)
		.once("value")
		.then(function(snapshot) {
			var exists = (snapshot.val() !== null);
			if (exists) {

					for (var key in snapshot.val()) break;
					console.log("ouiii jexiste" + key);
					sessions[sessionId].key = key;
					// I have the key we can continue
					snapshot.forEach(function(childSnapshot) {
						console.log('snapshot.dernier_message' + childSnapshot.val()
							.dernier_message);
					sessions[sessionId].dernier_message = childSnapshot.val()
						.dernier_message;
						resolve(childSnapshot.val()
							.dernier_message);
					});

			}
			else {
					admin.auth()
						.createCustomToken(fbid)
						.then((customToken) => firebase.auth()
							.signInWithCustomToken(customToken))
						.then(() => {
							var user2 = firebase.auth()
								.currentUser;
							var keyid = firebase.database()
								.ref()
								.child('accounts')
								.push();
							sessions[sessionId].key = keyid.key;
							// I have the key we can continue
							sessions[sessionId].dernier_message = new Date();
							firebase.database()
								.ref()
								.child('accounts')
								.child(keyid.key)
								.set({
									fbid: fbid,
									cgu : false,
									prenom: prenom,
									nom: nom,
									nb_agression: 0,
									dernier_message: new Date(),
									genre: genre,
									date: new Date()
										.toISOString()
								});

								var otherDatabase = otherApp.database();
								otherDatabase.ref()
								.child('accounts')
								.child(keyid.key)
								.set({
									nb_agression: 0,
									dernier_message: new Date(),
									genre: genre,
									date: new Date()
										.toISOString()
								});

							resolve(keyid.key);
						})
						.catch((error) => {
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
// ------------------------ FONCTION DEMANDE INFORMATIONS USER -------------------------
var requestUserName = (id) => {
	return new Promise((resolve, reject) => {
			var qs = 'access_token=' + encodeURIComponent(FB_PAGE_TOKEN);
			fetch('https://graph.facebook.com/v2.8/' + encodeURIComponent(id) + '?' + qs).then(rsp => rsp.json()).then(json => {
				if (json.error && json.error.message) {
					throw new Error(json.error.message);
					reject();
				}
				resolve(json);
			});
	});
};
// ------------------------- ENVOI MESSAGES SIMPLES ( Texte, images, boutons génériques, ...) -----------
var fbMessage = (id, data) => {
	var type = "RESPONSE";
	var body = JSON.stringify({
		messaging_type: type,
		recipient: {
			id
		},
		message: data,
	});
	console.log("BODY" + body);
	var qs = 'access_token=' + encodeURIComponent(FB_PAGE_TOKEN);
	return fetch('https://graph.facebook.com/me/messages?' + qs, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body,
	}).then(rsp => rsp.json()).then(json => {
		if (json.error && json.error.message) {
			console.log(json.error.message + ' ' + json.error.type + ' ' + json.error.code + ' ' + json.error.error_subcode + ' ' + json.error.fbtrace_id);
		}
		return json;
	});
};
var fbMessage3 = (id, data) => {
	var type = "RESPONSE";
	var body = JSON.stringify({
		messaging_type: type,
		recipient: {
			id
		},
		sender_action: data
	});
	console.log("BODY3" + body);
	var qs = 'access_token=' + encodeURIComponent(FB_PAGE_TOKEN);
	return fetch('https://graph.facebook.com/me/messages?' + qs, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body,
	}).then(rsp => rsp.json()).then(json => {
		if (json.error && json.error.message) {
			console.log(json.error.message + ' ' + json.error.type + ' ' + json.error.code + ' ' + json.error.error_subcode + ' ' + json.error.fbtrace_id);
		}
		return json;
	});
};
// ------------------------------------------------------------------------
const sessions = {};
// ------------------------ FONCTION DE CREATION DE SESSION ---------------------------
var findOrCreateSession = (fbid) => {
	return new Promise((resolve, reject) => {
		let sessionId;
		Object.keys(sessions).forEach(k => {
			if (sessions[k].fbid === fbid) {
				sessionId = k;
				console.log("jai deja la session"+sessionId);
				sessions[sessionId].dernier_message = new Date();
				//resolve(sessionId);
			}
		});
		if (!sessionId) {
			sessionId = new Date().toISOString();
			sessions[sessionId] = {
				fbid: fbid,
				context: {}
			};
		}
			requestUserName(fbid).then(function(json) {
				sessions[sessionId].name = json.first_name;
				checkAndCreate(sessionId, fbid, json.first_name, json.last_name, json.gender).then(function(lakey) {
					console.log("jai la key resolve"+lakey);
					resolve(sessionId);
				}).catch(function(err){
					console.error('Oops! Il y a une erreur checkAndCreate : ', err.stack || err);
					reject();
				});
			}).catch(function(err){
				console.error('Oops! Il y a une erreur : ', err.stack || err);
				reject();
			});

	});
	//return sessionId;
};
// ------------------------ FONCTION DE RECHERCHE D'ENTITES ---------------------------
var firstEntityValue = function(entities, entity) {
	var val = entities && entities[entity] && Array.isArray(entities[entity]) && entities[entity].length > 0 && entities[entity][0].value
	if (!val) {
		return null
	}
	return typeof val === 'object' ? val.value : val
}
// ------------------------ LISTE DE TOUTES VOS ACTIONS A EFFECTUER ---------------------------
var timer;
var temps_entre_chaque_message = 2200;
var temps_avant_relance = 4000;
var url_chatbot = "1514130225373634";
// Auto-Apprentissage Interrupteur
var autoApp = 'OFF';

// Il y a 12h : Réglage ici


var actions = {
	// fonctions genérales à définir ici
	send({sessionId}, response) {
		const recipientId = sessions[sessionId].fbid;
		if (recipientId) {
			if (response.quickreplies) {
				response.quick_replies = [];
				for (var i = 0, len = response.quickreplies.length; i < len; i++) {
					response.quick_replies.push({
						title: response.quickreplies[i],
						content_type: 'text',
						payload: response.quickreplies[i]
					});
				}
				delete response.quickreplies;
			}
			return fbMessage(recipientId, response).then(() => null).catch((err) => {
				console.log("Je send" + recipientId);
				console.error('Oops! erreur ', recipientId, ':', err.stack || err);
			});
		}
		else {
			console.error('Oops! utilisateur non trouvé : ', sessionId);
			return Promise.resolve()
		}
	},
	getUserName(sessionId, context, entities) {
		const recipientId = sessions[sessionId].fbid;
		const name = sessions[sessionId].name || null;
		return new Promise(function(resolve, reject) {
			if (recipientId) {
				if (name) {
					context.userName = name;
					resolve(context);
				}
				else {
					requestUserName(recipientId).then((json) => {
						sessions[sessionId].name = json.first_name;
						context.userName = json.first_name; // Stockage prénom dans le context !
						resolve(context);
					}).catch(function(err){
						console.log("ERROR = " + err);
						console.error('Oops! Erreur : ', err.stack || err);
						reject(err);
					});
				}
			}
			else {
				console.error('Oops! pas trouvé user :', sessionId);
				reject();
			}
		});
	},
	envoyer_message_text(sessionId, context, entities, text) {
		const recipientId = sessions[sessionId].fbid;
		var response = {
			"text": text
		};
		return fbMessage(recipientId, response).then(() => {}).catch((err) => {
			console.log("Erreur envoyer_message_text" + recipientId);
		});
	},
	envoyer_message_bouton_generique(sessionId, context, entities, elements) {
		const recipientId = sessions[sessionId].fbid;
		return fbMessage(recipientId, elements).then(() => {}).catch((err) => {
			console.log("Erreur envoyer_message_bouton_generique" + recipientId);
		});
	},
	envoyer_message_quickreplies(sessionId, context, entities, text, quick) {
		const recipientId = sessions[sessionId].fbid;
		var response2 = {
			"text": text,
			"quick_replies": quick
		};
		return fbMessage(recipientId, response2).then(() => {}).catch((err) => {
			console.log("Erreur envoyer_message_text" + recipientId);
		});
	},
	envoyer_message_image(sessionId, context, entities, image_url) {
		const recipientId = sessions[sessionId].fbid;
		var response = {
			"attachment": {
				"type": "image",
				"payload": {
					"url": image_url
				}
			}
		};
		return fbMessage(recipientId, response).then(() => {}).catch((err) => {
			console.log("Erreur envoyer_message_text" + recipientId);
		});
	},
	reset_context(entities, context, sessionId) {
		console.log("Je vais reset le context" + JSON.stringify(context));
		return new Promise(function(resolve, reject) {
			context = {};
			return resolve(context);
		});
	},
	timer(entities, context, sessionId, seconds) {
		// afficher les pointillés
		const recipientId = sessions[sessionId].fbid;
		return new Promise(function(resolve, reject) {
			var response4 = "typing_on";
			fbMessage3(recipientId, response4).then(() => {
				var response4a = "typing_off";
				timer = setTimeout(function() {
					fbMessage3(recipientId, response4a).then(() => {
						console.log("okay typing_off " + recipientId);
						resolve();
					}).catch((err) => {
						console.log("Erreur typing_on" + recipientId);
						console.error('Oops! An error forwarding the typing_on to', recipientId, ':', err.stack || err);
						reject();
					});
				}, seconds);
			}).catch((err) => {
				reject();
				console.log("Erreur typing_on" + recipientId);
				console.error('Oops! An error forwarding the typing_on to', recipientId, ':', err.stack || err);
			});
			// au bout de X secondes, les eteindre
		});
	},
  estampille_last_interaction(keyid, entities, context, sessionId) {
    // ici dire la base de données Firebase que la deniere intaraction date de maintenant
      var date = Date.now();
			return firebase.database().ref().child('accounts/' + keyid).update({date_last_interaction : date, dernier_message : date}).catch(function(error) {
				console.log("erreur from firebas 13");
				var otherDatabase = otherApp.database();
				otherDatabase.ref().child('accounts/' + keyid).update({date_last_interaction : date, dernier_message : date});
			});
  },
  estampille_retour_3_semaines(entities, context, sessionId) {
    // ici dire la base de données Firebase que la deniere intaraction Spéciale (carte fidélité, etc) date de maintenant
      var date = Date.now();
      var keyid = sessions[sessionId].key;
      return firebase.database().ref().child('accounts/' + keyid).child('date_last_speciale').set(date).catch(function(error) {
				console.log("erreur from firebas 14");
				var otherDatabase = otherApp.database();
				otherDatabase.ref().child('accounts/' + keyid).child('date_last_speciale').set(date);
			});
  },
  estampille_star(entities, context, sessionId, valeur) {
    var keyid = sessions[sessionId].key;
    var star = valeur;
    var date = Date();
    star = star.split("_");
    return firebase.database().ref('accounts/'+keyid).child('note_satisfaction').set(parseInt(star[0]))
    .then(function(snapshot) {
    	// insérer dans les notes
			var otherDatabase = otherApp.database();
			otherDatabase.ref('accounts/'+keyid).child('note_satisfaction').set(parseInt(star[0]));
		      var pipo = firebase.database().ref('note_satisfaction').push().set({
		      id_account: keyid,
		      date: date,
		      note: parseInt(star[0])
		    });
				var pipo2 = otherDatabase.ref('note_satisfaction').push().set({
				id_account: keyid,
				date: date,
				note: parseInt(star[0])
			});
    }).catch(function(error) {
			console.log("erreur from firebas 15");
		});
  },
  estampille_insulte(entities, context, sessionId) {
    var keyid = sessions[sessionId].key;
		var databaseRef = firebase.database().ref('accounts/'+keyid).child('nb_agression');
		databaseRef.transaction(function(searches) {
				return (searches || 0) + 1;
		}).then(function() {
			var otherDatabase = otherApp.database();
			otherDatabase.ref('accounts/'+keyid).child('nb_agression');
			databaseRef.transaction(function(searches) {
					return (searches || 0) + 1;
			});
		}).catch(function(error) {
			console.log("erreur from firebas 16");
		});
  }

};
//--------------------- STOCKAGE DANS FIREBASE------------
function stockFirebaseData(key_user, message, keyid) {
	firebase.database().ref().child('accounts/' + key_user).child('fil').child(keyid.key).set(true).catch(function(error) {
		console.log("erreur from firebas 17");
	});
	console.log('voici la clé user Freiabse dans accounts/: ' + key_user);
	console.log('voici la cle de la conversation : ' + keyid);
	if(key_user == undefined) {
		return;
	}else {
		return firebase.database().ref().child('fil').child(keyid.key).set({
			message: message,
			id_account: key_user,
			date: new Date().toISOString()
		}).catch(function(error) {
			console.log("erreur from firebas 18");
		});
	}
}

function stockFirebaseData2(key_user, message, keyid) {
	var otherDatabase = otherApp.database();
	otherDatabase.ref().child('accounts/' + key_user).child('fil').child(keyid.key).set(true).catch(function(error) {
		console.log("erreur from firebas 17");
	});
	console.log('voici la clé user Freiabse dans accounts/: ' + key_user);
	console.log('voici la cle de la conversation : ' + keyid);
	if(key_user == undefined) {
		return;
	}else {
		var otherDatabase = otherApp.database();
		return otherDatabase.ref().child('fil').child(keyid.key).set({
			message: message,
			id_account: key_user,
			date: new Date().toISOString()
		}).catch(function(error) {
			console.log("erreur from firebas 18");
		});
	}
}




var apprentissage = false;
// --------------------- CHOISIR LA PROCHAINE ACTION (LOGIQUE) EN FCT DES ENTITES OU INTENTIONS------------
function choisir_prochaine_action(sessionId, context, entities, lakeyuser, clic_sur_payload) {
	// ACTION PAR DEFAUT CAR AUCUNE ENTITE DETECTEE
	console.log("ENTITIES : " + JSON.stringify(entities));
	console.log("je vais chercher avec la key" + lakeyuser);
	if (lakeyuser === "undefined" || lakeyuser === undefined) {
		console.log("key undefinded mon gars !");
		// premiere intéraction avant de rentrer dans la bdd
		if (entities.actions && entities.actions[0].value == 'FIRST_INTERACTION_BOT') {
			// affichage du message de bienveie Anabelle
			var msg = {
				"attachment": {
					"type": "template",
					"payload": {
						"template_type": "generic",
						"image_aspect_ratio": "square",
						"sharable" : false,
						"elements": [{
							"title": "1 - Faites défiler pour consulter les CGU ➡",
							"image_url": "https://mon-chatbot.com/naturactive/tuto1.png",
							"subtitle": "Parcourez mes suggestions de droite à gauche."
						},
						{
							"title": "2 - Je valide les CGU",
							"image_url": "https://mon-chatbot.com/naturactive/tuto1bis.png",
							"subtitle": "Consultez et validez nos CGU afin d'accéder directement au ChatBot.",
							"buttons": [{
								"type": "web_url",
								"url": "https://www.naturactive.fr/actualite/charte-dutilisation-de-la-page-naturactive?utm_source=Messenger&utm_medium=Chatbot",
								"title": "Lire les CGU"
							}, {
								"type": "postback",
								"payload": "POURSUIVRE_VERS_BOT",
								"title": "✅ Je valide les CGU"
							}]
						},
						{
							"title": "3 - Laissez-vous guider",
							"image_url": "https://mon-chatbot.com/naturactive/tuto2.png",
							"subtitle": "Mon utilisation est simplifiée; il vous suffit de cliquer sur les boutons et images et vous laisser guider."
						},{
							"title": "4 - Posez-moi vos questions",
							"image_url": "https://mon-chatbot.com/naturactive/tuto3.png",
							"subtitle": "Si vous le souhaitez, vous pouvez directement me formuler des questions par texte."
						},{
							"title": "5 - Recommencez à tout moment",
							"image_url": "https://mon-chatbot.com/naturactive/tuto4.png",
							"subtitle": "Revenez à l'accueil à tout moment et rapidement grâce au menu persistant."
						},{
							"title": "6 - Contactez-nous",
							"image_url": "https://mon-chatbot.com/naturactive/tuto5.png",
							"subtitle": "Si je n'ai pas reussi à vous donner une réponse satisfaisante, contactez facilement nos équipes. "
						}]
					}
				}
			};
			var quick = [{
				"content_type": "text",
				"title": "Je valide les CGU",
				"image_url": "https://mon-chatbot.com/checked.png",
				"payload": "POURSUIVRE_VERS_BOT"
			}, {
				"content_type": "text",
				"title": "Recommencer",
				"image_url": "https://mon-chatbot.com/cancel.png",
				"payload": "FIRST_INTERACTION_BOT"
			}];
			actions.reset_context(entities, context, sessionId).then(function() {
				actions.getUserName(sessionId, context, entities).then(function() {
					actions.envoyer_message_text(sessionId, context, entities, 'Bonjour ' + context.userName + ', je suis Anabelle de Naturactive.').then(function() {
						actions.timer(entities, context, sessionId, temps_entre_chaque_message).then(function() {
							actions.envoyer_message_text(sessionId, context, entities, 'Voici un petit peu d\'aide concernant mon fonctionnement.').then(function() {
								actions.timer(entities, context, sessionId, temps_entre_chaque_message).then(function() {
									actions.envoyer_message_bouton_generique(sessionId, context, entities, msg).then(function() {
										actions.timer(entities, context, sessionId, 5000).then(function() {
											actions.envoyer_message_quickreplies(sessionId, context, entities, "Afin de continuer, vous devez accepter les Conditions Générales d\'Utilisation.", quick);
										})
									})
								})
							})
						})
					})
				})
			})
		}
		else if (entities.actions && entities.actions[0].value == 'POURSUIVRE_VERS_BOT') {
			// On stocke sur firebase que cet utilisateur a bien accepté les CGU
			var keyid = sessions[sessionId].key;
			firebase.database().ref().child('accounts/' + keyid).child('cgu').set(true).then(function() {
				var msg = {
					"attachment": {
						"type": "template",
						"payload": {
							"template_type": "generic",
                "sharable" : false,
							"elements": [{
								"title": "Nos produits",
								"image_url": "https://www.naturactive.fr/sites/all/themes/naturactive2016/images/menu_background1.png",
								"subtitle": "Découvrez ici la gamme de produits Naturactive.",
								"buttons": [{
									"type": "postback",
									"payload": "menu_produits",
									"title": "La Gamme"
								}, {
									"type": "postback",
									"payload": "menu_besoins",
									"title": "Vos besoins"
								}, {
									"type": "postback",
									"payload": "menu_des_naturac",
									"title": "Nos Naturactifs"
								}]
							}, {
								"title": "Naturactive au Quotidien",
								"image_url": "https://mon-chatbot.com/faq-icon.png",
								"subtitle": "Découvrez ici les réponses à vos questions les plus fréquentes.",
								"buttons": [{
									"type": "postback",
									"payload": "menu_foire_aux_questions",
									"title": "Découvrir"
								}]
							}, {
								"title": "Information Médicales et PharmacoVigilance",
								"image_url": "https://mon-chatbot.com/natur.png",
								"subtitle": "Signalez nous un problème suite à l’utilisation d’un médicament ou d’un produit de santé.",
								"buttons": [{
									"type": "web_url",
									"messenger_extensions": true,

									"url": "https://mon-chatbot.com/naturactive/form-medical.html",
									"title": "👨‍⚕️ Information Médicales"
								}, {
									"type": "web_url",
									"messenger_extensions": true,
									"url": "https://mon-chatbot.com/naturactive/form-vigilance.html",
									"title": "PharmacoVigilance"
								}]
							}, {
								"title": "Informations",
								"image_url": "https://mon-chatbot.com/infos.png",
								"subtitle": "En savoir plus sur notre Univers et notre Savoir-Faire",
								"buttons": [{
									"type": "web_url",
									"url": "https://www.naturactive.fr/le-mag/la-une?utm_source=Messenger&utm_medium=Chatbot",
									"title": "Votre Mag"
								}, {
									"type": "web_url",
									"url": "https://www.naturactive.fr/notre-marque?utm_source=Messenger&utm_medium=Chatbot",
									"title": "Notre marque & Savoir-Faire"
								}, {
									"type": "web_url",
									"url": "https://www.naturactive.fr/nos-chiffres-cles?utm_source=Messenger&utm_medium=Chatbot",
									"title": "Nos Engagements"
								}]
							}, {
								"title": "Vous pouvez également nous contacter par email",
								"image_url": "https://mon-chatbot.com/email.png",
								"subtitle": "À propos de nos produits, à propos de notre programme fidélité, etc.",
								"buttons": [{
									"type": "web_url",
									"url": "https://www.naturactive.fr/nous-contacter?utm_source=Messenger&utm_medium=Chatbot",
									"title": "En savoir +"
								}]
							}]
						}
					}
				};
				var msg3 = {
					"attachment":{
						"type":"template",
						"payload":{
							"template_type":"button",
							"text":"Je vous rappelle que si vous souhaitez nous déclarer un problème lié à l \'utilisation de nos produits, contactez directement le service de Pharmacovigilance",
							"buttons": [{
								"type": "web_url",
								"messenger_extensions": true,
								"url": "https://mon-chatbot.com/naturactive/form-vigilance.html",
								"title": "💊 Pharmacovigilance"
							}]
						}
					}
				};
				// rajouter pharmaco
				actions.reset_context(entities, context, sessionId).then(function() {
					actions.getUserName(sessionId, context, entities).then(function() {
						actions.envoyer_message_text(sessionId, context, entities, 'Bonjour ' + context.userName + ', je suis Anabelle de Naturactive.').then(function() {
							actions.timer(entities, context, sessionId, temps_entre_chaque_message).then(function() {
								actions.envoyer_message_text(sessionId, context, entities, 'Je suis là pour répondre à vos questions sur l’univers de notre marque.').then(function() {
									actions.timer(entities, context, sessionId, temps_entre_chaque_message).then(function() {
										actions.envoyer_message_text(sessionId, context, entities, 'Laissez-vous guider ou bien posez moi directement une question.').then(function() {
											actions.timer(entities, context, sessionId, temps_entre_chaque_message).then(function() {
												actions.envoyer_message_bouton_generique(sessionId, context, entities, msg3).then(function() {
													actions.timer(entities, context, sessionId, 3200).then(function() {
														actions.envoyer_message_bouton_generique(sessionId, context, entities, msg).then(function() {
															actions.estampille_last_interaction(sessions[sessionId].key, entities, context, sessionId);
														})
													})
												})
											})
										})
									})
								})
							})
						})
					})
				})
			}).then(function() {
				var otherDatabase = otherApp.database();
				otherDatabase.ref().child('accounts/' + keyid).child('cgu').set(true);
			}).catch(function(error) {
				console.log("erreur from firebas 20");
			});
			// et on affiche le meme message que Dire_Bonjour sans l'entete
		}
	}
	else {
		console.log("je suis dans le else ok");
		firebase.database().ref('accounts/' + lakeyuser).child("cgu").once("value").then(function(snapshot) {
			var exists = (snapshot.val() !== false);
			console.log("exist" + exists);
			if (!exists) {
				console.log("IL EXISTE PA");
				// Si cgu == false ou nexiste pas
				if (entities.actions && entities.actions[0].value == 'FIRST_INTERACTION_BOT') {
					// affichage du message de bienveie Anabelle
					var msg = {
						"attachment": {
							"type": "template",
							"payload": {
								"template_type": "generic",
								"image_aspect_ratio": "square",
								"sharable" : false,
								"elements": [{
									"title": "1 - Faites défiler pour consulter les CGU ➡",
									"image_url": "https://mon-chatbot.com/naturactive/tuto1.png",
									"subtitle": "Parcourez mes suggestions de droite à gauche."
								},
								{
									"title": "2 - Je valide les CGU",
									"image_url": "https://mon-chatbot.com/naturactive/tuto1bis.png",
									"subtitle": "Consultez et validez nos CGU afin d'accéder directement au ChatBot.",
									"buttons": [{
										"type": "web_url",
										"url": "https://www.naturactive.fr/actualite/charte-dutilisation-de-la-page-naturactive?utm_source=Messenger&utm_medium=Chatbot",
										"title": "Lire les CGU"
									}, {
										"type": "postback",
										"payload": "POURSUIVRE_VERS_BOT",
										"title": "✅ Je valide les CGU"
									}]
								},
								{
									"title": "3 - Laissez-vous guider",
									"image_url": "https://mon-chatbot.com/naturactive/tuto2.png",
									"subtitle": "Mon utilisation est simplifiée; il vous suffit de cliquer sur les boutons et images et vous laisser guider."
								},{
									"title": "4 - Posez-moi vos questions",
									"image_url": "https://mon-chatbot.com/naturactive/tuto3.png",
									"subtitle": "Si vous le souhaitez, vous pouvez directement me formuler des questions par texte."
								},{
									"title": "5 - Recommencez à tout moment",
									"image_url": "https://mon-chatbot.com/naturactive/tuto4.png",
									"subtitle": "Revenez à l'accueil à tout moment et rapidement grâce au menu persistant."
								},{
									"title": "6 - Contactez-nous",
									"image_url": "https://mon-chatbot.com/naturactive/tuto5.png",
									"subtitle": "Si je n'ai pas reussi à vous donner une réponse satisfaisante, contactez facilement nos équipes. "
								}]
							}
						}
					};
					var quick = [{
						"content_type": "text",
						"title": "Je valide les CGU",
						"image_url": "https://mon-chatbot.com/checked.png",
						"payload": "POURSUIVRE_VERS_BOT"
					}, {
						"content_type": "text",
						"title": "Recommencer",
						"image_url": "https://mon-chatbot.com/cancel.png",
						"payload": "FIRST_INTERACTION_BOT"
					}];
					actions.reset_context(entities, context, sessionId).then(function() {
						actions.getUserName(sessionId, context, entities).then(function() {
							actions.envoyer_message_text(sessionId, context, entities, 'Bonjour ' + context.userName + ', je suis Anabelle de Naturactive.').then(function() {
								actions.timer(entities, context, sessionId, temps_entre_chaque_message).then(function() {
									actions.envoyer_message_text(sessionId, context, entities, 'Voici un petit peu d\'aide concernant mon fonctionnement.').then(function() {
										actions.timer(entities, context, sessionId, temps_entre_chaque_message).then(function() {
											actions.envoyer_message_bouton_generique(sessionId, context, entities, msg).then(function() {
												actions.timer(entities, context, sessionId, 5000).then(function() {
													actions.envoyer_message_quickreplies(sessionId, context, entities, "Afin de continuer, vous devez accepter les Conditions Générales d\'Utilisation.", quick);
												})
											})
										})
									})
								})
							})
						})
					})
				}
				else if (entities.actions && entities.actions[0].value == 'POURSUIVRE_VERS_BOT') {
					// On stocke sur firebase que cet utilisateur a bien accepté les CGU
					var keyid = sessions[sessionId].key;
					firebase.database().ref().child('accounts/' + keyid).child('cgu').set(true).then(function() {
						var msg = {
							"attachment": {
								"type": "template",
								"payload": {
									"template_type": "generic",
                    "sharable" : false,
									"elements": [{
										"title": "Nos produits",
										"image_url": "https://www.naturactive.fr/sites/all/themes/naturactive2016/images/menu_background1.png",
										"subtitle": "Découvrez ici la gamme de produits Naturactive.",
										"buttons": [{
											"type": "postback",
											"payload": "menu_produits",
											"title": "La Gamme"
										}, {
											"type": "postback",
											"payload": "menu_besoins",
											"title": "Vos besoins"
										}, {
											"type": "postback",
											"payload": "menu_des_naturac",
											"title": "Nos Naturactifs"
										}]
									}, {
										"title": "Naturactive au Quotidien",
										"image_url": "https://mon-chatbot.com/faq-icon.png",
										"subtitle": "Découvrez ici les réponses à vos questions les plus fréquentes.",
										"buttons": [{
											"type": "postback",
											"payload": "menu_foire_aux_questions",
											"title": "Découvrir"
										}]
									}, {
										"title": "Information Médicales et PharmacoVigilance",
										"image_url": "https://mon-chatbot.com/natur.png",
										"subtitle": "Signalez nous un problème suite à l’utilisation d’un médicament ou d’un produit de santé.",
										"buttons": [{
											"type": "web_url",
											"messenger_extensions": true,

											"url": "https://mon-chatbot.com/naturactive/form-medical.html",
											"title": "👨‍⚕️ Information Médicales"
										}, {
											"type": "web_url",
											"messenger_extensions": true,

											"url": "https://mon-chatbot.com/naturactive/form-vigilance.html",
											"title": "💊 PharmacoVigilance"
										}]
									}, {
										"title": "Informations",
										"image_url": "https://mon-chatbot.com/infos.png",
										"subtitle": "En savoir plus sur notre Univers et notre Savoir-Faire",
										"buttons": [{
											"type": "web_url",
											"url": "https://www.naturactive.fr/le-mag/la-une?utm_source=Messenger&utm_medium=Chatbot",
											"title": "Votre Mag"
										}, {
											"type": "web_url",
											"url": "https://www.naturactive.fr/notre-marque?utm_source=Messenger&utm_medium=Chatbot",
											"title": "Notre marque & Savoir-Faire"
										}, {
											"type": "web_url",
											"url": "https://www.naturactive.fr/nos-chiffres-cles?utm_source=Messenger&utm_medium=Chatbot",
											"title": "Nos Engagements"
										}]
									}, {
										"title": "Vous pouvez également nous contacter par email",
										"image_url": "https://mon-chatbot.com/email.png",
										"subtitle": "À propos de nos produits, à propos de notre programme fidélité, etc.",
										"buttons": [{
											"type": "web_url",
											"url": "https://www.naturactive.fr/nous-contacter?utm_source=Messenger&utm_medium=Chatbot",
											"title": "En savoir +"
										}]
									}]
								}
							}
						};
						var msg3 = {
							"attachment":{
								"type":"template",
								"payload":{
									"template_type":"button",
									"text":"Je vous rappelle que si vous souhaitez nous déclarer un problème lié à l \'utilisation de nos produits, contactez directement le service de Pharmacovigilance",
									"buttons": [{
										"type": "web_url",
										"messenger_extensions": true,
										"url": "https://mon-chatbot.com/naturactive/form-vigilance.html",
										"title": "💊 Pharmacovigilance"
									}]
								}
							}
						};
						actions.reset_context(entities, context, sessionId).then(function() {
  							actions.envoyer_message_text(sessionId, context, entities, "C'est parfait !").then(function() {
  								actions.timer(entities, context, sessionId, temps_entre_chaque_message).then(function() {
  									actions.envoyer_message_text(sessionId, context, entities, 'Je suis là pour répondre à vos questions sur l’univers de notre marque.').then(function() {
  										actions.timer(entities, context, sessionId, temps_entre_chaque_message).then(function() {
  											actions.envoyer_message_text(sessionId, context, entities, 'Laissez-vous guider ou bien posez moi directement une question.').then(function() {
													actions.timer(entities, context, sessionId, temps_entre_chaque_message).then(function() {
														actions.envoyer_message_bouton_generique(sessionId, context, entities, msg3).then(function() {
															actions.timer(entities, context, sessionId, 3200).then(function() {
			  												actions.envoyer_message_bouton_generique(sessionId, context, entities, msg).then(function() {
			            							  actions.estampille_last_interaction(sessions[sessionId].key, entities, context, sessionId);
			            							})
															})
														})
													})
  											})
  										})
  									})
  								})
  							})
  					})
					}).then(function() {
						var otherDatabase = otherApp.database();
						otherDatabase.ref().child('accounts/' + keyid).child('cgu').set(true);
					}).catch(function(error) {
						console.log("erreur from firebas 23");
					});
					// et on affiche le meme message que Dire_Bonjour sans l'entete
				}
				else { // je suis désolé mais vous devez

					var msg = {
						"attachment": {
							"type": "template",
							"payload": {
								"template_type": "button",
								"text": "En continuant notre discussion, vous acceptez mes conditions générales d'utilisations accessibles dans le menu ci-dessous.",
								"buttons": [{
									"type": "web_url",
									"url": "https://www.naturactive.fr/actualite/charte-dutilisation-de-la-page-naturactive?utm_source=Messenger&utm_medium=Chatbot",
									"title": "Lire les CGU"
								}, {
									"type": "postback",
									"payload": "POURSUIVRE_VERS_BOT",
									"title": "Je valide les CGU"
								}]
							}
						}
					};
					actions.reset_context(entities, context, sessionId).then(function() {
						actions.getUserName(sessionId, context, entities).then(function() {
							actions.envoyer_message_text(sessionId, context, entities, context.userName + ", vous n'avez pas accepté nos conditions générales.").then(function() {
								actions.timer(entities, context, sessionId, temps_entre_chaque_message).then(function() {
									actions.envoyer_message_bouton_generique(sessionId, context, entities, msg);
								})
							})
						})
					})
				}
			}
			else {
        // debut du gros else
        if(entities.insultes) {
          // insulte détectée dans la phrase
          firebase.database().ref('accounts/' + lakeyuser).child("nb_agression").once("value").then(function(snapshot)  {
            var exists = (snapshot.val() !== false);
						var quick = [{
							"content_type": "text",
							"title": "Retour accueil",
							"image_url": "https://mon-chatbot.com/reply-all-button.png",
							"payload": "RETOUR_ACCUEIL"
						}, {
							"content_type": "text",
							"title": "Autre question",
							"image_url": "https://mon-chatbot.com/discuss-issue.png",
							"payload": "Autre_QUESTION"
						}, {
							"content_type": "text",
							"title": "Signaler effets",
							"image_url": "https://mon-chatbot.com/tel.png",
							"payload": "Numero_vigilance"
						}, {
							"content_type": "text",
							"title": "Au revoir",
							"image_url": "https://mon-chatbot.com/sortie.png",
							"payload": "Dire_aurevoir"
						}];
						if(snapshot.val() == 0) {
							// premiere insultes
							actions.reset_context(entities, context, sessionId).then(function() {
                actions.envoyer_message_text(sessionId, context, entities, "Je ne suis pas là pour lire ou répondre à ce genre de propos. Veuillez modérer votre langage s'il vous plaît !").then(function() {
                  actions.timer(entities, context, sessionId, temps_avant_relance).then(function() {
                    actions.envoyer_message_quickreplies(sessionId, context, entities, "Je reste à votre disposition.", quick).then(function() {
                      actions.estampille_insulte(entities, context, sessionId);
                    })
                  })
                })
              })
							// incrementation
						}
						else if(snapshot.val() == 1) {
							// premiere insultes, présentation des produits de stress
							var msg = {
                "attachment":{
                  "type":"template",
                  "payload":{
                    "template_type":"button",
                    "text":"Pour vous détendre, je vous propose de découvrir nos solutions pour combatte le stress",
                    "buttons":[
                      {
                        "type":"web_url",
                        "url":"https://www.naturactive.fr/nos-produits/nutrition-sante/stresssommeil-seriane?utm_source=Messenger&utm_medium=Chatbot",
                        "title":"Voir les produits"
                      }
                    ]
                  }
                }
              };
  						actions.reset_context(entities, context, sessionId).then(function() {
  							actions.getUserName(sessionId, context, entities).then(function() {
  								actions.envoyer_message_text(sessionId, context, entities, "Je vous sens tendu "+context.userName+" !").then(function() {
  									actions.timer(entities, context, sessionId, temps_entre_chaque_message).then(function() {
                      actions.envoyer_message_bouton_generique(sessionId, context, entities, msg).then(function() {
                        actions.timer(entities, context, sessionId, temps_avant_relance).then(function() {
                          actions.envoyer_message_quickreplies(sessionId, context, entities, "Je reste à votre disposition.", quick).then(function() {
                          	actions.estampille_insulte(entities, context, sessionId);
                          })
                        })
                      })
  									})
  								})
  							})
  						})
							// incrementation
						}
						else if(snapshot.val() >= 2) {
							// random parmis 4 phrases à mettre dans un tableau js
							var tab = ["Merci d’arrêter de m’insulter désormais.", "Comme je viens de vous dire, je ne suis pas là pour répondre à vos insultes. Merci d’arrêter", "Je vous prie de me respecter et d’arrêter vos insultes, ça suffit !", "Vos insultes sont très vexantes, je vous prie de changer de langage s’il vous plaît.", "Pouvez-vous cesser vos insultes désormais, afin de reprendre une vraie conversation ?"];
							var phrase = tab[Math.floor(Math.random() * tab.length)];
							// incrementation
							actions.reset_context(entities, context, sessionId).then(function() {
                actions.envoyer_message_text(sessionId, context, entities, phrase).then(function() {
                  actions.timer(entities, context, sessionId, temps_avant_relance).then(function() {
                    actions.envoyer_message_quickreplies(sessionId, context, entities, "Je reste à votre disposition.", quick).then(function() {
                      actions.estampille_insulte(entities, context, sessionId);
                    })
                  })
                })
              })
						}
          }).catch(function(error) {
						console.log("erreur from firebas 40 once");
					});;
        }
        else {
          // y'a pas d'insultes on continue
  				console.log("IL EXISTE CEST BON");
  				// cgu == true on est donc dans le chatbot tout va bien !
  				if (Object.keys(entities).length === 0 && entities.constructor === Object) {
  					// Affichage message par defaut : Je n'ai pas compris votre message !
  					var msg = {
  						"attachment": {
  							"type": "template",
  							"payload": {
  								"template_type": "generic",
                  "sharable" : false,
  								"elements": [{
  									"title": "Nos produits",
  									"image_url": "https://www.naturactive.fr/sites/all/themes/naturactive2016/images/menu_background1.png",
  									"subtitle": "Découvrez ici la gamme de produits Naturactive.",
  									"buttons": [{
  										"type": "postback",
  										"payload": "menu_produits",
  										"title": "La Gamme"
  									}, {
  										"type": "postback",
  										"payload": "menu_besoins",
  										"title": "Vos besoins"
  									}, {
  										"type": "postback",
  										"payload": "menu_des_naturac",
  										"title": "Nos Naturactifs"
  									}]
  								}, {
  									"title": "Naturactive au Quotidien",
  									"image_url": "https://mon-chatbot.com/faq-icon.png",
  									"subtitle": "Découvrez ici les réponses à vos questions les plus fréquentes.",
  									"buttons": [{
  										"type": "postback",
  										"payload": "menu_foire_aux_questions",
  										"title": "Découvrir"
  									}]
  								}, {
  									"title": "Information Médicales et PharmacoVigilance",
  									"image_url": "https://mon-chatbot.com/natur.png",
  									"subtitle": "Signalez nous un problème suite à l’utilisation d’un médicament ou d’un produit de santé.",
  									"buttons": [{
  										"type": "web_url",
  										"messenger_extensions": true,
  										"url": "https://mon-chatbot.com/naturactive/form-medical.html",
  										"title": "👨‍⚕️ Information Médicales"
  									}, {
  										"type": "web_url",
  										"messenger_extensions": true,
  										"url": "https://mon-chatbot.com/naturactive/form-vigilance.html",
  										"title": "💊 PharmacoVigilance"
  									}]
  								}, {
  									"title": "Informations",
  									"image_url": "https://mon-chatbot.com/infos.png",
  									"subtitle": "En savoir plus sur notre Univers et notre Savoir-Faire",
  									"buttons": [{
  										"type": "web_url",
  										"url": "https://www.naturactive.fr/le-mag/la-une?utm_source=Messenger&utm_medium=Chatbot",
  										"title": "Votre Mag"
  									}, {
  										"type": "web_url",
  										"url": "https://www.naturactive.fr/notre-marque?utm_source=Messenger&utm_medium=Chatbot",
  										"title": "Notre marque & Savoir-Faire"
  									}, {
  										"type": "web_url",
  										"url": "https://www.naturactive.fr/nos-chiffres-cles?utm_source=Messenger&utm_medium=Chatbot",
  										"title": "Nos Engagements"
  									}]
  								}, {
  									"title": "Vous pouvez également nous contacter par email",
  									"image_url": "https://mon-chatbot.com/email.png",
  									"subtitle": "À propos de nos produits, à propos de notre programme fidélité, etc.",
  									"buttons": [{
  										"type": "web_url",
  										"url": "https://www.naturactive.fr/nous-contacter?utm_source=Messenger&utm_medium=Chatbot",
  										"title": "En savoir +"
  									}]
  								}]
  							}
  						}
  					};
  					actions.reset_context(entities, context, sessionId).then(function() {
  						actions.getUserName(sessionId, context, entities).then(function() {
  							actions.envoyer_message_text(sessionId, context, entities, "Je n'ai pas compris votre question ...").then(function() {
  								actions.timer(entities, context, sessionId, temps_entre_chaque_message).then(function() {
  									actions.envoyer_message_text(sessionId, context, entities, 'Laissez-vous guider ou bien posez-moi directement une autre question !').then(function() {
  										actions.envoyer_message_bouton_generique(sessionId, context, entities, msg);
  									})
  								})
  							})
  						})
  					})
  				}
  				if ( (entities.Dire_Bonjour && entities.Dire_Bonjour[0].value && (!entities.intent || entities.intent[0].confidence <= 0.05)) || (entities.actions && entities.actions[0].value == 'FIRST_INTERACTION_BOT') ) {
  					var msg = {
  						"attachment": {
  							"type": "template",
  							"payload": {
  								"template_type": "generic",
                    "sharable" : false,
  								"elements": [{
  									"title": "Nos produits",
  									"image_url": "https://www.naturactive.fr/sites/all/themes/naturactive2016/images/menu_background1.png",
  									"subtitle": "Découvrez ici la gamme de produits Naturactive.",
  									"buttons": [{
  										"type": "postback",
  										"payload": "menu_produits",
  										"title": "La Gamme"
  									}, {
  										"type": "postback",
  										"payload": "menu_besoins",
  										"title": "Vos besoins"
  									}, {
  										"type": "postback",
  										"payload": "menu_des_naturac",
  										"title": "Nos Naturactifs"
  									}]
  								}, {
  									"title": "Naturactive au Quotidien",
  									"image_url": "https://mon-chatbot.com/faq-icon.png",
  									"subtitle": "Découvrez ici les réponses à vos questions les plus fréquentes.",
  									"buttons": [{
  										"type": "postback",
  										"payload": "menu_foire_aux_questions",
  										"title": "Découvrir"
  									}]
  								}, {
  									"title": "Information Médicales et PharmacoVigilance",
  									"image_url": "https://mon-chatbot.com/natur.png",
  									"subtitle": "Signalez nous un problème suite à l’utilisation d’un médicament ou d’un produit de santé.",
  									"buttons": [{
  										"type": "web_url",
  										"messenger_extensions": true,

  										"url": "https://mon-chatbot.com/naturactive/form-medical.html",
  										"title": "👨‍⚕️ Information Médicales"
  									}, {
  										"type": "web_url",
  										"messenger_extensions": true,

  										"url": "https://mon-chatbot.com/naturactive/form-vigilance.html",
  										"title": "💊 PharmacoVigilance"
  									}]
  								}, {
  									"title": "Informations",
  									"image_url": "https://mon-chatbot.com/infos.png",
  									"subtitle": "En savoir plus sur notre Univers et notre Savoir-Faire",
  									"buttons": [{
  										"type": "web_url",
  										"url": "https://www.naturactive.fr/le-mag/la-une?utm_source=Messenger&utm_medium=Chatbot",
  										"title": "Votre Mag"
  									}, {
  										"type": "web_url",
  										"url": "https://www.naturactive.fr/notre-marque?utm_source=Messenger&utm_medium=Chatbot",
  										"title": "Notre marque & Savoir-Faire"
  									}, {
  										"type": "web_url",
  										"url": "https://www.naturactive.fr/nos-chiffres-cles?utm_source=Messenger&utm_medium=Chatbot",
  										"title": "Nos Engagements"
  									}]
  								}, {
  									"title": "Vous pouvez également nous contacter par email",
  									"image_url": "https://mon-chatbot.com/email.png",
  									"subtitle": "À propos de nos produits, à propos de notre programme fidélité, etc.",
  									"buttons": [{
  										"type": "web_url",
  										"url": "https://www.naturactive.fr/nous-contacter?utm_source=Messenger&utm_medium=Chatbot",
  										"title": "En savoir +"
  									}]
  								}]
  							}
  						}
  					};
						var msg3 = {
					    "attachment":{
					      "type":"template",
					      "payload":{
					        "template_type":"button",
					        "text":"Si vous souhaitez nous déclarer un problème lié à l \'utilisation de nos produits, contactez directement le service de Pharmacovigilance",
									"buttons": [{
										"type": "web_url",
										"messenger_extensions": true,
										"url": "https://mon-chatbot.com/naturactive/form-vigilance.html",
										"title": "💊 Pharmacovigilance"
									}]
					      }
					    }
					  };
  					actions.reset_context(entities, context, sessionId).then(function() {
  						actions.getUserName(sessionId, context, entities).then(function() {
  							actions.envoyer_message_text(sessionId, context, entities, 'Bonjour ' + context.userName + ', je suis Anabelle de Naturactive.').then(function() {
  								actions.timer(entities, context, sessionId, temps_entre_chaque_message).then(function() {
  									actions.envoyer_message_text(sessionId, context, entities, 'Je suis là pour répondre à vos questions sur l’univers de notre marque.').then(function() {
  										actions.timer(entities, context, sessionId, temps_entre_chaque_message).then(function() {
  											actions.envoyer_message_text(sessionId, context, entities, 'Laissez-vous guider ou bien posez moi directement une question.').then(function() {
													actions.timer(entities, context, sessionId, temps_entre_chaque_message).then(function() {
														actions.envoyer_message_bouton_generique(sessionId, context, entities, msg3).then(function() {
															actions.timer(entities, context, sessionId, 3200).then(function() {
			  												actions.envoyer_message_bouton_generique(sessionId, context, entities, msg).then(function() {
			            							  actions.estampille_last_interaction(sessions[sessionId].key, entities, context, sessionId);
			            							})
															})
														})
													})
  											})
  										})
  									})
  								})
  							})
  						})
  					})
  				}
					else if (entities.le_menu && entities.le_menu[0].value == 'menu_produits') {
  					// verifier cgu true
  					var quick = [{
  						"content_type": "text",
  						"title": "Phyto & Aromathérapie",
  						"image_url": "https://mon-chatbot.com/feuille.png",
  						"payload": "menu_produits_phyto"
  					}, {
  						"content_type": "text",
  						"title": "Nutrition Santé",
  						"image_url": "https://mon-chatbot.com/care.png",
  						"payload": "menu_produits_sante"
  					}, {
  						"content_type": "text",
  						"title": "PhytoXpert",
  						"image_url": "https://mon-chatbot.com/balance.png",
  						"payload": "menu_produits_xpert"
  					}, {
  						"content_type": "text",
  						"title": "Retour accueil",
  						"image_url": "https://mon-chatbot.com/reply-all-button.png",
  						"payload": "RETOUR_ACCUEIL"
  					}];
  					actions.envoyer_message_quickreplies(sessionId, context, entities, "Choisissez une catégorie ci-dessous de nos produits de Phyto-Aromathérapie", quick).then(function() {
              actions.estampille_last_interaction(sessions[sessionId].key, entities, context, sessionId);
            })
  				}
  				else if (entities.le_menu && entities.le_menu[0].value == 'menu_produits_phyto') {
  					var quick = [{
  						"content_type": "text",
  						"title": "Retour accueil",
  						"image_url": "https://mon-chatbot.com/reply-all-button.png",
  						"payload": "RETOUR_ACCUEIL"
  					}, {
  						"content_type": "text",
  						"title": "Autre question",
  						"image_url": "https://mon-chatbot.com/discuss-issue.png",
  						"payload": "Autre_QUESTION"
  					}, {
  						"content_type": "text",
  						"title": "Au revoir",
  						"image_url": "https://mon-chatbot.com/sortie.png",
  						"payload": "Dire_aurevoir"
  					}];
  					var msg = {
  						"attachment": {
  							"type": "template",
  							"payload": {
  								"template_type": "generic",
  								"elements": [{
  									"title": "Naturactive Fluides",
  									"image_url": "https://www.naturactive.fr/sites/all/themes/naturactive2016/images/menu_background1.png",
  									"subtitle": "Sous la forme d’extraits fluides, la gamme propose des formules associant des plantes complémentaires",
  									"buttons": [{
  										"type": "web_url",
  										"url": "https://www.naturactive.fr/nos-produits/phytotherapie/naturactive-fluides?utm_source=Messenger&utm_medium=Chatbot",
  										"title": "En savoir +"
  									}, {
  										"type": "element_share"
  									}]
  								}, {
  									"title": "Naturactive Gélules",
  									"image_url": "https://www.naturactive.fr/sites/all/themes/naturactive2016/images/menu_background1.png",
  									"subtitle": "Adopter la phytothérapie, c’est privilégier une démarche simple, pratique et proche de la nature. Plus de 75 extraits de plantes et produits d’origine naturelle classés selon vos besoins.",
  									"buttons": [{
  										"type": "web_url",
  										"url": "https://www.naturactive.fr/nos-produits/phytotherapie/naturactive-gelules?utm_source=Messenger&utm_medium=Chatbot",
  										"title": "En savoir +"
  									}, {
  										"type": "element_share"
  									}]
  								}, {
  									"title": "Huiles essentielles",
  									"image_url": "https://www.naturactive.fr/sites/default/files/newsletter-files/chatbot_he.jpg",
  									"subtitle": "Sécrétées par les espèces végétales aromatiques, les huiles essentielles sont des concentrés de molécules particulièrement actives. Connues pour leurs vertus, elles sont utilisées pour votre bien-être et le plaisir associé à leur parfum.",
  									"buttons": [{
  										"type": "web_url",
  										"url": "https://www.naturactive.fr/nos-produits/aromatherapie/huiles-essentielles?utm_source=Messenger&utm_medium=Chatbot",
  										"title": "En savoir +"
  									}, {
  										"type": "element_share"
  									}]
  								}, {
  									"title": "Huiles végétales",
  									"image_url": "https://www.naturactive.fr/sites/default/files/styles/product_large/public/images/products/huile-vegetale_argan_bio_50ml_naturactive-2.png",
  									"subtitle": "Chaque huile végétale a des vertus spécifiques selon sa composition en acides gras. On peut les appliquer directement sur la peau ou en massage. A utiliser sur le corps !",
  									"buttons": [{
  										"type": "web_url",
  										"url": "https://www.naturactive.fr/nos-produits/aromatherapie/huiles-vegetales?utm_source=Messenger&utm_medium=Chatbot",
  										"title": "En savoir +"
  									}, {
  										"type": "element_share"
  									}]
  								}, {
  									"title": "Sprays",
  									"image_url": "https://www.naturactive.fr/sites/default/files/newsletter-files/chatbot_sprays.jpg",
  									"subtitle": "Des mélanges d’huiles essentielles BIO connues pour leurs vertus, dans un format pratique : à vaporiser quand vous voulez !",
  									"buttons": [{
  										"type": "web_url",
  										"url": "https://www.naturactive.fr/nos-produits/aromatherapie/sprays?utm_source=Messenger&utm_medium=Chatbot",
  										"title": "En savoir +"
  									}, {
  										"type": "element_share"
  									}]
  								}, {
  									"title": "Complexes pour diffusion",
  									"image_url": "https://www.naturactive.fr/sites/default/files/styles/product_large/public/images/products/huiles-essentielles_complex_sommeil_bio_30ml_naturactive_0.png",
  									"subtitle": "Les COMPLEX’ pour diffusion Naturactive sont composés d’huiles essentielles 100% pures et d’origine naturelle. Que ce soit pour vous offrir un moment de bien-être ou prendre soin de votre environnement, vous trouverez la formule adaptée à vos besoins.",
  									"buttons": [{
  										"type": "web_url",
  										"url": "https://www.naturactive.fr/nos-produits/aromatherapie/complexes-pour-diffusion?utm_source=Messenger&utm_medium=Chatbot",
  										"title": "En savoir +"
  									}, {
  										"type": "element_share"
  									}]
  								}, {
  									"title": "Diffuseurs",
  									"image_url": "https://www.naturactive.fr/sites/default/files/styles/product_large/public/images/products/diffuseur_volcan.jpg",
  									"subtitle": "Faites une pause détente ! Avec ces diffuseurs aux lumières douces, profitez des vertus des huiles essentielles Naturactive.",
  									"buttons": [{
  										"type": "web_url",
  										"url": "https://www.naturactive.fr/nos-produits/aromatherapie/diffuseurs?utm_source=Messenger&utm_medium=Chatbot",
  										"title": "En savoir +"
  									}, {
  										"type": "element_share"
  									}]
  								}]
  							}
  						}
  					};
  					actions.envoyer_message_bouton_generique(sessionId, context, entities, msg).then(function() {
							actions.timer(entities, context, sessionId, temps_avant_relance).then(function() {
	  						actions.envoyer_message_quickreplies(sessionId, context, entities, "Je reste à votre disposition.", quick).then(function() {
	                actions.estampille_last_interaction(sessions[sessionId].key, entities, context, sessionId);
	              })
							})
  					})
  				}
  				else if (entities.le_menu && entities.le_menu[0].value == 'menu_produits_sante') {
  					var quick = [{
  						"content_type": "text",
  						"title": "Retour accueil",
  						"image_url": "https://mon-chatbot.com/reply-all-button.png",
  						"payload": "RETOUR_ACCUEIL"
  					}, {
  						"content_type": "text",
  						"title": "Autre question",
  						"image_url": "https://mon-chatbot.com/discuss-issue.png",
  						"payload": "Autre_QUESTION"
  					}, {
  						"content_type": "text",
  						"title": "Au revoir",
  						"image_url": "https://mon-chatbot.com/sortie.png",
  						"payload": "Dire_aurevoir"
  					}];
  					var msg = {
  						"attachment": {
  							"type": "template",
  							"payload": {
  								"template_type": "generic",
  								"elements": [{
  									"title": "Immunité : Activ 4",
  									"image_url": "https://www.naturactive.fr/sites/default/files/images/push-list/activ4.jpg",
  									"subtitle": "Innovation issue de la recherche des Laboratoires Pierre Fabre, la formule Activ 4 est la première à associer un extrait de Sureau et un lactobacille, complétés par une sélection spécifique de vitamines et de minéraux.",
  									"buttons": [{
  										"type": "web_url",
  										"url": "https://www.naturactive.fr/nos-produits/nutrition-sante/immunite-activ-4?utm_source=Messenger&utm_medium=Chatbot",
  										"title": "En savoir +"
  									}, {
  										"type": "element_share"
  									}]
  								}, {
  									"title": "Stress/Sommeil : Seriane",
  									"image_url": "https://www.naturactive.fr/sites/default/files/styles/product_large/public/images/products/seriane_stress_sommeil.png",
  									"subtitle": "Grâce à des composants d’origine naturelle et en particulier les extraits de Rhodiola et de Mélisse, la gamme SERIANE aide à mieux résister au stress passager de la vie quotidienne et favorise la qualité du sommeil. Quatre références selon les besoins.",
  									"buttons": [{
  										"type": "web_url",
  										"url": "https://www.naturactive.fr/nos-produits/nutrition-sante/stresssommeil-seriane?utm_source=Messenger&utm_medium=Chatbot",
  										"title": "En savoir +"
  									}, {
  										"type": "element_share"
  									}]
  								}, {
  									"title": "Solaire : Doriance",
  									"image_url": "https://www.naturactive.fr/sites/default/files/styles/product_large/public/images/products/doriance_solaire.png",
  									"subtitle": "Doriance est une gamme de compléments alimentaires dont la vocation est d’agir sur la beauté de la peau. Les formules Doriance sont des solutions à base d’extraits végétaux, à la fois actives et respectueuses des équilibres physiologiques.",
  									"buttons": [{
  										"type": "web_url",
  										"url": "https://www.naturactive.fr/nos-produits/nutrition-sante/solaire-doriance?utm_source=Messenger&utm_medium=Chatbot",
  										"title": "En savoir +"
  									}, {
  										"type": "element_share"
  									}]
  								}, {
  									"title": "Cheveux & ongles",
  									"image_url": "https://www.naturactive.fr/sites/default/files/styles/product_large/public/images/products/cheveux_ongles_naturactive.png",
  									"subtitle": "Issu de la recherche des Laboratoires Pierre Fabre, Naturactive Cheveux & Ongles contient des extraits végétaux, des vitamines et des minéraux pour la beauté de vos cheveux et de vos ongles.",
  									"buttons": [{
  										"type": "web_url",
  										"url": "https://www.naturactive.fr/nos-produits/nutrition-sante/cheveux-cheveux-ongles?utm_source=Messenger&utm_medium=Chatbot",
  										"title": "En savoir +"
  									}, {
  										"type": "element_share"
  									}]
  								}, {
  									"title": "Bien-être féminin : Urisanol",
  									"image_url": "https://www.naturactive.fr/sites/default/files/newsletter-files/chatbot_urisanol.jpg",
  									"subtitle": "La gamme Urisanol propose trois formules à base d’extrait de Cranberry (Canneberge d’Amérique - Vaccinium macrocarpon Aiton). En gélules, en sachets-sticks ou associé avec des huiles essentielles.",
  									"buttons": [{
  										"type": "web_url",
  										"url": "https://www.naturactive.fr/nos-produits/nutrition-sante/bien-etre-feminin-urisanol?utm_source=Messenger&utm_medium=Chatbot",
  										"title": "En savoir +"
  									}, {
  										"type": "element_share"
  									}]
  								}, {
  									"title": "ORL : Phytaroma",
  									"image_url": "https://www.naturactive.fr/sites/default/files/newsletter-files/chatbot_gamme_orl.jpg",
  									"subtitle": "Riche de son savoir-faire, Naturactive propose des complexes prêts-à-l’emploi à base d’huiles essentielles. En solution buvable, en mélange pour inhalation, en capsules, en sprays.",
  									"buttons": [{
  										"type": "web_url",
  										"url": "https://www.naturactive.fr/nos-produits/nutrition-sante/orl-phytaroma?utm_source=Messenger&utm_medium=Chatbot",
  										"title": "En savoir +"
  									}, {
  										"type": "element_share"
  									}]
  								}, {
  									"title": "Cyclo 3",
  									"image_url": "https://www.naturactive.fr/sites/all/themes/naturactive2016/images/menu_background1.png",
  									"subtitle": "Découvrez nos médicaments Cyclo 3.",
  									"buttons": [{
  										"type": "web_url",
  										"url": "https://www.naturactive.fr/nos-produits/nutrition-sante/cyclo-3?utm_source=Messenger&utm_medium=Chatbot",
  										"title": "En savoir +"
  									}, {
  										"type": "element_share"
  									}]
  								}, {
  									"title": "Ysoméga",
  									"image_url": "https://www.naturactive.fr/sites/all/themes/naturactive2016/images/menu_background1.png",
  									"subtitle": "Découvrez nos médicaments Ysoméga.",
  									"buttons": [{
  										"type": "web_url",
  										"url": "https://www.naturactive.fr/nos-produits/nutrition-sante/ysomega?utm_source=Messenger&utm_medium=Chatbot",
  										"title": "En savoir +"
  									}, {
  										"type": "element_share"
  									}]
  								}, {
  									"title": "Gouttes aux essences",
  									"image_url": "https://www.naturactive.fr/sites/all/themes/naturactive2016/images/menu_background1.png",
  									"subtitle": "Découvrez nos médicaments Gouttes aux essences.",
  									"buttons": [{
  										"type": "web_url",
  										"url": "https://www.naturactive.fr/nos-produits/nutrition-sante/gouttes-aux-essences?utm_source=Messenger&utm_medium=Chatbot",
  										"title": "En savoir +"
  									}, {
  										"type": "element_share"
  									}]
  								}, {
  									"title": "Aromasol",
  									"image_url": "https://www.naturactive.fr/sites/all/themes/naturactive2016/images/menu_background1.png",
  									"subtitle": "Découvrez notre médicament Aromasol.",
  									"buttons": [{
  										"type": "web_url",
  										"url": "https://www.naturactive.fr/nos-produits/nutrition-sante/aromasol?utm_source=Messenger&utm_medium=Chatbot",
  										"title": "En savoir +"
  									}, {
  										"type": "element_share"
  									}]
  								}]
  							}
  						}
  					};
  					actions.envoyer_message_bouton_generique(sessionId, context, entities, msg).then(function() {
							actions.timer(entities, context, sessionId, temps_avant_relance).then(function() {
	  						actions.envoyer_message_quickreplies(sessionId, context, entities, "Je reste à votre disposition.", quick).then(function() {
	                actions.estampille_last_interaction(sessions[sessionId].key, entities, context, sessionId);
	              })
							})
  					})
  				}
  				else if (entities.le_menu && entities.le_menu[0].value == 'menu_produits_xpert') {
  					var quick = [{
  						"content_type": "text",
  						"title": "Retour accueil",
  						"image_url": "https://mon-chatbot.com/reply-all-button.png",
  						"payload": "RETOUR_ACCUEIL"
  					}, {
  						"content_type": "text",
  						"title": "Autre question",
  						"image_url": "https://mon-chatbot.com/discuss-issue.png",
  						"payload": "Autre_QUESTION"
  					}, {
  						"content_type": "text",
  						"title": "Au revoir",
  						"image_url": "https://mon-chatbot.com/sortie.png",
  						"payload": "Dire_aurevoir"
  					}];
  					var msg = {
  						"attachment": {
  							"type": "template",
  							"payload": {
  								"template_type": "generic",
  								"elements": [{
  									"title": "PhytoXpert ĒQUILBRE NUTRITIONNEL",
  									"image_url": "https://www.naturactive.fr/sites/default/files/images/push-list/phytoxpert-2_0.jpg",
  									"subtitle": "Particulièrement recommandé aux personnes qui souhaitent soutenir le système immunitaire et conserver forme et vitalité",
  									"buttons": [{
  										"type": "web_url",
  										"url": "https://www.naturactive.fr/nos-produits/phytotherapie-phytoxpert/phytoxpert-equilbre-nutritionnel?utm_source=Messenger&utm_medium=Chatbot",
  										"title": "En savoir +"
  									}, {
  										"type": "element_share"
  									}]
  								}, {
  									"title": "PhytoXpert ĒQUILIBRE NERVEUX",
  									"image_url": "https://www.naturactive.fr/sites/default/files/images/push-list/phytoxpert-2_0.jpg",
  									"subtitle": "Particulièrement recommandé aux personnes qui souhaitent maintenir un bon équilibre nerveux.",
  									"buttons": [{
  										"type": "web_url",
  										"url": "https://www.naturactive.fr/nos-produits/phytotherapie-phytoxpert/phytoxpert-equilibre-nerveux?utm_source=Messenger&utm_medium=Chatbot",
  										"title": "En savoir +"
  									}, {
  										"type": "element_share"
  									}]
  								}, {
  									"title": "PhytoXpert DĒFENSES NATURELLES",
  									"image_url": "https://www.naturactive.fr/sites/default/files/images/push-list/phytoxpert-2_0.jpg",
  									"subtitle": "Particulièrement recommandé aux personnes qui souhaitent, à l'approche de l'hiver, soutenir les défenses naturelles de l'organisme.",
  									"buttons": [{
  										"type": "web_url",
  										"url": "https://www.naturactive.fr/nos-produits/phytotherapie-phytoxpert/phytoxpert-defenses-naturelles?utm_source=Messenger&utm_medium=Chatbot",
  										"title": "En savoir +"
  									}, {
  										"type": "element_share"
  									}]
  								}, {
  									"title": "PhytoXpert DĒTOX",
  									"image_url": "https://www.naturactive.fr/sites/default/files/images/push-list/phytoxpert-2_0.jpg",
  									"subtitle": "Particulièrement recommandé aux personnes qui souhaitent maintenir le bon fonctionnement de leurs systèmes d'élimination tel que le foie et les reins.",
  									"buttons": [{
  										"type": "web_url",
  										"url": "https://www.naturactive.fr/nos-produits/phytotherapie-phytoxpert/phytoxpert-detox?utm_source=Messenger&utm_medium=Chatbot",
  										"title": "En savoir +"
  									}, {
  										"type": "element_share"
  									}]
  								}, {
  									"title": "PhytoXpert DIGESTION",
  									"image_url": "https://www.naturactive.fr/sites/default/files/images/push-list/phytoxpert-2_0.jpg",
  									"subtitle": "Particulièrement recommandé aux personnes qui souhaitent retrouver le confort digestif.",
  									"buttons": [{
  										"type": "web_url",
  										"url": "https://www.naturactive.fr/nos-produits/phytotherapie-phytoxpert/phytoxpert-digestion?utm_source=Messenger&utm_medium=Chatbot",
  										"title": "En savoir +"
  									}, {
  										"type": "element_share"
  									}]
  								}, {
  									"title": "PhytoXpert ARTICULATION",
  									"image_url": "https://www.naturactive.fr/sites/default/files/images/push-list/phytoxpert-2_0.jpg",
  									"subtitle": "Particulièrement recommandé aux personnes qui souhaitent maintenir un confort articulaire.",
  									"buttons": [{
  										"type": "web_url",
  										"url": "https://www.naturactive.fr/nos-produits/phytotherapie-phytoxpert/phytoxpert-articulation?utm_source=Messenger&utm_medium=Chatbot",
  										"title": "En savoir +"
  									}, {
  										"type": "element_share"
  									}]
  								}, {
  									"title": "PhytoXpert OMĒGA 3-6-9",
  									"image_url": "https://www.naturactive.fr/sites/default/files/images/push-list/phytoxpert-2_0.jpg",
  									"subtitle": "Particulièrement recommandé aux personnes qui souhaitent maintenir l'équilibre de leur organisme.",
  									"buttons": [{
  										"type": "web_url",
  										"url": "https://www.naturactive.fr/nos-produits/phytotherapie-phytoxpert/phytoxpert-omega-3-6-9?utm_source=Messenger&utm_medium=Chatbot",
  										"title": "En savoir +"
  									}, {
  										"type": "element_share"
  									}]
  								}, {
  									"title": "PhytoXpert VITALITĒ",
  									"image_url": "https://www.naturactive.fr/sites/default/files/images/push-list/phytoxpert-2_0.jpg",
  									"subtitle": "Particulièrement recommandé aux personnes qui souhaitent retrouver tonus et énergie.",
  									"buttons": [{
  										"type": "web_url",
  										"url": "https://www.naturactive.fr/nos-produits/phytotherapie-phytoxpert/phytoxpert-vitalite?utm_source=Messenger&utm_medium=Chatbot",
  										"title": "En savoir +"
  									}, {
  										"type": "element_share"
  									}]
  								}]
  							}
  						}
  					};
  					actions.envoyer_message_bouton_generique(sessionId, context, entities, msg).then(function() {
							actions.timer(entities, context, sessionId, temps_avant_relance).then(function() {
	  						actions.envoyer_message_quickreplies(sessionId, context, entities, "Je reste à votre disposition.", quick).then(function() {
	                actions.estampille_last_interaction(sessions[sessionId].key, entities, context, sessionId);
	              })
							})
  					})
  				}
  				else if (entities.le_menu && entities.le_menu[0].value == 'menu_besoins') {
  					// verifier cgu true
  					var quick = [{
  						"content_type": "text",
  						"image_url": "https://mon-chatbot.com/1.png",
  						"title": "Bien-être féminin",
  						"payload": "diag_b_e_f"
  					}, {
  						"content_type": "text",
  						"image_url": "https://mon-chatbot.com/2.png",
  						"title": "Capillaire",
  						"payload": "diag_cap"
  					}, {
  						"content_type": "text",
  						"image_url": "https://mon-chatbot.com/3.png",
  						"title": "Immunité",
  						"payload": "diag_imm"
  					}, {
  						"content_type": "text",
  						"image_url": "https://mon-chatbot.com/4.png",
  						"title": "Solaire",
  						"payload": "diag_sol"
  					}, {
  						"content_type": "text",
  						"image_url": "https://mon-chatbot.com/5.png",
  						"title": "Sommeil, Stress, Nervosité",
  						"payload": "diag_s_s_n"
  					}, {
  						"content_type": "text",
  						"image_url": "https://mon-chatbot.com/6.png",
  						"title": "Vitalité défense hivernale",
  						"payload": "diag_v_d_h"
  					}, {
  						"content_type": "text",
  						"title": "Retour accueil",
  						"image_url": "https://mon-chatbot.com/reply-all-button.png",
  						"payload": "RETOUR_ACCUEIL"
  					}];
  					actions.envoyer_message_text(sessionId, context, entities, 'Des solutions au service de votre bien-être et de votre santé.').then(function() {
  						actions.timer(entities, context, sessionId, temps_entre_chaque_message).then(function() {
  							actions.envoyer_message_quickreplies(sessionId, context, entities, "Le meilleur de la nature pour votre bien être et votre santé : plus qu'une science, une véritable philosophie que nous vous invitons à partager.", quick).then(function() {
  							  actions.estampille_last_interaction(sessions[sessionId].key, entities, context, sessionId);
  							})
  						})
  					})
  				}
  				else if (entities.le_menu && entities.le_menu[0].value == 'menu_des_naturac') {
  					// verifier cgu true
  					// aller choper dans firebase dans la liste des naturactifs 9 truc aleatoire
  					var msg = {
  						"attachment": {
  							"type": "template",
  							"payload": {
  								"template_type": "generic",
  								"elements": []
  							}
  						}
  					};
  					var arr = [];
  					// chercher 9 nombres aléatoires uniques entre 0 et 133
  					while (arr.length < 8) {
  						var randomnumber = Math.ceil(Math.random() * 133)
  						if (arr.indexOf(randomnumber) > -1) continue;
  						arr[arr.length] = randomnumber;
  					}
  					return firebase.database().ref('intent/').orderByChild("cat").equalTo("Les naturactifs").once("value").then(function(snapshot) {
  						var a = 0;
  						snapshot.forEach(function(childSnapshot) {
  							if (arr.includes(a)) {
  								var key = childSnapshot.key;
  								var childData = childSnapshot.val();
  								//console.log(arr.includes(a)+' '+childData);
  								msg.attachment.payload.elements.push({
  									"title": "" + childData.scat + "",
  									"image_url": "" + childData.image + "",
  									"subtitle": "" + childData.action + "",
  									"buttons": [{
  										"type": "postback",
  										"title": "En savoir +",
  										"payload": "" + childData.nom_intent + ""
  									}]
  								});
  							}
  							a++;
  						});
  						msg.attachment.payload.elements.push({
  							"title": "Afficher 8 nouveaux Naturactifs",
  							"image_url": "https://mon-chatbot.com/again.png",
  							"subtitle": "Cliquez sur ce bouton pour obtenir une nouvelle liste de Naturactifs.",
  							"buttons": [{
  								"type": "postback",
  								"payload": "menu_des_naturac",
  								"title": "Recommencer"
  							},{
									"type": "web_url",
									"url": "https://www.naturactive.fr/nos-naturactifs?utm_source=Messenger&utm_medium=Chatbot",
									"title": "Tous les Naturactifs"
								}]
  						}, {
  							"title": "Retour à l'accueil",
  							"image_url": "https://mon-chatbot.com/back_big.png",
  							"subtitle": "Retournez au menu principal en cliquant sur le bouton ci-dessous.",
  							"buttons": [{
  								"type": "postback",
  								"payload": "RETOUR_ACCUEIL",
  								"title": "Retour Accueil"
  							}]
  						});
  						actions.envoyer_message_text(sessionId, context, entities, "Je vous propose de découvrir les 8 plantes et naturactifs suivants :").then(function() {
  							actions.timer(entities, context, sessionId, 1000).then(function() {
  								actions.envoyer_message_bouton_generique(sessionId, context, entities, msg).then(function() {
    							  actions.estampille_last_interaction(sessions[sessionId].key, entities, context, sessionId);
    							})
  							})
  						})
  					}).catch(function(error) {
							console.log("erreur from firebas 50");
						});
  				}
  				else if (entities.les_besoins && entities.les_besoins[0].value == 'diag_b_e_f') {
  					var quick = [{
  						"content_type": "text",
  						"title": "Vos besoins",
  						"image_url": "https://mon-chatbot.com/feuille.png",
  						"payload": "menu_besoins"
  					}, {
  						"content_type": "text",
  						"title": "Retour accueil",
  						"image_url": "https://mon-chatbot.com/reply-all-button.png",
  						"payload": "RETOUR_ACCUEIL"
  					}, {
  						"content_type": "text",
  						"title": "Autre question",
  						"image_url": "https://mon-chatbot.com/discuss-issue.png",
  						"payload": "Autre_QUESTION"
  					}, {
  						"content_type": "text",
  						"title": "Au revoir",
  						"image_url": "https://mon-chatbot.com/sortie.png",
  						"payload": "Dire_aurevoir"
  					}];
  					var msg = {
  						"attachment": {
  							"type": "template",
  							"payload": {
  								"template_type": "generic",
  								"elements": [{
  									"title": "Urisanol Flash",
  									"image_url": "https://www.naturactive.fr/sites/default/files/styles/large/public/images/products/urisanol_flash2.jpg",
  									"subtitle": "Une formule renforcée : cranberry + huiles essentielles.",
  									"buttons": [{
  										"type": "web_url",
  										"url": "https://www.naturactive.fr/nos-produits/bien-etre-feminin-urisanol/urisanol-flash?utm_source=Messenger&utm_medium=Chatbot",
  										"title": "En savoir +"
  									}, {
  										"type": "element_share"
  									}]
  								}, {
  									"title": "Urisanol Stevia",
  									"image_url": "https://www.naturactive.fr/sites/default/files/styles/large/public/images/products/urisanol_stick.png",
  									"subtitle": "De la cranberry sous forme de sticks à diluer dans l'eau.",
  									"buttons": [{
  										"type": "web_url",
  										"url": "https://www.naturactive.fr/nos-produits/bien-etre-feminin-urisanol/urisanol-stevia?utm_source=Messenger&utm_medium=Chatbot",
  										"title": "En savoir +"
  									}, {
  										"type": "element_share"
  									}]
  								}, {
  									"title": "Urisanol Gélules",
  									"image_url": "https://www.naturactive.fr/sites/default/files/styles/large/public/images/products/urisanol_gelules.png",
  									"subtitle": "De la cranberry sous forme de gélules, pratique et nomade.",
  									"buttons": [{
  										"type": "web_url",
  										"url": "https://www.naturactive.fr/nos-produits/bien-etre-feminin-urisanol/urisanol-gelules?utm_source=Messenger&utm_medium=Chatbot",
  										"title": "En savoir +"
  									}, {
  										"type": "element_share"
  									}]
  								}]
  							}
  						}
  					};
  					actions.envoyer_message_bouton_generique(sessionId, context, entities, msg).then(function() {
							actions.timer(entities, context, sessionId, temps_avant_relance).then(function() {
	  						actions.envoyer_message_quickreplies(sessionId, context, entities, "Je reste à votre disposition.", quick).then(function() {
	                actions.estampille_last_interaction(sessions[sessionId].key, entities, context, sessionId);
	              })
							})
  					})
  				}
  				else if (entities.les_besoins && entities.les_besoins[0].value == 'diag_cap') {
  					var quick = [{
  						"content_type": "text",
  						"title": "Vos besoins",
  						"image_url": "https://mon-chatbot.com/feuille.png",
  						"payload": "menu_besoins"
  					}, {
  						"content_type": "text",
  						"title": "Retour accueil",
  						"image_url": "https://mon-chatbot.com/reply-all-button.png",
  						"payload": "RETOUR_ACCUEIL"
  					}, {
  						"content_type": "text",
  						"title": "Autre question",
  						"image_url": "https://mon-chatbot.com/discuss-issue.png",
  						"payload": "Autre_QUESTION"
  					}, {
  						"content_type": "text",
  						"title": "Au revoir",
  						"image_url": "https://mon-chatbot.com/sortie.png",
  						"payload": "Dire_aurevoir"
  					}];
  					var msg = {
  						"attachment": {
  							"type": "template",
  							"payload": {
  								"template_type": "generic",
  								"elements": [{
  									"title": "Naturactive Cheveux & Ongles",
  									"image_url": "https://www.naturactive.fr/sites/default/files/styles/large/public/images/products/cheveux_ongles_naturactive.png",
  									"subtitle": "Je veux agir sur mes cheveux qui tombent à la rentrée.",
  									"buttons": [{
  										"type": "web_url",
  										"url": "https://www.naturactive.fr/nos-produits/cheveux-cheveux-ongles/naturactive-cheveux-ongles?utm_source=Messenger&utm_medium=Chatbot",
  										"title": "En savoir +"
  									}, {
  										"type": "element_share"
  									}]
  								}]
  							}
  						}
  					};
  					actions.envoyer_message_bouton_generique(sessionId, context, entities, msg).then(function() {
							actions.timer(entities, context, sessionId, temps_avant_relance).then(function() {
	  						actions.envoyer_message_quickreplies(sessionId, context, entities, "Je reste à votre disposition.", quick).then(function() {
	                actions.estampille_last_interaction(sessions[sessionId].key, entities, context, sessionId);
	              })
							})
  					})
  				}
  				else if (entities.les_besoins && entities.les_besoins[0].value == 'diag_imm') {
  					var quick = [{
  						"content_type": "text",
  						"title": "Vos besoins",
  						"image_url": "https://mon-chatbot.com/feuille.png",
  						"payload": "menu_besoins"
  					}, {
  						"content_type": "text",
  						"title": "Retour accueil",
  						"image_url": "https://mon-chatbot.com/reply-all-button.png",
  						"payload": "RETOUR_ACCUEIL"
  					}, {
  						"content_type": "text",
  						"title": "Autre question",
  						"image_url": "https://mon-chatbot.com/discuss-issue.png",
  						"payload": "Autre_QUESTION"
  					}, {
  						"content_type": "text",
  						"title": "Au revoir",
  						"image_url": "https://mon-chatbot.com/sortie.png",
  						"payload": "Dire_aurevoir"
  					}];
  					var msg = {
  						"attachment": {
  							"type": "template",
  							"payload": {
  								"template_type": "generic",
  								"elements": [{
  									"title": "ACTIV 4 dès 3 ans",
  									"image_url": "https://www.naturactive.fr/sites/default/files/styles/large/public/images/products/activ4_des_3_ans_0.png",
  									"subtitle": "Une forme en sachet plus adaptée pour mon enfant agé de 3 ans ou plus.",
  									"buttons": [{
  										"type": "web_url",
  										"url": "https://www.naturactive.fr/nos-produits/immunite-activ-4/activ-4-des-3-ans?utm_source=Messenger&utm_medium=Chatbot",
  										"title": "En savoir +"
  									}, {
  										"type": "element_share"
  									}]
  								}, {
  									"title": "ACTIV 4 RENFORT",
  									"image_url": "https://www.naturactive.fr/sites/default/files/styles/large/public/images/products/activ_4_renfort.png",
  									"subtitle": "En plein hiver, Je souhaite agir sur mon immunité et ma vitalité.",
  									"buttons": [{
  										"type": "web_url",
  										"url": "https://www.naturactive.fr/nos-produits/immunite-activ-4/activ-4-renfort?utm_source=Messenger&utm_medium=Chatbot",
  										"title": "En savoir +"
  									}, {
  										"type": "element_share"
  									}]
  								}, {
  									"title": "ACTIV 4 PROTECT",
  									"image_url": "https://www.naturactive.fr/sites/default/files/styles/large/public/images/products/activ_4_protect.png",
  									"subtitle": "Je souhaite me protéger dès les premiers froids, pour un hiver en pleine forme.",
  									"buttons": [{
  										"type": "web_url",
  										"url": "https://www.naturactive.fr/nos-produits/immunite-activ-4/activ-4-protect?utm_source=Messenger&utm_medium=Chatbot",
  										"title": "En savoir +"
  									}, {
  										"type": "element_share"
  									}]
  								}]
  							}
  						}
  					};
  					actions.envoyer_message_bouton_generique(sessionId, context, entities, msg).then(function() {
							actions.timer(entities, context, sessionId, temps_avant_relance).then(function() {
	  						actions.envoyer_message_quickreplies(sessionId, context, entities, "Je reste à votre disposition.", quick).then(function() {
	                actions.estampille_last_interaction(sessions[sessionId].key, entities, context, sessionId);
	              })
							})
  					})
  				}
  				else if (entities.les_besoins && entities.les_besoins[0].value == 'diag_sol') {
  					var quick = [{
  						"content_type": "text",
  						"title": "Vos besoins",
							"image_url": "https://mon-chatbot.com/feuille.png",
  						"payload": "menu_besoins"
  					}, {
  						"content_type": "text",
  						"title": "Retour accueil",
  						"image_url": "https://mon-chatbot.com/reply-all-button.png",
  						"payload": "RETOUR_ACCUEIL"
  					}, {
  						"content_type": "text",
  						"title": "Autre question",
  						"image_url": "https://mon-chatbot.com/discuss-issue.png",
  						"payload": "Autre_QUESTION"
  					}, {
  						"content_type": "text",
  						"title": "Au revoir",
  						"image_url": "https://mon-chatbot.com/sortie.png",
  						"payload": "Dire_aurevoir"
  					}];
  					var msg = {
  						"attachment": {
  							"type": "template",
  							"payload": {
  								"template_type": "generic",
  								"elements": [{
  									"title": "Doriance Solaire",
  									"image_url": "https://www.naturactive.fr/sites/default/files/styles/large/public/images/products/doriance_solaire.png",
  									"subtitle": "Je veux un teint sublimé plus intense et plus longtemps.",
  									"buttons": [{
  										"type": "web_url",
  										"url": "https://www.naturactive.fr/nos-produits/solaire-doriance/doriance-solaire?utm_source=Messenger&utm_medium=Chatbot",
  										"title": "En savoir +"
  									}, {
  										"type": "element_share"
  									}]
  								}, {
  									"title": "Doriance Solaire & Anti-âge",
  									"image_url": "https://www.naturactive.fr/sites/default/files/styles/large/public/images/products/doriance_solaire-et-anti-age.png",
  									"subtitle": "Je veux préserver la beauté de ma peau.",
  									"buttons": [{
  										"type": "web_url",
  										"url": "https://www.naturactive.fr/nos-produits/solaire-doriance/doriance-solaire-anti-age?utm_source=Messenger&utm_medium=Chatbot",
  										"title": "En savoir +"
  									}, {
  										"type": "element_share"
  									}]
  								}, {
  									"title": "Doriance Autobronzant",
  									"image_url": "https://www.naturactive.fr/sites/default/files/styles/large/public/images/products/doriance_autobronzant.png",
  									"subtitle": "Je veux avoir une peau dorée sans m'exposer au soleil.",
  									"buttons": [{
  										"type": "web_url",
  										"url": "https://www.naturactive.fr/nos-produits/solaire-doriance/doriance-autobronzant?utm_source=Messenger&utm_medium=Chatbot",
  										"title": "En savoir +"
  									}, {
  										"type": "element_share"
  									}]
  								}]
  							}
  						}
  					};
  					actions.envoyer_message_bouton_generique(sessionId, context, entities, msg).then(function() {
							actions.timer(entities, context, sessionId, temps_avant_relance).then(function() {
	  						actions.envoyer_message_quickreplies(sessionId, context, entities, "Je reste à votre disposition.", quick).then(function() {
	                actions.estampille_last_interaction(sessions[sessionId].key, entities, context, sessionId);
	              })
							})
  					})
  				}
  				else if (entities.les_besoins && entities.les_besoins[0].value == 'diag_s_s_n') {
  					var quick = [{
  						"content_type": "text",
  						"title": "Vos besoins",
							"image_url": "https://mon-chatbot.com/feuille.png",
  						"payload": "menu_besoins"
  					}, {
  						"content_type": "text",
  						"title": "Retour accueil",
  						"image_url": "https://mon-chatbot.com/reply-all-button.png",
  						"payload": "RETOUR_ACCUEIL"
  					}, {
  						"content_type": "text",
  						"title": "Autre question",
  						"image_url": "https://mon-chatbot.com/discuss-issue.png",
  						"payload": "Autre_QUESTION"
  					}, {
  						"content_type": "text",
  						"title": "Au revoir",
  						"image_url": "https://mon-chatbot.com/sortie.png",
  						"payload": "Dire_aurevoir"
  					}];
  					var msg = {
  						"attachment": {
  							"type": "template",
  							"payload": {
  								"template_type": "generic",
  								"elements": [{
  									"title": "Sériane Mélatonine",
  									"image_url": "https://www.naturactive.fr/sites/default/files/styles/large/public/images/products/seriane_melatonine.png",
  									"subtitle": "Je voyage souvent, et je fais face aux décalages horaires.",
  									"buttons": [{
  										"type": "web_url",
  										"url": "https://www.naturactive.fr/nos-produits/stresssommeil-seriane/seriane-melatonine?utm_source=Messenger&utm_medium=Chatbot",
  										"title": "En savoir +"
  									}, {
  										"type": "element_share"
  									}]
  								}, {
  									"title": "Sériane Chrono",
  									"image_url": "https://www.naturactive.fr/sites/default/files/styles/large/public/images/products/seriane_chrono.png",
  									"subtitle": "Je suis stressé(e ) ponctuellement à l'occasion d'un événement particulier (réunions, examens..).",
  									"buttons": [{
  										"type": "web_url",
  										"url": "https://www.naturactive.fr/nos-produits/stresssommeil-seriane/seriane-chrono?utm_source=Messenger&utm_medium=Chatbot",
  										"title": "En savoir +"
  									}, {
  										"type": "element_share"
  									}]
  								}, {
  									"title": "Sériane Sommeil",
  									"image_url": "https://www.naturactive.fr/sites/default/files/styles/large/public/images/products/seriane_sommeil.png",
  									"subtitle": "J'ai du mal à m'endomir, je me réveille la nuit ou tôt le matin.",
  									"buttons": [{
  										"type": "web_url",
  										"url": "https://www.naturactive.fr/nos-produits/stresssommeil-seriane/seriane-sommeil?utm_source=Messenger&utm_medium=Chatbot",
  										"title": "En savoir +"
  									}, {
  										"type": "element_share"
  									}]
  								}, {
  									"title": "Sériane Stress",
  									"image_url": "https://www.naturactive.fr/sites/default/files/styles/large/public/images/products/seriane_stress.png",
  									"subtitle": "Je suis stressé(e) toute la journée mais épuisé(e ) le soir (je dors bien).",
  									"buttons": [{
  										"type": "web_url",
  										"url": "https://www.naturactive.fr/nos-produits/stresssommeil-seriane/seriane-stress?utm_source=Messenger&utm_medium=Chatbot",
  										"title": "En savoir +"
  									}, {
  										"type": "element_share"
  									}]
  								}, {
  									"title": "Sériane Stress & Sommeil",
  									"image_url": "https://www.naturactive.fr/sites/default/files/styles/large/public/images/products/seriane_stress_sommeil.png",
  									"subtitle": "Je suis stressé(e ) la journée et mon sommeil est perturbé.",
  									"buttons": [{
  										"type": "web_url",
  										"url": "https://www.naturactive.fr/nos-produits/stresssommeil-seriane/seriane-stress-sommeil?utm_source=Messenger&utm_medium=Chatbot",
  										"title": "En savoir +"
  									}, {
  										"type": "element_share"
  									}]
  								}]
  							}
  						}
  					};
  					actions.envoyer_message_bouton_generique(sessionId, context, entities, msg).then(function() {
							actions.timer(entities, context, sessionId, temps_avant_relance).then(function() {
	  						actions.envoyer_message_quickreplies(sessionId, context, entities, "Je reste à votre disposition.", quick).then(function() {
	                actions.estampille_last_interaction(sessions[sessionId].key, entities, context, sessionId);
	              })
							})
  					})
  				}
  				else if (entities.les_besoins && entities.les_besoins[0].value == 'diag_v_d_h') {
  					var quick = [{
  						"content_type": "text",
							"image_url": "https://mon-chatbot.com/feuille.png",
  						"title": "Vos besoins",
  						"payload": "menu_besoins"
  					}, {
  						"content_type": "text",
  						"title": "Retour accueil",
  						"image_url": "https://mon-chatbot.com/reply-all-button.png",
  						"payload": "RETOUR_ACCUEIL"
  					}, {
  						"content_type": "text",
  						"title": "Autre question",
  						"image_url": "https://mon-chatbot.com/discuss-issue.png",
  						"payload": "Autre_QUESTION"
  					}, {
  						"content_type": "text",
  						"title": "Au revoir",
  						"image_url": "https://mon-chatbot.com/sortie.png",
  						"payload": "Dire_aurevoir"
  					}];
  					var msg = {
  						"attachment": {
  							"type": "template",
  							"payload": {
  								"template_type": "generic",
  								"elements": [{
  									"title": "VoxylTabs",
  									"image_url": "https://www.naturactive.fr/sites/default/files/styles/large/public/images/products/voyxyltabs.png",
  									"subtitle": "Une pastille à sucer pour mon mal de gorge.",
  									"buttons": [{
  										"type": "web_url",
  										"url": "https://www.naturactive.fr/nos-produits/orl-phytaroma/voxyltabs?utm_source=Messenger&utm_medium=Chatbot",
  										"title": "En savoir +"
  									}, {
  										"type": "element_share"
  									}]
  								}, {
  									"title": "Phytaroma brume aromatique",
  									"image_url": "https://www.naturactive.fr/sites/default/files/styles/large/public/images/products/brume_aromatique_0.png",
  									"subtitle": "Une solution pour l'atmosphère.",
  									"buttons": [{
  										"type": "web_url",
  										"url": "https://www.naturactive.fr/nos-produits/orl-phytaroma/phytaroma-brume-aromatique?utm_source=Messenger&utm_medium=Chatbot",
  										"title": "En savoir +"
  									}, {
  										"type": "element_share"
  									}]
  								}, {
  									"title": "COMPLEXE Propolis + Huiles essentielles",
  									"image_url": "https://www.naturactive.fr/sites/default/files/styles/large/public/images/products/complexe_propolis_0.png",
  									"subtitle": "Une solution pour ma gorge.",
  									"buttons": [{
  										"type": "web_url",
  										"url": "https://www.naturactive.fr/nos-produits/orl-phytaroma/complexe-propolis-huiles-essentielles?utm_source=Messenger&utm_medium=Chatbot",
  										"title": "En savoir +"
  									}, {
  										"type": "element_share"
  									}]
  								}, {
  									"title": "COMPLEXE Thym + Huiles essentielles",
  									"image_url": "https://www.naturactive.fr/sites/default/files/styles/large/public/images/products/complexe_thym_0.png",
  									"subtitle": "Une solution qui contient du thym et des huiles essentielles.",
  									"buttons": [{
  										"type": "web_url",
  										"url": "https://www.naturactive.fr/nos-produits/orl-phytaroma/complexe-thym-huiles-essentielles?utm_source=Messenger&utm_medium=Chatbot",
  										"title": "En savoir +"
  									}, {
  										"type": "element_share"
  									}]
  								}, {
  									"title": "COMPLEXE Sureau + Huiles essentielles",
  									"image_url": "https://www.naturactive.fr/sites/default/files/styles/large/public/images/products/complexe_sureau_0.png",
  									"subtitle": "Une solution pour mon nez.",
  									"buttons": [{
  										"type": "web_url",
  										"url": "https://www.naturactive.fr/nos-produits/orl-phytaroma/complexe-sureau-huiles-essentielles?utm_source=Messenger&utm_medium=Chatbot",
  										"title": "En savoir +"
  									}, {
  										"type": "element_share"
  									}]
  								}, {
  									"title": "COMPLEXE Eucalyptus + Huiles essentielles",
  									"image_url": "https://www.naturactive.fr/sites/default/files/styles/large/public/images/products/complexe_eucalyptus_he_0.png",
  									"subtitle": "Une solution qui contient de l'eucalyptus et des huiles essentielles.",
  									"buttons": [{
  										"type": "web_url",
  										"url": "https://www.naturactive.fr/nos-produits/orl-phytaroma/complexe-eucalyptus-huiles-essentielles?utm_source=Messenger&utm_medium=Chatbot",
  										"title": "En savoir +"
  									}, {
  										"type": "element_share"
  									}]
  								}, {
  									"title": "Phytaroma spray nasal",
  									"image_url": "https://www.naturactive.fr/sites/default/files/styles/large/public/images/products/spray_nasal_0.png",
  									"subtitle": "Une solution qui contient du sel marin et des huiles essentielles.",
  									"buttons": [{
  										"type": "web_url",
  										"url": "https://www.naturactive.fr/nos-produits/orl-phytaroma/phytaroma-spray-nasal?utm_source=Messenger&utm_medium=Chatbot",
  										"title": "En savoir +"
  									}, {
  										"type": "element_share"
  									}]
  								}]
  							}
  						}
  					};
  					actions.envoyer_message_bouton_generique(sessionId, context, entities, msg).then(function() {
							actions.timer(entities, context, sessionId, temps_avant_relance).then(function() {
	  						actions.envoyer_message_quickreplies(sessionId, context, entities, "Je reste à votre disposition.", quick).then(function() {
	                actions.estampille_last_interaction(sessions[sessionId].key, entities, context, sessionId);
	              })
							})
  					})
  				}
					else if(entities.actions && entities.actions[0].value == 'ENCORE_PLUS_DE_QUEST') {
						var msg = {
  						"attachment": {
  							"type": "template",
  							"payload": {
  								"template_type": "generic",
  								"elements": [{
  									"title": "Se désinscrire de la Newsletter",
  									"image_url": "https://mon-chatbot.com/naturactive/logo_share.png",
  									"subtitle": "Afficher la procédure de désinscription à la newsletter",
  									"buttons": [{
  										"type": "postback",
  										"payload": "desinscription_newsletter",
  										"title": "En savoir +"
  									}, {
  										"type": "element_share"
  									}]
  								}, {
										"title": "Jeux concours",
										"image_url": "https://mon-chatbot.com/naturactive/logo_share.png",
										"subtitle": "Afficher le règlement du Jeux concours",
										"buttons": [{
											"type": "postback",
											"payload": "Participer_jeux_concours",
											"title": "En savoir +"
										}, {
											"type": "element_share"
										}]
									}, {
  									"title": "Provenance des produits",
  									"image_url": "https://mon-chatbot.com/naturactive/logo_share.png",
  									"subtitle": "Afficher la provenances des produits Naturactives",
  									"buttons": [{
  										"type": "postback",
  										"payload": "Provenance_des_produits",
  										"title": "En savoir +"
  									}, {
  										"type": "element_share"
  									}]
  								}, {
  									"title": "Comment suivre Naturactive sur les réseaux sociaux",
  									"image_url": "https://mon-chatbot.com/naturactive/logo_share.png",
  									"subtitle": "Découvrez ici comment suivre Naturactive sur les réseaux sociaux",
  									"buttons": [{
  										"type": "postback",
  										"payload": "Reseaux_sociaux",
  										"title": "En savoir +"
  									}, {
  										"type": "element_share"
  									}]
  								}, {
  									"title": "Comment recevoir des conseils sur un produit ",
  									"image_url": "https://mon-chatbot.com/naturactive/logo_share.png",
  									"subtitle": "Vous souhaitez recevoir des conseils ou vous avez des questions concernant un produit, n'hésitez-pas à nous contacter via le formulaire ci-dessous ou bien directement à l'adresse mail : naturactive@pierre-fabre.com",
  									"buttons": [{
  										"type": "postback",
  										"payload": "Obtenir_conseils_sur_un_produit",
  										"title": "En savoir +"
  									}, {
  										"type": "element_share"
  									}]
  								}, {
  									"title": "Informations sur le Label Botanical",
  									"image_url": "https://mon-chatbot.com/naturactive/logo_share.png",
  									"subtitle": "La démarche Botanical Expertise Pierre Fabre (BEPF) est organisée autour de 4 principes : innover à partir des plantes, garantir la qualité de nos actifs, préserver la biodiversité et respecter nos partenaires tout au long de la chaîne.",
  									"buttons": [{
  										"type": "postback",
  										"payload": "Label_Botanical_expertise",
  										"title": "En savoir +"
  									}, {
  										"type": "element_share"
  									}]
  								},  {
  									"title": "Label Origine France Garantie",
  									"image_url": "https://mon-chatbot.com/naturactive/logo_share.png",
  									"subtitle": "92% de nos produits sont fabriqués en France, nous sommes à ce titre la première marque à avoir été labélisée Origine France Garantie en pharmacie. Par ailleurs, sachez que Pierre Fabre est le 1er employeur du Tarn.",
  									"buttons": [{
  										"type": "postback",
  										"payload": "Label_Origine_France_Garantie",
  										"title": "En savoir +"
  									}, {
  										"type": "element_share"
  									}]
  								},
									{
  									"title": "Revenir aux principales questions",
  									"image_url": "https://mon-chatbot.com/naturactive/more_faq.png",
  									"subtitle": "Découvrez ici le TOP 8 des questions fréquentes.",
  									"buttons": [{
  										"type": "postback",
  										"payload": "menu_foire_aux_questions",
  										"title": "Découvrir"
  									}]
  								},
									 {
  									"title": "Retour à l'accueil",
  									"image_url": "https://mon-chatbot.com/back_big.png",
  									"subtitle": "Retournez au menu principal en cliquant sur le bouton ci-dessous.",
  									"buttons": [{
  										"type": "postback",
  										"payload": "RETOUR_ACCUEIL",
  										"title": "Recommencer"
  									}]
  								}]
  							}
  						}
  					};

						/*
						{
							"title": "Jeux concours",
							"image_url": "https://mon-chatbot.com/naturactive/logo_share.png",
							"subtitle": "Afficher le règlement du Jeux concours",
							"buttons": [{
								"type": "postback",
								"payload": "Participer_jeux_concours",
								"title": "En savoir +"
							}, {
								"type": "element_share"
							}]
						},
						*/
  					actions.envoyer_message_bouton_generique(sessionId, context, entities, msg).then(function() {
              actions.estampille_last_interaction(sessions[sessionId].key, entities, context, sessionId);
            })
					}
  				else if (entities.le_menu && entities.le_menu[0].value == 'menu_foire_aux_questions') {
  					// verifier cgu true
  					var msg = {
  						"attachment": {
  							"type": "template",
  							"payload": {
  								"template_type": "generic",
  								"elements": [{
  									"title": "Bouchon du diffuseur cassé",
  									"image_url": "https://mon-chatbot.com/naturactive/logo_share.png",
  									"subtitle": "Afficher la procédure en cas de bouchon du diffuseur cassé",
  									"buttons": [{
  										"type": "postback",
  										"payload": "Bouchon_diffuseur_casse",
  										"title": "En savoir +"
  									}, {
  										"type": "element_share"
  									}]
  								}, {
  									"title": "Verrerie du diffuseur cassé",
  									"image_url": "https://mon-chatbot.com/naturactive/logo_share.png",
  									"subtitle": "Afficher la procédure en cas de verrerie du diffuseur cassé",
  									"buttons": [{
  										"type": "postback",
  										"payload": "Verrerie_diffuseur_casse",
  										"title": "En savoir +"
  									}, {
  										"type": "element_share"
  									}]
  								}, {
  									"title": "Pharmacie revendeuses",
  									"image_url": "https://mon-chatbot.com/naturactive/logo_share.png",
  									"subtitle": "Afficher la liste des pharmacies revendeuses",
  									"buttons": [{
  										"type": "postback",
  										"payload": "Pharmacies_revendeuses",
  										"title": "En savoir +"
  									}, {
  										"type": "element_share"
  									}]
  								}, {
  									"title": "Acheter des produits sur internet",
  									"image_url": "https://mon-chatbot.com/naturactive/logo_share.png",
  									"subtitle": "Comment acheter les produits sur internet ?",
  									"buttons": [{
  										"type": "postback",
  										"payload": "Acheter_des_produits_sur_internet",
  										"title": "En savoir +"
  									}, {
  										"type": "element_share"
  									}]
  								}, {
  									"title": "Traitement carte fidélité",
  									"image_url": "https://mon-chatbot.com/naturactive/logo_share.png",
  									"subtitle": "Je n'ai plus de nouvelles de ma carte de fidélité. Où est elle ?",
  									"buttons": [{
  										"type": "postback",
  										"payload": "traitement_de_ma_carte_fidelite",
  										"title": "En savoir +"
  									}, {
  										"type": "element_share"
  									}]
  								}, {
  									"title": "Renvoi carte fidélité",
  									"image_url": "https://mon-chatbot.com/naturactive/logo_share.png",
  									"subtitle": "Afficher la procédure pour renvoyer sa carte de fidélité",
  									"buttons": [{
  										"type": "postback",
  										"payload": "Renvoi_carte_fidelite",
  										"title": "En savoir +"
  									}, {
  										"type": "element_share"
  									}]
  								},  {
  									"title": "M'inscrire à la Newsletter",
  									"image_url": "https://mon-chatbot.com/naturactive/logo_share.png",
  									"subtitle": "Procédure d'inscription à la newsletter",
  									"buttons": [{
  										"type": "postback",
  										"payload": "Inscription_newsletter",
  										"title": "En savoir +"
  									}, {
  										"type": "element_share"
  									}]
  								},
									{
  									"title": "Encore + de questions",
  									"image_url": "https://mon-chatbot.com/naturactive/more_faq.png",
  									"subtitle": "Découvrez ici de nouvelles questions fréquentes.",
  									"buttons": [{
  										"type": "postback",
  										"payload": "ENCORE_PLUS_DE_QUEST",
  										"title": "En voir plus"
  									}]
  								},
									 {
  									"title": "Retour à l'accueil",
  									"image_url": "https://mon-chatbot.com/back_big.png",
  									"subtitle": "Retournez au menu principal en cliquant sur le bouton ci-dessous.",
  									"buttons": [{
  										"type": "postback",
  										"payload": "RETOUR_ACCUEIL",
  										"title": "Recommencer"
  									}]
  								}]
  							}
  						}
  					};

						/*
						{
							"title": "Jeux concours",
							"image_url": "https://mon-chatbot.com/naturactive/logo_share.png",
							"subtitle": "Afficher le règlement du Jeux concours",
							"buttons": [{
								"type": "postback",
								"payload": "Participer_jeux_concours",
								"title": "En savoir +"
							}, {
								"type": "element_share"
							}]
						},
						*/
  					actions.envoyer_message_bouton_generique(sessionId, context, entities, msg).then(function() {
              actions.estampille_last_interaction(sessions[sessionId].key, entities, context, sessionId);
            })
  				}
  				else if (entities.actions && entities.actions[0].value == 'RECORECORECO') {
  					var msg = {
  						"attachment": {
  							"type": "template",
  							"payload": {
  								"template_type": "generic",
                    "sharable" : false,
  								"elements": [{
  									"title": "Nos produits",
  									"image_url": "https://www.naturactive.fr/sites/all/themes/naturactive2016/images/menu_background1.png",
  									"subtitle": "Découvrez ici la gamme de produits Naturactive.",
  									"buttons": [{
  										"type": "postback",
  										"payload": "menu_produits",
  										"title": "La Gamme"
  									}, {
  										"type": "postback",
  										"payload": "menu_besoins",
  										"title": "Vos besoins"
  									}, {
  										"type": "postback",
  										"payload": "menu_des_naturac",
  										"title": "Nos Naturactifs"
  									}]
  								}, {
  									"title": "Naturactive au Quotidien",
  									"image_url": "https://mon-chatbot.com/faq-icon.png",
  									"subtitle": "Découvrez ici les réponses à vos questions les plus fréquentes.",
  									"buttons": [{
  										"type": "postback",
  										"payload": "menu_foire_aux_questions",
  										"title": "Découvrir"
  									}]
  								}, {
  									"title": "Information Médicales et PharmacoVigilance",
  									"image_url": "https://mon-chatbot.com/natur.png",
  									"subtitle": "Signalez nous un problème suite à l’utilisation d’un médicament ou d’un produit de santé.",
  									"buttons": [{
  										"type": "web_url",
  										"messenger_extensions": true,

  										"url": "https://mon-chatbot.com/naturactive/form-medical.html",
  										"title": "👨‍⚕️ Information Médicales"
  									}, {
  										"type": "web_url",
  										"messenger_extensions": true,

  										"url": "https://mon-chatbot.com/naturactive/form-vigilance.html",
  										"title": "💊 PharmacoVigilance"
  									}]
  								}, {
  									"title": "Informations",
  									"image_url": "https://mon-chatbot.com/infos.png",
  									"subtitle": "En savoir plus sur notre Univers et notre Savoir-Faire",
  									"buttons": [{
  										"type": "web_url",
  										"url": "https://www.naturactive.fr/le-mag/la-une?utm_source=Messenger&utm_medium=Chatbot",
  										"title": "Votre Mag"
  									}, {
  										"type": "web_url",
  										"url": "https://www.naturactive.fr/notre-marque?utm_source=Messenger&utm_medium=Chatbot",
  										"title": "Notre marque & Savoir-Faire"
  									}, {
  										"type": "web_url",
  										"url": "https://www.naturactive.fr/nos-chiffres-cles?utm_source=Messenger&utm_medium=Chatbot",
  										"title": "Nos Engagements"
  									}]
  								}, {
  									"title": "Vous pouvez également nous contacter par email",
  									"image_url": "https://mon-chatbot.com/email.png",
  									"subtitle": "À propos de nos produits, à propos de notre programme fidélité, etc.",
  									"buttons": [{
  										"type": "web_url",
  										"url": "https://www.naturactive.fr/nous-contacter?utm_source=Messenger&utm_medium=Chatbot",
  										"title": "En savoir +"
  									}]
  								}]
  							}
  						}
  					};
  					actions.reset_context(entities, context, sessionId).then(function() {
  						actions.getUserName(sessionId, context, entities).then(function() {
  							actions.envoyer_message_text(sessionId, context, entities, context.userName + ", retournons à l'accueil !").then(function() {
  								actions.timer(entities, context, sessionId, temps_entre_chaque_message).then(function() {
  									actions.envoyer_message_text(sessionId, context, entities, 'Laissez-vous guider ou bien posez-moi directement une question !').then(function() {
  										actions.envoyer_message_bouton_generique(sessionId, context, entities, msg).then(function() {
        							  actions.estampille_last_interaction(sessions[sessionId].key, entities, context, sessionId);
        							})
  									})
  								})
  							})
  						})
  					})
  				}
  				else if (entities.actions && entities.actions[0].value == 'RETOUR_ACCUEIL') {
  					var msg = {
  						"attachment": {
  							"type": "template",
  							"payload": {
  								"template_type": "generic",
                    "sharable" : false,
  								"elements": [{
  									"title": "Nos produits",
  									"image_url": "https://www.naturactive.fr/sites/all/themes/naturactive2016/images/menu_background1.png",
  									"subtitle": "Découvrez ici la gamme de produits Naturactive.",
  									"buttons": [{
  										"type": "postback",
  										"payload": "menu_produits",
  										"title": "La Gamme"
  									}, {
  										"type": "postback",
  										"payload": "menu_besoins",
  										"title": "Vos besoins"
  									}, {
  										"type": "postback",
  										"payload": "menu_des_naturac",
  										"title": "Nos Naturactifs"
  									}]
  								}, {
  									"title": "Naturactive au Quotidien",
  									"image_url": "https://mon-chatbot.com/faq-icon.png",
  									"subtitle": "Découvrez ici les réponses à vos questions les plus fréquentes.",
  									"buttons": [{
  										"type": "postback",
  										"payload": "menu_foire_aux_questions",
  										"title": "Découvrir"
  									}]
  								}, {
  									"title": "Information Médicales et PharmacoVigilance",
  									"image_url": "https://mon-chatbot.com/natur.png",
  									"subtitle": "Signalez nous un problème suite à l’utilisation d’un médicament ou d’un produit de santé.",
  									"buttons": [{
  										"type": "web_url",
  										"messenger_extensions": true,

  										"url": "https://mon-chatbot.com/naturactive/form-medical.html",
  										"title": "👨‍⚕️ Information Médicales"
  									}, {
  										"type": "web_url",
  										"messenger_extensions": true,

  										"url": "https://mon-chatbot.com/naturactive/form-vigilance.html",
  										"title": "💊 PharmacoVigilance"
  									}]
  								}, {
  									"title": "Informations",
  									"image_url": "https://mon-chatbot.com/infos.png",
  									"subtitle": "En savoir plus sur notre Univers et notre Savoir-Faire",
  									"buttons": [{
  										"type": "web_url",
  										"url": "https://www.naturactive.fr/le-mag/la-une?utm_source=Messenger&utm_medium=Chatbot",
  										"title": "Votre Mag"
  									}, {
  										"type": "web_url",
  										"url": "https://www.naturactive.fr/notre-marque?utm_source=Messenger&utm_medium=Chatbot",
  										"title": "Notre marque & Savoir-Faire"
  									}, {
  										"type": "web_url",
  										"url": "https://www.naturactive.fr/nos-chiffres-cles?utm_source=Messenger&utm_medium=Chatbot",
  										"title": "Nos Engagements"
  									}]
  								}, {
  									"title": "Vous pouvez également nous contacter par email",
  									"image_url": "https://mon-chatbot.com/email.png",
  									"subtitle": "À propos de nos produits, à propos de notre programme fidélité, etc.",
  									"buttons": [{
  										"type": "web_url",
  										"url": "https://www.naturactive.fr/nous-contacter?utm_source=Messenger&utm_medium=Chatbot",
  										"title": "En savoir +"
  									}]
  								}]
  							}
  						}
  					};
  					actions.reset_context(entities, context, sessionId).then(function() {
  						actions.getUserName(sessionId, context, entities).then(function() {
  							actions.envoyer_message_text(sessionId, context, entities, context.userName + ", retournons à l'accueil !").then(function() {
  								actions.timer(entities, context, sessionId, temps_entre_chaque_message).then(function() {
  									actions.envoyer_message_text(sessionId, context, entities, 'Laissez-vous guider ou bien posez-moi directement une question !').then(function() {
  										actions.envoyer_message_bouton_generique(sessionId, context, entities, msg).then(function() {
        							  actions.estampille_last_interaction(sessions[sessionId].key, entities, context, sessionId);
        							})
  									})
  								})
  							})
  						})
  					})
  				}
  				else if (entities.actions && entities.actions[0].value == 'Autre_QUESTION') {
  					actions.reset_context(entities, context, sessionId).then(function() {
  						actions.envoyer_message_text(sessionId, context, entities, "Je vous écoute !").then(function() {
  							actions.timer(entities, context, sessionId, temps_entre_chaque_message).then(function() {
  								actions.envoyer_message_text(sessionId, context, entities, 'Posez-moi votre question !').then(function() {
    							  actions.estampille_last_interaction(sessions[sessionId].key, entities, context, sessionId);
    							})
  							})
  						})
  					})
  				}
  				else if (entities.actions && entities.actions[0].value == 'AFFICHER_LA_PETITE_REPONSE_RETOUR') {
  					var quick = [{
  						"content_type": "text",
  						"title": "Retour accueil",
  						"image_url": "https://mon-chatbot.com/reply-all-button.png",
  						"payload": "RETOUR_ACCUEIL"
  					}, {
  						"content_type": "text",
  						"title": "Autre question",
  						"image_url": "https://mon-chatbot.com/discuss-issue.png",
  						"payload": "Autre_QUESTION"
  					}, {
  						"content_type": "text",
  						"title": "Au revoir",
  						"image_url": "https://mon-chatbot.com/sortie.png",
  						"payload": "Dire_aurevoir"
  					}];
  					actions.reset_context(entities, context, sessionId).then(function() {
  						actions.envoyer_message_text(sessionId, context, entities, "Si le problème persiste ou s'aggrave, n'hésitez-pas à téléphoner au 15.").then(function() {
  							actions.timer(entities, context, sessionId, temps_avant_relance).then(function() {
  								actions.envoyer_message_quickreplies(sessionId, context, entities, "Je reste à votre disposition.", quick);
  							})
  						})
  					})
  				}
          else if (entities.actions && entities.actions[0].value == 'AFFICHER_MESSAGE_ENVOI_COLIS') {
  					var quick = [{
  						"content_type": "text",
  						"title": "Retour accueil",
  						"image_url": "https://mon-chatbot.com/reply-all-button.png",
  						"payload": "RETOUR_ACCUEIL"
  					}, {
  						"content_type": "text",
  						"title": "Autre question",
  						"image_url": "https://mon-chatbot.com/discuss-issue.png",
  						"payload": "Autre_QUESTION"
  					}, {
  						"content_type": "text",
  						"title": "Au revoir",
  						"image_url": "https://mon-chatbot.com/sortie.png",
  						"payload": "Dire_aurevoir"
  					}];
  					actions.reset_context(entities, context, sessionId).then(function() {
  						actions.envoyer_message_text(sessionId, context, entities, "Nous reviendrons vers vous dans quelques temps pour suivre l'avancement de votre requête !").then(function() {
  							actions.timer(entities, context, sessionId, temps_avant_relance).then(function() {
  								actions.envoyer_message_quickreplies(sessionId, context, entities, "Je reste à votre disposition.", quick).then(function() {
  								  actions.estampille_retour_3_semaines(entities, context, sessionId);
  								})
  							})
  						})
  					})
  				}
          else if (entities.actions && entities.actions[0].value == 'OUI_CEST_PARFAIT') {
  					var quick = [{
  						"content_type": "text",
  						"title": "⭐",
  						"payload": "1_STAR"
  					},{
  						"content_type": "text",
  						"title": "⭐⭐",
  						"payload": "2_STAR"
  					},{
  						"content_type": "text",
  						"title": "⭐⭐⭐",
  						"payload": "3_STAR"
  					}];
  					actions.reset_context(entities, context, sessionId).then(function() {
  						actions.envoyer_message_text(sessionId, context, entities, "Super ! J'en suis très contente !").then(function() {
  							actions.timer(entities, context, sessionId, temps_entre_chaque_message).then(function() {
  								actions.envoyer_message_quickreplies(sessionId, context, entities, "Pouvez-vous qualifier la qualité de notre échange s'il vous plaît (de 1 à 3 étoiles ) ?", quick);
  							})
  						})
  					})
  				}
          else if (entities.etoiles && (entities.etoiles[0].confidence >= 0.90)) {
            // remercier le participant
						if(entities.etoiles[0].value == '1_STAR') {
							var texte = "Merci beaucoup ! Votre note a été prise en compte et servira à l'amélioration de mes services.";
						}
						else if(entities.etoiles[0].value == '2_STAR'){
							var texte = "Merci beaucoup ! Je vais tenter de faire mieux la prochaine fois.";
						}
						else if(entities.etoiles[0].value == '3_STAR'){
							var texte = "Merci beaucoup ! Je suis heureuse de vous avoir été utile !";
						}
            // afficher la suggestion de Retour
            // stocker la réponse des étoiles dans l'accounts
            // stats stocker aussi dans /etoiles
            // id_account / note / date
            var quick = [{
  						"content_type": "text",
  						"title": "Retour accueil",
  						"image_url": "https://mon-chatbot.com/reply-all-button.png",
  						"payload": "RETOUR_ACCUEIL"
  					}, {
  						"content_type": "text",
  						"title": "Autre question",
  						"image_url": "https://mon-chatbot.com/discuss-issue.png",
  						"payload": "Autre_QUESTION"
  					}, {
  						"content_type": "text",
  						"title": "Au revoir",
  						"image_url": "https://mon-chatbot.com/sortie.png",
  						"payload": "Dire_aurevoir"
  					}];
  					actions.reset_context(entities, context, sessionId).then(function() {
  						actions.envoyer_message_text(sessionId, context, entities, texte).then(function() {
  							actions.timer(entities, context, sessionId, temps_avant_relance).then(function() {
  								actions.envoyer_message_quickreplies(sessionId, context, entities, "Je reste à votre disposition.", quick).then(function() {
    							  actions.estampille_star(entities, context, sessionId, entities.etoiles[0].value );
    							})
  							})
  						})
  					})
          }
          else if (entities.actions && entities.actions[0].value == 'NON_JAI_PAS_TROUVE') {
  					var quick = [
              {
    						"content_type": "text",
    						"title": "Nous téléphoner",
    						"image_url": "https://mon-chatbot.com/phone-receiver.png",
    						"payload": "CONTACT_TELEPHONE_SATISFACTION"
    					},
              {
    						"content_type": "text",
    						"title": "Nous écrire",
    						"image_url": "https://mon-chatbot.com/close-envelope.png",
    						"payload": "MAIL_VIA_SATISF"
    					},
              {
  						"content_type": "text",
  						"title": "Retour accueil",
  						"image_url": "https://mon-chatbot.com/reply-all-button.png",
  						"payload": "RETOUR_ACCUEIL"
  					}, {
  						"content_type": "text",
  						"title": "Autre question",
  						"image_url": "https://mon-chatbot.com/discuss-issue.png",
  						"payload": "Autre_QUESTION"
  					}, {
  						"content_type": "text",
  						"title": "Au revoir",
  						"image_url": "https://mon-chatbot.com/sortie.png",
  						"payload": "Dire_aurevoir"
  					}];
  					actions.reset_context(entities, context, sessionId).then(function() {
  						actions.envoyer_message_text(sessionId, context, entities, "Je suis désolée !").then(function() {
  							actions.timer(entities, context, sessionId, temps_entre_chaque_message).then(function() {
  								actions.envoyer_message_quickreplies(sessionId, context, entities, "Afin de répondre au mieux à votre besoin, voici ce que je peux vous conseiller.", quick);
  							})
  						})
  					})
  				}
          else if (entities.actions && entities.actions[0].value == 'OUI_ENVOI_OKAY') {

  					actions.reset_context(entities, context, sessionId).then(function() {
  						actions.envoyer_message_text(sessionId, context, entities, "Super ! J'en suis très contente !").then(function() {
  							actions.timer(entities, context, sessionId, temps_entre_chaque_message).then(function() {
                  actions.envoyer_message_text(sessionId, context, entities, "N'hésitez-pas à revenir vers nous si vous avez besoin de nouvelles informations !");
  							})
  						})
  					})
  				}
          else if (entities.actions && entities.actions[0].value == 'NON_ENVOI_PAS_OKAY') {
            var quick = [
              {
                "content_type": "text",
                "title": "Nous téléphoner",
                "image_url": "https://mon-chatbot.com/phone-receiver.png",
                "payload": "CONTACT_TELEPHONE_SATISFACTION"
              },
              {
                "content_type": "text",
                "title": "Nous écrire",
                "image_url": "https://mon-chatbot.com/close-envelope.png",
                "payload": "MAIL_VIA_SATISF"
              },
              {
              "content_type": "text",
              "title": "Retour accueil",
              "image_url": "https://mon-chatbot.com/reply-all-button.png",
              "payload": "RETOUR_ACCUEIL"
            }, {
              "content_type": "text",
              "title": "Autre question",
              "image_url": "https://mon-chatbot.com/discuss-issue.png",
              "payload": "Autre_QUESTION"
            }, {
              "content_type": "text",
              "title": "Au revoir",
              "image_url": "https://mon-chatbot.com/sortie.png",
              "payload": "Dire_aurevoir"
            }];
            actions.reset_context(entities, context, sessionId).then(function() {
              actions.envoyer_message_text(sessionId, context, entities, "Je suis désolée !").then(function() {
                actions.timer(entities, context, sessionId, temps_entre_chaque_message).then(function() {
                  actions.envoyer_message_quickreplies(sessionId, context, entities, "Afin de répondre au mieux à votre besoin, voici ce que je peux vous conseiller.", quick);
                })
              })
            })
          }
          else if (entities.actions && entities.actions[0].value == 'CONTACT_TELEPHONE_SATISFACTION')  {
            var quick = [{
  						"content_type": "text",
  						"title": "Retour accueil",
  						"image_url": "https://mon-chatbot.com/reply-all-button.png",
  						"payload": "RETOUR_ACCUEIL"
  					}, {
  						"content_type": "text",
  						"title": "Autre question",
  						"image_url": "https://mon-chatbot.com/discuss-issue.png",
  						"payload": "Autre_QUESTION"
  					}, {
  						"content_type": "text",
  						"title": "Au revoir",
  						"image_url": "https://mon-chatbot.com/sortie.png",
  						"payload": "Dire_aurevoir"
  					}];
            actions.reset_context(entities, context, sessionId).then(function() {
  						actions.envoyer_message_text(sessionId, context, entities, "Vous pouvez nous contacter par telephone à propos de nos produits en France : 0800326326.").then(function() {
  							actions.timer(entities, context, sessionId, temps_entre_chaque_message).then(function() {
                  actions.envoyer_message_text(sessionId, context, entities, "Voor België / Voor meer informatie +32(0)2 240 70 10").then(function() {
      							actions.timer(entities, context, sessionId, temps_avant_relance).then(function() {
      								actions.envoyer_message_quickreplies(sessionId, context, entities, "Je reste à votre disposition.", quick).then(function() {
        							  actions.estampille_last_interaction(sessions[sessionId].key, entities, context, sessionId);
        							})
                    })
      						})
  							})
  						})
  					})
          }
					else if (entities.actions && entities.actions[0].value == 'MAUVAISE_REPONSE')  {
						var quick = [{
							"content_type": "text",
							"title": "Retour accueil",
							"image_url": "https://mon-chatbot.com/reply-all-button.png",
							"payload": "RETOUR_ACCUEIL"
						}, {
							"content_type": "text",
							"title": "Autre question",
							"image_url": "https://mon-chatbot.com/discuss-issue.png",
							"payload": "Autre_QUESTION"
						}, {
							"content_type": "text",
							"title": "Au revoir",
							"image_url": "https://mon-chatbot.com/sortie.png",
							"payload": "Dire_aurevoir"
						}];
						var msg3 = {
							"attachment":{
								"type":"template",
								"payload":{
									"template_type":"button",
									"text":"Je n'ai pas la réponse à ce jour. Je suis désolée de ne pas avoir pu vous apporter satisfaction. Je vous propose de contacter nos équipes via le formulaire suivant. Nous reviendrons vers vous entre 3 et 5 jours ouvrés",
									"buttons": [{
										"type": "web_url",
										"url": "https://www.naturactive.fr/nous-contacter",
										"title": "📧 Contactez-nous"
									}]
								}
							}
						};
						actions.envoyer_message_bouton_generique(sessionId, context, entities, msg3).then(function() {
							actions.timer(entities, context, sessionId, temps_avant_relance).then(function() {
								actions.envoyer_message_quickreplies(sessionId, context, entities, "Je reste à votre disposition.", quick).then(function() {
									actions.estampille_last_interaction(sessions[sessionId].key, entities, context, sessionId);
								})
							})
						})
					}
					else if (entities.actions && entities.actions[0].value == 'SHARE_WITH_FRIENDS')  {
            var msg = {
					    "attachment":{
					      "type":"template",
					      "payload":{
					        "template_type":"generic",
					        "elements":[
					          {
					            "title":"Partagez-moi !",
					            "subtitle":"Invitez vos amis en quelques secondes et faites-leur découvrir mon univers !",
					            "image_url":"https://mon-chatbot.com/naturactive/logo_share.png",
					            "buttons": [
					              {
					                "type": "element_share",
					                "share_contents": {
					                  "attachment": {
					                    "type": "template",
					                    "payload": {
					                      "template_type": "generic",
					                      "elements": [
					                        {
					                          "title": "Le ChatBot Naturactive",
					                          "subtitle": "L'outil pour répondre à tes questions sur l’univers de la marque Naturactive.",
																		"image_url":"https://mon-chatbot.com/naturactive/logo_share.png",
					                          "default_action": {
					                            "type": "web_url",
					                            "url": "https://m.me/"+url_chatbot
					                          },
					                          "buttons": [
					                            {
					                              "type": "web_url",
					                              "url": "https://m.me/"+url_chatbot,
					                              "title": "🌿 Découvrir"
					                            }
					                          ]
					                        }
					                      ]
					                    }
					                  }
					                }
					              }
					            ]
					          }
					        ]
					      }
					    }
					  };
                actions.envoyer_message_text(sessionId, context, entities, 'Je compte sur vous pour me faire connaître au plus grand nombre.').then(function() {
                  actions.timer(entities, context, sessionId, temps_entre_chaque_message).then(function() {
                    actions.envoyer_message_bouton_generique(sessionId, context, entities, msg);
                  })
                })

          }

					else if (entities.actions && entities.actions[0].value == 'MAIL_VIA_SATISF')  {
            var msg = {
              "attachment": {
                "type": "template",
                "payload": {
                  "template_type": "generic",
                    "sharable" : false,
                  "elements": [{
                    "title": "Information Médicales et PharmacoVigilance",
                    "image_url": "https://mon-chatbot.com/natur.png",
                    "subtitle": "Signalez nous un problème suite à l’utilisation d’un médicament ou d’un produit de santé.",
                    "buttons": [{
                      "type": "web_url",
                      "messenger_extensions": true,

                      "url": "https://mon-chatbot.com/naturactive/form-medical.html",
                      "title": "👨‍⚕️ Information Médicales"
                    }, {
                      "type": "web_url",
                      "messenger_extensions": true,

                      "url": "https://mon-chatbot.com/naturactive/form-vigilance.html",
                      "title": "💊 PharmacoVigilance"
                    }]
                  },  {
                    "title": "Vous pouvez également nous contacter par email",
                    "image_url": "https://mon-chatbot.com/email.png",
                    "subtitle": "À propos de nos produits, à propos de notre programme fidélité, etc.",
                    "buttons": [{
                      "type": "web_url",
                      "url": "https://www.naturactive.fr/nous-contacter?utm_source=Messenger&utm_medium=Chatbot?utm_source=Messenger&utm_medium=Chatbot",
                      "title": "En savoir +"
                    }]
                  }]
                }
              }
            };
            actions.reset_context(entities, context, sessionId).then(function() {
              actions.getUserName(sessionId, context, entities).then(function() {
                actions.envoyer_message_text(sessionId, context, entities, 'Pour nous contacter par email, choisissez parmi les solutions proposées ci-dessous.').then(function() {
                  actions.timer(entities, context, sessionId, temps_entre_chaque_message).then(function() {
                    actions.envoyer_message_bouton_generique(sessionId, context, entities, msg);
                  })
                })
              })
            })
          }
          else if (entities.Dire_aurevoir && entities.Dire_aurevoir[0].value) {
						var msg = {
					    "attachment":{
					      "type":"template",
					      "payload":{
					        "template_type":"generic",
					        "elements":[
					          {
					            "title":"Partagez-moi !",
					            "subtitle":"Invitez vos amis en quelques secondes et faites-leur découvrir mon univers !",
					            "image_url":"https://mon-chatbot.com/naturactive/logo_share.png",
					            "buttons": [
					              {
					                "type": "element_share",
					                "share_contents": {
					                  "attachment": {
					                    "type": "template",
					                    "payload": {
					                      "template_type": "generic",
					                      "elements": [
					                        {
					                          "title": "Le ChatBot Naturactive",
					                          "subtitle": "L'outil pour répondre à tes questions sur l’univers de la marque Naturactive.",
																		"image_url":"https://mon-chatbot.com/naturactive/logo_share.png",
					                          "default_action": {
					                            "type": "web_url",
					                            "url": "https://m.me/"+url_chatbot
					                          },
					                          "buttons": [
					                            {
					                              "type": "web_url",
					                              "url": "https://m.me/"+url_chatbot,
					                              "title": "🌿 Découvrir"
					                            }
					                          ]
					                        }
					                      ]
					                    }
					                  }
					                }
					              }
					            ]
					          }
					        ]
					      }
					    }
					  };
  					actions.reset_context(entities, context, sessionId).then(function() {
  						actions.envoyer_message_text(sessionId, context, entities, "A très bientôt !").then(function() {
  							actions.timer(entities, context, sessionId, temps_entre_chaque_message).then(function() {
  								actions.envoyer_message_text(sessionId, context, entities, "N'hésitez-pas à revenir souvent afin de consulter nos articles régulièrement mis à jour.").then(function() {
										actions.timer(entities, context, sessionId, temps_entre_chaque_message).then(function() {
											actions.envoyer_message_text(sessionId, context, entities, 'Je compte sur vous pour me faire connaître au plus grand nombre.').then(function() {
			                  actions.timer(entities, context, sessionId, temps_entre_chaque_message).then(function() {
			                    actions.envoyer_message_bouton_generique(sessionId, context, entities, msg).then(function() {
														actions.estampille_last_interaction(sessions[sessionId].key, entities, context, sessionId);
			                    })
			                  })
											})
		                })
    							})
  							})
  						})
  					})
  				}
					// satisfaction
					else if(entities.Dire_satisfaction && entities.Dire_satisfaction[0].value) {
						var quick = [{
  						"content_type": "text",
  						"title": "Retour accueil",
  						"image_url": "https://mon-chatbot.com/reply-all-button.png",
  						"payload": "RETOUR_ACCUEIL"
  					}, {
  						"content_type": "text",
  						"title": "Autre question",
  						"image_url": "https://mon-chatbot.com/discuss-issue.png",
  						"payload": "Autre_QUESTION"
  					}, {
  						"content_type": "text",
  						"title": "Au revoir",
  						"image_url": "https://mon-chatbot.com/sortie.png",
  						"payload": "Dire_aurevoir"
  					}];
  					actions.reset_context(entities, context, sessionId).then(function() {
  						actions.envoyer_message_text(sessionId, context, entities, "Très bien !").then(function() {
								actions.timer(entities, context, sessionId, temps_avant_relance).then(function() {
									actions.envoyer_message_quickreplies(sessionId, context, entities, "Puis-je vous aider sur une autre question ?", quick);
  							})
  						})
  					})
					}
					else if (entities.Dire_merci && entities.Dire_merci[0].value && (!entities.intent || entities.intent[0].confidence <= 0.01 || entities.intent[0].value == 'Article_merci_les_abeilles_') ) {
						var quick = [{
  						"content_type": "text",
  						"title": "Retour accueil",
  						"image_url": "https://mon-chatbot.com/reply-all-button.png",
  						"payload": "RETOUR_ACCUEIL"
  					}, {
  						"content_type": "text",
  						"title": "Autre question",
  						"image_url": "https://mon-chatbot.com/discuss-issue.png",
  						"payload": "Autre_QUESTION"
  					}, {
  						"content_type": "text",
  						"title": "Au revoir",
  						"image_url": "https://mon-chatbot.com/sortie.png",
  						"payload": "Dire_aurevoir"
  					}];
  					actions.reset_context(entities, context, sessionId).then(function() {
  						actions.envoyer_message_text(sessionId, context, entities, "Avec plaisir !").then(function() {
								actions.timer(entities, context, sessionId, temps_avant_relance).then(function() {
									actions.envoyer_message_quickreplies(sessionId, context, entities, "Je reste à votre disposition.", quick);
  							})
  						})
  					})
  				}
					else if (entities.le_robot && (entities.le_robot[0].confidence >= 0.30)) {
						var quick = [{
							"content_type": "text",
							"title": "Retour accueil",
							"image_url": "https://mon-chatbot.com/reply-all-button.png",
							"payload": "RETOUR_ACCUEIL"
						}, {
							"content_type": "text",
							"title": "Autre question",
							"image_url": "https://mon-chatbot.com/discuss-issue.png",
							"payload": "Autre_QUESTION"
						}, {
							"content_type": "text",
							"title": "Au revoir",
							"image_url": "https://mon-chatbot.com/sortie.png",
							"payload": "Dire_aurevoir"
						}];
						if(entities.le_robot[0].value == 'personalité') {
							var texte = "Peut-être que je ne me suis pas présentée... Je m'appelle Anabelle. Je travaille pour Naturactive, la marque de Phyto et d'Aroma du groupe Pierre Fabre. Je suis là pour vous renseigner sur l'univers de notre marque. En quoi puis-je vous aider ?";
						}else if(entities.le_robot[0].value == 'fabrication') {
							var texte = "Alan Turing bien sûr et surtout M. Pierre Fabre qui a inspiré Ma création. Oublions mes origines, en quoi puis-je vous être utile ?";
						} else if(entities.le_robot[0].value == 'age') {
							var texte = "On ne demande pas son âge á une robot ! Je suis née en 1988… au moment de la création de Naturactive… qui s’appelait Plantes et Médecines… voulez vous en savoir plus sur Naturactive ?";
						} else if(entities.le_robot[0].value == 'fonction') {
							var texte = "Je travaille pour Naturactive, la marque de Phytothérapie et d'Aromathérapie du groupe Pierre Fabre. Je suis là pour vous renseigner sur l'univers de notre marque. En quoi puis-je vous aider ?";
						} else if(entities.le_robot[0].value == 'passions') {
							var texte = "J'aime la nature et j'en suis une fervente protectrice ! J'aime également le Rugby... Je suis une grande supportrice du Castres Olympique! Mais assez discuté, je suis là pour vous renseigner sur Naturactive. En quoi puis-je vous aider ?";
						} else if(entities.le_robot[0].value == 'description') {
							var texte = "Difficile à dire, je ne me suis jamais vu dans un miroir … mais un jour peut-être ! Je vous enverrai une photo… Sinon, je suis là pour vous informer sur l’univers de Naturactive. En quoi puis-je vous aider ?";
						} else if(entities.le_robot[0].value == 'gout_plat') {
							var texte = "Je suis un robot… je ne mange pas :-) mais si je devais choisir je me nourrirais de plantes ! Soyons sérieux, en quoi puis-je vous être utile ?";
						} else if(entities.le_robot[0].value == 'gout_boisson') {
							var texte = "Comme je suis un robot, les liquides ne me sont pas recommandés sous peine de désactivation.  Mais si je devais choisir, je choisirai les produits issus de la vigne ! Trêve de plaisanterie, est-ce que je peux vous renseigner sur Naturactive ?";
						} else if(entities.le_robot[0].value == 'caractère') {
							var texte = "Yoga, Rhodiola et Camu-Camu tous les matins… Du coup je suis calme, sereine et en pleine forme pour vous répondre ! Trêve de plaisanterie, est-ce que je peux vous renseigner sur Naturactive ?";
						} else if(entities.le_robot[0].value == 'habitation') {
							var texte = "Un peu partout...Mais surtout entre Castres et la Silicon Valley les 2 centres du monde moderne ;-) A part cela, je suis à votre disposition pour répondre à vos questions sur Naturactive.";
						} else if(entities.le_robot[0].value == 'statut_marital') {
							var texte = "Cette question est un peu trop personnelle… revenons à nos plantes ! Je suis à votre disposition pour répondre à vos questions sur Naturactive.";
						} else if(entities.le_robot[0].value == 'sante_mentale') {
							var texte = "Je vais très bien, je vous remercie ! Je suis à votre disposition pour répondre à vos questions sur Naturactive.";
						}
						actions.reset_context(entities, context, sessionId).then(function() {
							actions.envoyer_message_text(sessionId, context, entities, texte).then(function() {
								actions.timer(entities, context, sessionId, temps_avant_relance).then(function() {
										actions.envoyer_message_quickreplies(sessionId, context, entities, "Je reste à votre disposition.", quick);
								})
							})
						})
					}
  				else {
							if(clic_sur_payload === 'ok') {
								// j'affiche la bonne réponse car je viens des suggestions et je veux la bonne reponse
								console.log("clic_sur_payload = true");
								var quick = [{
	  							"content_type": "text",
	  							"title": "Retour accueil",
	  							"image_url": "https://mon-chatbot.com/reply-all-button.png",
	  							"payload": "RETOUR_ACCUEIL"
	  						}, {
	  							"content_type": "text",
	  							"title": "Autre question",
	  							"image_url": "https://mon-chatbot.com/discuss-issue.png",
	  							"payload": "Autre_QUESTION"
	  						}, {
	  							"content_type": "text",
	  							"title": "Signaler effets",
	  							"image_url": "https://mon-chatbot.com/tel.png",
	  							"payload": "Numero_vigilance"
	  						}, {
	  							"content_type": "text",
	  							"title": "Au revoir",
	  							"image_url": "https://mon-chatbot.com/sortie.png",
	  							"payload": "Dire_aurevoir"
	  						}];
	  						var intentValue = entities.intent[0].value;

	  						return firebase.database().ref('intent/' + intentValue).once('value').then(function(snapshot){
	  							const reponse = snapshot.val().reponse;
	  							const image = snapshot.val().image;
	  							const lien = snapshot.val().lien;
	                var messenger_ext = (snapshot.val().messenger_ext !== undefined);

	  							if (image != '' && lien != '') {
	  								console.log('envoi image et lien');
	  								//image texte lien
	  								actions.envoyer_message_image(sessionId, context, entities, image).then(function() {
	                    if(messenger_ext)  {
	                      var message = {
	    										"attachment": {
	    											"type": "template",
	    											"payload": {
	    												"template_type": "button",
	    												"text": reponse,
	    												"buttons": [{
	    													"type": "web_url",
	                              "messenger_extensions": true,
	    													"url": lien+"?utm_source=Messenger&utm_medium=Chatbot",
	    													"title": "En savoir +"
	    												}]
	    											}
	    										}
	    									};
	                    } else {
	                      var message = {
	    										"attachment": {
	    											"type": "template",
	    											"payload": {
	    												"template_type": "button",
	    												"text": reponse,
	    												"buttons": [{
	    													"type": "web_url",
	    													"url": lien+"?utm_source=Messenger&utm_medium=Chatbot",
	    													"title": "En savoir +"
	    												}]
	    											}
	    										}
	    									};
	                    }

	  									actions.envoyer_message_bouton_generique(sessionId, context, entities, message).then(function() {
												actions.timer(entities, context, sessionId, temps_avant_relance).then(function() {
													actions.envoyer_message_text(sessionId, context, entities, "Voici la réponse.").then(function() {
														actions.timer(entities, context, sessionId, temps_avant_relance).then(function() {
		  												actions.envoyer_message_quickreplies(sessionId, context, entities, "Je reste à votre disposition.", quick).then(function() {
		        							  		actions.estampille_last_interaction(sessions[sessionId].key, entities, context, sessionId);
				        							})
														})
													})
												})
	  									})
	  								})
	  							}
	  							else if (image == '' && lien != '') {
	  								console.log('envoi xxx et lien');
	  								// texte lien
	                  if(messenger_ext) {
	                    var message = {
	    									"attachment": {
	    										"type": "template",
	    										"payload": {
	    											"template_type": "button",
	    											"text": reponse,
	    											"buttons": [{
	    												"type": "web_url",
	                            "messenger_extensions": true,
	    												"url": lien+"?utm_source=Messenger&utm_medium=Chatbot",
	    												"title": "En savoir +"
	    											}]
	    										}
	    									}
	    								};
	                  } else {
	                    var message = {
	    									"attachment": {
	    										"type": "template",
	    										"payload": {
	    											"template_type": "button",
	    											"text": reponse,
	    											"buttons": [{
	    												"type": "web_url",
	    												"url": lien+"?utm_source=Messenger&utm_medium=Chatbot",
	    												"title": "En savoir +"
	    											}]
	    										}
	    									}
	    								};
	                  }

	  								actions.envoyer_message_bouton_generique(sessionId, context, entities, message).then(function() {
											actions.timer(entities, context, sessionId, temps_avant_relance).then(function() {
												actions.envoyer_message_text(sessionId, context, entities, "Voici la réponse.").then(function() {
													actions.timer(entities, context, sessionId, temps_avant_relance).then(function() {
		  											actions.envoyer_message_quickreplies(sessionId, context, entities, "Je reste à votre disposition.", quick).then(function() {
		      							  		actions.estampille_last_interaction(sessions[sessionId].key, entities, context, sessionId);
				      							})
													})
												})
											})
	  								})
	  							}
	  							else if (image == '' && lien == '') {
	  								console.log('envoi text only');
	  								// texte seulement
	  								actions.envoyer_message_text(sessionId, context, entities, reponse).then(function() {
											actions.timer(entities, context, sessionId, temps_avant_relance).then(function() {
												actions.envoyer_message_text(sessionId, context, entities, "Voici la réponse.").then(function() {
													actions.timer(entities, context, sessionId, temps_avant_relance).then(function() {
		  											actions.envoyer_message_quickreplies(sessionId, context, entities, "Je reste à votre disposition.", quick).then(function() {
		      							  		actions.estampille_last_interaction(sessions[sessionId].key, entities, context, sessionId);
														})
													})
		      							})
											})
	  								})
	  							}
	  							else if (image != '' && lien == '') {
	  								console.log('envoi image only + texte');
	  								//image texte
	  								actions.envoyer_message_image(sessionId, context, entities, image).then(function() {
	  									actions.envoyer_message_text(sessionId, context, entities, reponse).then(function() {
												actions.timer(entities, context, sessionId, temps_avant_relance).then(function() {
													actions.envoyer_message_text(sessionId, context, entities, "Voici la réponse.").then(function() {
														actions.timer(entities, context, sessionId, temps_avant_relance).then(function() {
		  												actions.envoyer_message_quickreplies(sessionId, context, entities, "Je reste à votre disposition.", quick).then(function() {
		        							  		actions.estampille_last_interaction(sessions[sessionId].key, entities, context, sessionId);
				        							})
														})
													})
												})
	  									})
	  								})
	  							}
	  						}).catch(function(err) {
						      console.log("ERROOOOOOOR"+err); // "zut !"
									var quick = [{
									 "content_type": "text",
									 "title": "Retour accueil",
									 "image_url": "https://mon-chatbot.com/reply-all-button.png",
									 "payload": "RETOUR_ACCUEIL"
								 }, {
									 "content_type": "text",
									 "title": "Autre question",
									 "image_url": "https://mon-chatbot.com/discuss-issue.png",
									 "payload": "Autre_QUESTION"
								 }, {
									 "content_type": "text",
									 "title": "Au revoir",
									 "image_url": "https://mon-chatbot.com/sortie.png",
									 "payload": "Dire_aurevoir"
								 }];
								 actions.envoyer_message_text(sessionId, context, entities, "Une erreur s'est produite ! Veuillez ré-essayer s'il vous plaît ou faire une autre demande.").then(function() {
									 actions.timer(entities, context, sessionId, temps_avant_relance).then(function() {
										 actions.envoyer_message_quickreplies(sessionId, context, entities, "Je reste à votre disposition.", quick).then(function() {
											 actions.estampille_last_interaction(sessions[sessionId].key, entities, context, sessionId);
										 })
									 })
								 })
						    });
							}
							else {
							console.log("clic_sur_payload = false");
							// je viens d'ailleurs, je tombe dans le cercle normal

							if(entities.intent && entities.intent[0].confidence <= 0.20) {
								// Mais il y a l'intention alerte_danger_stop detectée, on affiche l'alerte sinon
								if(entities.alerte_danger_stop) {
							      var quick = [{
							        "content_type": "text",
							        "title": "Retour accueil",
							        "image_url": "https://mon-chatbot.com/reply-all-button.png",
							        "payload": "RETOUR_ACCUEIL"
							      }, {
							        "content_type": "text",
							        "title": "Autre question",
							        "image_url": "https://mon-chatbot.com/discuss-issue.png",
							        "payload": "Autre_QUESTION"
							      }, {
							        "content_type": "text",
							        "title": "Au revoir",
							        "image_url": "https://mon-chatbot.com/sortie.png",
							        "payload": "Dire_aurevoir"
							      }];
							      var msg = {
							        "attachment": {
							          "type": "template",
							          "payload": {
							            "template_type": "generic",
							            "sharable" : false,
							            "elements": []
							          }
							        }
							      };
							      msg.attachment.payload.elements.push({
							        "title": "🚑 Avez-vous un problème",
							        "image_url": "https://mon-chatbot.com/natur.png",
							        "subtitle": "suite à l’utilisation d’un médicament ou d’un produit de santé ?",
							        "buttons": [{
							          "type": "web_url",
							          "messenger_extensions": true,

							          "url": "https://mon-chatbot.com/naturactive/form-medical.html",
							          "title": "👨‍⚕️ Information Médicales"
							        }, {
							          "type": "web_url",
							          "messenger_extensions": true,

							          "url": "https://mon-chatbot.com/naturactive/form-vigilance.html",
							          "title": "💊 PharmacoVigilance"
							        }]
							      });
							      actions.envoyer_message_bouton_generique(sessionId, context, entities, msg).then(function() {
											actions.timer(entities, context, sessionId, temps_avant_relance).then(function() {
												actions.envoyer_message_text(sessionId, context, entities, "Voici la réponse.").then(function() {
													actions.timer(entities, context, sessionId, temps_avant_relance).then(function() {
							          		actions.envoyer_message_quickreplies(sessionId, context, entities, "Je reste à votre disposition.", quick).then(function() {
							            		actions.estampille_last_interaction(sessions[sessionId].key, entities, context, sessionId);
									          })
									        })
												})
											})
							      })
							  } else if (entities.animaux) {
									var quick = [{
										"content_type": "text",
										"title": "Retour accueil",
										"image_url": "https://mon-chatbot.com/reply-all-button.png",
										"payload": "RETOUR_ACCUEIL"
									}, {
										"content_type": "text",
										"title": "Autre question",
										"image_url": "https://mon-chatbot.com/discuss-issue.png",
										"payload": "Autre_QUESTION"
									}, {
										"content_type": "text",
										"title": "Au revoir",
										"image_url": "https://mon-chatbot.com/sortie.png",
										"payload": "Dire_aurevoir"
									}];
										var msg = {
											"attachment": {
												"type": "template",
												"payload": {
													"template_type": "generic",
													"sharable" : false,
													"elements": []
												}
											}
										};
										msg.attachment.payload.elements.push({
											"title": "Afficher les produits pour les Animaux",
											"image_url": "https://www.naturactive.fr/sites/default/files/newsletter-files/chatbot_he.jpg",
											"subtitle": "Les huiles essentielles peuvent en effet être utilisées chez l’animal, par exemple le chien/chat. Pour plus d'informations, consulter ce lien",
											"buttons": [{
												"type": "postback",
												"title": "En savoir +",
												"payload": "La_gamme_anim_dom"
											}]
										});
										actions.envoyer_message_bouton_generique(sessionId, context, entities, msg).then(function() {
											actions.timer(entities, context, sessionId, temps_avant_relance).then(function() {
												actions.envoyer_message_text(sessionId, context, entities, "Voici la réponse.").then(function() {
													actions.timer(entities, context, sessionId, temps_avant_relance).then(function() {
							          	  actions.envoyer_message_quickreplies(sessionId, context, entities, "Je reste à votre disposition.", quick).then(function() {
							            		actions.estampille_last_interaction(sessions[sessionId].key, entities, context, sessionId);
									          })
													})
												})
							        })
							      })
							  }
							  // Si je detecte alerte_danger_stop j'envoi un message d'alerte vers PharmacoVigilance
							  // si le taux est trop faible ... on passe en dessous du radar
							  else {
							  	// msg3
									var quick = [{
		  							"content_type": "text",
		  							"title": "Retour accueil",
		  							"image_url": "https://mon-chatbot.com/reply-all-button.png",
		  							"payload": "RETOUR_ACCUEIL"
		  						}, {
		  							"content_type": "text",
		  							"title": "Autre question",
		  							"image_url": "https://mon-chatbot.com/discuss-issue.png",
		  							"payload": "Autre_QUESTION"
		  						}, {
		  							"content_type": "text",
		  							"title": "Au revoir",
		  							"image_url": "https://mon-chatbot.com/sortie.png",
		  							"payload": "Dire_aurevoir"
		  						}];
									var msg3 = {
									 "attachment": {
										 "type": "template",
										 "payload": {
											 "template_type": "generic",
											 "sharable" : false,
											 "elements": []
										 }
									 }
								 };
								 // doubleicon
									msg3.attachment.payload.elements.push({
										"title": "Contactez-nous",
										"image_url": "https://mon-chatbot.com/nothing.png",
										"subtitle": "Je suis désolée de pas avoir pu vous apporter satisfaction, je vous propose de contacter nos équipes via le formulaire suivant.",
										"buttons": [{
											"type": "web_url",
											"url": "https://www.naturactive.fr/nous-contacter",
											"title": "📧 Contactez-nous"
										}]
									},{
										"title": "Naturactive au Quotidien",
										"image_url": "https://mon-chatbot.com/faq-icon.png",
										"subtitle": "Découvrez ici les réponses à vos questions les plus fréquentes.",
										"buttons": [{
											"type": "postback",
											"payload": "menu_foire_aux_questions",
											"title": "Découvrir"
										}]
									});
									// text
									actions.envoyer_message_text(sessionId, context, entities, 'Je n\'ai pas la réponse à ce jour. Je suis désolée de ne pas avoir pu vous apporter satisfaction.').then(function() {
										actions.timer(entities, context, sessionId, temps_entre_chaque_message).then(function() {
											actions.envoyer_message_bouton_generique(sessionId, context, entities, msg3).then(function() {
												actions.timer(entities, context, sessionId, temps_avant_relance).then(function() {
													 actions.envoyer_message_quickreplies(sessionId, context, entities, "Je reste à votre disposition.", quick).then(function() {
			      							  		actions.estampille_last_interaction(sessions[sessionId].key, entities, context, sessionId);

													})
												})
											})
										})
									})
								}
							}
							else {
	  						// on affiche les 3 réponses les plus proches + la roue de secours + contactez-nous
	  						var quick = [{
	  							"content_type": "text",
	  							"title": "Mauvaise réponse",
	  							"image_url": "https://mon-chatbot.com/sad-face.png",
	  							"payload": "MAUVAISE_REPONSE"
	  						},{
	  							"content_type": "text",
	  							"title": "Retour accueil",
	  							"image_url": "https://mon-chatbot.com/reply-all-button.png",
	  							"payload": "RETOUR_ACCUEIL"
	  						}, {
	  							"content_type": "text",
	  							"title": "Autre question",
	  							"image_url": "https://mon-chatbot.com/discuss-issue.png",
	  							"payload": "Autre_QUESTION"
	  						}, {
	  							"content_type": "text",
	  							"title": "Au revoir",
	  							"image_url": "https://mon-chatbot.com/sortie.png",
	  							"payload": "Dire_aurevoir"
	  						}];
	  						// je n'ai pas très bien compris ...
	  						var msg = {
	  							"attachment": {
	  								"type": "template",
	  								"payload": {
	  									"template_type": "generic",
	                    "sharable" : false,
	  									"elements": []
	  								}
	  							}
	  						};
	  						if (entities.alerte_danger_stop) {
	  							apprentissage = false;
	  							msg.attachment.payload.elements.push({
	  								"title": "🚑 Avez-vous un problème",
	  								"image_url": "https://mon-chatbot.com/natur.png",
	  								"subtitle": "suite à l’utilisation d’un médicament ou d’un produit de santé ?",
	  								"buttons": [{
	  									"type": "web_url",
	  									"messenger_extensions": true,

	  									"url": "https://mon-chatbot.com/naturactive/form-medical.html",
	  									"title": "👨‍⚕️ Information Médicales"
	  								}, {
	  									"type": "web_url",
	  									"messenger_extensions": true,

	  									"url": "https://mon-chatbot.com/naturactive/form-vigilance.html",
	  									"title": "💊 PharmacoVigilance"
	  								}]
	  							});
	  						}
	  						else {
									if(autoApp == 'ON') {
										apprentissage = true;
									}else {
										apprentissage = false;
									}
	  						}
								// La_gamme_huiles_essentielles_animaux
								if (entities.animaux) {
									msg.attachment.payload.elements.push({
										"title": "Afficher les produits pour les Animaux",
										"image_url": "https://www.naturactive.fr/sites/default/files/newsletter-files/chatbot_he.jpg",
										"subtitle": "Les huiles essentielles peuvent en effet être utilisées chez l’animal, par exemple le chien/chat. Pour plus d'informations, consulter ce lien",
										"buttons": [{
											"type": "postback",
											"title": "En savoir +",
											"payload": "La_gamme_anim_dom"
										}]
									});
	  						}
	  						//msg.attachment.payload.elements.push();
	  						// pour a = 0 jusqu'a 2 on fait un petit tour chez firebase et on ajoute dans elements
	  						var firebaseData = [];
								console.log("erreur ici ?");

	  						function getFirebaseData(endpoint) {
	  							 return firebase.database().ref('intent/' + endpoint).once("value").then(function(snapshot) {
	  								firebaseData.push(snapshot.val());
	  							}).catch(function(error) {
										console.log("erreur from firebas 60");
									});;
	  						}
	  						Promise.all([getFirebaseData(entities.intent[0].value), getFirebaseData(entities.intent[1].value), getFirebaseData(entities.intent[2].value)]).then(function(snapshots) {
	  							var zero = firebaseData[0];
	  							var first = firebaseData[1];
	  							var second = firebaseData[2];

	                if(zero.image !== ''){
	                  var image1 = "" + zero.image + "";
	  							}
	  							else {
	                  var image1 = 'https://mon-chatbot.com/naturactive/logo_share.png';
	  							}

	  							if(first.image !== ''){
	                  var image2 = "" + first.image + "";
	  							}
	  							else {
	                  var image2 = 'https://mon-chatbot.com/naturactive/logo_share.png';
	  							}
	                  console.log(JSON.stringify(second));
	                if(second.image !== ''){
	                  var image3 = "" + second.image + "";
	  							}
	  							else {
	                  var image3 = 'https://mon-chatbot.com/naturactive/logo_share.png';
	  							}
	  							msg.attachment.payload.elements.push({
	  								"title": "" + zero.action + "",
	  								"image_url": image1,
	  								"subtitle": "" + zero.reponse + "",
	  								"buttons": [{
	  									"type": "postback",
	  									"title": "En savoir +",
	  									"payload": "" + zero.nom_intent + ""
	  								}]
	  							});
									if(entities.intent[1].confidence >= 0.10) {
										msg.attachment.payload.elements.push({
		  								"title": "" + first.action + "",
		  								"image_url": image2,
		  								"subtitle": "" + first.reponse + "",
		  								"buttons": [{
		  									"type": "postback",
		  									"title": "En savoir +",
		  									"payload": "" + first.nom_intent + ""
		  								}]
		  							});
									}
									if(entities.intent[2].confidence >= 0.10) {
		  							msg.attachment.payload.elements.push({
		  								"title": "" + second.action + "",
		  								"image_url": image3,
		  								"subtitle": "" + second.reponse + "",
		  								"buttons": [{
		  									"type": "postback",
		  									"title": "En savoir +",
		  									"payload": "" + second.nom_intent + ""
		  								}]
		  							});
									}
	  							msg.attachment.payload.elements.push({
	  								"title": "Les suggestions sont erronées",
	  								"image_url": "https://mon-chatbot.com/nothing.png",
	  								"subtitle": "Aucune de ces suggestions ne convient à votre recherche ?",
	  								"buttons": [{
	  									"type": "postback",
	  									"title": "Contactez-nous",
	  									"payload": "MAUVAISE_REPONSE"
	  								}]
	  							});
	  							msg.attachment.payload.elements.push({
	  								"title": "Information Médicales et PharmacoVigilance",
	  								"image_url": "https://mon-chatbot.com/natur.png",
	  								"subtitle": "Signalez nous un problème suite à l’utilisation d’un médicament ou d’un produit de santé.",
	  								"buttons": [{
	  									"type": "web_url",
	  									"messenger_extensions": true,

	  									"url": "https://mon-chatbot.com/naturactive/form-medical.html",
	  									"title": "👨‍⚕️ Information Médicales"
	  								}, {
	  									"type": "web_url",
	  									"messenger_extensions": true,

	  									"url": "https://mon-chatbot.com/naturactive/form-vigilance.html",
	  									"title": "💊 PharmacoVigilance"
	  								}]
	  							}, {
										"title": "Naturactive au Quotidien",
										"image_url": "https://mon-chatbot.com/faq-icon.png",
										"subtitle": "Découvrez ici les réponses à vos questions les plus fréquentes.",
										"buttons": [{
											"type": "postback",
											"payload": "menu_foire_aux_questions",
											"title": "Découvrir"
										}]
									},{
	  								"title": "Vous pouvez également nous contacter par email",
	  								"image_url": "https://mon-chatbot.com/email.png",
	  								"subtitle": "À propos de nos produits, à propos de notre programme fidélité, etc.",
	  								"buttons": [{
	  									"type": "web_url",
	  									"url": "https://www.naturactive.fr/nous-contacter?utm_source=Messenger&utm_medium=Chatbot",
	  									"title": "En savoir +"
	  								}]
	  							});
	  							actions.envoyer_message_text(sessionId, context, entities, 'Voici les réponses.').then(function() {
										actions.timer(entities, context, sessionId, temps_entre_chaque_message).then(function() {
		  								actions.envoyer_message_bouton_generique(sessionId, context, entities, msg).then(function() {
												actions.timer(entities, context, sessionId, temps_avant_relance).then(function() {
													actions.envoyer_message_quickreplies(sessionId, context, entities, "Je reste à votre disposition.", quick).then(function() {
			      							  actions.estampille_last_interaction(sessions[sessionId].key, entities, context, sessionId);
													})
												})
		  								})
										})
	  							})
	  						}).catch(function(error) {
	  						  // erreur, retourner message de base
	                var quick = [{
	    							"content_type": "text",
	    							"title": "Retour accueil",
	    							"image_url": "https://mon-chatbot.com/reply-all-button.png",
	    							"payload": "RETOUR_ACCUEIL"
	    						}, {
	    							"content_type": "text",
	    							"title": "Autre question",
	    							"image_url": "https://mon-chatbot.com/discuss-issue.png",
	    							"payload": "Autre_QUESTION"
	    						}, {
	    							"content_type": "text",
	    							"title": "Au revoir",
	    							"image_url": "https://mon-chatbot.com/sortie.png",
	    							"payload": "Dire_aurevoir"
	    						}];
	                actions.envoyer_message_text(sessionId, context, entities, "Une erreur s'est produite, veuillez ré-essayer s'il vous plaît ou faire une autre demande.").then(function() {
										actions.timer(entities, context, sessionId, temps_avant_relance).then(function() {
											actions.envoyer_message_text(sessionId, context, entities, "Voici les réponses.").then(function() {
												actions.timer(entities, context, sessionId, temps_avant_relance).then(function() {
													actions.envoyer_message_quickreplies(sessionId, context, entities, "Je reste à votre disposition.", quick).then(function() {
	      							  		actions.estampille_last_interaction(sessions[sessionId].key, entities, context, sessionId);
			      							})
												})
											})
	  								})
	  							})
	  						});
						}
					} // fin du else clic_sur_payload


  				}
        }
        //fin di gros else
			}
		}).catch(function(error) {
			console.log("erreur from firebas 30"+error);
		});
	}
};

function validateSamples(samples) {
	return fetch('https://api.wit.ai/samples?v=20171010', {
		method: 'POST',
		headers: {
			'Authorization': 'Bearer CLVD7TIH4V6AM644JYJOPIUF4F255XXJ',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(samples),
	}).then(function(res) {
		console.log("Ok pour samples");
		console.log(res.json());
	}).catch(function(error2) {
		console.log("erreur validateSamples"+error2);
	});
}
const wit = new Wit({
	accessToken: WIT_TOKEN,
	actions,
	logger: new log.Logger(log.INFO)
});
const app = express();
app.use(({
	method,
	url
}, rsp, next) => {
	rsp.on('finish', () => {
		console.log(`${rsp.statusCode} ${method} ${url}`);
	});
	next();
});
app.use(bodyParser.json({
	verify: verifyRequestSignature
}));
// ------------------------- LE WEBHOOK / hub.verify_token à CONFIGURER AVEC LE MEME MOT DE PASSE QUE FB_VERIFY_TOKEN ------------------------
app.get('/webhook', (req, res) => {
	if (req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === "mot_de_passe_33") { // remplir ici à la place de xxxx le meme mot de passe que FB_VERIFY_TOKEN
		res.send(req.query['hub.challenge']);
	}
	else {
		res.sendStatus(400);
	}
});
// ------------------------- LE WEBHOOK / GESTION DES EVENEMENTS ------------------------
app.post('/webhook', (req, res) => {
	const data = req.body;
	if (data.object === 'page') {
		data.entry.forEach(entry => {
			entry.messaging.forEach(event => {
				if (event.message && !event.message.is_echo) {
					var {
						text,
						attachments,
						quick_reply
					} = event.message;

					function hasValue(obj, key) {
						return obj.hasOwnProperty(key);
					}
					console.log(JSON.stringify(event.message));
					// -------------------------- MESSAGE IMAGE OU GEOLOCALISATION ----------------------------------
					if (event.message.attachments != null && typeof event.message.attachments[0] != 'undefined') {
						var sender = event.sender.id;
						findOrCreateSession(sender).then(function(sessionId) {
						console.log("MASESSION"+sessionId);
						var sessionId = sessionId;
							clearTimeout(timer);
							var timeObject = new Date();
							var il_y_a_xx_minutes = new Date(timeObject .getTime() - 43200000);
							il_y_a_xx_minutes = Date.parse(il_y_a_xx_minutes);
							var date1 = new Date(sessions[sessionId].dernier_message);
							var date2 = new Date(il_y_a_xx_minutes);
							if(date1 < date2) {
								// envoie du message de rappel
								var msg3 = {
							    "attachment":{
							      "type":"template",
							      "payload":{
							        "template_type":"button",
							        "text":"Je vous rappelle que si vous souhaitez nous déclarer un problème lié à l \'utilisation de nos produits, contactez directement le service de Pharmacovigilance",
											"buttons": [{
												"type": "web_url",
												"messenger_extensions": true,
												"url": "https://mon-chatbot.com/naturactive/form-vigilance.html",
												"title": "💊 Pharmacovigilance"
											}]
							      }
							    }
							  };
								const recipientId = sessions[sessionId].fbid;
								fbMessage(recipientId, msg3).then(function(){
									console.log("Erreur envoyer_message_bouton_generique" + recipientId);
									if(event.message.attachments[0].title == "Informations Médicales" || event.message.attachments[0].title == "PharmacoVigilance") {
										// retour du mail
										wit.message('AFFICHER_LA_PETITE_REPONSE_RETOUR', sessions[sessionId].context).then(({
											entities
										}) => {
											choisir_prochaine_action(sessionId, sessions[sessionId].context, entities, sessions[sessionId].key, false);
											var date = Date.now();
								      var keyid = sessions[sessionId].key;
											firebase.database().ref().child('accounts/' + keyid).child('date_last_mail').set(date).catch(function(error) {
												console.log('error from firebase 1');
													var otherDatabase = otherApp.database();
													otherDatabase.ref().child('accounts/' + keyid).child('date_last_mail').set(date);
											});
											console.log('Yay, on a une response de Wit.ai : ' + JSON.stringify(entities));
											apprentissage = false;
										}).catch(console.error);
									} else if(event.message.attachments[0].title == "Vos informations"){
			              wit.message('AFFICHER_MESSAGE_ENVOI_COLIS', sessions[sessionId].context).then(({
											entities
										}) => {
											choisir_prochaine_action(sessionId, sessions[sessionId].context, entities, sessions[sessionId].key, false);
											console.log('Yay, on a une response de Wit.ai : ' + JSON.stringify(entities));
											apprentissage = false;
										}).catch(console.error);
									}
								}).catch(function(error) {
									console.log("Erreur envoi"+error);
								});
							}
							else if(event.message.attachments[0].title == "Informations Médicales" || event.message.attachments[0].title == "PharmacoVigilance") {
								// retour du mail
								wit.message('AFFICHER_LA_PETITE_REPONSE_RETOUR', sessions[sessionId].context).then(({
									entities
								}) => {
									choisir_prochaine_action(sessionId, sessions[sessionId].context, entities, sessions[sessionId].key, false);
									var date = Date.now();
						      var keyid = sessions[sessionId].key;
									 firebase.database().ref().child('accounts/' + keyid).child('date_last_mail').set(date).catch(function(error) {
										 console.log('error from firebase 2');
										 var otherDatabase = otherApp.database();
										 otherDatabase.ref().child('accounts/' + keyid).child('date_last_mail').set(date);
									 });
									console.log('Yay, on a une response de Wit.ai : ' + JSON.stringify(entities));
									apprentissage = false;
								}).catch(console.error);
							} else if(event.message.attachments[0].title == "Vos informations"){
	              wit.message('AFFICHER_MESSAGE_ENVOI_COLIS', sessions[sessionId].context).then(({
									entities
								}) => {
									choisir_prochaine_action(sessionId, sessions[sessionId].context, entities, sessions[sessionId].key, false);
									console.log('Yay, on a une response de Wit.ai : ' + JSON.stringify(entities));
									apprentissage = false;
								}).catch(console.error);
							}
						})
					}
					// --------------------------- MESSAGE QUICK_REPLIES --------------------
					else if (hasValue(event.message, "text") && hasValue(event.message, "quick_reply")) {
						var sender = event.sender.id;
						findOrCreateSession(sender).then(function(sessionId) {
						console.log("MASESSION"+sessionId);
						var sessionId = sessionId;
						clearTimeout(timer);
						var timeObject = new Date();
						var il_y_a_xx_minutes = new Date(timeObject .getTime() - 43200000);
						il_y_a_xx_minutes = Date.parse(il_y_a_xx_minutes);
						var date1 = new Date(sessions[sessionId].dernier_message);
						var date2 = new Date(il_y_a_xx_minutes);
						if(date1 < date2) {
							// envoie du message de rappel
							var msg3 = {
						    "attachment":{
						      "type":"template",
						      "payload":{
						        "template_type":"button",
						        "text":"Je vous rappelle que si vous souhaitez nous déclarer un problème lié à l \'utilisation de nos produits, contactez directement le service de Pharmacovigilance",
										"buttons": [{
											"type": "web_url",
											"messenger_extensions": true,
											"url": "https://mon-chatbot.com/naturactive/form-vigilance.html",
											"title": "💊 Pharmacovigilance"
										}]
						      }
						    }
						  };
							const recipientId = sessions[sessionId].fbid;
							fbMessage(recipientId, msg3).then(function(){
								console.log("Erreur envoyer_message_bouton_generique" + recipientId);
								// envoyer à Wit.ai ici
								wit.message(quick_reply.payload, sessions[sessionId].context).then(({
									entities
								}) => {
									choisir_prochaine_action(sessionId, sessions[sessionId].context, entities, sessions[sessionId].key, 'ok');
									console.log('Yay, on a une response de Wit.ai : ' + JSON.stringify(entities));
									apprentissage = false;
								}).catch(console.error);
							}).catch(function(error) {
								console.log("Erreur envoi"+error);
							});
						}else {
							wit.message(quick_reply.payload, sessions[sessionId].context).then(({
								entities
							}) => {
								choisir_prochaine_action(sessionId, sessions[sessionId].context, entities, sessions[sessionId].key, 'ok');
								console.log('Yay, on a une response de Wit.ai : ' + JSON.stringify(entities));
								apprentissage = false;
							}).catch(console.error);
						}
						})
					}
					// ----------------------------- MESSAGE TEXT ---------------------------
					else if (hasValue(event.message, "text")) {
						var sender = event.sender.id;
						findOrCreateSession(sender).then(function(sessionId) {
						console.log("MASESSION"+sessionId);
						var sessionId = sessionId;
						clearTimeout(timer);
						var timeObject = new Date();
						var il_y_a_xx_minutes = new Date(timeObject .getTime() - 43200000);
						il_y_a_xx_minutes = Date.parse(il_y_a_xx_minutes);
						var date1 = new Date(sessions[sessionId].dernier_message);
						console.log("dernier_message : "+date1+ 'sessions[sessionId].dernier_message = '+sessions[sessionId].dernier_message);
						var date2 = new Date(il_y_a_xx_minutes);
						console.log("il_y_a_xx_minutes ="+date2+" à partir de "+timeObject);
							if(date1 < date2) {
								// envoie du message de rappel
								var msg3 = {
							    "attachment":{
							      "type":"template",
							      "payload":{
							        "template_type":"button",
							        "text":"Je vous rappelle que si vous souhaitez nous déclarer un problème lié à l \'utilisation de nos produits, contactez directement le service de Pharmacovigilance",
											"buttons": [{
												"type": "web_url",
												"messenger_extensions": true,
												"url": "https://mon-chatbot.com/naturactive/form-vigilance.html",
												"title": "💊 Pharmacovigilance"
											}]
							      }
							    }
							  };
								const recipientId = sessions[sessionId].fbid;
								fbMessage(recipientId, msg3).then(function(){
									console.log("Erreur envoyer_message_bouton_generique" + recipientId);
									// envoyer à Wit.ai ici
									var keyid = firebase.database().ref().child('accounts/' + sessions[sessionId].key).child('fil').push();

									stockFirebaseData(sessions[sessionId].key, text, keyid);
									stockFirebaseData2(sessions[sessionId].key, text, keyid);
									wit.message(text, sessions[sessionId].context, 3).then(({
										entities
									}) => {
										choisir_prochaine_action(sessionId, sessions[sessionId].context, entities, sessions[sessionId].key, false);
										console.log('Text : Yay, on a une response de Wit.ai : ' + JSON.stringify(entities));
										apprentissage = false;
									}).catch(console.error);
								}).catch(function(error) {
									console.log("Erreur envoi"+error);
								});
							}
							else {
								var keyid = firebase.database().ref().child('accounts/' + sessions[sessionId].key).child('fil').push();

								stockFirebaseData(sessions[sessionId].key, text, keyid);
								stockFirebaseData2(sessions[sessionId].key, text, keyid);

								wit.message(text, sessions[sessionId].context, 3).then(({
									entities
								}) => {
									choisir_prochaine_action(sessionId, sessions[sessionId].context, entities, sessions[sessionId].key, false);
									console.log('Text : Yay, on a une response de Wit.ai : ' + JSON.stringify(entities));
									apprentissage = false;
								}).catch(console.error);
							}
						})
					}
					// ----------------------------------------------------------------------------
					else {
						var sender = event.sender.id;
						findOrCreateSession(sender).then(function(sessionId) {
						console.log("MASESSION"+sessionId);
						var sessionId = sessionId;
						clearTimeout(timer);
						var timeObject = new Date();
						var il_y_a_xx_minutes = new Date(timeObject .getTime() - 43200000);
						il_y_a_xx_minutes = Date.parse(il_y_a_xx_minutes);
						var date1 = new Date(sessions[sessionId].dernier_message);
						var date2 = new Date(il_y_a_xx_minutes);
							if(date1 < date2) {
								// envoie du message de rappel
								var msg3 = {
							    "attachment":{
							      "type":"template",
							      "payload":{
							        "template_type":"button",
							        "text":"Je vous rappelle que si vous souhaitez nous déclarer un problème lié à l \'utilisation de nos produits, contactez directement le service de Pharmacovigilance",
											"buttons": [{
												"type": "web_url",
												"messenger_extensions": true,
												"url": "https://mon-chatbot.com/naturactive/form-vigilance.html",
												"title": "💊 Pharmacovigilance"
											}]
							      }
							    }
							  };
								const recipientId = sessions[sessionId].fbid;
								fbMessage(recipientId, msg3).then(function(){
									console.log("Erreur envoyer_message_bouton_generique" + recipientId);
									wit.message(text, sessions[sessionId].context, 3).then(({
										entities
									}) => {
										choisir_prochaine_action(sessionId, sessions[sessionId].context, entities, sessions[sessionId].key, false);
										console.log('Text else: Yay, on a une response de Wit.ai : ' + JSON.stringify(entities));
									}).catch(console.error);
								}).catch(function(error) {
									console.log("Erreur envoi"+error);
								});
							}
							else {
								wit.message(text, sessions[sessionId].context, 3).then(({
									entities
								}) => {
									choisir_prochaine_action(sessionId, sessions[sessionId].context, entities, sessions[sessionId].key, false);
									console.log('Text else: Yay, on a une response de Wit.ai : ' + JSON.stringify(entities));
								}).catch(console.error);
							}
						})
					}
				}
				// ----------------------------------------------------------------------------
				else if (event.postback && event.postback.payload) {
					var sender = event.sender.id;
					findOrCreateSession(sender).then(function(sessionId) {
					console.log("MASESSION"+sessionId);
					var sessionId = sessionId;
					clearTimeout(timer);
					var timeObject = new Date();
					var il_y_a_xx_minutes = new Date(timeObject .getTime() - 43200000);
					il_y_a_xx_minutes = Date.parse(il_y_a_xx_minutes);
					var date1 = new Date(sessions[sessionId].dernier_message);
					var date2 = new Date(il_y_a_xx_minutes);
					if(date1 < date2) {
						// envoie du message de rappel
						var msg3 = {
					    "attachment":{
					      "type":"template",
					      "payload":{
					        "template_type":"button",
					        "text":"Je vous rappelle que si vous souhaitez nous déclarer un problème lié à l \'utilisation de nos produits, contactez directement le service de Pharmacovigilance",
									"buttons": [{
										"type": "web_url",
										"messenger_extensions": true,
										"url": "https://mon-chatbot.com/naturactive/form-vigilance.html",
										"title": "💊 Pharmacovigilance"
									}]
					      }
					    }
					  };
						const recipientId = sessions[sessionId].fbid;
						fbMessage(recipientId, msg3).then(function(){
							console.log("Erreur envoyer_message_bouton_generique" + recipientId);
							if (apprentissage == true && (event.postback.payload !== 'MAUVAISE_REPONSE' || event.postback.payload !== 'RETOUR_ACCUEIL' || event.postback.payload !== 'Autre_QUESTION' || event.postback.payload !== 'Dire_aurevoir') ) {
								 // on récupere le texte d'avant dans Firebase + limitToLast
								firebase.database().ref('accounts/' + sessions[sessionId].key + '/fil').limitToLast(1).once('value').then(function(snapshot){
									var dernier_message = Object.keys(snapshot.val())[0];
									console.log("dernier_message: " + dernier_message);
									firebase.database().ref('fil/' + dernier_message).once('value').then(function(snapshot2){
										var message = snapshot2.val().message;
										console.log("le message: " + message);
										wit.message(event.postback.payload, sessions[sessionId].context).then(({
											entities
										}) => {
											choisir_prochaine_action(sessionId, sessions[sessionId].context, entities, sessions[sessionId].key, 'ok');
											validateSamples([{
												text: message,
												entities: [{
													entity: 'intent',
													value: event.postback.payload,
												}]
											}]);
											apprentissage = false;
										}).catch(console.error);
									}).catch(function(error) {
										console.log('error from firebase 4');
									});
								}).catch(function(error) {
									console.log('error from firebase 3');
								}); // fin du premier then()
							}
							else if(event.postback.payload === 'Inscription_newsletter'
							|| event.postback.payload === 'Renvoi_carte_fidelite'
							|| event.postback.payload === 'traitement_de_ma_carte_fidelite'
							|| event.postback.payload === 'Acheter_des_produits_sur_internet'
							|| event.postback.payload === 'Bouchon_diffuseur_casse'
							|| event.postback.payload === 'Pharmacies_revendeuses'
							|| event.postback.payload === 'Verrerie_diffuseur_casse'
							|| event.postback.payload === 'menu_foire_aux_questions'
							|| event.postback.payload === 'menu_foire_aux_questions'
							|| event.postback.payload === 'Label_Origine_France_Garantie'
							|| event.postback.payload === 'Label_Botanical_expertise'
							|| event.postback.payload === 'Obtenir_conseils_sur_un_produit'
							|| event.postback.payload === 'desinscription_newsletter'
							|| event.postback.payload === 'Provenance_des_produits'
							|| event.postback.payload === 'Reseaux_sociaux'
							|| event.postback.payload === 'Obtenir_conseils_sur_un_produit'){
								wit.message(event.postback.payload, sessions[sessionId].context).then(({
									entities
								}) => {
									choisir_prochaine_action(sessionId, sessions[sessionId].context, entities, sessions[sessionId].key, 'ok');
									apprentissage = false;
								}).catch(console.error);
							}
							else {
								wit.message(event.postback.payload, sessions[sessionId].context).then(({
									entities
								}) => {
									choisir_prochaine_action(sessionId, sessions[sessionId].context, entities, sessions[sessionId].key, 'ok');
									apprentissage = false;
								}).catch(console.error);
							}
						}).catch(function(error) {
							console.log("Erreur envoi"+error);
						});
					}
					else {
						if (apprentissage == true && (event.postback.payload !== 'MAUVAISE_REPONSE' || event.postback.payload !== 'RETOUR_ACCUEIL' || event.postback.payload !== 'Autre_QUESTION' || event.postback.payload !== 'Dire_aurevoir') ) {
							 // on récupere le texte d'avant dans Firebase + limitToLast
							firebase.database().ref('accounts/' + sessions[sessionId].key + '/fil').limitToLast(1).once('value').then(function(snapshot){
								var dernier_message = Object.keys(snapshot.val())[0];
								console.log("dernier_message: " + dernier_message);
								firebase.database().ref('fil/' + dernier_message).once('value').then(function(snapshot2){
									var message = snapshot2.val().message;
									console.log("le message: " + message);
									wit.message(event.postback.payload, sessions[sessionId].context).then(({
										entities
									}) => {
										choisir_prochaine_action(sessionId, sessions[sessionId].context, entities, sessions[sessionId].key, 'ok');
										validateSamples([{
											text: message,
											entities: [{
												entity: 'intent',
												value: event.postback.payload,
											}]
										}]);
										apprentissage = false;
									}).catch(console.error);
								}).catch(function(error) {
									console.log('error from firebase 7');
								});
							}).catch(function(error) {
								console.log('error from firebase 6');
							}); // fin du premier then()
						}
						// procédure
						else if(event.postback.payload === 'Inscription_newsletter'
						|| event.postback.payload === 'Renvoi_carte_fidelite'
						|| event.postback.payload === 'traitement_de_ma_carte_fidelite'
						|| event.postback.payload === 'Acheter_des_produits_sur_internet'
						|| event.postback.payload === 'Bouchon_diffuseur_casse'
						|| event.postback.payload === 'Pharmacies_revendeuses'
						|| event.postback.payload === 'Verrerie_diffuseur_casse'
						|| event.postback.payload === 'menu_foire_aux_questions'
						|| event.postback.payload === 'menu_foire_aux_questions'
						|| event.postback.payload === 'Label_Origine_France_Garantie'
						|| event.postback.payload === 'Label_Botanical_expertise'
						|| event.postback.payload === 'Obtenir_conseils_sur_un_produit'
						|| event.postback.payload === 'desinscription_newsletter'
						|| event.postback.payload === 'Provenance_des_produits'
						|| event.postback.payload === 'Reseaux_sociaux'
						|| event.postback.payload === 'Obtenir_conseils_sur_un_produit'){
							wit.message(event.postback.payload, sessions[sessionId].context).then(({
								entities
							}) => {
								choisir_prochaine_action(sessionId, sessions[sessionId].context, entities, sessions[sessionId].key, 'ok');
								apprentissage = false;
							}).catch(console.error);
						}
						else {
							wit.message(event.postback.payload, sessions[sessionId].context).then(({
								entities
							}) => {
								choisir_prochaine_action(sessionId, sessions[sessionId].context, entities, sessions[sessionId].key, 'ok');
								apprentissage = false;
							}).catch(console.error);
						}
						}
					})
				}
				// ----------------------------------------------------------------------------
				else {
					console.log('received event : ', JSON.stringify(event));
				}
			});
		});
	}
	res.sendStatus(200);
});
// ----------------- VERIFICATION SIGNATURE -----------------------
function verifyRequestSignature(req, res, buf) {
	var signature = req.headers["x-hub-signature"];
	if (!signature) {
		console.error("Couldn't validate the signature.");
	}
	else {
		var elements = signature.split('=');
		var method = elements[0];
		var signatureHash = elements[1];
		var expectedHash = crypto.createHmac('sha1', FB_APP_SECRET).update(buf).digest('hex');
		if (signatureHash != expectedHash) {
			throw new Error("Couldn't validate the request signature.");
		}
	}
}
app.listen(PORT);
console.log('Listening on :' + PORT + '...');
