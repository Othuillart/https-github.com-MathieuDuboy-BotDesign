var fonctions = require('./../js/fonctions.js');
var lasession = fonctions.lasession;
var requestify = require('requestify');

module.exports = {
  liste_medicaments_allergie: function(message_en_clair, entities, id_user_on_infinity, sessionId) {
    return new Promise((resolve, reject) => {
      var reponse = {
        "id": id_user_on_infinity,
        "code": "200",
        "result": "SUCCESS",
        "messages" : []
      };
      requestify.get('https://open-medicaments.fr/api/v1/medicaments?query='+message_en_clair+'&limit=6').then(function(response) {
      	var resp = response.getBody();
        console.log(resp[0]);
        if(lasession[sessionId].context["question_actuelle"] == 'histoire_allergie_medicament_detail_1') {
          var extras = {
            "buttons": []
          };
          var a = 1;
          resp.forEach(function(element) {
            console.log("medicament"+element.denomination);
            extras.buttons.push({
                "id" : a+"_histoire_allergie_medicament_detail_1_confirmation",
                "name" : fonctions.base64_encode(element.denomination),
                "response" : fonctions.base64_encode(a+"_histoire_allergie_medicament_detail_1_confirmation"),
                "value" : fonctions.base64_encode(a+"_histoire_allergie_medicament_detail_1_confirmation")
            });
            a++;
          });
          if(a == 1) {
            // aucun résultat trouvé
            lasession[sessionId].context["question_actuelle"] = "histoire_allergie_medicament_detail_1";
            var message_retour_crypte1 = fonctions.base64_encode("Je n'ai pas compris votre traitement.<br />Exemple : Tapez Omeprazol");
          }else {
            lasession[sessionId].context["question_actuelle"] = "histoire_allergie_medicament_detail_1_confirmation";
            var message_retour_crypte1 = fonctions.base64_encode("Pouvez-vous sélectionner dans la liste ci-dessous le médicament concerné ?");
            extras.buttons.push({
                "id" : "Aucun_histoire_allergie_medicament_detail_1_confirmation",
                "name" : fonctions.base64_encode("Aucun dans la liste"),
                "response" : fonctions.base64_encode("Aucun_histoire_allergie_medicament_detail_1_confirmation"),
                "value" : fonctions.base64_encode("Aucun_histoire_allergie_medicament_detail_1_confirmation")
            });
          }

        }
        else if(lasession[sessionId].context["question_actuelle"] == 'histoire_allergie_medicament_detail_2'){
          var message_retour_crypte1 = fonctions.base64_encode("Pouvez-vous sélectionner dans la liste ci-dessous le médicament concerné ?");
          var extras = {
            "buttons": []
          };
          var a = 1;
          resp.forEach(function(element) {
            console.log("medicament"+element.denomination);
            extras.buttons.push({
                "id" : a+"_histoire_allergie_medicament_detail_2_confirmation",
                "name" : fonctions.base64_encode(element.denomination),
                "response" : fonctions.base64_encode(a+"_histoire_allergie_medicament_detail_2_confirmation"),
                "value" : fonctions.base64_encode(a+"_histoire_allergie_medicament_detail_2_confirmation")
            });
            a++;
          });

          if(a == 1) {
            // aucun résultat trouvé
            lasession[sessionId].context["question_actuelle"] = "histoire_allergie_medicament_detail_2";
            var message_retour_crypte1 = fonctions.base64_encode("Je n'ai pas compris votre traitement.<br />Exemple : Tapez Omeprazol");
          }else {
            lasession[sessionId].context["question_actuelle"] = "histoire_allergie_medicament_detail_2_confirmation";
            var message_retour_crypte1 = fonctions.base64_encode("Pouvez-vous sélectionner dans la liste ci-dessous le médicament concerné ?");
            extras.buttons.push({
                "id" : "Aucun_histoire_allergie_medicament_detail_2_confirmation",
                "name" : fonctions.base64_encode("Aucun dans la liste"),
                "response" : fonctions.base64_encode("Aucun_histoire_allergie_medicament_detail_2_confirmation"),
                "value" : fonctions.base64_encode("Aucun_histoire_allergie_medicament_detail_2_confirmation")
            });
          }

        }
        else {
          lasession[sessionId].context["question_actuelle"] = "histoire_allergie_medicament_detail_3_confirmation";
          var extras = {
            "buttons": []
          };
          var a = 1;
          resp.forEach(function(element) {
            console.log("medicament"+element.denomination);
            extras.buttons.push({
                "id" : a+"_histoire_allergie_medicament_detail_3_confirmation",
                "name" : fonctions.base64_encode(element.denomination),
                "response" : fonctions.base64_encode(a+"_histoire_allergie_medicament_detail_3_confirmation"),
                "value" : fonctions.base64_encode(a+"_histoire_allergie_medicament_detail_3_confirmation")
            });
            a++;
          });
          if(a == 1) {
            // aucun résultat trouvé
            lasession[sessionId].context["question_actuelle"] = "histoire_allergie_medicament_detail_3";
            var message_retour_crypte1 = fonctions.base64_encode("Je n'ai pas compris votre traitement.<br />Exemple : Tapez Omeprazol");
          }else {
            lasession[sessionId].context["question_actuelle"] = "histoire_allergie_medicament_detail_3_confirmation";
            var message_retour_crypte1 = fonctions.base64_encode("Pouvez-vous sélectionner dans la liste ci-dessous le médicament concerné ?");
            extras.buttons.push({
                "id" : "Aucun_histoire_allergie_medicament_detail_3_confirmation",
                "name" : fonctions.base64_encode("Aucun dans la liste"),
                "response" : fonctions.base64_encode("Aucun_histoire_allergie_medicament_detail_3_confirmation"),
                "value" : fonctions.base64_encode("Aucun_histoire_allergie_medicament_detail_3_confirmation")
            });
          }
        }
        // traitement du message vide
        if(extras.buttons.length != 0) {
          reponse.messages.push({"message" : message_retour_crypte1, "extras" : extras});
          console.log(extras.buttons.length);
        }else {
          reponse.messages.push({"message" : message_retour_crypte1});
          console.log(extras.buttons.length);
        }
        resolve({reponse});
        /*
        fonctions.update_variables_firebase("histoire_allergie_medicament_detail_1", message_en_clair, sessionId);
        fonctions.stockage_context("histoire_allergie_medicament_detail_1", message_en_clair, sessionId);
        go_to_question("histoire_allergie_medicament_detail_1_signe");
        */
      });
    });
  },
  liste_medicaments: function(message_en_clair, entities, id_user_on_infinity, sessionId) {
    return new Promise((resolve, reject) => {
      var reponse = {
        "id": id_user_on_infinity,
        "code": "200",
        "result": "SUCCESS",
        "messages" : []
      };
      requestify.get('https://open-medicaments.fr/api/v1/medicaments?query='+message_en_clair+'&limit=6').then(function(response) {
      	var resp = response.getBody();
        console.log(resp[0]);
        var extras = {
          "buttons": []
        };
        var a = 1;
        resp.forEach(function(element) {
          console.log("medicament"+element.denomination);
          extras.buttons.push({
              "id" : a+"_histoire_traitement_en_cours_confirmation",
              "name" : fonctions.base64_encode(element.denomination),
              "response" : fonctions.base64_encode(a+"_histoire_traitement_en_cours_confirmation"),
              "value" : fonctions.base64_encode(a+"_histoire_traitement_en_cours_confirmation")
          });
          a++;
        });
        if(a == 1) {
          // aucun résultat trouvé
          lasession[sessionId].context["question_actuelle"] = "histoire_traitement_en_cours";
          var message_retour_crypte1 = fonctions.base64_encode("Je n'ai pas compris votre traitement.<br />Exemple : Tapez Omeprazol");
        }else {
          lasession[sessionId].context["question_actuelle"] = "histoire_traitement_en_cours_confirmation";
          var message_retour_crypte1 = fonctions.base64_encode("Pouvez-vous sélectionner dans la liste ci-dessous le médicament concerné ?");
          extras.buttons.push({
              "id" : "Aucun_histoire_traitement_en_cours_confirmation_confirmation",
              "name" : fonctions.base64_encode("Aucun dans la liste"),
              "response" : fonctions.base64_encode("Aucun_histoire_traitement_en_cours_confirmation_confirmation"),
              "value" : fonctions.base64_encode("Aucun_histoire_traitement_en_cours_confirmation_confirmation")
          });
        }
        if(extras.buttons.length != 0) {
          reponse.messages.push({"message" : message_retour_crypte1, "extras" : extras});
          console.log(extras.buttons.length);
        }else {
          reponse.messages.push({"message" : message_retour_crypte1});
          console.log(extras.buttons.length);
        }
        resolve({reponse});
        /*
        fonctions.update_variables_firebase("histoire_allergie_medicament_detail_1", message_en_clair, sessionId);
        fonctions.stockage_context("histoire_allergie_medicament_detail_1", message_en_clair, sessionId);
        go_to_question("histoire_allergie_medicament_detail_1_signe");
        */
      });
    });
  },
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
    function go_to_question(value) {
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
              var message_retour_crypte = fonctions.base64_encode("Bonjour, je suis l'assistant numérique de votre medecin anesthésiste 👨🏻‍.<br /> Je vais vous poser quelques questions en vue de préparer la consultation d'anesthésie.<br /> Allons-y !");
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
              var message_retour_crypte = fonctions.base64_encode(message_en_clair+" : Parfait, c'est noté !");
              reponse.messages.push({"message" : message_retour_crypte});
              if(Identito_Nom_Marital == "Oui_femme_mariee") {
                var message_retour_crypte = fonctions.base64_encode("Avant d'aller plus loin, pouvez vous bien vérifier qu'il n'y a pas d'erreur sur les informations que vous m'avez donné ?<br /><br />Nom Prénom : "+Identito_Nom_Marital_Nom+" "+Identito_Prenom+"<br />Email : "+message_en_clair+"<br />Date de naissance : "+Identito_Date_Naissance);
              }else {
                var message_retour_crypte = fonctions.base64_encode("Avant d'aller plus loin, pouvez vous bien vérifier qu'il n'y a pas d'erreur sur les informations que vous m'avez donné ?<br /><br />Prénom : "+Identito_Prenom+" <br />Email : "+message_en_clair+"<br />Date de naissance : "+Identito_Date_Naissance);
              }
              var extras = {
                "buttons": [{
                    "id" : "Oui_Infos_Etape_1",
                    "name" : fonctions.base64_encode("Oui, c'est correct"),
                    "response" : fonctions.base64_encode("Oui"),
                    "value" : fonctions.base64_encode("Oui_Infos_Etape_1")
                },
                {
                    "id" : "Non_Infos_Etape_1",
                    "name" : fonctions.base64_encode("Il y a des erreurs"),
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
              go_to_question("first_message_from_bot");
              break;
            case "grossesse_PMA":
              lasession[sessionId].context["question_actuelle"] = "grossesse_PMA";
              var message_retour_crypte = fonctions.base64_encode("Avez-vous bénéficié d'une procréation médicale assistée (PMA) pour cette grossesse ?");
              var extras = {
                "buttons": [{
                    "id" : "Oui_grossesse_PMA",
                    "name" : fonctions.base64_encode("Oui"),
                    "response" : fonctions.base64_encode("Oui_grossesse_PMA"),
                    "value" : fonctions.base64_encode("Oui_grossesse_PMA")
                },
                {
                    "id" : "Non_grossesse_PMA",
                    "name" : fonctions.base64_encode("Non"),
                    "response" : fonctions.base64_encode("Non_grossesse_PMA"),
                    "value" : fonctions.base64_encode("Non_grossesse_PMA")
                }]
              };
              reponse.messages.push({"message" : message_retour_crypte, "extras" : extras}) ;
              break;
            case "Oui_grossesse_PMA":
              var message_retour_crypte = fonctions.base64_encode(message_en_clair);
              fonctions.update_variables_firebase("grossesse_PMA", message_en_clair, sessionId);
              fonctions.stockage_context("grossesse_PMA", message_en_clair, sessionId);
              go_to_question("grossesse_deroulement");
              break;
            case "Non_grossesse_PMA":
              var message_retour_crypte = fonctions.base64_encode(message_en_clair);
              fonctions.update_variables_firebase("grossesse_PMA", message_en_clair, sessionId);
              fonctions.stockage_context("grossesse_PMA", message_en_clair, sessionId);
              go_to_question("grossesse_deroulement");
              break;
            case "grossesse_deroulement":
              lasession[sessionId].context["question_actuelle"] = "grossesse_deroulement";
              var message_retour_crypte = fonctions.base64_encode("Savez vous comment va se dérouler votre accouchement?");
              var extras = {
                "buttons": [{
                    "id" : "grossesse_deroulement_Voies_naturelles",
                    "name" : fonctions.base64_encode("Voies naturelles"),
                    "response" : fonctions.base64_encode("grossesse_deroulement_Voies_naturelles"),
                    "value" : fonctions.base64_encode("grossesse_deroulement_Voies_naturelles")
                },
                {
                    "id" : "grossesse_deroulement_Cesarienne",
                    "name" : fonctions.base64_encode("Césarienne"),
                    "response" : fonctions.base64_encode("grossesse_deroulement_Cesarienne"),
                    "value" : fonctions.base64_encode("grossesse_deroulement_Cesarienne")
                },
                {
                    "id" : "grossesse_deroulement_Je_ne_sais_pas",
                    "name" : fonctions.base64_encode("Je ne sais pas"),
                    "response" : fonctions.base64_encode("grossesse_deroulement_Je_ne_sais_pas"),
                    "value" : fonctions.base64_encode("grossesse_deroulement_Je_ne_sais_pas")
                }]
              };
              reponse.messages.push({"message" : message_retour_crypte, "extras" : extras}) ;
              break;
            case "grossesse_deroulement_Voies_naturelles":
              fonctions.update_variables_firebase("grossesse_deroulement", message_en_clair, sessionId);
              fonctions.stockage_context("grossesse_deroulement", message_en_clair, sessionId);
              go_to_question("grossesse_peridurale");
              break;
            case "grossesse_deroulement_Cesarienne":
              fonctions.update_variables_firebase("grossesse_deroulement", message_en_clair, sessionId);
              fonctions.stockage_context("grossesse_deroulement", message_en_clair, sessionId);
              go_to_question("grossesse_premiere");
              break;
            case "grossesse_deroulement_Je_ne_sais_pas":
              fonctions.update_variables_firebase("grossesse_deroulement", message_en_clair, sessionId);
              fonctions.stockage_context("grossesse_deroulement", message_en_clair, sessionId);
              go_to_question("grossesse_peridurale");
              break;
            case "grossesse_peridurale":
              lasession[sessionId].context["question_actuelle"] = "grossesse_peridurale";
              var message_retour_crypte = fonctions.base64_encode("Souhaitez vous une Péridurale pour votre accouchement ?");
              var extras = {
                "buttons": [{
                    "id" : "Oui_grossesse_peridurale",
                    "name" : fonctions.base64_encode("Oui"),
                    "response" : fonctions.base64_encode("Oui_grossesse_peridurale"),
                    "value" : fonctions.base64_encode("Oui_grossesse_peridurale")
                },
                {
                    "id" : "Non_grossesse_peridurale",
                    "name" : fonctions.base64_encode("Non"),
                    "response" : fonctions.base64_encode("Non_grossesse_peridurale"),
                    "value" : fonctions.base64_encode("Non_grossesse_peridurale")
                },
                {
                    "id" : "Je_ne_sais_pas_grossesse_peridurale",
                    "name" : fonctions.base64_encode("Je ne sais pas"),
                    "response" : fonctions.base64_encode("Je_ne_sais_pas_grossesse_peridurale"),
                    "value" : fonctions.base64_encode("Je_ne_sais_pas_grossesse_peridurale")
                }]
              };
              reponse.messages.push({"message" : message_retour_crypte, "extras" : extras}) ;
              break;
            case "Je_ne_sais_pas_grossesse_peridurale":
            case "Non_grossesse_peridurale":
            case "Oui_grossesse_peridurale":
              fonctions.update_variables_firebase("grossesse_peridurale", message_en_clair, sessionId);
              fonctions.stockage_context("grossesse_peridurale", message_en_clair, sessionId);
              go_to_question("grossesse_premiere");
              break;
            case "grossesse_premiere":
              lasession[sessionId].context["question_actuelle"] = "grossesse_premiere";
              var message_retour_crypte = fonctions.base64_encode("Est-ce votre premiere grossesse ?");
              var extras = {
                "buttons": [{
                    "id" : "Oui_grossesse_premiere",
                    "name" : fonctions.base64_encode("Oui"),
                    "response" : fonctions.base64_encode("Oui_grossesse_premiere"),
                    "value" : fonctions.base64_encode("Oui_grossesse_premiere")
                },
                {
                    "id" : "Non_grossesse_premiere",
                    "name" : fonctions.base64_encode("Non"),
                    "response" : fonctions.base64_encode("Non_grossesse_premiere"),
                    "value" : fonctions.base64_encode("Non_grossesse_premiere")
                }]
              };
              reponse.messages.push({"message" : message_retour_crypte, "extras" : extras}) ;
              break;
            case "Oui_grossesse_premiere":
              fonctions.update_variables_firebase("grossesse_premiere", message_en_clair, sessionId);
              fonctions.stockage_context("grossesse_premiere", message_en_clair, sessionId);
              go_to_question("patient_taille"); // GROS SAUT
              break;
            case "Non_grossesse_premiere":
              fonctions.update_variables_firebase("grossesse_premiere", message_en_clair, sessionId);
              fonctions.stockage_context("grossesse_premiere", message_en_clair, sessionId);
              go_to_question("grossesse_nombre");
              break;
            case "grossesse_nombre":
              lasession[sessionId].context["question_actuelle"] = "grossesse_nombre";
              var message_retour_crypte = fonctions.base64_encode("Combien de grossesses avant celle-ci (accouchement, fausses couches, IVG) ?");
              var extras = {
                "buttons": [{
                    "id" : "grossesse_nombre_1",
                    "name" : fonctions.base64_encode("1"),
                    "response" : fonctions.base64_encode("grossesse_nombre_1"),
                    "value" : fonctions.base64_encode("grossesse_nombre_1")
                },
                {
                    "id" : "grossesse_nombre_2",
                    "name" : fonctions.base64_encode("2"),
                    "response" : fonctions.base64_encode("grossesse_nombre_2"),
                    "value" : fonctions.base64_encode("grossesse_nombre_2")
                },
                {
                    "id" : "grossesse_nombre_3",
                    "name" : fonctions.base64_encode("3"),
                    "response" : fonctions.base64_encode("grossesse_nombre_3"),
                    "value" : fonctions.base64_encode("grossesse_nombre_3")
                },
                {
                    "id" : "grossesse_nombre_4",
                    "name" : fonctions.base64_encode("4"),
                    "response" : fonctions.base64_encode("grossesse_nombre_4"),
                    "value" : fonctions.base64_encode("grossesse_nombre_4")
                },
                {
                    "id" : "grossesse_nombre_5",
                    "name" : fonctions.base64_encode("5"),
                    "response" : fonctions.base64_encode("grossesse_nombre_5"),
                    "value" : fonctions.base64_encode("grossesse_nombre_5")
                },
                {
                    "id" : "grossesse_nombre_6",
                    "name" : fonctions.base64_encode("6"),
                    "response" : fonctions.base64_encode("grossesse_nombre_6"),
                    "value" : fonctions.base64_encode("grossesse_nombre_6")
                }]
              };
              reponse.messages.push({"message" : message_retour_crypte, "extras" : extras}) ;
              break;
            case "grossesse_nombre_6":
            case "grossesse_nombre_5":
            case "grossesse_nombre_4":
            case "grossesse_nombre_3":
            case "grossesse_nombre_2":
            case "grossesse_nombre_1":
              fonctions.update_variables_firebase("grossesse_nombre", message_en_clair, sessionId);
              fonctions.stockage_context("grossesse_nombre", message_en_clair, sessionId);
              go_to_question("grossesse_fausses_couches");
              break;
            case "grossesse_fausses_couches":
              lasession[sessionId].context["question_actuelle"] = "grossesse_fausses_couches";
              var message_retour_crypte = fonctions.base64_encode("Combien avez-vous eu de fausses couches ?");
              var extras = {
                "buttons": [{
                    "id" : "grossesse_fausses_couches_0",
                    "name" : fonctions.base64_encode("0"),
                    "response" : fonctions.base64_encode("grossesse_fausses_couches_0"),
                    "value" : fonctions.base64_encode("grossesse_fausses_couches_0")
                },{
                    "id" : "grossesse_fausses_couches_1",
                    "name" : fonctions.base64_encode("1"),
                    "response" : fonctions.base64_encode("grossesse_fausses_couches_1"),
                    "value" : fonctions.base64_encode("grossesse_fausses_couches_1")
                },
                {
                    "id" : "grossesse_fausses_couches_2",
                    "name" : fonctions.base64_encode("2"),
                    "response" : fonctions.base64_encode("grossesse_fausses_couches_2"),
                    "value" : fonctions.base64_encode("grossesse_fausses_couches_2")
                },
                {
                    "id" : "grossesse_fausses_couches_3",
                    "name" : fonctions.base64_encode("3"),
                    "response" : fonctions.base64_encode("grossesse_fausses_couches_3"),
                    "value" : fonctions.base64_encode("grossesse_fausses_couches_3")
                },
                {
                    "id" : "grossesse_fausses_couches_4",
                    "name" : fonctions.base64_encode("4"),
                    "response" : fonctions.base64_encode("grossesse_fausses_couches_4"),
                    "value" : fonctions.base64_encode("grossesse_fausses_couches_4")
                },
                {
                    "id" : "grossesse_fausses_couches_5",
                    "name" : fonctions.base64_encode("5"),
                    "response" : fonctions.base64_encode("grossesse_fausses_couches_5"),
                    "value" : fonctions.base64_encode("grossesse_fausses_couches_5")
                },
                {
                    "id" : "grossesse_fausses_couches_6",
                    "name" : fonctions.base64_encode("6"),
                    "response" : fonctions.base64_encode("grossesse_fausses_couches_6"),
                    "value" : fonctions.base64_encode("grossesse_fausses_couches_6")
                }]
              };
              reponse.messages.push({"message" : message_retour_crypte, "extras" : extras}) ;
              break;
            case "grossesse_fausses_couches_6":
            case "grossesse_fausses_couches_5":
            case "grossesse_fausses_couches_4":
            case "grossesse_fausses_couches_3":
            case "grossesse_fausses_couches_2":
            case "grossesse_fausses_couches_1":
            case "grossesse_fausses_couches_0":
              fonctions.update_variables_firebase("grossesse_fausses_couches", message_en_clair, sessionId);
              fonctions.stockage_context("grossesse_fausses_couches", message_en_clair, sessionId);
              go_to_question("grossesse_nombre_enfant");
              break;
            case "grossesse_nombre_enfant":
              lasession[sessionId].context["question_actuelle"] = "grossesse_nombre_enfant";
              var message_retour_crypte = fonctions.base64_encode("Combien d'enfants avez-vous ?");
              var extras = {
                "buttons": [{
                    "id" : "grossesse_nombre_enfant_0",
                    "name" : fonctions.base64_encode("0"),
                    "response" : fonctions.base64_encode("grossesse_nombre_enfant_0"),
                    "value" : fonctions.base64_encode("grossesse_nombre_enfant_0")
                },{
                    "id" : "grossesse_nombre_enfant_1",
                    "name" : fonctions.base64_encode("1"),
                    "response" : fonctions.base64_encode("grossesse_nombre_enfant_1"),
                    "value" : fonctions.base64_encode("grossesse_nombre_enfant_1")
                },
                {
                    "id" : "grossesse_nombre_enfant_2",
                    "name" : fonctions.base64_encode("2"),
                    "response" : fonctions.base64_encode("grossesse_nombre_enfant_2"),
                    "value" : fonctions.base64_encode("grossesse_nombre_enfant_2")
                },
                {
                    "id" : "grossesse_nombre_enfant_3",
                    "name" : fonctions.base64_encode("3"),
                    "response" : fonctions.base64_encode("grossesse_nombre_enfant_3"),
                    "value" : fonctions.base64_encode("grossesse_nombre_enfant_3")
                },
                {
                    "id" : "grossesse_nombre_enfant_4",
                    "name" : fonctions.base64_encode("4"),
                    "response" : fonctions.base64_encode("grossesse_nombre_enfant_4"),
                    "value" : fonctions.base64_encode("grossesse_nombre_enfant_4")
                },
                {
                    "id" : "grossesse_nombre_enfant_5",
                    "name" : fonctions.base64_encode("5"),
                    "response" : fonctions.base64_encode("grossesse_nombre_enfant_5"),
                    "value" : fonctions.base64_encode("grossesse_nombre_enfant_5")
                },
                {
                    "id" : "grossesse_nombre_enfant_6",
                    "name" : fonctions.base64_encode("6"),
                    "response" : fonctions.base64_encode("grossesse_nombre_enfant_6"),
                    "value" : fonctions.base64_encode("grossesse_nombre_enfant_6")
                }]
              };
              reponse.messages.push({"message" : message_retour_crypte, "extras" : extras}) ;
              break;
            case "grossesse_nombre_enfant_6":
            case "grossesse_nombre_enfant_5":
            case "grossesse_nombre_enfant_4":
            case "grossesse_nombre_enfant_3":
            case "grossesse_nombre_enfant_2":
            case "grossesse_nombre_enfant_1":
              fonctions.update_variables_firebase("grossesse_nombre_enfant", message_en_clair, sessionId);
              fonctions.stockage_context("grossesse_nombre_enfant", message_en_clair, sessionId);
              go_to_question("grossesse_date_de_enfant_1");
              break;
            case "grossesse_nombre_enfant_0":
              fonctions.update_variables_firebase("grossesse_nombre_enfant", message_en_clair, sessionId);
              fonctions.stockage_context("grossesse_nombre_enfant", message_en_clair, sessionId);
              go_to_question("patient_taille"); // GROS SAUT
              break;
            case "grossesse_date_de_enfant_1":
              lasession[sessionId].context["question_actuelle"] = "grossesse_date_de_enfant_1";
              var message_retour_crypte = fonctions.base64_encode("Quelle est l'année de naissance de votre premier enfant ?");
              reponse.messages.push({"message" : message_retour_crypte}) ;
              break;
            case "grossesse_date_de_enfant_2":
              lasession[sessionId].context["question_actuelle"] = "grossesse_date_de_enfant_2";
              var message_retour_crypte = fonctions.base64_encode("Quelle est l'année de naissance de votre deuxième enfant ?");
              reponse.messages.push({"message" : message_retour_crypte}) ;
              break;
            case "grossesse_date_de_enfant_3":
              lasession[sessionId].context["question_actuelle"] = "grossesse_date_de_enfant_3";
              var message_retour_crypte = fonctions.base64_encode("Quelle est l'année de naissance de votre troisième enfant ?");
              reponse.messages.push({"message" : message_retour_crypte}) ;
              break;
            case "grossesse_date_de_enfant_4":
              lasession[sessionId].context["question_actuelle"] = "grossesse_date_de_enfant_4";
              var message_retour_crypte = fonctions.base64_encode("Quelle est l'année de naissance de votre quatrième enfant ?");
              reponse.messages.push({"message" : message_retour_crypte}) ;
              break;
            case "grossesse_date_de_enfant_5":
              lasession[sessionId].context["question_actuelle"] = "grossesse_date_de_enfant_5";
              var message_retour_crypte = fonctions.base64_encode("Quelle est l'année de naissance de votre cinquième enfant ?");
              reponse.messages.push({"message" : message_retour_crypte}) ;
              break;
            case "grossesse_date_de_enfant_6":
              lasession[sessionId].context["question_actuelle"] = "grossesse_date_de_enfant_6";
              var message_retour_crypte = fonctions.base64_encode("Quelle est l'année de naissance de votre sixième enfant ?");
              reponse.messages.push({"message" : message_retour_crypte}) ;
              break;
            case "grossesse_enfant_accouchement_du_1":
              //Avez-vous accouché par voie basse ou césarienne
              lasession[sessionId].context["question_actuelle"] = "grossesse_enfant_accouchement_du_1";
              var message_retour_crypte = fonctions.base64_encode("Avez-vous accouché par voie basse ou césarienne ?");
              var extras = {
                "buttons": [{
                    "id" : "grossesse_enfant_accouchement_voie_basse",
                    "name" : fonctions.base64_encode("Voie basse"),
                    "response" : fonctions.base64_encode("grossesse_enfant_accouchement_voie_basse"),
                    "value" : fonctions.base64_encode("grossesse_enfant_accouchement_voie_basse")
                },{
                    "id" : "grossesse_enfant_accouchement_cesarienne",
                    "name" : fonctions.base64_encode("Césarienne"),
                    "response" : fonctions.base64_encode("grossesse_enfant_accouchement_cesarienne"),
                    "value" : fonctions.base64_encode("grossesse_enfant_accouchement_cesarienne")
                }]
              };
              reponse.messages.push({"message" : message_retour_crypte, "extras" : extras}) ;
              break;
            case "grossesse_enfant_accouchement_du_2":
              //Avez-vous accouché par voie basse ou césarienne
              lasession[sessionId].context["question_actuelle"] = "grossesse_enfant_accouchement_du_2";
              var message_retour_crypte = fonctions.base64_encode("Avez-vous accouché par voie basse ou césarienne ?");
              var extras = {
                "buttons": [{
                    "id" : "grossesse_enfant_accouchement_voie_basse",
                    "name" : fonctions.base64_encode("Voie basse"),
                    "response" : fonctions.base64_encode("grossesse_enfant_accouchement_voie_basse"),
                    "value" : fonctions.base64_encode("grossesse_enfant_accouchement_voie_basse")
                },{
                    "id" : "grossesse_enfant_accouchement_cesarienne",
                    "name" : fonctions.base64_encode("Césarienne"),
                    "response" : fonctions.base64_encode("grossesse_enfant_accouchement_cesarienne"),
                    "value" : fonctions.base64_encode("grossesse_enfant_accouchement_cesarienne")
                }]
              };
              reponse.messages.push({"message" : message_retour_crypte, "extras" : extras}) ;
              break;
            case "grossesse_enfant_accouchement_du_3":
              //Avez-vous accouché par voie basse ou césarienne
              lasession[sessionId].context["question_actuelle"] = "grossesse_enfant_accouchement_du_1";
              var message_retour_crypte = fonctions.base64_encode("Avez-vous accouché par voie basse ou césarienne ?");
              var extras = {
                "buttons": [{
                    "id" : "grossesse_enfant_accouchement_voie_basse",
                    "name" : fonctions.base64_encode("Voie basse"),
                    "response" : fonctions.base64_encode("grossesse_enfant_accouchement_voie_basse"),
                    "value" : fonctions.base64_encode("grossesse_enfant_accouchement_voie_basse")
                },{
                    "id" : "grossesse_enfant_accouchement_cesarienne",
                    "name" : fonctions.base64_encode("Césarienne"),
                    "response" : fonctions.base64_encode("grossesse_enfant_accouchement_cesarienne"),
                    "value" : fonctions.base64_encode("grossesse_enfant_accouchement_cesarienne")
                }]
              };
              reponse.messages.push({"message" : message_retour_crypte, "extras" : extras}) ;
              break;
            case "grossesse_enfant_accouchement_du_4":
              //Avez-vous accouché par voie basse ou césarienne
              lasession[sessionId].context["question_actuelle"] = "grossesse_enfant_accouchement_du_4";
              var message_retour_crypte = fonctions.base64_encode("Avez-vous accouché par voie basse ou césarienne ?");
              var extras = {
                "buttons": [{
                    "id" : "grossesse_enfant_accouchement_voie_basse",
                    "name" : fonctions.base64_encode("Voie basse"),
                    "response" : fonctions.base64_encode("grossesse_enfant_accouchement_voie_basse"),
                    "value" : fonctions.base64_encode("grossesse_enfant_accouchement_voie_basse")
                },{
                    "id" : "grossesse_enfant_accouchement_cesarienne",
                    "name" : fonctions.base64_encode("Césarienne"),
                    "response" : fonctions.base64_encode("grossesse_enfant_accouchement_cesarienne"),
                    "value" : fonctions.base64_encode("grossesse_enfant_accouchement_cesarienne")
                }]
              };
              reponse.messages.push({"message" : message_retour_crypte, "extras" : extras}) ;
              break;
            case "grossesse_enfant_accouchement_du_5":
              //Avez-vous accouché par voie basse ou césarienne
              lasession[sessionId].context["question_actuelle"] = "grossesse_enfant_accouchement_du_5";
              var message_retour_crypte = fonctions.base64_encode("Avez-vous accouché par voie basse ou césarienne ?");
              var extras = {
                "buttons": [{
                    "id" : "grossesse_enfant_accouchement_voie_basse",
                    "name" : fonctions.base64_encode("Voie basse"),
                    "response" : fonctions.base64_encode("grossesse_enfant_accouchement_voie_basse"),
                    "value" : fonctions.base64_encode("grossesse_enfant_accouchement_voie_basse")
                },{
                    "id" : "grossesse_enfant_accouchement_cesarienne",
                    "name" : fonctions.base64_encode("Césarienne"),
                    "response" : fonctions.base64_encode("grossesse_enfant_accouchement_cesarienne"),
                    "value" : fonctions.base64_encode("grossesse_enfant_accouchement_cesarienne")
                }]
              };
              reponse.messages.push({"message" : message_retour_crypte, "extras" : extras}) ;
              break;
            case "grossesse_enfant_accouchement_du_6":
              //Avez-vous accouché par voie basse ou césarienne
              lasession[sessionId].context["question_actuelle"] = "grossesse_enfant_accouchement_du_6";
              var message_retour_crypte = fonctions.base64_encode("Avez-vous accouché par voie basse ou césarienne ?");
              var extras = {
                "buttons": [{
                    "id" : "grossesse_enfant_accouchement_voie_basse",
                    "name" : fonctions.base64_encode("Voie basse"),
                    "response" : fonctions.base64_encode("grossesse_enfant_accouchement_voie_basse"),
                    "value" : fonctions.base64_encode("grossesse_enfant_accouchement_voie_basse")
                },{
                    "id" : "grossesse_enfant_accouchement_cesarienne",
                    "name" : fonctions.base64_encode("Césarienne"),
                    "response" : fonctions.base64_encode("grossesse_enfant_accouchement_cesarienne"),
                    "value" : fonctions.base64_encode("grossesse_enfant_accouchement_cesarienne")
                }]
              };
              reponse.messages.push({"message" : message_retour_crypte, "extras" : extras}) ;
              break;
            case "grossesse_enfant_accouchement_cesarienne":
            case "grossesse_enfant_accouchement_voie_basse":
              if(lasession[sessionId].context["question_actuelle"] == "grossesse_enfant_accouchement_du_1") {
                fonctions.update_variables_firebase("grossesse_enfant_accouchement_du_1", message_en_clair, sessionId);
                fonctions.stockage_context("grossesse_enfant_accouchement_du_1", message_en_clair, sessionId);
                go_to_question("grossesse_enfant_anesthesie_du_1");
              }
              else if(lasession[sessionId].context["question_actuelle"] == "grossesse_enfant_accouchement_du_2") {
                fonctions.update_variables_firebase("grossesse_enfant_accouchement_du_2", message_en_clair, sessionId);
                fonctions.stockage_context("grossesse_enfant_accouchement_du_2", message_en_clair, sessionId);
                go_to_question("grossesse_enfant_anesthesie_du_2");
              }
              else if(lasession[sessionId].context["question_actuelle"] == "grossesse_enfant_accouchement_du_3") {
                fonctions.update_variables_firebase("grossesse_enfant_accouchement_du_3", message_en_clair, sessionId);
                fonctions.stockage_context("grossesse_enfant_accouchement_du_3", message_en_clair, sessionId);
                go_to_question("grossesse_enfant_anesthesie_du_3");
              }
              else if(lasession[sessionId].context["question_actuelle"] == "grossesse_enfant_accouchement_du_4") {
                fonctions.update_variables_firebase("grossesse_enfant_accouchement_du_4", message_en_clair, sessionId);
                fonctions.stockage_context("grossesse_enfant_accouchement_du_4", message_en_clair, sessionId);
                go_to_question("grossesse_enfant_anesthesie_du_4");
              }
              else if(lasession[sessionId].context["question_actuelle"] == "grossesse_enfant_accouchement_du_5") {
                fonctions.update_variables_firebase("grossesse_enfant_accouchement_du_5", message_en_clair, sessionId);
                fonctions.stockage_context("grossesse_enfant_accouchement_du_5", message_en_clair, sessionId);
                go_to_question("grossesse_enfant_anesthesie_du_5");
              }
              else if(lasession[sessionId].context["question_actuelle"] == "grossesse_enfant_accouchement_du_6") {
                fonctions.update_variables_firebase("grossesse_enfant_accouchement_du_6", message_en_clair, sessionId);
                fonctions.stockage_context("grossesse_enfant_accouchement_du_6", message_en_clair, sessionId);
                go_to_question("grossesse_enfant_anesthesie_du_6");
              }
              break;
            case "grossesse_enfant_anesthesie_du_1":
              lasession[sessionId].context["question_actuelle"] = "grossesse_enfant_anesthesie_du_1";
              var message_retour_crypte = fonctions.base64_encode("Quelle anesthésie avez-vous eu ?");
              if(lasession[sessionId].context["grossesse_enfant_accouchement_du_1"] == "grossesse_enfant_accouchement_cesarienne") {
                var extras = {
                  "buttons": [{
                      "id" : "grossesse_enfant_anesthesie_peridurale_du_1",
                      "name" : fonctions.base64_encode("Péridurale"),
                      "response" : fonctions.base64_encode("grossesse_enfant_anesthesie_peridurale_du_1"),
                      "value" : fonctions.base64_encode("grossesse_enfant_anesthesie_peridurale_du_1")
                  },{
                      "id" : "grossesse_enfant_anesthesie_rachianesthesie_du_1",
                      "name" : fonctions.base64_encode("Rachianesthésie"),
                      "response" : fonctions.base64_encode("grossesse_enfant_anesthesie_rachianesthesie_du_1"),
                      "value" : fonctions.base64_encode("grossesse_enfant_anesthesie_rachianesthesie_du_1")
                  },
                  {
                      "id" : "grossesse_enfant_anesthesie_generale_du_1",
                      "name" : fonctions.base64_encode("Générale"),
                      "response" : fonctions.base64_encode("grossesse_enfant_anesthesie_generale_du_1"),
                      "value" : fonctions.base64_encode("grossesse_enfant_anesthesie_generale_du_1")
                  }]
                };
              }else {
                var extras = {
                  "buttons": [{
                      "id" : "grossesse_enfant_anesthesie_peridurale_du_1",
                      "name" : fonctions.base64_encode("Péridurale"),
                      "response" : fonctions.base64_encode("grossesse_enfant_anesthesie_peridurale_du_1"),
                      "value" : fonctions.base64_encode("grossesse_enfant_anesthesie_peridurale_du_1")
                  },{
                      "id" : "grossesse_enfant_anesthesie_rachianesthesie_du_1",
                      "name" : fonctions.base64_encode("Rachianesthésie"),
                      "response" : fonctions.base64_encode("grossesse_enfant_anesthesie_rachianesthesie_du_1"),
                      "value" : fonctions.base64_encode("grossesse_enfant_anesthesie_rachianesthesie_du_1")
                  },
                  {
                      "id" : "grossesse_enfant_anesthesie_rien_du_1",
                      "name" : fonctions.base64_encode("Rien"),
                      "response" : fonctions.base64_encode("grossesse_enfant_anesthesie_rien_du_1"),
                      "value" : fonctions.base64_encode("grossesse_enfant_anesthesie_rien_du_1")
                  }]
                };
              }
              reponse.messages.push({"message" : message_retour_crypte, "extras" : extras}) ;
              break;
            case "grossesse_enfant_anesthesie_peridurale_du_1":
            case "grossesse_enfant_anesthesie_generale_du_1":
            case "grossesse_enfant_anesthesie_rachianesthesie_du_1":
            case "grossesse_enfant_anesthesie_rien_du_1":
              fonctions.update_variables_firebase("grossesse_enfant_anesthesie_du_1", message_en_clair, sessionId);
              fonctions.stockage_context("grossesse_enfant_anesthesie_du_1", message_en_clair, sessionId);
              go_to_question("grossesse_enfant_anesthesie_conditions_du_1");
              break;
            case "grossesse_enfant_anesthesie_du_2":
              lasession[sessionId].context["question_actuelle"] = "grossesse_enfant_anesthesie_du_2";
              var message_retour_crypte = fonctions.base64_encode("Quelle anesthésie avez-vous eu ?");
              if(lasession[sessionId].context["grossesse_enfant_accouchement_du_2"] == "grossesse_enfant_accouchement_cesarienne") {
                var extras = {
                  "buttons": [{
                      "id" : "grossesse_enfant_anesthesie_peridurale_du_2",
                      "name" : fonctions.base64_encode("Péridurale"),
                      "response" : fonctions.base64_encode("grossesse_enfant_anesthesie_peridurale_du_2"),
                      "value" : fonctions.base64_encode("grossesse_enfant_anesthesie_peridurale_du_2")
                  },{
                      "id" : "grossesse_enfant_anesthesie_rachianesthesie_du_2",
                      "name" : fonctions.base64_encode("Rachianesthésie"),
                      "response" : fonctions.base64_encode("grossesse_enfant_anesthesie_rachianesthesie_du_2"),
                      "value" : fonctions.base64_encode("grossesse_enfant_anesthesie_rachianesthesie_du_2")
                  },
                  {
                      "id" : "grossesse_enfant_anesthesie_generale_du_2",
                      "name" : fonctions.base64_encode("Générale"),
                      "response" : fonctions.base64_encode("grossesse_enfant_anesthesie_generale_du_2"),
                      "value" : fonctions.base64_encode("grossesse_enfant_anesthesie_generale_du_2")
                  }]
                };
              }else {
                var extras = {
                  "buttons": [{
                      "id" : "grossesse_enfant_anesthesie_peridurale_du_2",
                      "name" : fonctions.base64_encode("Péridurale"),
                      "response" : fonctions.base64_encode("grossesse_enfant_anesthesie_peridurale_du_2"),
                      "value" : fonctions.base64_encode("grossesse_enfant_anesthesie_peridurale_du_2")
                  },{
                      "id" : "grossesse_enfant_anesthesie_rachianesthesie_du_2",
                      "name" : fonctions.base64_encode("Rachianesthésie"),
                      "response" : fonctions.base64_encode("grossesse_enfant_anesthesie_rachianesthesie_du_2"),
                      "value" : fonctions.base64_encode("grossesse_enfant_anesthesie_rachianesthesie_du_2")
                  },
                  {
                      "id" : "grossesse_enfant_anesthesie_rien_du_2",
                      "name" : fonctions.base64_encode("Rien"),
                      "response" : fonctions.base64_encode("grossesse_enfant_anesthesie_rien_du_2"),
                      "value" : fonctions.base64_encode("grossesse_enfant_anesthesie_rien_du_2")
                  }]
                };
              }
              reponse.messages.push({"message" : message_retour_crypte, "extras" : extras}) ;
              break;
            case "grossesse_enfant_anesthesie_peridurale_du_2":
            case "grossesse_enfant_anesthesie_generale_du_2":
            case "grossesse_enfant_anesthesie_rachianesthesie_du_2":
            case "grossesse_enfant_anesthesie_rien_du_2":
              fonctions.update_variables_firebase("grossesse_enfant_anesthesie_du_2", message_en_clair, sessionId);
              fonctions.stockage_context("grossesse_enfant_anesthesie_du_2", message_en_clair, sessionId);
              go_to_question("grossesse_enfant_anesthesie_conditions_du_2");
              break;
            case "grossesse_enfant_anesthesie_du_3":
              lasession[sessionId].context["question_actuelle"] = "grossesse_enfant_anesthesie_du_3";
              var message_retour_crypte = fonctions.base64_encode("Quelle anesthésie avez-vous eu ?");
              if(lasession[sessionId].context["grossesse_enfant_accouchement_du_3"] == "grossesse_enfant_accouchement_cesarienne") {
                var extras = {
                  "buttons": [{
                      "id" : "grossesse_enfant_anesthesie_peridurale_du_3",
                      "name" : fonctions.base64_encode("Péridurale"),
                      "response" : fonctions.base64_encode("grossesse_enfant_anesthesie_peridurale_du_3"),
                      "value" : fonctions.base64_encode("grossesse_enfant_anesthesie_peridurale_du_3")
                  },{
                      "id" : "grossesse_enfant_anesthesie_rachianesthesie_du_3",
                      "name" : fonctions.base64_encode("Rachianesthésie"),
                      "response" : fonctions.base64_encode("grossesse_enfant_anesthesie_rachianesthesie_du_3"),
                      "value" : fonctions.base64_encode("grossesse_enfant_anesthesie_rachianesthesie_du_3")
                  },
                  {
                      "id" : "grossesse_enfant_anesthesie_generale_du_3",
                      "name" : fonctions.base64_encode("Générale"),
                      "response" : fonctions.base64_encode("grossesse_enfant_anesthesie_generale_du_3"),
                      "value" : fonctions.base64_encode("grossesse_enfant_anesthesie_generale_du_3")
                  }]
                };
              }else {
                var extras = {
                  "buttons": [{
                      "id" : "grossesse_enfant_anesthesie_peridurale_du_3",
                      "name" : fonctions.base64_encode("Péridurale"),
                      "response" : fonctions.base64_encode("grossesse_enfant_anesthesie_peridurale_du_3"),
                      "value" : fonctions.base64_encode("grossesse_enfant_anesthesie_peridurale_du_3")
                  },{
                      "id" : "grossesse_enfant_anesthesie_rachianesthesie_du_3",
                      "name" : fonctions.base64_encode("Rachianesthésie"),
                      "response" : fonctions.base64_encode("grossesse_enfant_anesthesie_rachianesthesie_du_3"),
                      "value" : fonctions.base64_encode("grossesse_enfant_anesthesie_rachianesthesie_du_3")
                  },
                  {
                      "id" : "grossesse_enfant_anesthesie_rien_du_3",
                      "name" : fonctions.base64_encode("Rien"),
                      "response" : fonctions.base64_encode("grossesse_enfant_anesthesie_rien_du_3"),
                      "value" : fonctions.base64_encode("grossesse_enfant_anesthesie_rien_du_3")
                  }]
                };
              }
              reponse.messages.push({"message" : message_retour_crypte, "extras" : extras}) ;
              break;
            case "grossesse_enfant_anesthesie_peridurale_du_3":
            case "grossesse_enfant_anesthesie_generale_du_3":
            case "grossesse_enfant_anesthesie_rachianesthesie_du_3":
            case "grossesse_enfant_anesthesie_rien_du_3":
              fonctions.update_variables_firebase("grossesse_enfant_anesthesie_du_3", message_en_clair, sessionId);
              fonctions.stockage_context("grossesse_enfant_anesthesie_du_3", message_en_clair, sessionId);
              go_to_question("grossesse_enfant_anesthesie_conditions_du_3");
              break;
            case "grossesse_enfant_anesthesie_du_4":
              lasession[sessionId].context["question_actuelle"] = "grossesse_enfant_anesthesie_du_4";
              var message_retour_crypte = fonctions.base64_encode("Quelle anesthésie avez-vous eu ?");
              if(lasession[sessionId].context["grossesse_enfant_accouchement_du_4"] == "grossesse_enfant_accouchement_cesarienne") {
                var extras = {
                  "buttons": [{
                      "id" : "grossesse_enfant_anesthesie_peridurale_du_4",
                      "name" : fonctions.base64_encode("Péridurale"),
                      "response" : fonctions.base64_encode("grossesse_enfant_anesthesie_peridurale_du_4"),
                      "value" : fonctions.base64_encode("grossesse_enfant_anesthesie_peridurale_du_4")
                  },{
                      "id" : "grossesse_enfant_anesthesie_rachianesthesie_du_4",
                      "name" : fonctions.base64_encode("Rachianesthésie"),
                      "response" : fonctions.base64_encode("grossesse_enfant_anesthesie_rachianesthesie_du_4"),
                      "value" : fonctions.base64_encode("grossesse_enfant_anesthesie_rachianesthesie_du_4")
                  },
                  {
                      "id" : "grossesse_enfant_anesthesie_generale_du_4",
                      "name" : fonctions.base64_encode("Générale"),
                      "response" : fonctions.base64_encode("grossesse_enfant_anesthesie_generale_du_4"),
                      "value" : fonctions.base64_encode("grossesse_enfant_anesthesie_generale_du_4")
                  }]
                };
              }else {
                var extras = {
                  "buttons": [{
                      "id" : "grossesse_enfant_anesthesie_peridurale_du_4",
                      "name" : fonctions.base64_encode("Péridurale"),
                      "response" : fonctions.base64_encode("grossesse_enfant_anesthesie_peridurale_du_4"),
                      "value" : fonctions.base64_encode("grossesse_enfant_anesthesie_peridurale_du_4")
                  },{
                      "id" : "grossesse_enfant_anesthesie_rachianesthesie_du_4",
                      "name" : fonctions.base64_encode("Rachianesthésie"),
                      "response" : fonctions.base64_encode("grossesse_enfant_anesthesie_rachianesthesie_du_4"),
                      "value" : fonctions.base64_encode("grossesse_enfant_anesthesie_rachianesthesie_du_4")
                  },
                  {
                      "id" : "grossesse_enfant_anesthesie_rien_du_4",
                      "name" : fonctions.base64_encode("Rien"),
                      "response" : fonctions.base64_encode("grossesse_enfant_anesthesie_rien_du_4"),
                      "value" : fonctions.base64_encode("grossesse_enfant_anesthesie_rien_du_4")
                  }]
                };
              }
              reponse.messages.push({"message" : message_retour_crypte, "extras" : extras}) ;
              break;
            case "grossesse_enfant_anesthesie_peridurale_du_4":
            case "grossesse_enfant_anesthesie_generale_du_4":
            case "grossesse_enfant_anesthesie_rachianesthesie_du_4":
            case "grossesse_enfant_anesthesie_rien_du_4":
              fonctions.update_variables_firebase("grossesse_enfant_anesthesie_du_4", message_en_clair, sessionId);
              fonctions.stockage_context("grossesse_enfant_anesthesie_du_4", message_en_clair, sessionId);
              go_to_question("grossesse_enfant_anesthesie_conditions_du_4");
              break;
            case "grossesse_enfant_anesthesie_du_5":
              lasession[sessionId].context["question_actuelle"] = "grossesse_enfant_anesthesie_du_5";
              var message_retour_crypte = fonctions.base64_encode("Quelle anesthésie avez-vous eu ?");
              if(lasession[sessionId].context["grossesse_enfant_accouchement_du_5"] == "grossesse_enfant_accouchement_cesarienne") {
                var extras = {
                  "buttons": [{
                      "id" : "grossesse_enfant_anesthesie_peridurale_du_5",
                      "name" : fonctions.base64_encode("Péridurale"),
                      "response" : fonctions.base64_encode("grossesse_enfant_anesthesie_peridurale_du_5"),
                      "value" : fonctions.base64_encode("grossesse_enfant_anesthesie_peridurale_du_5")
                  },{
                      "id" : "grossesse_enfant_anesthesie_rachianesthesie_du_5",
                      "name" : fonctions.base64_encode("Rachianesthésie"),
                      "response" : fonctions.base64_encode("grossesse_enfant_anesthesie_rachianesthesie_du_5"),
                      "value" : fonctions.base64_encode("grossesse_enfant_anesthesie_rachianesthesie_du_5")
                  },
                  {
                      "id" : "grossesse_enfant_anesthesie_generale_du_5",
                      "name" : fonctions.base64_encode("Générale"),
                      "response" : fonctions.base64_encode("grossesse_enfant_anesthesie_generale_du_5"),
                      "value" : fonctions.base64_encode("grossesse_enfant_anesthesie_generale_du_5")
                  }]
                };
              }else {
                var extras = {
                  "buttons": [{
                      "id" : "grossesse_enfant_anesthesie_peridurale_du_5",
                      "name" : fonctions.base64_encode("Péridurale"),
                      "response" : fonctions.base64_encode("grossesse_enfant_anesthesie_peridurale_du_5"),
                      "value" : fonctions.base64_encode("grossesse_enfant_anesthesie_peridurale_du_5")
                  },{
                      "id" : "grossesse_enfant_anesthesie_rachianesthesie_du_5",
                      "name" : fonctions.base64_encode("Rachianesthésie"),
                      "response" : fonctions.base64_encode("grossesse_enfant_anesthesie_rachianesthesie_du_5"),
                      "value" : fonctions.base64_encode("grossesse_enfant_anesthesie_rachianesthesie_du_5")
                  },
                  {
                      "id" : "grossesse_enfant_anesthesie_rien_du_5",
                      "name" : fonctions.base64_encode("Rien"),
                      "response" : fonctions.base64_encode("grossesse_enfant_anesthesie_rien_du_5"),
                      "value" : fonctions.base64_encode("grossesse_enfant_anesthesie_rien_du_5")
                  }]
                };
              }
              reponse.messages.push({"message" : message_retour_crypte, "extras" : extras}) ;
              break;
            case "grossesse_enfant_anesthesie_peridurale_du_5":
            case "grossesse_enfant_anesthesie_generale_du_5":
            case "grossesse_enfant_anesthesie_rachianesthesie_du_5":
            case "grossesse_enfant_anesthesie_rien_du_5":
              fonctions.update_variables_firebase("grossesse_enfant_anesthesie_du_5", message_en_clair, sessionId);
              fonctions.stockage_context("grossesse_enfant_anesthesie_du_5", message_en_clair, sessionId);
              go_to_question("grossesse_enfant_anesthesie_conditions_du_5");
              break;
            case "grossesse_enfant_anesthesie_du_6":
              lasession[sessionId].context["question_actuelle"] = "grossesse_enfant_anesthesie_du_6";
              var message_retour_crypte = fonctions.base64_encode("Quelle anesthésie avez-vous eu ?");
              if(lasession[sessionId].context["grossesse_enfant_accouchement_du_6"] == "grossesse_enfant_accouchement_cesarienne") {
                var extras = {
                  "buttons": [{
                      "id" : "grossesse_enfant_anesthesie_peridurale_du_6",
                      "name" : fonctions.base64_encode("Péridurale"),
                      "response" : fonctions.base64_encode("grossesse_enfant_anesthesie_peridurale_du_6"),
                      "value" : fonctions.base64_encode("grossesse_enfant_anesthesie_peridurale_du_6")
                  },{
                      "id" : "grossesse_enfant_anesthesie_rachianesthesie_du_6",
                      "name" : fonctions.base64_encode("Rachianesthésie"),
                      "response" : fonctions.base64_encode("grossesse_enfant_anesthesie_rachianesthesie_du_6"),
                      "value" : fonctions.base64_encode("grossesse_enfant_anesthesie_rachianesthesie_du_6")
                  },
                  {
                      "id" : "grossesse_enfant_anesthesie_generale_du_6",
                      "name" : fonctions.base64_encode("Générale"),
                      "response" : fonctions.base64_encode("grossesse_enfant_anesthesie_generale_du_6"),
                      "value" : fonctions.base64_encode("grossesse_enfant_anesthesie_generale_du_6")
                  }]
                };
              }else {
                var extras = {
                  "buttons": [{
                      "id" : "grossesse_enfant_anesthesie_peridurale_du_6",
                      "name" : fonctions.base64_encode("Péridurale"),
                      "response" : fonctions.base64_encode("grossesse_enfant_anesthesie_peridurale_du_6"),
                      "value" : fonctions.base64_encode("grossesse_enfant_anesthesie_peridurale_du_6")
                  },{
                      "id" : "grossesse_enfant_anesthesie_rachianesthesie_du_6",
                      "name" : fonctions.base64_encode("Rachianesthésie"),
                      "response" : fonctions.base64_encode("grossesse_enfant_anesthesie_rachianesthesie_du_6"),
                      "value" : fonctions.base64_encode("grossesse_enfant_anesthesie_rachianesthesie_du_6")
                  },
                  {
                      "id" : "grossesse_enfant_anesthesie_rien_du_6",
                      "name" : fonctions.base64_encode("Rien"),
                      "response" : fonctions.base64_encode("grossesse_enfant_anesthesie_rien_du_6"),
                      "value" : fonctions.base64_encode("grossesse_enfant_anesthesie_rien_du_6")
                  }]
                };
              }
              reponse.messages.push({"message" : message_retour_crypte, "extras" : extras}) ;
              break;
            case "grossesse_enfant_anesthesie_peridurale_du_6":
            case "grossesse_enfant_anesthesie_generale_du_6":
            case "grossesse_enfant_anesthesie_rachianesthesie_du_6":
            case "grossesse_enfant_anesthesie_rien_du_6":
              fonctions.update_variables_firebase("grossesse_enfant_anesthesie_du_6", message_en_clair, sessionId);
              fonctions.stockage_context("grossesse_enfant_anesthesie_du_6", message_en_clair, sessionId);
              go_to_question("grossesse_enfant_anesthesie_conditions_du_6");
              break;
            case "grossesse_enfant_anesthesie_conditions_du_1":
              lasession[sessionId].context["question_actuelle"] = "grossesse_enfant_anesthesie_conditions_du_1";
              var message_retour_crypte = fonctions.base64_encode("L'anesthesie s'est elle bien passée ?");
              var extras = {
                "buttons": [{
                    "id" : "Oui_grossesse_enfant_anesthesie_conditions_du_1",
                    "name" : fonctions.base64_encode("Oui"),
                    "response" : fonctions.base64_encode("Oui_grossesse_enfant_anesthesie_conditions_du_1"),
                    "value" : fonctions.base64_encode("Oui_grossesse_enfant_anesthesie_conditions_du_1")
                },{
                    "id" : "Non_grossesse_enfant_anesthesie_conditions_du_1",
                    "name" : fonctions.base64_encode("Non"),
                    "response" : fonctions.base64_encode("Non_grossesse_enfant_anesthesie_conditions_du_1"),
                    "value" : fonctions.base64_encode("Non_grossesse_enfant_anesthesie_conditions_du_1")
                }]
              };
              reponse.messages.push({"message" : message_retour_crypte, "extras" : extras});
              break;
            case "grossesse_enfant_anesthesie_conditions_du_2":
              lasession[sessionId].context["question_actuelle"] = "grossesse_enfant_anesthesie_conditions_du_2";
              var message_retour_crypte = fonctions.base64_encode("L'anesthesie s'est elle bien passée ?");
              var extras = {
                "buttons": [{
                    "id" : "Oui_grossesse_enfant_anesthesie_conditions_du_2",
                    "name" : fonctions.base64_encode("Oui"),
                    "response" : fonctions.base64_encode("Oui_grossesse_enfant_anesthesie_conditions_du_2"),
                    "value" : fonctions.base64_encode("Oui_grossesse_enfant_anesthesie_conditions_du_2")
                },{
                    "id" : "Non_grossesse_enfant_anesthesie_conditions_du_2",
                    "name" : fonctions.base64_encode("Non"),
                    "response" : fonctions.base64_encode("Non_grossesse_enfant_anesthesie_conditions_du_2"),
                    "value" : fonctions.base64_encode("Non_grossesse_enfant_anesthesie_conditions_du_2")
                }]
              };
              reponse.messages.push({"message" : message_retour_crypte, "extras" : extras});
              break;
            case "grossesse_enfant_anesthesie_conditions_du_3":
              lasession[sessionId].context["question_actuelle"] = "grossesse_enfant_anesthesie_conditions_du_3";
              var message_retour_crypte = fonctions.base64_encode("L'anesthesie s'est elle bien passée ?");
              var extras = {
                "buttons": [{
                    "id" : "Oui_grossesse_enfant_anesthesie_conditions_du_3",
                    "name" : fonctions.base64_encode("Oui"),
                    "response" : fonctions.base64_encode("Oui_grossesse_enfant_anesthesie_conditions_du_3"),
                    "value" : fonctions.base64_encode("Oui_grossesse_enfant_anesthesie_conditions_du_3")
                },{
                    "id" : "Non_grossesse_enfant_anesthesie_conditions_du_3",
                    "name" : fonctions.base64_encode("Non"),
                    "response" : fonctions.base64_encode("Non_grossesse_enfant_anesthesie_conditions_du_3"),
                    "value" : fonctions.base64_encode("Non_grossesse_enfant_anesthesie_conditions_du_3")
                }]
              };
              reponse.messages.push({"message" : message_retour_crypte, "extras" : extras});
              break;
            case "grossesse_enfant_anesthesie_conditions_du_4":
              lasession[sessionId].context["question_actuelle"] = "grossesse_enfant_anesthesie_conditions_du_4";
              var message_retour_crypte = fonctions.base64_encode("L'anesthesie s'est elle bien passée ?");
              var extras = {
                "buttons": [{
                    "id" : "Oui_grossesse_enfant_anesthesie_conditions_du_4",
                    "name" : fonctions.base64_encode("Oui"),
                    "response" : fonctions.base64_encode("Oui_grossesse_enfant_anesthesie_conditions_du_4"),
                    "value" : fonctions.base64_encode("Oui_grossesse_enfant_anesthesie_conditions_du_4")
                },{
                    "id" : "Non_grossesse_enfant_anesthesie_conditions_du_4",
                    "name" : fonctions.base64_encode("Non"),
                    "response" : fonctions.base64_encode("Non_grossesse_enfant_anesthesie_conditions_du_4"),
                    "value" : fonctions.base64_encode("Non_grossesse_enfant_anesthesie_conditions_du_4")
                }]
              };
              reponse.messages.push({"message" : message_retour_crypte, "extras" : extras});
              break;
            case "grossesse_enfant_anesthesie_conditions_du_5":
              lasession[sessionId].context["question_actuelle"] = "grossesse_enfant_anesthesie_conditions_du_5";
              var message_retour_crypte = fonctions.base64_encode("L'anesthesie s'est elle bien passée ?");
              var extras = {
                "buttons": [{
                    "id" : "Oui_grossesse_enfant_anesthesie_conditions_du_5",
                    "name" : fonctions.base64_encode("Oui"),
                    "response" : fonctions.base64_encode("Oui_grossesse_enfant_anesthesie_conditions_du_5"),
                    "value" : fonctions.base64_encode("Oui_grossesse_enfant_anesthesie_conditions_du_5")
                },{
                    "id" : "Non_grossesse_enfant_anesthesie_conditions_du_5",
                    "name" : fonctions.base64_encode("Non"),
                    "response" : fonctions.base64_encode("Non_grossesse_enfant_anesthesie_conditions_du_5"),
                    "value" : fonctions.base64_encode("Non_grossesse_enfant_anesthesie_conditions_du_5")
                }]
              };
              reponse.messages.push({"message" : message_retour_crypte, "extras" : extras});
              break;
            case "grossesse_enfant_anesthesie_conditions_du_6":
              lasession[sessionId].context["question_actuelle"] = "grossesse_enfant_anesthesie_conditions_du_6";
              var message_retour_crypte = fonctions.base64_encode("L'anesthesie s'est elle bien passée ?");
              var extras = {
                "buttons": [{
                    "id" : "Oui_grossesse_enfant_anesthesie_conditions_du_6",
                    "name" : fonctions.base64_encode("Oui"),
                    "response" : fonctions.base64_encode("Oui_grossesse_enfant_anesthesie_conditions_du_6"),
                    "value" : fonctions.base64_encode("Oui_grossesse_enfant_anesthesie_conditions_du_6")
                },{
                    "id" : "Non_grossesse_enfant_anesthesie_conditions_du_6",
                    "name" : fonctions.base64_encode("Non"),
                    "response" : fonctions.base64_encode("Non_grossesse_enfant_anesthesie_conditions_du_6"),
                    "value" : fonctions.base64_encode("Non_grossesse_enfant_anesthesie_conditions_du_6")
                }]
              };
              reponse.messages.push({"message" : message_retour_crypte, "extras" : extras});
              break;
            case "Oui_grossesse_enfant_anesthesie_conditions_du_1":
              fonctions.update_variables_firebase("grossesse_enfant_anesthesie_conditions_du_1", message_en_clair, sessionId);
              fonctions.stockage_context("grossesse_enfant_anesthesie_conditions_du_1", message_en_clair, sessionId);
              go_to_question("grossesse_enfant_complications_du_1");
              break;
            case "Oui_grossesse_enfant_anesthesie_conditions_du_2":
              fonctions.update_variables_firebase("grossesse_enfant_anesthesie_conditions_du_2", message_en_clair, sessionId);
              fonctions.stockage_context("grossesse_enfant_anesthesie_conditions_du_2", message_en_clair, sessionId);
              go_to_question("grossesse_enfant_complications_du_2");
              break;
            case "Oui_grossesse_enfant_anesthesie_conditions_du_3":
              fonctions.update_variables_firebase("grossesse_enfant_anesthesie_conditions_du_3", message_en_clair, sessionId);
              fonctions.stockage_context("grossesse_enfant_anesthesie_conditions_du_3", message_en_clair, sessionId);
              go_to_question("grossesse_enfant_complications_du_3");
              break;
            case "Oui_grossesse_enfant_anesthesie_conditions_du_4":
              fonctions.update_variables_firebase("grossesse_enfant_anesthesie_conditions_du_4", message_en_clair, sessionId);
              fonctions.stockage_context("grossesse_enfant_anesthesie_conditions_du_4", message_en_clair, sessionId);
              go_to_question("grossesse_enfant_complications_du_4");
              break;
            case "Oui_grossesse_enfant_anesthesie_conditions_du_5":
              fonctions.update_variables_firebase("grossesse_enfant_anesthesie_conditions_du_5", message_en_clair, sessionId);
              fonctions.stockage_context("grossesse_enfant_anesthesie_conditions_du_5", message_en_clair, sessionId);
              go_to_question("grossesse_enfant_complications_du_5");
              break;
            case "Oui_grossesse_enfant_anesthesie_conditions_du_6":
              fonctions.update_variables_firebase("grossesse_enfant_anesthesie_conditions_du_6", message_en_clair, sessionId);
              fonctions.stockage_context("grossesse_enfant_anesthesie_conditions_du_6", message_en_clair, sessionId);
              go_to_question("grossesse_enfant_complications_du_6");
              break;
            case "Non_grossesse_enfant_anesthesie_conditions_du_1":
              fonctions.update_variables_firebase("grossesse_enfant_anesthesie_conditions_du_1", message_en_clair, sessionId);
              fonctions.stockage_context("grossesse_enfant_anesthesie_conditions_du_1", message_en_clair, sessionId);
              go_to_question("grossesse_enfant_anesthesie_conditions_details_du_1");
              break;
            case "Non_grossesse_enfant_anesthesie_conditions_du_2":
              fonctions.update_variables_firebase("grossesse_enfant_anesthesie_conditions_du_2", message_en_clair, sessionId);
              fonctions.stockage_context("grossesse_enfant_anesthesie_conditions_du_2", message_en_clair, sessionId);
              go_to_question("grossesse_enfant_anesthesie_conditions_details_du_2");
              break;
            case "Non_grossesse_enfant_anesthesie_conditions_du_3":
              fonctions.update_variables_firebase("grossesse_enfant_anesthesie_conditions_du_3", message_en_clair, sessionId);
              fonctions.stockage_context("grossesse_enfant_anesthesie_conditions_du_3", message_en_clair, sessionId);
              go_to_question("grossesse_enfant_anesthesie_conditions_details_du_3");
              break;
            case "Non_grossesse_enfant_anesthesie_conditions_du_4":
              fonctions.update_variables_firebase("grossesse_enfant_anesthesie_conditions_du_4", message_en_clair, sessionId);
              fonctions.stockage_context("grossesse_enfant_anesthesie_conditions_du_4", message_en_clair, sessionId);
              go_to_question("grossesse_enfant_anesthesie_conditions_details_du_4");
              break;
            case "Non_grossesse_enfant_anesthesie_conditions_du_5":
              fonctions.update_variables_firebase("grossesse_enfant_anesthesie_conditions_du_5", message_en_clair, sessionId);
              fonctions.stockage_context("grossesse_enfant_anesthesie_conditions_du_5", message_en_clair, sessionId);
              go_to_question("grossesse_enfant_anesthesie_conditions_details_du_5");
              break;
            case "Non_grossesse_enfant_anesthesie_conditions_du_6":
              fonctions.update_variables_firebase("grossesse_enfant_anesthesie_conditions_du_6", message_en_clair, sessionId);
              fonctions.stockage_context("grossesse_enfant_anesthesie_conditions_du_6", message_en_clair, sessionId);
              go_to_question("grossesse_enfant_anesthesie_conditions_details_du_6");
              break;
            case "grossesse_enfant_anesthesie_conditions_details_du_1":
              lasession[sessionId].context["question_actuelle"] = "grossesse_enfant_anesthesie_conditions_details_du_1";
              var message_retour_crypte1 = fonctions.base64_encode("Nous allons le signaler à votre médecin anesthésiste et n'oubliez pas de lui parler de cet événement.");
              var message_retour_crypte2 = fonctions.base64_encode("Pouvez vous me dire en quelques lignes ce qui s'est passé ?");
              reponse.messages.push({"message" : message_retour_crypte1});
              reponse.messages.push({"message" : message_retour_crypte2});
              break;
            case "grossesse_enfant_anesthesie_conditions_details_du_2":
              lasession[sessionId].context["question_actuelle"] = "grossesse_enfant_anesthesie_conditions_details_du_2";
              var message_retour_crypte1 = fonctions.base64_encode("Nous allons le signaler à votre médecin anesthésiste et n'oubliez pas de lui parler de cet événement.");
              var message_retour_crypte2 = fonctions.base64_encode("Pouvez vous me dire en quelques lignes ce qui s'est passé ?");
              reponse.messages.push({"message" : message_retour_crypte1});
              reponse.messages.push({"message" : message_retour_crypte2});
              break;
            case "grossesse_enfant_anesthesie_conditions_details_du_3":
              lasession[sessionId].context["question_actuelle"] = "grossesse_enfant_anesthesie_conditions_details_du_3";
              var message_retour_crypte1 = fonctions.base64_encode("Nous allons le signaler à votre médecin anesthésiste et n'oubliez pas de lui parler de cet événement.");
              var message_retour_crypte2 = fonctions.base64_encode("Pouvez vous me dire en quelques lignes ce qui s'est passé ?");
              reponse.messages.push({"message" : message_retour_crypte1});
              reponse.messages.push({"message" : message_retour_crypte2});
              break;
            case "grossesse_enfant_anesthesie_conditions_details_du_4":
              lasession[sessionId].context["question_actuelle"] = "grossesse_enfant_anesthesie_conditions_details_du_4";
              var message_retour_crypte1 = fonctions.base64_encode("Nous allons le signaler à votre médecin anesthésiste et n'oubliez pas de lui parler de cet événement.");
              var message_retour_crypte2 = fonctions.base64_encode("Pouvez vous me dire en quelques lignes ce qui s'est passé ?");
              reponse.messages.push({"message" : message_retour_crypte1});
              reponse.messages.push({"message" : message_retour_crypte2});
              break;
            case "grossesse_enfant_anesthesie_conditions_details_du_5":
              lasession[sessionId].context["question_actuelle"] = "grossesse_enfant_anesthesie_conditions_details_du_5";
              var message_retour_crypte1 = fonctions.base64_encode("Nous allons le signaler à votre médecin anesthésiste et n'oubliez pas de lui parler de cet événement.");
              var message_retour_crypte2 = fonctions.base64_encode("Pouvez vous me dire en quelques lignes ce qui s'est passé ?");
              reponse.messages.push({"message" : message_retour_crypte1});
              reponse.messages.push({"message" : message_retour_crypte2});
              break;
            case "grossesse_enfant_anesthesie_conditions_details_du_6":
              lasession[sessionId].context["question_actuelle"] = "grossesse_enfant_anesthesie_conditions_details_du_6";
              var message_retour_crypte1 = fonctions.base64_encode("Nous allons le signaler à votre médecin anesthésiste et n'oubliez pas de lui parler de cet événement.");
              var message_retour_crypte2 = fonctions.base64_encode("Pouvez vous me dire en quelques lignes ce qui s'est passé ?");
              reponse.messages.push({"message" : message_retour_crypte1});
              reponse.messages.push({"message" : message_retour_crypte2});
              break;
            case "grossesse_enfant_complications_du_1":
              lasession[sessionId].context["question_actuelle"] = "grossesse_enfant_complications_du_1";
              var message_retour_crypte = fonctions.base64_encode("Avez-vous fait une complication pendant cette grossesse ?");
              var extras = {
                "buttons": [{
                    "id" : "Non_grossesse_enfant_complications_du_1",
                    "name" : fonctions.base64_encode("Non"),
                    "response" : fonctions.base64_encode("Non_grossesse_enfant_complications_du_1"),
                    "value" : fonctions.base64_encode("Non_grossesse_enfant_complications_du_1")
                },{
                    "id" : "hemorragie_grossesse_enfant_anesthesie_conditions_du_1",
                    "name" : fonctions.base64_encode("Hémorragie de la délivrance (après de l'accouchement)"),
                    "response" : fonctions.base64_encode("hemorragie_grossesse_enfant_anesthesie_conditions_du_1"),
                    "value" : fonctions.base64_encode("hemorragie_grossesse_enfant_anesthesie_conditions_du_1")
                },{
                    "id" : "hypertension_grossesse_enfant_anesthesie_conditions_du_1",
                    "name" : fonctions.base64_encode("Hypertension artérielle"),
                    "response" : fonctions.base64_encode("hypertension_grossesse_enfant_anesthesie_conditions_du_1"),
                    "value" : fonctions.base64_encode("hypertension_grossesse_enfant_anesthesie_conditions_du_1")
                },{
                    "id" : "preclampsie_grossesse_enfant_anesthesie_conditions_du_1",
                    "name" : fonctions.base64_encode("Préclampsie"),
                    "response" : fonctions.base64_encode("preclampsie_grossesse_enfant_anesthesie_conditions_du_1"),
                    "value" : fonctions.base64_encode("preclampsie_grossesse_enfant_anesthesie_conditions_du_1")
                },{
                    "id" : "diabete_grossesse_enfant_anesthesie_conditions_du_1",
                    "name" : fonctions.base64_encode("Diabéte"),
                    "response" : fonctions.base64_encode("diabete_grossesse_enfant_anesthesie_conditions_du_1"),
                    "value" : fonctions.base64_encode("diabete_grossesse_enfant_anesthesie_conditions_du_1")
                },{
                    "id" : "premature_grossesse_enfant_anesthesie_conditions_du_1",
                    "name" : fonctions.base64_encode("Accouchement prématuré (avant 39 semaines)"),
                    "response" : fonctions.base64_encode("premature_grossesse_enfant_anesthesie_conditions_du_1"),
                    "value" : fonctions.base64_encode("premature_grossesse_enfant_anesthesie_conditions_du_1")
                },{
                    "id" : "autre_grossesse_enfant_anesthesie_conditions_du_1",
                    "name" : fonctions.base64_encode("Autre"),
                    "response" : fonctions.base64_encode("autre_grossesse_enfant_anesthesie_conditions_du_1"),
                    "value" : fonctions.base64_encode("autre_grossesse_enfant_anesthesie_conditions_du_1")
                }]
              };
              reponse.messages.push({"message" : message_retour_crypte, "extras" : extras});
              break;
            case "grossesse_enfant_complications_du_2":
              lasession[sessionId].context["question_actuelle"] = "grossesse_enfant_complications_du_2";
              var message_retour_crypte = fonctions.base64_encode("Avez-vous fait une complication pendant cette grossesse ?");
              var extras = {
                "buttons": [{
                    "id" : "Non_grossesse_enfant_complications_du_2",
                    "name" : fonctions.base64_encode("Non"),
                    "response" : fonctions.base64_encode("Non_grossesse_enfant_complications_du_2"),
                    "value" : fonctions.base64_encode("Non_grossesse_enfant_complications_du_2")
                },{
                    "id" : "hemorragie_grossesse_enfant_anesthesie_conditions_du_2",
                    "name" : fonctions.base64_encode("Hémorragie de la délivrance (après de l'accouchement)"),
                    "response" : fonctions.base64_encode("hemorragie_grossesse_enfant_anesthesie_conditions_du_2"),
                    "value" : fonctions.base64_encode("hemorragie_grossesse_enfant_anesthesie_conditions_du_2")
                },{
                    "id" : "hypertension_grossesse_enfant_anesthesie_conditions_du_2",
                    "name" : fonctions.base64_encode("Hypertension artérielle"),
                    "response" : fonctions.base64_encode("hypertension_grossesse_enfant_anesthesie_conditions_du_2"),
                    "value" : fonctions.base64_encode("hypertension_grossesse_enfant_anesthesie_conditions_du_2")
                },{
                    "id" : "preclampsie_grossesse_enfant_anesthesie_conditions_du_2",
                    "name" : fonctions.base64_encode("Préclampsie"),
                    "response" : fonctions.base64_encode("preclampsie_grossesse_enfant_anesthesie_conditions_du_2"),
                    "value" : fonctions.base64_encode("preclampsie_grossesse_enfant_anesthesie_conditions_du_2")
                },{
                    "id" : "diabete_grossesse_enfant_anesthesie_conditions_du_2",
                    "name" : fonctions.base64_encode("Diabéte"),
                    "response" : fonctions.base64_encode("diabete_grossesse_enfant_anesthesie_conditions_du_2"),
                    "value" : fonctions.base64_encode("diabete_grossesse_enfant_anesthesie_conditions_du_2")
                },{
                    "id" : "premature_grossesse_enfant_anesthesie_conditions_du_2",
                    "name" : fonctions.base64_encode("Accouchement prématuré (avant 39 semaines)"),
                    "response" : fonctions.base64_encode("premature_grossesse_enfant_anesthesie_conditions_du_2"),
                    "value" : fonctions.base64_encode("premature_grossesse_enfant_anesthesie_conditions_du_2")
                },{
                    "id" : "autre_grossesse_enfant_anesthesie_conditions_du_2",
                    "name" : fonctions.base64_encode("Autre"),
                    "response" : fonctions.base64_encode("autre_grossesse_enfant_anesthesie_conditions_du_2"),
                    "value" : fonctions.base64_encode("autre_grossesse_enfant_anesthesie_conditions_du_2")
                }]
              };
              reponse.messages.push({"message" : message_retour_crypte, "extras" : extras});
              break;
            case "grossesse_enfant_complications_du_3":
              lasession[sessionId].context["question_actuelle"] = "grossesse_enfant_complications_du_3";
              var message_retour_crypte = fonctions.base64_encode("Avez-vous fait une complication pendant cette grossesse ?");
              var extras = {
                "buttons": [{
                    "id" : "Non_grossesse_enfant_complications_du_3",
                    "name" : fonctions.base64_encode("Non"),
                    "response" : fonctions.base64_encode("Non_grossesse_enfant_complications_du_3"),
                    "value" : fonctions.base64_encode("Non_grossesse_enfant_complications_du_3")
                },{
                    "id" : "hemorragie_grossesse_enfant_anesthesie_conditions_du_3",
                    "name" : fonctions.base64_encode("Hémorragie de la délivrance (après de l'accouchement)"),
                    "response" : fonctions.base64_encode("hemorragie_grossesse_enfant_anesthesie_conditions_du_3"),
                    "value" : fonctions.base64_encode("hemorragie_grossesse_enfant_anesthesie_conditions_du_3")
                },{
                    "id" : "hypertension_grossesse_enfant_anesthesie_conditions_du_3",
                    "name" : fonctions.base64_encode("Hypertension artérielle"),
                    "response" : fonctions.base64_encode("hypertension_grossesse_enfant_anesthesie_conditions_du_3"),
                    "value" : fonctions.base64_encode("hypertension_grossesse_enfant_anesthesie_conditions_du_3")
                },{
                    "id" : "preclampsie_grossesse_enfant_anesthesie_conditions_du_3",
                    "name" : fonctions.base64_encode("Préclampsie"),
                    "response" : fonctions.base64_encode("preclampsie_grossesse_enfant_anesthesie_conditions_du_3"),
                    "value" : fonctions.base64_encode("preclampsie_grossesse_enfant_anesthesie_conditions_du_3")
                },{
                    "id" : "diabete_grossesse_enfant_anesthesie_conditions_du_3",
                    "name" : fonctions.base64_encode("Diabéte"),
                    "response" : fonctions.base64_encode("diabete_grossesse_enfant_anesthesie_conditions_du_3"),
                    "value" : fonctions.base64_encode("diabete_grossesse_enfant_anesthesie_conditions_du_3")
                },{
                    "id" : "premature_grossesse_enfant_anesthesie_conditions_du_3",
                    "name" : fonctions.base64_encode("Accouchement prématuré (avant 39 semaines)"),
                    "response" : fonctions.base64_encode("premature_grossesse_enfant_anesthesie_conditions_du_3"),
                    "value" : fonctions.base64_encode("premature_grossesse_enfant_anesthesie_conditions_du_3")
                },{
                    "id" : "autre_grossesse_enfant_anesthesie_conditions_du_3",
                    "name" : fonctions.base64_encode("Autre"),
                    "response" : fonctions.base64_encode("autre_grossesse_enfant_anesthesie_conditions_du_3"),
                    "value" : fonctions.base64_encode("autre_grossesse_enfant_anesthesie_conditions_du_3")
                }]
              };
              reponse.messages.push({"message" : message_retour_crypte, "extras" : extras});
              break;
            case "grossesse_enfant_complications_du_4":
              lasession[sessionId].context["question_actuelle"] = "grossesse_enfant_complications_du_4";
              var message_retour_crypte = fonctions.base64_encode("Avez-vous fait une complication pendant cette grossesse ?");
              var extras = {
                "buttons": [{
                    "id" : "Non_grossesse_enfant_complications_du_4",
                    "name" : fonctions.base64_encode("Non"),
                    "response" : fonctions.base64_encode("Non_grossesse_enfant_complications_du_4"),
                    "value" : fonctions.base64_encode("Non_grossesse_enfant_complications_du_4")
                },{
                    "id" : "hemorragie_grossesse_enfant_anesthesie_conditions_du_4",
                    "name" : fonctions.base64_encode("Hémorragie de la délivrance (après de l'accouchement)"),
                    "response" : fonctions.base64_encode("hemorragie_grossesse_enfant_anesthesie_conditions_du_4"),
                    "value" : fonctions.base64_encode("hemorragie_grossesse_enfant_anesthesie_conditions_du_4")
                },{
                    "id" : "hypertension_grossesse_enfant_anesthesie_conditions_du_4",
                    "name" : fonctions.base64_encode("Hypertension artérielle"),
                    "response" : fonctions.base64_encode("hypertension_grossesse_enfant_anesthesie_conditions_du_4"),
                    "value" : fonctions.base64_encode("hypertension_grossesse_enfant_anesthesie_conditions_du_4")
                },{
                    "id" : "preclampsie_grossesse_enfant_anesthesie_conditions_du_4",
                    "name" : fonctions.base64_encode("Préclampsie"),
                    "response" : fonctions.base64_encode("preclampsie_grossesse_enfant_anesthesie_conditions_du_4"),
                    "value" : fonctions.base64_encode("preclampsie_grossesse_enfant_anesthesie_conditions_du_4")
                },{
                    "id" : "diabete_grossesse_enfant_anesthesie_conditions_du_4",
                    "name" : fonctions.base64_encode("Diabéte"),
                    "response" : fonctions.base64_encode("diabete_grossesse_enfant_anesthesie_conditions_du_4"),
                    "value" : fonctions.base64_encode("diabete_grossesse_enfant_anesthesie_conditions_du_4")
                },{
                    "id" : "premature_grossesse_enfant_anesthesie_conditions_du_4",
                    "name" : fonctions.base64_encode("Accouchement prématuré (avant 39 semaines)"),
                    "response" : fonctions.base64_encode("premature_grossesse_enfant_anesthesie_conditions_du_4"),
                    "value" : fonctions.base64_encode("premature_grossesse_enfant_anesthesie_conditions_du_4")
                },{
                    "id" : "autre_grossesse_enfant_anesthesie_conditions_du_4",
                    "name" : fonctions.base64_encode("Autre"),
                    "response" : fonctions.base64_encode("autre_grossesse_enfant_anesthesie_conditions_du_4"),
                    "value" : fonctions.base64_encode("autre_grossesse_enfant_anesthesie_conditions_du_4")
                }]
              };
              reponse.messages.push({"message" : message_retour_crypte, "extras" : extras});
              break;
            case "grossesse_enfant_complications_du_5":
              lasession[sessionId].context["question_actuelle"] = "grossesse_enfant_complications_du_5";
              var message_retour_crypte = fonctions.base64_encode("Avez-vous fait une complication pendant cette grossesse ?");
              var extras = {
                "buttons": [{
                    "id" : "Non_grossesse_enfant_complications_du_5",
                    "name" : fonctions.base64_encode("Non"),
                    "response" : fonctions.base64_encode("Non_grossesse_enfant_complications_du_5"),
                    "value" : fonctions.base64_encode("Non_grossesse_enfant_complications_du_5")
                },{
                    "id" : "hemorragie_grossesse_enfant_anesthesie_conditions_du_5",
                    "name" : fonctions.base64_encode("Hémorragie de la délivrance (après de l'accouchement)"),
                    "response" : fonctions.base64_encode("hemorragie_grossesse_enfant_anesthesie_conditions_du_5"),
                    "value" : fonctions.base64_encode("hemorragie_grossesse_enfant_anesthesie_conditions_du_5")
                },{
                    "id" : "hypertension_grossesse_enfant_anesthesie_conditions_du_5",
                    "name" : fonctions.base64_encode("Hypertension artérielle"),
                    "response" : fonctions.base64_encode("hypertension_grossesse_enfant_anesthesie_conditions_du_5"),
                    "value" : fonctions.base64_encode("hypertension_grossesse_enfant_anesthesie_conditions_du_5")
                },{
                    "id" : "preclampsie_grossesse_enfant_anesthesie_conditions_du_5",
                    "name" : fonctions.base64_encode("Préclampsie"),
                    "response" : fonctions.base64_encode("preclampsie_grossesse_enfant_anesthesie_conditions_du_5"),
                    "value" : fonctions.base64_encode("preclampsie_grossesse_enfant_anesthesie_conditions_du_5")
                },{
                    "id" : "diabete_grossesse_enfant_anesthesie_conditions_du_5",
                    "name" : fonctions.base64_encode("Diabéte"),
                    "response" : fonctions.base64_encode("diabete_grossesse_enfant_anesthesie_conditions_du_5"),
                    "value" : fonctions.base64_encode("diabete_grossesse_enfant_anesthesie_conditions_du_5")
                },{
                    "id" : "premature_grossesse_enfant_anesthesie_conditions_du_5",
                    "name" : fonctions.base64_encode("Accouchement prématuré (avant 39 semaines)"),
                    "response" : fonctions.base64_encode("premature_grossesse_enfant_anesthesie_conditions_du_5"),
                    "value" : fonctions.base64_encode("premature_grossesse_enfant_anesthesie_conditions_du_5")
                },{
                    "id" : "autre_grossesse_enfant_anesthesie_conditions_du_5",
                    "name" : fonctions.base64_encode("Autre"),
                    "response" : fonctions.base64_encode("autre_grossesse_enfant_anesthesie_conditions_du_5"),
                    "value" : fonctions.base64_encode("autre_grossesse_enfant_anesthesie_conditions_du_5")
                }]
              };
              reponse.messages.push({"message" : message_retour_crypte, "extras" : extras});
              break;
            case "grossesse_enfant_complications_du_6":
              lasession[sessionId].context["question_actuelle"] = "grossesse_enfant_complications_du_6";
              var message_retour_crypte = fonctions.base64_encode("Avez-vous fait une complication pendant cette grossesse ?");
              var extras = {
                "buttons": [{
                    "id" : "Non_grossesse_enfant_complications_du_6",
                    "name" : fonctions.base64_encode("Non"),
                    "response" : fonctions.base64_encode("Non_grossesse_enfant_complications_du_6"),
                    "value" : fonctions.base64_encode("Non_grossesse_enfant_complications_du_6")
                },{
                    "id" : "hemorragie_grossesse_enfant_anesthesie_conditions_du_6",
                    "name" : fonctions.base64_encode("Hémorragie de la délivrance (après de l'accouchement)"),
                    "response" : fonctions.base64_encode("hemorragie_grossesse_enfant_anesthesie_conditions_du_6"),
                    "value" : fonctions.base64_encode("hemorragie_grossesse_enfant_anesthesie_conditions_du_6")
                },{
                    "id" : "hypertension_grossesse_enfant_anesthesie_conditions_du_6",
                    "name" : fonctions.base64_encode("Hypertension artérielle"),
                    "response" : fonctions.base64_encode("hypertension_grossesse_enfant_anesthesie_conditions_du_6"),
                    "value" : fonctions.base64_encode("hypertension_grossesse_enfant_anesthesie_conditions_du_6")
                },{
                    "id" : "preclampsie_grossesse_enfant_anesthesie_conditions_du_6",
                    "name" : fonctions.base64_encode("Préclampsie"),
                    "response" : fonctions.base64_encode("preclampsie_grossesse_enfant_anesthesie_conditions_du_6"),
                    "value" : fonctions.base64_encode("preclampsie_grossesse_enfant_anesthesie_conditions_du_6")
                },{
                    "id" : "diabete_grossesse_enfant_anesthesie_conditions_du_6",
                    "name" : fonctions.base64_encode("Diabéte"),
                    "response" : fonctions.base64_encode("diabete_grossesse_enfant_anesthesie_conditions_du_6"),
                    "value" : fonctions.base64_encode("diabete_grossesse_enfant_anesthesie_conditions_du_6")
                },{
                    "id" : "premature_grossesse_enfant_anesthesie_conditions_du_6",
                    "name" : fonctions.base64_encode("Accouchement prématuré (avant 39 semaines)"),
                    "response" : fonctions.base64_encode("premature_grossesse_enfant_anesthesie_conditions_du_6"),
                    "value" : fonctions.base64_encode("premature_grossesse_enfant_anesthesie_conditions_du_6")
                },{
                    "id" : "autre_grossesse_enfant_anesthesie_conditions_du_6",
                    "name" : fonctions.base64_encode("Autre"),
                    "response" : fonctions.base64_encode("autre_grossesse_enfant_anesthesie_conditions_du_6"),
                    "value" : fonctions.base64_encode("autre_grossesse_enfant_anesthesie_conditions_du_6")
                }]
              };
              reponse.messages.push({"message" : message_retour_crypte, "extras" : extras});
              break;
            case "Non_grossesse_enfant_complications_du_1":
            case "hemorragie_grossesse_enfant_anesthesie_conditions_du_1":
            case "hypertension_grossesse_enfant_anesthesie_conditions_du_1":
            case "preclampsie_grossesse_enfant_anesthesie_conditions_du_1":
            case "diabete_grossesse_enfant_anesthesie_conditions_du_1":
            case "premature_grossesse_enfant_anesthesie_conditions_du_1":
            case "autre_grossesse_enfant_anesthesie_conditions_du_1":
              // si le nombre d'enfant supérieur à 1 on va vers 2 sinon on passe à la taille
              fonctions.update_variables_firebase("grossesse_enfant_complications_du_1", message_en_clair, sessionId);
              fonctions.stockage_context("grossesse_enfant_complications_du_1", message_en_clair, sessionId);
              console.log("grossesse_nombre_enfant"+lasession[sessionId].context["grossesse_nombre_enfant"]);
              if(parseInt(lasession[sessionId].context["grossesse_nombre_enfant"]) > 1) {
                console.log("c'est superirue a 1");
                go_to_question("grossesse_date_de_enfant_2");
              }else {
                go_to_question("patient_taille");
              }
              break;
            case "Non_grossesse_enfant_complications_du_2":
            case "hemorragie_grossesse_enfant_anesthesie_conditions_du_2":
            case "hypertension_grossesse_enfant_anesthesie_conditions_du_2":
            case "preclampsie_grossesse_enfant_anesthesie_conditions_du_2":
            case "diabete_grossesse_enfant_anesthesie_conditions_du_2":
            case "premature_grossesse_enfant_anesthesie_conditions_du_2":
            case "autre_grossesse_enfant_anesthesie_conditions_du_2":
              console.log("grossesse_nombre_enfant"+lasession[sessionId].context["grossesse_nombre_enfant"]);
              fonctions.update_variables_firebase("grossesse_enfant_complications_du_2", message_en_clair, sessionId);
              fonctions.stockage_context("grossesse_enfant_complications_du_2", message_en_clair, sessionId);
              if(parseInt(lasession[sessionId].context["grossesse_nombre_enfant"]) > 2) {
                console.log("c'est superirue a 2");
                go_to_question("grossesse_date_de_enfant_3");
              }else {
                go_to_question("patient_taille");
              }
              break;
            case "Non_grossesse_enfant_complications_du_3":
            case "hemorragie_grossesse_enfant_anesthesie_conditions_du_3":
            case "hypertension_grossesse_enfant_anesthesie_conditions_du_3":
            case "preclampsie_grossesse_enfant_anesthesie_conditions_du_3":
            case "diabete_grossesse_enfant_anesthesie_conditions_du_3":
            case "premature_grossesse_enfant_anesthesie_conditions_du_3":
            case "autre_grossesse_enfant_anesthesie_conditions_du_3":
              fonctions.update_variables_firebase("grossesse_enfant_complications_du_3", message_en_clair, sessionId);
              fonctions.stockage_context("grossesse_enfant_complications_du_3", message_en_clair, sessionId);
              if(parseInt(lasession[sessionId].context["grossesse_nombre_enfant"]) > 3) {
                console.log("c'est superirue a 1");
                go_to_question("grossesse_date_de_enfant_4");
              }else {
                go_to_question("patient_taille");
              }
              break;
            case "Non_grossesse_enfant_complications_du_4":
            case "hemorragie_grossesse_enfant_anesthesie_conditions_du_4":
            case "hypertension_grossesse_enfant_anesthesie_conditions_du_4":
            case "preclampsie_grossesse_enfant_anesthesie_conditions_du_4":
            case "diabete_grossesse_enfant_anesthesie_conditions_du_4":
            case "premature_grossesse_enfant_anesthesie_conditions_du_4":
            case "autre_grossesse_enfant_anesthesie_conditions_du_4":
              fonctions.update_variables_firebase("grossesse_enfant_complications_du_4", message_en_clair, sessionId);
              fonctions.stockage_context("grossesse_enfant_complications_du_4", message_en_clair, sessionId);
              if(parseInt(lasession[sessionId].context["grossesse_nombre_enfant"]) > 4) {
                go_to_question("grossesse_date_de_enfant_5");
              }else {
                go_to_question("patient_taille");
              }
              break;
            case "Non_grossesse_enfant_complications_du_5":
            case "hemorragie_grossesse_enfant_anesthesie_conditions_du_5":
            case "hypertension_grossesse_enfant_anesthesie_conditions_du_5":
            case "preclampsie_grossesse_enfant_anesthesie_conditions_du_5":
            case "diabete_grossesse_enfant_anesthesie_conditions_du_5":
            case "premature_grossesse_enfant_anesthesie_conditions_du_5":
            case "autre_grossesse_enfant_anesthesie_conditions_du_5":
              fonctions.update_variables_firebase("grossesse_enfant_complications_du_5", message_en_clair, sessionId);
              fonctions.stockage_context("grossesse_enfant_complications_du_5", message_en_clair, sessionId);
              if(parseInt(lasession[sessionId].context["grossesse_nombre_enfant"]) > 5) {
                go_to_question("grossesse_date_de_enfant_6");
              }else {
                go_to_question("patient_taille");
              }
              break;
            case "Non_grossesse_enfant_complications_du_6":
            case "hemorragie_grossesse_enfant_anesthesie_conditions_du_6":
            case "hypertension_grossesse_enfant_anesthesie_conditions_du_6":
            case "preclampsie_grossesse_enfant_anesthesie_conditions_du_6":
            case "diabete_grossesse_enfant_anesthesie_conditions_du_6":
            case "premature_grossesse_enfant_anesthesie_conditions_du_6":
            case "autre_grossesse_enfant_anesthesie_conditions_du_6":
              fonctions.update_variables_firebase("grossesse_enfant_complications_du_6", message_en_clair, sessionId);
              fonctions.stockage_context("grossesse_enfant_complications_du_6", message_en_clair, sessionId);
              go_to_question("patient_taille");
              break;
            case "patient_taille":
              lasession[sessionId].context["question_actuelle"] = "patient_taille";
              var message_retour_crypte1 = fonctions.base64_encode("Maintenant, je vais vous poser des questions vous concernant.");
              var message_retour_crypte2 = fonctions.base64_encode("Quelle est votre Taille en mètre ? (Exemple : 1.72)");
              reponse.messages.push({"message" : message_retour_crypte1}) ;
              reponse.messages.push({"message" : message_retour_crypte2}) ;
              break;
            case "patient_poids_avant_grossesse":
              lasession[sessionId].context["question_actuelle"] = "patient_poids_avant_grossesse";
              var message_retour_crypte1 = fonctions.base64_encode("Quel était votre poids avant la grossesse (en kg) ? Exemple : 59");
              reponse.messages.push({"message" : message_retour_crypte1}) ;
              break;
            case "patient_poids_actuel":
              lasession[sessionId].context["question_actuelle"] = "patient_poids_actuel";
              var message_retour_crypte1 = fonctions.base64_encode("Quel est votre Poids actuel (en kg) ? Exemple : 54");
              reponse.messages.push({"message" : message_retour_crypte1}) ;
              break;
            case "passechir_operation":
              lasession[sessionId].context["question_actuelle"] = "passechir_operation";
              var message_retour_crypte1 = fonctions.base64_encode("Maintenant, je vais vous poser des questions sur votre passé chirurgical.");
              var message_retour_crypte2 = fonctions.base64_encode("Avez-vous déjà été opérée (amygdalectomie, végétations, appendicectomie, Dent de sagesse, autre, ...) ?");
              reponse.messages.push({"message" : message_retour_crypte1}) ;
              var extras = {
                "buttons": [{
                    "id" : "Oui_passechir_operation",
                    "name" : fonctions.base64_encode("Oui"),
                    "response" : fonctions.base64_encode("Oui_passechir_operation"),
                    "value" : fonctions.base64_encode("Oui_passechir_operation")
                },
                {
                    "id" : "Non_passechir_operation",
                    "name" : fonctions.base64_encode("Non"),
                    "response" : fonctions.base64_encode("Non_passechir_operation"),
                    "value" : fonctions.base64_encode("Non_passechir_operation")
                }]
              };
              reponse.messages.push({"message" : message_retour_crypte2, "extras" : extras}) ;
              break;
            case "Oui_passechir_operation":
              fonctions.update_variables_firebase("passechir_operation", message_en_clair, sessionId);
              fonctions.stockage_context("passechir_operation", message_en_clair, sessionId);
              go_to_question("passechir_operation_annee_1");
              break;
            case "Non_passechir_operation":
              fonctions.update_variables_firebase("passechir_operation", message_en_clair, sessionId);
              fonctions.stockage_context("passechir_operation", message_en_clair, sessionId);
              go_to_question("histoire_traitement");
              break;
            //   passechir_operation_annee_1
            case "passechir_operation_annee_1":
              lasession[sessionId].context["question_actuelle"] = "passechir_operation_annee_1";
              var message_retour_crypte = fonctions.base64_encode("En quelle année ?");
              reponse.messages.push({"message" : message_retour_crypte}) ;
              break;
            case "passechir_type_1":
              lasession[sessionId].context["question_actuelle"] = "passechir_type_1";
              var message_retour_crypte = fonctions.base64_encode("Quel type de chirurgie ?");
              reponse.messages.push({"message" : message_retour_crypte}) ;
              break;
            case "passechir_bienpasse_1":
              lasession[sessionId].context["question_actuelle"] = "passechir_bienpasse_1";
              var message_retour_crypte = fonctions.base64_encode("L'anesthesie s'est elle bien passée ?");
              var extras = {
                "buttons": [{
                    "id" : "Oui_passechir_bienpasse_1",
                    "name" : fonctions.base64_encode("Oui"),
                    "response" : fonctions.base64_encode("Oui_passechir_bienpasse_1"),
                    "value" : fonctions.base64_encode("Oui_passechir_bienpasse_1")
                },
                {
                    "id" : "Non_passechir_bienpasse_1",
                    "name" : fonctions.base64_encode("Non"),
                    "response" : fonctions.base64_encode("Non_passechir_bienpasse_1"),
                    "value" : fonctions.base64_encode("Non_passechir_bienpasse_1")
                }]
              };
              reponse.messages.push({"message" : message_retour_crypte, "extras": extras}) ;
              break;
            case "Oui_passechir_bienpasse_1":
              // Passer à la suite
              fonctions.update_variables_firebase("passechir_bienpasse_1", message_en_clair, sessionId);
              fonctions.stockage_context("passechir_bienpasse_1", message_en_clair, sessionId);
              go_to_question("Existence_passechir_autre_1");
              break;
            case "Non_passechir_bienpasse_1":
              // Aller aux détails passechir_details_anesthesie_1
              fonctions.update_variables_firebase("passechir_bienpasse_1", message_en_clair, sessionId);
              fonctions.stockage_context("passechir_bienpasse_1", message_en_clair, sessionId);
              go_to_question("passechir_details_anesthesie_1");
              break;
            case "passechir_details_anesthesie_1":
              lasession[sessionId].context["question_actuelle"] = "passechir_details_anesthesie_1";
              var message_retour_crypte1 = fonctions.base64_encode("Nous allons le signaler à votre médecin anesthésiste et n'oubliez pas de lui parler de cet événement.");
              var message_retour_crypte2 = fonctions.base64_encode("Pouvez vous me dire en quelques lignes ce qui s'est passé ?");
              reponse.messages.push({"message" : message_retour_crypte1});
              reponse.messages.push({"message" : message_retour_crypte2});
              break;
            case "Existence_passechir_autre_1":
              lasession[sessionId].context["question_actuelle"] = "Existence_passechir_autre_1";
              var message_retour_crypte = fonctions.base64_encode("Avez-vous subi d'autres interventions ?");
              var extras = {
                "buttons": [{
                    "id" : "Oui_Existence_passechir_autre_1",
                    "name" : fonctions.base64_encode("Oui"),
                    "response" : fonctions.base64_encode("Oui_Existence_passechir_autre_1"),
                    "value" : fonctions.base64_encode("Oui_Existence_passechir_autre_1")
                },
                {
                    "id" : "Non_Existence_passechir_autre_1",
                    "name" : fonctions.base64_encode("Non"),
                    "response" : fonctions.base64_encode("Non_Existence_passechir_autre_1"),
                    "value" : fonctions.base64_encode("Non_Existence_passechir_autre_1")
                }]
              };
              reponse.messages.push({"message" : message_retour_crypte, "extras": extras}) ;
              break;
            case "Oui_Existence_passechir_autre_1":
              // Passer à la suite
              fonctions.update_variables_firebase("Existence_passechir_autre_1", message_en_clair, sessionId);
              fonctions.stockage_context("Existence_passechir_autre_1", message_en_clair, sessionId);
              go_to_question("passechir_operation_annee_2");
              break;
            case "Non_Existence_passechir_autre_1":
              // Aller aux détails passechir_details_anesthesie_1
              fonctions.update_variables_firebase("Existence_passechir_autre_1", message_en_clair, sessionId);
              fonctions.stockage_context("Existence_passechir_autre_1", message_en_clair, sessionId);
              go_to_question("histoire_traitement");
              break;

            // Intenvention numero 2
            case "passechir_operation_annee_2":
              lasession[sessionId].context["question_actuelle"] = "passechir_operation_annee_2";
              var message_retour_crypte = fonctions.base64_encode("En quelle année ?");
              reponse.messages.push({"message" : message_retour_crypte}) ;
              break;
            case "passechir_type_2":
              lasession[sessionId].context["question_actuelle"] = "passechir_type_2";
              var message_retour_crypte = fonctions.base64_encode("Quel type de chirurgie ?");
              reponse.messages.push({"message" : message_retour_crypte}) ;
              break;
            case "passechir_bienpasse_2":
              lasession[sessionId].context["question_actuelle"] = "passechir_bienpasse_2";
              var message_retour_crypte = fonctions.base64_encode("L'anesthesie s'est elle bien passée ?");
              var extras = {
                "buttons": [{
                    "id" : "Oui_passechir_bienpasse_2",
                    "name" : fonctions.base64_encode("Oui"),
                    "response" : fonctions.base64_encode("Oui_passechir_bienpasse_2"),
                    "value" : fonctions.base64_encode("Oui_passechir_bienpasse_2")
                },
                {
                    "id" : "Non_passechir_bienpasse_2",
                    "name" : fonctions.base64_encode("Non"),
                    "response" : fonctions.base64_encode("Non_passechir_bienpasse_2"),
                    "value" : fonctions.base64_encode("Non_passechir_bienpasse_2")
                }]
              };
              reponse.messages.push({"message" : message_retour_crypte, "extras": extras}) ;
              break;
            case "Oui_passechir_bienpasse_2":
              // Passer à la suite
              fonctions.update_variables_firebase("passechir_bienpasse_2", message_en_clair, sessionId);
              fonctions.stockage_context("passechir_bienpasse_2", message_en_clair, sessionId);
              go_to_question("Existence_passechir_autre_2");
              break;
            case "Non_passechir_bienpasse_2":
              // Aller aux détails passechir_details_anesthesie_2
              fonctions.update_variables_firebase("passechir_bienpasse_2", message_en_clair, sessionId);
              fonctions.stockage_context("passechir_bienpasse_2", message_en_clair, sessionId);
              go_to_question("passechir_details_anesthesie_2");
              break;
            case "passechir_details_anesthesie_2":
              lasession[sessionId].context["question_actuelle"] = "passechir_details_anesthesie_2";
              var message_retour_crypte1 = fonctions.base64_encode("Nous allons le signaler à votre médecin anesthésiste et n'oubliez pas de lui parler de cet événement.");
              var message_retour_crypte2 = fonctions.base64_encode("Pouvez vous me dire en quelques lignes ce qui s'est passé ?");
              reponse.messages.push({"message" : message_retour_crypte1});
              reponse.messages.push({"message" : message_retour_crypte2});
              break;
            case "Existence_passechir_autre_2":
              lasession[sessionId].context["question_actuelle"] = "Existence_passechir_autre_2";
              var message_retour_crypte = fonctions.base64_encode("Avez-vous subi d'autres interventions ?");
              var extras = {
                "buttons": [{
                    "id" : "Oui_Existence_passechir_autre_2",
                    "name" : fonctions.base64_encode("Oui"),
                    "response" : fonctions.base64_encode("Oui_Existence_passechir_autre_2"),
                    "value" : fonctions.base64_encode("Oui_Existence_passechir_autre_2")
                },
                {
                    "id" : "Non_Existence_passechir_autre_2",
                    "name" : fonctions.base64_encode("Non"),
                    "response" : fonctions.base64_encode("Non_Existence_passechir_autre_2"),
                    "value" : fonctions.base64_encode("Non_Existence_passechir_autre_2")
                }]
              };
              reponse.messages.push({"message" : message_retour_crypte, "extras": extras}) ;
              break;
            case "Oui_Existence_passechir_autre_2":
              // Passer à la suite
              fonctions.update_variables_firebase("Existence_passechir_autre_2", message_en_clair, sessionId);
              fonctions.stockage_context("Existence_passechir_autre_2", message_en_clair, sessionId);
              go_to_question("passechir_operation_annee_3");
              break;
            case "Non_Existence_passechir_autre_2":
              // Aller aux détails passechir_details_anesthesie_2
              fonctions.update_variables_firebase("Existence_passechir_autre_2", message_en_clair, sessionId);
              fonctions.stockage_context("Existence_passechir_autre_2", message_en_clair, sessionId);
              go_to_question("histoire_traitement");
              break;

            // Intervention numero 3
            case "passechir_operation_annee_3":
              lasession[sessionId].context["question_actuelle"] = "passechir_operation_annee_3";
              var message_retour_crypte = fonctions.base64_encode("En quelle année ?");
              reponse.messages.push({"message" : message_retour_crypte}) ;
              break;
            case "passechir_type_3":
              lasession[sessionId].context["question_actuelle"] = "passechir_type_3";
              var message_retour_crypte = fonctions.base64_encode("Quel type de chirurgie ?");
              reponse.messages.push({"message" : message_retour_crypte}) ;
              break;
            case "passechir_bienpasse_3":
              lasession[sessionId].context["question_actuelle"] = "passechir_bienpasse_3";
              var message_retour_crypte = fonctions.base64_encode("L'anesthesie s'est elle bien passée ?");
              var extras = {
                "buttons": [{
                    "id" : "Oui_passechir_bienpasse_3",
                    "name" : fonctions.base64_encode("Oui"),
                    "response" : fonctions.base64_encode("Oui_passechir_bienpasse_3"),
                    "value" : fonctions.base64_encode("Oui_passechir_bienpasse_3")
                },
                {
                    "id" : "Non_passechir_bienpasse_3",
                    "name" : fonctions.base64_encode("Non"),
                    "response" : fonctions.base64_encode("Non_passechir_bienpasse_3"),
                    "value" : fonctions.base64_encode("Non_passechir_bienpasse_3")
                }]
              };
              reponse.messages.push({"message" : message_retour_crypte, "extras": extras}) ;
              break;
            case "Oui_passechir_bienpasse_3":
              // Passer à la suite
              fonctions.update_variables_firebase("passechir_bienpasse_3", message_en_clair, sessionId);
              fonctions.stockage_context("passechir_bienpasse_3", message_en_clair, sessionId);
              go_to_question("histoire_traitement");
              break;
            case "Non_passechir_bienpasse_3":
              // Aller aux détails passechir_details_anesthesie_3
              fonctions.update_variables_firebase("passechir_bienpasse_3", message_en_clair, sessionId);
              fonctions.stockage_context("passechir_bienpasse_3", message_en_clair, sessionId);
              go_to_question("passechir_details_anesthesie_3");
              break;
            case "passechir_details_anesthesie_3":
              lasession[sessionId].context["question_actuelle"] = "passechir_details_anesthesie_3";
              var message_retour_crypte1 = fonctions.base64_encode("Nous allons le signaler à votre médecin anesthésiste et n'oubliez pas de lui parler de cet événement.");
              var message_retour_crypte2 = fonctions.base64_encode("Pouvez vous me dire en quelques lignes ce qui s'est passé ?");
              reponse.messages.push({"message" : message_retour_crypte1});
              reponse.messages.push({"message" : message_retour_crypte2});
              break;

           case "histoire_traitement":
              lasession[sessionId].context["question_actuelle"] = "histoire_traitement";
              var message_retour_crypte1 = fonctions.base64_encode("Maintenant, je vais vous poser des questions sur votre histoire médicale.");
              var message_retour_crypte2 = fonctions.base64_encode("Prenez vous actuellement un traitement ?");
              reponse.messages.push({"message" : message_retour_crypte1}) ;
              var extras = {
                "buttons": [{
                    "id" : "Oui_histoire_traitement",
                    "name" : fonctions.base64_encode("Oui"),
                    "response" : fonctions.base64_encode("Oui_histoire_traitement"),
                    "value" : fonctions.base64_encode("Oui_histoire_traitement")
                },
                {
                    "id" : "Non_histoire_traitement",
                    "name" : fonctions.base64_encode("Non"),
                    "response" : fonctions.base64_encode("Non_histoire_traitement"),
                    "value" : fonctions.base64_encode("Non_histoire_traitement")
                }]
              };
              reponse.messages.push({"message" : message_retour_crypte2, "extras" : extras}) ;
              break;
            case "Oui_histoire_traitement":
              fonctions.update_variables_firebase("histoire_traitement", message_en_clair, sessionId);
              fonctions.stockage_context("histoire_traitement", message_en_clair, sessionId);
              go_to_question("histoire_traitement_en_cours");
              break;
            case "Non_histoire_traitement":
              fonctions.update_variables_firebase("histoire_traitement", message_en_clair, sessionId);
              fonctions.stockage_context("histoire_traitement", message_en_clair, sessionId);
              go_to_question("histoire_phlebite_embolie");
              break;
            case "histoire_traitement_en_cours":
              lasession[sessionId].context["question_actuelle"] = "histoire_traitement_en_cours";
              var message_retour_crypte1 = fonctions.base64_encode("Pouvez-vous nous dire lequel ?");
              var message_retour_crypte2 = fonctions.base64_encode("Exemple : Malarone");
              reponse.messages.push({"message" : message_retour_crypte1}) ;
              reponse.messages.push({"message" : message_retour_crypte2}) ;
              break;
            case "histoire_phlebite_embolie":
              lasession[sessionId].context["question_actuelle"] = "histoire_phlebite_embolie";
              var message_retour_crypte = fonctions.base64_encode("Avez-vous déjà fait une ou des Phlébites ou Embolie Pulmonaires ?");
              var extras = {
                "buttons": [{
                    "id" : "Oui_histoire_phlebite_embolie",
                    "name" : fonctions.base64_encode("Oui"),
                    "response" : fonctions.base64_encode("Oui_histoire_phlebite_embolie"),
                    "value" : fonctions.base64_encode("Oui_histoire_phlebite_embolie")
                },
                {
                    "id" : "Non_histoire_phlebite_embolie",
                    "name" : fonctions.base64_encode("Non"),
                    "response" : fonctions.base64_encode("Non_histoire_phlebite_embolie"),
                    "value" : fonctions.base64_encode("Non_histoire_phlebite_embolie")
                }]
              };
              reponse.messages.push({"message" : message_retour_crypte, "extras" : extras}) ;
              break;
            case "Oui_histoire_phlebite_embolie":
            case "Non_histoire_phlebite_embolie":
              fonctions.update_variables_firebase("histoire_phlebite_embolie", message_en_clair, sessionId);
              fonctions.stockage_context("histoire_phlebite_embolie", message_en_clair, sessionId);
              go_to_question("histoire_phlebite_embolie_famille");
              break;
            case "histoire_phlebite_embolie_famille":
              lasession[sessionId].context["question_actuelle"] = "histoire_phlebite_embolie_famille";
              var message_retour_crypte = fonctions.base64_encode("Une personne de votre famille (mere, père, frere, soeur) a-t-elle déjà fait une phlébite ou une embolie pulmonaire ?");
              var extras = {
                "buttons": [{
                    "id" : "Oui_histoire_phlebite_embolie_famille",
                    "name" : fonctions.base64_encode("Oui"),
                    "response" : fonctions.base64_encode("Oui_histoire_phlebite_embolie_famille"),
                    "value" : fonctions.base64_encode("Oui_histoire_phlebite_embolie_famille")
                },
                {
                    "id" : "Non_histoire_phlebite_embolie_famille",
                    "name" : fonctions.base64_encode("Non"),
                    "response" : fonctions.base64_encode("Non_histoire_phlebite_embolie_famille"),
                    "value" : fonctions.base64_encode("Non_histoire_phlebite_embolie_famille")
                }]
              };
              reponse.messages.push({"message" : message_retour_crypte, "extras" : extras}) ;
              break;
            case "Oui_histoire_phlebite_embolie_famille":
            case "Non_histoire_phlebite_embolie_famille":
              fonctions.update_variables_firebase("histoire_phlebite_embolie_famille", message_en_clair, sessionId);
              fonctions.stockage_context("histoire_phlebite_embolie_famille", message_en_clair, sessionId);
              go_to_question("histoire_thrombose");
              break;
            case "histoire_thrombose":
              lasession[sessionId].context["question_actuelle"] = "histoire_thrombose";
              var message_retour_crypte = fonctions.base64_encode("Etes vous porteuse d'une anomalie génétique favorisant le risque de thrombose ?");
              var extras = {
                "buttons": [{
                    "id" : "Oui_histoire_thrombose",
                    "name" : fonctions.base64_encode("Oui"),
                    "response" : fonctions.base64_encode("Oui_histoire_thrombose"),
                    "value" : fonctions.base64_encode("Oui_histoire_thrombose")
                },
                {
                    "id" : "Non_histoire_thrombose",
                    "name" : fonctions.base64_encode("Non"),
                    "response" : fonctions.base64_encode("Non_histoire_thrombose"),
                    "value" : fonctions.base64_encode("Non_histoire_thrombose")
                }]
              };
              reponse.messages.push({"message" : message_retour_crypte, "extras" : extras}) ;
              break;
            case "Oui_histoire_thrombose":
            case "Non_histoire_thrombose":
              fonctions.update_variables_firebase("histoire_thrombose", message_en_clair, sessionId);
              fonctions.stockage_context("histoire_thrombose", message_en_clair, sessionId);
              go_to_question("histoire_transfusion");
              break;
            case "histoire_transfusion":
              lasession[sessionId].context["question_actuelle"] = "histoire_transfusion";
              var message_retour_crypte = fonctions.base64_encode("Avez-vous déjà été transfusée (sang de quelqu'un d'autre) ?");
              var extras = {
                "buttons": [{
                    "id" : "Oui_histoire_transfusion",
                    "name" : fonctions.base64_encode("Oui"),
                    "response" : fonctions.base64_encode("Oui_histoire_transfusion"),
                    "value" : fonctions.base64_encode("Oui_histoire_transfusion")
                },
                {
                    "id" : "Non_histoire_transfusion",
                    "name" : fonctions.base64_encode("Non"),
                    "response" : fonctions.base64_encode("Non_histoire_transfusion"),
                    "value" : fonctions.base64_encode("Non_histoire_transfusion")
                }]
              };
              reponse.messages.push({"message" : message_retour_crypte, "extras" : extras}) ;
              break;
            case "Oui_histoire_transfusion":
              fonctions.update_variables_firebase("histoire_transfusion", message_en_clair, sessionId);
              fonctions.stockage_context("histoire_transfusion", message_en_clair, sessionId);
              go_to_question("histoire_transfusion_annee");
              break;
            case "Non_histoire_transfusion":
              fonctions.update_variables_firebase("histoire_transfusion", message_en_clair, sessionId);
              fonctions.stockage_context("histoire_transfusion", message_en_clair, sessionId);
              go_to_question("histoire_allergie_medicament");
              break;
            case "histoire_transfusion_annee":
              lasession[sessionId].context["question_actuelle"] = "histoire_transfusion_annee";
              var message_retour_crypte = fonctions.base64_encode("En quelle année ?");
              reponse.messages.push({"message" : message_retour_crypte}) ;
              break;
            case "histoire_transfusion_type_intervention":
              lasession[sessionId].context["question_actuelle"] = "histoire_transfusion_type_intervention";
              var message_retour_crypte = fonctions.base64_encode("Pour quelle intervention ?");
              reponse.messages.push({"message" : message_retour_crypte}) ;
              break;
            case "histoire_allergie_medicament":
              lasession[sessionId].context["question_actuelle"] = "histoire_allergie_medicament";
              var extras = {
                "buttons": [{
                    "id" : "Non_histoire_allergie_medicament",
                    "name" : fonctions.base64_encode("Non"),
                    "response" : fonctions.base64_encode("Non_histoire_allergie_medicament"),
                    "value" : fonctions.base64_encode("Non_histoire_allergie_medicament")
                },
                {
                    "id" : "1_histoire_allergie_medicament",
                    "name" : fonctions.base64_encode("1 médicament"),
                    "response" : fonctions.base64_encode("1_histoire_allergie_medicament"),
                    "value" : fonctions.base64_encode("1_histoire_allergie_medicament")
                },
                {
                    "id" : "2_histoire_allergie_medicament",
                    "name" : fonctions.base64_encode("2 médicaments"),
                    "response" : fonctions.base64_encode("2_histoire_allergie_medicament"),
                    "value" : fonctions.base64_encode("2_histoire_allergie_medicament")
                },
                {
                    "id" : "3_histoire_allergie_medicament",
                    "name" : fonctions.base64_encode("3 médicaments"),
                    "response" : fonctions.base64_encode("3_histoire_allergie_medicament"),
                    "value" : fonctions.base64_encode("3_histoire_allergie_medicament")
                }]
              };
              var message_retour_crypte = fonctions.base64_encode("Avez-vous des allergies à des médicaments ?");
              reponse.messages.push({"message" : message_retour_crypte, "extras": extras}) ;
              break;
            case "Non_histoire_allergie_medicament":
              fonctions.update_variables_firebase("histoire_allergie_medicament", message_en_clair, sessionId);
              fonctions.stockage_context("histoire_allergie_medicament", message_en_clair, sessionId);
              go_to_question("histoire_allergie_aliments");
              break;
            case "1_histoire_allergie_medicament":
            case "2_histoire_allergie_medicament":
            case "3_histoire_allergie_medicament":
              fonctions.update_variables_firebase("histoire_allergie_medicament", message_en_clair, sessionId);
              fonctions.stockage_context("histoire_allergie_medicament", message_en_clair, sessionId);
              go_to_question("histoire_allergie_medicament_detail_1");
              break;
            case "histoire_allergie_medicament_detail_1":
              lasession[sessionId].context["question_actuelle"] = "histoire_allergie_medicament_detail_1";
              var message_retour_crypte = fonctions.base64_encode("Quel est ce médicament ?");
              reponse.messages.push({"message" : message_retour_crypte}) ;
              break;
            case "histoire_allergie_medicament_detail_2":
              lasession[sessionId].context["question_actuelle"] = "histoire_allergie_medicament_detail_2";
              var message_retour_crypte = fonctions.base64_encode("Quel est ce deuxième médicament ?");
              reponse.messages.push({"message" : message_retour_crypte}) ;
              break;
            case "histoire_allergie_medicament_detail_3":
              lasession[sessionId].context["question_actuelle"] = "histoire_allergie_medicament_detail_3";
              var message_retour_crypte = fonctions.base64_encode("Quel est ce troisième médicament ?");
              reponse.messages.push({"message" : message_retour_crypte}) ;
              break;
            case "1_histoire_allergie_medicament_detail_1_confirmation":
            case "2_histoire_allergie_medicament_detail_1_confirmation":
            case "3_histoire_allergie_medicament_detail_1_confirmation":
            case "4_histoire_allergie_medicament_detail_1_confirmation":
            case "5_histoire_allergie_medicament_detail_1_confirmation":
            case "6_histoire_allergie_medicament_detail_1_confirmation":
            case "7_histoire_allergie_medicament_detail_1_confirmation":
            case "Aucun_histoire_allergie_medicament_detail_1_confirmation":
              fonctions.update_variables_firebase("histoire_allergie_medicament_detail_1", message_en_clair, sessionId);
              fonctions.stockage_context("histoire_allergie_medicament_detail_1", message_en_clair, sessionId);
              go_to_question("histoire_allergie_medicament_detail_1_signe");
              break;
            case "1_histoire_traitement_en_cours_confirmation":
            case "2_histoire_traitement_en_cours_confirmation":
            case "3_histoire_traitement_en_cours_confirmation":
            case "4_histoire_traitement_en_cours_confirmation":
            case "5_histoire_traitement_en_cours_confirmation":
            case "6_histoire_traitement_en_cours_confirmation":
            case "7_histoire_traitement_en_cours_confirmation":
            case "Aucun_histoire_traitement_en_cours_confirmation_confirmation":
              fonctions.update_variables_firebase("histoire_traitement_en_cours_confirmation", message_en_clair, sessionId);
              fonctions.stockage_context("histoire_traitement_en_cours_confirmation", message_en_clair, sessionId);
              go_to_question("histoire_phlebite_embolie");
              break;
            case "1_histoire_allergie_medicament_detail_2_confirmation":
            case "2_histoire_allergie_medicament_detail_2_confirmation":
            case "3_histoire_allergie_medicament_detail_2_confirmation":
            case "4_histoire_allergie_medicament_detail_2_confirmation":
            case "5_histoire_allergie_medicament_detail_2_confirmation":
            case "6_histoire_allergie_medicament_detail_2_confirmation":
            case "7_histoire_allergie_medicament_detail_2_confirmation":
            case "Aucun_histoire_allergie_medicament_detail_2_confirmation":
              fonctions.update_variables_firebase("histoire_allergie_medicament_detail_2", message_en_clair, sessionId);
              fonctions.stockage_context("histoire_allergie_medicament_detail_2", message_en_clair, sessionId);
              go_to_question("histoire_allergie_medicament_detail_2_signe");
              break;
            case "1_histoire_allergie_medicament_detail_3_confirmation":
            case "2_histoire_allergie_medicament_detail_3_confirmation":
            case "3_histoire_allergie_medicament_detail_3_confirmation":
            case "4_histoire_allergie_medicament_detail_3_confirmation":
            case "5_histoire_allergie_medicament_detail_3_confirmation":
            case "6_histoire_allergie_medicament_detail_3_confirmation":
            case "7_histoire_allergie_medicament_detail_3_confirmation":
            case "Aucun_histoire_allergie_medicament_detail_3_confirmation":
              fonctions.update_variables_firebase("histoire_allergie_medicament_detail_3", message_en_clair, sessionId);
              fonctions.stockage_context("histoire_allergie_medicament_detail_3", message_en_clair, sessionId);
              go_to_question("histoire_allergie_medicament_detail_3_signe");
              break;
            case "histoire_allergie_medicament_detail_1_signe":
              lasession[sessionId].context["question_actuelle"] = "histoire_allergie_medicament_detail_1_signe";
              var extras = {
                "buttons": [{
                    "id" : "nausee_histoire_allergie_medicament_detail_1_signe",
                    "name" : fonctions.base64_encode("Nausées, vomissements"),
                    "response" : fonctions.base64_encode("nausee_histoire_allergie_medicament_detail_1_signe"),
                    "value" : fonctions.base64_encode("nausee_histoire_allergie_medicament_detail_1_signe")
                },
                {
                    "id" : "bouton_histoire_allergie_medicament_detail_1_signe",
                    "name" : fonctions.base64_encode("Bouton"),
                    "response" : fonctions.base64_encode("bouton_histoire_allergie_medicament_detail_1_signe"),
                    "value" : fonctions.base64_encode("bouton_histoire_allergie_medicament_detail_1_signe")
                },
                {
                    "id" : "rougeur_histoire_allergie_medicament_detail_1_signe",
                    "name" : fonctions.base64_encode("Rougeur / erytheme"),
                    "response" : fonctions.base64_encode("rougeur_histoire_allergie_medicament_detail_1_signe"),
                    "value" : fonctions.base64_encode("rougeur_histoire_allergie_medicament_detail_1_signe")
                },
                {
                    "id" : "oedeme_histoire_allergie_medicament_detail_1_signe",
                    "name" : fonctions.base64_encode("Oedeme / gonflement de la bouche ou du visage"),
                    "response" : fonctions.base64_encode("oedeme_histoire_allergie_medicament_detail_1_signe"),
                    "value" : fonctions.base64_encode("oedeme_histoire_allergie_medicament_detail_1_signe")
                },
                {
                    "id" : "difficultes_histoire_allergie_medicament_detail_1_signe",
                    "name" : fonctions.base64_encode("Difficultés respiratoires"),
                    "response" : fonctions.base64_encode("difficultes_histoire_allergie_medicament_detail_1_signe"),
                    "value" : fonctions.base64_encode("difficultes_histoire_allergie_medicament_detail_1_signe")
                },
                {
                    "id" : "autres_histoire_allergie_medicament_detail_1_signe",
                    "name" : fonctions.base64_encode("Autres"),
                    "response" : fonctions.base64_encode("autres_histoire_allergie_medicament_detail_1_signe"),
                    "value" : fonctions.base64_encode("autres_histoire_allergie_medicament_detail_1_signe")
                }]
              };
              var message_retour_crypte = fonctions.base64_encode("Quels signes avez-vous présenté ?");
              reponse.messages.push({"message" : message_retour_crypte, "extras": extras}) ;
              break;
            case "histoire_allergie_medicament_detail_2_signe":
              lasession[sessionId].context["question_actuelle"] = "histoire_allergie_medicament_detail_2_signe";
              var extras = {
                "buttons": [{
                    "id" : "nausee_histoire_allergie_medicament_detail_2_signe",
                    "name" : fonctions.base64_encode("Nausées, vomissements"),
                    "response" : fonctions.base64_encode("nausee_histoire_allergie_medicament_detail_2_signe"),
                    "value" : fonctions.base64_encode("nausee_histoire_allergie_medicament_detail_2_signe")
                },
                {
                    "id" : "bouton_histoire_allergie_medicament_detail_2_signe",
                    "name" : fonctions.base64_encode("Bouton"),
                    "response" : fonctions.base64_encode("bouton_histoire_allergie_medicament_detail_2_signe"),
                    "value" : fonctions.base64_encode("bouton_histoire_allergie_medicament_detail_2_signe")
                },
                {
                    "id" : "rougeur_histoire_allergie_medicament_detail_2_signe",
                    "name" : fonctions.base64_encode("Rougeur / erytheme"),
                    "response" : fonctions.base64_encode("rougeur_histoire_allergie_medicament_detail_2_signe"),
                    "value" : fonctions.base64_encode("rougeur_histoire_allergie_medicament_detail_2_signe")
                },
                {
                    "id" : "oedeme_histoire_allergie_medicament_detail_2_signe",
                    "name" : fonctions.base64_encode("Oedeme / gonflement de la bouche ou du visage"),
                    "response" : fonctions.base64_encode("oedeme_histoire_allergie_medicament_detail_2_signe"),
                    "value" : fonctions.base64_encode("oedeme_histoire_allergie_medicament_detail_2_signe")
                },
                {
                    "id" : "difficultes_histoire_allergie_medicament_detail_2_signe",
                    "name" : fonctions.base64_encode("Difficultés respiratoires"),
                    "response" : fonctions.base64_encode("difficultes_histoire_allergie_medicament_detail_2_signe"),
                    "value" : fonctions.base64_encode("difficultes_histoire_allergie_medicament_detail_2_signe")
                },
                {
                    "id" : "autres_histoire_allergie_medicament_detail_2_signe",
                    "name" : fonctions.base64_encode("Autres"),
                    "response" : fonctions.base64_encode("autres_histoire_allergie_medicament_detail_2_signe"),
                    "value" : fonctions.base64_encode("autres_histoire_allergie_medicament_detail_2_signe")
                }]
              };
              var message_retour_crypte = fonctions.base64_encode("Quels signes avez-vous présenté ?");
              reponse.messages.push({"message" : message_retour_crypte, "extras": extras}) ;
              break;
            case "histoire_allergie_medicament_detail_3_signe":
              lasession[sessionId].context["question_actuelle"] = "histoire_allergie_medicament_detail_3_signe";
              var extras = {
                "buttons": [{
                    "id" : "nausee_histoire_allergie_medicament_detail_3_signe",
                    "name" : fonctions.base64_encode("Nausées, vomissements"),
                    "response" : fonctions.base64_encode("nausee_histoire_allergie_medicament_detail_3_signe"),
                    "value" : fonctions.base64_encode("nausee_histoire_allergie_medicament_detail_3_signe")
                },
                {
                    "id" : "bouton_histoire_allergie_medicament_detail_3_signe",
                    "name" : fonctions.base64_encode("Bouton"),
                    "response" : fonctions.base64_encode("bouton_histoire_allergie_medicament_detail_3_signe"),
                    "value" : fonctions.base64_encode("bouton_histoire_allergie_medicament_detail_3_signe")
                },
                {
                    "id" : "rougeur_histoire_allergie_medicament_detail_3_signe",
                    "name" : fonctions.base64_encode("Rougeur / erytheme"),
                    "response" : fonctions.base64_encode("rougeur_histoire_allergie_medicament_detail_3_signe"),
                    "value" : fonctions.base64_encode("rougeur_histoire_allergie_medicament_detail_3_signe")
                },
                {
                    "id" : "oedeme_histoire_allergie_medicament_detail_3_signe",
                    "name" : fonctions.base64_encode("Oedeme / gonflement de la bouche ou du visage"),
                    "response" : fonctions.base64_encode("oedeme_histoire_allergie_medicament_detail_3_signe"),
                    "value" : fonctions.base64_encode("oedeme_histoire_allergie_medicament_detail_3_signe")
                },
                {
                    "id" : "difficultes_histoire_allergie_medicament_detail_3_signe",
                    "name" : fonctions.base64_encode("Difficultés respiratoires"),
                    "response" : fonctions.base64_encode("difficultes_histoire_allergie_medicament_detail_3_signe"),
                    "value" : fonctions.base64_encode("difficultes_histoire_allergie_medicament_detail_3_signe")
                },
                {
                    "id" : "autres_histoire_allergie_medicament_detail_3_signe",
                    "name" : fonctions.base64_encode("Autres"),
                    "response" : fonctions.base64_encode("autres_histoire_allergie_medicament_detail_3_signe"),
                    "value" : fonctions.base64_encode("autres_histoire_allergie_medicament_detail_3_signe")
                }]
              };
              var message_retour_crypte = fonctions.base64_encode("Quels signes avez-vous présenté ?");
              reponse.messages.push({"message" : message_retour_crypte, "extras": extras}) ;
              break;
            case "nausee_histoire_allergie_medicament_detail_1_signe":
            case "bouton_histoire_allergie_medicament_detail_1_signe":
            case "rougeur_histoire_allergie_medicament_detail_1_signe":
            case "oedeme_histoire_allergie_medicament_detail_1_signe":
            case "difficultes_histoire_allergie_medicament_detail_1_signe":
            case "autres_histoire_allergie_medicament_detail_1_signe":
              fonctions.update_variables_firebase("histoire_allergie_medicament_detail_1_signe", message_en_clair, sessionId);
              fonctions.stockage_context("histoire_allergie_medicament_detail_1_signe", message_en_clair, sessionId);
              if(lasession[sessionId].context["histoire_allergie_medicament"] != "1_histoire_allergie_medicament") {
                go_to_question("histoire_allergie_medicament_detail_2");
              }else {
                go_to_question("histoire_allergie_aliments");
              }
              break;
            case "nausee_histoire_allergie_medicament_detail_2_signe":
            case "bouton_histoire_allergie_medicament_detail_2_signe":
            case "rougeur_histoire_allergie_medicament_detail_2_signe":
            case "oedeme_histoire_allergie_medicament_detail_2_signe":
            case "difficultes_histoire_allergie_medicament_detail_2_signe":
            case "autres_histoire_allergie_medicament_detail_2_signe":
              fonctions.update_variables_firebase("histoire_allergie_medicament_detail_2_signe", message_en_clair, sessionId);
              fonctions.stockage_context("histoire_allergie_medicament_detail_2_signe", message_en_clair, sessionId);
              if(lasession[sessionId].context["histoire_allergie_medicament"] == "3_histoire_allergie_medicament") {
                go_to_question("histoire_allergie_medicament_detail_3");
              }else {
                go_to_question("histoire_allergie_aliments");
              }
              break;
            case "nausee_histoire_allergie_medicament_detail_3_signe":
            case "bouton_histoire_allergie_medicament_detail_3_signe":
            case "rougeur_histoire_allergie_medicament_detail_3_signe":
            case "oedeme_histoire_allergie_medicament_detail_3_signe":
            case "difficultes_histoire_allergie_medicament_detail_3_signe":
            case "autres_histoire_allergie_medicament_detail_3_signe":
              fonctions.update_variables_firebase("histoire_allergie_medicament_detail_3_signe", message_en_clair, sessionId);
              fonctions.stockage_context("histoire_allergie_medicament_detail_3_signe", message_en_clair, sessionId);
              go_to_question("histoire_allergie_aliments");
              break;
            case "histoire_allergie_aliments":
              lasession[sessionId].context["question_actuelle"] = "histoire_allergie_aliments";
              var message_retour_crypte = fonctions.base64_encode("Avez-vous des allergies à des aliments ?");
              var extras = {
                "buttons": [{
                    "id" : "Oui_histoire_allergie_aliments",
                    "name" : fonctions.base64_encode("Oui"),
                    "response" : fonctions.base64_encode("Oui_histoire_allergie_aliments"),
                    "value" : fonctions.base64_encode("Oui_histoire_allergie_aliments")
                },
                {
                    "id" : "Non_histoire_allergie_aliments",
                    "name" : fonctions.base64_encode("Non"),
                    "response" : fonctions.base64_encode("Non_histoire_allergie_aliments"),
                    "value" : fonctions.base64_encode("Non_histoire_allergie_aliments")
                }]
              };
              reponse.messages.push({"message" : message_retour_crypte, "extras" : extras}) ;
              break;
            case "Non_histoire_allergie_aliments":
              fonctions.update_variables_firebase("histoire_allergie_aliments", message_en_clair, sessionId);
              fonctions.stockage_context("histoire_allergie_aliments", message_en_clair, sessionId);
              go_to_question("histoire_allergie_latex");
              break;
            case "Oui_histoire_allergie_aliments":
              fonctions.update_variables_firebase("histoire_allergie_aliments", message_en_clair, sessionId);
              fonctions.stockage_context("histoire_allergie_aliments", message_en_clair, sessionId);
              go_to_question("histoire_allergie_aliments_details");
              break;
            case "histoire_allergie_aliments_details":
              lasession[sessionId].context["question_actuelle"] = "histoire_allergie_aliments_details";
              var message_retour_crypte = fonctions.base64_encode("Avez-vous une allergie à un des aliments suivants :");
              var extras = {
                "buttons": [{
                    "id" : "kiwi_histoire_allergie_aliments_details",
                    "name" : fonctions.base64_encode("Kiwi"),
                    "response" : fonctions.base64_encode("kiwi_histoire_allergie_aliments_details"),
                    "value" : fonctions.base64_encode("kiwi_histoire_allergie_aliments_details")
                },
                {
                    "id" : "avocat_histoire_allergie_aliments_details",
                    "name" : fonctions.base64_encode("Avocat"),
                    "response" : fonctions.base64_encode("avocat_histoire_allergie_aliments_details"),
                    "value" : fonctions.base64_encode("avocat_histoire_allergie_aliments_details")
                },{
                    "id" : "banane_histoire_allergie_aliments_details",
                    "name" : fonctions.base64_encode("Banane"),
                    "response" : fonctions.base64_encode("banane_histoire_allergie_aliments_details"),
                    "value" : fonctions.base64_encode("banane_histoire_allergie_aliments_details")
                },
                {
                    "id" : "sarrasin_histoire_allergie_aliments_details",
                    "name" : fonctions.base64_encode("Sarrasin"),
                    "response" : fonctions.base64_encode("sarrasin_histoire_allergie_aliments_details"),
                    "value" : fonctions.base64_encode("sarrasin_histoire_allergie_aliments_details")
                },{
                    "id" : "ficus_histoire_allergie_aliments_details",
                    "name" : fonctions.base64_encode("Ficus"),
                    "response" : fonctions.base64_encode("ficus_histoire_allergie_aliments_details"),
                    "value" : fonctions.base64_encode("ficus_histoire_allergie_aliments_details")
                },
                {
                    "id" : "autre_histoire_allergie_aliments_details",
                    "name" : fonctions.base64_encode("Autre"),
                    "response" : fonctions.base64_encode("autre_histoire_allergie_aliments_details"),
                    "value" : fonctions.base64_encode("autre_histoire_allergie_aliments_details")
                }]
              };
              reponse.messages.push({"message" : message_retour_crypte, "extras" : extras}) ;
              break;
            case "kiwi_histoire_allergie_aliments_details":
            case "avocat_histoire_allergie_aliments_details":
            case "banane_histoire_allergie_aliments_details":
            case "sarrasin_histoire_allergie_aliments_details":
            case "ficus_histoire_allergie_aliments_details":
            case "autre_histoire_allergie_aliments_details":
              fonctions.update_variables_firebase("histoire_allergie_aliments_details", message_en_clair, sessionId);
              fonctions.stockage_context("histoire_allergie_aliments_details", message_en_clair, sessionId);
              go_to_question("histoire_allergie_latex");
              break;
            case "histoire_allergie_latex":
              lasession[sessionId].context["question_actuelle"] = "histoire_allergie_latex";
              var message_retour_crypte = fonctions.base64_encode("Avez-vous une allergie au Latex ?");
              var extras = {
                "buttons": [{
                    "id" : "Oui_histoire_allergie_latex",
                    "name" : fonctions.base64_encode("Oui"),
                    "response" : fonctions.base64_encode("Oui_histoire_allergie_latex"),
                    "value" : fonctions.base64_encode("Oui_histoire_allergie_latex")
                },
                {
                    "id" : "Non_histoire_allergie_latex",
                    "name" : fonctions.base64_encode("Non"),
                    "response" : fonctions.base64_encode("Non_histoire_allergie_latex"),
                    "value" : fonctions.base64_encode("Non_histoire_allergie_latex")
                }]
              };
              reponse.messages.push({"message" : message_retour_crypte, "extras" : extras}) ;
              break;
            case "Non_histoire_allergie_latex":
            case "Oui_histoire_allergie_latex":
              fonctions.update_variables_firebase("histoire_allergie_latex", message_en_clair, sessionId);
              fonctions.stockage_context("histoire_allergie_latex", message_en_clair, sessionId);
              go_to_question("histoire_probleme_cardiaque");
              break;
            case "histoire_probleme_cardiaque":
              lasession[sessionId].context["question_actuelle"] = "histoire_probleme_cardiaque";
              var message_retour_crypte = fonctions.base64_encode("Avez-vous des problèmes cardiaques ?");
              var extras = {
                "buttons": [{
                    "id" : "hta_histoire_probleme_cardiaque",
                    "name" : fonctions.base64_encode("HTA traitée ou lors d'une ancienne grossesse"),
                    "response" : fonctions.base64_encode("hta_histoire_probleme_cardiaque"),
                    "value" : fonctions.base64_encode("hta_histoire_probleme_cardiaque")
                },
                {
                    "id" : "souffle_histoire_probleme_cardiaque",
                    "name" : fonctions.base64_encode("Souffle cardiaque"),
                    "response" : fonctions.base64_encode("souffle_histoire_probleme_cardiaque"),
                    "value" : fonctions.base64_encode("souffle_histoire_probleme_cardiaque")
                },
                {
                    "id" : "trouble_histoire_probleme_cardiaque",
                    "name" : fonctions.base64_encode("Troubles du rythme cardique"),
                    "response" : fonctions.base64_encode("trouble_histoire_probleme_cardiaque"),
                    "value" : fonctions.base64_encode("trouble_histoire_probleme_cardiaque")
                },
                {
                    "id" : "autre_histoire_probleme_cardiaque",
                    "name" : fonctions.base64_encode("Autre"),
                    "response" : fonctions.base64_encode("autre_histoire_probleme_cardiaque"),
                    "value" : fonctions.base64_encode("autre_histoire_probleme_cardiaque")
                }]
              };
              reponse.messages.push({"message" : message_retour_crypte, "extras" : extras}) ;
              break;
            case "autre_histoire_probleme_cardiaque":
            case "trouble_histoire_probleme_cardiaque":
            case "souffle_histoire_probleme_cardiaque":
            case "hta_histoire_probleme_cardiaque":
              fonctions.update_variables_firebase("histoire_probleme_cardiaque", message_en_clair, sessionId);
              fonctions.stockage_context("histoire_probleme_cardiaque", message_en_clair, sessionId);
              go_to_question("histoire_probleme_respiratoire");
              break;
            case "histoire_probleme_respiratoire":
              lasession[sessionId].context["question_actuelle"] = "histoire_probleme_respiratoire";
              var message_retour_crypte = fonctions.base64_encode("Avez-vous des problèmes respiratoires ?");
              var extras = {
                "buttons": [{
                    "id" : "asthme_histoire_probleme_respiratoire",
                    "name" : fonctions.base64_encode("Asthme"),
                    "response" : fonctions.base64_encode("asthme_histoire_probleme_respiratoire"),
                    "value" : fonctions.base64_encode("asthme_histoire_probleme_respiratoire")
                },
                {
                    "id" : "syndrome_histoire_probleme_respiratoire",
                    "name" : fonctions.base64_encode("Syndrome d'apnée du Sommeil"),
                    "response" : fonctions.base64_encode("syndrome_histoire_probleme_respiratoire"),
                    "value" : fonctions.base64_encode("syndrome_histoire_probleme_respiratoire")
                },
                {
                    "id" : "pneumo_histoire_probleme_respiratoire",
                    "name" : fonctions.base64_encode("Pneumothorax"),
                    "response" : fonctions.base64_encode("pneumo_histoire_probleme_respiratoire"),
                    "value" : fonctions.base64_encode("pneumo_histoire_probleme_respiratoire")
                },
                {
                    "id" : "autre_histoire_probleme_respiratoire",
                    "name" : fonctions.base64_encode("Autre"),
                    "response" : fonctions.base64_encode("autre_histoire_probleme_respiratoire"),
                    "value" : fonctions.base64_encode("autre_histoire_probleme_respiratoire")
                }]
              };
              reponse.messages.push({"message" : message_retour_crypte, "extras" : extras}) ;
              break;
            case "autre_histoire_probleme_respiratoire":
            case "pneumo_histoire_probleme_respiratoire":
            case "syndrome_histoire_probleme_respiratoire":
            case "asthme_histoire_probleme_respiratoire":
              fonctions.update_variables_firebase("histoire_probleme_respiratoire", message_en_clair, sessionId);
              fonctions.stockage_context("histoire_probleme_respiratoire", message_en_clair, sessionId);
              go_to_question("histoire_probleme_neurologique");
              break;
            case "histoire_probleme_neurologique":
              lasession[sessionId].context["question_actuelle"] = "histoire_probleme_neurologique";
              var message_retour_crypte = fonctions.base64_encode("Avez-vous des problèmes neurologiques ?");
              var extras = {
                "buttons": [{
                    "id" : "epilepsie_histoire_probleme_neurologique",
                    "name" : fonctions.base64_encode("Epilepsie"),
                    "response" : fonctions.base64_encode("epilepsie_histoire_probleme_neurologique"),
                    "value" : fonctions.base64_encode("epilepsie_histoire_probleme_neurologique")
                },
                {
                    "id" : "sclerose_histoire_probleme_neurologique",
                    "name" : fonctions.base64_encode("Sclérose en plaques"),
                    "response" : fonctions.base64_encode("sclerose_histoire_probleme_neurologique"),
                    "value" : fonctions.base64_encode("sclerose_histoire_probleme_neurologique")
                },
                {
                    "id" : "migraine_histoire_probleme_neurologique",
                    "name" : fonctions.base64_encode("Migraines et céphalée"),
                    "response" : fonctions.base64_encode("migraine_histoire_probleme_neurologique"),
                    "value" : fonctions.base64_encode("migraine_histoire_probleme_neurologique")
                },
                {
                    "id" : "paralysie_histoire_probleme_neurologique",
                    "name" : fonctions.base64_encode("Paralysie"),
                    "response" : fonctions.base64_encode("paralysie_histoire_probleme_neurologique"),
                    "value" : fonctions.base64_encode("paralysie_histoire_probleme_neurologique")
                },
                {
                    "id" : "autre_histoire_probleme_neurologique",
                    "name" : fonctions.base64_encode("Autre"),
                    "response" : fonctions.base64_encode("autre_histoire_probleme_neurologique"),
                    "value" : fonctions.base64_encode("autre_histoire_probleme_neurologique")
                }]
              };
              reponse.messages.push({"message" : message_retour_crypte, "extras" : extras}) ;
              break;
            case "autre_histoire_probleme_neurologique":
            case "paralysie_histoire_probleme_neurologique":
            case "hernie_histoire_probleme_neurologique":
            case "sclerose_histoire_probleme_neurologique":
            case "migraine_histoire_probleme_neurologique":
            case "epilepsie_histoire_probleme_neurologique":
              fonctions.update_variables_firebase("histoire_probleme_neurologique", message_en_clair, sessionId);
              fonctions.stockage_context("histoire_probleme_neurologique", message_en_clair, sessionId);
              go_to_question("histoire_probleme_colonne");
              break;
            case "histoire_probleme_colonne":
              lasession[sessionId].context["question_actuelle"] = "histoire_probleme_colonne";
              var message_retour_crypte = fonctions.base64_encode("Avez vous des problemes de la colonne vertébrale ?");
              var extras = {
                "buttons": [{
                    "id" : "Non_histoire_probleme_colonne",
                    "name" : fonctions.base64_encode("Non"),
                    "response" : fonctions.base64_encode("Non_histoire_probleme_colonne"),
                    "value" : fonctions.base64_encode("Non_histoire_probleme_colonne")
                },
                {
                    "id" : "scoliose_histoire_probleme_colonne",
                    "name" : fonctions.base64_encode("Scolioise"),
                    "response" : fonctions.base64_encode("scoliose_histoire_probleme_colonne"),
                    "value" : fonctions.base64_encode("scoliose_histoire_probleme_colonne")
                },

                {
                    "id" : "autre_histoire_probleme_colonne",
                    "name" : fonctions.base64_encode("Autre"),
                    "response" : fonctions.base64_encode("autre_histoire_probleme_colonne"),
                    "value" : fonctions.base64_encode("autre_histoire_probleme_colonne")
                }]
              };
              reponse.messages.push({"message" : message_retour_crypte, "extras" : extras}) ;
              break;
            case "autre_histoire_probleme_colonne":
            case "scoliose_histoire_probleme_colonne":
            case "Non_histoire_probleme_colonne":
              fonctions.update_variables_firebase("histoire_probleme_colonne", message_en_clair, sessionId);
              fonctions.stockage_context("histoire_probleme_colonne", message_en_clair, sessionId);
              go_to_question("histoire_probleme_anesthesie");
              break;
            case "histoire_probleme_anesthesie":
              lasession[sessionId].context["question_actuelle"] = "histoire_probleme_anesthesie";
              var message_retour_crypte = fonctions.base64_encode("Avez-vous des problémes de famillle liés à l'anesthésie ?");
              var extras = {
                "buttons": [{
                    "id" : "Oui_histoire_probleme_anesthesie",
                    "name" : fonctions.base64_encode("Oui"),
                    "response" : fonctions.base64_encode("Oui_histoire_probleme_anesthesie"),
                    "value" : fonctions.base64_encode("Oui_histoire_probleme_anesthesie")
                },
                {
                    "id" : "Non_histoire_probleme_anesthesie",
                    "name" : fonctions.base64_encode("Non"),
                    "response" : fonctions.base64_encode("Non_histoire_probleme_anesthesie"),
                    "value" : fonctions.base64_encode("Non_histoire_probleme_anesthesie")
                }]
              };
              reponse.messages.push({"message" : message_retour_crypte, "extras" : extras}) ;
              break;
            case "Non_histoire_probleme_anesthesie":
            case "Oui_histoire_probleme_anesthesie":
              fonctions.update_variables_firebase("histoire_probleme_anesthesie", message_en_clair, sessionId);
              fonctions.stockage_context("histoire_probleme_anesthesie", message_en_clair, sessionId);
              go_to_question("histoire_probleme_genetique");
              break;
            case "histoire_probleme_genetique":
              lasession[sessionId].context["question_actuelle"] = "histoire_probleme_genetique";
              var message_retour_crypte = fonctions.base64_encode("Avez-vous une de ces maladies génétiques dans la famille ?");
              var extras = {
                "buttons": [{
                    "id" : "myopathie_histoire_probleme_genetique",
                    "name" : fonctions.base64_encode("Myopathie ou apparenté"),
                    "response" : fonctions.base64_encode("myopathie_histoire_probleme_genetique"),
                    "value" : fonctions.base64_encode("myopathie_histoire_probleme_genetique")
                },
                {
                    "id" : "hemophilie_histoire_probleme_genetique",
                    "name" : fonctions.base64_encode("Maladie favorisant le saignement (Willebrand, Hémophilie, autre)"),
                    "response" : fonctions.base64_encode("hemophilie_histoire_probleme_genetique"),
                    "value" : fonctions.base64_encode("hemophilie_histoire_probleme_genetique")
                },{
                    "id" : "phlebites_histoire_probleme_genetique",
                    "name" : fonctions.base64_encode("Maladie favorisant les phlébites"),
                    "response" : fonctions.base64_encode("phlebites_histoire_probleme_genetique"),
                    "value" : fonctions.base64_encode("phlebites_histoire_probleme_genetique")
                },
                {
                    "id" : "Non_histoire_probleme_genetique",
                    "name" : fonctions.base64_encode("Non"),
                    "response" : fonctions.base64_encode("Non_histoire_probleme_genetique"),
                    "value" : fonctions.base64_encode("Non_histoire_probleme_genetique")
                },{
                    "id" : "autre_histoire_probleme_genetique",
                    "name" : fonctions.base64_encode("Autres"),
                    "response" : fonctions.base64_encode("autre_histoire_probleme_genetique"),
                    "value" : fonctions.base64_encode("autre_histoire_probleme_genetique")
                }]
              };
              reponse.messages.push({"message" : message_retour_crypte, "extras" : extras}) ;
              break;
            case "Non_histoire_probleme_genetique":
            case "phlebites_histoire_probleme_genetique":
            case "hemophilie_histoire_probleme_genetique":
            case "myopathie_histoire_probleme_genetique":
              fonctions.update_variables_firebase("histoire_probleme_genetique", message_en_clair, sessionId);
              fonctions.stockage_context("histoire_probleme_genetique", message_en_clair, sessionId);
              go_to_question("histoire_probleme_hepatique");
              break;
            case "autre_histoire_probleme_genetique":
              lasession[sessionId].context["question_actuelle"] = "autre_histoire_probleme_genetique";
              var message_retour_crypte = fonctions.base64_encode("Précisez s'il vous plaît :");
              reponse.messages.push({"message" : message_retour_crypte}) ;
              break;
            case "histoire_probleme_hepatique":
              lasession[sessionId].context["question_actuelle"] = "histoire_probleme_hepatique";
              var message_retour_crypte = fonctions.base64_encode("Avez-vous eu des problémes hépatiques ?");
              var extras = {
                "buttons": [{
                    "id" : "Oui_histoire_probleme_hepatique",
                    "name" : fonctions.base64_encode("Oui"),
                    "response" : fonctions.base64_encode("Oui_histoire_probleme_hepatique"),
                    "value" : fonctions.base64_encode("Oui_histoire_probleme_hepatique")
                },
                {
                    "id" : "Non_histoire_probleme_hepatique",
                    "name" : fonctions.base64_encode("Non"),
                    "response" : fonctions.base64_encode("Non_histoire_probleme_hepatique"),
                    "value" : fonctions.base64_encode("Non_histoire_probleme_hepatique")
                }]
              };
              reponse.messages.push({"message" : message_retour_crypte, "extras" : extras}) ;
              break;
            case "Non_histoire_probleme_hepatique":
              fonctions.update_variables_firebase("histoire_probleme_hepatique", message_en_clair, sessionId);
              fonctions.stockage_context("histoire_probleme_hepatique", message_en_clair, sessionId);
              go_to_question("histoire_probleme_HIV");
              break;
            case "Oui_histoire_probleme_hepatique":
              lasession[sessionId].context["question_actuelle"] = "Oui_histoire_probleme_hepatique";
              var message_retour_crypte = fonctions.base64_encode("Précisez s'il vous plaît :");
              var extras = {
                 "buttons": [{
                     "id" : "A_Oui_histoire_probleme_hepatique",
                     "name" : fonctions.base64_encode("Hépatite virale A"),
                     "response" : fonctions.base64_encode("A_Oui_histoire_probleme_hepatique"),
                     "value" : fonctions.base64_encode("A_Oui_histoire_probleme_hepatique")
                 },
                 {
                     "id" : "B_Oui_histoire_probleme_hepatique",
                     "name" : fonctions.base64_encode("Hépatite virale B"),
                     "response" : fonctions.base64_encode("B_Oui_histoire_probleme_hepatique"),
                     "value" : fonctions.base64_encode("B_Oui_histoire_probleme_hepatique")
                 },{
                     "id" : "C_Oui_histoire_probleme_hepatique",
                     "name" : fonctions.base64_encode("Hépatite virale C"),
                     "response" : fonctions.base64_encode("C_Oui_histoire_probleme_hepatique"),
                     "value" : fonctions.base64_encode("C_Oui_histoire_probleme_hepatique")
                 },
                 {
                     "id" : "Autre_Oui_histoire_probleme_hepatique",
                     "name" : fonctions.base64_encode("Autre"),
                     "response" : fonctions.base64_encode("Autre_Oui_histoire_probleme_hepatique"),
                     "value" : fonctions.base64_encode("Autre_Oui_histoire_probleme_hepatique")
                 }]
               };
               reponse.messages.push({"message" : message_retour_crypte, "extras" : extras}) ;
               break;
            case "A_Oui_histoire_probleme_hepatique":
            case "B_Oui_histoire_probleme_hepatique":
            case "C_Oui_histoire_probleme_hepatique":
            case "Autre_Oui_histoire_probleme_hepatique":
              fonctions.update_variables_firebase("Oui_histoire_probleme_hepatique", message_en_clair, sessionId);
              fonctions.stockage_context("Oui_histoire_probleme_hepatique", message_en_clair, sessionId);
              go_to_question("histoire_probleme_HIV");
              break;
            case "histoire_probleme_HIV":
              lasession[sessionId].context["question_actuelle"] = "histoire_probleme_HIV";
              var message_retour_crypte = fonctions.base64_encode("Etes vous porteuse du virus du SIDA (HIV) ?");
              var extras = {
                "buttons": [{
                    "id" : "Oui_histoire_probleme_HIV",
                    "name" : fonctions.base64_encode("Oui"),
                    "response" : fonctions.base64_encode("Oui_histoire_probleme_HIV"),
                    "value" : fonctions.base64_encode("Oui_histoire_probleme_HIV")
                },
                {
                    "id" : "Non_histoire_probleme_HIV",
                    "name" : fonctions.base64_encode("Non"),
                    "response" : fonctions.base64_encode("Non_histoire_probleme_HIV"),
                    "value" : fonctions.base64_encode("Non_histoire_probleme_HIV")
                }]
              };
              reponse.messages.push({"message" : message_retour_crypte, "extras" : extras}) ;
              break;
            case "Non_histoire_probleme_HIV":
            case "Oui_histoire_probleme_HIV":
              fonctions.update_variables_firebase("histoire_probleme_HIV", message_en_clair, sessionId);
              fonctions.stockage_context("histoire_probleme_HIV", message_en_clair, sessionId);
              go_to_question("histoire_probleme_drogue");
              break;
            case "histoire_probleme_drogue":
              lasession[sessionId].context["question_actuelle"] = "histoire_probleme_drogue";
              var message_retour_crypte = fonctions.base64_encode("Prenez vous de la drogue ?");
              var extras = {
                "buttons": [
                {
                    "id" : "Non_histoire_probleme_drogue",
                    "name" : fonctions.base64_encode("Non"),
                    "response" : fonctions.base64_encode("Non_histoire_probleme_drogue"),
                    "value" : fonctions.base64_encode("Non_histoire_probleme_drogue")
                },
                {
                    "id" : "Cannabis_histoire_probleme_drogue",
                    "name" : fonctions.base64_encode("Cannabis"),
                    "response" : fonctions.base64_encode("Cannabis_histoire_probleme_drogue"),
                    "value" : fonctions.base64_encode("Cannabis_histoire_probleme_drogue")
                },
                {
                    "id" : "autre_histoire_probleme_drogue",
                    "name" : fonctions.base64_encode("Autre"),
                    "response" : fonctions.base64_encode("autre_histoire_probleme_drogue"),
                    "value" : fonctions.base64_encode("autre_histoire_probleme_drogue")
                }]
              };
              reponse.messages.push({"message" : message_retour_crypte, "extras" : extras}) ;
              break;
            case "autre_histoire_probleme_drogue":
            case "Cannabis_histoire_probleme_drogue":
            case "Non_histoire_probleme_drogue":
              fonctions.update_variables_firebase("histoire_probleme_drogue", message_en_clair, sessionId);
              fonctions.stockage_context("histoire_probleme_drogue", message_en_clair, sessionId);
              go_to_question("histoire_probleme_diabete");
              break;
            case "histoire_probleme_diabete":
              lasession[sessionId].context["question_actuelle"] = "histoire_probleme_diabete";
              var message_retour_crypte = fonctions.base64_encode("Avez-vous du diabète ?");
              var extras = {
                "buttons": [
                {
                    "id" : "gesta_histoire_probleme_diabete",
                    "name" : fonctions.base64_encode("Diabéte gestationel"),
                    "response" : fonctions.base64_encode("gesta_histoire_probleme_diabete"),
                    "value" : fonctions.base64_encode("gesta_histoire_probleme_diabete")
                },
                {
                    "id" : "insulino_comp_histoire_probleme_diabete",
                    "name" : fonctions.base64_encode("Diabéte non insulino-dépendant (comprimés)"),
                    "response" : fonctions.base64_encode("insulino_comp_histoire_probleme_diabete"),
                    "value" : fonctions.base64_encode("insulino_comp_histoire_probleme_diabete")
                },
                {
                    "id" : "insulino_histoire_probleme_diabete",
                    "name" : fonctions.base64_encode("Diabéte insulino-dépendant"),
                    "response" : fonctions.base64_encode("insulino_histoire_probleme_diabete"),
                    "value" : fonctions.base64_encode("insulino_histoire_probleme_diabete")
                },
                {
                    "id" : "limite_histoire_probleme_diabete",
                    "name" : fonctions.base64_encode("Glycémie limite"),
                    "response" : fonctions.base64_encode("limite_histoire_probleme_diabete"),
                    "value" : fonctions.base64_encode("limite_histoire_probleme_diabete")
                },
                {
                    "id" : "Non_histoire_probleme_diabete",
                    "name" : fonctions.base64_encode("Non"),
                    "response" : fonctions.base64_encode("Non_histoire_probleme_diabete"),
                    "value" : fonctions.base64_encode("Non_histoire_probleme_diabete")
                }]
              };
              reponse.messages.push({"message" : message_retour_crypte, "extras" : extras}) ;
              break;
            case "Non_histoire_probleme_diabete":
            case "limite_histoire_probleme_diabete":
            case "insulino_histoire_probleme_diabete":
            case "insulino_comp_histoire_probleme_diabete":
            case "gesta_histoire_probleme_diabete":
              fonctions.update_variables_firebase("histoire_probleme_diabete", message_en_clair, sessionId);
              fonctions.stockage_context("histoire_probleme_diabete", message_en_clair, sessionId);
              go_to_question("histoire_probleme_thyroide");
              break;
            case "histoire_probleme_thyroide":
              lasession[sessionId].context["question_actuelle"] = "histoire_probleme_thyroide";
              var message_retour_crypte = fonctions.base64_encode("Avez vous des problémes de Thyroide ?");
              var extras = {
                "buttons": [{
                    "id" : "Oui_histoire_probleme_thyroide",
                    "name" : fonctions.base64_encode("Oui"),
                    "response" : fonctions.base64_encode("Oui_histoire_probleme_thyroide"),
                    "value" : fonctions.base64_encode("Oui_histoire_probleme_thyroide")
                },
                {
                    "id" : "Non_histoire_probleme_thyroide",
                    "name" : fonctions.base64_encode("Non"),
                    "response" : fonctions.base64_encode("Non_histoire_probleme_thyroide"),
                    "value" : fonctions.base64_encode("Non_histoire_probleme_thyroide")
                }]
              };
              reponse.messages.push({"message" : message_retour_crypte, "extras" : extras}) ;
              break;
            case "Oui_histoire_probleme_thyroide":
            case "Non_histoire_probleme_thyroide":
              fonctions.update_variables_firebase("histoire_probleme_thyroide", message_en_clair, sessionId);
              fonctions.stockage_context("histoire_probleme_thyroide", message_en_clair, sessionId);
              go_to_question("histoire_probleme_reins");
              break;
            case "histoire_probleme_reins":
              lasession[sessionId].context["question_actuelle"] = "histoire_probleme_reins";
              var message_retour_crypte = fonctions.base64_encode("Avez-vous des problèmes renaux ?");
              var extras = {
                "buttons": [
                {
                    "id" : "pye_histoire_probleme_reins",
                    "name" : fonctions.base64_encode("Pyélonéphrite"),
                    "response" : fonctions.base64_encode("pye_histoire_probleme_reins"),
                    "value" : fonctions.base64_encode("pye_histoire_probleme_reins")
                },
                {
                    "id" : "infection_histoire_probleme_reins",
                    "name" : fonctions.base64_encode("Infection urinaire"),
                    "response" : fonctions.base64_encode("infection_histoire_probleme_reins"),
                    "value" : fonctions.base64_encode("infection_histoire_probleme_reins")
                },
                {
                    "id" : "lithiase_histoire_probleme_reins",
                    "name" : fonctions.base64_encode("Lithiase"),
                    "response" : fonctions.base64_encode("lithiase_histoire_probleme_reins"),
                    "value" : fonctions.base64_encode("lithiase_histoire_probleme_reins")
                },
                {
                    "id" : "autre_histoire_probleme_reins",
                    "name" : fonctions.base64_encode("Autres"),
                    "response" : fonctions.base64_encode("autre_histoire_probleme_reins"),
                    "value" : fonctions.base64_encode("autre_histoire_probleme_reins")
                },
                {
                    "id" : "Non_histoire_probleme_reins",
                    "name" : fonctions.base64_encode("Non"),
                    "response" : fonctions.base64_encode("Non_histoire_probleme_reins"),
                    "value" : fonctions.base64_encode("Non_histoire_probleme_reins")
                }]
              };
              reponse.messages.push({"message" : message_retour_crypte, "extras" : extras}) ;
              break;
            case "Non_histoire_probleme_reins":
            case "autre_histoire_probleme_reins":
            case "lithiase_histoire_probleme_reins":
            case "infection_histoire_probleme_reins":
            case "pye_histoire_probleme_reins":
              fonctions.update_variables_firebase("histoire_probleme_reins", message_en_clair, sessionId);
              fonctions.stockage_context("histoire_probleme_reins", message_en_clair, sessionId);
              go_to_question("histoire_probleme_lentilles");
              break;
            case "histoire_probleme_lentilles":
              lasession[sessionId].context["question_actuelle"] = "histoire_probleme_lentilles";
              var message_retour_crypte = fonctions.base64_encode("Avez vous des lentilles de contact ?");
              var extras = {
                "buttons": [{
                    "id" : "Oui_histoire_probleme_lentilles",
                    "name" : fonctions.base64_encode("Oui"),
                    "response" : fonctions.base64_encode("Oui_histoire_probleme_lentilles"),
                    "value" : fonctions.base64_encode("Oui_histoire_probleme_lentilles")
                },
                {
                    "id" : "Non_histoire_probleme_lentilles",
                    "name" : fonctions.base64_encode("Non"),
                    "response" : fonctions.base64_encode("Non_histoire_probleme_lentilles"),
                    "value" : fonctions.base64_encode("Non_histoire_probleme_lentilles")
                }]
              };
              reponse.messages.push({"message" : message_retour_crypte, "extras" : extras}) ;
              break;
            case "Non_histoire_probleme_lentilles":
            case "Oui_histoire_probleme_lentilles":
              fonctions.update_variables_firebase("histoire_probleme_lentilles", message_en_clair, sessionId);
              fonctions.stockage_context("histoire_probleme_lentilles", message_en_clair, sessionId);
              go_to_question("histoire_probleme_glaucome");
              break;
            case "histoire_probleme_glaucome":
              lasession[sessionId].context["question_actuelle"] = "histoire_probleme_glaucome";
              var message_retour_crypte = fonctions.base64_encode("Avez vous un Glaucome ?");
              var extras = {
                "buttons": [{
                    "id" : "Oui_histoire_probleme_glaucome",
                    "name" : fonctions.base64_encode("Oui"),
                    "response" : fonctions.base64_encode("Oui_histoire_probleme_glaucome"),
                    "value" : fonctions.base64_encode("Oui_histoire_probleme_glaucome")
                },
                {
                    "id" : "Non_histoire_probleme_glaucome",
                    "name" : fonctions.base64_encode("Non"),
                    "response" : fonctions.base64_encode("Non_histoire_probleme_glaucome"),
                    "value" : fonctions.base64_encode("Non_histoire_probleme_glaucome")
                }]
              };
              reponse.messages.push({"message" : message_retour_crypte, "extras" : extras}) ;
              break;
            case "Non_histoire_probleme_glaucome":
            case "Oui_histoire_probleme_glaucome":
              fonctions.update_variables_firebase("histoire_probleme_glaucome", message_en_clair, sessionId);
              fonctions.stockage_context("histoire_probleme_glaucome", message_en_clair, sessionId);
              go_to_question("histoire_probleme_fumer");
              break;
            case "histoire_probleme_fumer":
              lasession[sessionId].context["question_actuelle"] = "histoire_probleme_fumer";
              var message_retour_crypte = fonctions.base64_encode("Fumez-vous actuellement ?");
              var extras = {
                "buttons": [{
                    "id" : "Oui_histoire_probleme_fumer",
                    "name" : fonctions.base64_encode("Oui"),
                    "response" : fonctions.base64_encode("Oui_histoire_probleme_fumer"),
                    "value" : fonctions.base64_encode("Oui_histoire_probleme_fumer")
                },
                {
                    "id" : "Non_histoire_probleme_fumer",
                    "name" : fonctions.base64_encode("Non"),
                    "response" : fonctions.base64_encode("Non_histoire_probleme_fumer"),
                    "value" : fonctions.base64_encode("Non_histoire_probleme_fumer")
                }]
              };
              reponse.messages.push({"message" : message_retour_crypte, "extras" : extras}) ;
              break;
            case "Non_histoire_probleme_fumer":
              fonctions.update_variables_firebase("histoire_probleme_fumer", message_en_clair, sessionId);
              fonctions.stockage_context("histoire_probleme_fumer", message_en_clair, sessionId);
              go_to_question("histoire_probleme_fumer_avant_grossesse");
              break;
            case "Oui_histoire_probleme_fumer":
              fonctions.update_variables_firebase("histoire_probleme_fumer", message_en_clair, sessionId);
              fonctions.stockage_context("histoire_probleme_fumer", message_en_clair, sessionId);
              go_to_question("histoire_probleme_fumer_nombre_jour");
              break;
            case "histoire_probleme_fumer_nombre_jour":
              lasession[sessionId].context["question_actuelle"] = "histoire_probleme_fumer_nombre_jour";
              var message_retour_crypte = fonctions.base64_encode("Combien de cigarettes par jour ?");
              reponse.messages.push({"message" : message_retour_crypte}) ;
              break;

            case "histoire_probleme_fumer_avant_grossesse":
              lasession[sessionId].context["question_actuelle"] = "histoire_probleme_fumer_avant_grossesse";
              var message_retour_crypte = fonctions.base64_encode("Fumiez-vous avant votre grossesse ?");
              var extras = {
                "buttons": [{
                    "id" : "Oui_histoire_probleme_fumer_avant_grossesse",
                    "name" : fonctions.base64_encode("Oui"),
                    "response" : fonctions.base64_encode("Oui_histoire_probleme_fumer_avant_grossesse"),
                    "value" : fonctions.base64_encode("Oui_histoire_probleme_fumer_avant_grossesse")
                },
                {
                    "id" : "Non_histoire_probleme_fumer_avant_grossesse",
                    "name" : fonctions.base64_encode("Non"),
                    "response" : fonctions.base64_encode("Non_histoire_probleme_fumer_avant_grossesse"),
                    "value" : fonctions.base64_encode("Non_histoire_probleme_fumer_avant_grossesse")
                }]
              };
              reponse.messages.push({"message" : message_retour_crypte, "extras" : extras}) ;
              break;
            case "Non_histoire_probleme_fumer_avant_grossesse":
              fonctions.update_variables_firebase("histoire_probleme_fumer_avant_grossesse", message_en_clair, sessionId);
              fonctions.stockage_context("histoire_probleme_fumer_avant_grossesse", message_en_clair, sessionId);
              go_to_question("histoire_probleme_dent");
              break;
            case "Oui_histoire_probleme_fumer_avant_grossesse":
              fonctions.update_variables_firebase("histoire_probleme_fumer_avant_grossesse", message_en_clair, sessionId);
              fonctions.stockage_context("histoire_probleme_fumer_avant_grossesse", message_en_clair, sessionId);
              go_to_question("histoire_probleme_fumer_avant_grossesse_nombre_jour");
              break;
            case "histoire_probleme_fumer_avant_grossesse_nombre_jour":
              lasession[sessionId].context["question_actuelle"] = "histoire_probleme_fumer_avant_grossesse_nombre_jour";
              var message_retour_crypte = fonctions.base64_encode("Combien de cigarettes par jour ?");
              reponse.messages.push({"message" : message_retour_crypte}) ;
              break;
            case "histoire_probleme_dent":
              lasession[sessionId].context["question_actuelle"] = "histoire_probleme_dent";
              var message_retour_crypte = fonctions.base64_encode("Portez vous des dents mobiles ou un pivot ?");
              var extras = {
                "buttons": [{
                    "id" : "Oui_histoire_probleme_dent",
                    "name" : fonctions.base64_encode("Oui"),
                    "response" : fonctions.base64_encode("Oui_histoire_probleme_dent"),
                    "value" : fonctions.base64_encode("Oui_histoire_probleme_dent")
                },
                {
                    "id" : "Non_histoire_probleme_dent",
                    "name" : fonctions.base64_encode("Non"),
                    "response" : fonctions.base64_encode("Non_histoire_probleme_dent"),
                    "value" : fonctions.base64_encode("Non_histoire_probleme_dent")
                }]
              };
              reponse.messages.push({"message" : message_retour_crypte, "extras" : extras}) ;
              break;
            case "Non_histoire_probleme_dent":
            case "Oui_histoire_probleme_dent":
              fonctions.update_variables_firebase("histoire_probleme_dent", message_en_clair, sessionId);
              fonctions.stockage_context("histoire_probleme_dent", message_en_clair, sessionId);
              go_to_question("histoire_probleme_medicaux");
              break;
            case "histoire_probleme_medicaux":
              lasession[sessionId].context["question_actuelle"] = "histoire_probleme_medicaux";
              var message_retour_crypte = fonctions.base64_encode("Avez vous d'autres problèmes médicaux à signaler ?");
              var extras = {
                "buttons": [{
                    "id" : "Oui_histoire_probleme_medicaux",
                    "name" : fonctions.base64_encode("Oui"),
                    "response" : fonctions.base64_encode("Oui_histoire_probleme_medicaux"),
                    "value" : fonctions.base64_encode("Oui_histoire_probleme_medicaux")
                },
                {
                    "id" : "Non_histoire_probleme_medicaux",
                    "name" : fonctions.base64_encode("Non"),
                    "response" : fonctions.base64_encode("Non_histoire_probleme_medicaux"),
                    "value" : fonctions.base64_encode("Non_histoire_probleme_medicaux")
                }]
              };
              reponse.messages.push({"message" : message_retour_crypte, "extras" : extras}) ;
              break;
            case "Non_histoire_probleme_medicaux":
              fonctions.update_variables_firebase("histoire_probleme_medicaux", message_en_clair, sessionId);
              fonctions.stockage_context("histoire_probleme_medicaux", message_en_clair, sessionId);
              go_to_question("conclusion_question");
              break;
            case "Oui_histoire_probleme_medicaux":
              fonctions.update_variables_firebase("histoire_probleme_medicaux", message_en_clair, sessionId);
              fonctions.stockage_context("histoire_probleme_medicaux", message_en_clair, sessionId);
              go_to_question("Oui_histoire_probleme_medicaux_details");
              break;
            case "Oui_histoire_probleme_medicaux_details":
              lasession[sessionId].context["question_actuelle"] = "Oui_histoire_probleme_medicaux_details";
              var message_retour_crypte = fonctions.base64_encode("Je vous écoute :");
              reponse.messages.push({"message" : message_retour_crypte}) ;
              break;
            case "conclusion_question":
              lasession[sessionId].context["question_actuelle"] = "conclusion_question";
              var message_retour_crypte = fonctions.base64_encode("Avez vous des questions que vous souhaitez aborder avec votre anesthésiste ?");
              var extras = {
                "buttons": [{
                    "id" : "Oui_conclusion_question",
                    "name" : fonctions.base64_encode("Oui"),
                    "response" : fonctions.base64_encode("Oui_conclusion_question"),
                    "value" : fonctions.base64_encode("Oui_conclusion_question")
                },
                {
                    "id" : "Non_conclusion_question",
                    "name" : fonctions.base64_encode("Non"),
                    "response" : fonctions.base64_encode("Non_conclusion_question"),
                    "value" : fonctions.base64_encode("Non_conclusion_question")
                }]
              };
              reponse.messages.push({"message" : message_retour_crypte, "extras" : extras}) ;
              break;
            case "Non_conclusion_question":
              fonctions.update_variables_firebase("conclusion_question", message_en_clair, sessionId);
              fonctions.stockage_context("conclusion_question", message_en_clair, sessionId);
              go_to_question("fin");
              break;
            case "Oui_conclusion_question":
              fonctions.update_variables_firebase("conclusion_question", message_en_clair, sessionId);
              fonctions.stockage_context("conclusion_question", message_en_clair, sessionId);
              go_to_question("Oui_conclusion_question_details");
              break;
            case "Oui_conclusion_question_details":
              lasession[sessionId].context["question_actuelle"] = "Oui_conclusion_question_details";
              var message_retour_crypte = fonctions.base64_encode("Précisez en quelques mots ou quelques lignes :");
              reponse.messages.push({"message" : message_retour_crypte}) ;
              break;
            case "fin":
              lasession[sessionId].context["question_actuelle"] = "fin";
              var message_retour_crypte1 = fonctions.base64_encode("Merci d'avoir pris le temps de repondre à ces questions. Elles vont permettre de mieux préparer votre consultation d'anesthésie et permettre à votre médecin anesthésiste de se concentrer sur vos questions.");
              var message_retour_crypte2 = fonctions.base64_encode("N'oubliez pas d'apporter vos ordonnances et vos examens pour la consultation d'anesthésie.");
              reponse.messages.push({"message" : message_retour_crypte1}) ;
              reponse.messages.push({"message" : message_retour_crypte2}) ;
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
      go_to_question(pipo.actions_du_bot[0].value);
    } else {
      // Si c'est une date
      if(pipo.datetime) {
        if(lasession[sessionId].context["question_actuelle"] == 'Identito_Date_Naissance'){
          if(fonctions.is_date_sup_today(pipo.datetime[0].value))  {
            // erreur dans la date !
            var msg1 = fonctions.base64_encode("La date saisie est supérieure à aujourd'hui !");
            reponse.messages.push({"message" : msg1}) ;
            go_to_question("Identito_Date_Naissance");
          }
          else if(fonctions.is_date_inf_1950(pipo.datetime[0].value))  {
            // erreur dans la date !
            var msg1 = fonctions.base64_encode("La date saisie est inférieure à 1950 !");
            reponse.messages.push({"message" : msg1}) ;
            go_to_question("Identito_Date_Naissance");
          }
          else  {
            var message_retour_crypte = fonctions.base64_encode(message_en_clair);
            fonctions.update_variables_firebase("Identito_Date_Naissance", message_en_clair, sessionId);
            fonctions.stockage_context("Identito_Date_Naissance", message_en_clair, sessionId);
            // action suivante
            go_to_question("Identito_Mail");
          }
        }
        else if(lasession[sessionId].context["question_actuelle"] == 'grossesse_date_conception') {
          var message_retour_crypte = fonctions.base64_encode(message_en_clair);
          // Calcul de ma date d'accouchement probable :
          // pipo.datetime[0].value = 2014-07-12T00:00:00.000+02:00
          if(fonctions.is_date_sup_today(pipo.datetime[0].value))  {
            // erreur dans la date !
            var msg1 = fonctions.base64_encode("La date saisie est supérieure à aujourd'hui !");
            reponse.messages.push({"message" : msg1}) ;
            go_to_question("Oui_Infos_Etape_1");
          }
          else if(fonctions.is_date_inf_1950(pipo.datetime[0].value))  {
            // erreur dans la date !
            var msg1 = fonctions.base64_encode("La date saisie est inférieure à 1950 !");
            reponse.messages.push({"message" : msg1}) ;
            go_to_question("Oui_Infos_Etape_1");
          }
          else {
            var date_conception = fonctions.date_internationale_to_french(pipo.datetime[0].value);
            // calcul date du terme :
            var date_c = pipo.datetime[0].value;
            var date_en = date_c.split("T");
            var javascript_date_en = new Date(date_en[0]);
            var terme_min = fonctions.addDays(javascript_date_en, 273);
            var date_string_min = terme_min.toISOString().slice(0,10);
            fonctions.update_variables_firebase("terme_39sem", date_string_min, sessionId);
            fonctions.stockage_context("terme_39sem", date_string_min, sessionId);
            var terme_max = fonctions.addDays(javascript_date_en, 287);
            var date_string_max = terme_max.toISOString().slice(0,10);
            fonctions.update_variables_firebase("terme_41sem", date_string_max, sessionId);
            fonctions.stockage_context("terme_41sem", date_string_max, sessionId);
            fonctions.update_variables_firebase("grossesse_date_conception", date_conception, sessionId);
            fonctions.stockage_context("grossesse_date_conception", date_conception, sessionId);
            go_to_question("grossesse_PMA");
          }

        }
        else if(lasession[sessionId].context["question_actuelle"]  == 'grossesse_date_de_enfant_1') {

          if(fonctions.is_date_sup_today(pipo.datetime[0].value))  {
            // erreur dans la date !
            var msg1 = fonctions.base64_encode("La date saisie est supérieure à aujourd'hui !");
            reponse.messages.push({"message" : msg1}) ;
            go_to_question("grossesse_date_de_enfant_1");
          }
          else if(fonctions.is_date_inf_1950(pipo.datetime[0].value))  {
            // erreur dans la date !
            var msg1 = fonctions.base64_encode("La date saisie est inférieure à 1950 !");
            reponse.messages.push({"message" : msg1}) ;
            go_to_question("grossesse_date_de_enfant_1");
          }
          else  {
            var message_retour_crypte = fonctions.base64_encode(message_en_clair);
            fonctions.update_variables_firebase("grossesse_date_de_enfant_1", message_en_clair, sessionId);
            fonctions.stockage_context("grossesse_date_de_enfant_1", message_en_clair, sessionId);
            go_to_question("grossesse_enfant_accouchement_du_1");
          }

        }
        else if(lasession[sessionId].context["question_actuelle"]  == 'grossesse_date_de_enfant_2') {
          if(fonctions.is_date_sup_today(pipo.datetime[0].value))  {
            // erreur dans la date !
            var msg1 = fonctions.base64_encode("La date saisie est supérieure à aujourd'hui !");
            reponse.messages.push({"message" : msg1}) ;
            go_to_question("grossesse_date_de_enfant_2");
          }
          else if(fonctions.is_date_inf_1950(pipo.datetime[0].value))  {
            // erreur dans la date !
            var msg1 = fonctions.base64_encode("La date saisie est inférieure à 1950 !");
            reponse.messages.push({"message" : msg1}) ;
            go_to_question("grossesse_date_de_enfant_2");
          }
          else  {
            var message_retour_crypte = fonctions.base64_encode(message_en_clair);
            fonctions.update_variables_firebase("grossesse_date_de_enfant_2", message_en_clair, sessionId);
            fonctions.stockage_context("grossesse_date_de_enfant_2", message_en_clair, sessionId);
            go_to_question("grossesse_enfant_accouchement_du_2");
          }

        }
        else if(lasession[sessionId].context["question_actuelle"]  == 'grossesse_date_de_enfant_3') {
          if(fonctions.is_date_sup_today(pipo.datetime[0].value))  {
            // erreur dans la date !
            var msg1 = fonctions.base64_encode("La date saisie est supérieure à aujourd'hui !");
            reponse.messages.push({"message" : msg1}) ;
            go_to_question("grossesse_date_de_enfant_3");
          }
          else if(fonctions.is_date_inf_1950(pipo.datetime[0].value))  {
            // erreur dans la date !
            var msg1 = fonctions.base64_encode("La date saisie est inférieure à 1950 !");
            reponse.messages.push({"message" : msg1}) ;
            go_to_question("grossesse_date_de_enfant_3");
          }
          else  {
            var message_retour_crypte = fonctions.base64_encode(message_en_clair);
            fonctions.update_variables_firebase("grossesse_date_de_enfant_3", message_en_clair, sessionId);
            fonctions.stockage_context("grossesse_date_de_enfant_3", message_en_clair, sessionId);
            go_to_question("grossesse_enfant_accouchement_du_3");
          }

        }
        else if(lasession[sessionId].context["question_actuelle"]  == 'grossesse_date_de_enfant_4') {
          if(fonctions.is_date_sup_today(pipo.datetime[0].value))  {
            // erreur dans la date !
            var msg1 = fonctions.base64_encode("La date saisie est supérieure à aujourd'hui !");
            reponse.messages.push({"message" : msg1}) ;
            go_to_question("grossesse_date_de_enfant_4");
          }
          else if(fonctions.is_date_inf_1950(pipo.datetime[0].value))  {
            // erreur dans la date !
            var msg1 = fonctions.base64_encode("La date saisie est inférieure à 1950 !");
            reponse.messages.push({"message" : msg1}) ;
            go_to_question("grossesse_date_de_enfant_4");
          }
          else  {
            var message_retour_crypte = fonctions.base64_encode(message_en_clair);
            fonctions.update_variables_firebase("grossesse_date_de_enfant_4", message_en_clair, sessionId);
            fonctions.stockage_context("grossesse_date_de_enfant_4", message_en_clair, sessionId);
            go_to_question("grossesse_enfant_accouchement_du_4");
          }

        }
        else if(lasession[sessionId].context["question_actuelle"]  == 'grossesse_date_de_enfant_5') {
          if(fonctions.is_date_sup_today(pipo.datetime[0].value))  {
            // erreur dans la date !
            var msg1 = fonctions.base64_encode("La date saisie est supérieure à aujourd'hui !");
            reponse.messages.push({"message" : msg1}) ;
            go_to_question("grossesse_date_de_enfant_5");
          }
          else if(fonctions.is_date_inf_1950(pipo.datetime[0].value))  {
            // erreur dans la date !
            var msg1 = fonctions.base64_encode("La date saisie est inférieure à 1950 !");
            reponse.messages.push({"message" : msg1}) ;
            go_to_question("grossesse_date_de_enfant_5");
          }
          else  {
            var message_retour_crypte = fonctions.base64_encode(message_en_clair);
            fonctions.update_variables_firebase("grossesse_date_de_enfant_5", message_en_clair, sessionId);
            fonctions.stockage_context("grossesse_date_de_enfant_5", message_en_clair, sessionId);
            go_to_question("grossesse_enfant_accouchement_du_5");
          }

        }
        else if(lasession[sessionId].context["question_actuelle"]  == 'grossesse_date_de_enfant_6') {
          if(fonctions.is_date_sup_today(pipo.datetime[0].value))  {
            // erreur dans la date !
            var msg1 = fonctions.base64_encode("La date saisie est supérieure à aujourd'hui !");
            reponse.messages.push({"message" : msg1}) ;
            go_to_question("grossesse_date_de_enfant_6");
          }
          else if(fonctions.is_date_inf_1950(pipo.datetime[0].value))  {
            // erreur dans la date !
            var msg1 = fonctions.base64_encode("La date saisie est inférieure à 1950 !");
            reponse.messages.push({"message" : msg1}) ;
            go_to_question("grossesse_date_de_enfant_6");
          }
          else  {
            var message_retour_crypte = fonctions.base64_encode(message_en_clair);
            fonctions.update_variables_firebase("grossesse_date_de_enfant_6", message_en_clair, sessionId);
            fonctions.stockage_context("grossesse_date_de_enfant_6", message_en_clair, sessionId);
            go_to_question("grossesse_enfant_accouchement_du_6");
          }

        }
        else if(lasession[sessionId].context["question_actuelle"]  == 'grossesse_enfant_anesthesie_conditions_details_du_1') {
          if(fonctions.is_date_sup_today(pipo.datetime[0].value))  {
            // erreur dans la date !
            var msg1 = fonctions.base64_encode("La date saisie est supérieure à aujourd'hui !");
            reponse.messages.push({"message" : msg1}) ;
            go_to_question("grossesse_enfant_anesthesie_conditions_details_du_1");
          }
          else if(fonctions.is_date_inf_1950(pipo.datetime[0].value))  {
            // erreur dans la date !
            var msg1 = fonctions.base64_encode("La date saisie est inférieure à 1950 !");
            reponse.messages.push({"message" : msg1}) ;
            go_to_question("grossesse_enfant_anesthesie_conditions_details_du_1");
          }
          else  {
            var message_retour_crypte = fonctions.base64_encode(message_en_clair);
            fonctions.update_variables_firebase("grossesse_enfant_anesthesie_conditions_details_du_1", message_en_clair, sessionId);
            fonctions.stockage_context("grossesse_enfant_anesthesie_conditions_details_du_1", message_en_clair, sessionId);
            go_to_question("grossesse_enfant_complications_du_1");
          }

        }
        else if(lasession[sessionId].context["question_actuelle"]  == 'grossesse_enfant_anesthesie_conditions_details_du_2') {
          if(fonctions.is_date_sup_today(pipo.datetime[0].value))  {
            // erreur dans la date !
            var msg1 = fonctions.base64_encode("La date saisie est supérieure à aujourd'hui !");
            reponse.messages.push({"message" : msg1}) ;
            go_to_question("grossesse_enfant_anesthesie_conditions_details_du_2");
          }
          else if(fonctions.is_date_inf_1950(pipo.datetime[0].value))  {
            // erreur dans la date !
            var msg1 = fonctions.base64_encode("La date saisie est inférieure à 1950 !");
            reponse.messages.push({"message" : msg1}) ;
            go_to_question("grossesse_enfant_anesthesie_conditions_details_du_2");
          }
          else  {
            var message_retour_crypte = fonctions.base64_encode(message_en_clair);
            fonctions.update_variables_firebase("grossesse_enfant_anesthesie_conditions_details_du_2", message_en_clair, sessionId);
            fonctions.stockage_context("grossesse_enfant_anesthesie_conditions_details_du_2", message_en_clair, sessionId);
            go_to_question("grossesse_enfant_complications_du_2");
          }

        }
        else if(lasession[sessionId].context["question_actuelle"]  == 'grossesse_enfant_anesthesie_conditions_details_du_3') {
          if(fonctions.is_date_sup_today(pipo.datetime[0].value))  {
            // erreur dans la date !
            var msg1 = fonctions.base64_encode("La date saisie est supérieure à aujourd'hui !");
            reponse.messages.push({"message" : msg1}) ;
            go_to_question("grossesse_enfant_anesthesie_conditions_details_du_3");
          }
          else if(fonctions.is_date_inf_1950(pipo.datetime[0].value))  {
            // erreur dans la date !
            var msg1 = fonctions.base64_encode("La date saisie est inférieure à 1950 !");
            reponse.messages.push({"message" : msg1}) ;
            go_to_question("grossesse_enfant_anesthesie_conditions_details_du_3");
          }
          else  {
            var message_retour_crypte = fonctions.base64_encode(message_en_clair);
            fonctions.update_variables_firebase("grossesse_enfant_anesthesie_conditions_details_du_3", message_en_clair, sessionId);
            fonctions.stockage_context("grossesse_enfant_anesthesie_conditions_details_du_3", message_en_clair, sessionId);
            go_to_question("grossesse_enfant_complications_du_3");
          }

        }
        else if(lasession[sessionId].context["question_actuelle"]  == 'grossesse_enfant_anesthesie_conditions_details_du_4') {
          if(fonctions.is_date_sup_today(pipo.datetime[0].value))  {
            // erreur dans la date !
            var msg1 = fonctions.base64_encode("La date saisie est supérieure à aujourd'hui !");
            reponse.messages.push({"message" : msg1}) ;
            go_to_question("grossesse_enfant_anesthesie_conditions_details_du_4");
          }
          else if(fonctions.is_date_inf_1950(pipo.datetime[0].value))  {
            // erreur dans la date !
            var msg1 = fonctions.base64_encode("La date saisie est inférieure à 1950 !");
            reponse.messages.push({"message" : msg1}) ;
            go_to_question("grossesse_enfant_anesthesie_conditions_details_du_4");
          }
          else  {
            var message_retour_crypte = fonctions.base64_encode(message_en_clair);
            fonctions.update_variables_firebase("grossesse_enfant_anesthesie_conditions_details_du_4", message_en_clair, sessionId);
            fonctions.stockage_context("grossesse_enfant_anesthesie_conditions_details_du_4", message_en_clair, sessionId);
            go_to_question("grossesse_enfant_complications_du_4");
          }

        }
        else if(lasession[sessionId].context["question_actuelle"]  == 'grossesse_enfant_anesthesie_conditions_details_du_5') {
          if(fonctions.is_date_sup_today(pipo.datetime[0].value))  {
            // erreur dans la date !
            var msg1 = fonctions.base64_encode("La date saisie est supérieure à aujourd'hui !");
            reponse.messages.push({"message" : msg1}) ;
            go_to_question("grossesse_enfant_anesthesie_conditions_details_du_5");
          }
          else if(fonctions.is_date_inf_1950(pipo.datetime[0].value))  {
            // erreur dans la date !
            var msg1 = fonctions.base64_encode("La date saisie est inférieure à 1950 !");
            reponse.messages.push({"message" : msg1}) ;
            go_to_question("grossesse_enfant_anesthesie_conditions_details_du_5");
          }
          else  {
            var message_retour_crypte = fonctions.base64_encode(message_en_clair);
            fonctions.update_variables_firebase("grossesse_enfant_anesthesie_conditions_details_du_5", message_en_clair, sessionId);
            fonctions.stockage_context("grossesse_enfant_anesthesie_conditions_details_du_5", message_en_clair, sessionId);
            go_to_question("grossesse_enfant_complications_du_5");
          }

        }
        else if(lasession[sessionId].context["question_actuelle"]  == 'grossesse_enfant_anesthesie_conditions_details_du_6') {
          if(fonctions.is_date_sup_today(pipo.datetime[0].value))  {
            // erreur dans la date !
            var msg1 = fonctions.base64_encode("La date saisie est supérieure à aujourd'hui !");
            reponse.messages.push({"message" : msg1}) ;
            go_to_question("grossesse_enfant_anesthesie_conditions_details_du_6");
          }
          else if(fonctions.is_date_inf_1950(pipo.datetime[0].value))  {
            // erreur dans la date !
            var msg1 = fonctions.base64_encode("La date saisie est inférieure à 1950 !");
            reponse.messages.push({"message" : msg1}) ;
            go_to_question("grossesse_enfant_anesthesie_conditions_details_du_6");
          }
          else  {
            var message_retour_crypte = fonctions.base64_encode(message_en_clair);
            fonctions.update_variables_firebase("grossesse_enfant_anesthesie_conditions_details_du_6", message_en_clair, sessionId);
            fonctions.stockage_context("grossesse_enfant_anesthesie_conditions_details_du_6", message_en_clair, sessionId);
            go_to_question("grossesse_enfant_complications_du_6");
          }

        }
        else if(lasession[sessionId].context["question_actuelle"] == 'passechir_operation_annee_1') {
          if(fonctions.is_date_sup_today(pipo.datetime[0].value))  {
            // erreur dans la date !
            var msg1 = fonctions.base64_encode("La date saisie est supérieure à aujourd'hui !");
            reponse.messages.push({"message" : msg1}) ;
            go_to_question("passechir_operation_annee_1");
          }
          else if(fonctions.is_date_inf_1950(pipo.datetime[0].value))  {
            // erreur dans la date !
            var msg1 = fonctions.base64_encode("La date saisie est inférieure à 1950 !");
            reponse.messages.push({"message" : msg1}) ;
            go_to_question("passechir_operation_annee_1");
          }
          else  {
            var message_retour_crypte = fonctions.base64_encode(message_en_clair);
            fonctions.update_variables_firebase("passechir_operation_annee_1", message_en_clair, sessionId);
            fonctions.stockage_context("passechir_operation_annee_1", message_en_clair, sessionId);
            go_to_question("passechir_type_1");
          }

        }
        else if(lasession[sessionId].context["question_actuelle"] == 'passechir_operation_annee_2') {
          if(fonctions.is_date_sup_today(pipo.datetime[0].value))  {
            // erreur dans la date !
            var msg1 = fonctions.base64_encode("La date saisie est supérieure à aujourd'hui !");
            reponse.messages.push({"message" : msg1}) ;
            go_to_question("passechir_operation_annee_2");
          }
          else if(fonctions.is_date_inf_1950(pipo.datetime[0].value))  {
            // erreur dans la date !
            var msg1 = fonctions.base64_encode("La date saisie est inférieure à 1950 !");
            reponse.messages.push({"message" : msg1}) ;
            go_to_question("passechir_operation_annee_2");
          }
          else  {
            var message_retour_crypte = fonctions.base64_encode(message_en_clair);
            fonctions.update_variables_firebase("passechir_operation_annee_2", message_en_clair, sessionId);
            fonctions.stockage_context("passechir_operation_annee_2", message_en_clair, sessionId);
            go_to_question("passechir_type_2");
          }

        }
        else if(lasession[sessionId].context["question_actuelle"] == 'passechir_operation_annee_3') {
          if(fonctions.is_date_sup_today(pipo.datetime[0].value))  {
            // erreur dans la date !
            var msg1 = fonctions.base64_encode("La date saisie est supérieure à aujourd'hui !");
            reponse.messages.push({"message" : msg1}) ;
            go_to_question("passechir_operation_annee_3");
          }
          else if(fonctions.is_date_inf_1950(pipo.datetime[0].value))  {
            // erreur dans la date !
            var msg1 = fonctions.base64_encode("La date saisie est inférieure à 1950 !");
            reponse.messages.push({"message" : msg1}) ;
            go_to_question("passechir_operation_annee_3");
          }
          else  {
            var message_retour_crypte = fonctions.base64_encode(message_en_clair);
            fonctions.update_variables_firebase("passechir_operation_annee_3", message_en_clair, sessionId);
            fonctions.stockage_context("passechir_operation_annee_3", message_en_clair, sessionId);
            go_to_question("passechir_type_3");
          }

        }
        else if(lasession[sessionId].context["question_actuelle"] == "histoire_transfusion_annee") {
          if(fonctions.is_date_sup_today(pipo.datetime[0].value))  {
            // erreur dans la date !
            var msg1 = fonctions.base64_encode("La date saisie est supérieure à aujourd'hui !");
            reponse.messages.push({"message" : msg1}) ;
            go_to_question("histoire_transfusion_annee");
          }
          else if(fonctions.is_date_inf_1950(pipo.datetime[0].value))  {
            // erreur dans la date !
            var msg1 = fonctions.base64_encode("La date saisie est inférieure à 1950 !");
            reponse.messages.push({"message" : msg1}) ;
            go_to_question("histoire_transfusion_annee");
          }
          else  {
            var message_retour_crypte = fonctions.base64_encode(message_en_clair);
            fonctions.update_variables_firebase("histoire_transfusion_annee", message_en_clair, sessionId);
            fonctions.stockage_context("histoire_transfusion_annee", message_en_clair, sessionId);
            go_to_question("histoire_transfusion_type_intervention");
          }

        }
        else {
          // la suite des dates
        }
      }
      else if(pipo.email) {
         if(lasession[sessionId].context["question_actuelle"] == 'Identito_Mail') {
          fonctions.update_variables_firebase("Identito_Mail", message_en_clair, sessionId);
          fonctions.stockage_context("Identito_Mail", message_en_clair, sessionId);
          // action suivante
          go_to_question("Identito_Recap");
        }
      }
      else {
        // Traitement ici des questions à saisie libre
        if(lasession[sessionId].context["question_actuelle"] == 'Oui_femme_mariee') {
          // c'est donc la réponse au nom de femme mariée
          var message_retour_crypte = fonctions.base64_encode(message_en_clair);
          fonctions.update_variables_firebase("Identito_Nom_Marital_Nom", message_en_clair, sessionId);
          fonctions.stockage_context("Identito_Nom_Marital_Nom", message_en_clair, sessionId);
          go_to_question("Identito_Prenom");
        }
        else if(lasession[sessionId].context["question_actuelle"] == 'Identito_Prenom') {
          var message_retour_crypte = fonctions.base64_encode(message_en_clair);
          fonctions.update_variables_firebase("Identito_Prenom", message_en_clair, sessionId);
          fonctions.stockage_context("Identito_Prenom", message_en_clair, sessionId);
          // action suivante
          go_to_question("Identito_Date_Naissance");
        }
        //grossesse_enfant_anesthesie_conditions_details_du_1 à 7
        else if(lasession[sessionId].context["question_actuelle"] == 'grossesse_enfant_anesthesie_conditions_details_du_1') {
          var message_retour_crypte = fonctions.base64_encode(message_en_clair);
          fonctions.update_variables_firebase("grossesse_enfant_anesthesie_conditions_details_du_1", message_en_clair, sessionId);
          fonctions.stockage_context("grossesse_enfant_anesthesie_conditions_details_du_1", message_en_clair, sessionId);
          // action suivante
          go_to_question("grossesse_enfant_complications_du_1");
        }
        else if(lasession[sessionId].context["question_actuelle"] == 'grossesse_enfant_anesthesie_conditions_details_du_2') {
          var message_retour_crypte = fonctions.base64_encode(message_en_clair);
          fonctions.update_variables_firebase("grossesse_enfant_anesthesie_conditions_details_du_2", message_en_clair, sessionId);
          fonctions.stockage_context("grossesse_enfant_anesthesie_conditions_details_du_2", message_en_clair, sessionId);
          // action suivante
          go_to_question("grossesse_enfant_complications_du_2");
        }
        else if(lasession[sessionId].context["question_actuelle"] == 'grossesse_enfant_anesthesie_conditions_details_du_3') {
          var message_retour_crypte = fonctions.base64_encode(message_en_clair);
          fonctions.update_variables_firebase("grossesse_enfant_anesthesie_conditions_details_du_3", message_en_clair, sessionId);
          fonctions.stockage_context("grossesse_enfant_anesthesie_conditions_details_du_3", message_en_clair, sessionId);
          // action suivante
          go_to_question("grossesse_enfant_complications_du_3");
        }
        else if(lasession[sessionId].context["question_actuelle"] == 'grossesse_enfant_anesthesie_conditions_details_du_4') {
          var message_retour_crypte = fonctions.base64_encode(message_en_clair);
          fonctions.update_variables_firebase("grossesse_enfant_anesthesie_conditions_details_du_4", message_en_clair, sessionId);
          fonctions.stockage_context("grossesse_enfant_anesthesie_conditions_details_du_4", message_en_clair, sessionId);
          // action suivante
          go_to_question("grossesse_enfant_complications_du_4");
        }
        else if(lasession[sessionId].context["question_actuelle"] == 'grossesse_enfant_anesthesie_conditions_details_du_5') {
          var message_retour_crypte = fonctions.base64_encode(message_en_clair);
          fonctions.update_variables_firebase("grossesse_enfant_anesthesie_conditions_details_du_5", message_en_clair, sessionId);
          fonctions.stockage_context("grossesse_enfant_anesthesie_conditions_details_du_5", message_en_clair, sessionId);
          // action suivante
          go_to_question("grossesse_enfant_complications_du_5");
        }
        else if(lasession[sessionId].context["question_actuelle"] == 'grossesse_enfant_anesthesie_conditions_details_du_6') {
          var message_retour_crypte = fonctions.base64_encode(message_en_clair);
          fonctions.update_variables_firebase("grossesse_enfant_anesthesie_conditions_details_du_6", message_en_clair, sessionId);
          fonctions.stockage_context("grossesse_enfant_anesthesie_conditions_details_du_6", message_en_clair, sessionId);
          // action suivante
          go_to_question("grossesse_enfant_complications_du_6");
        }
        else if(lasession[sessionId].context["question_actuelle"] == 'grossesse_enfant_anesthesie_conditions_details_du_7') {
          var message_retour_crypte = fonctions.base64_encode(message_en_clair);
          fonctions.update_variables_firebase("grossesse_enfant_anesthesie_conditions_details_du_7", message_en_clair, sessionId);
          fonctions.stockage_context("grossesse_enfant_anesthesie_conditions_details_du_7", message_en_clair, sessionId);
          // action suivante
          go_to_question("grossesse_enfant_complications_du_7");
        }
        else if(lasession[sessionId].context["question_actuelle"] == 'patient_taille') {
          var taille_recue = Number(message_en_clair);
          console.log("Taille" + taille_recue);
          if(taille_recue % 1 == 0 ||  isNaN(taille_recue) || taille_recue == undefined) {
            var message_retour_crypte1 = fonctions.base64_encode("Je n'ai pas compris votre taille en mètres.");
            var message_retour_crypte2 = fonctions.base64_encode("Exemple : Tapez 1.72");
            reponse.messages.push({"message" : message_retour_crypte1});
            reponse.messages.push({"message" : message_retour_crypte2});
            go_to_question("patient_taille");
          }else {
            fonctions.update_variables_firebase("patient_taille", message_en_clair, sessionId);
            fonctions.stockage_context("patient_taille", message_en_clair, sessionId);
            // action suivante
            go_to_question("patient_poids_avant_grossesse");
          }
        }
        else if(lasession[sessionId].context["question_actuelle"] == 'patient_poids_avant_grossesse') {
          var taille_recue = Number(message_en_clair);
          if(taille_recue % 1 === 0){
            fonctions.update_variables_firebase("patient_poids_avant_grossesse", message_en_clair, sessionId);
            fonctions.stockage_context("patient_poids_avant_grossesse", message_en_clair, sessionId);
            var patient_taille = lasession[sessionId].context["patient_taille"];
            var imc_avant_grossesse = Math.round(taille_recue/(patient_taille*patient_taille));
            fonctions.update_variables_firebase("imc_avant_grossesse", imc_avant_grossesse, sessionId);
            fonctions.stockage_context("imc_avant_grossesse", imc_avant_grossesse, sessionId);
            go_to_question("patient_poids_actuel");
          }else {
            var message_retour_crypte1 = fonctions.base64_encode("Je n'ai pas compris votre poids avant la grosses (en kg).");
            var message_retour_crypte2 = fonctions.base64_encode("Exemple : Tapez 59");
            reponse.messages.push({"message" : message_retour_crypte1});
            reponse.messages.push({"message" : message_retour_crypte2});
            go_to_question("patient_poids_avant_grossesse");
          }
        }
        else if(lasession[sessionId].context["question_actuelle"] == 'patient_poids_actuel') {
          var taille_recue = Number(message_en_clair);
          if(taille_recue % 1 === 0){
            fonctions.update_variables_firebase("patient_poids_actuel", message_en_clair, sessionId);
            fonctions.stockage_context("patient_poids_actuel", message_en_clair, sessionId);
            var patient_taille = lasession[sessionId].context["patient_taille"];
            var imc_actuel = Math.round(taille_recue/(patient_taille*patient_taille));
            fonctions.update_variables_firebase("imc_actuel", imc_actuel, sessionId);
            fonctions.stockage_context("imc_actuel", imc_actuel, sessionId);
            go_to_question("passechir_operation"); // A finir
          }else {
            var message_retour_crypte1 = fonctions.base64_encode("Je n'ai pas compris votre poids actuel (en kg).");
            var message_retour_crypte2 = fonctions.base64_encode("Exemple : Tapez 54");
            reponse.messages.push({"message" : message_retour_crypte1});
            reponse.messages.push({"message" : message_retour_crypte2});
            go_to_question("patient_poids_actuel");
          }
        }
        else if(lasession[sessionId].context["question_actuelle"] == 'passechir_type_1') {
          var message_retour_crypte = fonctions.base64_encode(message_en_clair);
          fonctions.update_variables_firebase("passechir_type_1", message_en_clair, sessionId);
          fonctions.stockage_context("passechir_type_1", message_en_clair, sessionId);
          go_to_question("passechir_bienpasse_1");
        }
        else if(lasession[sessionId].context["question_actuelle"] == 'passechir_type_2') {
          var message_retour_crypte = fonctions.base64_encode(message_en_clair);
          fonctions.update_variables_firebase("passechir_type_2", message_en_clair, sessionId);
          fonctions.stockage_context("passechir_type_2", message_en_clair, sessionId);
          go_to_question("passechir_bienpasse_2");
        }
        else if(lasession[sessionId].context["question_actuelle"] == 'passechir_type_3') {
          var message_retour_crypte = fonctions.base64_encode(message_en_clair);
          fonctions.update_variables_firebase("passechir_type_3", message_en_clair, sessionId);
          fonctions.stockage_context("passechir_type_3", message_en_clair, sessionId);
          go_to_question("passechir_bienpasse_3");
        }
        else if(lasession[sessionId].context["question_actuelle"] == 'passechir_details_anesthesie_1') {
          var message_retour_crypte = fonctions.base64_encode(message_en_clair);
          fonctions.update_variables_firebase("passechir_details_anesthesie_1", message_en_clair, sessionId);
          fonctions.stockage_context("passechir_details_anesthesie_1", message_en_clair, sessionId);
          go_to_question("Existence_passechir_autre_1");
        }
        else if(lasession[sessionId].context["question_actuelle"] == 'passechir_details_anesthesie_2') {
          var message_retour_crypte = fonctions.base64_encode(message_en_clair);
          fonctions.update_variables_firebase("passechir_details_anesthesie_2", message_en_clair, sessionId);
          fonctions.stockage_context("passechir_details_anesthesie_2", message_en_clair, sessionId);
          go_to_question("Existence_passechir_autre_2");
        }
        else if(lasession[sessionId].context["question_actuelle"] == 'passechir_details_anesthesie_3') {
          var message_retour_crypte = fonctions.base64_encode(message_en_clair);
          fonctions.update_variables_firebase("passechir_details_anesthesie_3", message_en_clair, sessionId);
          fonctions.stockage_context("passechir_details_anesthesie_3", message_en_clair, sessionId);
          go_to_question("histoire_traitement");
        }
        else if(lasession[sessionId].context["question_actuelle"] == 'histoire_traitement_en_cours') {
          var message_retour_crypte = fonctions.base64_encode(message_en_clair);
          fonctions.update_variables_firebase("histoire_traitement_en_cours", message_en_clair, sessionId);
          fonctions.stockage_context("histoire_traitement_en_cours", message_en_clair, sessionId);
          go_to_question("histoire_phlebite_embolie");
        }
        else if(lasession[sessionId].context["question_actuelle"] == 'histoire_transfusion_type_intervention') {
          var message_retour_crypte = fonctions.base64_encode(message_en_clair);
          fonctions.update_variables_firebase("histoire_transfusion_type_intervention", message_en_clair, sessionId);
          fonctions.stockage_context("histoire_transfusion_type_intervention", message_en_clair, sessionId);
          go_to_question("histoire_allergie_medicament");
        }
        else if(lasession[sessionId].context["question_actuelle"] == 'histoire_allergie_medicament_detail_2')  {
          var message_retour_crypte = fonctions.base64_encode(message_en_clair);
          fonctions.update_variables_firebase("histoire_allergie_medicament_detail_2", message_en_clair, sessionId);
          fonctions.stockage_context("histoire_allergie_medicament_detail_2", message_en_clair, sessionId);
          go_to_question("histoire_allergie_medicament_detail_2_signe");
        }
        else if(lasession[sessionId].context["question_actuelle"] == 'histoire_allergie_medicament_detail_3')  {
          var message_retour_crypte = fonctions.base64_encode(message_en_clair);
          fonctions.update_variables_firebase("histoire_allergie_medicament_detail_3", message_en_clair, sessionId);
          fonctions.stockage_context("histoire_allergie_medicament_detail_3", message_en_clair, sessionId);
          go_to_question("histoire_allergie_medicament_detail_3_signe");
        }
        else if(lasession[sessionId].context["question_actuelle"] == 'autre_histoire_probleme_genetique') {
          var message_retour_crypte = fonctions.base64_encode(message_en_clair);
          fonctions.update_variables_firebase("autre_histoire_probleme_genetique", message_en_clair, sessionId);
          fonctions.stockage_context("autre_histoire_probleme_genetique", message_en_clair, sessionId);
          go_to_question("histoire_probleme_hepatique");
        }
        else if(lasession[sessionId].context["question_actuelle"] == "histoire_probleme_fumer_nombre_jour") {
          var message_retour_crypte = fonctions.base64_encode(message_en_clair);
          fonctions.update_variables_firebase("histoire_probleme_fumer_nombre_jour", message_en_clair, sessionId);
          fonctions.stockage_context("histoire_probleme_fumer_nombre_jour", message_en_clair, sessionId);
          go_to_question("histoire_probleme_fumer_avant_grossesse");
        }
        else if(lasession[sessionId].context["question_actuelle"] == "histoire_probleme_fumer_avant_grossesse_nombre_jour") {
          var message_retour_crypte = fonctions.base64_encode(message_en_clair);
          fonctions.update_variables_firebase("histoire_probleme_fumer_avant_grossesse_nombre_jour", message_en_clair, sessionId);
          fonctions.stockage_context("histoire_probleme_fumer_avant_grossesse_nombre_jour", message_en_clair, sessionId);
          go_to_question("histoire_probleme_dent");
        }
        else if(lasession[sessionId].context["question_actuelle"] == "Oui_histoire_probleme_medicaux_details") {
          var message_retour_crypte = fonctions.base64_encode(message_en_clair);
          fonctions.update_variables_firebase("Oui_histoire_probleme_medicaux_details", message_en_clair, sessionId);
          fonctions.stockage_context("Oui_histoire_probleme_medicaux_details", message_en_clair, sessionId);
          go_to_question("conclusion_question");
        }
        else if(lasession[sessionId].context["question_actuelle"] == "Oui_conclusion_question_details") {
          var message_retour_crypte = fonctions.base64_encode(message_en_clair);
          fonctions.update_variables_firebase("Oui_conclusion_question_details", message_en_clair, sessionId);
          fonctions.stockage_context("Oui_conclusion_question_details", message_en_clair, sessionId);
          go_to_question("fin");
        }
        // Fin des verificiations texte saisie normale
        else {
          // Ici se passent les verifications + retours sur les formats non respectés (Exemple : Je devais recevoir une date à cette queqtion et je n'en recois pas ...)
          if(lasession[sessionId].context["question_actuelle"] == 'Identito_Date_Naissance') {
            var message_retour_crypte1 = fonctions.base64_encode("Je n'ai pas compris votre date de Naissance.");
            var message_retour_crypte2 = fonctions.base64_encode("Exemple : 12 Juillet 1987");
            reponse.messages.push({"message" : message_retour_crypte1});
            reponse.messages.push({"message" : message_retour_crypte2});
            go_to_question("Identito_Date_Naissance");
          }
          else if(lasession[sessionId].context["question_actuelle"] == 'Identito_Mail') {
            var message_retour_crypte1 = fonctions.base64_encode("Je n'ai pas compris votre adresse email.");
            var message_retour_crypte2 = fonctions.base64_encode("Exemple : contact@botdesign.net");
            reponse.messages.push({"message" : message_retour_crypte1});
            reponse.messages.push({"message" : message_retour_crypte2});
            go_to_question("Identito_Mail");
          }
          else if(lasession[sessionId].context["question_actuelle"] == 'grossesse_date_conception') {
            var message_retour_crypte1 = fonctions.base64_encode("Je n'ai pas compris la date de conception.");
            var message_retour_crypte2 = fonctions.base64_encode("Exemple : 12 Juillet 2017");
            reponse.messages.push({"message" : message_retour_crypte1});
            reponse.messages.push({"message" : message_retour_crypte2});
            go_to_question("Oui_Infos_Etape_1");
          }
          else if(lasession[sessionId].context["question_actuelle"]  == 'grossesse_date_de_enfant_1') {
            var message_retour_crypte1 = fonctions.base64_encode("Je n'ai pas compris la date de Naissance de votre premier enfant.");
            var message_retour_crypte2 = fonctions.base64_encode("Exemple : 12 Juillet 1987");
            reponse.messages.push({"message" : message_retour_crypte1});
            reponse.messages.push({"message" : message_retour_crypte2});
            go_to_question("grossesse_date_de_enfant_1");
          }
          else if(lasession[sessionId].context["question_actuelle"]  == 'grossesse_date_de_enfant_2') {
            var message_retour_crypte1 = fonctions.base64_encode("Je n'ai pas compris la date de Naissance de votre deuxième enfant.");
            var message_retour_crypte2 = fonctions.base64_encode("Exemple : 12 Juillet 1987");
            reponse.messages.push({"message" : message_retour_crypte1});
            reponse.messages.push({"message" : message_retour_crypte2});
            go_to_question("grossesse_date_de_enfant_2");
          }
          else if(lasession[sessionId].context["question_actuelle"]  == 'grossesse_date_de_enfant_3') {
            var message_retour_crypte1 = fonctions.base64_encode("Je n'ai pas compris la date de Naissance de votre troisème enfant.");
            var message_retour_crypte2 = fonctions.base64_encode("Exemple : 12 Juillet 1987");
            reponse.messages.push({"message" : message_retour_crypte1});
            reponse.messages.push({"message" : message_retour_crypte2});
            go_to_question("grossesse_date_de_enfant_3");
          }
          else if(lasession[sessionId].context["question_actuelle"]  == 'grossesse_date_de_enfant_4') {
            var message_retour_crypte1 = fonctions.base64_encode("Je n'ai pas compris la date de Naissance de votre quatrième enfant.");
            var message_retour_crypte2 = fonctions.base64_encode("Exemple : 12 Juillet 1987");
            reponse.messages.push({"message" : message_retour_crypte1});
            reponse.messages.push({"message" : message_retour_crypte2});
            go_to_question("grossesse_date_de_enfant_4");
          }
          else if(lasession[sessionId].context["question_actuelle"]  == 'grossesse_date_de_enfant_5') {
            var message_retour_crypte1 = fonctions.base64_encode("Je n'ai pas compris la date de Naissance de votre cinquième enfant.");
            var message_retour_crypte2 = fonctions.base64_encode("Exemple : 12 Juillet 1987");
            reponse.messages.push({"message" : message_retour_crypte1});
            reponse.messages.push({"message" : message_retour_crypte2});
            go_to_question("grossesse_date_de_enfant_5");
          }
          else if(lasession[sessionId].context["question_actuelle"]  == 'grossesse_date_de_enfant_6') {
            var message_retour_crypte1 = fonctions.base64_encode("Je n'ai pas compris la date de Naissance de votre sixième enfant.");
            var message_retour_crypte2 = fonctions.base64_encode("Exemple : 12 Juillet 1987");
            reponse.messages.push({"message" : message_retour_crypte1});
            reponse.messages.push({"message" : message_retour_crypte2});
            go_to_question("grossesse_date_de_enfant_6");
          }
          else if(lasession[sessionId].context["question_actuelle"]  == 'passechir_operation_annee_1') {
            var message_retour_crypte1 = fonctions.base64_encode("Je n'ai pas compris l'année de votre première intervention");
            var message_retour_crypte2 = fonctions.base64_encode("Exemple : 1987");
            reponse.messages.push({"message" : message_retour_crypte1});
            reponse.messages.push({"message" : message_retour_crypte2});
            go_to_question("passechir_operation_annee_1");
          }
          else if(lasession[sessionId].context["question_actuelle"]  == 'passechir_operation_annee_2') {
            var message_retour_crypte1 = fonctions.base64_encode("Je n'ai pas compris l'année de votre deuxième intervention");
            var message_retour_crypte2 = fonctions.base64_encode("Exemple : 1987");
            reponse.messages.push({"message" : message_retour_crypte1});
            reponse.messages.push({"message" : message_retour_crypte2});
            go_to_question("passechir_operation_annee_2");
          }
          else if(lasession[sessionId].context["question_actuelle"]  == 'passechir_operation_annee_3') {
            var message_retour_crypte1 = fonctions.base64_encode("Je n'ai pas compris l'année de votre troisième intervention");
            var message_retour_crypte2 = fonctions.base64_encode("Exemple : 1987");
            reponse.messages.push({"message" : message_retour_crypte1});
            reponse.messages.push({"message" : message_retour_crypte2});
            go_to_question("passechir_operation_annee_3");
          }
          else if(lasession[sessionId].context["question_actuelle"]  == 'histoire_transfusion_annee') {
            var message_retour_crypte1 = fonctions.base64_encode("Je n'ai pas compris l'année de votre transfusion.");
            var message_retour_crypte2 = fonctions.base64_encode("Exemple : 1987");
            reponse.messages.push({"message" : message_retour_crypte1});
            reponse.messages.push({"message" : message_retour_crypte2});
            go_to_question("histoire_transfusion_annee");
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
    resolve({reponse});
    });
  }
}
