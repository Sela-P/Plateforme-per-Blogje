import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreatePost() {
  const [titulli, setTitulli] = useState('');
  const [permbajtja, setPermbajtja] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/posts', 
        { titulli, permbajtja, statusi: 'published' },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      navigate('/blog');
    } catch (err) {
      setError('Gabim gjatë krijimit të postit');
    }
  };

  return (
    <div>
      {/* Navbar */}
      <nav style={{ background: '#7c3a00', padding: '12px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4 style={{ color: 'white', margin: 0, cursor: 'pointer' }} onClick={() => navigate('/blog')}>← CMS Blog</h4>
      </nav>

      <div style={{ maxWidth: '800px', margin: '32px auto', padding: '0 16px' }}>
        <h2 style={{ color: '#7c3a00', marginBottom: '24px' }}>Krijo Post të Ri</h2>
        {error && <div style={{ color: 'red', marginBottom: '16px' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Titulli</label>
            <input 
              type="text" 
              value={titulli} 
              onChange={e => setTitulli(e.target.value)} 
              required
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px' }}
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Permbajtja</label>
            <textarea 
              value={permbajtja} 
              onChange={e => setPermbajtja(e.target.value)} 
              required
              rows={10}
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px' }}
            />
          </div>
          <button type="submit" style={{ background: '#7c3a00', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px' }}>
            Publiko
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;