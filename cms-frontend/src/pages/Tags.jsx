import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

function Tags() {
  const [tags, setTags] = useState([]);
  const [form, setForm] = useState({ emertimi: '', slug: '' });
  const [editing, setEditing] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) navigate('/login');
    fetchTags();
  }, []);

  const fetchTags = async () => {
    const res = await API.get('/tags');
    setTags(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await API.put(`/tags/${editing}`, form);
      setEditing(null);
    } else {
      await API.post('/tags', form);
    }
    setForm({ emertimi: '', slug: '' });
    fetchTags();
  };

  const handleEdit = (tag) => {
    setEditing(tag.id);
    setForm({ emertimi: tag.emertimi, slug: tag.slug });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      await API.delete(`/tags/${id}`);
      fetchTags();
    }
  };

  return (
    <div className="main-content">
      <div className="topbar">
        <p style={{ fontWeight: '600', fontSize: '15px', color: '#7c3a00' }}>Tags</p>
        <div className="avatar-circle">A</div>
      </div>
      <div className="page-content">
        <div className="content-card">
          <div className="card-title">{editing ? 'Edit Tag' : 'Add New Tag'}</div>
          <form onSubmit={handleSubmit}>
            <label className="form-label-custom">Name</label>
            <input className="form-control-custom" placeholder="Tag name..." value={form.emertimi}
              onChange={e => setForm({ ...form, emertimi: e.target.value })} required />
            <label className="form-label-custom">Slug</label>
            <input className="form-control-custom" placeholder="tag-slug" value={form.slug}
              onChange={e => setForm({ ...form, slug: e.target.value })} required />
            <div style={{ display: 'flex', gap: '8px' }}>
              <button type="submit" className="btn-primary-custom">{editing ? 'Update' : 'Add Tag'}</button>
              {editing && <button type="button" className="btn-edit-custom" onClick={() => setEditing(null)}>Cancel</button>}
            </div>
          </form>
        </div>

        <div className="content-card">
          <div className="card-title">All Tags</div>
          <table className="table-clean">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Slug</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tags.map(t => (
                <tr key={t.id}>
                  <td>{t.id}</td>
                  <td>{t.emertimi}</td>
                  <td style={{ color: '#b06030' }}>{t.slug}</td>
                  <td>
                    <button className="btn-edit-custom" onClick={() => handleEdit(t)}>Edit</button>
                    <button className="btn-delete-custom" onClick={() => handleDelete(t.id)}>Delete</button>
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

export default Tags;