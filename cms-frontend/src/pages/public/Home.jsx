import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    axios.get('http://localhost:5000/api/posts', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => setPosts(res.data)).catch(console.error);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div>
      {/* Navbar */}
      <nav style={{ background: '#7c3a00', padding: '12px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4 style={{ color: 'white', margin: 0 }}>CMS Blog</h4>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <span style={{ color: 'white', fontSize: '14px' }}>👤 {user.emri}</span>
          <button onClick={() => navigate('/blog/create')} style={{ background: 'white', color: '#7c3a00', border: 'none', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer' }}>
            + Krijo Post
          </button>
          <button onClick={handleLogout} style={{ background: 'transparent', color: 'white', border: '1px solid white', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer' }}>
            Logout
          </button>
        </div>
      </nav>

      {/* Postet */}
      <div style={{ maxWidth: '800px', margin: '32px auto', padding: '0 16px' }}>
        {posts.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#888' }}>Nuk ka posts ende.</p>
        ) : (
          posts.filter(p => p.statusi === 'published').map(post => (
            <div key={post.id} onClick={() => navigate(`/blog/post/${post.id}`)}
              style={{ background: 'white', border: '1px solid #eee', borderRadius: '10px', padding: '20px', marginBottom: '16px', cursor: 'pointer' }}>
              <h3 style={{ color: '#7c3a00', margin: '0 0 8px' }}>{post.titulli}</h3>
              <p style={{ color: '#666', fontSize: '14px' }}>{post.permbajtja?.substring(0, 150)}...</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;