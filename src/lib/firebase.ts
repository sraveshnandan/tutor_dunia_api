// firebase.js
import admin from 'firebase-admin';
import { FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY, FIREBASE_PROJECT_ID } from '../config/credientials';



const serviceAccount = {
    projectId: FIREBASE_PROJECT_ID!,
    privateKey: FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
    clientEmail: FIREBASE_CLIENT_EMAIL!,
}
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

export { admin }
