import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [posts, setPosts] = useState([]);
  const [emri, setEmri] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    setEmri(user.emri || '');
    setEmail(user.email || '');

    axios.get('http://localhost:5000/api/posts', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => {
      const myPosts = res.data.filter(p => p.user_id === user.id);
      setPosts(myPosts);
    }).catch(console.error);
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/users/${user.id}`,
        { emri, email, password: password || undefined },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      localStorage.setItem('user', JSON.stringify({ ...user, emri, email }));
      setMsg('Profile changed successfully!');
      setPassword('');
    } catch (err) {
      setMsg('Error while changing!');
    }
  };

  return (
    <div>
      <nav style={{ background: '#7c3a00', padding: '12px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4 style={{ color: 'white', margin: 0, cursor: 'pointer' }} onClick={() => navigate('/blog')}>← CMS Blog</h4>
      </nav>

      <div style={{ maxWidth: '800px', margin: '32px auto', padding: '0 16px' }}>
        
        {/* Informacionet */}
        <h2 style={{ color: '#7c3a00' }}>Profili Im</h2>
        {msg && <p style={{ color: 'green' }}>{msg}</p>}
        <form onSubmit={handleUpdate} style={{ background: 'white', border: '1px solid #eee', borderRadius: '10px', padding: '20px', marginBottom: '32px' }}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Name</label>
            <input type="text" value={emri} onChange={e => setEmri(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }} />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }} />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>New Password (optional)</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Leave empty if you don't want it changed."
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }} />
          </div>
          <button type="submit" style={{ background: '#7c3a00', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '8px', cursor: 'pointer' }}>
            Ruaj Ndryshimet
          </button>
        </form>

        {/* Postet e mia */}
        <h2 style={{ color: '#7c3a00' }}>My Posts</h2>
        {posts.length === 0 ? (
          <p style={{ color: '#888' }}>You don't have any posts yet.</p>
        ) : (
          posts.map(post => (
            <div key={post.id} onClick={() => navigate(`/blog/post/${post.id}`)}
              style={{ background: 'white', border: '1px solid #eee', borderRadius: '10px', padding: '20px', marginBottom: '16px', cursor: 'pointer' }}>
              <h3 style={{ color: '#7c3a00', margin: '0 0 8px' }}>{post.titulli}</h3>
              <p style={{ color: '#666', fontSize: '14px' }}>{post.permbajtja?.substring(0, 100)}...</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Profile;