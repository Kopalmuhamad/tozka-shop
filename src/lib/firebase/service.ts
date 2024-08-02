import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import bcrypt from "bcrypt";
import app from "./init";

const firestore = getFirestore(app);

export async function retrieveData(collectionName: string) {
  const snapshot = await getDocs(collection(firestore, collectionName));
  const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return data;
}

export async function retrieveDataById(collectionName: string, id: string) {
  const snapshot = await getDoc(doc(firestore, collectionName, id));
  const data = snapshot.data;
  return data;
}

export async function signUp(userData: {
  email: string;
  fullname: string;
  password: string;
  phone: string;
  role?: string;
}): Promise<boolean> {
  try {
    const q = query(
      collection(firestore, "users"),
      where("email", "==", userData.email)
    );
    const snapshot = await getDocs(q);
    const existingUsers = snapshot.docs.map((doc) => doc.data());

    if (existingUsers.length > 0) {
      return false; // User already exists
    }

    if (!userData.role) {
      userData.role = "member";
    }

    userData.password = await bcrypt.hash(userData.password, 10);
    await addDoc(collection(firestore, "users"), userData);

    return true;
  } catch (error) {
    console.error("Error in signUp:", error);
    return false;
  }
}
