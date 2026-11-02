// lib/firebaseAdmin.ts
import { initializeApp, getApps, cert, App } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

let app: App;

if (!getApps().length) {
  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
    ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
    : undefined;

  if (serviceAccount) {
    app = initializeApp({
      credential: cert(serviceAccount),
      databaseURL: "https://loja-f2c5b-default-rtdb.firebaseio.com/",
    });
  }
} else {
  app = getApps()[0];
}

export { app };
export const adminAuth = getAuth(app!);
export const adminDb = getFirestore(app!);