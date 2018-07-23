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
	apiKey: "AIzaSyD7jeOTj9qJmDT4SZxsLDtHUVY-R2c5gDo",
	authDomain: "naturactive-48171.firebaseapp.com",
	databaseURL: "https://naturactive-48171.firebaseio.com",
	projectId: "naturactive-48171",
	storageBucket: "naturactive-48171.appspot.com",
	messagingSenderId: "781857594331"
});
admin.initializeApp({
	credential: admin.credential.cert({
		"type": "service_account",
		"project_id": "naturactive-48171",
		"private_key_id": "c05bc0e884044e99cc1b4a522a0bcc83fb0fa470",
		"private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC1b86qH6ca4MrY\nZ3kLLyn5kQ7W3OKmd10BcA0ZNFHf677u72+TXM/RqwVHrwHOemyz9EZ95VOzsIcK\n17+UTt/ssfsNZDm2LAjfmcDbRzrdVDmklAuiN1fRUD+KVf1i33NPWEmPeEo/QKIG\nWls2K189Eo390lX3YjJmWidA6+6ZN7EF/ifa9URXR5N87ItRXWR2VTcTgJWV/dk6\nCGV95TlH0nVnT7Lmgd2yBin1bjMdSfBAproUqpOaaKbEPVroDSUknaIek9eIHcDj\njF4EA53D/KCwYJce1wSFPSb7oVVH5Vh+6lCfyNOmsf3FW1Ho/jLH2fZS12fzp9e2\nydqx/vltAgMBAAECggEAFXpMzpq8n1Po70EgdRB6OY7QYOL4+Ze7rMXk5wzofEdd\n7M7vOFSOTVWfZGL1JcocQBk0lwakp+rHsaLkjNvhahWPkIBCzKvdyQpcaBjAgR7N\nTAwybFt8y8xiGTAgtKma7tOWsaMdtushwvrDPWBY/9PIdzmE76nyKWeWqfrD3eMk\nILdPuCAR28nzDc8MckOJ1h25jIQPKPEvHa8zikXQVxi5G5LZuHh2x0ZBIkh6N3Fk\nJqYWR6TlUUATOH8xkNVquYim8C2KvXgBMf9BzmrQ6xeUfzvtl9nT+BdfOze1+mw4\nBLZh7HjSYHPbhK/25kmleEmaFREmV4xfH2NKKHz9AQKBgQD9fgUFSRrw2fYk7oea\n/jQGf0FgkSl4nLabSdHpT1lwdnVb3H3TZPNvTFl0/Z3o5iwEDTFJMzoWDrdATSeZ\nSBdMZnvnOb2Izpzs1OVQQtscB9QDZXudX+Qv+KdmfRJxVm1FDf544aXqqlNguyG2\n5RE7six6Nm/meuohORjsg1jgzQKBgQC3O03LRm0JYVeKrb07yAqs6IG7pALpmHNC\ndqMTIgctbqn6lIXNcgqHfANppf2tznWlMATi7mbjoyRI0F1LW8Dun0QZPcjQX8og\n4IGTAxFuEjOVWJuPbtkY/XXl5RXhKr9WZY6AuzU6pbVmT5qzKWTBsh6oCt/nFULO\nMQ5Dp6X7IQKBgE+bFK6NP7WlbUQ52EIXVHU532kZDSIAbOQlcZNIRPkpaj+X5bfO\nOxiXrHwt7TonlmkLT5ACU1p78pZx5F6hohdvE7gQjPH6mJNTZFQpOq/50V3jr8dD\nRuC9wKxR2MnY72XBOEnz6uvf42E8QyExnJDXqloS4F9L+FzIlogn03B9AoGAV9FS\nfaRpSd+fh1Wxpl8/zpM46me3BaINS8N0cQ0UB5BMY06fulF3/mtPb2kg5hZXiC41\niVXddiiQkV1b+WwmUbd/eeGEx2nBhHRVZdJInkqW8nMfS2VDI5kG0oIzNFG6lnvi\nCoyu/EbDZB+u80NZiQQHcV6U5TnpZM1aGs7U3EECgYBfdD+OUxZV6wyB4Y/5hgTo\nid58Aict8dDdygjkyeoM4he+KIqjmI1+6AGsEgnaqhTu5EgkEnu34e//379sMKsr\nXyUD42urxMx2SjnoeOau2GZLffdvC+j4q9YlvAO0oYAFqroHN7ZIKMbXOOSTxnw+\nJfPYJx9lJ8Npvnx4F4LLsA==\n-----END PRIVATE KEY-----\n",
		"client_email": "firebase-adminsdk-w9hlc@naturactive-48171.iam.gserviceaccount.com",
		"client_id": "112693176529829760422",
		"auth_uri": "https://accounts.google.com/o/oauth2/auth",
		"token_uri": "https://accounts.google.com/o/oauth2/token",
		"auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
		"client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-w9hlc%40naturactive-48171.iam.gserviceaccount.com"
	}),
	databaseURL: "https://naturactive-48171.firebaseio.com"
});
// ----------------------- API KEY openweathermap -------------------------
// ----------------------- PARAMETRES DU SERVEUR -------------------------
const PORT = process.env.PORT || 5000;
// Wit.ai parameters
const WIT_TOKEN = "CLVD7TIH4V6AM644JYJOPIUF4F255XXJ"; // saisir ici vos informations (infos sur session XX)
// Messenger API parameters
const FB_PAGE_TOKEN = "EAABqv81NS1ABAIn8NZAPCRTx4qLacMqeGts6EDEIV10Ad8owhhO7ZACsuxyemBydnc3ZA0UnOHGetSMiNxjZBwcn46BdCyD7uSVLs2EfTa0Tipr2zZAXuYJ1FRvNK1ACQasZBio2sXet7zIxebZALtFf7cmzEJeZAXMcpltvKQMVvQZDZD"; // saisir ici vos informations (infos sur session XX)
if (!FB_PAGE_TOKEN) {
	throw new Error('missing FB_PAGE_TOKEN')
}
const FB_APP_SECRET = "09592f8cd3e7f66ffd9218b46111b063"; // saisir ici vos informations (infos sur session XX)
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
	var userz = firebase.database().ref().child("accounts").orderByChild("fbid").equalTo(fbid).once("value", function(snapshot) {
		var exists = (snapshot.val() !== null);
		if (exists) {
			for (var key in snapshot.val()) break;
			console.log("ouiii jexiste" + key);
			sessions[sessionId].key = key;
		}
		else {
			admin.auth().createCustomToken(fbid).then(function(customToken) {
				firebase.auth().signInWithCustomToken(customToken).then(function() {
					var user2 = firebase.auth().currentUser;
					var keyid = firebase.database().ref().child('accounts').push();
					sessions[sessionId].key = keyid.key;
					firebase.database().ref().child('accounts').child(keyid.key).set({
						fbid: fbid,
						prenom: prenom,
						nom: nom,
						nb_agression : 0,
						genre: genre,
						date: new Date().toISOString()
					}).catch(function(error2) {
						console.log(error2);
					});
				}).catch(function(error) {
					// Handle Errors here.
					var errorCode = error.code;
					var errorMessage = error.message;
				});
			}).catch(function(error3) {
				console.log("Erreur : " + error3);
			});
		} // fin
	});
};
// ------------------------ FONCTION DEMANDE INFORMATIONS USER -------------------------
var requestUserName = (id) => {
	var qs = 'access_token=' + encodeURIComponent(FB_PAGE_TOKEN);
	return fetch('https://graph.facebook.com/v2.8/' + encodeURIComponent(id) + '?' + qs).then(rsp => rsp.json()).then(json => {
		if (json.error && json.error.message) {
			throw new Error(json.error.message);
		}
		return json;
	});
};
// ------------------------- ENVOI MESSAGES SIMPLES ( Texte, images, boutons génériques, ...) -----------
var fbMessage = (id, data) => {
	var body = JSON.stringify({
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
	var body = JSON.stringify({
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
// ----------------------------------------------------------------------------
const sessions = {};
// ------------------------ FONCTION DE CREATION DE SESSION ---------------------------
var findOrCreateSession = (fbid) => {
	let sessionId;
	Object.keys(sessions).forEach(k => {
		if (sessions[k].fbid === fbid) {
			sessionId = k;
		}
	});
	if (!sessionId) {
		sessionId = new Date().toISOString();
		sessions[sessionId] = {
			fbid: fbid,
			context: {}
		};
		requestUserName(fbid).then((json) => {
			sessions[sessionId].name = json.first_name;
			checkAndCreate(sessionId, fbid, json.first_name, json.last_name, json.gender);
		}).catch((err) => {
			console.error('Oops! Il y a une erreur : ', err.stack || err);
		});
	}
	return sessionId;
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
					}).catch((err) => {
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
  estampille_last_interaction(entities, context, sessionId) {
    // ici dire la base de données Firebase que la deniere intaraction date de maintenant
      var date = Date.now();
      var keyid = sessions[sessionId].key;
			return firebase.database().ref().child('accounts/' + keyid).child('date_last_interaction').set(date);
  },
  estampille_retour_3_semaines(entities, context, sessionId) {
    // ici dire la base de données Firebase que la deniere intaraction Spéciale (carte fidélité, etc) date de maintenant
      var date = Date.now();
      var keyid = sessions[sessionId].key;
      return firebase.database().ref().child('accounts/' + keyid).child('date_last_speciale').set(date);
  },
  estampille_star(entities, context, sessionId, valeur) {
    var keyid = sessions[sessionId].key;
    var star = valeur;
    var date = Date();
    star = star.split("_");
    return firebase.database().ref('accounts/'+keyid).child('note_satisfaction').set(parseInt(star[0]))
    .then(function(snapshot) {
    	// insérer dans les notes
      var pipo = firebase.database().ref('note_satisfaction').push().set({
      id_account: keyid,
      date: date,
      note: parseInt(star[0])
    });
    }).catch(function(err) {
      console.log(err); // "zut !"
    })
  },
  estampille_insulte(entities, context, sessionId) {
    var keyid = sessions[sessionId].key;
		var databaseRef = firebase.database().ref('accounts/'+keyid).child('nb_agression');
		databaseRef.transaction(function(searches) {
				return (searches || 0) + 1;
		});
  }

};
//--------------------- STOCKAGE DANS FIREBASE------------
function stockFirebaseData(key_user, message) {
	var keyid = firebase.database().ref().child('accounts/' + key_user).child('fil').push();
	firebase.database().ref().child('accounts/' + key_user).child('fil').child(keyid.key).set(true);
	console.log('voici la clé user Freiabse dans accounts/: ' + key_user);
	console.log('voici la cle de la conversation : ' + keyid);
	firebase.database().ref().child('fil').child(keyid.key).set({
		message: message,
		id_account: key_user,
		date: new Date().toISOString()
	}).catch(function(error2) {
		console.log(error2);
	});
}
var apprentissage = false;
// --------------------- CHOISIR LA PROCHAINE ACTION (LOGIQUE) EN FCT DES ENTITES OU INTENTIONS------------
function choisir_prochaine_action(sessionId, context, entities, lakeyuser) {
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
						"template_type": "button",
						"text": "En continuant notre discussion, vous acceptez mes conditions générales d'utilisations accessibles dans le menu ci-dessous.",
						"buttons": [{
							"type": "web_url",
							"url": "https://www.naturactive.fr/mentions-legales?utm_source=Messenger&utm_medium=Chatbot",
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
					actions.envoyer_message_text(sessionId, context, entities, 'Bonjour ' + context.userName + ', je suis Anabelle de Naturactive.').then(function() {
						actions.timer(entities, context, sessionId, temps_entre_chaque_message).then(function() {
								actions.envoyer_message_bouton_generique(sessionId, context, entities, msg);
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
								"image_url": "https://www.naturactive.fr/sites/default/files/images/slides/produits_de_la_ruche-1.png",
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
				actions.reset_context(entities, context, sessionId).then(function() {
					actions.getUserName(sessionId, context, entities).then(function() {
						actions.envoyer_message_text(sessionId, context, entities, "C'est parfait !").then(function() {
							actions.timer(entities, context, sessionId, temps_entre_chaque_message).then(function() {
								actions.envoyer_message_text(sessionId, context, entities, 'Je suis là pour répondre à vos questions sur l’univers de notre marque.').then(function() {
									actions.timer(entities, context, sessionId, temps_entre_chaque_message).then(function() {
										actions.envoyer_message_text(sessionId, context, entities, 'Laissez-vous guider ou bien posez moi directement une question.').then(function() {
											actions.envoyer_message_bouton_generique(sessionId, context, entities, msg);
										})
									})
								})
							})
						})
					})
				})
			});
			// et on affiche le meme message que Dire_Bonjour sans l'entete
		}
	}
	else {
		console.log("je suis dans le else ok");
		firebase.database().ref('accounts/' + lakeyuser).child("cgu").once("value", function(snapshot) {
			var exists = (snapshot.val() !== null);
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
								"template_type": "button",
								"text": "En continuant notre discussion, vous acceptez mes conditions générales d'utilisations accessibles dans le menu ci-dessous.",
								"buttons": [{
									"type": "web_url",
									"url": "https://www.naturactive.fr/mentions-legales?utm_source=Messenger&utm_medium=Chatbot",
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
							actions.envoyer_message_text(sessionId, context, entities, 'Bonjour ' + context.userName + ', je suis Anabelle de Naturactive.').then(function() {
								actions.timer(entities, context, sessionId, temps_entre_chaque_message).then(function() {
									actions.envoyer_message_bouton_generique(sessionId, context, entities, msg);
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
										"image_url": "https://www.naturactive.fr/sites/default/files/images/slides/produits_de_la_ruche-1.png",
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
								actions.envoyer_message_text(sessionId, context, entities, "C'est parfait !").then(function() {
									actions.timer(entities, context, sessionId, temps_entre_chaque_message).then(function() {
										actions.envoyer_message_text(sessionId, context, entities, 'Je suis là pour répondre à vos questions sur l’univers de notre marque.').then(function() {
											actions.timer(entities, context, sessionId, temps_entre_chaque_message).then(function() {
												actions.envoyer_message_text(sessionId, context, entities, 'Laissez-vous guider ou bien posez moi directement une question.').then(function() {
													actions.envoyer_message_bouton_generique(sessionId, context, entities, msg);
												})
											})
										})
									})
								})
							})
						})
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
									"url": "https://www.naturactive.fr/mentions-legales?utm_source=Messenger&utm_medium=Chatbot",
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
          firebase.database().ref('accounts/' + lakeyuser).child("nb_agression").once("value", function(snapshot)  {
            var exists = (snapshot.val() !== null);
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
                    actions.envoyer_message_quickreplies(sessionId, context, entities, "En quoi puis-je vous être utile ?", quick).then(function() {
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
                          actions.envoyer_message_quickreplies(sessionId, context, entities, "En quoi puis-je vous être utile ?", quick).then(function() {
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
                    actions.envoyer_message_quickreplies(sessionId, context, entities, "En quoi puis-je vous être utile ?", quick).then(function() {
                      actions.estampille_insulte(entities, context, sessionId);
                    })
                  })
                })
              })
						}
          });
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
  									"image_url": "https://www.naturactive.fr/sites/default/files/images/slides/produits_de_la_ruche-1.png",
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
  				if (entities.Dire_Bonjour && entities.Dire_Bonjour[0].value && (!entities.intent || entities.intent[0].confidence <= 0.01) ) {
  					var msg = {
  						"attachment": {
  							"type": "template",
  							"payload": {
  								"template_type": "generic",
                    "sharable" : false,
  								"elements": [{
  									"title": "Nos produits",
  									"image_url": "https://www.naturactive.fr/sites/default/files/images/slides/produits_de_la_ruche-1.png",
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
			            							  actions.estampille_last_interaction(entities, context, sessionId);
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
              actions.estampille_last_interaction(entities, context, sessionId);
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
  									"image_url": "https://www.naturactive.fr/sites/default/files/images/slides/produits_de_la_ruche-1.png",
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
  									"image_url": "https://www.naturactive.fr/sites/default/files/images/slides/produits_de_la_ruche-1.png",
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
  									"image_url": "https://www.naturactive.fr/sites/default/files/images/slides/produits_de_la_ruche-1.png",
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
  									"image_url": "https://www.naturactive.fr/sites/default/files/images/slides/produits_de_la_ruche-1.png",
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
  									"image_url": "https://www.naturactive.fr/sites/default/files/images/slides/produits_de_la_ruche-1.png",
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
  									"image_url": "https://www.naturactive.fr/sites/default/files/images/slides/produits_de_la_ruche-1.png",
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
  									"image_url": "https://www.naturactive.fr/sites/default/files/images/slides/produits_de_la_ruche-1.png",
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
	  						actions.envoyer_message_quickreplies(sessionId, context, entities, "En quoi puis-je vous être utile ?", quick).then(function() {
	                actions.estampille_last_interaction(entities, context, sessionId);
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
  									"image_url": "https://www.naturactive.fr/sites/default/files/images/slides/produits_de_la_ruche-1.png",
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
  									"image_url": "https://www.naturactive.fr/sites/default/files/images/slides/produits_de_la_ruche-1.png",
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
  									"image_url": "https://www.naturactive.fr/sites/default/files/images/slides/produits_de_la_ruche-1.png",
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
  									"image_url": "https://www.naturactive.fr/sites/default/files/images/slides/produits_de_la_ruche-1.png",
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
  									"image_url": "https://www.naturactive.fr/sites/default/files/images/slides/produits_de_la_ruche-1.png",
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
  									"image_url": "https://www.naturactive.fr/sites/default/files/images/slides/produits_de_la_ruche-1.png",
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
  									"image_url": "https://www.naturactive.fr/sites/default/files/images/slides/produits_de_la_ruche-1.png",
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
  									"image_url": "https://www.naturactive.fr/sites/default/files/images/slides/produits_de_la_ruche-1.png",
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
  									"image_url": "https://www.naturactive.fr/sites/default/files/images/slides/produits_de_la_ruche-1.png",
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
  									"image_url": "https://www.naturactive.fr/sites/default/files/images/slides/produits_de_la_ruche-1.png",
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
	  						actions.envoyer_message_quickreplies(sessionId, context, entities, "En quoi puis-je vous être utile ?", quick).then(function() {
	                actions.estampille_last_interaction(entities, context, sessionId);
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
  									"image_url": "https://www.naturactive.fr/sites/default/files/styles/product_large/public/images/products/phytoxpert_equilibre_nutritionnel.png",
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
  									"image_url": "https://www.naturactive.fr/sites/default/files/styles/product_large/public/images/products/phytoxpert_equilibre_nerveux.png",
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
  									"image_url": "https://www.naturactive.fr/sites/default/files/styles/product_large/public/images/products/phytoxpert_defenses_naturelles.png",
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
  									"image_url": "https://www.naturactive.fr/sites/default/files/styles/product_large/public/images/products/phytoxpert_detox.png",
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
  									"image_url": "https://www.naturactive.fr/sites/default/files/styles/product_large/public/images/products/phytoxpert_digestion.png",
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
  									"image_url": "https://www.naturactive.fr/sites/default/files/styles/product_large/public/images/products/phytoxpert_articulation_0.png?itok=DsOe9P1q",
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
  									"image_url": "https://www.naturactive.fr/sites/default/files/styles/product_large/public/images/products/phytoxpert_omega_3-6-9.png",
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
  									"image_url": "https://www.naturactive.fr/sites/default/files/styles/product_large/public/images/products/phytoxpert_vitalite.png",
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
	  						actions.envoyer_message_quickreplies(sessionId, context, entities, "En quoi puis-je vous être utile ?", quick).then(function() {
	                actions.estampille_last_interaction(entities, context, sessionId);
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
  							  actions.estampille_last_interaction(entities, context, sessionId);
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
  					firebase.database().ref('intent/').orderByChild("cat").equalTo("Les naturactifs").once("value", function(snapshot) {
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
    							  actions.estampille_last_interaction(entities, context, sessionId);
    							})
  							})
  						})
  					}, function(error) {
  						console.log(error);
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
	  						actions.envoyer_message_quickreplies(sessionId, context, entities, "En quoi puis-je vous être utile ?", quick).then(function() {
	                actions.estampille_last_interaction(entities, context, sessionId);
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
	  						actions.envoyer_message_quickreplies(sessionId, context, entities, "En quoi puis-je vous être utile ?", quick).then(function() {
	                actions.estampille_last_interaction(entities, context, sessionId);
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
	  						actions.envoyer_message_quickreplies(sessionId, context, entities, "En quoi puis-je vous être utile ?", quick).then(function() {
	                actions.estampille_last_interaction(entities, context, sessionId);
	              })
							})
  					})
  				}
  				else if (entities.les_besoins && entities.les_besoins[0].value == 'diag_sol') {
  					var quick = [{
  						"content_type": "text",
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
	  						actions.envoyer_message_quickreplies(sessionId, context, entities, "En quoi puis-je vous être utile ?", quick).then(function() {
	                actions.estampille_last_interaction(entities, context, sessionId);
	              })
							})
  					})
  				}
  				else if (entities.les_besoins && entities.les_besoins[0].value == 'diag_s_s_n') {
  					var quick = [{
  						"content_type": "text",
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
	  						actions.envoyer_message_quickreplies(sessionId, context, entities, "En quoi puis-je vous être utile ?", quick).then(function() {
	                actions.estampille_last_interaction(entities, context, sessionId);
	              })
							})
  					})
  				}
  				else if (entities.les_besoins && entities.les_besoins[0].value == 'diag_v_d_h') {
  					var quick = [{
  						"content_type": "text",
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
	  						actions.envoyer_message_quickreplies(sessionId, context, entities, "En quoi puis-je vous être utile ?", quick).then(function() {
	                actions.estampille_last_interaction(entities, context, sessionId);
	              })
							})
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
  									"image_url": "https://mon-chatbot.com/faq_big.png",
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
  									"image_url": "https://mon-chatbot.com/faq_big.png",
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
  									"image_url": "https://mon-chatbot.com/faq_big.png",
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
  									"image_url": "https://mon-chatbot.com/faq_big.png",
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
  									"image_url": "https://mon-chatbot.com/faq_big.png",
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
  									"image_url": "https://mon-chatbot.com/faq_big.png",
  									"subtitle": "Afficher la procédure pour renvoyer sa carte de fidélité",
  									"buttons": [{
  										"type": "postback",
  										"payload": "Renvoi_carte_fidelite",
  										"title": "En savoir +"
  									}, {
  										"type": "element_share"
  									}]
  								}, {
  									"title": "Jeux concours",
  									"image_url": "https://mon-chatbot.com/faq_big.png",
  									"subtitle": "Afficher le règlement du Jeux concours",
  									"buttons": [{
  										"type": "postback",
  										"payload": "Participer_jeux_concours",
  										"title": "En savoir +"
  									}, {
  										"type": "element_share"
  									}]
  								}, {
  									"title": "M'inscrire à la Newsletter",
  									"image_url": "https://mon-chatbot.com/faq_big.png",
  									"subtitle": "Procédure d'inscription à la newsletter",
  									"buttons": [{
  										"type": "postback",
  										"payload": "Inscription_newsletter",
  										"title": "En savoir +"
  									}, {
  										"type": "element_share"
  									}]
  								}, {
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
  					actions.envoyer_message_bouton_generique(sessionId, context, entities, msg).then(function() {
              actions.estampille_last_interaction(entities, context, sessionId);
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
  									"image_url": "https://www.naturactive.fr/sites/default/files/images/slides/produits_de_la_ruche-1.png",
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
        							  actions.estampille_last_interaction(entities, context, sessionId);
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
  									"image_url": "https://www.naturactive.fr/sites/default/files/images/slides/produits_de_la_ruche-1.png",
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
        							  actions.estampille_last_interaction(entities, context, sessionId);
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
    							  actions.estampille_last_interaction(entities, context, sessionId);
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
  								actions.envoyer_message_quickreplies(sessionId, context, entities, "En quoi puis-je vous être utile ?", quick);
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
  								actions.envoyer_message_quickreplies(sessionId, context, entities, "En quoi puis-je vous être utile ?", quick).then(function() {
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
  								actions.envoyer_message_quickreplies(sessionId, context, entities, "En quoi puis-je vous être utile ?", quick).then(function() {
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
  						actions.envoyer_message_text(sessionId, context, entities, "Vous pouvez nous contacter par telephone à propos de nos produits en France : 0800326326. A propos de nos produits en Belgique.").then(function() {
  							actions.timer(entities, context, sessionId, temps_entre_chaque_message).then(function() {
                  actions.envoyer_message_text(sessionId, context, entities, "Voor België / Voor meer informatie +32(0)2 240 70 10").then(function() {
      							actions.timer(entities, context, sessionId, temps_avant_relance).then(function() {
      								actions.envoyer_message_quickreplies(sessionId, context, entities, "En quoi puis-je vous être utile ?", quick).then(function() {
        							  actions.estampille_last_interaction(entities, context, sessionId);
        							})
                    })
      						})
  							})
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
  					actions.reset_context(entities, context, sessionId).then(function() {
  						actions.envoyer_message_text(sessionId, context, entities, "A très bientôt !").then(function() {
  							actions.timer(entities, context, sessionId, temps_entre_chaque_message).then(function() {
  								actions.envoyer_message_text(sessionId, context, entities, "N'hésitez-pas à revenir souvent afin de consulter nos articles régulièrement mis à jour.").then(function() {
    							  actions.estampille_last_interaction(entities, context, sessionId);
    							})
  							})
  						})
  					})
  				}
					else if (entities.Dire_merci && entities.Dire_merci[0].value && (!entities.intent || entities.intent[0].confidence <= 0.01) ) {
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
									actions.envoyer_message_quickreplies(sessionId, context, entities, "En quoi puis-je vous être utile ?", quick);
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
							var texte = "Peut-être que je ne me suis pas présenté... Je m'appelle Anabelle. Je travaille pour Naturactive, la marque de Phyto et d'Aroma du groupe Pierre Fabre. Je suis là pour vous renseigner sur l'univers de notre marque. En quoi puis-je vous aider ?";
						}else if(entities.le_robot[0].value == 'fabrication') {
							var texte = "Alan Turing bien sûr et surtout M. pierre fabre qui a inspiré Ma création. Oublions mes origines, en quoi puis-je vous être utile ?";
						} else if(entities.le_robot[0].value == 'age') {
							var texte = "On ne demande pas son âge á une robot !Je suis née en 1988… au moment de la création de Naturactive… qui s’appelait plantes et médecines… voulez vous en savoir plus sur Naturactive ?";
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
						}
						actions.reset_context(entities, context, sessionId).then(function() {
							actions.envoyer_message_text(sessionId, context, entities, texte).then(function() {
								actions.timer(entities, context, sessionId, temps_avant_relance).then(function() {
										actions.envoyer_message_quickreplies(sessionId, context, entities, "En quoi puis-je vous être utile ?", quick);
								})
							})
						})
					}
  				else {
  					if (entities.intent && (entities.intent[0].confidence >= 0.80)) {
  						// on affiche seulement la bonne réponse
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

  						return firebase.database().ref('intent/' + intentValue).once('value').then(snapshot => {
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
	  										actions.envoyer_message_quickreplies(sessionId, context, entities, "En quoi puis-je vous être utile ?", quick).then(function() {
	        							  actions.estampille_last_interaction(entities, context, sessionId);
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
	  									actions.envoyer_message_quickreplies(sessionId, context, entities, "En quoi puis-je vous être utile ?", quick).then(function() {
	      							  actions.estampille_last_interaction(entities, context, sessionId);
	      							})
										})
  								})
  							}
  							else if (image == '' && lien == '') {
  								console.log('envoi text only');
  								// texte seulement
  								actions.envoyer_message_text(sessionId, context, entities, reponse).then(function() {
										actions.timer(entities, context, sessionId, temps_avant_relance).then(function() {
	  									actions.envoyer_message_quickreplies(sessionId, context, entities, "En quoi puis-je vous être utile ?", quick).then(function() {
	      							  actions.estampille_last_interaction(entities, context, sessionId);
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
	  										actions.envoyer_message_quickreplies(sessionId, context, entities, "En quoi puis-je vous être utile ?", quick).then(function() {
	        							  actions.estampille_last_interaction(entities, context, sessionId);
	        							})
											})
  									})
  								})
  							}
  						});
  					}
  					else {
  						// on affiche les 3 réponses les plus proches + la roue de secours + contactez-nous
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
  							apprentissage = true;
  						}
  						//msg.attachment.payload.elements.push();
  						// pour a = 0 jusqu'a 2 on fait un petit tour chez firebase et on ajoute dans elements
  						var firebaseData = [];

  						function getFirebaseData(endpoint) {
  							return firebase.database().ref('intent/' + endpoint).once("value", function(snapshot) {
  								firebaseData.push(snapshot.val());
  							});
  						}
  						Promise.all([getFirebaseData(entities.intent[0].value), getFirebaseData(entities.intent[1].value), getFirebaseData(entities.intent[2].value)]).then(function(snapshots) {
  							var zero = firebaseData[0];
  							var first = firebaseData[1];
  							var second = firebaseData[2];

                if(zero.image !== ''){
                  var image1 = "" + zero.image + "";
  							}
  							else {
                  var image1 = 'http://www.pharmacieduvignoble.fr/wp-content/uploads/images/produitsnaturactive.jpg';
  							}

  							if(first.image !== ''){
                  var image2 = "" + first.image + "";
  							}
  							else {
                  var image2 = 'http://www.pharmacieduvignoble.fr/wp-content/uploads/images/produitsnaturactive.jpg';
  							}
                  console.log(JSON.stringify(second));
                if(second.image !== ''){
                  var image3 = "" + second.image + "";
  							}
  							else {
                  var image3 = 'http://www.pharmacieduvignoble.fr/wp-content/uploads/images/produitsnaturactive.jpg';
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
  							msg.attachment.payload.elements.push({
  								"title": "Les suggestions sont erronées",
  								"image_url": "https://mon-chatbot.com/nothing.png",
  								"subtitle": "Aucune de ces suggestions ne convient à votre recherche ?",
  								"buttons": [{
  									"type": "postback",
  									"title": "Recommencer",
  									"payload": "RETOUR_ACCUEIL"
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
  								"title": "Vous pouvez également nous contacter par email",
  								"image_url": "https://mon-chatbot.com/email.png",
  								"subtitle": "À propos de nos produits, à propos de notre programme fidélité, etc.",
  								"buttons": [{
  									"type": "web_url",
  									"url": "https://www.naturactive.fr/nous-contacter?utm_source=Messenger&utm_medium=Chatbot",
  									"title": "En savoir +"
  								}]
  							});
  							actions.envoyer_message_text(sessionId, context, entities, 'Voici ce que je vous propose pour affiner votre recherche :').then(function() {
									actions.timer(entities, context, sessionId, temps_entre_chaque_message).then(function() {
	  								actions.envoyer_message_bouton_generique(sessionId, context, entities, msg).then(function() {
											actions.timer(entities, context, sessionId, temps_avant_relance).then(function() {
		  									actions.envoyer_message_quickreplies(sessionId, context, entities, "En quoi puis-je vous être utile ?", quick).then(function() {
		      							  actions.estampille_last_interaction(entities, context, sessionId);
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
  									actions.envoyer_message_quickreplies(sessionId, context, entities, "En quoi puis-je vous être utile ?", quick).then(function() {
      							  actions.estampille_last_interaction(entities, context, sessionId);
      							})
  								})
  							})
  						});
  					}
  				}
        }
        //fin di gros else
			}
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
	}).then(res => res.json())
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
					var sender = event.sender.id;
					var sessionId = findOrCreateSession(sender);
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
						clearTimeout(timer);
						// envoyer à Wit.ai ici
						if (event.message.attachments[0].title == "Informations Médicales" || event.message.attachments[0].title == "PharmacoVigilance") {
							// retour du mail
							wit.message('AFFICHER_LA_PETITE_REPONSE_RETOUR', sessions[sessionId].context).then(({
								entities
							}) => {
								choisir_prochaine_action(sessionId, sessions[sessionId].context, entities, sessions[sessionId].key);
								var date = Date.now();
					      var keyid = sessions[sessionId].key;
								return firebase.database().ref().child('accounts/' + keyid).child('date_last_mail').set(date);
								console.log('Yay, on a une response de Wit.ai : ' + JSON.stringify(entities));
								apprentissage = false;
							}).catch(console.error);
						} else if(event.message.attachments[0].title == "Vos informations"){
              wit.message('AFFICHER_MESSAGE_ENVOI_COLIS', sessions[sessionId].context).then(({
								entities
							}) => {
								choisir_prochaine_action(sessionId, sessions[sessionId].context, entities, sessions[sessionId].key);
								console.log('Yay, on a une response de Wit.ai : ' + JSON.stringify(entities));
								apprentissage = false;
							}).catch(console.error);
						}
					}
					// --------------------------- MESSAGE QUICK_REPLIES --------------------
					else if (hasValue(event.message, "text") && hasValue(event.message, "quick_reply")) {
						clearTimeout(timer);
						// envoyer à Wit.ai ici
						wit.message(quick_reply.payload, sessions[sessionId].context).then(({
							entities
						}) => {
							choisir_prochaine_action(sessionId, sessions[sessionId].context, entities, sessions[sessionId].key);
							console.log('Yay, on a une response de Wit.ai : ' + JSON.stringify(entities));
							apprentissage = false;
						}).catch(console.error);
					}
					// ----------------------------- MESSAGE TEXT ---------------------------
					else if (hasValue(event.message, "text")) {
						clearTimeout(timer);
						// envoyer à Wit.ai ici
						stockFirebaseData(sessions[sessionId].key, text);
						wit.message(text, sessions[sessionId].context, 3).then(({
							entities
						}) => {
							choisir_prochaine_action(sessionId, sessions[sessionId].context, entities, sessions[sessionId].key);
							console.log('Text : Yay, on a une response de Wit.ai : ' + JSON.stringify(entities));
							apprentissage = false;
						}).catch(console.error);
					}
					// ----------------------------------------------------------------------------
					else {
						clearTimeout(timer);
						wit.message(text, sessions[sessionId].context, 3).then(({
							entities
						}) => {
							choisir_prochaine_action(sessionId, sessions[sessionId].context, entities, sessions[sessionId].key);
							console.log('Text else: Yay, on a une response de Wit.ai : ' + JSON.stringify(entities));
						}).catch(console.error);
					}
				}
				// ----------------------------------------------------------------------------
				else if (event.postback && event.postback.payload) {
					var sender = event.sender.id;
					var sessionId = findOrCreateSession(sender);
					clearTimeout(timer);
					// envoyer à Wit.ai ici
					// si y'a apprentissage == true
					if (apprentissage == true) {
						// on récupere le texte d'avant dans Firebase + limitToLast
						firebase.database().ref('accounts/' + sessions[sessionId].key + '/fil').limitToLast(1).once('value').then(snapshot => {
							var dernier_message = Object.keys(snapshot.val())[0];
							console.log("dernier_message: " + dernier_message);
							firebase.database().ref('fil/' + dernier_message).once('value').then(snapshot => {
								var message = snapshot.val().message;
								console.log("le message: " + message);
								wit.message(event.postback.payload, sessions[sessionId].context, 3).then(({
									entities
								}) => {
									choisir_prochaine_action(sessionId, sessions[sessionId].context, entities, sessions[sessionId].key);
									validateSamples([{
										text: message,
										entities: [{
											entity: 'intent',
											value: event.postback.payload,
										}, ],
									}, ]).then(({
										n
									}) => console.log('validé'));
									apprentissage = false;
								}).catch(console.error);
							});
						});
					}
					else {
						wit.message(event.postback.payload, sessions[sessionId].context, 3).then(({
							entities
						}) => {
							choisir_prochaine_action(sessionId, sessions[sessionId].context, entities, sessions[sessionId].key);
							apprentissage = false;
						}).catch(console.error);
					}
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
