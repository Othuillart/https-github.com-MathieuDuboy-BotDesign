// Modules
var express = require('express');
var bodyparser = require('body-parser');
var CryptoJS = require("crypto-js");
var basicAuth = require('express-basic-auth');
var firebase = require('firebase');
var fonctions = require('./js/fonctions.js');
var witai_infos = require('./js/wit.js');
var firebase_infos = require('./js/firebase.js');

// WIT.AI
let Wit = null;
let log = null;
try {
  Wit = require('../').Wit;
  log = require('../').log;
} catch (e) {
  Wit = require('node-wit').Wit;
  log = require('node-wit').log;
}
const PORT = process.env.PORT || 5000;
var app = express();
var actions = {};
app.use(express.json());
app.use(function(err, req, res, next) {
  res.send(500, { status: 500, message: 'internal error', type: 'internal' });
})
app.use(basicAuth({
  users: { 'admin': 'secret_infinity' },
  unauthorizedResponse: fonctions.getUnauthorizedResponse
}))

app.post('/messages', function(req, res) {
  console.log(JSON.stringify(req.body));

  var id_user_on_infinity = req.body.id,
    bot_id = req.body.bot_id,
    login = req.body.authentication.login,
    password = req.body.authentication.password,
    message = req.body.message;

    if(req.body.extras && req.body.extras.name) {
      var extras_value = req.body.extras.name;
      console.log("value_button"+extras_value);
      var message_en_clair = fonctions.base64_decode(message);
      var value_en_clair = fonctions.base64_decode(extras_value);
      console.log("value_button_clair"+message_en_clair);
      var a_envoyer_wit = value_en_clair;
    }
    else {
      var message_en_clair = fonctions.base64_decode(message);
      var value_en_clair = fonctions.base64_decode(message);
      var a_envoyer_wit = message_en_clair;
    }

  // Initialisation des bonnes variables
  const wit = new Wit({
    accessToken: witai_infos[bot_id].token,
    actions,
    logger: new log.Logger(log.INFO)
  });
  // ajout du bon fichier de logique
  var logique = require('./logiques/logique_' + bot_id + '.js');
  fonctions.findOrCreateSession(id_user_on_infinity, bot_id).then(function(sessionId) {
    console.log(sessionId);
    console.log("a_envoyer_wit : "+a_envoyer_wit);

    // si c'est une quickreplie, on envoie la valeur de name, sinon on envoie le message_en_clair

    wit.message(a_envoyer_wit, '').then(({
      entities
    }) => {
      // fonction de logique
      var lasession = fonctions.lasession;
      var ref = lasession[sessionId].chemin;
      var lakey = lasession[sessionId].keyid_accounts;
      var keyid_fil = ref.child('fil').push().key;
      console.log("entities dans index.js = "+JSON.stringify(entities));
      fonctions.stockage_message(bot_id, id_user_on_infinity, message_en_clair, lakey, keyid_fil, sessionId);
      console.log("what_is_next()");
      console.log("tjours entities dans index.js = "+JSON.stringify(entities));
      console.log("Le Context actuel avant what_is_next : "+JSON.stringify(lasession[sessionId].context["question_actuelle"]));
      if(lasession[sessionId].context["question_actuelle"] == 'histoire_allergie_medicament_detail_1' || lasession[sessionId].context["question_actuelle"] == 'histoire_allergie_medicament_detail_2' || lasession[sessionId].context["question_actuelle"] == 'histoire_allergie_medicament_detail_3') {
        logique.liste_medicaments_allergie(message_en_clair, entities, id_user_on_infinity, sessionId).then(function(retour) {
          console.log("Le Context actuel liste_medicaments_allergie: "+JSON.stringify(lasession[sessionId].context["question_actuelle"]));
          console.log("Le retour liste_medicaments_allergie: "+JSON.stringify(retour.reponse));
          res.json(retour.reponse);
        })
      }else if(lasession[sessionId].context["question_actuelle"] == 'histoire_traitement_en_cours') {
        logique.liste_medicaments(message_en_clair, entities, id_user_on_infinity, sessionId).then(function(retour) {
          console.log("Le Context actuel liste_medicaments: "+JSON.stringify(lasession[sessionId].context["question_actuelle"]));
          console.log("Le retour liste_medicaments: "+JSON.stringify(retour.reponse));
          res.json(retour.reponse);
        })
      }
      else {
        logique.what_is_next(message_en_clair, entities, id_user_on_infinity, sessionId).then(function(retour) {
          console.log("Le Context actuel : "+JSON.stringify(lasession[sessionId].context["question_actuelle"]));
          console.log("Le retour : "+JSON.stringify(retour.reponse));
          res.json(retour.reponse);
        })
      }

    }).catch(console.error);
  })
});
app.listen(PORT);
console.log('Listening on :' + PORT + '...');
