'use strict'
// ----------------------- NOS MODULES -------------------------
const bodyParser = require('body-parser');
const crypto = require('crypto');
const express = require('express');
const fetch = require('node-fetch');
const request = require('request');
const requestify = require('requestify');
const Quagga = require('quagga').default;
const firebase = require('firebase');
const admin = require("firebase-admin");

let Wit = null;
let log = null;
try {
  Wit = require('../')
    .Wit;
  log = require('../')
    .log;
} catch (e) {
  Wit = require('node-wit')
    .Wit;
  log = require('node-wit')
    .log;
}
// ----------------------- FIREBASE INIT -------------------------
firebase.initializeApp({
  apiKey: "AIzaSyAG7Gbo0Y_g4vLQzWden0YArcH6Akebe4c",
    authDomain: "monugo-3974a.firebaseapp.com",
    databaseURL: "https://monugo-3974a.firebaseio.com",
    storageBucket: "monugo-3974a.appspot.com",
    messagingSenderId: "865068017876"
});

admin.initializeApp({
  credential: admin.credential.cert({
    "type": "service_account",
    "project_id": "monugo-3974a",
    "private_key_id": "1de5514f0bf7c37320306c8479bcbd3fbda76e31",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCkCH0WQa9O7kCR\nl/HmCdR+0g2Jlr17O5A8vnGyQcm2X3fDyffztOcRJrm75qKAfBVn1CeCL0ifZleY\nHszAKe/ZabVW2zRPvvO878+aqv4/tpLjc6bqozR/TJWRUmGkju9hCNBky2x6Pu+G\nEoYGp4dlc6LouFiE2D4EV70LZEpt+qhCUerjvrlxPI8wvZq5EuRMkfh+0DDFqLnB\nDt5xWNgfZvnyO73zG+w03sjmesWvnBptYO9rWte5l/gZ3xq0hm3cYLE08x1mQDQr\nYet/baxd2I8D93GgCOLu/rQq0EdNkLoMgNUf1GZtuIoG1CQpLH2FZvfID4jzK1EP\nuXVhQTdPAgMBAAECggEAbde5W+QUbvigiF6FgBPpFhu3MQGeVR1n0yV8oW/okZWQ\nb62ZurrTWOrjyW4CN6Pf+a1Z35WmPgecdKN7XNs4YBCnfEhB2Xz3Xvf/v4TtyOCL\nsIBLsCgmCXDRX4UZGccViZcLZdPLCnmGj/NriJ06z7cFym1X6W2c6e+PCkfYh5gV\nfSItJRLcA4EgFlX8GSFW9N2diWR2XZCB3s8pMF23vGRJlTyAfg9iDCAaeEDjWQLj\n8s+iiLPxdoibrZvCFuwYFS3qDTAp7YQAH0JP0pBUDG2M42L473aXIhsHERZMuwar\nB6jmCvyoBVrHXouzqCvS07o6o8tpw7Ho3PQdaDtBcQKBgQDafKAbmoaamDT7FjXb\nvxhW7RHtLQTXxJC1b2E7pXuaaET60YzVCQl4WdQo0BuLR/j98SXRpIzQ5uyGn1+Z\n2n+T6+zy7oXf56iJKyJMQ+HVJ+0YXd/BFemQkGq88uLkqCKXiq/Pd0T9LPnz6i0B\n2pk/62NpHMnHpam61YUsCAzAQwKBgQDAMmfjeT0ndKHHOtKtkDxr2o5YWR72qpqy\nmTwwpDo/HV3zi6dZ+NS/UWjsRKU64j1ua+ZurrLmns+wrNe6VDi4WvrS00C8wWtK\nVf7Uw/Z7PQznZqOGAySFhfyerhcYLqr2zViu1ho82Yx/WrZ/azJDGWUuYnAJkiGI\nU9GA3iRSBQKBgQDX0rfNzK0eVTAwv1Xghjoi0/gbU5cvFMrljup7oxIgCtPo98qo\nPk8OhZ2f20L6KNR69RUoq+U2DoaizRgAwOe5VRoxNxEjhpDjPqqYr42Lo+7/XOvE\nrkKUPTRTBZK/0J6rF6JnzCdn+F/IZBClfixYCcufb4KbJrgtCPKN9j2yRQKBgQCs\n36naTX7YMmwhi6NcQlRWnqtShDb5n9Ktum8NQWqywnNzULYik1KpE0zQ153XLRAc\ndik6fSCll0swmwcfrgmmqQ7a+vFL1p3uqxMfxXO6vdsReJy1ObZr82yaPfS/55oX\ni/Ssrh/Dg9p/4tQsH/uBpyH/asNjmHFY8iuLQkRhEQKBgH72wzIZDIKaMvf4pNY3\nbIl72vNheebnjEKpZTMM+S9lXEIXEQKEwXprhon3t8jPIIJa1lvvWom+lupzGKaZ\nINH/VwDwUnzBxjTktP1sEXtbC78z1yEfTxYRNTvPDtQDJPgLG2JAcl4zt5G+iBL2\nYHyFGRhIeLS1AxfmlSL4qvHw\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-l892g@monugo-3974a.iam.gserviceaccount.com",
    "client_id": "108121034494388799145",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://accounts.google.com/o/oauth2/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-l892g%40monugo-3974a.iam.gserviceaccount.com"
  }),
  databaseURL: "https://monugo-3974a.firebaseio.com"
});
// ----------------------- API KEY openweathermap -------------------------

// ----------------------- PARAMETRES DU SERVEUR -------------------------
const PORT = process.env.PORT || 5000;
// Wit.ai parameters
const WIT_TOKEN = "ELF5D3K6KGJV464F3WW4MD4L4DXXKSDA";
// Messenger API parameters
const FB_PAGE_TOKEN = "EAACHnRcCn84BAHOxR9aqRk8lJZB3XvSnVkePZCAZCGM3JQ7e37zgfahTYjEZCni1cdC8SZCEmNzGSc7CEDj9joTdc2KOc8MgNFM0coHltBeHibjOPXgYQxewh07IbrIhd5PTZADkofcZANYIlbTjE5dkFYWUom4fRiPuw4zIlPcwQZDZD"; // saisir ici vos informations (infos sur session XX)
if (!FB_PAGE_TOKEN) {
  throw new Error('missing FB_PAGE_TOKEN')
}
const FB_APP_SECRET = "3afcd779771a40b86110c1d295ed81ea"; // saisir ici vos informations (infos sur session XX)
if (!FB_APP_SECRET) {
  throw new Error('missing FB_APP_SECRET')
}
let FB_VERIFY_TOKEN = "my_voice_is_my_password_verify_me"; // saisir ici vos informations (infos sur session XX)
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
          resolve(key);

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
							firebase.database()
								.ref()
								.child('accounts')
								.child(keyid.key)
								.set({
									fbid: fbid,
									prenom: prenom,
									nom: nom,
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

var passThreadControl = (id) => {
  var truc = "Additional content that the caller wants to set ";
  var body = JSON.stringify({
    recipient : { id },
    target_app_id : 263902037430900,
    metadata : truc
	});
	console.log("passThreadControl" + body);
	var qs = 'access_token=' + encodeURIComponent(FB_PAGE_TOKEN);
	return fetch('https://graph.facebook.com/v2.6/me/pass_thread_control?' + qs, {
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
var findOrCreateSession = (fbid) => {
	return new Promise((resolve, reject) => {
		let sessionId;
		Object.keys(sessions).forEach(k => {
			if (sessions[k].fbid === fbid) {
				sessionId = k;
				console.log("jai deja la session"+sessionId);
				//sessions[sessionId].dernier_message = new Date();
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
var url_chatbot = "2195891303970938";

var actions = {
  // fonctions genérales à définir ici
  send( {sessionId}, response ) {
    const recipientId = sessions[ sessionId ].fbid;
    if ( recipientId ) {
      if ( response.quickreplies ) {
        response.quick_replies = [];
        for ( var i = 0, len = response.quickreplies.length; i < len; i++ ) {
          response.quick_replies.push( {
            title: response.quickreplies[ i ],
            content_type: 'text',
            payload: response.quickreplies[ i ]
          } );
        }
        delete response.quickreplies;
      }
      return fbMessage( recipientId, response )
        .then( () => null )
        .catch( ( err ) => {
          console.log( "Je send" + recipientId );
          console.error(
            'Oops! erreur ',
            recipientId, ':', err.stack || err );
        } );
    } else {
      console.error( 'Oops! utilisateur non trouvé : ', sessionId );
      return Promise.resolve()
    }
  },
  getUserName( sessionId, context, entities ) {
    const recipientId = sessions[ sessionId ].fbid;
    const name = sessions[ sessionId ].name || null;
    return new Promise( function( resolve, reject ) {
      if ( recipientId ) {
        if ( name ) {
            context.userName = name;
            resolve( context );
        } else {
          requestUserName( recipientId )
            .then( ( json ) => {
              sessions[ sessionId ].name = json.first_name;
              context.userName = json.first_name; // Stockage prénom dans le context !
              resolve( context );
            } )
            .catch( ( err ) => {
              console.log( "ERROR = " + err );
              console.error(
                'Oops! Erreur : ',
                err.stack || err );
              reject( err );
            } );
        }
      } else {
        console.error( 'Oops! pas trouvé user :',
          sessionId );
        reject();
      }
    } );
  },
  envoyer_message_text( sessionId, context, entities, text ) {
    const recipientId = sessions[ sessionId ].fbid;
    var response = {
      "text": text
    };
    return fbMessage( recipientId, response )
      .then( () => {} )
      .catch( ( err ) => {
        console.log( "Erreur envoyer_message_text" + recipientId );
      } );
  },
  envoyer_message_bouton_generique( sessionId, context, entities, elements ) {
    const recipientId = sessions[ sessionId ].fbid;
    return fbMessage( recipientId, elements )
      .then( () => {} )
      .catch( ( err ) => {
        console.log( "Erreur envoyer_message_bouton_generique" + recipientId );
      } );
  },
  passer_le_controle(sessionId,context,entities) {
    const recipientId = sessions[ sessionId ].fbid;
    return passThreadControl( recipientId )
      .then( () => {
        console.log( "OK passer_le_controle" + recipientId );
        var response = {
          "text": "Je passe le relai à un humain. Merci d'ecrire pendant ce temps votre demande détaillée afin de répondre au mieux à votre demande."
        };
        return fbMessage( recipientId, response ).then( () => {
          console.log( "Send passThreadControl sur " + recipientId );
        } ).catch( ( err ) => {
          console.log( "Erreur byebye" + recipientId );
          console.error(
            'Oops! An error occurred while forwarding the byebye to',
            recipientId, ':', err.stack || err );
        } );
      } )
      .catch( ( err ) => {
        console.log( "Erreur passer_le_controle" + recipientId );
      } );
  },
  envoyer_message_quickreplies( sessionId, context, entities, text, quick ) {
    const recipientId = sessions[ sessionId ].fbid;
    var response2 = {
      "text": text,
      "quick_replies": quick
    };
    return fbMessage( recipientId, response2 )
      .then( () => {} )
      .catch( ( err ) => {
        console.log( "Erreur envoyer_message_text" + recipientId );
      } );
  },
  envoyer_message_image( sessionId, context, entities, image_url ) {
    const recipientId = sessions[ sessionId ].fbid;
    var response = {
        "attachment":{
        "type":"image",
        "payload":{
          "url": image_url
        }
      }
    };
    return fbMessage( recipientId, response )
      .then( () => {} )
      .catch( ( err ) => {
        console.log( "Erreur envoyer_message_text" + recipientId );
      } );
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
  getUserName(sessionId,context,entities) {
    const recipientId = sessions[sessionId].fbid;
    var name = sessions[sessionId].name;
    if (recipientId) {
      return new Promise(function(resolve, reject) {
        if (!name) {
          return requestUserName(recipientId)
            .then((json) => {
              context.userName = json.first_name;
              sessions[sessionId].name = json.first_name;
              resolve(context);
            })
            .catch((err) => {
              console.error('Oops! An error occurred while asking the name of the user: ', err.stack || err);
            });
        } else {
          // Retrieve the name of the user
          context.userName = name;
          return resolve(context);
        }
      });
    } else {
      console.error('Oops! Couldn\'t find user for session:', sessionId);
      // Giving the wheel back to our bot
      return Promise.resolve();
    }
  },
  reset_context( entities,context,sessionId ) {
    console.log( "Je vais reset le context" + JSON.stringify( context ) );
    return new Promise( function( resolve, reject ) {
      console.log( "Je suis dans reset_context" + JSON.stringify( context ) );
      context = {};
      return resolve( context );
    } );
  },
  byebye( sessionId,context ) {
    const recipientId = sessions[ sessionId ].fbid;
    if ( recipientId ) {
      var response = {
        "text": "Ravis d'avoir pu être votre guide, j'espère maintenant que vous êtes incollable sur le sucre. Sachez que je suis mis à jour régulièrement, n'hésitez pas à revenir poser des questions ! À bientôt."
      };
      return fbMessage( recipientId, response ).then( () => {
        console.log( "Send byebye sur " + recipientId );
      } ).catch( ( err ) => {
        console.log( "Erreur byebye" + recipientId );
        console.error(
          'Oops! An error occurred while forwarding the byebye to',
          recipientId, ':', err.stack || err );
      } );
    } else {
      console.error( 'Oops! Couldn\'t find user for session:', sessionId );
      return Promise.resolve()
    }
  },
  choixCategories( sessionId,context ) {
    const recipientId = sessions[ sessionId ].fbid;
    if ( recipientId ) {
      console.log( "CONTEXT DANS choixCategories" + context );
      var response = {
        "attachment": {
          "type": "template",
          "payload": {
            "template_type": "generic",
            "elements": [
                        {
                          "title": "NutriScore",
                          "image_url": "https://mon-chatbot.com/nutribot2018/images/nutriscore-good.jpg",
                          "subtitle": "Recherchez ici un produit alimentaire et ses équivalents plus sains.",
                          "buttons": [
                            {
                              "type": "postback",
                              "title": "❓ Informations",
                              "payload": "INFOS_SUR_LE_NUTRI"
                            },
                            {
                              "type": "postback",
                              "title": "🔍 Rechercher",
                              "payload": "PRODUIT_PLUS_SAIN"
                            },
                            {
                              "type": "postback",
                              "title": "🍏 Produit + sain",
                              "payload": "ALTERNATIVE_BEST"
                            }

                   ]
                 },
                 {
                "title": "Le sucre",
                "image_url": "https://mon-chatbot.com/nutribot2018/images/sucre.jpg",
                "subtitle": "Connaissez-vous réellement le Sucre ? Percez ici tous ses mystères !",
                "buttons": [
                  {
                    "type": "postback",
                    "title": "En Savoir +",
                    "payload": "CAT_SUCRE"
                 }
               ]
             },
              {
                "title": "Les aliments",
                "image_url": "https://mon-chatbot.com/nutribot2018/images/aliments.jpg",
                "subtitle": "Quels aliments contiennent du sucre ? Vous allez être surpris !",
                "buttons": [
                  {
                    "type": "postback",
                    "title": "En Savoir +",
                    "payload": "CAT_ALIMENTS"
                }
              ]
            },
              {
                "title": "Les additifs",
                "image_url": "https://mon-chatbot.com/nutribot2018/images/additifs.jpg",
                "subtitle": "C'est quoi un additif ? Où les trouvent-on ?",
                "buttons": [
                  {
                    "type": "postback",
                    "title": "En Savoir +",
                    "payload": "CAT_ADDITIFS"
               }
             ]
           },
              {
                "title": "Les nutriments",
                "image_url": "https://mon-chatbot.com/nutribot2018/images/nutriments.jpg",
                "subtitle": "Eléments indispensables à l'Homme ! Découvrez tous les secrets des nutriments.",
                "buttons": [
                  {
                    "type": "postback",
                    "title": "En Savoir +",
                    "payload": "CAT_NUTRIMENTS"
              }
            ]
          },
              {
                "title": "La diététique",
                "image_url": "https://mon-chatbot.com/nutribot2018/images/diet.jpg",
                "subtitle": "Découvrez ici tous mes conseils concernant la diététique !",
                "buttons": [
                  {
                    "type": "postback",
                    "title": "En Savoir +",
                    "payload": "CAT_DIETETIQUE"
             }
           ]
         },
              {
                "title": "L'organisme",
                "image_url": "https://mon-chatbot.com/nutribot2018/images/organisme.jpg",
                "subtitle": "Ici vous découvrirez tous les secrets concernant votre corps et le sucre !",
                "buttons": [
                  {
                    "type": "postback",
                    "title": "En Savoir +",
                    "payload": "CAT_ORGANISME"
            }
          ]
        }


        ]
          }
        }
      };
      var response_text = {
        "text": "PS : Si vous voulez je peux vous proposer des sujets pour débuter :"
      };
      return fbMessage( recipientId, response_text ).then( () => {
        return fbMessage( recipientId, response ).then( () => {
          console.log( "okay choixCategories " + recipientId );
        } ).catch( ( err ) => {
          console.log( "Erreur choixCategories" + recipientId );
          console.error( 'Oops! An error forwarding the response to',
            recipientId, ':', err.stack || err );
        } );
        console.log( "okay choixCategories " + recipientId );
      } ).catch( ( err ) => {
        console.log( "Erreur choixCategories" + recipientId );
        console.error( 'Oops! An error forwarding the response to',
          recipientId, ':', err.stack || err );
      } );
    } else {
      console.error( 'Oops! Couldn\'t find user for session:', sessionId );
      return Promise.resolve()
    }
  },
  afficher_tuto( sessionId,context ) {
    const recipientId = sessions[ sessionId ].fbid;
    if ( recipientId ) {
      console.log( "CONTEXT DANS afficher_tuto" + context );
      var response = {
        "attachment": {
          "type": "template",
          "payload": {
            "template_type": "generic",
            "elements": [
                        {
                          "title": "Accèdez au menu",
                          "image_url": "https://mon-chatbot.com/nutribot2018/images/tuto1.jpg",
                          "subtitle": "En cliquant ici, vous pouvez recommencer votre recherche à tout moment et accèder au menu ainsi qu'aux thèmes principaux.",
                          "buttons": [
                            {
                              "type": "postback",
                              "title": "C'est parti !",
                              "payload": "GO_TO_MENU_DEMARRER"
                     }
                   ]
                 },
                 {
                "title": "Appuyez sur les boutons",
                "image_url": "https://mon-chatbot.com/nutribot2018/images/tuto2.jpg",
                "subtitle": "Cliquez sur les réponses et laissez-vous guider par mes questions ! C'est très simple !",
                "buttons": [
                  {
                    "type": "postback",
                    "title": "C'est parti !",
                    "payload": "GO_TO_MENU_DEMARRER"
                 }
               ]
             },
              {
                "title": "Scannez vos aliments",
                "image_url": "https://mon-chatbot.com/nutribot2018/images/reading-bar.jpg",
                "subtitle": "Une simple photo d'un code-barre vous permet de connaître la valeur nutritionnelle de celui-ci.",
                "buttons": [
                  {
                    "type": "postback",
                    "title": "C'est parti !",
                    "payload": "GO_TO_MENU_DEMARRER"
                }
              ]
            },
              {
                "title": "Recherchez manuellement",
                "image_url": "https://mon-chatbot.com/nutribot2018/images/tuto4.jpg",
                "subtitle": "Recherchez un produit alimentaire et ses équivalents plus sains.",
                "buttons": [
                  {
                    "type": "postback",
                    "title": "C'est parti !",
                    "payload": "GO_TO_MENU_DEMARRER"
               }
             ]
           }
          ]


          }
        }
      };



        return fbMessage( recipientId, response ).then( () => {
          console.log( "okay choixCategories " + recipientId );
        } ).catch( ( err ) => {
          console.log( "Erreur choixCategories" + recipientId );
          console.error( 'Oops! An error forwarding the response to',
            recipientId, ':', err.stack || err );
        } );


      console.error( 'Oops! Couldn\'t find user for session:', sessionId );
      return Promise.resolve()
    }
  },
  choixCategories_retour( sessionId,context ) {
    const recipientId = sessions[ sessionId ].fbid;
    if ( recipientId ) {
      console.log( "CONTEXT DANS choixCategories_retour" + context );
      var response = {
        "attachment": {
          "type": "template",
          "payload": {
            "template_type": "generic",
            "elements": [
                        {
                          "title": "NutriScore",
                          "image_url": "https://mon-chatbot.com/nutribot2018/images/nutriscore-good.jpg",
                          "subtitle": "Recherchez ici un produit alimentaire et ses équivalents plus sains.",
                          "buttons": [
                            {
                              "type": "postback",
                              "title": "❓ Informations",
                              "payload": "INFOS_SUR_LE_NUTRI"
                            },

                            {
                              "type": "postback",
                              "title": "🔍 Rechercher",
                              "payload": "PRODUIT_PLUS_SAIN"
                            },
                            {
                              "type": "postback",
                              "title": "🍏 Produit + sain",
                              "payload": "ALTERNATIVE_BEST"
                            }
                   ]
                 },
                 {
                "title": "Le sucre",
                "image_url": "https://mon-chatbot.com/nutribot2018/images/sucre.jpg",
                "subtitle": "Connaissez-vous réellement le Sucre ? Percez ici tous ses mystères !",
                "buttons": [
                  {
                    "type": "postback",
                    "title": "En Savoir +",
                    "payload": "CAT_SUCRE"
                 }
               ]
             },
              {
                "title": "Les aliments",
                "image_url": "https://mon-chatbot.com/nutribot2018/images/aliments.jpg",
                "subtitle": "Quels aliments contiennent du sucre ? Vous allez être surpris !",
                "buttons": [
                  {
                    "type": "postback",
                    "title": "En Savoir +",
                    "payload": "CAT_ALIMENTS"
                }
              ]
            },
              {
                "title": "Les additifs",
                "image_url": "https://mon-chatbot.com/nutribot2018/images/additifs.jpg",
                "subtitle": "C'est quoi un additif ? Où les trouvent-on ?",
                "buttons": [
                  {
                    "type": "postback",
                    "title": "En Savoir +",
                    "payload": "CAT_ADDITIFS"
               }
             ]
           },
              {
                "title": "Les nutriments",
                "image_url": "https://mon-chatbot.com/nutribot2018/images/nutriments.jpg",
                "subtitle": "Eléments indispensables à l'Homme ! Découvrez tous les secrets des nutriments.",
                "buttons": [
                  {
                    "type": "postback",
                    "title": "En Savoir +",
                    "payload": "CAT_NUTRIMENTS"
              }
            ]
          },
              {
                "title": "La diététique",
                "image_url": "https://mon-chatbot.com/nutribot2018/images/diet.jpg",
                "subtitle": "Découvrez ici tous mes conseils concernant la diététique !",
                "buttons": [
                  {
                    "type": "postback",
                    "title": "En Savoir +",
                    "payload": "CAT_DIETETIQUE"
             }
           ]
         },
              {
                "title": "L'organisme",
                "image_url": "https://mon-chatbot.com/nutribot2018/images/organisme.jpg",
                "subtitle": "Ici vous découvrirez tous les secrets concernant votre corps et le sucre !",
                "buttons": [
                  {
                    "type": "postback",
                    "title": "En Savoir +",
                    "payload": "CAT_ORGANISME"
            }
          ]
        }


        ]
          }
        }
      };
      var response_text = {
        "text": "Très bien, recommençons ! Voici les thèmes que je peux vous suggérer :"
      };
      return fbMessage( recipientId, response_text ).then( () => {
        return fbMessage( recipientId, response ).then( () => {
          console.log( "okay choixCategories " + recipientId );
        } ).catch( ( err ) => {
          console.log( "Erreur choixCategories" + recipientId );
          console.error( 'Oops! An error forwarding the response to',
            recipientId, ':', err.stack || err );
        } );
        console.log( "okay choixCategories " + recipientId );
      } ).catch( ( err ) => {
        console.log( "Erreur choixCategories" + recipientId );
        console.error( 'Oops! An error forwarding the response to',
          recipientId, ':', err.stack || err );
      } );
    } else {
      console.error( 'Oops! Couldn\'t find user for session:', sessionId );
      return Promise.resolve()
    }
  },
  astuces( sessionId,context ) {
    const recipientId = sessions[ sessionId ].fbid;
    if ( recipientId ) {
      console.log( "CONTEXT DANS choixCategories_retour" + context );
      var response = {
        "attachment": {
          "type": "template",
          "payload": {
            "template_type": "generic",
            "elements": [
                        {
                          "title": "Clair et Zoomé",
                          "image_url": "https://mon-chatbot.com/nutribot2018/images/astuce-1.png",
                          "subtitle": "La photo doit être claire et le code-barre le plus lisible possible."

                 },
                 {
                   "title": "Trop petit !",
                   "image_url": "https://mon-chatbot.com/nutribot2018/images/astuce-1a.png",
                   "subtitle": "Il m'est difficile de lire le code-barre quand celui-ci est trop petit !"

                 },
                 {
                "title": "Mal orienté !",
                "image_url": "https://mon-chatbot.com/nutribot2018/images/astuce-2.png",
                "subtitle": "Essayez au maximum de scanner horizontalement le code-barre."

             },
             {
            "title": "A la verticale !",
            "image_url": "https://mon-chatbot.com/nutribot2018/images/astuce-2a.png",
            "subtitle": "Les chiffres doivent être horizontaux pour la détection !"

         },
              {
                "title": "Trop flou",
                "image_url": "https://mon-chatbot.com/nutribot2018/images/astuce-3.png",
                "subtitle": "Il m'est impossible de décrypter les chiffres lorsque la photo est floue."

            },
              {
                "title": "A l'envers !",
                "image_url": "https://mon-chatbot.com/nutribot2018/images/astuce-4.png",
                "subtitle": "Mes circuits ne sont pas assez puissants dans ce cas prècis."

           }
        ]
          }
        }
      };
      var response_text = {
        "text": "Découvrez ici comment bien m'envoyer de belles images afin que je puisse lire le code-barre !"
      };
      return fbMessage( recipientId, response_text ).then( () => {
        return fbMessage( recipientId, response ).then( () => {
          var response2a = {
            "text": "Que souhaitez-vous faire ?",
            "quick_replies": [
              {
                "content_type":"text",
                "title":"Scanner",
                "payload":"SCANSCANSCAN",
                "image_url": "https://mon-chatbot.com/nutribot2018/images/picto-codebar.png"
              },
              {
                "content_type":"text",
                "title":"Recherche manuelle",
                "payload":"PRODUIT_PLUS_SAIN",
                "image_url":"https://mon-chatbot.com/nutribot2018/images/clavier.png"
              },

              {
                "content_type": "text",
                "title": "Retour Accueil",
                "payload": "RETOUR_ACCUEIL",
                "image_url": "https://mon-chatbot.com/nutribot2018/images/back.png"
                                      },
              {
                "content_type": "text",
                "title": "Au revoir",
                "payload": "ByeByeBye",
                "image_url": "https://mon-chatbot.com/nutribot2018/images/exit.png"
                                      }
                                    ]
          };
          return fbMessage( recipientId, response2a ).then( () => {} )
            .catch( ( err ) => {
              console.log( "Erreur queryManuelleSearch" + recipientId );
              console.error(
                'Oops! An error forwarding the response to',
                recipientId, ':', err.stack || err );
            } );
        } ).catch( ( err ) => {
          console.log( "Erreur choixCategories" + recipientId );
          console.error( 'Oops! An error forwarding the response to',
            recipientId, ':', err.stack || err );
        } );
        console.log( "okay choixCategories " + recipientId );
      } ).catch( ( err ) => {
        console.log( "Erreur choixCategories" + recipientId );
        console.error( 'Oops! An error forwarding the response to',
          recipientId, ':', err.stack || err );
      } );
    } else {
      console.error( 'Oops! Couldn\'t find user for session:', sessionId );
      return Promise.resolve()
    }
  },
  mergeLocation( entities,context,sessionId ) {
    console.log( "Je suis dans merge_location" + JSON.stringify( entities ) );
    return new Promise( function( resolve, reject ) {
      var location = firstEntityValue( entities, 'location' );
      if ( location ) {
        console.log( "YA une location" );
        geocoder.geocode( location ).then( function( res ) {
          console.log( res );
          context.location = location;
          context.lat = res[ 0 ].latitude;
          context.lng = res[ 0 ].longitude;
          context.city = res[ 0 ].city;
          if ( res[ 0 ].zipcode ) {
            context.zipcode = res[ 0 ].zipcode;
          } else {
            context.zipcode = '';
          }
          delete context.MissingLocation;
          console.log( "Fin de la recherche" );
          console.log( "RESOLVE CONTECT" );
          return resolve( context );
        } ).catch( function( err ) {
          context.MissingLocation = true;
          delete context.location;
          delete context.lat;
          delete context.lng;
          delete context.city;
          delete context.zipcode;
          console.log( "Il n'y a pas de ville " + err );
          console.log( "RESOLVE CONTECT" );
          return resolve( context );
        } );
      } else {
        context.MissingLocation = true;
        delete context.location;
        delete context.lat;
        delete context.lng;
        delete context.city;
        delete context.zipcode;
        console.log( "Il n'y a pas de ville cest raté" );
        console.log( "RESOLVE CONTECT" );
        return resolve( context );
      }
    } );
  },
  merge_code_barre( entities,context,sessionId ) {
    console.log( "Je suis dans merge_code_barre" + JSON.stringify( entities ) );
    return new Promise( function( resolve, reject ) {
      var codebar = firstEntityValue( entities, 'number' );
      if ( codebar ) {
        console.log( "YA une codebar" );
          context.codebar = codebar;
          delete context.MissingCodeBar;
          return resolve( context );

      } else {
        context.MissingCodeBar = true;
        delete context.codebar;
        return resolve( context );
      }
    } );
  },
  afficher_aide( sessionId,context ) {
    console.log( 'je suis dans afficher_aide' );
    const recipientId = sessions[ sessionId ].fbid;
    if ( recipientId ) {
      var response = {
        "attachment": {
          "type": "template",
          "payload": {
            "template_type": "generic",
            "elements": [ {
              "title": "Démarrez",
              "image_url": "http://www.asknrelax.com/tutomonu1.jpg",
              "subtitle": "Démarrez à tout moment la conversation à l'aide du menu en bas à gauche !"
          }, {
              "title": "Laissez vous guider",
              "image_url": "http://www.asknrelax.com/tutomonu2.jpg",
              "subtitle": "Appuyez sur les boutons et laissez-vous guider !"
          }, {
              "title": "Changez de catégorie",
              "image_url": "http://www.asknrelax.com/tutomonu3.jpg",
              "subtitle": "Retournez à l'accueil et choisissez votre nouvelle catégorie !"
          } ]
          }
        }
      };
      return fbMessage( recipientId, response ).then( () => {
        console.log( "je vais choix_categories ce gros pano sur" +
          recipientId );
        var response2 = {
          "text": "Souhaitez-vous revenir à l'accueil ?",
          "quick_replies": [
            {
              "content_type": "text",
              "title": "Oui",
              "payload": "RETOUR_ACCUEIL",
              "image_url": "https://mon-chatbot.com/nutribot2018/images/back.png"
                },
            {
              "content_type": "text",
              "title": "Non merci !",
              "payload": "ByeByeBye",
              "image_url": "https://mon-chatbot.com/nutribot2018/images/exit.png"
                }
              ]
        };
        return fbMessage( recipientId, response2 ).then( () => {
          console.log( "okay afficher_aide " + recipientId );
          var response4a = "typing_off";
          fbMessage3( recipientId, response4a ).then( () => {
            console.log( "okay typing_off " + recipientId );
          } ).catch( ( err ) => {
            console.log( "Erreur typing_off" + recipientId );
            console.error(
              'Oops! An error forwarding the typing_on to',
              recipientId, ':', err.stack || err );
          } );
        } ).catch( ( err ) => {
          console.log( "Erreur afficher_aide" + recipientId );
          console.error( 'Oops! An error forwarding the response to',
            recipientId, ':', err.stack || err );
        } );
      } ).catch( ( err ) => {
        console.log( "Erreur afficher_aide" + recipientId );
        console.error(
          'Oops! An error occurred while  forwarding the afficher_aide to',
          recipientId, ':', err.stack || err );
      } );
    } else {
      console.error( 'Oops! Couldn\'t find user for session:', sessionId );
      return Promise.resolve()
    }
  },
  afficher_infos_nutriscore(entities,context,sessionId) {
    const recipientId = sessions[ sessionId ].fbid;
    var response_image = {
      "attachment":{
      "type":"image",
      "payload":{
        "url":"https://mon-chatbot.com/nutribot2018/images/nutriscore-good.jpg"
      }
    }};
    var response2 = {
    "text": "Le nutriscore est le logo nutritionel officiel destiné à favoriser une bonne alimentation. Vous trouverez plus de détails sur le nutriscore via le lien suivant : https://lc.cx/ckT4"
    };

    return fbMessage( recipientId, response_image ).then( () => {

      return fbMessage( recipientId, response2 ).then( () => {
        var response2a = {
          "text": "Vous pouvez ici scanner le code-barre de vos aliments préférés ou bien les rechercher manuellement dans ma base de données afin de connaître réellement leurs valeurs nutritionnelles. Que souhaitez-vous faire ?",
          "quick_replies": [
            {
              "content_type":"text",
              "title":"Recherche manuelle",
              "payload":"PRODUIT_PLUS_SAIN",
              "image_url":"https://mon-chatbot.com/nutribot2018/images/clavier.png"
            },
            {
              "content_type":"text",
              "title":"Scanner",
              "payload":"SCANSCANSCAN",
              "image_url": "https://mon-chatbot.com/nutribot2018/images/picto-codebar.png"
            },
            {
              "content_type": "text",
              "title": "Retour Accueil",
              "payload": "RETOUR_ACCUEIL",
              "image_url": "https://mon-chatbot.com/nutribot2018/images/back.png"
                                    },
            {
              "content_type": "text",
              "title": "Au revoir",
              "payload": "ByeByeBye",
              "image_url": "https://mon-chatbot.com/nutribot2018/images/exit.png"
            }]
        };
        return fbMessage( recipientId, response2a ).then( () => {} )
          .catch( ( err ) => {
            console.log( "Erreur queryManuelleSearch" + recipientId );
            console.error(
              'Oops! An error forwarding the response to',
              recipientId, ':', err.stack || err );
          } );
      } ).catch( ( err ) => {
        console.log( "Erreur typing_off" + recipientId );
        console.error( 'Oops! An error forwarding the typing_on to',
          recipientId, ':', err.stack || err );
      } );

      } )
        .catch( ( err ) => {
          console.log( "Erreur genese" + recipientId );
          console.error(
            'Oops! An error forwarding the response to',
            recipientId, ':', err.stack || err );
        } );



  },
  genese(entities,context,sessionId) {
    const recipientId = sessions[ sessionId ].fbid;
    var response2 = {
    "text": "Mes créateurs sont la société BotDesign by Nextstep-Santé : \n🌐 http://www.botdesign.net\n🐦 https://twitter.com/nextstep_sante\n☎️ 06.79.83.52.41",
    "quick_replies": [
      {
        "content_type": "text",
        "title": "Retourner à l'accueil",
        "payload": "RETOUR_ACCUEIL",
        "image_url": "https://mon-chatbot.com/nutribot2018/images/back.png"
          },
      {
        "content_type": "text",
        "title": "Au revoir",
        "payload": "ByeByeBye",
        "image_url": "https://mon-chatbot.com/nutribot2018/images/exit.png"
          }
        ]
    };
    return fbMessage( recipientId, response2 ).then( () => {} )
      .catch( ( err ) => {
        console.log( "Erreur genese" + recipientId );
        console.error(
          'Oops! An error forwarding the response to',
          recipientId, ':', err.stack || err );
      } );

  },
  remerciements(entities,context,sessionId) {
    const recipientId = sessions[ sessionId ].fbid;
    var response2 = {
    "text": "De rien, n'hésitez-pas à me solliciter afin de percer tous les mystères du Sucre !!",
    "quick_replies": [
      {
        "content_type": "text",
        "title": "Retourner à l'accueil",
        "payload": "RETOUR_ACCUEIL",
        "image_url": "https://mon-chatbot.com/nutribot2018/images/back.png"
          },
      {
        "content_type": "text",
        "title": "Au revoir",
        "payload": "ByeByeBye",
        "image_url": "https://mon-chatbot.com/nutribot2018/images/exit.png"
          }
        ]
    };
    return fbMessage( recipientId, response2 ).then( () => {} )
      .catch( ( err ) => {
        console.log( "Erreur genese" + recipientId );
        console.error(
          'Oops! An error forwarding the response to',
          recipientId, ':', err.stack || err );
      } );

  },
  insultes(entities,context,sessionId) {
    const recipientId = sessions[ sessionId ].fbid;
    var response2 = {
    "text": "... Je suis désolé ! Je fais de mon mieux afin de répondre le plus correctement possible mais il m'arrive parfois de créer un petit court-circuit !!",
    "quick_replies": [
      {
        "content_type": "text",
        "title": "Retourner à l'accueil",
        "payload": "RETOUR_ACCUEIL",
        "image_url": "https://mon-chatbot.com/nutribot2018/images/back.png"
          },
      {
        "content_type": "text",
        "title": "Non merci !",
        "payload": "ByeByeBye",
        "image_url": "https://mon-chatbot.com/nutribot2018/images/exit.png"
          }
        ]
    };
    return fbMessage( recipientId, response2 ).then( () => {} )
      .catch( ( err ) => {
        console.log( "Erreur genese" + recipientId );
        console.error(
          'Oops! An error forwarding the response to',
          recipientId, ':', err.stack || err );
      } );

  },
  merge_undefined(request) {
    const context = {};
    var text = request["text"];
    context.query = text;
    return context;
  },
  suggestions(entities,context,sessionId) {
    const recipientId = sessions[ sessionId ].fbid;
    var response = {
    "text": "Erreur 404, mes circuits n'ont pas saisi votre requête !"
    };
    var response2 = {
    "text": "Si vous souhaitez obtenir le nutriscore d'un produit ou d'une marque, n'hésitez-pas à utiliser le formulaire de recherche prévu à cet effet.",
    "quick_replies": [
      {
        "content_type": "text",
        "title": "NutriScore "+context.query,
        "payload": "PRODUIT_PLUS_SAIN",
        "image_url": "https://mon-chatbot.com/nutribot2018/images/clavier.png"
          },
          {
            "content_type": "text",
            "title": "Les thèmes",
            "payload": "RETOUR_ACCUEIL",
            "image_url": "https://mon-chatbot.com/nutribot2018/images/back.png"
              },
      {
        "content_type": "text",
        "title": "Au revoir",
        "payload": "ByeByeBye",
        "image_url": "https://mon-chatbot.com/nutribot2018/images/exit.png"
          }
        ]
    };
    return fbMessage( recipientId, response ).then( () => {

      return fbMessage( recipientId, response2 ).then( () => {} )
        .catch( ( err ) => {
          console.log( "Erreur genese" + recipientId );
          console.error(
            'Oops! An error forwarding the response to',
            recipientId, ':', err.stack || err );
        } );

    } )
      .catch( ( err ) => {
        console.log( "Erreur genese" + recipientId );
        console.error(
          'Oops! An error forwarding the response to',
          recipientId, ':', err.stack || err );
      } );

  },

  // fonctions pour la recherche https://world.openfoodfacts.org/cgi/search.pl?search_terms=banania&search_simple=1&action=process&json=1
  ActionRecherche(sessionId,context) {
    const recipientId = sessions[sessionId].fbid;
    if (recipientId) {
      console.log("CONTEXT DANS ActionRecherche"+context);
      var response = {
            "text":"Vous pouvez ici scanner le code-barre de vos aliments préférés ou bien les rechercher manuellement dans ma base de données afin de connaître réellement leurs valeurs nutritionnelles. Que souhaitez-vous faire ?",
            "quick_replies":[
              {
                "content_type":"text",
                "title":"Scanner",
                "payload":"SCANSCANSCAN",
               "image_url": "https://mon-chatbot.com/nutribot2018/images/picto-codebar.png"
              },
              {
                "content_type":"text",
                "title":"Recherche manuelle",
                "payload":"PRODUIT_PLUS_SAIN",
                "image_url":"https://mon-chatbot.com/nutribot2018/images/clavier.png"
              }
            ]
          };
      return fbMessage(recipientId, response)
        .then(() => {
          console.log("okay ActionRecherche " + recipientId);
        })
        .catch((err) => {
          console.log("Erreur ActionRecherche" + recipientId);
          console.error('Oops! An error forwarding the response to', recipientId, ':', err.stack || err);
        });

    } else {
      console.error('Oops! Couldn\'t find user for session:', sessionId);
      return Promise.resolve()
    }
  },
  ExplicationScan(sessionId,context) {
    const recipientId = sessions[sessionId].fbid;
    if (recipientId) {
      var response_image = {
        "attachment":{
        "type":"image",
        "payload":{
          "url":"https://mon-chatbot.com/nutribot2018/images/reading-bar.jpg"
        }
      }};
      var response = {
        "text":"Prenez en photo ou bien faites glisser ici l'image du code-barre de l'aliment dont vous souhaitez connaître les informations nutritionnelles. (Le code-barre doit être visible, les chiffres vers le bas et bien zoomé!)"
      };
      return fbMessage(recipientId, response_image)
        .then(() => {
          return fbMessage(recipientId, response)
            .then(() => {
              console.log("ExplicationsScan sur" + recipientId);
            })
            .catch((err) => {
              console.log("Erreur ExplicationsScan" + recipientId);
              console.error('Oops! An error occurred while  forwarding the ExplicationsScan to', recipientId, ':', err.stack || err);
            });
          console.log("ExplicationsScan sur" + recipientId);
        })
        .catch((err) => {
          console.log("Erreur ExplicationsScan" + recipientId);
          console.error('Oops! An error occurred while  forwarding the ExplicationsScan to', recipientId, ':', err.stack || err);
        });
    } else {
      console.error('Oops! Couldn\'t find user for session:', sessionId);
      return Promise.resolve()
    }
  },
  mergeMarque(request) {
    console.log("Je suis dans mergeMarque"+JSON.stringify(request));
    return new Promise(function(resolve, reject) {
      var context = request["context"];
      context.marque = request["text"];
      return resolve(context);
    });
  },
  queryManuelleSearch(entities,context,sessionId) {
    const recipientId = sessions[ sessionId ].fbid;
    var response4 = "typing_on";
    fbMessage3( recipientId, response4 ).then( () => {
      console.log( "okay typing_on " + recipientId );
    } ).catch( ( err ) => {
      console.log( "Erreur typing_on" + recipientId );
      console.error( 'Oops! An error forwarding the typing_on to', recipientId,
        ':', err.stack || err );
    } );
    requestify.get(
      'https://mon-chatbot.com/nutribot2018/requetes/queryManuelleSearch.php', {
        params: {
          marque: context.marque
        }
      } ).then( function( response ) {
      console.log( 'cest le retour de queryManuelleSearch' + response.body );
      if ( recipientId ) {
        var response = response.body;
        return fbMessage( recipientId, response ).then( () => {
          console.log( "okay queryManuelleSearch " + recipientId );
          var response4a = "typing_off";
          fbMessage3( recipientId, response4a ).then( () => {
            console.log( "okay typing_off " + recipientId );
            var response2 = {
              "text": "Que souhaitez-vous faire ?",
              "quick_replies": [

                {
                  "content_type": "text",
                  "title": "Retour Accueil",
                  "payload": "RETOUR_ACCUEIL",
                  "image_url": "https://mon-chatbot.com/nutribot2018/images/back.png"
                                        },
                {
                  "content_type": "text",
                  "title": "Au revoir",
                  "payload": "ByeByeBye",
                  "image_url": "https://mon-chatbot.com/nutribot2018/images/exit.png"
                                        }
                                      ]
            };
            return fbMessage( recipientId, response2 ).then( () => {} )
              .catch( ( err ) => {
                console.log( "Erreur queryManuelleSearch" + recipientId );
                console.error(
                  'Oops! An error forwarding the response to',
                  recipientId, ':', err.stack || err );
              } );
          } ).catch( ( err ) => {
            console.log( "Erreur typing_off" + recipientId );
            console.error( 'Oops! An error forwarding the typing_on to',
              recipientId, ':', err.stack || err );
          } );
        } ).catch( ( err ) => {
          var response22 = {
            "text": "Une erreur s'est produite ! Souhaitez-vous recommencer ?",
            "quick_replies": [
              {
                "content_type": "text",
                "title": "Oui",
                "payload": "RETOUR_ACCUEIL"
                          },
              {
                "content_type": "text",
                "title": "Non merci !",
                "payload": "ByeByeBye"
                          }
                        ]
          };
          return fbMessage( recipientId, response22 ).then( () => {
            console.log( "okay Erreur queryManuelleSearch " + recipientId );
          } ).catch( ( err ) => {
            console.log( "Erreur queryManuelleSearch" + recipientId );
            console.error( 'Oops! An error forwarding the response to',
              recipientId, ':', err.stack || err );
          } );
          console.log( "Erreur queryManuelleSearch" + recipientId );
          console.error( 'Oops! An error forwarding the response to',
            recipientId, ':', err.stack || err );
        } );
      } else {
        console.error( 'Oops! Couldn\'t find user for session:', sessionId );
        return Promise.resolve()
      }
    } ).fail( function( response ) {
      console.log( 'ERROR DE REQUETE' + response.getCode() ); // Some error code such as, for example, 404
    } );
  },
  queryManuelleSearch2(entities,context,sessionId) {
    console.log('Le context dans queryManuelleSearch2'+JSON.stringify(context));
    const recipientId = sessions[ sessionId ].fbid;
    var response4 = "typing_on";
    fbMessage3( recipientId, response4 ).then( () => {
      console.log( "okay typing_on " + recipientId );
    } ).catch( ( err ) => {
      console.log( "Erreur typing_on" + recipientId );
      console.error( 'Oops! An error forwarding the typing_on to', recipientId,
        ':', err.stack || err );
    } );

    // si le context.recherche = 'normal' ou 'autre'
    if(sessions[sessionId].recherche == 'normale') {
      var iurl = 'https://mon-chatbot.com/nutribot2018/requetes/queryManuelleSearch2.php';
    }else if(sessions[sessionId].recherche == 'autre'){
      var iurl = 'https://mon-chatbot.com/nutribot2018/requetes/queryManuelleSearch2bis.php';
    }
    requestify.get(
      iurl, {
        params: {
          code: context.code
        }
      } ).then( function( response ) {

      // reset context.recherche
      sessions[sessionId].recherche == '';
      console.log( 'cest le retour de queryManuelleSearch' + response.body );
      if ( recipientId ) {
        var response = response.body;
        return fbMessage( recipientId, response ).then( () => {
          console.log( "okay queryManuelleSearch " + recipientId );
          var response4a = "typing_off";
          fbMessage3( recipientId, response4a ).then( () => {
            console.log( "okay typing_off " + recipientId );
            var response2 = {
              "text": "Que souhaitez-vous faire ?",
              "quick_replies": [

                {
                  "content_type": "text",
                  "title": "Autre Recherche",
                  "payload": "PRODUIT_PLUS_SAIN",
                  "image_url": "https://mon-chatbot.com/nutribot2018/images/random.png"
                },
                {
                  "content_type": "text",
                  "title": "Retour Accueil",
                  "payload": "RETOUR_ACCUEIL",
                  "image_url": "https://mon-chatbot.com/nutribot2018/images/back.png"
                },
                {
                  "content_type": "text",
                  "title": "Au revoir",
                  "payload": "ByeByeBye",
                  "image_url": "https://mon-chatbot.com/nutribot2018/images/exit.png"
                                        }
                                      ]
            };
            return fbMessage( recipientId, response2 ).then( () => {} )
              .catch( ( err ) => {
                console.log( "Erreur queryManuelleSearch" + recipientId );
                console.error(
                  'Oops! An error forwarding the response to',
                  recipientId, ':', err.stack || err );
              } );
          } ).catch( ( err ) => {
            console.log( "Erreur typing_off" + recipientId );
            console.error( 'Oops! An error forwarding the typing_on to',
              recipientId, ':', err.stack || err );
          } );
        } ).catch( ( err ) => {
          var response22 = {
            "text": "Une erreur s'est produite ! Souhaitez-vous recommencer ?",
            "quick_replies": [
              {
                "content_type": "text",
                "title": "Oui",
                "payload": "RETOUR_ACCUEIL"
                          },
              {
                "content_type": "text",
                "title": "Non merci !",
                "payload": "ByeByeBye"
                          }
                        ]
          };
          return fbMessage( recipientId, response22 ).then( () => {
            console.log( "okay Erreur queryManuelleSearch " + recipientId );
          } ).catch( ( err ) => {
            console.log( "Erreur queryManuelleSearch" + recipientId );
            console.error( 'Oops! An error forwarding the response to',
              recipientId, ':', err.stack || err );
          } );
          console.log( "Erreur queryManuelleSearch" + recipientId );
          console.error( 'Oops! An error forwarding the response to',
            recipientId, ':', err.stack || err );
        } );
      } else {
        console.error( 'Oops! Couldn\'t find user for session:', sessionId );
        return Promise.resolve()
      }
    } ).fail( function( response ) {
      console.log( 'ERROR DE REQUETE' + response.getCode() ); // Some error code such as, for example, 404
    } );
  },
  codeScanSearch(entities,context,sessionId) {
    const recipientId = sessions[ sessionId ].fbid;
    var response4 = "typing_on";
    fbMessage3( recipientId, response4 ).then( () => {
      console.log( "okay typing_on " + recipientId );
    } ).catch( ( err ) => {
      console.log( "Erreur typing_on" + recipientId );
      console.error( 'Oops! An error forwarding the typing_on to', recipientId,
        ':', err.stack || err );
    } );
    requestify.get(
      'https://mon-chatbot.com/nutribot2018/requetes/codeScanSearch.php', {
        params: {
          code: context.codebar
        }
      } ).then( function( response ) {
      console.log( 'cest le retour de queryManuelleSearch' + response.body );
      if ( recipientId ) {
        var response = response.body;
        return fbMessage( recipientId, response ).then( () => {
          console.log( "okay queryManuelleSearch " + recipientId );
          var response4a = "typing_off";
          fbMessage3( recipientId, response4a ).then( () => {
            console.log( "okay typing_off " + recipientId );
            var response2 = {
              "text": "Que souhaitez-vous faire ?",
              "quick_replies": [

                {
                  "content_type": "text",
                  "title": "Retour Accueil",
                  "payload": "RETOUR_ACCUEIL",
                  "image_url": "https://mon-chatbot.com/nutribot2018/images/back.png"
                                        },
                {
                  "content_type": "text",
                  "title": "Au revoir",
                  "payload": "ByeByeBye",
                  "image_url": "https://mon-chatbot.com/nutribot2018/images/exit.png"
                                        }
                                      ]
            };
            return fbMessage( recipientId, response2 ).then( () => {} )
              .catch( ( err ) => {
                console.log( "Erreur queryManuelleSearch" + recipientId );
                console.error(
                  'Oops! An error forwarding the response to',
                  recipientId, ':', err.stack || err );
              } );
          } ).catch( ( err ) => {
            console.log( "Erreur typing_off" + recipientId );
            console.error( 'Oops! An error forwarding the typing_on to',
              recipientId, ':', err.stack || err );
          } );
        } ).catch( ( err ) => {
          var response22 = {
            "text": "Une erreur s'est produite ! Souhaitez-vous recommencer ?",
            "quick_replies": [
              {
                "content_type": "text",
                "title": "Oui",
                "payload": "RETOUR_ACCUEIL"
                          },
              {
                "content_type": "text",
                "title": "Non merci !",
                "payload": "ByeByeBye"
                          }
                        ]
          };
          return fbMessage( recipientId, response22 ).then( () => {
            console.log( "okay Erreur queryManuelleSearch " + recipientId );
          } ).catch( ( err ) => {
            console.log( "Erreur queryManuelleSearch" + recipientId );
            console.error( 'Oops! An error forwarding the response to',
              recipientId, ':', err.stack || err );
          } );
          console.log( "Erreur queryManuelleSearch" + recipientId );
          console.error( 'Oops! An error forwarding the response to',
            recipientId, ':', err.stack || err );
        } );
      } else {
        console.error( 'Oops! Couldn\'t find user for session:', sessionId );
        return Promise.resolve()
      }
    } ).fail( function( response ) {
      console.log( 'ERROR DE REQUETE' + response.getCode() ); // Some error code such as, for example, 404
    } );
  },
  // fonctions de quick_replies CAT_SUCRE
  go_saccharose(entities,context,sessionId) {
    const recipientId = sessions[ sessionId ].fbid;
    var response4 = "typing_on";
    fbMessage3( recipientId, response4 ).then( () => {
      console.log( "okay typing_on " + recipientId );
    } ).catch( ( err ) => {
      console.log( "Erreur typing_on" + recipientId );
    } );

    var video = {
      "attachment":{
        "type":"video",
        "payload":{
          "url":"https://mon-chatbot.com/nutribot2018/images/canne_video.mp4"
        }
      }
    };
    var response2 = {
    "text": "Ah le sucre. Voilà un vaste sujet, ça tombe bien on m'a créé pour y répondre ! Il faut savoir que le sucre est une substance de saveur douce extraite de la canne à sucre et de la betterave sucrière. Il est surtout formé d'un composé que l'espèce humaine appelle le saccharose.",
    "quick_replies": [
      {
       "content_type": "text",
       "title": "Le Saccharose",
       "payload": "Saccharose"
      },
      {
       "content_type": "text",
       "title": "Le Glucose",
       "payload": "Glucose"
      },
      {
       "content_type": "text",
       "title": "La Betterave",
       "payload": "Betterave"
      },
      {
       "content_type": "text",
       "title": "Les Légumes",
       "payload": "Légume"
      },
      {
       "content_type": "text",
       "title": "Le Fructose",
       "payload": "Fructose"
      },
      {
       "content_type": "text",
       "title": "La Canne à Sucre",
       "payload": "La Canne à sucre"
      },
      {
        "content_type": "text",
        "title": "Retour Accueil",
        "payload": "RETOUR_ACCUEIL",
        "image_url": "https://mon-chatbot.com/nutribot2018/images/back.png"
                              },
      {
        "content_type": "text",
        "title": "Au revoir",
        "payload": "ByeByeBye",
        "image_url": "https://mon-chatbot.com/nutribot2018/images/exit.png"
                              }
                            ]
    };


    return fbMessage( recipientId, video ).then( () => {

      var response4a = "typing_off";
      fbMessage3( recipientId, response4a ).then( () => {
        console.log( "okay typing_off " + recipientId );

        return fbMessage( recipientId, response2 ).then( () => {} )
          .catch( ( err ) => {
            console.log( "Erreur queryScanSearch" + recipientId );
            console.error(
              'Oops! An error forwarding the response to',
              recipientId, ':', err.stack || err );
          } );

    } )
      .catch( ( err ) => {
        console.log( "Erreur queryScanSearch" + recipientId );
        console.error(
          'Oops! An error forwarding the response to',
          recipientId, ':', err.stack || err );
      } );
    } );
  },
  go_glucose_canne_betterave_fructose(entities,context,sessionId) {
    const recipientId = sessions[ sessionId ].fbid;

    var response_image = {
      "attachment":{
      "type":"image",
      "payload":{
        "url":"https://upload.wikimedia.org/wikipedia/commons/5/53/Sucrose_CASCC.png"
      }
    }};
    return fbMessage(recipientId, response_image)
            .then(() => {
              var response2 = {
              "text": "Selon mes informations programmées, le saccharose est le nom scientifique du sucre de canne ou de betterave, formé d'une molécule de glucose, ainsi que d'une molécule de fructose unies , et de la formule C12H22O11.",
              "quick_replies": [
                {
                 "content_type": "text",
                 "title": "Le Glucose",
                 "payload": "Glucose"
                },
                {
                 "content_type": "text",
                 "title": "Le Sucre de Canne",
                 "payload": "Canne à sucre"
                },
                {
                 "content_type": "text",
                 "title": "La Betterave",
                 "payload": "Betterave"
                },
                {
                 "content_type": "text",
                 "title": "Le Fructose",
                 "payload": "Fructose"
                },
                {
                  "content_type": "text",
                  "title": "Retour Accueil",
                  "payload": "RETOUR_ACCUEIL",
                  "image_url": "https://mon-chatbot.com/nutribot2018/images/back.png"
                                        },
                {
                  "content_type": "text",
                  "title": "Au revoir",
                  "payload": "ByeByeBye",
                  "image_url": "https://mon-chatbot.com/nutribot2018/images/exit.png"
                                        }
                                      ]
              };
              return fbMessage( recipientId, response2 ).then( () => {} )
                .catch( ( err ) => {
                  console.log( "Erreur queryScanSearch" + recipientId );
                  console.error(
                    'Oops! An error forwarding the response to',
                    recipientId, ':', err.stack || err );
                } );
            })
            .catch((err) => {
              console.log("Erreur byebye" + recipientId);
              console.error('Oops! An error occurred while 22222 forwarding the response to', recipientId, ':', err.stack || err);
            });


  },
  go_relance(entities,context,sessionId) {
    const recipientId = sessions[ sessionId ].fbid;
    var response_image = {
      "attachment":{
      "type":"image",
      "payload":{
        "url":"https://mon-chatbot.com/nutribot2018/images/illustrations/glucose.png"
      }
    }};
    return fbMessage( recipientId, response_image ).then( () => {
    var resp =  {
      "text": "Le glucose, c'est le sucre rapide assimilé par l'organisme dans sa formule la plus simple."
    };
    var response2 = {
    "text": "Mes connaissances sont encore très nombreuses Souhaitez-vous savoir autre chose ?",
    "quick_replies": [
      {
       "content_type": "text",
       "title": "Les Aliments",
       "payload": "Aliments"
      },
      {
       "content_type": "text",
       "title": "Les Sucres",
       "payload": "les sucres"
      },
      {
        "content_type": "text",
        "title": "Retour Accueil",
        "payload": "RETOUR_ACCUEIL",
        "image_url": "https://mon-chatbot.com/nutribot2018/images/back.png"
                              },
      {
        "content_type": "text",
        "title": "Au revoir",
        "payload": "ByeByeBye",
        "image_url": "https://mon-chatbot.com/nutribot2018/images/exit.png"
                              }
                            ]
    };
    return fbMessage( recipientId, resp ).then( () => {
      return fbMessage( recipientId, response2 ).then( () => {} )
        .catch( ( err ) => {
          console.log( "Erreur queryScanSearch" + recipientId );
          console.error(
            'Oops! An error forwarding the response to',
            recipientId, ':', err.stack || err );
        } );

    } )
      .catch( ( err ) => {
        console.log( "Erreur queryScanSearch" + recipientId );
        console.error(
          'Oops! An error forwarding the response to',
          recipientId, ':', err.stack || err );
      } );
    } )
      .catch( ( err ) => {
        console.log( "Erreur queryScanSearch" + recipientId );
        console.error(
          'Oops! An error forwarding the response to',
          recipientId, ':', err.stack || err );
      } );

  },
  go_legume(entities,context,sessionId) {
    const recipientId = sessions[ sessionId ].fbid;
    var response_image = {
      "attachment":{
      "type":"image",
      "payload":{
        "url":"https://mon-chatbot.com/nutribot2018/images/illustrations/betterave.jpg"
      }
    }};
    return fbMessage( recipientId, response_image ).then( () => {
    var response2 = {
    "text": "Étant un robot je n'en ai jamais mangé, mais je sais tout de même que la betterave est utilisée comme légume dans l'alimentation,  mais aussi comme plantes fourragères et pour la production de sucre.",
    "quick_replies": [
      {
       "content_type": "text",
       "title": "Les légumes",
       "payload": "Légume"
      },
      {
        "content_type": "text",
        "title": "Retour Accueil",
        "payload": "RETOUR_ACCUEIL",
        "image_url": "https://mon-chatbot.com/nutribot2018/images/back.png"
                              },
      {
        "content_type": "text",
        "title": "Au revoir",
        "payload": "ByeByeBye",
        "image_url": "https://mon-chatbot.com/nutribot2018/images/exit.png"
                              }
                            ]
    };
    return fbMessage( recipientId, response2 ).then( () => {} )
      .catch( ( err ) => {
        console.log( "Erreur queryScanSearch" + recipientId );
        console.error(
          'Oops! An error forwarding the response to',
          recipientId, ':', err.stack || err );
      } );
    } )
      .catch( ( err ) => {
        console.log( "Erreur queryScanSearch" + recipientId );
        console.error(
          'Oops! An error forwarding the response to',
          recipientId, ':', err.stack || err );
      } );

  },
  go_relance_aliments_from_legume(entities,context,sessionId) {
    const recipientId = sessions[ sessionId ].fbid;
      var resp =  {
        "text": "On dénomme légume la partie comestible d'une plante potagère. Il est d'ailleurs vivement recommandé d'en manger."
      };
      var response2 = {
      "text": "Mes connaissances sont encore très nombreuses Souhaitez-vous savoir autre chose ?",
      "quick_replies": [
        {
         "content_type": "text",
         "title": "Les Aliments",
         "payload": "Aliments"
        },
        {
         "content_type": "text",
         "title": "Les Sucres",
         "payload": "les sucres"
        },
        {
          "content_type": "text",
          "title": "Retour Accueil",
          "payload": "RETOUR_ACCUEIL",
          "image_url": "https://mon-chatbot.com/nutribot2018/images/back.png"
                                },
        {
          "content_type": "text",
          "title": "Au revoir",
          "payload": "ByeByeBye",
          "image_url": "https://mon-chatbot.com/nutribot2018/images/exit.png"
                                }
                              ]
      };
      return fbMessage( recipientId, resp ).then( () => {
        return fbMessage( recipientId, response2 ).then( () => {} )
          .catch( ( err ) => {
            console.log( "Erreur queryScanSearch" + recipientId );
            console.error(
              'Oops! An error forwarding the response to',
              recipientId, ':', err.stack || err );
          } );

      } )
        .catch( ( err ) => {
          console.log( "Erreur queryScanSearch" + recipientId );
          console.error(
            'Oops! An error forwarding the response to',
            recipientId, ':', err.stack || err );
        } );

  },
  go_relance_aliments_from_fructose(entities,context,sessionId) {
    const recipientId = sessions[ sessionId ].fbid;
    var response_image = {
      "attachment":{
      "type":"image",
      "payload":{
        "url":"https://mon-chatbot.com/nutribot2018/images/illustrations/fructose.jpg"
      }
    }};
    return fbMessage( recipientId, response_image ).then( () => {
    var resp =  {
      "text": "*Recherche de la définition* Définition du fructose : Sucre que l'on trouve fréquemment dans les fruits et le miel."
    };
    var response2 = {
    "text": "Mes connaissances sont encore très nombreuses Souhaitez-vous savoir autre chose ?",
    "quick_replies": [
      {
       "content_type": "text",
       "title": "Les Aliments",
       "payload": "Aliments"
      },
      {
       "content_type": "text",
       "title": "Les Sucres",
       "payload": "les sucres"
      },
      {
        "content_type": "text",
        "title": "Retour Accueil",
        "payload": "RETOUR_ACCUEIL",
        "image_url": "https://mon-chatbot.com/nutribot2018/images/back.png"
                              },
      {
        "content_type": "text",
        "title": "Au revoir",
        "payload": "ByeByeBye",
        "image_url": "https://mon-chatbot.com/nutribot2018/images/exit.png"
                              }
                            ]
    };
    return fbMessage( recipientId, resp ).then( () => {
      return fbMessage( recipientId, response2 ).then( () => {} )
        .catch( ( err ) => {
          console.log( "Erreur queryScanSearch" + recipientId );
          console.error(
            'Oops! An error forwarding the response to',
            recipientId, ':', err.stack || err );
        } );

    } )
      .catch( ( err ) => {
        console.log( "Erreur queryScanSearch" + recipientId );
        console.error(
          'Oops! An error forwarding the response to',
          recipientId, ':', err.stack || err );
      } );
    } )
      .catch( ( err ) => {
        console.log( "Erreur queryScanSearch" + recipientId );
        console.error(
          'Oops! An error forwarding the response to',
          recipientId, ':', err.stack || err );
      } );
  },
  go_relance_aliments_from_sugar_canne(entities,context,sessionId) {
    const recipientId = sessions[ sessionId ].fbid;
    var response_image = {
      "attachment":{
      "type":"image",
      "payload":{
        "url":"https://mon-chatbot.com/nutribot2018/images/illustrations/canne.jpg"
      }
    }};
    var resp =  {
      "text": "Et bien le terme canne à sucre désigne un ensemble d'espèces de plantes de la famille des Poaceae et du genre Saccharum. Elles sont cultivées pour leurs tiges, dont on extrait du sucre."
    };
    return fbMessage( recipientId, response_image ).then( () => {
    var response2 = {
    "text": "Mes connaissances sont encore très nombreuses Souhaitez-vous savoir autre chose ?",
    "quick_replies": [
      {
       "content_type": "text",
       "title": "Les Aliments",
       "payload": "Aliments"
      },
      {
       "content_type": "text",
       "title": "Les Sucres",
       "payload": "les sucres"
      },
      {
        "content_type": "text",
        "title": "Retour Accueil",
        "payload": "RETOUR_ACCUEIL",
        "image_url": "https://mon-chatbot.com/nutribot2018/images/back.png"
                              },
      {
        "content_type": "text",
        "title": "Au revoir",
        "payload": "ByeByeBye",
        "image_url": "https://mon-chatbot.com/nutribot2018/images/exit.png"
                              }
                            ]
    };
    return fbMessage( recipientId, resp ).then( () => {
      return fbMessage( recipientId, response2 ).then( () => {} )
        .catch( ( err ) => {
          console.log( "Erreur queryScanSearch" + recipientId );
          console.error(
            'Oops! An error forwarding the response to',
            recipientId, ':', err.stack || err );
        } );

    } )
      .catch( ( err ) => {
        console.log( "Erreur queryScanSearch" + recipientId );
        console.error(
          'Oops! An error forwarding the response to',
          recipientId, ':', err.stack || err );
      } );
    } )
      .catch( ( err ) => {
        console.log( "Erreur queryScanSearch" + recipientId );
        console.error(
          'Oops! An error forwarding the response to',
          recipientId, ':', err.stack || err );
      } );
  },
  // fonction CAT_ALIMENTS
  go_aliments_alitransfo(entities,context,sessionId) {
    const recipientId = sessions[ sessionId ].fbid;
    var response2 = {
    "text": "En général un aliment se présente de différentes manières. Il peut être d'origine animale, végétale, fongique (parfois bactérienne ou minérale) ou bien chimique. Il sera ensuite consommé, mangé, dégusté par des êtres vivants à des fins énergétiques ou nutritionnelles.",
    "quick_replies": [
      {
       "content_type": "text",
       "title": "Composition",
       "payload": "Composition"
      },
      {
       "content_type": "text",
       "title": "Aliments transformés",
       "payload": "Aliments transformés"
     },
      {
        "content_type": "text",
        "title": "Retour Accueil",
        "payload": "RETOUR_ACCUEIL",
        "image_url": "https://mon-chatbot.com/nutribot2018/images/back.png"
                              },
      {
        "content_type": "text",
        "title": "Au revoir",
        "payload": "ByeByeBye",
        "image_url": "https://mon-chatbot.com/nutribot2018/images/exit.png"
                              }
                            ]
    };
    return fbMessage( recipientId, response2 ).then( () => {} )
      .catch( ( err ) => {
        console.log( "Erreur queryScanSearch" + recipientId );
        console.error(
          'Oops! An error forwarding the response to',
          recipientId, ':', err.stack || err );
      } );

  },
  go_alitransfo(entities,context,sessionId) {
    const recipientId = sessions[ sessionId ].fbid;
    var response2 = {
    "text": "Le sucre peut prendre plusieurs formes. Il est donc fréquent que vous, humains, en consommiez  sans le savoir. La plupart des sucres  sont dissimulés dans des aliments transformés. Une fois dans vos assiettes, vous ne les percevez donc plus comme des sucres.",
    "quick_replies": [
      {
       "content_type": "text",
       "title": "Les sucres",
       "payload": "Les sucres"
     },
      {
       "content_type": "text",
       "title": "Aliments transformés",
       "payload": "Aliments transformés"
     },
      {
        "content_type": "text",
        "title": "Retour Accueil",
        "payload": "RETOUR_ACCUEIL",
        "image_url": "https://mon-chatbot.com/nutribot2018/images/back.png"
                              },
      {
        "content_type": "text",
        "title": "Au revoir",
        "payload": "ByeByeBye",
        "image_url": "https://mon-chatbot.com/nutribot2018/images/exit.png"
                              }
                            ]
    };
    return fbMessage( recipientId, response2 ).then( () => {} )
      .catch( ( err ) => {
        console.log( "Erreur queryScanSearch" + recipientId );
        console.error(
          'Oops! An error forwarding the response to',
          recipientId, ':', err.stack || err );
      } );

  },
  go_additifs(entities,context,sessionId) {
    const recipientId = sessions[ sessionId ].fbid;
    var response2 = {
    "text": "Mon programme interne m'indique qu'un aliment transformé ou un aliment industriel est conditionné et transformé par l'industrie agro-alimentaire. Plus particulièrement à partir de produits agricoles comme les aliments simples (viande, légumes..) mais aussi à partir d'additifs alimentaires.",
    "quick_replies": [
      {
       "content_type": "text",
       "title": "Additifs alimentaires",
       "payload": "Additifs"
     },
      {
        "content_type": "text",
        "title": "Retour Accueil",
        "payload": "RETOUR_ACCUEIL",
        "image_url": "https://mon-chatbot.com/nutribot2018/images/back.png"
                              },
      {
        "content_type": "text",
        "title": "Au revoir",
        "payload": "ByeByeBye",
        "image_url": "https://mon-chatbot.com/nutribot2018/images/exit.png"
                              }
                            ]
    };
    return fbMessage( recipientId, response2 ).then( () => {} )
      .catch( ( err ) => {
        console.log( "Erreur queryScanSearch" + recipientId );
        console.error(
          'Oops! An error forwarding the response to',
          recipientId, ':', err.stack || err );
      } );

  },
  // fonction CAT_ADDITIFS
  go_amidon_glucides_from_les_sucres(entities,context,sessionId) {
    const recipientId = sessions[ sessionId ].fbid;
    var response2 = {
    "text": "Les sucres font partie des glucides. Ils représentent une part importante de notre alimentation, essentiellement sous forme d’amidon. D’où le conseil de manger du pain à chaque repas et au moins un plat de féculent par jour.",
    "quick_replies": [
      {
       "content_type": "text",
       "title": "Amidon",
       "payload": "Amidon"
      },
      {
       "content_type": "text",
       "title": "Glucides",
       "payload": "Glucides"
      },
      {
       "content_type": "text",
       "title": "Glucides complexes",
       "payload": "Glucides complexes"
      },
      {
        "content_type": "text",
        "title": "Retour Accueil",
        "payload": "RETOUR_ACCUEIL",
        "image_url": "https://mon-chatbot.com/nutribot2018/images/back.png"
                              },
      {
        "content_type": "text",
        "title": "Au revoir",
        "payload": "ByeByeBye",
        "image_url": "https://mon-chatbot.com/nutribot2018/images/exit.png"
                              }
                            ]
    };
    return fbMessage( recipientId, response2 ).then( () => {} )
      .catch( ( err ) => {
        console.log( "Erreur queryScanSearch" + recipientId );
        console.error(
          'Oops! An error forwarding the response to',
          recipientId, ':', err.stack || err );
      } );

  },
  go_amidon_glucides(entities,context,sessionId) {
    const recipientId = sessions[ sessionId ].fbid;
    var response2 = {
    "text": "On en trouve un peu partout. Les additifs alimentaires sont des produits, ajoutés par l'homme, aux denrées alimentaires commerciales destinés à l'alimentation humaine et/ou animale.",
    "quick_replies": [
      {
       "content_type": "text",
       "title": "Amidon",
       "payload": "Amidon"
      },
      {
       "content_type": "text",
       "title": "Glucides",
       "payload": "Glucides"
      },
      {
       "content_type": "text",
       "title": "Glucides complexes",
       "payload": "Glucides complexes"
      },
      {
        "content_type": "text",
        "title": "Retour Accueil",
        "payload": "RETOUR_ACCUEIL",
        "image_url": "https://mon-chatbot.com/nutribot2018/images/back.png"
                              },
      {
        "content_type": "text",
        "title": "Au revoir",
        "payload": "ByeByeBye",
        "image_url": "https://mon-chatbot.com/nutribot2018/images/exit.png"
                              }
                            ]
    };
    return fbMessage( recipientId, response2 ).then( () => {} )
      .catch( ( err ) => {
        console.log( "Erreur queryScanSearch" + recipientId );
        console.error(
          'Oops! An error forwarding the response to',
          recipientId, ':', err.stack || err );
      } );

  },
  go_glucides_glucomplexes(entities,context,sessionId) {
    const recipientId = sessions[ sessionId ].fbid;
    var response_image = {
      "attachment":{
      "type":"image",
      "payload":{
        "url":"https://mon-chatbot.com/nutribot2018/images/illustrations/amidon.gif"
      }
    }};
    return fbMessage( recipientId, response_image ).then( () => {
    var response2 = {
    "text": "L'amidon  est un glucide complexe  composé de chaînes de molécules glucoses. Par exemple les pommes de terre, les pâtes et aliments contenant du blé ,de riz, les légumes secs en contiennent.",
    "quick_replies": [
      {
       "content_type": "text",
       "title": "Glucides",
       "payload": "Glucides"
     },
     {
      "content_type": "text",
      "title": "Glucides complexes",
      "payload": "Glucides complexes"
     },
      {
        "content_type": "text",
        "title": "Retour Accueil",
        "payload": "RETOUR_ACCUEIL",
        "image_url": "https://mon-chatbot.com/nutribot2018/images/back.png"
                              },
      {
        "content_type": "text",
        "title": "Au revoir",
        "payload": "ByeByeBye",
        "image_url": "https://mon-chatbot.com/nutribot2018/images/exit.png"
                              }
                            ]
    };
      return fbMessage( recipientId, response2 ).then( () => {} )
        .catch( ( err ) => {
          console.log( "Erreur queryScanSearch" + recipientId );
          console.error(
            'Oops! An error forwarding the response to',
            recipientId, ':', err.stack || err );
        } );
    } )
      .catch( ( err ) => {
        console.log( "Erreur queryScanSearch" + recipientId );
        console.error(
          'Oops! An error forwarding the response to',
          recipientId, ':', err.stack || err );
      } );
  },
  go_relance_nutriments_from_glucomplexes(entities,context,sessionId) {
    const recipientId = sessions[ sessionId ].fbid;
    var response_image = {
      "attachment":{
      "type":"image",
      "payload":{
        "url":"https://mon-chatbot.com/nutribot2018/images/illustrations/complexes.jpg"
      }
    }};
    return fbMessage( recipientId, response_image ).then( () => {
      var resp =  {
        "text": "Malgré leur nom la réponse est simple ! Les glucides complexes sont constitués de plusieurs molécules de glucides simples et sont transformés en glucose au cours de la digestion. On les trouve dans le pain, les pâtes, le riz, les céréales, certains légumes frais ou encore les légumes secs."
      };
      var response2 = {
      "text": "Mon logiciel m'indique qu'il est temps de vous suggérer les sujets suivants :",
      "quick_replies": [
        {
         "content_type": "text",
         "title": "Les Nutriments",
         "payload": "Nutriments"
        },
        {
         "content_type": "text",
         "title": "Les Légumes secs",
         "payload": "Légumes secs"
        },
        {
          "content_type": "text",
          "title": "Retour Accueil",
          "payload": "RETOUR_ACCUEIL",
          "image_url": "https://mon-chatbot.com/nutribot2018/images/back.png"
                                },
        {
          "content_type": "text",
          "title": "Au revoir",
          "payload": "ByeByeBye",
          "image_url": "https://mon-chatbot.com/nutribot2018/images/exit.png"
                                }
                              ]
      };
      return fbMessage( recipientId, resp ).then( () => {
        return fbMessage( recipientId, response2 ).then( () => {} )
          .catch( ( err ) => {
            console.log( "Erreur queryScanSearch" + recipientId );
            console.error(
              'Oops! An error forwarding the response to',
              recipientId, ':', err.stack || err );
          } );

      } )
        .catch( ( err ) => {
          console.log( "Erreur queryScanSearch" + recipientId );
          console.error(
            'Oops! An error forwarding the response to',
            recipientId, ':', err.stack || err );
        } );

      } )
        .catch( ( err ) => {
          console.log( "Erreur queryScanSearch" + recipientId );
          console.error(
            'Oops! An error forwarding the response to',
            recipientId, ':', err.stack || err );
        } );

  },
  go_nutriments(entities,context,sessionId) {
    const recipientId = sessions[ sessionId ].fbid;
    var response_image = {
      "attachment":{
      "type":"image",
      "payload":{
        "url":"https://mon-chatbot.com/nutribot2018/images/illustrations/glucides.jpg"
      }
    }};
    return fbMessage( recipientId, response_image ).then( () => {
    var response2 = {
    "text": "Les glucides, plus communément appelés sucres, sont une source essentielle d'énergie pour l'organisme. Apportés via l'alimentation grâce à la destruction des aliments en nutriments par les enzymes digestives, ils finissent par être absorbés au niveau intestinal. ",
    "quick_replies": [
      {
       "content_type": "text",
       "title": "Les nutriments",
       "payload": "Nutriments"
     },
      {
        "content_type": "text",
        "title": "Retour Accueil",
        "payload": "RETOUR_ACCUEIL",
        "image_url": "https://mon-chatbot.com/nutribot2018/images/back.png"
                              },
      {
        "content_type": "text",
        "title": "Au revoir",
        "payload": "ByeByeBye",
        "image_url": "https://mon-chatbot.com/nutribot2018/images/exit.png"
                              }
                            ]
    };
    return fbMessage( recipientId, response2 ).then( () => {} )
      .catch( ( err ) => {
        console.log( "Erreur queryScanSearch" + recipientId );
        console.error(
          'Oops! An error forwarding the response to',
          recipientId, ':', err.stack || err );
      } );
    } )
      .catch( ( err ) => {
        console.log( "Erreur queryScanSearch" + recipientId );
        console.error(
          'Oops! An error forwarding the response to',
          recipientId, ':', err.stack || err );
      } );

  },
  // fonctions CAT_NUTRIMENTS
  go_leg_prot_vital(entities,context,sessionId) {
    const recipientId = sessions[ sessionId ].fbid;
    var response2 = {
    "text": "Les nutriments, (dit également éléments nutritifs) peuvent être vus les composants élémentaires contenus dans les aliments.",
    "quick_replies": [
      {
       "content_type": "text",
       "title": "Légumes secs",
       "payload": "Légumes secs"
      },
      {
       "content_type": "text",
       "title": "Les protéines",
       "payload": "Protéines"
      },
      {
       "content_type": "text",
       "title": "Produit vital",
       "payload": "Produit vital"
      },
      {
        "content_type": "text",
        "title": "Retour Accueil",
        "payload": "RETOUR_ACCUEIL",
        "image_url": "https://mon-chatbot.com/nutribot2018/images/back.png"
                              },
      {
        "content_type": "text",
        "title": "Au revoir",
        "payload": "ByeByeBye",
        "image_url": "https://mon-chatbot.com/nutribot2018/images/exit.png"
                              }
                            ]
    };
    return fbMessage( recipientId, response2 ).then( () => {} )
      .catch( ( err ) => {
        console.log( "Erreur queryScanSearch" + recipientId );
        console.error(
          'Oops! An error forwarding the response to',
          recipientId, ':', err.stack || err );
      } );

  },
  go_prot(entities,context,sessionId) {
    const recipientId = sessions[ sessionId ].fbid;
    var response_image = {
      "attachment":{
      "type":"image",
      "payload":{
        "url":"https://mon-chatbot.com/nutribot2018/images/illustrations/secs.jpg"
      }
    }};
    return fbMessage( recipientId, response_image ).then( () => {

    var response2 = {
    "text": "Les légumes secs sont riches en glucides (60% d’amidon) et en protéines (20%). Voici la liste des plus courants : Lentilles, Fèves, Haricots blancs, Haricots rouges , Flageolets, Pois cassés, Pois chiches, Soja, Petits pois. Mais vous devez sûrement vous demander ce que sont les protéines ?",
    "quick_replies": [
      {
       "content_type": "text",
       "title": "Les protéines",
       "payload": "Protéines"
     },
      {
        "content_type": "text",
        "title": "Retour Accueil",
        "payload": "RETOUR_ACCUEIL",
        "image_url": "https://mon-chatbot.com/nutribot2018/images/back.png"
                              },
      {
        "content_type": "text",
        "title": "Au revoir",
        "payload": "ByeByeBye",
        "image_url": "https://mon-chatbot.com/nutribot2018/images/exit.png"
                              }
                            ]
    };
    return fbMessage( recipientId, response2 ).then( () => {} )
      .catch( ( err ) => {
        console.log( "Erreur queryScanSearch" + recipientId );
        console.error(
          'Oops! An error forwarding the response to',
          recipientId, ':', err.stack || err );
      } );
    } )
      .catch( ( err ) => {
        console.log( "Erreur queryScanSearch" + recipientId );
        console.error(
          'Oops! An error forwarding the response to',
          recipientId, ':', err.stack || err );
      } );
  },
  go_relance_from_vital(entities,context,sessionId) {
    const recipientId = sessions[ sessionId ].fbid;
      var resp =  {
        "text": "Pour moi non, mais pour vous oui !"
      };
      var response2 = {
      "text": "Que diriez-vous de passer au thème de la diététique ?",
      "quick_replies": [

        {
         "content_type": "text",
         "title": "Morceau de sucre",
         "payload": "Morceau de sucre"
        },
        {
         "content_type": "text",
         "title": "Calorie ou Kcal",
         "payload": "Calorie ou Kcal"
        },
        {
         "content_type": "text",
         "title": "Sucre simple ou sucre rapide",
         "payload": "Sucre simple ou sucre rapide"
        },
        {
          "content_type": "text",
          "title": "Retour Accueil",
          "payload": "RETOUR_ACCUEIL",
          "image_url": "https://mon-chatbot.com/nutribot2018/images/back.png"
                                },
        {
          "content_type": "text",
          "title": "Au revoir",
          "payload": "ByeByeBye",
          "image_url": "https://mon-chatbot.com/nutribot2018/images/exit.png"
                                }
                              ]
      };
      return fbMessage( recipientId, resp ).then( () => {
        return fbMessage( recipientId, response2 ).then( () => {} )
          .catch( ( err ) => {
            console.log( "Erreur queryScanSearch" + recipientId );
            console.error(
              'Oops! An error forwarding the response to',
              recipientId, ':', err.stack || err );
          } );

      } )
        .catch( ( err ) => {
          console.log( "Erreur queryScanSearch" + recipientId );
          console.error(
            'Oops! An error forwarding the response to',
            recipientId, ':', err.stack || err );
        } );

  },
  go_vital(entities,context,sessionId) {
    const recipientId = sessions[ sessionId ].fbid;
    var response2 = {
    "text": "Et bien ce sont des molécules prenant la forme de chaînes jouant un rôle structurant entre le muscle et l'os. Elles influent également sur le fonctionnement imminutaire et le transport dans cellules dans l'organisme.",
    "quick_replies": [
      {
       "content_type": "text",
       "title": "Produit vital",
       "payload": "Produit vital"
     },
      {
        "content_type": "text",
        "title": "Retour Accueil",
        "payload": "RETOUR_ACCUEIL",
        "image_url": "https://mon-chatbot.com/nutribot2018/images/back.png"
                              },
      {
        "content_type": "text",
        "title": "Au revoir",
        "payload": "ByeByeBye",
        "image_url": "https://mon-chatbot.com/nutribot2018/images/exit.png"
                              }
                            ]
    };
    return fbMessage( recipientId, response2 ).then( () => {} )
      .catch( ( err ) => {
        console.log( "Erreur queryScanSearch" + recipientId );
        console.error(
          'Oops! An error forwarding the response to',
          recipientId, ':', err.stack || err );
      } );

  },
  // fonctions CAT_DIETETIQUE
  go_tout_diet(entities,context,sessionId) {
    const recipientId = sessions[ sessionId ].fbid;
    var response2 = {
    "text": "Nous voici maintenant dans la partie Diététique ! Que souhaitez-vous savoir ?",
    "quick_replies": [

      {
       "content_type": "text",
       "title": "Morceau de sucre",
       "payload": "Morceau de sucre"
      },
      {
       "content_type": "text",
       "title": "Calorie ou Kcal",
       "payload": "Calorie ou Kcal"
      },
      {
       "content_type": "text",
       "title": "Sucre simple ou sucre rapide",
       "payload": "Sucre simple ou sucre rapide"
      },
      {
       "content_type": "text",
       "title": "Index glycémique lent",
       "payload": "Index glycémique lent"
      },
      {
       "content_type": "text",
       "title": "Index glycémique rapide",
       "payload": "Index glycémique rapide"
      },
      {
       "content_type": "text",
       "title": "Glycémie",
       "payload": "Glycémie"
      },
      {
        "content_type": "text",
        "title": "Retour Accueil",
        "payload": "RETOUR_ACCUEIL",
        "image_url": "https://mon-chatbot.com/nutribot2018/images/back.png"
                              },
      {
        "content_type": "text",
        "title": "Au revoir",
        "payload": "ByeByeBye",
        "image_url": "https://mon-chatbot.com/nutribot2018/images/exit.png"
                              }
                            ]
    };
    return fbMessage( recipientId, response2 ).then( () => {} )
      .catch( ( err ) => {
        console.log( "Erreur queryScanSearch" + recipientId );
        console.error(
          'Oops! An error forwarding the response to',
          recipientId, ':', err.stack || err );
      } );

  },
  go_reste_from_allege(entities,context,sessionId) {
    const recipientId = sessions[ sessionId ].fbid;
    var response2 = {
    "text": "D'après mes données, il s'agit d'un produit sucré contenant au minimum 25% de sucre en moins que le produit de référence.",
    "quick_replies": [
      {
       "content_type": "text",
       "title": "Morceau de sucre",
       "payload": "Morceau de sucre"
      },
      {
       "content_type": "text",
       "title": "Calorie ou Kcal",
       "payload": "Calorie ou Kcal"
      },
      {
       "content_type": "text",
       "title": "Sucre simple ou sucre rapide",
       "payload": "Sucre simple ou sucre rapide"
      },
      {
       "content_type": "text",
       "title": "Index glycémique lent",
       "payload": "Index glycémique lent"
      },
      {
       "content_type": "text",
       "title": "Index glycémique rapide",
       "payload": "Index glycémique rapide"
      },
      {
       "content_type": "text",
       "title": "Glycémie",
       "payload": "Glycémie"
      },
      {
        "content_type": "text",
        "title": "Retour Accueil",
        "payload": "RETOUR_ACCUEIL",
        "image_url": "https://mon-chatbot.com/nutribot2018/images/back.png"
                              },
      {
        "content_type": "text",
        "title": "Au revoir",
        "payload": "ByeByeBye",
        "image_url": "https://mon-chatbot.com/nutribot2018/images/exit.png"
                              }
                            ]
    };
    return fbMessage( recipientId, response2 ).then( () => {} )
      .catch( ( err ) => {
        console.log( "Erreur queryScanSearch" + recipientId );
        console.error(
          'Oops! An error forwarding the response to',
          recipientId, ':', err.stack || err );
      } );

  },
  go_reste_from_morceau(entities,context,sessionId) {
    const recipientId = sessions[ sessionId ].fbid;
    var response2 = {
    "text": "*Initialisation de mon système de calcul en cours* Un morceau de sucre = 20 calories ou Kcal.",
    "quick_replies": [
      {
       "content_type": "text",
       "title": "Calorie ou Kcal",
       "payload": "Calorie ou Kcal"
      },
      {
       "content_type": "text",
       "title": "Sucre simple ou sucre rapide",
       "payload": "Sucre simple ou sucre rapide"
      },
      {
       "content_type": "text",
       "title": "Index glycémique lent",
       "payload": "Index glycémique lent"
      },
      {
       "content_type": "text",
       "title": "Index glycémique rapide",
       "payload": "Index glycémique rapide"
      },
      {
       "content_type": "text",
       "title": "Glycémie",
       "payload": "Glycémie"
      },
      {
        "content_type": "text",
        "title": "Retour Accueil",
        "payload": "RETOUR_ACCUEIL",
        "image_url": "https://mon-chatbot.com/nutribot2018/images/back.png"
                              },
      {
        "content_type": "text",
        "title": "Au revoir",
        "payload": "ByeByeBye",
        "image_url": "https://mon-chatbot.com/nutribot2018/images/exit.png"
                              }
                            ]
    };
    return fbMessage( recipientId, response2 ).then( () => {} )
      .catch( ( err ) => {
        console.log( "Erreur queryScanSearch" + recipientId );
        console.error(
          'Oops! An error forwarding the response to',
          recipientId, ':', err.stack || err );
      } );

  },
  go_reste_kcal(entities,context,sessionId) {
    const recipientId = sessions[ sessionId ].fbid;
    var response_image = {
      "attachment":{
      "type":"image",
      "payload":{
        "url":"https://mon-chatbot.com/nutribot2018/images/illustrations/kcal.gif"
      }
    }};
    return fbMessage( recipientId, response_image ).then( () => {
    var response2 = {
    "text": "La calorie est considérée comme une référence énergétique devant servir à mettre en place une alimentation équilibrée adaptée au fonctionnement de l'individu Elle est une unité  qui correspond à la quantité d'énergie nécessaire pour élever la température d'un gramme d'eau liquide de 1 °C.",
    "quick_replies": [
      {
       "content_type": "text",
       "title": "Sucre simple ou sucre rapide",
       "payload": "Sucre simple ou sucre rapide"
      },
      {
       "content_type": "text",
       "title": "Index glycémique lent",
       "payload": "Index glycémique lent"
      },
      {
       "content_type": "text",
       "title": "Index glycémique rapide",
       "payload": "Index glycémique rapide"
      },
      {
       "content_type": "text",
       "title": "Glycémie",
       "payload": "Glycémie"
      },
      {
        "content_type": "text",
        "title": "Retour Accueil",
        "payload": "RETOUR_ACCUEIL",
        "image_url": "https://mon-chatbot.com/nutribot2018/images/back.png"
                              },
      {
        "content_type": "text",
        "title": "Au revoir",
        "payload": "ByeByeBye",
        "image_url": "https://mon-chatbot.com/nutribot2018/images/exit.png"
                              }
                            ]
    };
    return fbMessage( recipientId, response2 ).then( () => {} )
      .catch( ( err ) => {
        console.log( "Erreur queryScanSearch" + recipientId );
        console.error(
          'Oops! An error forwarding the response to',
          recipientId, ':', err.stack || err );
      } );
    } )
      .catch( ( err ) => {
        console.log( "Erreur queryScanSearch" + recipientId );
        console.error(
          'Oops! An error forwarding the response to',
          recipientId, ':', err.stack || err );
      } );

  },
  go_reste_sucre_rapide_lent(entities,context,sessionId) {
    const recipientId = sessions[ sessionId ].fbid;
    var response2 = {
    "text": "Les sucres simples, ou sucre rapides ont une formule chimique sous forme  de chaines très courtes,  facilement et très rapidement assimilables par l'organisme, ils sont dits « sucres rapides », à « index glycémique élevé ». Les « sucres lents » sont au contraire à « faible index glycémique ».",
    "quick_replies": [
      {
       "content_type": "text",
       "title": "Index glycémique lent",
       "payload": "Index glycémique lent"
      },
      {
       "content_type": "text",
       "title": "Index glycémique rapide",
       "payload": "Index glycémique rapide"
      },
      {
       "content_type": "text",
       "title": "Glycémie",
       "payload": "Glycémie"
      },
      {
        "content_type": "text",
        "title": "Retour Accueil",
        "payload": "RETOUR_ACCUEIL",
        "image_url": "https://mon-chatbot.com/nutribot2018/images/back.png"
                              },
      {
        "content_type": "text",
        "title": "Au revoir",
        "payload": "ByeByeBye",
        "image_url": "https://mon-chatbot.com/nutribot2018/images/exit.png"
                              }
                            ]
    };
    return fbMessage( recipientId, response2 ).then( () => {} )
      .catch( ( err ) => {
        console.log( "Erreur queryScanSearch" + recipientId );
        console.error(
          'Oops! An error forwarding the response to',
          recipientId, ':', err.stack || err );
      } );

  },
  go_reste_index_lent(entities,context,sessionId) {
    const recipientId = sessions[ sessionId ].fbid;
    var response_image = {
      "attachment":{
      "type":"image",
      "payload":{
        "url":"https://mon-chatbot.com/nutribot2018/images/illustrations/index_glycemique.gif"
      }
    }};
    return fbMessage( recipientId, response_image ).then( () => {

    var response2 = {
    "text": "L'index glycémique lent indique que le  glucide absorbé met un délais relativement long pour élever la glycémie à la suite de son ingestion.",
    "quick_replies": [
      {
       "content_type": "text",
       "title": "Index glycémique rapide",
       "payload": "Index glycémique rapide"
      },
      {
       "content_type": "text",
       "title": "Glycémie",
       "payload": "Glycémie"
      },
      {
        "content_type": "text",
        "title": "Retour Accueil",
        "payload": "RETOUR_ACCUEIL",
        "image_url": "https://mon-chatbot.com/nutribot2018/images/back.png"
                              },
      {
        "content_type": "text",
        "title": "Au revoir",
        "payload": "ByeByeBye",
        "image_url": "https://mon-chatbot.com/nutribot2018/images/exit.png"
                              }
                            ]
    };
    return fbMessage( recipientId, response2 ).then( () => {} )
      .catch( ( err ) => {
        console.log( "Erreur queryScanSearch" + recipientId );
        console.error(
          'Oops! An error forwarding the response to',
          recipientId, ':', err.stack || err );
      } );
    })
      .catch( ( err ) => {
        console.log( "Erreur queryScanSearch" + recipientId );
        console.error(
          'Oops! An error forwarding the response to',
          recipientId, ':', err.stack || err );
      } );

  },
  go_reste_index_rapide(entities,context,sessionId) {
    const recipientId = sessions[ sessionId ].fbid;
    var response_image = {
      "attachment":{
      "type":"image",
      "payload":{
        "url":"https://mon-chatbot.com/nutribot2018/images/illustrations/index_glycemique.gif"
      }
    }};
    return fbMessage( recipientId, response_image ).then( () => {
    var response2 = {
    "text": "L'index glycémique élevé indique la capacité d'un glucide donné à élever rapidement la glycémie à la suite de son ingestion.",
    "quick_replies": [
      {
       "content_type": "text",
       "title": "Glycémie",
       "payload": "Glycémie"
      },
      {
        "content_type": "text",
        "title": "Retour Accueil",
        "payload": "RETOUR_ACCUEIL",
        "image_url": "https://mon-chatbot.com/nutribot2018/images/back.png"
                              },
      {
        "content_type": "text",
        "title": "Au revoir",
        "payload": "ByeByeBye",
        "image_url": "https://mon-chatbot.com/nutribot2018/images/exit.png"
                              }
                            ]
    };
    return fbMessage( recipientId, response2 ).then( () => {} )
      .catch( ( err ) => {
        console.log( "Erreur queryScanSearch" + recipientId );
        console.error(
          'Oops! An error forwarding the response to',
          recipientId, ':', err.stack || err );
      } );
    } )
      .catch( ( err ) => {
        console.log( "Erreur queryScanSearch" + recipientId );
        console.error(
          'Oops! An error forwarding the response to',
          recipientId, ':', err.stack || err );
      } );

  },
  go_relance_from_glycemie(entities,context,sessionId) {
    const recipientId = sessions[ sessionId ].fbid;
      var resp =  {
        "text": "Je m'attendais à cette question ! On peut dire que la glycémie représente le taux de glucose contenu  par litre de sang dans le corps humains."
      };
      var response2 = {
      "text": "Pour continuer à vous guider dans les meilleures conditions, souhaitez-vous poursuivre la conversation sur le thème de l'organisme ?",
      "quick_replies": [
        {
         "content_type": "text",
         "title": "Trop de sucre",
         "payload": "Trop de sucre"
        },
        {
         "content_type": "text",
         "title": "Combien de sucre",
         "payload": "Combien de sucre"
        },
        {
         "content_type": "text",
         "title": "Combien de fruits",
         "payload": "Combien de fruits"
        },
        {
         "content_type": "text",
         "title": "Alimentation équilibrée",
         "payload": "Alimentation équilibrée"
        },
        {
          "content_type": "text",
          "title": "Retour Accueil",
          "payload": "RETOUR_ACCUEIL",
          "image_url": "https://mon-chatbot.com/nutribot2018/images/back.png"
                                },
        {
          "content_type": "text",
          "title": "Au revoir",
          "payload": "ByeByeBye",
          "image_url": "https://mon-chatbot.com/nutribot2018/images/exit.png"
                                }
                              ]
      };
      return fbMessage( recipientId, resp ).then( () => {
        return fbMessage( recipientId, response2 ).then( () => {} )
          .catch( ( err ) => {
            console.log( "Erreur queryScanSearch" + recipientId );
            console.error(
              'Oops! An error forwarding the response to',
              recipientId, ':', err.stack || err );
          } );

      } )
        .catch( ( err ) => {
          console.log( "Erreur queryScanSearch" + recipientId );
          console.error(
            'Oops! An error forwarding the response to',
            recipientId, ':', err.stack || err );
        } );

  },
  // CAT_ORGANISME
  go_tout_organisme(entities,context,sessionId) {
    const recipientId = sessions[ sessionId ].fbid;
    var response2 = {
    "text": "Intéréssons nous maintenant à l'organisme ! Que souhaitez-vous connaître ?",
    "quick_replies": [
      {
       "content_type": "text",
       "title": "Insuline",
       "payload": "Insuline"
      },
      {
       "content_type": "text",
       "title": "Combien de sucre",
       "payload": "Combien de sucre"
      },
      {
       "content_type": "text",
       "title": "Combien de fruits",
       "payload": "Combien de fruits"
      },
      {
       "content_type": "text",
       "title": "Apports",
       "payload": "Apports"
      },
      {
       "content_type": "text",
       "title": "Besoins",
       "payload": "Besoins"
      },
      {
       "content_type": "text",
       "title": "Alimentation équilibrée",
       "payload": "Alimentation équilibrée"
      },
      {
       "content_type": "text",
       "title": "Pancréas",
       "payload": "Pancréas"
      },
      {
        "content_type": "text",
        "title": "Retour Accueil",
        "payload": "RETOUR_ACCUEIL",
        "image_url": "https://mon-chatbot.com/nutribot2018/images/back.png"
                              },
      {
        "content_type": "text",
        "title": "Au revoir",
        "payload": "ByeByeBye",
        "image_url": "https://mon-chatbot.com/nutribot2018/images/exit.png"
                              }
                            ]
    };
    return fbMessage( recipientId, response2 ).then( () => {} )
      .catch( ( err ) => {
        console.log( "Erreur queryScanSearch" + recipientId );
        console.error(
          'Oops! An error forwarding the response to',
          recipientId, ':', err.stack || err );
      } );

  },
  go_reste_from_toomuchsugar(entities,context,sessionId) {
    const recipientId = sessions[ sessionId ].fbid;
    var response2 = {
    "text": "Le sucre est bon pour la santé mais cela dépend de combien vous en manger. Car en trop grande quantité ça favorise la production d'insuline.  Cela entraine le stockage du glucose dans les cellules. Quand celui-ci n'est pas éliminé via un effort physique, il se transforme alors en matière grasse.",
    "quick_replies": [
      {
       "content_type": "text",
       "title": "Insuline",
       "payload": "Insuline"
      },
      {
       "content_type": "text",
       "title": "Combien de sucre",
       "payload": "Combien de sucre"
      },
      {
       "content_type": "text",
       "title": "Combien de fruits",
       "payload": "Combien de fruits"
      },
      {
       "content_type": "text",
       "title": "Apports",
       "payload": "Apports"
      },
      {
       "content_type": "text",
       "title": "Besoins",
       "payload": "Besoins"
      },
      {
       "content_type": "text",
       "title": "Alimentation équilibrée",
       "payload": "Alimentation équilibrée"
      },
      {
       "content_type": "text",
       "title": "Pancréas",
       "payload": "Pancréas"
      },
      {
        "content_type": "text",
        "title": "Retour Accueil",
        "payload": "RETOUR_ACCUEIL",
        "image_url": "https://mon-chatbot.com/nutribot2018/images/back.png"
                              },
      {
        "content_type": "text",
        "title": "Au revoir",
        "payload": "ByeByeBye",
        "image_url": "https://mon-chatbot.com/nutribot2018/images/exit.png"
                              }
                            ]
    };
    return fbMessage( recipientId, response2 ).then( () => {} )
      .catch( ( err ) => {
        console.log( "Erreur queryScanSearch" + recipientId );
        console.error(
          'Oops! An error forwarding the response to',
          recipientId, ':', err.stack || err );
      } );

  },
  go_reste_from_insuline(entities,context,sessionId) {
    const recipientId = sessions[ sessionId ].fbid;
    var response2 = {
    "text": "Du latin 'insula', l'insuline est une hormone sécrétée par le pancréas. Personnellement mes circuits fonctionnent très bien sans, mais pour vous elle permet la bonne assimilation du sucre par l'organisme. Ce qui s'avère indispensable !",
    "quick_replies": [
      {
       "content_type": "text",
       "title": "Combien de sucre",
       "payload": "Combien de sucre"
      },
      {
       "content_type": "text",
       "title": "Combien de fruits",
       "payload": "Combien de fruits"
      },
      {
       "content_type": "text",
       "title": "Apports",
       "payload": "Apports"
      },
      {
       "content_type": "text",
       "title": "Besoins",
       "payload": "Besoins"
      },
      {
       "content_type": "text",
       "title": "Alimentation équilibrée",
       "payload": "Alimentation équilibrée"
      },
      {
       "content_type": "text",
       "title": "Pancréas",
       "payload": "Pancréas"
      },
      {
        "content_type": "text",
        "title": "Retour Accueil",
        "payload": "RETOUR_ACCUEIL",
        "image_url": "https://mon-chatbot.com/nutribot2018/images/back.png"
                              },
      {
        "content_type": "text",
        "title": "Au revoir",
        "payload": "ByeByeBye",
        "image_url": "https://mon-chatbot.com/nutribot2018/images/exit.png"
                              }
                            ]
    };
    return fbMessage( recipientId, response2 ).then( () => {} )
      .catch( ( err ) => {
        console.log( "Erreur queryScanSearch" + recipientId );
        console.error(
          'Oops! An error forwarding the response to',
          recipientId, ':', err.stack || err );
      } );

  },
  go_reste_from_howmuchsugar(entities,context,sessionId) {
    const recipientId = sessions[ sessionId ].fbid;
    var response2 = {
    "text": "*Initialisation de mon système de calcul* Résultat obtenu : pas plus de 5% de sucres simples par jour sont vivement conseillés.",
    "quick_replies": [
      {
       "content_type": "text",
       "title": "Combien de fruits",
       "payload": "Combien de fruits"
      },
      {
       "content_type": "text",
       "title": "Apports",
       "payload": "Apports"
      },
      {
       "content_type": "text",
       "title": "Besoins",
       "payload": "Besoins"
      },
      {
       "content_type": "text",
       "title": "Alimentation équilibrée",
       "payload": "Alimentation équilibrée"
      },
      {
       "content_type": "text",
       "title": "Pancréas",
       "payload": "Pancréas"
      },
      {
        "content_type": "text",
        "title": "Retour Accueil",
        "payload": "RETOUR_ACCUEIL",
        "image_url": "https://mon-chatbot.com/nutribot2018/images/back.png"
                              },
      {
        "content_type": "text",
        "title": "Au revoir",
        "payload": "ByeByeBye",
        "image_url": "https://mon-chatbot.com/nutribot2018/images/exit.png"
                              }
                            ]
    };
    return fbMessage( recipientId, response2 ).then( () => {} )
      .catch( ( err ) => {
        console.log( "Erreur queryScanSearch" + recipientId );
        console.error(
          'Oops! An error forwarding the response to',
          recipientId, ':', err.stack || err );
      } );

  },
  go_reste_from_howmuchfruits(entities,context,sessionId) {
    const recipientId = sessions[ sessionId ].fbid;
    var response2 = {
    "text": "Dans votre quotidien, 1 à 2 fruits par jour couvrent les apports journaliers conseillés de glucides pour votre corps d'être humains.",
    "quick_replies": [
      {
       "content_type": "text",
       "title": "Apports",
       "payload": "Apports"
      },
      {
       "content_type": "text",
       "title": "Besoins",
       "payload": "Besoins"
      },
      {
       "content_type": "text",
       "title": "Alimentation équilibrée",
       "payload": "Alimentation équilibrée"
      },
      {
       "content_type": "text",
       "title": "Pancréas",
       "payload": "Pancréas"
      },
      {
        "content_type": "text",
        "title": "Retour Accueil",
        "payload": "RETOUR_ACCUEIL",
        "image_url": "https://mon-chatbot.com/nutribot2018/images/back.png"
                              },
      {
        "content_type": "text",
        "title": "Au revoir",
        "payload": "ByeByeBye",
        "image_url": "https://mon-chatbot.com/nutribot2018/images/exit.png"
                              }
                            ]
    };
    return fbMessage( recipientId, response2 ).then( () => {} )
      .catch( ( err ) => {
        console.log( "Erreur queryScanSearch" + recipientId );
        console.error(
          'Oops! An error forwarding the response to',
          recipientId, ':', err.stack || err );
      } );

  },
  go_reste_from_apports(entities,context,sessionId) {
    const recipientId = sessions[ sessionId ].fbid;
    var response2 = {
    "text": "Ils sont les apports conseillés des sous-populations aux besoins nutritionnels homogènes ",
    "quick_replies": [
      {
       "content_type": "text",
       "title": "Besoins",
       "payload": "Besoins"
      },
      {
       "content_type": "text",
       "title": "Alimentation équilibrée",
       "payload": "Alimentation équilibrée"
      },
      {
       "content_type": "text",
       "title": "Pancréas",
       "payload": "Pancréas"
      },
      {
        "content_type": "text",
        "title": "Retour Accueil",
        "payload": "RETOUR_ACCUEIL",
        "image_url": "https://mon-chatbot.com/nutribot2018/images/back.png"
                              },
      {
        "content_type": "text",
        "title": "Au revoir",
        "payload": "ByeByeBye",
        "image_url": "https://mon-chatbot.com/nutribot2018/images/exit.png"
                              }
                            ]
    };
    return fbMessage( recipientId, response2 ).then( () => {} )
      .catch( ( err ) => {
        console.log( "Erreur queryScanSearch" + recipientId );
        console.error(
          'Oops! An error forwarding the response to',
          recipientId, ':', err.stack || err );
      } );

  },
  go_reste_from_besoins(entities,context,sessionId) {
    const recipientId = sessions[ sessionId ].fbid;
    var response2 = {
    "text": "Chez les êtres vivants, comme vous et moi, heu.. non pas moi, les besoins en calories et en nutriments sont absolument nécessaires pour la bonne santé de l'organisme.",
    "quick_replies": [
      {
       "content_type": "text",
       "title": "Alimentation équilibrée",
       "payload": "Alimentation équilibrée"
      },
      {
       "content_type": "text",
       "title": "Pancréas",
       "payload": "Pancréas"
      },
      {
        "content_type": "text",
        "title": "Retour Accueil",
        "payload": "RETOUR_ACCUEIL",
        "image_url": "https://mon-chatbot.com/nutribot2018/images/back.png"
                              },
      {
        "content_type": "text",
        "title": "Au revoir",
        "payload": "ByeByeBye",
        "image_url": "https://mon-chatbot.com/nutribot2018/images/exit.png"
                              }
                            ]
    };
    return fbMessage( recipientId, response2 ).then( () => {} )
      .catch( ( err ) => {
        console.log( "Erreur queryScanSearch" + recipientId );
        console.error(
          'Oops! An error forwarding the response to',
          recipientId, ':', err.stack || err );
      } );

  },
  go_reste_from_alimentation_equ(entities,context,sessionId) {
    const recipientId = sessions[ sessionId ].fbid;
    var liste =  {
          "attachment": {
              "type": "template",
              "payload": {
                  "template_type": "list",
                  "elements": [
                      {
                          "title": "La consommation",
                          "image_url": "http://www.mangerbouger.fr/var/inpes_site/storage/images/pnns/guides-et-documents/fiches-conseils/limitez-votre-consommation-de-sucre-tout-en-restant-gourmand/101760-4-fre-FR/Limitez-votre-consommation-de-sucre-tout-en-restant-gourmand_push_download.jpg",
                          "subtitle": "Limitez votre consommation de sucre tout en restant gourmand",
                          "default_action": {
                              "type": "web_url",
                              "url": "http://www.mangerbouger.fr/PNNS/Guides-et-documents"
                          },
                          "buttons": [
                              {
                                  "title": "Télécharger",
                                  "type": "web_url",
                                  "url": "http://www.mangerbouger.fr/content/download/3825/101761/version/6/file/1176%20%281%29.pdf"
                              }
                          ]
                      },
                      {
                          "title": "Le sel",
                          "image_url": "http://www.mangerbouger.fr/var/inpes_site/storage/images/pnns/guides-et-documents/fiches-conseils/le-sel-comment-limiter-sa-consommation/101756-4-fre-FR/Le-sel-comment-limiter-sa-consommation_push_download.jpg",
                          "subtitle": "Le sel : comment limiter sa consommation ?",
                          "default_action": {
                              "type": "web_url",
                              "url": "http://www.mangerbouger.fr/PNNS/Guides-et-documents"
                          },
                          "buttons": [
                              {
                                  "title": "Télécharger",
                                  "type": "web_url",
                                  "url": "http://www.mangerbouger.fr/content/download/3824/101757/version/5/file/1181%20%281%29.pdf"
                              }
                          ]
                      },
                      {
                          "title": "Activités",
                          "image_url": "http://www.mangerbouger.fr/var/inpes_site/storage/images/pnns/guides-et-documents/fiches-conseils/bouger-chaque-jour-c-est-bon-pour-la-sante/101748-7-fre-FR/Bouger-chaque-jour-c-est-bon-pour-la-sante_push_download.jpg",
                          "subtitle": "Bouger chaque jour, c’est bon pour la santé",
                          "default_action": {
                              "type": "web_url",
                              "url": "http://www.mangerbouger.fr/PNNS/Guides-et-documents"
                          },
                          "buttons": [
                              {
                                  "title": "Télécharger",
                                  "type": "web_url",
                                  "url": "http://www.mangerbouger.fr/content/download/3822/101749/version/8/file/1177.pdf"
                              }
                          ]
                      },
                      {
                          "title": "Fruits & Légumes",
                          "image_url": "http://www.mangerbouger.fr/var/inpes_site/storage/images/pnns/guides-et-documents/fiches-conseils/au-moins-5-fruits-et-legumes-par-jour-sans-effort/101740-5-fre-FR/Au-moins-5-fruits-et-legumes-par-jour-sans-effort_push_download.jpg",
                          "subtitle": "Au moins 5 fruits et légumes par jour sans effort",
                          "default_action": {
                              "type": "web_url",
                              "url": "http://www.mangerbouger.fr/PNNS/Guides-et-documents"
                          },
                          "buttons": [
                              {
                                  "title": "Télécharger",
                                  "type": "web_url",
                                  "url": "http://www.mangerbouger.fr/content/download/3820/101741/version/6/file/1115.pdf"
                              }
                          ]
                      }
                  ]
              }
          }

    }
    var response2 = {
    "text": "Une alimentation équilibrée, c'est savoir varier et équilibrer ses prises alimentaires dans la journée pour que les  apports soient équivalents aux dépenses caloriques.",
    "quick_replies": [
      {
       "content_type": "text",
       "title": "Pancréas",
       "payload": "Pancréas"
      },
      {
        "content_type": "text",
        "title": "Retour Accueil",
        "payload": "RETOUR_ACCUEIL",
        "image_url": "https://mon-chatbot.com/nutribot2018/images/back.png"
                              },
      {
        "content_type": "text",
        "title": "Au revoir",
        "payload": "ByeByeBye",
        "image_url": "https://mon-chatbot.com/nutribot2018/images/exit.png"
                              }
                            ]
    };
    return fbMessage( recipientId, liste ).then( () => {
      return fbMessage( recipientId, response2 ).then( () => {} )
        .catch( ( err ) => {
          console.log( "Erreur queryScanSearch" + recipientId );
          console.error(
            'Oops! An error forwarding the response to',
            recipientId, ':', err.stack || err );
        } );

    } )
      .catch( ( err ) => {
        console.log( "Erreur queryScanSearch" + recipientId );
        console.error(
          'Oops! An error forwarding the response to',
          recipientId, ':', err.stack || err );
      } );

  },
  go_reste_from_pancreas(entities,context,sessionId) {
    const recipientId = sessions[ sessionId ].fbid;
    var response_image = {
      "attachment":{
      "type":"image",
      "payload":{
        "url":"https://mon-chatbot.com/nutribot2018/images/illustrations/pancreas.jpg"
      }
    }};
    return fbMessage( recipientId, response_image ).then( () => {

      var resp =  {
        "text": "Le corps humains est constitué de 78 organes parmis lesquelles se trouve le pancréas. Il possède un rôle très important, il s'agit d'une glande dont la fonction est de deréguler la glycémie sanguine.",
      };
    var response2 = {
    "text": "Que diriez-vous maintenant si nous prenions en photo un code-barre d'un de vos produit alimentaire préféré afin d'en connaître les informations nutritionnelles & le NutriScore ?",
    "quick_replies": [
      {
       "content_type": "text",
       "title": "Scan produits",
       "payload": "LACATEGORIERECHERCHE",
       "image_url": "https://mon-chatbot.com/nutribot2018/images/picto-codebar.png"
      },
      {
        "content_type": "text",
        "title": "Retour Accueil",
        "payload": "RETOUR_ACCUEIL",
        "image_url": "https://mon-chatbot.com/nutribot2018/images/back.png"
                              },
      {
        "content_type": "text",
        "title": "Au revoir",
        "payload": "ByeByeBye",
        "image_url": "https://mon-chatbot.com/nutribot2018/images/exit.png"
                              }
                            ]
    };
    return fbMessage( recipientId, resp ).then( () => {
      return fbMessage( recipientId, response2 ).then( () => {} )
        .catch( ( err ) => {
          console.log( "Erreur queryScanSearch" + recipientId );
          console.error(
            'Oops! An error forwarding the response to',
            recipientId, ':', err.stack || err );
        } );

    } )
      .catch( ( err ) => {
        console.log( "Erreur queryScanSearch" + recipientId );
        console.error(
          'Oops! An error forwarding the response to',
          recipientId, ':', err.stack || err );
      } );
    } )
      .catch( ( err ) => {
        console.log( "Erreur queryScanSearch" + recipientId );
        console.error(
          'Oops! An error forwarding the response to',
          recipientId, ':', err.stack || err );
      } );

  },

};
// --------------------- CHOISIR LA PROCHAINE ACTION (LOGIQUE) EN FCT DES ENTITES OU INTENTIONS------------
function choisir_prochaine_action( sessionId, context, entities ) {
  // ACTION PAR DEFAUT CAR AUCUNE ENTITE DETECTEE
  if(Object.keys(entities).length === 0 && entities.constructor === Object) {
    // Affichage message par defaut : Je n'ai pas compris votre message !
  }
  // PAS DINTENTION DETECTEE
  if(!entities.intent) {

  }
  // IL Y A UNE INTENTION DETECTEE : DECOUVRONS LAQUELLE AVEC UN SWITCH
  else {
    switch ( entities.intent && entities.intent[ 0 ].value ) {
      case "Bonjour":
        var msg = {
          "attachment": {
            "type": "template",
            "payload": {
              "template_type": "generic",
              "elements": [
                          {
                            "title": "NutriScore",
                            "image_url": "https://mon-chatbot.com/nutribot2018/images/nutriscore-good.jpg",
                            "subtitle": "Recherchez ici un produit alimentaire et ses équivalents plus sains.",
                            "buttons": [
                              {
                                "type": "postback",
                                "title": "❓ Informations",
                                "payload": "INFOS_SUR_LE_NUTRI"
                              },

                              {
                                "type": "postback",
                                "title": "🔍 Rechercher",
                                "payload": "PRODUIT_PLUS_SAIN"
                              },
                              {
                                "type": "postback",
                                "title": "🍏 Produit + sain",
                                "payload": "ALTERNATIVE_BEST"
                              }

                     ]
                   },
                   {
                  "title": "Le sucre",
                  "image_url": "https://mon-chatbot.com/nutribot2018/images/sucre.jpg",
                  "subtitle": "Connaissez-vous réellement le Sucre ? Percez ici tous ses mystères !",
                  "buttons": [
                    {
                      "type": "postback",
                      "title": "En Savoir +",
                      "payload": "CAT_SUCRE"
                   }
                 ]
               },
                {
                  "title": "Les aliments",
                  "image_url": "https://mon-chatbot.com/nutribot2018/images/aliments.jpg",
                  "subtitle": "Quels aliments contiennent du sucre ? Vous allez être surpris !",
                  "buttons": [
                    {
                      "type": "postback",
                      "title": "En Savoir +",
                      "payload": "CAT_ALIMENTS"
                  }
                ]
              },
                {
                  "title": "Les additifs",
                  "image_url": "https://mon-chatbot.com/nutribot2018/images/additifs.jpg",
                  "subtitle": "C'est quoi un additif ? Où les trouvent-on ?",
                  "buttons": [
                    {
                      "type": "postback",
                      "title": "En Savoir +",
                      "payload": "CAT_ADDITIFS"
                 }
               ]
             },
                {
                  "title": "Les nutriments",
                  "image_url": "https://mon-chatbot.com/nutribot2018/images/nutriments.jpg",
                  "subtitle": "Eléments indispensables à l'Homme ! Découvrez tous les secrets des nutriments.",
                  "buttons": [
                    {
                      "type": "postback",
                      "title": "En Savoir +",
                      "payload": "CAT_NUTRIMENTS"
                }
              ]
            },
                {
                  "title": "La diététique",
                  "image_url": "https://mon-chatbot.com/nutribot2018/images/diet.jpg",
                  "subtitle": "Découvrez ici tous mes conseils concernant la diététique !",
                  "buttons": [
                    {
                      "type": "postback",
                      "title": "En Savoir +",
                      "payload": "CAT_DIETETIQUE"
               }
             ]
           },
                {
                  "title": "L'organisme",
                  "image_url": "https://mon-chatbot.com/nutribot2018/images/organisme.jpg",
                  "subtitle": "Ici vous découvrirez tous les secrets concernant votre corps et le sucre !",
                  "buttons": [
                    {
                      "type": "postback",
                      "title": "En Savoir +",
                      "payload": "CAT_ORGANISME"
              }
            ]
          }


          ]
            }
          }
        };
        var response_text = {
          "text": "PS : Si vous voulez je peux vous proposer des sujets pour débuter :"
        };
        actions.reset_context( entities, context, sessionId ).then(function() {
          actions.getUserName( sessionId, context, entities ).then( function() {
            actions.envoyer_message_text( sessionId, context, entities, 'Bonjour '+context.userName+'. Enchanté de faire votre connaissance. Je suis NutriBot, un robot destiné à vous donner des informations sur le sucre, la nutrition et tout particulièrement le Nutriscore : le logo nutritionel de référence permettant de choisir les aliments pour mieux se nourrir au quotidien.').then(function() {
              actions.timer(entities, context, sessionId, temps_entre_chaque_message).then(function() {
                actions.envoyer_message_text(sessionId, context, entities, "PS : Si vous voulez je peux vous proposer des sujets pour débuter :").then(function() {
                  actions.timer(entities, context, sessionId, temps_entre_chaque_message).then(function() {
                    actions.envoyer_message_bouton_generique(sessionId, context, entities, msg);
                  })
                })
              })
            })
          })
        })
        break;
      case "RETOUR_ACCUEIL":
        // Revenir à l'accueil et changer de texte
        actions.reset_context( entities,context,sessionId ).then(function() {
          actions.choixCategories_retour( sessionId,context );
        })
        break;
      case "Dire_aurevoir":
        actions.getUserName( sessionId, context, entities ).then( function() {
          actions.envoyer_message_text( sessionId, context, entities, "A bientôt "+context.userName+" ! N'hésitez-pas à revenir nous voir très vite !").then(function() {
              actions.envoyer_message_image( sessionId, context, entities, "https://mon-chatbot.com/img/byebye.jpg" );
          })
        })
        break;
      case "FIRST_USE_OF_TUTO_OK":
        actions.getUserName( sessionId, context, entities ).then( function() {
          actions.envoyer_message_text( sessionId, context, entities, "Bonjour "+context.userName+". Je suis NutriBot ! Voici un petit peu d'aide concernant mon fonctionnement !").then(function() {
            actions.timer(entities, context, sessionId, temps_entre_chaque_message).then(function() {
              actions.afficher_tuto( sessionId,context );
            })
          })
        })
        break;
      case "Thanks":
        actions.remerciements(entities,context,sessionId);
        break;
      case "GO_TO_MENU_DEMARRER":
        actions.reset_context( entities,context,sessionId ).then(function() {
          actions.choixCategories( sessionId,context );
        })
        break;
      case "SCAN":
        actions.ExplicationScan(sessionId,context);
        break;

      case "MANUELLE":
        actions.envoyer_message_text( sessionId, context, entities, "Quelle est la marque, le nom ou bien le type de produit que vous souhaitez rechercher ? (Ex : Nutella, Pain de mie, croissant, etc). Je vous écoute :");
        // then mettre dans le context qu'on est dans recherche manuelle
        break;
          // SIMPLE
      case "Combien de sucre":
        actions.go_reste_from_howmuchsugar(entities,context,sessionId);
        break;
      case "CAT_NUTRIMENTS":
        actions.go_leg_prot_vital(entities,context,sessionId);
        break;
      case "Insuline":
        actions.go_reste_from_insuline(entities,context,sessionId);
        break;
      case "Betterave":
        actions.go_legume(entities,context,sessionId);
        break;
      case "CAT_ORGANISME":
        actions.go_tout_organisme(entities,context,sessionId);
        break;
      case "Glucides":
        actions.go_nutriments(entities,context,sessionId);
        break;

        case "Saccharose":
          actions.go_glucose_canne_betterave_fructose(entities,context,sessionId);
          break;
      case "CAT_SUCRE":
        actions.go_saccharose(entities,context,sessionId);
        break;
      case "Glucides complexes":
        actions.go_relance_nutriments_from_glucomplexes(entities,context,sessionId);
        break;
      case "Index glycémique lent":
        actions.go_reste_index_lent(entities,context,sessionId);
        break;
      case "Aliments transformés":
        actions.go_additifs(entities,context,sessionId);
        break;
      case "Produit allégé en sucre":
        actions.go_reste_from_allege(entities,context,sessionId);
        break;
      case "Nutriments":
        actions.go_leg_prot_vital(entities,context,sessionId);
        break;
      case "Besoins":
        actions.go_reste_from_besoins(entities,context,sessionId);
        break;
      case "Canne à sucre":
        actions.go_relance_aliments_from_sugar_canne(entities,context,sessionId);
        break;
      case "Les sucres":
        actions.go_amidon_glucides_from_les_sucres(entities,context,sessionId);
        break;
      case "CAT_DIETETIQUE":
        actions.go_tout_diet(entities,context,sessionId);
        break;
      case "Combien de fruits":
        actions.go_reste_from_howmuchfruits(entities,context,sessionId);
        break;
      case "Fructose":
        actions.go_relance_aliments_from_fructose(entities,context,sessionId);
        break;
      case "Légumes secs":
        actions.go_prot(entities,context,sessionId);
        break;
      case "ASTUCE":
        actions.astuces(entities,context,sessionId);
        break;
      case "Index glycémique rapide":
        actions.go_reste_index_rapide(entities,context,sessionId);
        break;
      case "Apports":
        actions.go_reste_from_apports(entities,context,sessionId);
        break;
      case "Aliments":
        actions.go_aliments_alitransfo(entities,context,sessionId);
        break;
      case "Produit vital":
        actions.go_relance_from_vital(entities,context,sessionId);
        break;
      case "Trop de sucre":
        actions.go_reste_from_toomuchsugar(entities,context,sessionId);
        break;
      case "Calorie ou Kcal":
        actions.go_reste_kcal(entities,context,sessionId);
        break;
      case "Sucre simple ou sucre rapide":
        actions.go_reste_sucre_rapide_lent(entities,context,sessionId);
        break;
      case "CAT_ADDITIFS":
        actions.go_amidon_glucides(entities,context,sessionId);
        break;
      case "Amidon":
        actions.go_glucides_glucomplexes(entities,context,sessionId);
        break;
      case "Protéines":
        actions.go_vital(entities,context,sessionId);
        break;
      case "Légume":
        actions.go_relance_aliments_from_legume(entities,context,sessionId);
        break;
      case "Pancréas":
        actions.go_reste_from_pancreas(entities,context,sessionId);
        break;
      case "Alimentation équilibrée":
        actions.go_reste_from_alimentation_equ(entities,context,sessionId);
        break;
      case "Glucose":
        actions.go_relance(entities,context,sessionId);
        break;
      case "Morceau de sucre":
        actions.go_reste_from_morceau(entities,context,sessionId);
        break;
      case "Composition":
        actions.go_alitransfo(entities,context,sessionId);
        break;
      case "Additifs":
        actions.go_amidon_glucides(entities,context,sessionId);
        break;
      case "CAT_ALIMENTS":
        actions.go_aliments_alitransfo(entities,context,sessionId);
        break;
      // RESTE COMPLEXE
      case "PRODUIT_PLUS_SAIN":
        var element = {
          "attachment":{
            "type":"template",
            "payload":{
              "template_type":"button",
              "text":"Utilisez le formulaire ci-dessous et obtenez toutes les informations nécessaires au sujet d'un produit alimentaire ou bien scannez directement un code barre.",
              "buttons":[
                {
                  "type":"web_url",
                  "messenger_extensions": true,
                  "url":"https://mon-chatbot.com/nutribot2018/recherche.html",
                  "title":"Rechercher"
                },
                {
                  "type":"postback",
                  "title":"Scanner",
                  "payload":"SCANSCANSCAN"
                }
              ]
            }
          }
        };
        sessions[sessionId].recherche = 'normale';
        actions.envoyer_message_bouton_generique( sessionId, context, entities, element);
        break;
      case "ALTERNATIVE_BEST":
        var element = {
          "attachment":{
            "type":"template",
            "payload":{
              "template_type":"button",
              "text":"Recherchez ici un produit alimentaire et ses équivalents plus sains.",
              "buttons":[
                {
                  "type":"web_url",
                  "messenger_extensions": true,
                  "url":"https://mon-chatbot.com/nutribot2018/recherche.html",
                  "title":"Rechercher"
                }
              ]
            }
          }
        };
        sessions[sessionId].recherche = 'autre';
        actions.envoyer_message_bouton_generique( sessionId, context, entities, element);
        break;
      case "Rechercher_un_produit":
          actions.queryManuelleSearch2(entities,context,sessionId);
          break;
      case "INFOS_SUR_LE_NUTRI":
        actions.afficher_infos_nutriscore(entities,context,sessionId);
        break;
      case "SCANSCANSCAN":
        actions.afficher_infos_nutriscore(entities,context,sessionId);
        break;
      case "AstuceAstuce":
        actions.astuces( sessionId,context );
        break;
      case "ByeByeBye":
        actions.byebye( sessionId,context );
        break;

      case "GENESE":
        actions.go_relance_from_glycemie(entities, context, sessionId);
        break;
      case "Glycémie":
        actions.go_relance_from_glycemie(entities, context, sessionId);
        break;
      case "RECHERCHE":
        actions.go_relance_from_glycemie(entities, context, sessionId);
        break;

      case "SPECIFICSPECIFIC":
        actions.go_relance_from_glycemie(entities, context, sessionId);
        break;
      case "Insultes":
        actions.go_relance_from_glycemie(entities, context, sessionId);
        break;
      case "Sucre":
        actions.go_relance_from_glycemie(entities, context, sessionId);
        break;

      case "TAPER":
        actions.go_relance_from_glycemie(entities, context, sessionId);
        break;
      case "AUTRE_AUTRE_AUTRE":
        actions.go_relance_from_glycemie(entities, context, sessionId);
        break;
    };
  }
};
// --------------------- FONCTION POUR AFFICHER LA METEO EN FCT DE LA LAT & LNG ------------
// --------------------- LE SERVEUR WEB ------------
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
  if (req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === "my_voice_is_my_password_verify_me") { // remplir ici à la place de xxxx le meme mot de passe que FB_VERIFY_TOKEN
    res.send(req.query['hub.challenge']);
  } else {
    res.sendStatus(400);
  }
});

function callPrivateReply(messageData,comment_id) {
  request({
    uri: 'https://graph.facebook.com/v2.9/'+comment_id+'/private_replies',
    qs: { access_token: encodeURIComponent(FB_PAGE_TOKEN)},
    method: 'POST',
    json: messageData
}, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
    } else {
      console.error("Failed calling Send API", response.statusCode, response.statusMessage, body.error);
    }
  });
}


// ------------------------- LE WEBHOOK / GESTION DES EVENEMENTS ------------------------
app.post('/webhook', (req, res) => {
  const data = req.body;
  if (data.object === 'page') {
    data.entry.forEach(entry => {

      // gestion des posts
      // gerer ici les commentaires sur les posts
      if(entry.hasOwnProperty('changes')){
              entry.changes.forEach(function(changes){
                // filtrer ici par Hastag
                if(changes.field=="feed" && changes.value.item=="comment" && changes.value.verb=="add"){
                  var messageData = {
                      message: "coucou j'ai lu ton post :) Que puis-je faire pour toi ?"
                    };
                    callPrivateReply(messageData,changes.value.comment_id);
                }
              });
      }
      // finish

    // gerer ici le Primary / Secondary receiver
    if(entry.hasOwnProperty('standby')){
          entry.standby.forEach(function(standby){
            // faire des trucs ici
              console.log("STANDYBY TRUC TRUC");
              console.log(JSON.stringify(entry.standby));
            });
    }
    else {

    if(entry.hasOwnProperty('messaging')){
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
            // envoyer à Wit.ai ici
            var sender = event.sender.id;
            clearTimeout(timer);
            findOrCreateSession(sender)
              .then(function(sessionId) {

                if(event.message.attachments[0] && event.message.attachments[0].type != 'image') {
                  console.log(JSON.stringify(event.message.attachments));
                  var txt = event.message.attachments[0].title;
                  var code =  txt.replace('Code :', '');
                  sessions[sessionId].context.code = code;
                  console.log('le code est'+sessions[sessionId].context.code);
                  wit.message(event.message.attachments[0].title, sessions[sessionId].context).then(({
                    entities
                  }) => {
                    choisir_prochaine_action( sessionId, sessions[
                      sessionId ].context, entities );
                    console.log( 'Yay, on a une response de Wit.ai : ' + JSON.stringify(
                      entities ) );
                  }).catch(console.error);
                } else {
                  console.log(JSON.stringify(event.message));

                    const recipientId = sessions[ sessionId ].fbid;
                    var response4 = "typing_on";
                    fbMessage3( recipientId, response4 ).then( () => {
                      console.log( "okay typing_on " + recipientId );
                    } ).catch( ( err ) => {
                      console.log( "Erreur typing_on" + recipientId );
                    } );

                    Quagga.decodeSingle({
                      src: event.message.attachments[0].payload.url,
                      numOfWorkers: 0,  // Needs to be 0 when used within node
                      decoder: {
                          readers: ["ean_reader"] // List of active readers
                      },
                      locate : true
                      }, function(result) {
                      //console.log(result);
                    //  if(typeof result.codeResult !== 'undefined' && result.codeResult ) {

                          // requete
                          requestify.get(
                            'http://www.arcateste.com/nutribot/requetes/queryScanSearch.php', {
                              params: {
                                result : JSON.stringify(result)
                              }
                            } ).then( function( response ) {
                            console.log( 'cest le retour de queryScanSearch' + response.body );
                            if ( recipientId ) {
                              var response = response.body;
                              return fbMessage( recipientId, response ).then( () => {
                                var count = Object.keys(response).length;
                                console.log("LE COMPTE"+count);

                                if(count == 128) {
                                  console.log( "okay queryScanSearch " + recipientId );
                                  var response4a = "typing_off";
                                  fbMessage3( recipientId, response4a ).then( () => {
                                    console.log( "okay typing_off " + recipientId );
                                    var response2 = {
                                      "text": "Vous pouvez consulter les astuces pour bien scanner ou bien rechercher manuellement le produit ! Que souhaitez-vous faire ?",
                                      "quick_replies": [
                                        {
                                          "content_type": "text",
                                          "title": "Astuces",
                                          "payload": "AstuceAstuce",
                                          "image_url": "http://arcateste.com/nutribot/images/tips.png"
                                        },
                                        {
                                          "content_type":"text",
                                          "title":"Recherche manuelle",
                                          "payload":"PRODUIT_PLUS_SAIN",
                                          "image_url":"https://mon-chatbot.com/nutribot2018/images/clavier.png"
                                        },
                                        {
                                          "content_type": "text",
                                          "title": "Retour Accueil",
                                          "payload": "RETOUR_ACCUEIL",
                                          "image_url": "http://arcateste.com/nutribot/images/back.png"
                                        },
                                        {
                                          "content_type": "text",
                                          "title": "Au revoir",
                                          "payload": "ByeByeBye",
                                          "image_url": "http://arcateste.com/nutribot/images/exit.png"
                                        }
                                                              ]
                                    };
                                    return fbMessage( recipientId, response2 ).then( () => {} )
                                      .catch( ( err ) => {
                                        console.log( "Erreur queryScanSearch" + recipientId );
                                        console.error(
                                          'Oops! An error forwarding the response to',
                                          recipientId, ':', err.stack || err );
                                      } );
                                  } ).catch( ( err ) => {
                                    console.log( "Erreur typing_off" + recipientId );
                                    console.error( 'Oops! An error forwarding the typing_on to',
                                      recipientId, ':', err.stack || err );
                                  } );
                                }
                                else {
                                  console.log( "okay queryScanSearch " + recipientId );
                                  var response4a = "typing_off";
                                  fbMessage3( recipientId, response4a ).then( () => {
                                    console.log( "okay typing_off " + recipientId );
                                    var response2 = {
                                      "text": "N'hésitez pas à m'envoyer de nouveau vos codes-barre ! Que souhaitez-vous faire ?",
                                      "quick_replies": [
                                        {
                                          "content_type": "text",
                                          "title": "Retour Accueil",
                                          "payload": "RETOUR_ACCUEIL",
                                          "image_url": "http://arcateste.com/nutribot/images/back.png"
                                                                },
                                        {
                                          "content_type": "text",
                                          "title": "Au revoir",
                                          "payload": "ByeByeBye",
                                          "image_url": "http://arcateste.com/nutribot/images/exit.png"
                                                                }
                                                              ]
                                    };
                                    return fbMessage( recipientId, response2 ).then( () => {} )
                                      .catch( ( err ) => {
                                        console.log( "Erreur queryScanSearch" + recipientId );
                                        console.error(
                                          'Oops! An error forwarding the response to',
                                          recipientId, ':', err.stack || err );
                                      } );
                                  } ).catch( ( err ) => {
                                    console.log( "Erreur typing_off" + recipientId );
                                    console.error( 'Oops! An error forwarding the typing_on to',
                                      recipientId, ':', err.stack || err );
                                  } );
                                }

                              } ).catch( ( err ) => {
                                var response22 = {
                                  "text": "Une erreur s'est produite ! Souhaitez-vous recommencer ?",
                                  "quick_replies": [
                                    {
                                      "content_type": "text",
                                      "title": "Oui",
                                      "payload": "RETOUR_ACCUEIL"
                                                },
                                    {
                                      "content_type": "text",
                                      "title": "Non merci !",
                                      "payload": "ByeByeBye"
                                                }
                                              ]
                                };
                                return fbMessage( recipientId, response22 ).then( () => {
                                  console.log( "okay Erreur queryScanSearch " + recipientId );
                                } ).catch( ( err ) => {
                                  console.log( "Erreur queryScanSearch" + recipientId );
                                  console.error( 'Oops! An error forwarding the response to',
                                    recipientId, ':', err.stack || err );
                                } );
                                console.log( "Erreur queryScanSearch" + recipientId );
                                console.error( 'Oops! An error forwarding the response to',
                                  recipientId, ':', err.stack || err );
                              } );
                            } else {
                              console.error( 'Oops! Couldn\'t find user for session:', sessionId );
                              return Promise.resolve()
                            }
                          } ).fail( function( response ) {
                            console.log( 'ERROR DE REQUETE' + response.getCode() ); // Some error code such as, for example, 404
                          } );
                  });
              }
            });
          }
          // --------------------------- MESSAGE QUICK_REPLIES --------------------
          else if (hasValue(event.message, "text") && hasValue(event.message, "quick_reply")) {
            // envoyer à Wit.ai ici
            var sender = event.sender.id;
            clearTimeout(timer);
            findOrCreateSession(sender)
              .then(function(sessionId) {
              wit.message( quick_reply.payload, sessions[ sessionId ].context )
               .then( ( {
                 entities
               } ) => {
                 choisir_prochaine_action( sessionId, sessions[
                   sessionId ].context, entities );
                 console.log( 'Yay, on a une response de Wit.ai : ' + JSON.stringify(
                   entities ) );
               } )
               .catch( console.error );
            });
          }
          // ----------------------------- MESSAGE TEXT ---------------------------
          else if (hasValue(event.message, "text")) {
            // envoyer à Wit.ai ici
            var sender = event.sender.id;
            clearTimeout(timer);
            findOrCreateSession(sender)
              .then(function(sessionId) {
                wit.message(text, sessions[sessionId].context)
                  .then(
                    ({
                      entities
                    }) => {
                      choisir_prochaine_action(sessionId, sessions[sessionId].context, entities);
                      console.log('Yay, on a une response de Wit.ai : ' + JSON.stringify(entities));
                    })
                  .catch(console.error);
              });
          }
          // ----------------------------------------------------------------------------
          else {
            // envoyer à Wit.ai ici
            clearTimeout(timer);

          }
        }
        // ----------------------------------------------------------------------------
        else if (event.postback && event.postback.payload) {
          var sender = event.sender.id;
          clearTimeout(timer);
          findOrCreateSession(sender)
            .then(function(sessionId) {
            wit.message( event.postback.payload, sessions[ sessionId ].context )
             .then( ( {
               entities
             } ) => {
               choisir_prochaine_action( sessionId, sessions[
                 sessionId ].context, entities );
               console.log( 'Yay, on a une response de Wit.ai : ' + JSON.stringify(
                 entities ) );
             } )
             .catch( console.error );
          });
        }
        // ----------------------------------------------------------------------------
        else {
          console.log('received event : ', JSON.stringify(event));
        }
      });
    } // fin entry.hasOwnProperty('messaging')

    }


    });
  }
  res.sendStatus(200);
});
// ----------------- VERIFICATION SIGNATURE -----------------------
function verifyRequestSignature(req, res, buf) {
  var signature = req.headers["x-hub-signature"];
  if (!signature) {
    console.error("Couldn't validate the signature.");
  } else {
    var elements = signature.split('=');
    var method = elements[0];
    var signatureHash = elements[1];
    var expectedHash = crypto.createHmac('sha1', FB_APP_SECRET)
      .update(buf)
      .digest('hex');
    if (signatureHash != expectedHash) {
      throw new Error("Couldn't validate the request signature.");
    }
  }
}
app.listen(PORT);
console.log('Listening on :' + PORT + '...');
