var CronJob = require('cron').CronJob;
const firebase = require('firebase');
const admin = require("firebase-admin");
firebase.initializeApp({
	apiKey: "AIzaSyD7jeOTj9qJmDT4SZxsLDtHUVY-R2c5gDo",
	authDomain: "naturactive-48171.firebaseapp.com",
	databaseURL: "https://naturactive-48171.firebaseio.com",
	projectId: "naturactive-48171",
	storageBucket: "naturactive-48171.appspot.com",
	messagingSenderId: "781857594331"
});
admin.initializeApp({
	credential: admin.credential.cert({
		"type": "service_account",
		"project_id": "naturactive-48171",
		"private_key_id": "c05bc0e884044e99cc1b4a522a0bcc83fb0fa470",
		"private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC1b86qH6ca4MrY\nZ3kLLyn5kQ7W3OKmd10BcA0ZNFHf677u72+TXM/RqwVHrwHOemyz9EZ95VOzsIcK\n17+UTt/ssfsNZDm2LAjfmcDbRzrdVDmklAuiN1fRUD+KVf1i33NPWEmPeEo/QKIG\nWls2K189Eo390lX3YjJmWidA6+6ZN7EF/ifa9URXR5N87ItRXWR2VTcTgJWV/dk6\nCGV95TlH0nVnT7Lmgd2yBin1bjMdSfBAproUqpOaaKbEPVroDSUknaIek9eIHcDj\njF4EA53D/KCwYJce1wSFPSb7oVVH5Vh+6lCfyNOmsf3FW1Ho/jLH2fZS12fzp9e2\nydqx/vltAgMBAAECggEAFXpMzpq8n1Po70EgdRB6OY7QYOL4+Ze7rMXk5wzofEdd\n7M7vOFSOTVWfZGL1JcocQBk0lwakp+rHsaLkjNvhahWPkIBCzKvdyQpcaBjAgR7N\nTAwybFt8y8xiGTAgtKma7tOWsaMdtushwvrDPWBY/9PIdzmE76nyKWeWqfrD3eMk\nILdPuCAR28nzDc8MckOJ1h25jIQPKPEvHa8zikXQVxi5G5LZuHh2x0ZBIkh6N3Fk\nJqYWR6TlUUATOH8xkNVquYim8C2KvXgBMf9BzmrQ6xeUfzvtl9nT+BdfOze1+mw4\nBLZh7HjSYHPbhK/25kmleEmaFREmV4xfH2NKKHz9AQKBgQD9fgUFSRrw2fYk7oea\n/jQGf0FgkSl4nLabSdHpT1lwdnVb3H3TZPNvTFl0/Z3o5iwEDTFJMzoWDrdATSeZ\nSBdMZnvnOb2Izpzs1OVQQtscB9QDZXudX+Qv+KdmfRJxVm1FDf544aXqqlNguyG2\n5RE7six6Nm/meuohORjsg1jgzQKBgQC3O03LRm0JYVeKrb07yAqs6IG7pALpmHNC\ndqMTIgctbqn6lIXNcgqHfANppf2tznWlMATi7mbjoyRI0F1LW8Dun0QZPcjQX8og\n4IGTAxFuEjOVWJuPbtkY/XXl5RXhKr9WZY6AuzU6pbVmT5qzKWTBsh6oCt/nFULO\nMQ5Dp6X7IQKBgE+bFK6NP7WlbUQ52EIXVHU532kZDSIAbOQlcZNIRPkpaj+X5bfO\nOxiXrHwt7TonlmkLT5ACU1p78pZx5F6hohdvE7gQjPH6mJNTZFQpOq/50V3jr8dD\nRuC9wKxR2MnY72XBOEnz6uvf42E8QyExnJDXqloS4F9L+FzIlogn03B9AoGAV9FS\nfaRpSd+fh1Wxpl8/zpM46me3BaINS8N0cQ0UB5BMY06fulF3/mtPb2kg5hZXiC41\niVXddiiQkV1b+WwmUbd/eeGEx2nBhHRVZdJInkqW8nMfS2VDI5kG0oIzNFG6lnvi\nCoyu/EbDZB+u80NZiQQHcV6U5TnpZM1aGs7U3EECgYBfdD+OUxZV6wyB4Y/5hgTo\nid58Aict8dDdygjkyeoM4he+KIqjmI1+6AGsEgnaqhTu5EgkEnu34e//379sMKsr\nXyUD42urxMx2SjnoeOau2GZLffdvC+j4q9YlvAO0oYAFqroHN7ZIKMbXOOSTxnw+\nJfPYJx9lJ8Npvnx4F4LLsA==\n-----END PRIVATE KEY-----\n",
		"client_email": "firebase-adminsdk-w9hlc@naturactive-48171.iam.gserviceaccount.com",
		"client_id": "112693176529829760422",
		"auth_uri": "https://accounts.google.com/o/oauth2/auth",
		"token_uri": "https://accounts.google.com/o/oauth2/token",
		"auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
		"client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-w9hlc%40naturactive-48171.iam.gserviceaccount.com"
	}),
	databaseURL: "https://naturactive-48171.firebaseio.com"
});
var bot = require('./bot.js');

var job = new CronJob({
  cronTime: "*/1 * * * *", // everyday, 9:13, 11:13, 4:13, 8:13,
  onTick: bot.start(),
  start: true,
  timeZone: "America/Los_Angeles"
});

job.start();
