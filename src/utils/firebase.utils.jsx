import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  Timestamp,
  query,
  orderBy,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Cloud Firestore
const db = getFirestore(firebaseApp);

// Initialize Firebase Auth provider
const provider = new GoogleAuthProvider();

// Force the user to select an account
provider.setCustomParameters({
  prompt: "select_account ",
});

export const auth = getAuth();

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      return user;
    })
    .catch((error) => {
      return error;
    });

setPersistence(auth, browserSessionPersistence)
  .then(() => {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
    // return signInWithEmailAndPassword(auth, email, password);
  })
  .catch((error) => {
    // Handle Errors here.
  });

// Fetch all tasks
export const fetchTasksFromFirestore = async () => {
  const user = auth.currentUser;
  const tasksCollectionRef = collection(db, "users", user.uid, "tasks");
  // First order by 'completed', then by 'createdAt'
  const q = query(
    tasksCollectionRef,
    orderBy("completed", "asc"),
    orderBy("createdAt", "desc")
  );
  const querySnapshot = await getDocs(q);
  const tasks = querySnapshot.docs.map((doc) => {
    const taskData = doc.data();
    return {
      id: doc.id,
      ...taskData,
      createdAt: taskData.createdAt
        ? taskData.createdAt.toDate().toISOString()
        : null,
    };
  });
  return tasks;
};

// Add a new task
export const addTaskToFirestore = async (taskData) => {
  const user = auth.currentUser;
  const task = {
    ...taskData,
    completed: false,
    createdAt: Timestamp.now(),
  };
  const tasksCollectionRef = collection(db, "users", user.uid, "tasks");
  const docRef = await addDoc(tasksCollectionRef, task);
  return { id: docRef.id, ...task };
};

// Update a task
export const updateTaskInFirestore = async (taskId, updatedData) => {
  const user = auth.currentUser;
  const taskDocRef = doc(db, "users", user.uid, "tasks", taskId);
  await updateDoc(taskDocRef, updatedData);
};

// Delete a task
export const deleteTaskFromFirestore = async (taskId) => {
  const user = auth.currentUser;
  const taskDocRef = doc(db, "users", user.uid, "tasks", taskId);
  await deleteDoc(taskDocRef);
};
