import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
 apiKey: "AIzaSyArPTP5BdZ130WlnNxMdfAeRPxdxqb_2Cg",
  authDomain: "lost-found-system-5998a.firebaseapp.com",
  projectId: "lost-found-system-5998a",
  storageBucket: "lost-found-system-5998a.firebasestorage.app",
  messagingSenderId: "134123025708",
  appId: "1:134123025708:web:6635203368c65001fae889"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app