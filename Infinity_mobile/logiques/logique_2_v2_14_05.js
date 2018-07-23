var fonctions = require('./../js/fonctions.js');
var lasession = fonctions.lasession;
module.exports = {
  what_is_next: function(message_en_clair, entities, id_user_on_infinity, sessionId) {
    var pipo = entities;
    return new Promise((resolve, reject) => {

      var reponse = {
        "id": id_user_on_infinity,
        "code": "200",
        "result": "SUCCESS",
        "messages" : []
      };

    if (pipo && pipo.actions_du_bot && pipo.actions_du_bot[0].confidence >= 0.75) {
      switch (pipo.actions_du_bot && pipo.actions_du_bot[0].value) {
        // Identito_Nom_Marital
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
          var message_retour_crypte = fonctions.base64_encode("Bonjour, avez-vous un nom de femme mariée ?");
          reponse.messages.push({"message" : message_retour_crypte, "extras" : extras});
          lasession[sessionId].context["question_actuelle"] = "first_message_from_bot";
          break;
        case "Non_femme_mariee":
          fonctions.update_variables_firebase("Identito_Nom_Marital", "Non_femme_mariee", sessionId);
          // Passer ici à la question suivante
          lasession[sessionId].context["question_actuelle"] = "Non_femme_mariee";
          var message_retour_crypte = fonctions.base64_encode("C'est noté !");
          reponse.messages.push({"message" : message_retour_crypte});
          // action suivante
          var entities = {"actions_du_bot":[{"confidence":1,"value":"Identito_Prenom","type":"value"}]};
          var suite = "Identito_Prenom";
          break;
        case "Oui_femme_mariee":
          var message_retour_crypte = fonctions.base64_encode("Pouvez vous me preciser votre nom marital ?");
          reponse.messages.push({"message" : message_retour_crypte});
          fonctions.update_variables_firebase("Identito_Nom_Marital", "Oui_femme_mariee", sessionId);
          lasession[sessionId].context["question_actuelle"] = "Oui_femme_mariee";
          break;
        case "Identito_Prenom":
          lasession[sessionId].context["question_actuelle"] = "Identito_Prenom";
          var message_retour_crypte = fonctions.base64_encode("Quel est votre prénom ?");
          reponse.messages.push({"message" : message_retour_crypte});
        case "Identito_Date_Naissance":
          lasession[sessionId].context["question_actuelle"] = "Identito_Date_Naissance";
          var message_retour_crypte = fonctions.base64_encode("Quel est votre date de naissance ?");
          reponse.messages.push({"message" : message_retour_crypte});
        case "Identito_Mail":
          lasession[sessionId].context["question_actuelle"] = "Identito_Mail";
          var message_retour_crypte = fonctions.base64_encode("Quel est votre adresse Email ?");
          reponse.messages.push({"message" : message_retour_crypte});
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
    } else {

      // Traitement ici des questions à saisie libre
      if(lasession[sessionId].context["question_actuelle"] == 'Oui_femme_mariee') {
        // c'est donc la réponse au nom de femme mariée
        var message_retour_crypte = fonctions.base64_encode(message_en_clair);
        fonctions.update_variables_firebase("Identito_Nom_Marital_Nom", message_en_clair, sessionId);
        var entities = {"actions_du_bot":[{"confidence":1,"value":"Identito_Prenom","type":"value"}]};
        var suite = "Identito_Prenom";
      }
      else if(lasession[sessionId].context["question_actuelle"] == 'Identito_Prenom') {
        var message_retour_crypte = fonctions.base64_encode(message_en_clair);
        fonctions.update_variables_firebase("Identito_Prenom", message_en_clair, sessionId);
        // action suivante
        var entities = {"actions_du_bot":[{"confidence":1,"value":"Identito_Date_Naissance","type":"value"}]};
        var suite = "Identito_Date_Naissance";
      }
      else if(lasession[sessionId].context["question_actuelle"] == 'Identito_Date_Naissance') {
        var message_retour_crypte = fonctions.base64_encode(message_en_clair);
        fonctions.update_variables_firebase("Identito_Date_Naissance", message_en_clair, sessionId);
        // action suivante
        var entities = {"actions_du_bot":[{"confidence":1,"value":"Identito_Mail","type":"value"}]};
        var suite = "Identito_Mail";
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
    resolve({reponse, suite, entities});
    });
  }
}
