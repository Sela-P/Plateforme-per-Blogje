import { Link, useNavigate, useLocation } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const links = [
    { path: '/dashboard', label: 'Dashboard', icon: 'ti-home' },
    { path: '/posts', label: 'Posts', icon: 'ti-file-text' },
    { path: '/categories', label: 'Categories', icon: 'ti-category' },
    { path: '/tags', label: 'Tags', icon: 'ti-tag' },
    { path: '/comments', label: 'Comments', icon: 'ti-message' },
    { path: '/pages', label: 'Pages', icon: 'ti-layout' },
    { path: '/media', label: 'Media', icon: 'ti-photo' },
    { path: '/settings', label: 'Settings', icon: 'ti-settings' },
    { path: '/newsletter', label: 'Newsletter', icon: 'ti-mail' },
    { path: '/users', label: 'Users', icon: 'ti-users' },
    { path: '/roles', label: 'Roles', icon: 'ti-shield' },
    { path: '/subscriptions', label: 'Subscriptions', icon: 'ti-credit-card' },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-brand">
        <h5>𝐒𝐭✰𝐫𝐁𝐥𝐨𝐠</h5>
        <span>Admin Panel</span>
      </div>
      <nav className="sidebar-nav">
        {links.map(link => (
          <Link
            key={link.path}
            to={link.path}
            className={`sidebar-link ${location.pathname === link.path ? 'active' : ''}`}
          >
            <i className={`ti ${link.icon}`} aria-hidden="true"></i>
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="sidebar-footer">
        <button
          onClick={logout}
          style={{
            width: '100%',
            background: 'transparent',
            border: '1px solid #fde8d0',
            color: '#b06030',
            padding: '8px',
            borderRadius: '8px',
            fontSize: '13px',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;