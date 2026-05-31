import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

function Categories() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ emertimi: '', pershkrimi: '', slug: '' });
  const [editing, setEditing] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) navigate('/login');
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const res = await API.get('/categories');
    setCategories(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await API.put(`/categories/${editing}`, form);
      setEditing(null);
    } else {
      await API.post('/categories', form);
    }
    setForm({ emertimi: '', pershkrimi: '', slug: '' });
    fetchCategories();
  };

  const handleEdit = (cat) => {
    setEditing(cat.id);
    setForm({ emertimi: cat.emertimi, pershkrimi: cat.pershkrimi, slug: cat.slug });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      await API.delete(`/categories/${id}`);
      fetchCategories();
    }
  };

  return (
    <div className="main-content">
      <div className="topbar">
        <p style={{ fontWeight: '600', fontSize: '15px', color: '#7c3a00' }}>Categories</p>
        <div className="avatar-circle">A</div>
      </div>
      <div className="page-content">
        <div className="content-card">
          <div className="card-title">{editing ? 'Edit Category' : 'Add New Category'}</div>
          <form onSubmit={handleSubmit}>
            <label className="form-label-custom">Name</label>
            <input className="form-control-custom" placeholder="Category name..." value={form.emertimi}
              onChange={e => setForm({ ...form, emertimi: e.target.value })} required />
            <label className="form-label-custom">Description</label>
            <input className="form-control-custom" placeholder="Description..." value={form.pershkrimi}
              onChange={e => setForm({ ...form, pershkrimi: e.target.value })} />
            <label className="form-label-custom">Slug</label>
            <input className="form-control-custom" placeholder="category-slug" value={form.slug}
              onChange={e => setForm({ ...form, slug: e.target.value })} required />
            <div style={{ display: 'flex', gap: '8px' }}>
              <button type="submit" className="btn-primary-custom">{editing ? 'Update' : 'Add Category'}</button>
              {editing && <button type="button" className="btn-edit-custom" onClick={() => setEditing(null)}>Cancel</button>}
            </div>
          </form>
        </div>

        <div className="content-card">
          <div className="card-title">All Categories</div>
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
              {categories.map(c => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.emertimi}</td>
                  <td style={{ color: '#b06030' }}>{c.slug}</td>
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

export default Categories;