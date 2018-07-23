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
              if(lasession[sessionId].context["question_actuelle"] = "grossesse_enfant_accouchement_du_1") {
                fonctions.update_variables_firebase("grossesse_enfant_accouchement_du_1", message_en_clair, sessionId);
                fonctions.stockage_context("grossesse_enfant_accouchement_du_1", message_en_clair, sessionId);
                go_to_question("grossesse_enfant_anesthesie_du_1");
              }
              else if(lasession[sessionId].context["question_actuelle"] = "grossesse_enfant_accouchement_du_2") {
                fonctions.update_variables_firebase("grossesse_enfant_accouchement_du_2", message_en_clair, sessionId);
                fonctions.stockage_context("grossesse_enfant_accouchement_du_2", message_en_clair, sessionId);
                go_to_question("grossesse_enfant_anesthesie_du_2");
              }
              else if(lasession[sessionId].context["question_actuelle"] = "grossesse_enfant_accouchement_du_3") {
                fonctions.update_variables_firebase("grossesse_enfant_accouchement_du_3", message_en_clair, sessionId);
                fonctions.stockage_context("grossesse_enfant_accouchement_du_3", message_en_clair, sessionId);
                go_to_question("grossesse_enfant_anesthesie_du_3");
              }
              else if(lasession[sessionId].context["question_actuelle"] = "grossesse_enfant_accouchement_du_4") {
                fonctions.update_variables_firebase("grossesse_enfant_accouchement_du_4", message_en_clair, sessionId);
                fonctions.stockage_context("grossesse_enfant_accouchement_du_4", message_en_clair, sessionId);
                go_to_question("grossesse_enfant_anesthesie_du_4");
              }
              else if(lasession[sessionId].context["question_actuelle"] = "grossesse_enfant_accouchement_du_5") {
                fonctions.update_variables_firebase("grossesse_enfant_accouchement_du_5", message_en_clair, sessionId);
                fonctions.stockage_context("grossesse_enfant_accouchement_du_5", message_en_clair, sessionId);
                go_to_question("grossesse_enfant_anesthesie_du_5");
              }
              else if(lasession[sessionId].context["question_actuelle"] = "grossesse_enfant_accouchement_du_6") {
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
              if(lasession[sessionId].context["grossesse_nombre_enfant"] >= 2) {
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
              fonctions.update_variables_firebase("grossesse_enfant_complications_du_2", message_en_clair, sessionId);
              fonctions.stockage_context("grossesse_enfant_complications_du_2", message_en_clair, sessionId);
              if(lasession[sessionId].context["grossesse_nombre_enfant"] >= 3) {
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
              if(lasession[sessionId].context["grossesse_nombre_enfant"] >= 4) {
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
              if(lasession[sessionId].context["grossesse_nombre_enfant"] >= 5) {
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
              if(lasession[sessionId].context["grossesse_nombre_enfant"] >= 6) {
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
              var message_retour_crypte1 = fonctions.base64_encode("Quel est votre Poids actuel (en kg) ? Exemple : 62");
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
              reponse.messages.push({"message" : message_retour_crypte}) ;
              break;
            case "passechir_details_anesthesie_1":
              lasession[sessionId].context["question_actuelle"] = "passechir_details_anesthesie_1";
              var message_retour_crypte1 = fonctions.base64_encode("Nous allons le signaler à votre médecin anesthésiste et n'oubliez pas de lui parler de cet événement.");
              var message_retour_crypte2 = fonctions.base64_encode("Pouvez vous me dire en quelques lignes ce qui s'est passé ?");
              reponse.messages.push({"message" : message_retour_crypte1});
              reponse.messages.push({"message" : message_retour_crypte2});
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
          var message_retour_crypte = fonctions.base64_encode(message_en_clair);
          fonctions.update_variables_firebase("Identito_Date_Naissance", message_en_clair, sessionId);
          fonctions.stockage_context("Identito_Date_Naissance", message_en_clair, sessionId);
          // action suivante
          go_to_question("Identito_Mail");
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
          }else {
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
          var message_retour_crypte = fonctions.base64_encode(message_en_clair);
          fonctions.update_variables_firebase("grossesse_date_de_enfant_1", message_en_clair, sessionId);
          fonctions.stockage_context("grossesse_date_de_enfant_1", message_en_clair, sessionId);
          go_to_question("grossesse_enfant_accouchement_du_1");
        }
        else if(lasession[sessionId].context["question_actuelle"]  == 'grossesse_date_de_enfant_2') {
          var message_retour_crypte = fonctions.base64_encode(message_en_clair);
          fonctions.update_variables_firebase("grossesse_date_de_enfant_2", message_en_clair, sessionId);
          fonctions.stockage_context("grossesse_date_de_enfant_2", message_en_clair, sessionId);
          go_to_question("grossesse_enfant_accouchement_du_2");
        }
        else if(lasession[sessionId].context["question_actuelle"]  == 'grossesse_date_de_enfant_3') {
          var message_retour_crypte = fonctions.base64_encode(message_en_clair);
          fonctions.update_variables_firebase("grossesse_date_de_enfant_3", message_en_clair, sessionId);
          fonctions.stockage_context("grossesse_date_de_enfant_3", message_en_clair, sessionId);
          go_to_question("grossesse_enfant_accouchement_du_3");
        }
        else if(lasession[sessionId].context["question_actuelle"]  == 'grossesse_date_de_enfant_4') {
          var message_retour_crypte = fonctions.base64_encode(message_en_clair);
          fonctions.update_variables_firebase("grossesse_date_de_enfant_4", message_en_clair, sessionId);
          fonctions.stockage_context("grossesse_date_de_enfant_4", message_en_clair, sessionId);
          go_to_question("grossesse_enfant_accouchement_du_4");
        }
        else if(lasession[sessionId].context["question_actuelle"]  == 'grossesse_date_de_enfant_5') {
          var message_retour_crypte = fonctions.base64_encode(message_en_clair);
          fonctions.update_variables_firebase("grossesse_date_de_enfant_5", message_en_clair, sessionId);
          fonctions.stockage_context("grossesse_date_de_enfant_5", message_en_clair, sessionId);
          go_to_question("grossesse_enfant_accouchement_du_5");
        }
        else if(lasession[sessionId].context["question_actuelle"]  == 'grossesse_date_de_enfant_6') {
          var message_retour_crypte = fonctions.base64_encode(message_en_clair);
          fonctions.update_variables_firebase("grossesse_date_de_enfant_6", message_en_clair, sessionId);
          fonctions.stockage_context("grossesse_date_de_enfant_6", message_en_clair, sessionId);
          go_to_question("grossesse_enfant_accouchement_du_6");
        }
        else if(lasession[sessionId].context["question_actuelle"]  == 'grossesse_enfant_anesthesie_conditions_details_du_1') {
          var message_retour_crypte = fonctions.base64_encode(message_en_clair);
          fonctions.update_variables_firebase("grossesse_enfant_anesthesie_conditions_details_du_1", message_en_clair, sessionId);
          fonctions.stockage_context("grossesse_enfant_anesthesie_conditions_details_du_1", message_en_clair, sessionId);
          go_to_question("grossesse_enfant_complications_du_1");
        }
        else if(lasession[sessionId].context["question_actuelle"]  == 'grossesse_enfant_anesthesie_conditions_details_du_2') {
          var message_retour_crypte = fonctions.base64_encode(message_en_clair);
          fonctions.update_variables_firebase("grossesse_enfant_anesthesie_conditions_details_du_2", message_en_clair, sessionId);
          fonctions.stockage_context("grossesse_enfant_anesthesie_conditions_details_du_2", message_en_clair, sessionId);
          go_to_question("grossesse_enfant_complications_du_2");
        }
        else if(lasession[sessionId].context["question_actuelle"]  == 'grossesse_enfant_anesthesie_conditions_details_du_3') {
          var message_retour_crypte = fonctions.base64_encode(message_en_clair);
          fonctions.update_variables_firebase("grossesse_enfant_anesthesie_conditions_details_du_3", message_en_clair, sessionId);
          fonctions.stockage_context("grossesse_enfant_anesthesie_conditions_details_du_3", message_en_clair, sessionId);
          go_to_question("grossesse_enfant_complications_du_3");
        }
        else if(lasession[sessionId].context["question_actuelle"]  == 'grossesse_enfant_anesthesie_conditions_details_du_4') {
          var message_retour_crypte = fonctions.base64_encode(message_en_clair);
          fonctions.update_variables_firebase("grossesse_enfant_anesthesie_conditions_details_du_4", message_en_clair, sessionId);
          fonctions.stockage_context("grossesse_enfant_anesthesie_conditions_details_du_4", message_en_clair, sessionId);
          go_to_question("grossesse_enfant_complications_du_4");
        }
        else if(lasession[sessionId].context["question_actuelle"]  == 'grossesse_enfant_anesthesie_conditions_details_du_5') {
          var message_retour_crypte = fonctions.base64_encode(message_en_clair);
          fonctions.update_variables_firebase("grossesse_enfant_anesthesie_conditions_details_du_5", message_en_clair, sessionId);
          fonctions.stockage_context("grossesse_enfant_anesthesie_conditions_details_du_5", message_en_clair, sessionId);
          go_to_question("grossesse_enfant_complications_du_5");
        }
        else if(lasession[sessionId].context["question_actuelle"]  == 'grossesse_enfant_anesthesie_conditions_details_du_6') {
          var message_retour_crypte = fonctions.base64_encode(message_en_clair);
          fonctions.update_variables_firebase("grossesse_enfant_anesthesie_conditions_details_du_6", message_en_clair, sessionId);
          fonctions.stockage_context("grossesse_enfant_anesthesie_conditions_details_du_6", message_en_clair, sessionId);
          go_to_question("grossesse_enfant_complications_du_6");
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
          go_to_question("Identito_Recap");
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
          go_to_question("Identito_Prenom");
        }
        else if(lasession[sessionId].context["question_actuelle"] == 'Identito_Prenom') {
          var message_retour_crypte = fonctions.base64_encode(message_en_clair);
          fonctions.update_variables_firebase("Identito_Prenom", message_en_clair, sessionId);
          fonctions.stockage_context("Identito_Prenom", message_en_clair, sessionId);
          // action suivante
          go_to_question("Identito_Date_Naissance");
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
            var message_retour_crypte2 = fonctions.base64_encode("Exemple : Tapez 62");
            reponse.messages.push({"message" : message_retour_crypte1});
            reponse.messages.push({"message" : message_retour_crypte2});
            go_to_question("patient_poids_actuel");
          }
        }
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
