import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function PostDetail() {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/posts/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => setPost(res.data)).catch(console.error);
  }, [id]);

  if (!post) return <p style={{ textAlign: 'center', marginTop: '40px' }}>Duke u ngarkuar...</p>;

  return (
    <div>
      {/* Navbar */}
      <nav style={{ background: '#7c3a00', padding: '12px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4 style={{ color: 'white', margin: 0, cursor: 'pointer' }} onClick={() => navigate('/blog')}>← CMS Blog</h4>
      </nav>

      {/* Post */}
      <div style={{ maxWidth: '800px', margin: '32px auto', padding: '0 16px' }}>
        <h1 style={{ color: '#7c3a00' }}>{post.titulli}</h1>
        <p style={{ color: '#999', fontSize: '13px' }}>{new Date(post.data_publikimit).toLocaleDateString()}</p>
        <hr />
        <div style={{ lineHeight: '1.8', color: '#333' }}>{post.permbajtja}</div>
      </div>
    </div>
  );
}

export default PostDetail;