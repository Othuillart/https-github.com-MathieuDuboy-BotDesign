const firebase = require('firebase');
const fetch = require('node-fetch');
const admin = require("firebase-admin");
const request = require('request');
const requestify = require('requestify');



firebase.initializeApp({
		apiKey: "AIzaSyD9n0awipZ7lrK-MEeTKzoJWmG5p2ToF2M",
    authDomain: "naturactive-894c1.firebaseapp.com",
    databaseURL: "https://naturactive-894c1.firebaseio.com",
    projectId: "naturactive-894c1",
    storageBucket: "naturactive-894c1.appspot.com",
    messagingSenderId: "880317619228"
});
admin.initializeApp({
	credential: admin.credential.cert({
	  "type": "service_account",
	  "project_id": "naturactive-894c1",
	  "private_key_id": "54b6d84ae61f604910a766d181614ae701a23708",
	  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCv92ZJKkGDBcVY\nmhSiKd+xiHzuuaBMbBc1GRQ/TS8Ak6iBs9LASSc2CABj9utykL/1e88rOlaA7H5j\npC5X9on676UpHdGByacRzn0bpHKIKrhEEwdC9TQuoFhDIY7lQ3e0Uz8tVXRv3cyv\nqtjSvm++7MUUkWNe1oO70Qb3FsmQra6lq6jRgn6lu1H94oHysiwrFNTkdrV+sBQU\no7ZCRj6KUo6xvx1pQLMn2+kRpRaF94V4MsSqHIz2yRYheloHbGT6enXGvvANyavU\nLFPilU6MXF1ehXyU/WkuACnsTqfnUzNE4J4E3In80e6aWlPl80tvJmI3PkNUiYPN\nFmeLSL8fAgMBAAECggEADdj7SXpNnRqUKCyf8qidVbxDw9ZpzfnOB1V86Wpdu4uv\n/anOeQFVi52SyLGCxjyr6CahHzbARFvYEM4eM4ZPeQ1PQwgTF6w5Ci0X9vGFbdlm\nyaMLT3Kg2gmv4g1YnT3AKtNH30ptSlLH3wvwpwA2wDo9XCjNpOxetSYPu6jyBDRb\nzs0G8vAO+3PjszBByRV/DiPwSYUzNXXKQeczmm6KaD1imX9cc4gIlEv1mDpvJQcd\n+juYJiGLv2umFZJe5fBQ0xMwdPkZjGFNpIURR523i8V9E+V5rpydzgGkhIHNZgXF\ngBnAwLC/cvZsuftIKri/oTYp0xidsERNPxi/ESK4MQKBgQDVb8ha3xlHWfyr2Pfp\nDktWe8K6oK03EIoasokrDCedCb4qiuJJSthDbV/ieAM3YYp46RfdT4v2L5ueCFT2\nPOvusG7lZirKg4+kkoYmvcJcrfh1rZwjRXXJfRDOVEFo6i6ies7F9RY0oncKsmN0\nZfr3hPSBXu16nsb3UIeioaDWlwKBgQDTDrZa9q3wIVIvBT1sa4VGf7qJ0SZttZs9\n3kicqYoS9uVRbzTEzlauPD/pC++YYtO6j3vWKb8lHCq+ad+lUSCxhujuLIp9uMi0\net2chqtgMD2aNTKTNp3pASWOQaMQ/lsAdcNLi76A7dqaV9i+5dmdVJ4n0tLayzQs\nUbDw/yE0uQKBgEHNZbrGX3fFAYZFrSDX/Fgcbcu179EzMzDJ7EouRCRBNbTN/rfT\n8FrRZKdgkrVHSDbAvk/Hz4HF6bdOIEuOOrrrADWPSxAGgYmedueIx1xlcl1ted7R\n8l99RGooRcY/tML5E7iqN/9gO0079DeVnUskXXFpP9P3EaZ72GVGaVzfAoGAU4P1\n2sbUCzpUN/D93kIpqbzvRouxhiYfuPqVhxB7Z4e1NGUp31q66BVFQOWNOKKan68Z\nVKSOU5PywghJDDSvGDCHSX/siVUubmRT/xU3CUftiHDWg3RQRhxDDSih6x6LSgJP\ndjxk9MWqA/sQ9HEljGEoeB+veg6ApazptGNwc1kCgYEAplQpwNWMlPSoev7W4oHg\nvE40DcFKMNNTbkSF8ikkSkLPADj7gme52U9wtoY3itLM5hw+Vzi3gTnVSFyPEI5C\ndHq0NLM4sdckQywGjQK5USDpFNtEmJVSlSnEPaV61DxkVc9W8JEw5KDJogANL917\n2x7z7faTvJ3NkgohI1rZamo=\n-----END PRIVATE KEY-----\n",
	  "client_email": "firebase-adminsdk-o2utm@naturactive-894c1.iam.gserviceaccount.com",
	  "client_id": "103372006200657872941",
	  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
	  "token_uri": "https://accounts.google.com/o/oauth2/token",
	  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
	  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-o2utm%40naturactive-894c1.iam.gserviceaccount.com"
	}),
	databaseURL: "https://naturactive-894c1.firebaseio.com"
});


var timeObject = new Date();
var date_avant_5 = new Date(timeObject .getTime() - 300000); // 20min
var date_avant_15 = new Date(timeObject .getTime() - 900000); // 20min
// 60 000 = 60 seconds
timeObject = Date.parse(timeObject);
date_avant_5 = Date.parse(date_avant_5);
date_avant_15 = Date.parse(date_avant_15);
console.log("date_avant_15 : "+date_avant_15);
console.log("date_avant_5 : "+date_avant_5);
firebase.database().ref('accounts').orderByChild("date_last_interaction").startAt(date_avant_15).endAt(date_avant_5).limitToFirst(100).once("value")
.then(function(snapshot) {
	console.log('Voici les snapshot : '+JSON.stringify(snapshot))
snapshot.forEach(function(value){
  var key = value.key;
	console.log("key : "+key);
    var id = value.val().fbid;
		console.log('on envoi à lui : '+id);
		var dernier_mail = value.val().date_last_mail;
		var derniere_relance_satisfaction = value.val().derniere_relance_satisfaction;
		var now = Date.now();
		var timetimeObject = new Date();
		var il_y_a_24h = new Date(timetimeObject.getTime() - 21600000);
		console.log("il_y_a_24h : "+il_y_a_24h);
		var googdate = Date.parse(il_y_a_24h);
		console.log("googdate : "+googdate);
		console.log("derniere_relance_satisfaction : "+derniere_relance_satisfaction);
		if( (derniere_relance_satisfaction == false) && (derniere_relance_satisfaction >= googdate))
		{
			console.log("Une seule relance par jour car "+derniere_relance_satisfaction+" est >= à "+googdate);
		}
		else if(derniere_relance_satisfaction >= googdate){
			console.log("2 Une seule relance par jour car "+derniere_relance_satisfaction+" est >= à "+googdate);
		}
		else if((derniere_relance_satisfaction == undefined)  || (derniere_relance_satisfaction == false) || (derniere_relance_satisfaction <= googdate)){
				var message = {
				    "text": "Avez-vous obtenu la réponse à votre question ?",
				    "quick_replies":[
				      {
				        "content_type":"text",
				        "title":"Oui",
				        "image_url": "https://mon-chatbot.com/checked.png",
				        "payload":"OUI_CEST_PARFAIT"
				      },
				      {
				        "content_type":"text",
				        "title":"Non",
				        "image_url": "https://mon-chatbot.com/cancel.png",
				        "payload":"NON_JAI_PAS_TROUVE"
				      }

				    ]
				};

				/*markers.messaging_type = "RESPONSE";
				markers.recipient = {id : fbid};

				var options = {
				  uri: 'https://graph.facebook.com/v2.6/me/messages?access_token=EAABqv81NS1ABAIn8NZAPCRTx4qLacMqeGts6EDEIV10Ad8owhhO7ZACsuxyemBydnc3ZA0UnOHGetSMiNxjZBwcn46BdCyD7uSVLs2EfTa0Tipr2zZAXuYJ1FRvNK1ACQasZBio2sXet7zIxebZALtFf7cmzEJeZAXMcpltvKQMVvQZDZD',
				  method: 'POST',
				  json: markers
				};*/

				// si dernier_mail date de moins de 24h, ne pas demander et remove
				//firebase.database().ref('accounts/'+key).child("date_last_interaction").remove();
				// sinon
				if(dernier_mail) {
					firebase.database().ref('accounts/'+key).child("date_last_interaction").remove();
					firebase.database().ref('accounts/'+key).child("date_last_mail").remove();
				}
				else {
					var type = "RESPONSE";
					var body = JSON.stringify({
						messaging_type: type,
						recipient: {
							id
						},
						message
					});
					console.log(body);
					var qs = 'access_token=EAADHURv0ZB9kBACrJZALnUuDc0ZAspZCZBUZBt6FZAurWuPOOhx9p6pMjRgeMMUnNNGZCdNFAbQqn5ZCZAKHZAohNq0Q8oL046Qa53KRVujyBjnTAN5DBtJ7F3EEZAMTyZACFeROBBEU9lf7oP4GeRLz7O7ecE7jYyHlPYEGyvQZB25mR64AZDZD';
					return fetch('https://graph.facebook.com/me/messages?' + qs, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body,
					}).then(rsp => rsp.json()).then(json => {
						if (json.error && json.error.message) {
							console.log(json.error.message + ' ' + json.error.type + ' ' + json.error.code + ' ' + json.error.error_subcode + ' ' + json.error.fbtrace_id);
						}else {
							console.log("REUSSITE CRON pour la clé "+key);
							firebase.database().ref('accounts/'+key).child("date_last_interaction").remove();
							var date = Date.now();
							firebase.database().ref('accounts/'+key).child("derniere_relance_satisfaction").set(date);
						}
						return json;
					});

				}

}

})
}).catch(function(error) {
	console.log('Errur firebae : '+error)
});
