// EAADHURv0ZB9kBACrJZALnUuDc0ZAspZCZBUZBt6FZAurWuPOOhx9p6pMjRgeMMUnNNGZCdNFAbQqn5ZCZAKHZAohNq0Q8oL046Qa53KRVujyBjnTAN5DBtJ7F3EEZAMTyZACFeROBBEU9lf7oP4GeRLz7O7ecE7jYyHlPYEGyvQZB25mR64AZDZD

curl -X POST -H "Content-Type: application/json" -d '{
   "persistent_menu":[
      {
         "locale":"default",
         "composer_input_disabled":false,
         "call_to_actions":[
            {
               "type":"postback",
               "title":"🏠 Accueil",
               "payload":"RECORECORECO"
            },
            {
               "title":"🔍 Accès rapides",
               "type":"nested",
               "call_to_actions":[
                  {
                     "type":"postback",
                     "title":"Nos produits",
                     "payload":"menu_produits"
                  },
                  {
                     "type":"postback",
                     "title":"Vos besoins",
                     "payload":"menu_besoins"
                  },
                  {
                     "type":"postback",
                     "title":"Foire aux questions",
                     "payload":"menu_foire_aux_questions"
                  },
                  {
                     "type":"postback",
                     "title":"📩 Partager",
                     "payload":"SHARE_WITH_FRIENDS"
                  },
               ]
            },
            {
               "title":"ℹ️️ Contactez-nous",
               "type":"nested",
               "call_to_actions":[

                  {
                    "type":"web_url",
                    "messenger_extensions" : true,
                    "url": "https://mon-chatbot.com/naturactive/form-vigilance.html",
                    "title": "PharmacoVigilance"
                  },
                  {
                    "type":"web_url",
                    "messenger_extensions" : true,
                    "url": "https://mon-chatbot.com/naturactive/form-medical.html",
                    "title": "Infos Médicales"
                  },
                  {
                    "type":"web_url",
                    "url": "https://www.naturactive.fr/nous-contacter",
                    "title": "Contactez-nous"
                  }
               ]
            }
         ]
      },
      {
         "locale":"zh_CN",
         "composer_input_disabled":false
      }
   ]
}' "https://graph.facebook.com/v2.6/me/messenger_profile?access_token=EAADHURv0ZB9kBACrJZALnUuDc0ZAspZCZBUZBt6FZAurWuPOOhx9p6pMjRgeMMUnNNGZCdNFAbQqn5ZCZAKHZAohNq0Q8oL046Qa53KRVujyBjnTAN5DBtJ7F3EEZAMTyZACFeROBBEU9lf7oP4GeRLz7O7ecE7jYyHlPYEGyvQZB25mR64AZDZD"

// NB  : EAACHnRcCn84BABMGzFYXZAbZBa5MTG78JUUxVb5oNElboCqdAnkDbZAZCkFevmDoYOGCFQ4NI5a5RGbz7obgsKROnckxQZCz5j6wLAleLw6tz6ORSLBvkxTkPVmHDtTviIxO7FKF4nqHrmePFO89PXqhlyEXKL8W74yYRviIo8AZDZD
curl -X POST -H "Content-Type: application/json" -d '{
  "setting_type":"greeting",
  "greeting":{
    "text":"{{user_first_name}}, placez votre texte ici entre les guillemets (max 160)"
  }
}' "https://graph.facebook.com/v2.6/me/thread_settings?access_token=EAACHnRcCn84BABMGzFYXZAbZBa5MTG78JUUxVb5oNElboCqdAnkDbZAZCkFevmDoYOGCFQ4NI5a5RGbz7obgsKROnckxQZCz5j6wLAleLw6tz6ORSLBvkxTkPVmHDtTviIxO7FKF4nqHrmePFO89PXqhlyEXKL8W74yYRviIo8AZDZD"

https://developers.facebook.com/docs/messenger-platform/reference/messenger-profile-api/persistent-menu/

curl -X POST -H "Content-Type: application/json" -d '{
   "persistent_menu":[
      {
         "locale":"default",
         "composer_input_disabled":false,
         "call_to_actions":[
            {
               "type":"postback",
               "title":"🏠 Accueil",
               "payload":"RECORECORECO"
            },
            {
               "type":"postback",
               "title":"ℹ️️ NutriScore aliment",
               "payload":"LACATEGORIERECHERCHE"
            },
            {
               "title":"🔍 Les thèmes",
               "type":"nested",
               "call_to_actions":[
                  {
                     "type":"postback",
                     "title":"Le sucre",
                     "payload":"CAT_SUCRE"
                  },
                  {
                     "type":"postback",
                     "title":"Les aliments",
                     "payload":"CAT_ALIMENTS"
                  },
                  {
                     "type":"postback",
                     "title":"Les additifs",
                     "payload":"CAT_ADDITIFS"
                  },
                  {
                     "type":"postback",
                     "title":"Les nutriments",
                     "payload":"CAT_NUTRIMENTS"
                  },
                  {
                     "type":"postback",
                     "title":"La diététique",
                     "payload":"CAT_DIETETIQUE"
                  }
               ]
            }
         ]
      },
      {
         "locale":"zh_CN",
         "composer_input_disabled":false
      }
   ]
}' "https://graph.facebook.com/v2.6/me/messenger_profile?access_token=EAACHnRcCn84BAHOxR9aqRk8lJZB3XvSnVkePZCAZCGM3JQ7e37zgfahTYjEZCni1cdC8SZCEmNzGSc7CEDj9joTdc2KOc8MgNFM0coHltBeHibjOPXgYQxewh07IbrIhd5PTZADkofcZANYIlbTjE5dkFYWUom4fRiPuw4zIlPcwQZDZD"

//


curl -X POST -H "Content-Type: application/json" -d '{
  "setting_type":"greeting",
  "greeting":{
    "text":"Démarrez la conversation et posez vos questions concernant Naturactive, une marque des Laboratoires Pierre Fabre."
  }
}' "https://graph.facebook.com/v2.6/me/thread_settings?access_token=EAADHURv0ZB9kBACrJZALnUuDc0ZAspZCZBUZBt6FZAurWuPOOhx9p6pMjRgeMMUnNNGZCdNFAbQqn5ZCZAKHZAohNq0Q8oL046Qa53KRVujyBjnTAN5DBtJ7F3EEZAMTyZACFeROBBEU9lf7oP4GeRLz7O7ecE7jYyHlPYEGyvQZB25mR64AZDZD"


curl -X POST -H "Content-Type: application/json" -d '{
  "get_started":{
    "payload":"FIRST_INTERACTION_BOT"
  }
}' "https://graph.facebook.com/v2.6/me/messenger_profile?access_token=EAADHURv0ZB9kBACrJZALnUuDc0ZAspZCZBUZBt6FZAurWuPOOhx9p6pMjRgeMMUnNNGZCdNFAbQqn5ZCZAKHZAohNq0Q8oL046Qa53KRVujyBjnTAN5DBtJ7F3EEZAMTyZACFeROBBEU9lf7oP4GeRLz7O7ecE7jYyHlPYEGyvQZB25mR64AZDZD"


curl -X POST -H "Content-Type: application/json" -d '{
  "whitelisted_domains":[
    "https://mon-chatbot.com"
  ]
}' "https://graph.facebook.com/v2.6/me/messenger_profile?access_token=EAADHURv0ZB9kBACrJZALnUuDc0ZAspZCZBUZBt6FZAurWuPOOhx9p6pMjRgeMMUnNNGZCdNFAbQqn5ZCZAKHZAohNq0Q8oL046Qa53KRVujyBjnTAN5DBtJ7F3EEZAMTyZACFeROBBEU9lf7oP4GeRLz7O7ecE7jYyHlPYEGyvQZB25mR64AZDZD"
