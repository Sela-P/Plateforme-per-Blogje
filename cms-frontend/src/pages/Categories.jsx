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
    if (window.confirm('Je i sigurt?')) {
      await API.delete(`/categories/${id}`);
      fetchCategories();
    }
  };

  return (
    <div className="container mt-4">
      <h3>Menaxhimi i Kategorive</h3>
      <form onSubmit={handleSubmit} className="card p-3 mb-4">
        <div className="mb-2">
          <input className="form-control" placeholder="Emërtimi" value={form.emertimi}
            onChange={e => setForm({ ...form, emertimi: e.target.value })} required />
        </div>
        <div className="mb-2">
          <input className="form-control" placeholder="Përshkrimi" value={form.pershkrimi}
            onChange={e => setForm({ ...form, pershkrimi: e.target.value })} />
        </div>
        <div className="mb-2">
          <input className="form-control" placeholder="Slug (p.sh. teknologji)" value={form.slug}
            onChange={e => setForm({ ...form, slug: e.target.value })} required />
        </div>
        <button className="btn btn-primary">{editing ? 'Ndrysho' : 'Shto'}</button>
        {editing && <button className="btn btn-secondary ms-2" onClick={() => setEditing(null)}>Anulo</button>}
      </form>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Emërtimi</th>
            <th>Slug</th>
            <th>Veprime</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(c => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.emertimi}</td>
              <td>{c.slug}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(c)}>Ndrysho</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(c.id)}>Fshi</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Categories;