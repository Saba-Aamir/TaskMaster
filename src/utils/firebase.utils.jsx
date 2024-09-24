import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, setPersistence, browserSessionPersistence } from "firebase/auth";
import { getFirestore, collection, doc, addDoc, updateDoc, deleteDoc, getDocs, Timestamp, query, orderBy } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCnpB-z97uvYA7fk7ZzmwHk2QwAe9hF83Q",
  authDomain: "task-master-a04de.firebaseapp.com",
  projectId: "task-master-a04de",
  storageBucket: "task-master-a04de.appspot.com",
  messagingSenderId: "205587254867",
  appId: "1:205587254867:web:ab82418e802608999a80a6",
  measurementId: "G-VN4WBVLVBG"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Cloud Firestore
const db = getFirestore(firebaseApp);

// Initialize Firebase Auth provider
const provider = new GoogleAuthProvider();

// Force the user to select an account
provider.setCustomParameters({   
  prompt : "select_account "
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    return user;
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
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
    const errorCode = error.code;
    const errorMessage = error.message;
  });
  
// Fetch all tasks
export const fetchTasksFromFirestore = async () => {
  const user = auth.currentUser;
  const tasksCollectionRef = collection(db, 'users', user.uid, 'tasks');
  // First order by 'completed', then by 'createdAt'
  const q = query(tasksCollectionRef, orderBy('completed', 'asc'), orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);
  const tasks = querySnapshot.docs.map((doc) => {
    const taskData = doc.data();
    return {
      id: doc.id,
      ...taskData,
      createdAt: taskData.createdAt ? taskData.createdAt.toDate().toISOString() : null,
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
  const tasksCollectionRef = collection(db, 'users', user.uid, 'tasks');
  const docRef = await addDoc(tasksCollectionRef, task);
  return { id: docRef.id, ...task };
};

// Update a task
export const updateTaskInFirestore = async (taskId, updatedData) => {
  const user = auth.currentUser;
  const taskDocRef = doc(db, 'users', user.uid, 'tasks', taskId);
  await updateDoc(taskDocRef, updatedData);
};

// Delete a task
export const deleteTaskFromFirestore = async (taskId) => {
  const user = auth.currentUser;
  const taskDocRef = doc(db, 'users', user.uid, 'tasks', taskId);
  await deleteDoc(taskDocRef);
};