import { Link, useNavigate } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="d-flex flex-column p-3 bg-dark text-white" style={{ width: '250px', minHeight: '100vh' }}>
      <h5 className="text-center mb-4">CMS Blog</h5>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item mb-1"><Link to="/dashboard" className="nav-link text-white">Dashboard</Link></li>
        <li className="nav-item mb-1"><Link to="/posts" className="nav-link text-white">Artikujt</Link></li>
        <li className="nav-item mb-1"><Link to="/categories" className="nav-link text-white">Kategoritë</Link></li>
        <li className="nav-item mb-1"><Link to="/tags" className="nav-link text-white">Etiketat</Link></li>
        <li className="nav-item mb-1"><Link to="/comments" className="nav-link text-white">Komentet</Link></li>
        <li className="nav-item mb-1"><Link to="/pages" className="nav-link text-white">Faqet Statike</Link></li>
        <li className="nav-item mb-1"><Link to="/media" className="nav-link text-white">Media</Link></li>
        <li className="nav-item mb-1"><Link to="/settings" className="nav-link text-white">Konfigurimet</Link></li>
        <li className="nav-item mb-1"><Link to="/newsletter" className="nav-link text-white">Newsletter</Link></li>
        <li className="nav-item mb-1"><Link to="/users" className="nav-link text-white">Përdoruesit</Link></li>
        <li className="nav-item mb-1"><Link to="/roles" className="nav-link text-white">Rolet</Link></li>
        <li className="nav-item mb-1"><Link to="/subscriptions" className="nav-link text-white">Abonimet</Link></li>
      </ul>
      <button className="btn btn-outline-light mt-3" onClick={logout}>Dil</button>
    </div>
  );
}

export default Sidebar;