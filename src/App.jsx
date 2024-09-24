import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Outlet } from "react-router-dom";
import { loginRequest, loginSuccess, logout } from './redux/slices/userSlice';
import { setTasks } from './redux/slices/tasksSlice';
import { auth, fetchTasksFromFirestore } from './utils/firebase.utils';
import Header from './components/Header';
import AuthenticatedHeader from './components/AuthenticatedHeader';
import Footer from './components/Footer';

function App() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loginRequest());
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(loginSuccess({ user: { uid: user.uid, email: user.email } }));
        const tasks = await fetchTasksFromFirestore();
        dispatch(setTasks(tasks));
      } else {
        dispatch(setTasks([]));
        dispatch(logout());
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <div className="App">
      {isAuthenticated ? <AuthenticatedHeader/> : <Header />}
      <Outlet />
      {!isAuthenticated && <Footer />}
    </div>
  );
}

export default App;