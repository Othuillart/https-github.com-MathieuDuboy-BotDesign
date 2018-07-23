var CryptoJS = require("crypto-js");
var sessions = require('./../index.js');
const firebase = require('firebase');
var firebase_infos = require('./firebase.js');
var witai_infos = require('./wit.js');
var requestify = require('requestify');

let Wit = null;
let log = null;
try {
  Wit = require('../').Wit;
  log = require('../').log;
} catch (e) {
  Wit = require('node-wit').Wit;
  log = require('node-wit').log;
}


const lasession = {};
module.exports = {
  base64_encode: function(string) {
    var words = CryptoJS.enc.Utf8.parse(string);
    var base64 = CryptoJS.enc.Base64.stringify(words);
    return base64;
  },
  base64_decode: function(string) {
    var words = CryptoJS.enc.Base64.parse(string);
    var textString = words.toString(CryptoJS.enc.Utf8);
    return textString;
  },
  getUnauthorizedResponse: function(req) {
    return req.auth ? ('Login/Mot de passe ' + req.auth.user + ':' + req.auth.password +
      ' rejetés') : 'Pas de Login/Mot de passe fourni'
  },
  findOrCreateSession: function(id_user_on_infinity, bot_id) {
    return new Promise((resolve, reject) => {
      let sessionId;
      Object.keys(lasession).forEach(k => {
        if (lasession[k].id_user_on_infinity === id_user_on_infinity) {
          sessionId = k;
          console.log("jai deja la session" + sessionId);
          var leref = firebase.database().ref();
          console.log("leref" + leref);
          lasession[k].chemin = leref;
          resolve(sessionId);
        }
      });
      if (!sessionId) {
        sessionId = new Date().toISOString();
        lasession[sessionId] = {
          id_user_on_infinity: id_user_on_infinity,
          context: {}
        };
        if (!firebase.apps.length) {
          firebase.initializeApp(firebase_infos[bot_id].config);
          var leref = firebase.database().ref();
          lasession[sessionId].chemin = leref;
          console.log("Bot id : " + bot_id);
          // verifier si un accout existe ou pas
          var userz = firebase.database()
      		.ref()
      		.child("accounts")
      		.orderByChild("id_user_on_infinity")
      		.equalTo(id_user_on_infinity)
      		.once("value")
      		.then(function(snapshot)  {
            var exists = (snapshot.val() !== null);
            if (exists)  {
              console.log("l'utilisateur "+id_user_on_infinity+" existe déja");
              resolve(sessionId);
            }else {
              var keyid_accounts = leref.child('accounts').push().key;
              leref.child('accounts/' + keyid_accounts).set({ "oui": true, id_user_on_infinity: id_user_on_infinity })
                .then(function() {
                  lasession[sessionId].keyid_accounts = keyid_accounts;
                  resolve(sessionId);
                }).catch(function(error) {
                  console.log('erreur Création de compte : ' + error);
                });
            }
          }).catch((error) => {
      			console.log("Erreur from firebase Check if user exist ou pas");
      		});
        } else {
          //
          var leref = firebase.database().ref();
          lasession[sessionId].chemin = leref;
          // Partie a supprmer en PROD
          console.log("Bot id du else : " + bot_id);
          // verifier si un accout existe ou pas
          var userz = firebase.database()
      		.ref()
      		.child("accounts")
      		.orderByChild("id_user_on_infinity")
      		.equalTo(id_user_on_infinity)
      		.once("value")
      		.then(function(snapshot)  {
            var exists = (snapshot.val() !== null);
            if (exists)  {
              console.log("l'utilisateur "+id_user_on_infinity+" existe déja");
              resolve(sessionId);
            }else {
              var keyid_accounts = leref.child('accounts').push().key;
              leref.child('accounts/' + keyid_accounts).set({ "oui": true, id_user_on_infinity: id_user_on_infinity })
                .then(function() {
                  lasession[sessionId].keyid_accounts = keyid_accounts;
                  resolve(sessionId);
                }).catch(function(error) {
                  console.log('erreur Création de compte : ' + error);
                });
            }
          }).catch((error) => {
      			console.log("Erreur from firebase Check if user exist ou pas");
      		});
          // Partie a supprmer en PROD
          resolve(sessionId);
        }
      }
    });
  },
  stockage_message: function(bot_id, id_user_on_infinity, message_en_clair, lakey, keyid_fil, sessionId)  {
    var ref = lasession[sessionId].chemin;
    ref.child('fil/' + keyid_fil).set({ date_ajout: Date.now(), bot_id : bot_id, id_user_on_infinity: id_user_on_infinity,
      message: message_en_clair }).then(function() {
      ref.child('accounts/' + lakey + '/fil/' + keyid_fil).set(true).catch(
        function(error) {
          console.log('erreur 4 : ' + error);
        });
    }).catch(function(error) {
      console.log('erreur 3 : ' + error);
    });
  },
  update_variables_firebase: function(key_de_la_variable, valeur_de_la_variable, sessionId)  {
    var ref = lasession[sessionId].chemin;
    var keyid_accounts = lasession[sessionId].keyid_accounts
    ref.child('accounts/' + keyid_accounts+ '/variables/'+key_de_la_variable).set(valeur_de_la_variable).then(function() {
      console.log('Update OK');
    }).catch(function(error) {
      console.log('erreur 4 : ' + error);
    });
  },
  stockage_context(key_de_la_variable, valeur_de_la_variable, sessionId) {
    lasession[sessionId].context[key_de_la_variable] = valeur_de_la_variable;
    console.log("Le context après stockage : "+JSON.stringify(lasession[sessionId].context));
  },
  date_internationale_to_french(date_internationale) {
      // Format d'entrée  : 2014-07-12T00:00:00.000+02:00
      var date_en = date_internationale.split("T");
      var tab_date = date_en[0].split("-");
      //Then read the values from the array where 0 is the first
      var format_french = tab_date[2] + "-" + tab_date[1]+ "-" + tab_date[0];
      return format_french;
  },
  is_date_sup_today(date) {
      // Format d'entrée  : 2014-07-12T00:00:00.000+02:00
      var today = new Date().toJSON().slice(0,10).replace(/-/g,'-');
      var date_en = date.split("T");
      var javascript_today = new Date(today);
      var javascript_date_en = new Date(date_en);
      if(javascript_date_en >= javascript_today) return true;
      else return false;
  },
  is_date_inf_1950(date) {
      // Format d'entrée  : 2014-07-12T00:00:00.000+02:00
      var today = new Date().toJSON().slice(0,10).replace(/-/g,'-');
      var date_en = date.split("T");
      var tab_annee = date_en[0].split("-");
      var annee = parseInt(tab_annee[0]);
      if(annee <= 1950) return true;
      else return false;
  },
  addDays(date, days) {
    var conception = new Date(date);
    var terme = new Date();
    terme.setDate(conception.getDate()+days);
    return terme;
  }
}
module.exports.lasession = lasession;
