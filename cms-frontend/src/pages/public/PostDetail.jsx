import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function PostDetail() {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [permbajtja, setPermbajtja] = useState('');
  const [tags, setTags] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    axios.get(`http://localhost:5000/api/posts/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => setPost(res.data)).catch(console.error);

    axios.get(`http://localhost:5000/api/posttags`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => {
      const postTags = res.data.filter(pt => pt.post_id === parseInt(id));
      setTags(postTags);
    }).catch(console.error);

    loadComments();
  }, [id]);

  const loadComments = () => {
    axios.get(`http://localhost:5000/api/comments`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => {
      const postComments = res.data.filter(c => c.post_id === parseInt(id));
      setComments(postComments);
    }).catch(console.error);
  };

  const handleComment = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/comments',
        { post_id: parseInt(id), permbajtja },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setPermbajtja('');
      loadComments();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (window.confirm('Delete this comment?')) {
        try {
        await axios.delete(`http://localhost:5000/api/comments/${commentId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        loadComments();
        } catch (err) {
        console.error(err);
        }
    }
    };
    
  if (!post) return <p style={{ textAlign: 'center', marginTop: '40px' }}>Loading...</p>;

  return (
    <div>
      <nav style={{ background: '#7c3a00', padding: '12px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4 style={{ color: 'white', margin: 0, cursor: 'pointer' }} onClick={() => navigate('/blog')}>← 𝐒𝐭✰𝐫𝐁𝐥𝐨𝐠</h4>
      </nav>

      <div style={{ maxWidth: '800px', margin: '32px auto', padding: '0 16px' }}>
        <h1 style={{ color: '#7c3a00' }}>{post.titulli}</h1>
        <p style={{ color: '#999', fontSize: '13px' }}>{post.data_publikimit ? new Date(post.data_publikimit).toLocaleDateString('sq-AL') : 'No date'}</p>
        <p style={{ color: '#999', fontSize: '13px' }}> {post.author}</p>

        {(post.user_id === user.id || user.role === 'admin') && (
          <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
            <button onClick={() => navigate(`/blog/edit/${post.id}`)}
              style={{ background: '#7c3a00', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}>
              Edit
            </button>
            <button onClick={async () => {
              if (window.confirm('Are you sure you want to delete this post?')) {
                await axios.delete(`http://localhost:5000/api/posts/${post.id}`, {
                  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                navigate('/blog');
              }
            }} style={{ background: '#dc3545', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}>
              Delete
            </button>
          </div>
        )}

        <hr />
        {post.imazhi && (
          <img src={`http://localhost:5000${post.imazhi}`}
            style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '10px', marginBottom: '16px' }}
            alt={post.titulli} />
        )}
        <div style={{ lineHeight: '1.8', color: '#333' }}>{post.permbajtja}</div>

        {tags.length > 0 && (
          <div style={{ marginTop: '16px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {tags.map(tag => (
              <span key={tag.tag_id} onClick={() => navigate(`/blog/tag/${tag.tag_id}`)}
                style={{ background: '#fff0e6', color: '#7c3a00', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', cursor: 'pointer' }}>
                #{tag.tag_id}
              </span>
            ))}
          </div>
        )}

        <hr style={{ margin: '32px 0' }} />
        <h3 style={{ color: '#7c3a00' }}>Comments ({comments.length})</h3>

        {comments.length === 0 ? (
          <p style={{ color: '#888' }}>No comments yet.</p>
        ) : (
          comments.map(c => (
            <div key={c.id} style={{ background: '#d19b6b49', borderRadius: '8px', padding: '12px', marginBottom: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ margin: '0 0 4px', fontSize: '13px', color: '#492717' }}>👤 {c.author || 'Unknown'}</p>
            {(c.user_id === user.id || user.role === 'admin') && (
                <button onClick={() => handleDeleteComment(c.id)}
                style={{ background: 'transparent', color: '#dc3545', border: 'none', cursor: 'pointer', fontSize: '13px' }}>
                Delete
                </button>
            )}
            </div>
            <p style={{ margin: 0 }}>{c.permbajtja}</p>
            </div>
          ))
        )}

        <form onSubmit={handleComment} style={{ marginTop: '24px' }}>
          <textarea value={permbajtja} onChange={e => setPermbajtja(e.target.value)} required
            placeholder="Write a comment..." rows={3}
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px' }} />
          <button type="submit" style={{ background: '#7c3a00', color: 'white', border: 'none', padding: '8px 20px', borderRadius: '8px', cursor: 'pointer', marginTop: '8px' }}>
            Comment
          </button>
        </form>
      </div>
    </div>
  );
}

export default PostDetail;