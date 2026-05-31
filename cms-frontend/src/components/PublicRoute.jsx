import { Navigate } from 'react-router-dom';

function PublicRoute({ children }) {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  if (!token) return <Navigate to="/login" />;
  if (user.role === 'admin' || user.role === 'editor') return <Navigate to="/dashboard" />;

  return children;
}

export default PublicRoute;