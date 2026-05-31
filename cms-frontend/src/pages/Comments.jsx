import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

function Comments() {
  const [comments, setComments] = useState([]);
  const [form, setForm] = useState({ post_id: '', permbajtja: '' });
  const [editing, setEditing] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) navigate('/login');
    fetchComments();
  }, []);

  const fetchComments = async () => {
    const res = await API.get('/comments');
    setComments(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await API.put(`/comments/${editing}`, form);
      setEditing(null);
    } else {
      await API.post('/comments', form);
    }
    setForm({ post_id: '', permbajtja: '' });
    fetchComments();
  };

  const handleEdit = (c) => {
    setEditing(c.id);
    setForm({ post_id: c.post_id, permbajtja: c.permbajtja });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      await API.delete(`/comments/${id}`);
      fetchComments();
    }
  };

  return (
    <div className="main-content">
      <div className="topbar">
        <p style={{ fontWeight: '600', fontSize: '15px', color: '#7c3a00' }}>Comments</p>
        <div className="avatar-circle">A</div>
      </div>
      <div className="page-content">
        <div className="content-card">
          <div className="card-title">{editing ? 'Edit Comment' : 'Add New Comment'}</div>
          <form onSubmit={handleSubmit}>
            <label className="form-label-custom">Post ID</label>
            <input className="form-control-custom" placeholder="Post ID..." value={form.post_id}
              onChange={e => setForm({ ...form, post_id: e.target.value })} required />
            <label className="form-label-custom">Content</label>
            <textarea className="form-control-custom" placeholder="Comment content..." rows={3} value={form.permbajtja}
              onChange={e => setForm({ ...form, permbajtja: e.target.value })} required />
            <div style={{ display: 'flex', gap: '8px' }}>
              <button type="submit" className="btn-primary-custom">{editing ? 'Update' : 'Add Comment'}</button>
              {editing && <button type="button" className="btn-edit-custom" onClick={() => setEditing(null)}>Cancel</button>}
            </div>
          </form>
        </div>

        <div className="content-card">
          <div className="card-title">All Comments</div>
          <table className="table-clean">
            <thead>
              <tr>
                <th>Post ID</th>
                <th>Content</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {comments.map(c => (
                <tr key={c.id}>
                  <td>{c.post_id}</td>
                  <td>{c.permbajtja}</td>
                  <td><span className={`badge-${c.statusi === 'approved' ? 'published' : 'draft'}`}>{c.statusi}</span></td>
                  <td style={{ color: '#b06030' }}>{new Date(c.data).toLocaleDateString()}</td>
                  <td>
                    <button className="btn-edit-custom" onClick={() => handleEdit(c)}>Edit</button>
                    <button className="btn-delete-custom" onClick={() => handleDelete(c.id)}>Delete</button>
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

export default Comments;