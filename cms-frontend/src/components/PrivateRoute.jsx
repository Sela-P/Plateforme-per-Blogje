import { Navigate } from 'react-router-dom';

function PrivateRoute({ children, adminOnly = false }) {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  if (!token) return <Navigate to="/login" />;
  
  if (adminOnly && user.role !== 'admin' && user.role !== 'editor') {
    return <Navigate to="/blog" />;
  }

  return children;
}

export default PrivateRoute;