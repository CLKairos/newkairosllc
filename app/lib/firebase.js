import serviceAccount from "../../kairosllc-c5b2d-firebase-adminsdk-fbsvc-8fabb1c320.json";
import admin from "firebase-admin";

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

function getAccessToken() {
    return new Promise(function(resolve, reject) {
        const key = serviceAccount;
        const jwtClient = new google.auth.JWT(
            key.client_email,
            null,
            key.private_key,
            SCOPES,
            null
        );
        jwtClient.authorize(function(err, tokens) {
            if (err) {
                reject(err);
                return;
            }
            resolve(tokens.access_token);
        });
    });
}