import {
    Navigate,
  } from 'react-router-dom';
  
  const ProtectedRoute = ({ user, children }) => {
    if (sessionStorage.getItem('user_uid')===null || sessionStorage.getItem('user_uid')===undefined || sessionStorage.getItem('user_uid') === '' ) {
      return <Navigate to="/auth/login" replace />;
    }
  
    return children;
  };
  
  export default ProtectedRoute;
  
  