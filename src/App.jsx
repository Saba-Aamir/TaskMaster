import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { loginRequest, loginSuccess, logout } from './redux/slices/userSlice';
import { auth } from './utils/firebase.utils';
import { Outlet } from "react-router-dom";
import Header from './components/Header';
import AuthenticatedHeader from './components/AuthenticatedHeader';
import Footer from './components/Footer';

function App() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const tasks = useSelector(state => state.tasks.tasks);
  const categories = useSelector(state => state.categories.categories);
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  //Redux store is correctly set-up along with the state, actions and reducers
  console.log(tasks, 'tasks');
  console.log(categories, 'categories');
  console.log(user, 'user');

  useEffect(() => {
    dispatch(loginRequest());
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(loginSuccess({ user: { uid: user.uid, email: user.email } }));
      } else {
        dispatch(logout());
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="App">
      {isAuthenticated ? <AuthenticatedHeader/> : <Header />}
      <Outlet />
      {!isAuthenticated && <Footer />}
    </div>
  );
}

export default App;
