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
    if (window.confirm('Je i sigurt?')) {
      await API.delete(`/tags/${id}`);
      fetchTags();
    }
  };

  return (
    <div className="container mt-4">
      <h3>Menaxhimi i Etiketave</h3>
      <form onSubmit={handleSubmit} className="card p-3 mb-4">
        <div className="mb-2">
          <input className="form-control" placeholder="Emërtimi" value={form.emertimi}
            onChange={e => setForm({ ...form, emertimi: e.target.value })} required />
        </div>
        <div className="mb-2">
          <input className="form-control" placeholder="Slug (p.sh. react)" value={form.slug}
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
          {tags.map(t => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.emertimi}</td>
              <td>{t.slug}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(t)}>Ndrysho</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(t.id)}>Fshi</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Tags;