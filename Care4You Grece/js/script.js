// mail a derouler selon le forumaire envoyé
// boucles If else
// http://localhost:8888/index.html?email=test@aze.fr&nom=James%20Shepard&specialite=Chrirugien%20Dentiste%20etc&image=https://resize-public.ladmedia.fr/img/var/public/storage/images/dossiers/musique-cine-series/news/grey-s-anatomy-docteur-mamour-ne-serait-pas-vraiment-mort-1407392/36635951-1-fre-FR/Grey-s-Anatomy-Docteur-Mamour-ne-serait-pas-vraiment-mort-!.jpg
var debut_du_form = Date.now();
var config = {
   apiKey: "AIzaSyCJSRXDK4EXLQodQCO7wsNREmJ5WJI7-hE",
   authDomain: "care4you-a9bce.firebaseapp.com",
   databaseURL: "https://care4you-a9bce.firebaseio.com",
   projectId: "care4you-a9bce",
   storageBucket: "care4you-a9bce.appspot.com",
   messagingSenderId: "793129154864"
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
					"Γεια σας και καλωσήρθατε στο ιατρείο μου.",
					"Πριν από το ραντεβού μας, θα ήθελα να σας κάνω μερικές ερωτήσεις.",
					"Πρώτον, ποιος είναι ο κύριος λόγος της επίσκεψής σας;"
				],
        "reponses": [
					"Έλεγχος ρουτίνας",
					"Αιμορραγία ή/και πόνος στα ούλα",
					"Πόνος στα δόντια"
				]
			}
		]
	},
  {
    "Έλεγχος ρουτίνας": [
      {
        "type": "quick_replies",
        "question": [
					"Γεια σας και καλωσήρθατε στο ιατρείο μου.",
					"Πριν από το ραντεβού μας, θα ήθελα να σας κάνω μερικές ερωτήσεις.",
					"Πρώτον, ποιος είναι ο κύριος λόγος της επίσκεψής σας;"
				],
        "reponses": [
					"Έλεγχος ρουτίνας",
					"Αιμορραγία ή/και πόνος στα ούλα",
					"Πόνος στα δόντια"
				]
			},
      {
        "type": "quick_replies",
        "question": [
					"Καλώς. Είστε γυναίκα ή άντρας;"
				],
        "reponses": [
					"🚹 Άντρας",
					"🚺 Γυναίκα"
				]
			},
      {
        "type": "quick_replies",
        "question": [
					"Ύπάρχει περίπτωση εγκυμοσύνης;"
				],
        "reponses": [
					"✔️ Ναι",
					"✖️ Όχι"
				]
			},
      {
        "type": "quick_replies",
        "question": [
					"Πότε ήταν η τελευταία φορά που πήγατε στον Οδοντίατρο;"
				],
        "reponses": [
					"Μέσα στον προηγούμενο μήνα",
					"1 - 6 μήνες πριν",
					"6 - 12 μήνες πριν",
					"Περισσότερο από ένα χρόνο πριν"
				]
			},
      {
        "type": "quick_replies",
        "question": [
					"Πόσο συχνά βουρτσίζετε τα δόντια σας;"
				],
        "reponses": [
					"3 φορές την ημέρα",
					"2 φορές την ημέρα",
					"1 φορά την ημέρα",
					"Λιγότερο συχνά"
				]
			},
      {
        "type": "quick_replies",
        "question": [
					"Ποιος είναι ο μέσος χρόνος βουρτσίσματός σας;"
				],
        "reponses": [
					"Λιγότερο από 1 λεπτό",
					"Μεταξύ 1 και 2 λεπτών",
					"Μεταξύ 2 και 3 λεπτών",
					"Παραπάνω από 3 λεπτά"
				]
			},
      {
        "type": "quick_replies",
        "question": [
					"Ακολουθείτε κάποια φαρμακευτική αγωγή αυτήν την περίοδο;"
				],
        "reponses": [
					"✔️ Ναι",
					"✖️ Όχι"
				]
			},
      {
        "type": "quick_replies",
        "question": [
					"Θα χαρακτηρίζατε τη γενική κατάσταση της υγείας σας καλή;"
				],
        "reponses": [
					"✔️ Ναι",
					"✖️ Όχι"
				]
			},
      {
        "type": "quick_replies",
        "question": [
					"Θα λέγατε ότι έχετε μια καλή στοματική υγεία;"
				],
        "reponses": [
					"✔️ Ναι",
					"✖️ Όχι"
				]
			},
      {
        "type": "quick_replies",
        "question": [
					"Έχετε κάποια προσθετική εργασία (σιδεράκια, γέφυρα, εμφύτευμα, τεχνητή οδοντοιχία);"
				],
        "reponses": [
					"✔️ Ναι",
					"✖️ Όχι"
				]
			},
      {
        "type": "quick_replies",
        "question": [
					"Πάσχετε από κακοσμία του στόματος;"
				],
        "reponses": [
					"✔️ Ναι",
					"✖️ Όχι"
				]
			},
      {
        "type": "quick_replies",
        "question": [
					"Αυτήν την περίοδο χρησιμοποιείτε στοματικό διάλυμα, μεσοδόντια βουρτσάκια ή οδοντικό νήμα;"
				],
        "reponses": [
					"✔️ Ναι",
					"✖️ Όχι"
				]
			},
      {
        "type": "quick_replies",
        "question": [
					"Το χαμόγελό σας αποτελεί λόγο να αισθάνεστε άβολα;"
				],
        "reponses": [
					"✔️ Ναι",
					"✖️ Όχι"
				]
			},
      {
        "type": "quick_replies",
        "question": [
					"Είστε ευχαριστημένος/η με τη λευκότητα των δοντιών σας;"
				],
        "reponses": [
					"✔️ Ναι",
					"✖️ Όχι"
				]
			},
      {
        "type": "quick_replies",
        "question": [
					"Είστε ευχαριστημένος/η με τη διάταξη των δοντιών σας;"
				],
        "reponses": [
					"✔️ Ναι",
					"✖️ Όχι"
				]
			},
      {
        "type": "text",
        "question": [
					"Μπορείτε να μου πείτε το μικρό σας όνομα ;"
				]
			}
		]
	},
  {
    "Αιμορραγία ή/και πόνος στα ούλα": [
      {
        "type": "quick_replies",
        "question": [
					"Γεια σας και καλωσήρθατε στο ιατρείο μου.",
					"Πριν από το ραντεβού μας, θα ήθελα να σας κάνω μερικές ερωτήσεις.",
					"Πρώτον, ποιος είναι ο κύριος λόγος της επίσκεψής σας;"
				],
        "reponses": [
					"Έλεγχος ρουτίνας",
					"Αιμορραγία ή/και πόνος στα ούλα",
					"Πόνος στα δόντια"
				]
			},
      {
        "type": "quick_replies",
        "question": [
					"Καλώς. Είστε γυναίκα ή άντρας;"
				],
        "reponses": [
					"🚹 Άντρας",
					"🚺 Γυναίκα"
				]
			},
      {
        "type": "quick_replies",
        "question": [
					"Ύπάρχει περίπτωση εγκυμοσύνης;"
				],
        "reponses": [
					"✔️ Ναι",
					"✖️ Όχι"
				]
			},
      {
        "type": "quick_replies",
        "question": [
					"Πότε ήταν η τελευταία φορά που πήγατε στον Οδοντίατρο;"
				],
        "reponses": [
					"Μέσα στον προηγούμενο μήνα",
					"1 - 6 μήνες πριν",
					"6 - 12 μήνες πριν",
					"Περισσότερο από ένα χρόνο πριν"
				]
			},
      {
        "type": "quick_replies",
        "question": [
					"Πόσο συχνά βουρτσίζετε τα δόντια σας;"
				],
        "reponses": [
					"3 φορές την ημέρα",
					"2 φορές την ημέρα",
					"1 φορά την ημέρα",
					"Λιγότερο συχνά"
				]
			},
      {
        "type": "quick_replies",
        "question": [
					"Ποιος είναι ο μέσος χρόνος βουρτσίσματός σας;"
				],
        "reponses": [
					"Λιγότερο από 1 λεπτό",
					"Μεταξύ 1 και 2 λεπτών",
					"Μεταξύ 2 και 3 λεπτών",
					"Παραπάνω από 3 λεπτά"
				]
			},
      {
        "type": "quick_replies",
        "question": [
					"Ακολουθείτε κάποια φαρμακευτική αγωγή αυτήν την περίοδο;"
				],
        "reponses": [
					"✔️ Ναι",
					"✖️ Όχι"
				]
			},
      {
        "type": "quick_replies",
        "question": [
					"Θα χαρακτηρίζατε τη γενική κατάσταση της υγείας σας καλή;"
				],
        "reponses": [
					"✔️ Ναι",
					"✖️ Όχι"
				]
			},
      {
        "type": "quick_replies",
        "question": [
					"Θα λέγατε ότι έχετε μια καλή στοματική υγεία;"
				],
        "reponses": [
					"✔️ Ναι",
					"✖️ Όχι"
				]
			},
      {
        "type": "quick_replies",
        "question": [
					"Έχετε κάποια προσθετική εργασία (σιδεράκια, γέφυρα, εμφύτευμα, τεχνητή οδοντοιχία);"
				],
        "reponses": [
					"✔️ Ναι",
					"✖️ Όχι"
				]
			},
      {
        "type": "quick_replies",
        "question": [
					"Αιμορραγούν τα ούλα σας κατά τη διάρκεια του βουρτσίσματος;"
				],
        "reponses": [
					"✔️ Ναι",
					"✖️ Όχι"
				]
			},
      {
        "type": "quick_replies",
        "question": [
					"Πόσο συχνά;"
				],
        "reponses": [
					"Σε κάθε βούρτσισμα",
					"Τουλάχιστον 1 φορά την ημέρα",
					"Τουλάχιστον 1 φορά την εβδομάδα",
					"Τουλάχιστον 1 φορά το μήνα"
				]
			},
      {
        "type": "quick_replies",
        "question": [
					"Πάσχετε από κακοσμία του στόματος;"
				],
        "reponses": [
					"✔️ Ναι",
					"✖️ Όχι"
				]
			},
      {
        "type": "quick_replies",
        "question": [
					"Πάσχετε από κακοσμία του στόματος;"
				],
        "reponses": [
					"✔️ Ναι",
					"✖️ Όχι"
				]
			},
      {
        "type": "quick_replies",
        "question": [
					"Έχετε παρατηρήσει τα δόντια σας να κουνιούνται ή τα ούλα σας να υποχωρούν;"
				],
        "reponses": [
					"✔️ Ναι",
					"✖️ Όχι"
				]
			},
      {
        "type": "quick_replies",
        "question": [
					"Αυτήν την περίοδο χρησιμοποιείτε στοματικό διάλυμα, μεσοδόντια βουρτσάκια ή οδοντικό νήμα;"
				],
        "reponses": [
					"✔️ Ναι",
					"✖️ Όχι"
				]
			},
      {
        "type": "text",
        "question": [
					"Μπορείτε να μου πείτε το μικρό σας όνομα ;"
				]
			}
		]
	},
  {
    "Πόνος στα δόντια": [
      {
        "type": "quick_replies",
        "question": [
					"Γεια σας και καλωσήρθατε στο ιατρείο μου.",
					"Πριν από το ραντεβού μας, θα ήθελα να σας κάνω μερικές ερωτήσεις.",
					"Πρώτον, ποιος είναι ο κύριος λόγος της επίσκεψής σας;"
				],
        "reponses": [
					"Έλεγχος ρουτίνας",
					"Αιμορραγία ή/και πόνος στα ούλα",
					"Πόνος στα δόντια"
				]
			},
      {
        "type": "quick_replies",
        "question": [
					"Καλώς. Είστε γυναίκα ή άντρας;"
				],
        "reponses": [
					"🚹 Άντρας",
					"🚺 Γυναίκα"
				]
			},
      {
        "type": "quick_replies",
        "question": [
					"Ύπάρχει περίπτωση εγκυμοσύνης;"
				],
        "reponses": [
					"✔️ Ναι",
					"✖️ Όχι"
				]
			},
      {
        "type": "quick_replies",
        "question": [
					"Πότε ήταν η τελευταία φορά που πήγατε στον Οδοντίατρο;"
				],
        "reponses": [
					"Μέσα στον προηγούμενο μήνα",
					"1 - 6 μήνες πριν",
					"6 - 12 μήνες πριν",
					"Περισσότερο από ένα χρόνο πριν"
				]
			},
      {
        "type": "quick_replies",
        "question": [
					"Πόσο συχνά βουρτσίζετε τα δόντια σας;"
				],
        "reponses": [
					"3 φορές την ημέρα",
					"2 φορές την ημέρα",
					"1 φορά την ημέρα",
					"Λιγότερο συχνά"
				]
			},
      {
        "type": "quick_replies",
        "question": [
					"Ποιος είναι ο μέσος χρόνος βουρτσίσματός σας;"
				],
        "reponses": [
					"Λιγότερο από 1 λεπτό",
					"Μεταξύ 1 και 2 λεπτών",
					"Μεταξύ 2 και 3 λεπτών",
					"Παραπάνω από 3 λεπτά"
				]
			},
      {
        "type": "quick_replies",
        "question": [
					"Ακολουθείτε κάποια φαρμακευτική αγωγή αυτήν την περίοδο;"
				],
        "reponses": [
					"✔️ Ναι",
					"✖️ Όχι"
				]
			},
      {
        "type": "quick_replies",
        "question": [
					"Θα χαρακτηρίζατε τη γενική κατάσταση της υγείας σας καλή;"
				],
        "reponses": [
					"✔️ Ναι",
					"✖️ Όχι"
				]
			},
      {
        "type": "quick_replies",
        "question": [
					"Θα λέγατε ότι έχετε μια καλή στοματική υγεία;"
				],
        "reponses": [
					"✔️ Ναι",
					"✖️ Όχι"
				]
			},
      {
        "type": "quick_replies",
        "question": [
					"Έχετε κάποια προσθετική εργασία (σιδεράκια, γέφυρα, εμφύτευμα, τεχνητή οδοντοιχία);"
				],
        "reponses": [
					"✔️ Ναι",
					"✖️ Όχι"
				]
			},
      {
        "type": "quick_replies",
        "question": [
					"Τα ζεστά σας προκαλούν πόνο στα δόντια;"
				],
        "reponses": [
					"✔️ Ναι",
					"✖️ Όχι"
				]
			},
      {
        "type": "quick_replies",
        "question": [
					"Αισθάνεστε ότι το κρύο σας προκαλεί πόνο στα δόντια;"
				],
        "reponses": [
					"✔️ Ναι",
					"✖️ Όχι"
				]
			},
      {
        "type": "quick_replies",
        "question": [
					"Τα αλμυρά ή γλυκά σας προκαλούν πόνο στα δόντια;"
				],
        "reponses": [
					"✔️ Ναι",
					"✖️ Όχι"
				]
			},
      {
        "type": "quick_replies",
        "question": [
					"Νιώθετε πόνο στα δόντια κατά τη διάρκεια του βουρτσίσματος;"
				],
        "reponses": [
					"✔️ Ναι",
					"✖️ Όχι"
				]
			},
      {
        "type": "quick_replies",
        "question": [
					"Πόσο συχνά εμφανίζεται ο πόνος;"
				],
        "reponses": [
					"3 φορές την ημέρα",
					"2 φορές την ημέρα",
					"1 φορά την ημέρα",
					"Λιγότερο συχνά"
				]
			},
      {
        "type": "quick_replies",
        "question": [
					"Σε μια κλίμακα πόνου από το 1 έως το 10,  επιλέξτε το επίπεδο πόνου που αισθάνεστε κατά την επαφή με ένα από τα παραπάνω ερεθίσματα:"
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
					"Είχατε ποτέ τερηδόνα;"
				],
        "reponses": [
					"✔️ Ναι",
					"✖️ Όχι"
				]
			},
      {
        "type": "text",
        "question": [
					"Μπορείτε να μου πείτε το μικρό σας όνομα ;"
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
    title: '<i>Οροι χρήσης</i>',
    type: 'info',
    html: '<p style="text-align:left;height: 140px;overflow-y: scroll;">'+pipotin+'</p>',
    showCloseButton: true,
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText: '<i class="fa fa-thumbs-up"></i> Συμφωνώ !',
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
  if (messageToSend == 'Έλεγχος ρουτίνας') {
    cle = 'Έλεγχος ρουτίνας';
    keyid = 1;
    tab_reponses["Form"] = cle;
  }
  if (messageToSend == 'Αιμορραγία ή/και πόνος στα ούλα') {
    cle = 'Αιμορραγία ή/και πόνος στα ούλα';
    keyid = 2;
    tab_reponses["Form"] = cle;
  }
  if (messageToSend == 'Πόνος στα δόντια') {
    cle = 'Πόνος στα δόντια';
    keyid = 3;
    tab_reponses["Form"] = cle;
  }
  // IF ELSE MALE Female
  if (messageToSend == "🚺 Γυναίκα") {
    numero_question_actuelle = 2;
    var macle = question[keyid][cle][numero_question_actuelle - 1].question[0];
    tab_reponses["GENDER"] = messageToSend;
    // {"1":"Έλεγχος ρουτίνας","3":"✔️ Ναι","4":"Μέσα στον προηγούμενο μήνα","GENDER":"🚺 Γυναίκα"}
  }
  if (messageToSend == "🚹 Άντρας") {
    numero_question_actuelle = 3;
    var macle = question[keyid][cle][numero_question_actuelle - 1].question[0];
    tab_reponses["GENDER"] = messageToSend;

  } // {"1":"Έλεγχος ρουτίνας","4":"Μέσα στον προηγούμενο μήνα","GENDER":"🚹 Άντρας"}
  if(messageToSend != "🚺 Γυναίκα" && messageToSend != "🚹 Άντρας") {
    var macle = question[keyid][cle][numero_question_actuelle - 1].question[0];
    if(macle == undefined) macle = 'Reason';
    tab_reponses["reponses"][numero_question_actuelle] = {"question" : macle, "answer" : messageToSend};
    console.log('ajout ok')
  }

  if(cle == 'Αιμορραγία ή/και πόνος στα ούλα' && numero_question_actuelle == 11 && messageToSend == "✔️ Ναι") {
    console.log("on va afficher la prochaine question");
  }
  if(cle == 'Αιμορραγία ή/και πόνος στα ούλα' && numero_question_actuelle == 11 && messageToSend == "✖️ Όχι") {
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
    'Μπορείτε να μου πείτε το μικρό σας όνομα ;') {
    // c'est terminé !!
    // mettre en forme le message
    var nb = messageToSend.split(' ').length;
    // if 1 seule mot, ok
    if(nb == 1) {
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
            swal("Σας ευχαριστώ για τις απαντήσεις σας, θα πούμε περισσότερα κατά τη διάρκεια του ραντεβού μας.",
              "Ανακαλύψτε περισσότερα για τη στοματική και τη γενικότερη υγεία σας μέσα από την εφαρμογή κατά το χρόνο αναμονής σας. Θα σας δω σε λίγο.",
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
        title: 'Μπορείτε να μου παράσχετε ΜΟΝΟ το όνομά σας παρακαλώ;',
        input: 'text',
        inputValue : messageToSend,
        showCancelButton: false,
        confirmButtonText: 'υποβάλλουν',
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
                swal("Σας ευχαριστώ για τις απαντήσεις σας, θα πούμε περισσότερα κατά τη διάρκεια του ραντεβού μας.",
                  "Ανακαλύψτε περισσότερα για τη στοματική και τη γενικότερη υγεία σας μέσα από την εφαρμογή κατά το χρόνο αναμονής σας. Θα σας δω σε λίγο.",
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
    title: 'Είσαι σίγουρος ?',
    text: "Δεν θα μπορείτε να το επαναφέρετε αυτό!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Επανεκκίνηση'
  }).then((result) => {
    if (result.value) {
      location.reload();
    }
  })
});
