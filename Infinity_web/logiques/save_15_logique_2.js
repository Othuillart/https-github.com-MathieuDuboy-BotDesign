var fonctions = require('./../js/fonctions.js');
var lasession = fonctions.lasession;
module.exports = {
  what_is_next: function(message_en_clair, entities, id_user_on_infinity, sessionId) {
    var pipo = entities;
    console.log("Entities dans WhatisNext : "+JSON.stringify(pipo));
    // Etape 1
    var Identito_Date_Naissance = lasession[sessionId].context["Identito_Date_Naissance"];
    var Identito_Mail = lasession[sessionId].context["Identito_Mail"];
    var Identito_Nom_Marital = lasession[sessionId].context["Identito_Nom_Marital"];
    var Identito_Nom_Marital_Nom = lasession[sessionId].context["Identito_Nom_Marital_Nom"];
    var Identito_Prenom = lasession[sessionId].context["Identito_Prenom"];
    // Grossesse question_actuelle

    return new Promise((resolve, reject) => {
      var reponse = {
        "id": id_user_on_infinity,
        "code": "200",
        "result": "SUCCESS",
        "messages" : []
      };
    function checkMethod(value) {
          switch (value) {
            case "first_message_from_bot" :
              var extras = {
                "buttons": [{
                    "id" : "id_Oui_femme_mariee",
                    "name" : fonctions.base64_encode("Oui"),
                    "response" : fonctions.base64_encode("Oui"),
                    "value" : fonctions.base64_encode("Oui_femme_mariee")
                },
                {
                    "id" : "id_Non_femme_mariee",
                    "name" : fonctions.base64_encode("Non"),
                    "response" : fonctions.base64_encode("Non"),
                    "value" : fonctions.base64_encode("Non_femme_mariee")
                }]
              };
              var message_retour_crypte = fonctions.base64_encode("Bonjour.");
              reponse.messages.push({"message" : message_retour_crypte});
              var message_retour_crypte = fonctions.base64_encode("Avez-vous un nom de femme mariée ?");
              reponse.messages.push({"message" : message_retour_crypte, "extras" : extras});
              lasession[sessionId].context["question_actuelle"] = "first_message_from_bot";
              break;
            case "Non_femme_mariee":
              fonctions.update_variables_firebase("Identito_Nom_Marital", "Non_femme_mariee", sessionId);
              fonctions.stockage_context("Identito_Nom_Marital", "Non_femme_mariee", sessionId);
              var message_retour_crypte = fonctions.base64_encode("C'est noté !");
              reponse.messages.push({"message" : message_retour_crypte});
              // Passer ici à la question suivante
            case "Identito_Prenom":
              lasession[sessionId].context["question_actuelle"] = "Identito_Prenom";
              var message_retour_crypte = fonctions.base64_encode("Quel est votre prénom ?");
              reponse.messages.push({"message" : message_retour_crypte});
              break;
            case "Oui_femme_mariee":
              lasession[sessionId].context["question_actuelle"] = "Oui_femme_mariee";
              var message_retour_crypte = fonctions.base64_encode("Pouvez vous me preciser votre nom marital ?");
              reponse.messages.push({"message" : message_retour_crypte});
              fonctions.update_variables_firebase("Identito_Nom_Marital", "Oui_femme_mariee", sessionId);
              fonctions.stockage_context("Identito_Nom_Marital", "Oui_femme_mariee", sessionId);
              break;
            case "Identito_Date_Naissance":
              lasession[sessionId].context["question_actuelle"] = "Identito_Date_Naissance";
              var message_retour_crypte = fonctions.base64_encode("Quel est votre date de naissance ?");
              reponse.messages.push({"message" : message_retour_crypte});
              break;
            case "Identito_Mail":
              lasession[sessionId].context["question_actuelle"] = "Identito_Mail";
              var message_retour_crypte = fonctions.base64_encode("Quel est votre adresse Email ?");
              reponse.messages.push({"message" : message_retour_crypte});
              break;
            case "Identito_Recap":
              lasession[sessionId].context["question_actuelle"] = "Identito_Recap";
              if(Identito_Nom_Marital == "Oui_femme_mariee") {
                var message_retour_crypte = fonctions.base64_encode("Avant d'aller plus loin, pouvez vous bien vérifier qu'il n'y a pas d'erreur sur les informations que vous m'avez donné ?\nNom Prénom : "+Identito_Nom_Marital_Nom+" "+Identito_Prenom+"\nEmail : "+Identito_Mail+"\nDate de naissance : "+Identito_Date_Naissance);
              }else {
                var message_retour_crypte = fonctions.base64_encode("Avant d'aller plus loin, pouvez vous bien vérifier qu'il n'y a pas d'erreur sur les informations que vous m'avez donné ?\nPrénom : "+Identito_Prenom+" \nEmail : "+Identito_Mail+"\nDate de naissance : "+Identito_Date_Naissance);
              }
              var extras = {
                "buttons": [{
                    "id" : "Oui_Infos_Etape_1",
                    "name" : fonctions.base64_encode("Oui"),
                    "response" : fonctions.base64_encode("Oui"),
                    "value" : fonctions.base64_encode("Oui_Infos_Etape_1")
                },
                {
                    "id" : "Non_Infos_Etape_1",
                    "name" : fonctions.base64_encode("Non"),
                    "response" : fonctions.base64_encode("Non"),
                    "value" : fonctions.base64_encode("Non_Infos_Etape_1")
                }]
              };
              reponse.messages.push({"message" : message_retour_crypte, "extras" : extras});
              break;
            case "Oui_Infos_Etape_1":
              lasession[sessionId].context["question_actuelle"] = "grossesse_date_conception";
              var message_retour_crypte1 = fonctions.base64_encode("Maintenant, je vais vous poser des questions concernant votre grossesse actuelle.");
              var message_retour_crypte2 = fonctions.base64_encode("Quelle est la date de conception ?");
              reponse.messages.push({"message" : message_retour_crypte1}) ;
              reponse.messages.push({"message" : message_retour_crypte2}) ;
              break;
            case "Non_Infos_Etape_1":
              // Delete
              delete lasession[sessionId].context["Identito_Date_Naissance"];
              delete lasession[sessionId].context["Identito_Mail"];
              delete lasession[sessionId].context["Identito_Nom_Marital"];
              delete lasession[sessionId].context["Identito_Nom_Marital_Nom"];
              delete lasession[sessionId].context["Identito_Prenom"];
              // Reset du context
              lasession[sessionId].context["question_actuelle"] = "first_message_from_bot";
              // Go To "first_message_from_bot"
              checkMethod("first_message_from_bot");
              break;
            case "Dire_Bonjour":
              // reset le context
              var message_retour_clair = "Bonjour utilisateur " + id_user_on_infinity;
              var message_retour_crypte = fonctions.base64_encode("👋 Bonjour utilisateur " +id_user_on_infinity);
              reponse.messages.push({"message" : message_retour_crypte}) ;
              break;
            case "Dire_AuRevoir":
              var message_retour_clair = "Au revoir utilisateur " + id_user_on_infinity;
              var message_retour_crypte = fonctions.base64_encode("Au revoir utilisateur " +id_user_on_infinity);
              var extras = {
                "buttons": [{
                    "id" : "ID_1",
                    "name" : fonctions.base64_encode("Name_1"),
                    "response" : fonctions.base64_encode("Response_1"),
                    "value" : fonctions.base64_encode("Value_1")
                },
                {
                    "id" : "ID_2",
                    "name" : fonctions.base64_encode("Name_2"),
                    "response" : fonctions.base64_encode("Response_2"),
                    "value" : fonctions.base64_encode("Value_2")
                }]
              };
              var msg1 = fonctions.base64_encode("Vous souhaitez partir ?");
              reponse.messages.push({"message" : msg1}) ;
              reponse.messages.push({"message" : message_retour_crypte, "extras" : extras}) ;
              break;
            case "Recommencer":
              var message_retour_crypte = fonctions.base64_encode("Très bien recommençons au début.");
              reponse.message = message_retour_crypte;
              reponse.messages.push({"message" : message_retour_crypte}) ;
              break;
          }
      }
    if (pipo && pipo.actions_du_bot && pipo.actions_du_bot[0].confidence >= 0.75) {
      // Lancement de la fonction
      checkMethod(pipo.actions_du_bot[0].value);
    } else {
      // Si c'est une date
      if(pipo.datetime) {
        if(lasession[sessionId].context["question_actuelle"] == 'Identito_Date_Naissance'){
          var message_retour_crypte = fonctions.base64_encode(message_en_clair);
          fonctions.update_variables_firebase("Identito_Date_Naissance", message_en_clair, sessionId);
          fonctions.stockage_context("Identito_Date_Naissance", message_en_clair, sessionId);
          // action suivante
          var entities = {"actions_du_bot":[{"confidence":1,"value":"Identito_Mail","type":"value"}]};
          var suite = "Identito_Mail";
        }
        else if(lasession[sessionId].context["question_actuelle"] == 'grossesse_date_conception') {
          var message_retour_crypte = fonctions.base64_encode(message_en_clair);
          fonctions.update_variables_firebase("grossesse_date_conception", message_en_clair, sessionId);
          fonctions.stockage_context("grossesse_date_conception", message_en_clair, sessionId);
          // action suivante
          var entities = {"actions_du_bot":[{"confidence":1,"value":"grossesse_date_conception","type":"value"}]};
          var suite = "grossesse_PMA	";
        }
        else {
          // la suite des dates
        }
      }
      else if(pipo.email) {
         if(lasession[sessionId].context["question_actuelle"] == 'Identito_Mail') {
          var message_retour_crypte = fonctions.base64_encode(message_en_clair+" C'est noté !");
          reponse.messages.push({"message" : message_retour_crypte});
          fonctions.update_variables_firebase("Identito_Mail", message_en_clair, sessionId);
          fonctions.stockage_context("Identito_Mail", message_en_clair, sessionId);
          // action suivante
          var entities = {"actions_du_bot":[{"confidence":1,"value":"Identito_Recap","type":"value"}]};
          var suite = "Identito_Recap";
        }else {
          // La suite des verif emails ...
        }
      }
      else {
        // Traitement ici des questions à saisie libre
        if(lasession[sessionId].context["question_actuelle"] == 'Oui_femme_mariee') {
          // c'est donc la réponse au nom de femme mariée
          var message_retour_crypte = fonctions.base64_encode(message_en_clair);
          fonctions.update_variables_firebase("Identito_Nom_Marital_Nom", message_en_clair, sessionId);
          fonctions.stockage_context("Identito_Nom_Marital_Nom", message_en_clair, sessionId);
          var entities = {"actions_du_bot":[{"confidence":1,"value":"Identito_Prenom","type":"value"}]};
          var suite = "Identito_Prenom";
        }
        else if(lasession[sessionId].context["question_actuelle"] == 'Identito_Prenom') {
          var message_retour_crypte = fonctions.base64_encode(message_en_clair);
          fonctions.update_variables_firebase("Identito_Prenom", message_en_clair, sessionId);
          fonctions.stockage_context("Identito_Prenom", message_en_clair, sessionId);
          // action suivante
          var entities = {"actions_du_bot":[{"confidence":1,"value":"Identito_Date_Naissance","type":"value"}]};
          var suite = "Identito_Date_Naissance";
        }
        else {
          // Ici se passent les verifications + retours sur les formats non respectés (Exemple : Je devais recevoir une date à cette queqtion et je n'en recois pas ...)
          if(lasession[sessionId].context["question_actuelle"] == 'Identito_Date_Naissance') {
            var message_retour_crypte1 = fonctions.base64_encode("Je n'ai pas compris votre date de Naissance.");
            var message_retour_crypte2 = fonctions.base64_encode("Exemple : 12 Juillet 1987");
            reponse.messages.push({"message" : message_retour_crypte1});
            reponse.messages.push({"message" : message_retour_crypte2});
            checkMethod("Identito_Date_Naissance");
          }
          else if(lasession[sessionId].context["question_actuelle"] == 'Identito_Mail') {
            var message_retour_crypte1 = fonctions.base64_encode("Je n'ai pas compris votre adresse email.");
            var message_retour_crypte2 = fonctions.base64_encode("Exemple : contact@botdesign.net");
            reponse.messages.push({"message" : message_retour_crypte1});
            reponse.messages.push({"message" : message_retour_crypte2});
            checkMethod("Identito_Mail");
          }
          else if(lasession[sessionId].context["question_actuelle"] == 'grossesse_date_conception') {
            var message_retour_crypte1 = fonctions.base64_encode("Je n'ai pas compris la date de conception.");
            var message_retour_crypte2 = fonctions.base64_encode("Exemple : 12 Juillet 2017");
            reponse.messages.push({"message" : message_retour_crypte1});
            reponse.messages.push({"message" : message_retour_crypte2});
            checkMethod("Oui_Infos_Etape_1");
          }
          else {
            var aleatoire = Math.floor(Math.random() * 100);
            var message_retour_clair = "message alétoire n° " + lasession[sessionId].chemin +
              " non détecté par Wit renvoyé vers Infinity. (capable de detecter uniquement Bonjour / Au revoir pour le moment)";
            var message_retour_crypte = fonctions.base64_encode("message alétoire n° " + aleatoire +
              " non détecté par Wit renvoyé vers Infinity. (capable de detecter uniquement Bonjour / Au revoir pour le moment)"
            );
            reponse.messages.push({"message" : message_retour_crypte}) ;
          }
        }
      }
    }
    resolve({reponse, suite, entities});
    });
  }
}
