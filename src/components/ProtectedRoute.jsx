import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Loader from './Loader';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const status = useSelector((state) => state.user.status);

  if (status === 'loading' || status === 'idle') {
    return <Loader />; 
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  return children;
};

export default ProtectedRoute;