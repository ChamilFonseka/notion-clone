import { App, initializeApp, getApps, getApp, cert, ServiceAccount } from "firebase-admin/app";
import serviceAccount from "@/service-account-key.json";
import { getFirestore } from "firebase-admin/firestore";

let adminApp: App;

if (getApps().length === 0) {
  adminApp = initializeApp({
    credential: cert(serviceAccount as ServiceAccount),
  });
} else {
  adminApp = getApp();
}

const adminDb = getFirestore(adminApp);

export { adminApp, adminDb };