// ------------------------- LE WEBHOOK / GESTION DES EVENEMENTS ------------------------
app.post('/webhook', (req, res) => {
	const data = req.body;
	if (data.object === 'page') {
		data.entry.forEach(entry => {
			if (entry.hasOwnProperty('changes')) {
				entry.changes.forEach(function(changes) {
					// filtrer ici par Hastag
					if (changes.field == "feed" && changes.value.item == "comment" && changes.value.verb == "add") {
						// filtrer ici le contenu message et si c'est le bon, afficher la réponse
						// decouper la phrase
						var str = changes.value.message;
						var substrings = ['fissurée','percée','huileux','cassée','fuit','fuite','capsule','déverssée','déversée','ouverte', 'orangé', 'gras', 'tâchée', 'orange'];
						var yourstring = str; // the string to check against
						length = substrings.length;
						var is_in = false;
						while(length--) {
						   if (yourstring.indexOf(substrings[length])!=-1) {
						       // one of the substrings is in yourstring
									 is_in = true;
						   }
						}
						if (is_in == true) {
						//  console.log('FEED INFOS'+JSON.stringify(entry.changes));
							var messageData = {
								message: "Découvrez Anabelle, le Chatbot de Naturactive !"
							};
							callPrivateReply(messageData, changes.value.comment_id);
						}
						else {
						  console.log("ce n'est pas le bon message auquel je dois repondre");
						}

					}
				});
			}
			else if (entry.hasOwnProperty('messaging'))  {
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
													"url": "https://botdesign.net/Naturactive/form-vigilance.html",
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
												"url": "https://botdesign.net/Naturactive/form-vigilance.html",
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
													"url": "https://botdesign.net/Naturactive/form-vigilance.html",
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
													"url": "https://botdesign.net/Naturactive/form-vigilance.html",
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
											"url": "https://botdesign.net/Naturactive/form-vigilance.html",
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
			}
		});
	}
	res.sendStatus(200);
});
// ----------------- VERIFICATION SIGNATURE -----------------------
