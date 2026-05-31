import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ titulli: '', permbajtja: '', statusi: 'draft', imazhi: '' });
  const [editing, setEditing] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) navigate('/login');
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const res = await API.get('/posts');
    setPosts(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await API.put(`/posts/${editing}`, form);
      setEditing(null);
    } else {
      await API.post('/posts', form);
    }
    setForm({ titulli: '', permbajtja: '', statusi: 'draft', imazhi: '' });
    fetchPosts();
  };

  const handleEdit = (post) => {
    setEditing(post.id);
    setForm({ titulli: post.titulli, permbajtja: post.permbajtja, statusi: post.statusi, imazhi: post.imazhi || '' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      await API.delete(`/posts/${id}`);
      fetchPosts();
    }
  };

  return (
    <div className="main-content">
      <div className="topbar">
        <p style={{ fontWeight: '600', fontSize: '15px', color: '#7c3a00' }}>Posts</p>
        <div className="avatar-circle">A</div>
      </div>
      <div className="page-content">
        <div className="content-card">
          <div className="card-title">{editing ? 'Edit Post' : 'Add New Post'}</div>
          <form onSubmit={handleSubmit}>
            <label className="form-label-custom">Title</label>
            <input className="form-control-custom" placeholder="Post title..." value={form.titulli}
              onChange={e => setForm({ ...form, titulli: e.target.value })} required />
            <label className="form-label-custom">Content</label>
            <textarea className="form-control-custom" placeholder="Post content..." rows={4} value={form.permbajtja}
              onChange={e => setForm({ ...form, permbajtja: e.target.value })} />
            <label className="form-label-custom">Image URL</label>
            <input className="form-control-custom" placeholder="https://..." value={form.imazhi}
              onChange={e => setForm({ ...form, imazhi: e.target.value })} />
            {form.imazhi && (
              <img src={form.imazhi} alt="preview" style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '12px' }} />
            )}
            <label className="form-label-custom">Status</label>
            <select className="form-control-custom" value={form.statusi}
              onChange={e => setForm({ ...form, statusi: e.target.value })}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button type="submit" className="btn-primary-custom">{editing ? 'Update Post' : 'Add Post'}</button>
              {editing && <button type="button" className="btn-edit-custom" onClick={() => setEditing(null)}>Cancel</button>}
            </div>
          </form>
        </div>

        <div className="content-card">
          <div className="card-title">All Posts</div>
          <table className="table-clean">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map(p => (
                <tr key={p.id}>
                  <td>
                    {p.imazhi ? (
                      <img src={p.imazhi} alt={p.titulli} style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '6px' }} />
                    ) : (
                      <div style={{ width: '60px', height: '40px', background: '#fde8d0', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <i className="ti ti-photo" style={{ color: '#b06030' }} aria-hidden="true"></i>
                      </div>
                    )}
                  </td>
                  <td>{p.titulli}</td>
                  <td><span className={`badge-${p.statusi}`}>{p.statusi}</span></td>
                  <td>
                    <button className="btn-edit-custom" onClick={() => handleEdit(p)}>Edit</button>
                    <button className="btn-delete-custom" onClick={() => handleDelete(p.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Posts;