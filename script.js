// mail a derouler selon le forumaire envoyé
// boucles If else
// http://localhost:8888/index.html?email=test@aze.fr&nom=James%20Shepard&specialite=Chrirugien%20Dentiste%20etc&image=https://resize-public.ladmedia.fr/img/var/public/storage/images/dossiers/musique-cine-series/news/grey-s-anatomy-docteur-mamour-ne-serait-pas-vraiment-mort-1407392/36635951-1-fre-FR/Grey-s-Anatomy-Docteur-Mamour-ne-serait-pas-vraiment-mort-!.jpg
var debut_du_form = Date.now();
var config = {
  apiKey: "AIzaSyABZpXNJwxEtO3p-A71zzM70pF36UjuzHM",
  authDomain: "dentistesgrecs.firebaseapp.com",
  databaseURL: "https://dentistesgrecs.firebaseio.com",
  projectId: "dentistesgrecs",
  storageBucket: "",
  messagingSenderId: "401411048230"
};
firebase.initializeApp(config);
// -------------- FIN Fonction Globales -------------- //


var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = decodeURIComponent(window.location.search.substring(1)),
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i;
  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : sParameterName[1];
    }
  }
};
// VARIABLES GLOBALES
var cle = 'Έλεγχος ρουτίνας';
var keyid = 1;
var tab_reponses = {
  "reponses" : { }
};
var question = [
  {
	"Start": [
	  {
		"type": "quick_replies",
		"question": [
					"Hello and welcome to my practice.",
					"Previously to our appointment, I'd like to ask you a few questions.",
					"First, what is the main reason for your visit ?"
				],
		"reponses": [
					"Routine",
					"Gums",
					"Teeth"
				]
			}
		]
	},
  {
	"Routine": [
		{
			"type": "quick_replies",
			"question": [
				"Hello and welcome to my practice.",
				"Previously to our appointment, I'd like to ask you a few questions.",
				"First, what is the main reason for your visit ? "
			],
			"reponses": [
				"Routine",
				"Gums",
				"Teeth"
				]
			},
			{
				"type": "quick_replies",
				"question": [
					"Are you a Man or Woman ?"
				],
				"reponses": [
					"🚹 Man",
					"🚺 Woman"
				]
			},
			{
				"type": "quick_replies",
				"question": [
					"Do you happen to be pregnant ? "
				],
				"reponses": [
					"✔️ Yes",
					"✖️ No"
				]
			},
			{
				"type": "quick_replies",
				"question": [
					"When was your last visit to the dentist ?"
				],
				"reponses": [
					"Less than one month ago",
					"Between 1 month and 6 months ago",
					"Between 6 months and 1 year ago",
					"More than 1 year ago"
				]
			},
			{
				"type": "quick_replies",
				"question": [
					"How often do you brush your teeth ? "
				],
				"reponses": [
					"Three times a day",
					"Two times a day",
					"One time a day",
					"Less than one time a day"
				]
			},
			{
				"type": "quick_replies",
				"question": [
					"How long is your average brushing time ? "
				],
				"reponses": [
					"Less than one minute",
					"Between 1 and 2 minutes",
					"Between 2 and 3 minutes",
					"More than 3 minutes"
				]
			},
			{
				"type": "quick_replies",
				"question": [
					"Do you currently take general medication ? "
				],
				"reponses": [
					"✔️ Yes",
					"✖️ No"
				]
			},
			{
				"type": "quick_replies",
				"question": [
					"Would you say that you are in general good health ?"
				],
				"reponses": [
					"✔️ Yes",
					"✖️ No"
				]
			},
			{
				"type": "quick_replies",
				"question": [
					"Would you say that you have a good oral care health ? "
				],
				"reponses": [
					"✔️ Yes",
					"✖️ No"
				]
			},
			{
				"type": "quick_replies",
				"question": [
					"Do you have any denture (dental crown, braces, bridge, post, implantâ€¦) ?"
				],
				"reponses": [
					"✔️ Yes",
					"✖️ No"
				]
			},
			{
				"type": "quick_replies",
				"question": [
					"Do you suffer from bad breath ?"
				],
				"reponses": [
					"✔️ Yes",
					"✖️ No"
				]
			},
			{
				"type": "quick_replies",
				"question": [
					"Do you currently use dental floss, interdental picks or moutwash ?"
				],
				"reponses": [
					"✔️ Yes",
					"✖️ No"
				]
			},
			{
				"type": "quick_replies",
				"question": [
					"Is your smile a reason for discomfort ? "
				],
				"reponses": [
					"✔️ Yes",
					"✖️ No"
				]
			},
			{
				"type": "quick_replies",
				"question": [
					"Are you satisfied with your teeth colour?"
				],
				"reponses": [
					"✔️ Yes",
					"✖️ No"
				]
			},
			{
				"type": "quick_replies",
				"question": [
					"Are you satisfied with your teeth alignment?  "
				],
				"reponses": [
					"✔️ Yes",
					"✖️ No"
				]
			},
			{
				"type": "text",
				"question": [
					"Can you provide me with your first name (only) ?"
				]
			}
		]
	},
	{
		"Gums": [
			{
				"type": "quick_replies",
				"question": [
					"Hello and welcome to my practice.",
					"Previously to our appointment, I'd like to ask you a few questions.",
					"First, what is the main reason for your visit ? "
				],
				"reponses": [
					"Routine",
					"Gums",
					"Teeth"
				]
			},
			{
				"type": "quick_replies",
				"question": [
					"Are you a Man or Woman ?"
				],
				"reponses": [
					"🚹 Man",
					"🚺 Woman"
				]
			},
			{
				"type": "quick_replies",
				"question": [
					"Do you happen to be pregnant ? "
				],
				"reponses": [
					"✔️ Yes",
					"✖️ No"
				]
			},
			{
				"type": "quick_replies",
				"question": [
					"When was your last visit to the dentist ?"
				],
				"reponses": [
					"Less than one month ago",
					"Between 1 month and 6 months ago",
					"Between 6 months and 1 year ago",
					"More than 1 year ago"
				]
			},
			{
				"type": "quick_replies",
				"question": [
					"How often do you brush your teeth ? "
				],
				"reponses": [
					"Three times a day",
					"Two times a day",
					"One time a day",
					"Less than one time a day"
				]
			},
			{
				"type": "quick_replies",
				"question": [
					"How long is your average brushing time ? "
				],
				"reponses": [
					"Less than one minute",
					"Between 1 and 2 minutes",
					"Between 2 and 3 minutes",
					"More than 3 minutes"
				]
			},
			{
				"type": "quick_replies",
				"question": [
					"Do you currently take general medication ? "
				],
				"reponses": [
					"✔️ Yes",
					"✖️ No"
				]
			},
			{
				"type": "quick_replies",
				"question": [
					"Would you say that you are in general good health ?"
				],
				"reponses": [
					"✔️ Yes",
					"✖️ No"
				]
			},
			{
				"type": "quick_replies",
				"question": [
					"Would you say that you have a good oral care health ? "
				],
				"reponses": [
					"✔️ Yes",
					"✖️ No"
				]
			},
			{
				"type": "quick_replies",
				"question": [
					"Do you have any denture (dental crown, braces, bridge, post, implantâ€¦) ?"
				],
				"reponses": [
					"✔️ Yes",
					"✖️ No"
				]
			},
			{
				"type": "quick_replies",
				"question": [
					"Do you suffer from bleeding when brushing your teeth ?"
				],
				"reponses": [
					"✔️ Yes",
					"✖️ No"
				]
			},
			{
				"type": "quick_replies",
				"question": [
					"How often"
				],
				"reponses": [
					"During every brushing",
					"At least once a day",
					"At least once a week",
					"At least once a month"
				]
			},
			{
				"type": "quick_replies",
				"question": [
					"Do you consider that cold triggers your dental pain ?"
				],
				"reponses": [
					"✔️ Yes",
					"✖️ No"
				]
			},
			{
				"type": "quick_replies",
				"question": [
					"Do you suffer from bad breath ?"
				],
				"reponses": [
					"✔️ Yes",
					"✖️ No"
				]
			},
			{
				"type": "quick_replies",
				"question": [
					"Do you consider that your teeth either move, look longer, or loosen ?"
				],
				"reponses": [
					"✔️ Yes",
					"✖️ No"
				]
			},
			{
				"type": "quick_replies",
				"question": [
					"Do you currently use dental floss, interdental picks or moutwash ? "
				],
				"reponses": [
					"✔️ Yes",
					"✖️ No"
				]
			},
			{
				"type": "text",
				"question": [
					"Can you provide me with your first name (only) ?"
				]
			}
		]
	},
	{
		"Teeth": [
			{
				"type": "quick_replies",
				"question": [
					"Hello and welcome to my practice.",
					"Previously to our appointment, I'd like to ask you a few questions.",
					"First, what is the main reason for your visit ? "
				],
				"reponses": [
					"Routine",
					"Gums",
					"Teeth"
				]
			},
			{
				"type": "quick_replies",
				"question": [
					"Are you a Man or Woman ?"
				],
				"reponses": [
					"🚹 Man",
					"🚺 Woman"
				]
			},
			{
				"type": "quick_replies",
				"question": [
					"Do you happen to be pregnant ? "
				],
				"reponses": [
					"✔️ Yes",
					"✖️ No"
				]
			},
			{
				"type": "quick_replies",
				"question": [
					"When was your last visit to the dentist ?"
				],
				"reponses": [
					"Less than one month ago",
					"Between 1 month and 6 months ago",
					"Between 6 months and 1 year ago",
					"More than 1 year ago"
				]
			},
			{
				"type": "quick_replies",
				"question": [
					"How often do you brush your teeth ? "
				],
				"reponses": [
					"Three times a day",
					"Two times a day",
					"One time a day",
					"Less than one time a day"
				]
			},
			{
				"type": "quick_replies",
				"question": [
					"How long is your average brushing time ? "
				],
				"reponses": [
					"Less than one minute",
					"Between 1 and 2 minutes",
					"Between 2 and 3 minutes",
					"More than 3 minutes"
				]
			},
			{
				"type": "quick_replies",
				"question": [
					"Do you currently take general medication ? "
				],
				"reponses": [
					"✔️ Yes",
					"✖️ No"
				]
			},
			{
				"type": "quick_replies",
				"question": [
					"Would you say that you are in general good health ?"
				],
				"reponses": [
					"✔️ Yes",
					"✖️ No"
				]
			},
			{
				"type": "quick_replies",
				"question": [
					"Would you say that you have a good oral care health ? "
				],
				"reponses": [
					"✔️ Yes",
					"✖️ No"
				]
			},
			{
				"type": "quick_replies",
				"question": [
					"Do you have any denture (dental crown, braces, bridge, post, implantâ€¦) ?"
				],
				"reponses": [
					"✔️ Yes",
					"✖️ No"
				]
			},
			{
				"type": "quick_replies",
				"question": [
					"Do you consider that heat triggers your dental pain ? "
				],
				"reponses": [
					"✔️ Yes",
					"✖️ No"
				]
			},
			{
				"type": "quick_replies",
				"question": [
					"Do you consider that cold triggers your dental pain ?"
				],
				"reponses": [
					"✔️ Yes",
					"✖️ No"
				]
			},
			{
				"type": "quick_replies",
				"question": [
					"Do you consider that salt or sugar triggers your dental pain ?"
				],
				"reponses": [
					"✔️ Yes",
					"✖️ No"
				]
			},
			{
				"type": "quick_replies",
				"question": [
					"Does your dental pain appears during brushing ?"
				],
				"reponses": [
					"✔️ Yes",
					"✖️ No"
				]
			},
			{
				"type": "quick_replies",
				"question": [
					"How often does the pain appear ?"
				],
				"reponses": [
					"Three times a day",
					"Two times a day",
					"One time a day",
					"Less than one time a day"
				]
			},
			{
				"type": "quick_replies",
				"question": [
					"On a 1 to 10 scale, assess the level of pain that you feel during the episode of pain."
				],
				"reponses": [
					"1",
					"2",
					"3",
					"4",
					"5",
					"6",
					"7",
					"8",
					"9",
					"10"
				]
			},
			{
				"type": "quick_replies",
				"question": [
					"Have you ever had tooth decay in the past ? "
				],
				"reponses": [
					"✔️ Yes",
					"✖️ No"
				]
			},
			{
				"type": "text",
				"question": [
					"Can you provide me with your first name (only) ?"
				]
			}
		]
	}
];
var numero_question_actuelle = 0;
var le_temps = new Date().toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
var chatHistory = $('.chat-history');
var chatHistoryList = $('.chat-history ul.history');
$('#send_un_message').css('cursor', 'pointer');
$('.quick_replies').hover(function() {
  $(this).css('cursor', 'pointer');
});
// Parametres de l'URL
var email = getUrlParameter('email');
var specialite = getUrlParameter('specialite');
var image = getUrlParameter('image');
var nom = "Δρ " + getUrlParameter('nom');
var lenom = getUrlParameter('nom');
$("#avatar").attr("src", image);
$.get( "cgu.txt", function( data ) {
  var pipotin = data;
  swal({
    title: '<i>Terms of use</i>',
    type: 'info',
    html: '<p style="text-align:left;height: 140px;overflow-y: scroll;">'+pipotin+'</p>',
    showCloseButton: true,
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText: "<i class='fa fa-thumbs-up'></i> I agree !",
    confirmButtonAriaLabel: 'Thumbs up, great!',
    cancelButtonText: '<i class="fa fa-thumbs-down"></i>',
    cancelButtonAriaLabel: 'Thumbs down',
  }).then(function(result) {
    if (result.value) {
      // handle confirm
      console.log('confirm');
    } else {
      console.log('pas confirm');
      window.location = "index_not_validated.html?email="+email+"&nom="+lenom+"&specialite="+specialite+"&image="+image;
    }
  })
})



$(".chat-num-messages").text(specialite);
$(".chat-with").text(nom);
// Affichage du premier message question 0
var template = Handlebars.compile($("#message-response-template-quickreplies").html());
var context = {
  id: 0,
  nom_docteur: nom,
  response_text: question[0]["Start"][0].question,
  response_quick: question[0]["Start"][0].reponses,
  response_dot: '<i class="fa fa-circle online ball-1" style="color: #AED2A1"></i><i class="fa fa-circle online ball-2" style="color: #AED2A6"></i><i class="fa fa-circle online ball-3" style="color:#DAE9DA"></i>',
  time: le_temps
};
chatHistoryList.append(template(context));
$("#B0").hide();
$("#C0").hide();
$('#content').animate({ scrollTop: $('#content').prop("scrollHeight") }, 1000);
setTimeout(function() {
  $("#A0").hide(500);
  $("#B0").show(500);
  $("#C0").show(500);
  $('#content').animate({ scrollTop: $('#content').prop("scrollHeight") }, 1000);
}.bind(this), 1500);
// CLICK SUR UNE QUICK REPLY
$(document).on('click touch', '.quick_replies', function() {
  // Cacher les anciennes quickreplies non utilisées
  console.log("ok dans quick_repelies");
  $("#C" + numero_question_actuelle).hide();
  // incrementer la question
  numero_question_actuelle++;
  var messageToSend = $(this).text();
  // Chargement des tableaux de questions
  if (messageToSend == 'Routine') {
    cle = 'Έλεγχος ρουτίνας';
    keyid = 1;
    tab_reponses["Form"] = cle;
  }
  if (messageToSend == 'Gums') {
    cle = 'Αιμορραγία ή/και πόνος στα ούλα';
    keyid = 2;
    tab_reponses["Form"] = cle;
  }
  if (messageToSend == 'Teeth') {
    cle = 'Πόνος στα δόντια';
    keyid = 3;
    tab_reponses["Form"] = cle;
  }
  // IF ELSE Man Woman
  if (messageToSend == "🚺 Woman") {
    numero_question_actuelle = 2;
    var macle = question[keyid][cle][numero_question_actuelle - 1].question[0];
    tab_reponses["GENDER"] = messageToSend;
    // {"1":"Routine testing","3":"✔ Yes","4":"In the previous month","GENDER":"🚺 Woman"}
  }
  if (messageToSend == "🚹 Man") {
    numero_question_actuelle = 3;
    var macle = question[keyid][cle][numero_question_actuelle - 1].question[0];
    tab_reponses["GENDER"] = messageToSend;
	// {"1":"Routine testing","4":"In the previous month","GENDER":"🚹 Man"}
  }
  if(messageToSend != "🚺 Woman" && messageToSend != "🚹 Man") {
	var macle = question[keyid][cle][numero_question_actuelle - 1].question[0];
    if(macle == undefined) macle = 'Reason';
    tab_reponses["reponses"][numero_question_actuelle] = {"question" : macle, "answer" : messageToSend};
    console.log('ajout ok')
  }

  if(cle == 'Αιμορραγία ή/και πόνος στα ούλα' && numero_question_actuelle == 11 && messageToSend == "✔️ Yes") {
    console.log("on va afficher la prochaine question");
  }
  if(cle == 'Αιμορραγία ή/και πόνος στα ούλα' && numero_question_actuelle == 11 && messageToSend == "✖️ No") {
    console.log("on va afficher la prochaine question");
    numero_question_actuelle++;
  }

  console.log("VOICI LE TAB"+JSON.stringify(tab_reponses));

  // Affichage de la réponse cliquée
  var template = Handlebars.compile($("#message-template").html());
  var context = {
    messageOutput: messageToSend,
    time: le_temps
  };
  chatHistoryList.append(template(context));
  $('#content').animate({ scrollTop: $('#content').prop("scrollHeight") }, 500);
  $("#message-to-send").val('');

  if (question[keyid][cle][numero_question_actuelle] && question[keyid][cle][numero_question_actuelle].type == "quick_replies") {
    var template = Handlebars.compile($("#message-response-template-quickreplies").html());
    var context = {
      id: numero_question_actuelle,
      nom_docteur: nom,
      response_text: question[keyid][cle][numero_question_actuelle].question,
      response_quick: question[keyid][cle][numero_question_actuelle].reponses,
      response_dot: '<i class="fa fa-circle online ball-1" style="color: #AED2A1"></i><i class="fa fa-circle online ball-2" style="color: #AED2A6"></i><i class="fa fa-circle online ball-3" style="color:#DAE9DA"></i>',
      time: le_temps
    };
    console.log("Affichage de la question " + numero_question_actuelle);
    chatHistoryList.append(template(context));
    $("#B" + numero_question_actuelle).hide();
    $("#C" + numero_question_actuelle).hide();
    $('#content').animate({ scrollTop: $('#content').prop("scrollHeight") }, 1000);
    setTimeout(function() {
      $("#A" + numero_question_actuelle).hide(500);
      $("#B" + numero_question_actuelle).show(500);
      $("#C" + numero_question_actuelle).show(500);
      $('#content').animate({ scrollTop: $('#content').prop("scrollHeight") }, 1000);
    }.bind(this), 1500);
  } else {
    var template = Handlebars.compile($("#message-response-template").html());
    var context = {
      id: numero_question_actuelle,
      nom_docteur: nom,
      response_text: question[keyid][cle][numero_question_actuelle].question,
      response_dot: '<i class="fa fa-circle online ball-1" style="color: #AED2A1"></i><i class="fa fa-circle online ball-2" style="color: #AED2A6"></i><i class="fa fa-circle online ball-3" style="color:#DAE9DA"></i>',
      time: le_temps
    };
    console.log("Affichage de la question " + numero_question_actuelle);
    chatHistoryList.append(template(context));
    $("#B" + numero_question_actuelle).hide();
    $("#C" + numero_question_actuelle).hide();
    $('#content').animate({ scrollTop: $('#content').prop("scrollHeight") }, 1000);
    setTimeout(function() {
      $("#A" + numero_question_actuelle).hide(500);
      $("#B" + numero_question_actuelle).show(500);
      $('#content').animate({ scrollTop: $('#content').prop("scrollHeight") }, 1000);
    }.bind(this), 1500);
  }
});
$(document).on('click touch', '#send_un_message', function(event) {
  event.preventDefault();
  numero_question_actuelle++;
  var messageToSend = $("#message-to-send").val();
  if (messageToSend == '') return false;
  var template = Handlebars.compile($("#message-template").html());
  var context = {
    messageOutput: messageToSend,
    time: le_temps
  };
  var macle = question[keyid][cle][numero_question_actuelle - 1].question[0];
  tab_reponses["reponses"][numero_question_actuelle] =  {"question" : macle, "answer" : messageToSend};


  console.log("VOICI LE TAB"+JSON.stringify(tab_reponses));
  chatHistoryList.append(template(context));
  $('#content').animate({ scrollTop: $('#content').prop("scrollHeight") }, 1000);
  $("#message-to-send").val('');
  if (question[keyid][cle][numero_question_actuelle - 1].question[0] ==
    'Can you provide me with your first name (only) ?') {
    // c'est terminé !!
    // mettre en forme le message
    var nb = messageToSend.split(' ').length;
    // if 1 seule mot, ok
    if(nb == 0) {
      tab_reponses["Name"] = messageToSend;
      tab_reponses["start_at"] = debut_du_form;
      tab_reponses["end_at"] = Date.now();
      tab_reponses["cgu"] = true;
      tab_reponses["delai_AZ"] = Date.now() - debut_du_form;
      tab_reponses["date"] = new Date().toUTCString();
      tab_reponses["email_docteur"] = email;
      tab_reponses["specialite_docteur"] = specialite;
      tab_reponses["nom_docteur"] = nom;
      var datedate = Date.now() - debut_du_form;
      var date = Date.now() - debut_du_form;
      function msToTime(s) {
      var ms = s % 1000;
      s = (s - ms) / 1000;
      var secs = s % 60;
      s = (s - secs) / 60;
      var mins = s % 60;
      var hrs = (s - mins) / 60;

      return hrs + ':' + mins + ':' + secs + '.' + ms;
      }
      tab_reponses["delai_AZ_format"] = msToTime(datedate);

      // envoyez le message à 2 destinataires
      $.ajax({
        type: "GET",
        url: "envoyer_email.php",
        data: { montableau: tab_reponses },
        success: function(reponse) {
          console.log(reponse);
          firebase.database().ref().child("form").push(tab_reponses).then(function() {
            swal("Thank you for your answers, let's get into more details during our appointment.",
              "Feel free to discover more about dental and general health during your waiting time through the app or the information material we provide you with in the waiting room. I'll see you shortly.I am looking forward continuing the discussion with you. See you in a minute.",
              'success').then(function() {
              location.reload();
            });
          })
          /* swal()
          Thank you for your answers, let's get into more details during our appointment.
          Feel free to discover more about dental and general health during your waiting time through the app or the information material we provide you with in the waiting room.
          Personnalized message to be defined by the dentist
          I am looking forward continuing the discussion with you. See you in a minute.  		*/
        }
      });
      return false;
    }else {
      swal({
        title: 'Can you just give me your name please?',
        input: 'text',
        inputValue : messageToSend,
        showCancelButton: false,
        confirmButtonText: 'submit',
        showLoaderOnConfirm: true
        }).then((result) => {
        if (result.value) {
          tab_reponses["Name"] = result.value;
          tab_reponses["start_at"] = debut_du_form;
          tab_reponses["end_at"] = Date.now();
          tab_reponses["cgu"] = true;
          tab_reponses["delai_AZ"] = Date.now() - debut_du_form;
          tab_reponses["date"] = new Date().toUTCString();
          tab_reponses["email_docteur"] = email;
          tab_reponses["specialite_docteur"] = specialite;
          tab_reponses["nom_docteur"] = nom;
          var datedate = Date.now() - debut_du_form;
          var date = Date.now() - debut_du_form;
          function msToTime(s) {
          var ms = s % 1000;
          s = (s - ms) / 1000;
          var secs = s % 60;
          s = (s - secs) / 60;
          var mins = s % 60;
          var hrs = (s - mins) / 60;
          return hrs + ':' + mins + ':' + secs + '.' + ms;
          }
          tab_reponses["delai_AZ_format"] = msToTime(datedate);
          var new_nom = result.value;
          tab_reponses["reponses"][numero_question_actuelle] =  {"question" : macle, "answer" : new_nom};

          // envoyez le message à 2 destinataires
          $.ajax({
            type: "GET",
            url: "envoyer_email.php",
            data: { montableau: tab_reponses },
            success: function(reponse) {
              console.log(reponse);
              firebase.database().ref().child("form").push(tab_reponses).then(function() {
                swal("Thank you for your answers, let's get into more details during our appointment.",
                  "Feel free to discover more about dental and general health during your waiting time through the app or the information material we provide you with in the waiting room.I am looking forward continuing the discussion with you. See you in a minute.",
                  'success').then(function() {
                  location.reload();
                });
              })
              /* swal()
              Thank you for your answers, let's get into more details during our appointment.
              Feel free to discover more about dental and general health during your waiting time through the app or the information material we provide you with in the waiting room.
              Personnalized message to be defined by the dentist
              I am looking forward continuing the discussion with you. See you in a minute.  		*/
            }
          });
          return false;
        }
      })
    }
  }
  //console.log("On affiche la question "+JSON.stringify(question[keyid][cle][numero_question_actuelle]));
  if (question[keyid][cle][numero_question_actuelle] && question[keyid][cle][
      numero_question_actuelle].type == "quick_replies") {
    var template = Handlebars.compile($("#message-response-template-quickreplies").html());
    var context = {
      id: numero_question_actuelle,
      nom_docteur: nom,
      response_text: question[keyid][cle][numero_question_actuelle].question,
      response_quick: question[keyid][cle][numero_question_actuelle].reponses,
      response_dot: '<i class="fa fa-circle online ball-1" style="color: #AED2A1"></i><i class="fa fa-circle online ball-2" style="color: #AED2A6"></i><i class="fa fa-circle online ball-3" style="color:#DAE9DA"></i>',
      time: le_temps
    };
    console.log("Affichage de la question " + numero_question_actuelle);
    chatHistoryList.append(template(context));
    $("#B" + numero_question_actuelle).hide();
    $("#C" + numero_question_actuelle).hide();
    $('#content').animate({ scrollTop: $('#content').prop("scrollHeight") }, 1000);
    setTimeout(function() {
      $("#A" + numero_question_actuelle).hide(500);
      $("#B" + numero_question_actuelle).show(500);
      $("#C" + numero_question_actuelle).show(500);
      $('#content').animate({ scrollTop: $('#content').prop("scrollHeight") }, 1000);
    }.bind(this), 1500);
  } else {
    var template = Handlebars.compile($("#message-response-template").html());
    var context = {
      id: numero_question_actuelle,
      nom_docteur: nom,
      response_text: question[keyid][cle][numero_question_actuelle].question,
      response_dot: '<i class="fa fa-circle online ball-1" style="color: #AED2A1"></i><i class="fa fa-circle online ball-2" style="color: #AED2A6"></i><i class="fa fa-circle online ball-3" style="color:#DAE9DA"></i>',
      time: le_temps
    };
    console.log("Affichage de la question " + numero_question_actuelle);
    chatHistoryList.append(template(context));
    $("#B" + numero_question_actuelle).hide();
    $("#C" + numero_question_actuelle).hide();
    $('#content').animate({ scrollTop: $('#content').prop("scrollHeight") }, 1000);
    setTimeout(function() {
      $("#A" + numero_question_actuelle).hide(500);
      $("#B" + numero_question_actuelle).show(500);
      $('#content').animate({ scrollTop: $('#content').prop("scrollHeight") }, 1000);
    }.bind(this), 1500);
  }
});
$(document).on('click touch', '#back', function(event) {
  event.preventDefault();
  $("#message-to-send").val('');
  swal({
    title: 'Are you sure ?',
    text: "You will not be able to restore it!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Restart'
  }).then((result) => {
    if (result.value) {
      location.reload();
    }
  })
});
