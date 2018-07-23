var express = require('express');
var bodyparser = require('body-parser');
var CryptoJS = require("crypto-js");
var basicAuth = require('express-basic-auth');
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
const WIT_TOKEN = "GFCCLDNESPMYPZD6F5CU4W2SKR7Q45HT";
const wit = new Wit({
  accessToken: WIT_TOKEN,
  actions,
  logger: new log.Logger(log.INFO)
});
// FIN DE WIT.AI
const PORT = process.env.PORT || 5000;
var app = express();

function base64_encode(string) {
  var words = CryptoJS.enc.Utf8.parse(string);
  var base64 = CryptoJS.enc.Base64.stringify(words);
  return base64;
}

function base64_decode(string) {
  var words = CryptoJS.enc.Base64.parse(string);
  var textString = words.toString(CryptoJS.enc.Utf8);
  return textString;
}
// {"id":"123456789", "bot_id":"2","authentification":{"login":"bWF0aGlldQ==","password":"bW90X2RlX3Bhc3NlX3Rlc3Q="},"message":"Q2VjaSBlc3QgdW4gbWVzc2FnZSBkZSB0ZXN0"}
var actions = {};
app.use(express.json());
app.use(function(err, req, res, next) {
  res.send(500, { status: 500, message: 'internal error', type: 'internal' });
})
app.use(basicAuth({
  users: { 'admin': 'secret_infinity' },
  unauthorizedResponse: getUnauthorizedResponse
}))

function getUnauthorizedResponse(req) {
  return req.auth ? ('Login/Mot de passe ' + req.auth.user + ':' + req.auth.password + ' rejetés') :
    'Pas de Login/Mot de passe fourni'
}
// https://intense-escarpment-15219.herokuapp.com/messages
app.post('/messages', function(req, res) {
  var aleatoire = Math.floor(Math.random() * 100);
  console.log("Le body : "+JSON.stringify(req.body));
  var id = req.body.id,
    bot_id = req.body.bot_id,
    login = req.body.authentication.login,
    password = req.body.authentication.password,
    message = req.body.message;
    var message_en_clair = base64_decode(message);
    if(req.body.extras && req.body.extras.buttons) {
      var buttons = req.body.extras;
      console.log("Le button cliqué : "+JSON.stringify(req.body.extras.buttons[0].value));
      var message_en_clair = base64_decode(req.body.extras.buttons[0].value);
    }
  wit.message(message_en_clair, '').then(({
    entities
  }) => {
    console.log('envoyé : '+message_en_clair);
    console.log('entities : ' +JSON.stringify(entities));
    if (entities.actions_du_bot && entities.actions_du_bot[0].confidence >= 0.75) {
      switch (entities.actions_du_bot && entities.actions_du_bot[0].value) {
        case "Dire_Bonjour":
          var message_retour = base64_encode("👋 Bonjour utilisateur " + id);
          var reponse = {
            "id": id,
            "code": '200',
            "result": "SUCCESS",
            "message": message_retour
          };
          break;
        case "Carte_Mutuelle":
          var message_retour = base64_encode("Voici les dernières cartes de mutuelles à mettre à jour");
          var reponse = {
            "id": id,
            "code": '200',
            "result": "SUCCESS",
            "message": message_retour
          };
          break;
        case "Oui_femme_mariee":
          var message_retour = base64_encode("Ok clic sur Oui_femme_mariee");
          var reponse = {
            "id": id,
            "code": '200',
            "result": "SUCCESS",
            "message": message_retour
          };
          break;
          case "Oui_femme_mariee_value":
            var message_retour = base64_encode("Ok clic sur Oui_femme_mariee_value");
            var reponse = {
              "id": id,
              "code": '200',
              "result": "SUCCESS",
              "message": message_retour
            };
            break;
       case "Non_femme_mariee":
          var message_retour = base64_encode("Ok clic sur Non_femme_mariee");
          var reponse = {
            "id": id,
            "code": '200',
            "result": "SUCCESS",
            "message": message_retour
          };
          break;
        case "Dire_AuRevoir":
          var message_retour = base64_encode("Au revoir utilisateur " + id);
          var extras = {
            "buttons": [{
                "id" : "id_Oui_femme_mariee",
                "name" : base64_encode("Oui"),
                "response" : base64_encode("response_Oui"),
                "value" : base64_encode("Oui_femme_mariee")
            },
            {
                "id" : "id_Non_femme_mariee",
                "name" : base64_encode("Non"),
                "response" : base64_encode("Non"),
                "value" : base64_encode("Non_femme_mariee")
            }]
          };
          var reponse = {
            "id": id,
            "code": '200',
            "result": "SUCCESS",
            "message": message_retour,
            "extras" : extras
          };
          break;
        default:
          var message_retour = base64_encode("message alétoire par défaut non détecté par Wit renvoyé vers Infinity. (capable de detecter uniquement Bonjour / Au revoir pour le moment)"
          );
          var reponse = {
            "id": id,
            "code": '200',
            "result": "SUCCESS",
            "message": message_retour
          };
          break;
      }
    } else {
      var message_retour = base64_encode("message alétoire non détecté par Wit renvoyé vers Infinity. (capable de detecter uniquement Bonjour / Au revoir pour le moment)"
      );
      var reponse = {
        "id": id,
        "code": '200',
        "result": "SUCCESS",
        "message": message_retour
      };
    }
    res.json(reponse);
  }).catch(console.error);
});
app.listen(PORT);
console.log('Listening on :' + PORT + '...');
