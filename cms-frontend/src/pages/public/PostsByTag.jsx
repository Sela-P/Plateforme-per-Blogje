import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function PostsByTag() {
  const [posts, setPosts] = useState([]);
  const [tagName, setTagName] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/posts/tag/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => {
      setPosts(res.data);
      if (res.data.length > 0) setTagName(res.data[0].tag_name);
    }).catch(console.error);
  }, [id]);

  return (
    <div>
      <nav style={{ background: '#7c3a00', padding: '12px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4 style={{ color: 'white', margin: 0, cursor: 'pointer' }} onClick={() => navigate('/blog')}>← CMS Blog</h4>
      </nav>

      <div style={{ maxWidth: '800px', margin: '32px auto', padding: '0 16px' }}>
        <h2 style={{ color: '#7c3a00' }}>Tag: #{tagName}</h2>
        {posts.length === 0 ? (
          <p style={{ color: '#888' }}>No posts with this tag.</p>
        ) : (
          posts.map(post => (
            <div key={post.id} onClick={() => navigate(`/blog/post/${post.id}`)}
              style={{ background: 'white', border: '1px solid #eee', borderRadius: '10px', padding: '20px', marginBottom: '16px', cursor: 'pointer' }}>
              {post.imazhi && (
                <img src={`http://localhost:5000${post.imazhi}`}
                  style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '10px' }}
                  alt={post.titulli} />
              )}
              <h3 style={{ color: '#7c3a00', margin: '0 0 8px' }}>{post.titulli}</h3>
              <p style={{ color: '#666', fontSize: '14px' }}>{post.permbajtja?.substring(0, 150)}...</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default PostsByTag;