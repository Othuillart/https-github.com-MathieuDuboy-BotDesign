// EAACHnRcCn84BAHOxR9aqRk8lJZB3XvSnVkePZCAZCGM3JQ7e37zgfahTYjEZCni1cdC8SZCEmNzGSc7CEDj9joTdc2KOc8MgNFM0coHltBeHibjOPXgYQxewh07IbrIhd5PTZADkofcZANYIlbTjE5dkFYWUom4fRiPuw4zIlPcwQZDZD
// new EAACHnRcCn84BAHOxR9aqRk8lJZB3XvSnVkePZCAZCGM3JQ7e37zgfahTYjEZCni1cdC8SZCEmNzGSc7CEDj9joTdc2KOc8MgNFM0coHltBeHibjOPXgYQxewh07IbrIhd5PTZADkofcZANYIlbTjE5dkFYWUom4fRiPuw4zIlPcwQZDZD
curl -X POST -H "Content-Type: application/json" -d '{
   "persistent_menu":[
      {
         "locale":"default",
         "composer_input_disabled":false,
         "call_to_actions":[
            {
               "type":"postback",
               "title":"🏠 Accueil",
               "payload":"RETOUR_ACCUEIL"
            },
            {
               "type":"postback",
               "title":"ℹ️️ NutriScore aliment",
               "payload":"INFOS_SUR_LE_NUTRI"
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


curl -X POST -H "Content-Type: application/json" -d '{
  "setting_type":"greeting",
  "greeting":{
    "text":"Bienvenue {{user_first_name}}. Démarrez la conversation et posez moi toutes vos questions concernant le Sucre & la Santé."
  }
}' "https://graph.facebook.com/v2.6/me/thread_settings?access_token=EAACHnRcCn84BAHOxR9aqRk8lJZB3XvSnVkePZCAZCGM3JQ7e37zgfahTYjEZCni1cdC8SZCEmNzGSc7CEDj9joTdc2KOc8MgNFM0coHltBeHibjOPXgYQxewh07IbrIhd5PTZADkofcZANYIlbTjE5dkFYWUom4fRiPuw4zIlPcwQZDZD"


curl -X POST -H "Content-Type: application/json" -d '{
  "get_started":{
    "payload":"FIRST_USE_OF_TUTO_OK"
  }
}' "https://graph.facebook.com/v2.6/me/messenger_profile?access_token=EAACHnRcCn84BAHOxR9aqRk8lJZB3XvSnVkePZCAZCGM3JQ7e37zgfahTYjEZCni1cdC8SZCEmNzGSc7CEDj9joTdc2KOc8MgNFM0coHltBeHibjOPXgYQxewh07IbrIhd5PTZADkofcZANYIlbTjE5dkFYWUom4fRiPuw4zIlPcwQZDZD"
