import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

function Pages() {
  const [pages, setPages] = useState([]);
  const [form, setForm] = useState({ titulli: '', permbajtja: '', slug: '', statusi: 'draft' });
  const [editing, setEditing] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) navigate('/login');
    fetchPages();
  }, []);

  const fetchPages = async () => {
    const res = await API.get('/pages');
    setPages(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await API.put(`/pages/${editing}`, form);
      setEditing(null);
    } else {
      await API.post('/pages', form);
    }
    setForm({ titulli: '', permbajtja: '', slug: '', statusi: 'draft' });
    fetchPages();
  };

  const handleEdit = (page) => {
    setEditing(page.id);
    setForm({ titulli: page.titulli, permbajtja: page.permbajtja, slug: page.slug, statusi: page.statusi });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      await API.delete(`/pages/${id}`);
      fetchPages();
    }
  };

  return (
    <div className="main-content">
      <div className="topbar">
        <p style={{ fontWeight: '600', fontSize: '15px', color: '#7c3a00' }}>Static Pages</p>
        <div className="avatar-circle">A</div>
      </div>
      <div className="page-content">
        <div className="content-card">
          <div className="card-title">{editing ? 'Edit Page' : 'Add New Page'}</div>
          <form onSubmit={handleSubmit}>
            <label className="form-label-custom">Title</label>
            <input className="form-control-custom" placeholder="Page title..." value={form.titulli}
              onChange={e => setForm({ ...form, titulli: e.target.value })} required />
            <label className="form-label-custom">Content</label>
            <textarea className="form-control-custom" placeholder="Page content..." rows={4} value={form.permbajtja}
              onChange={e => setForm({ ...form, permbajtja: e.target.value })} />
            <label className="form-label-custom">Slug</label>
            <input className="form-control-custom" placeholder="page-slug" value={form.slug}
              onChange={e => setForm({ ...form, slug: e.target.value })} required />
            <label className="form-label-custom">Status</label>
            <select className="form-control-custom" value={form.statusi}
              onChange={e => setForm({ ...form, statusi: e.target.value })}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button type="submit" className="btn-primary-custom">{editing ? 'Update' : 'Add Page'}</button>
              {editing && <button type="button" className="btn-edit-custom" onClick={() => setEditing(null)}>Cancel</button>}
            </div>
          </form>
        </div>

        <div className="content-card">
          <div className="card-title">All Pages</div>
          <table className="table-clean">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Slug</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pages.map(p => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.titulli}</td>
                  <td style={{ color: '#b06030' }}>{p.slug}</td>
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

export default Pages;