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
    if (window.confirm('Je i sigurt?')) {
      await API.delete(`/pages/${id}`);
      fetchPages();
    }
  };

  return (
    <div className="container mt-4">
      <h3>Menaxhimi i Faqeve Statike</h3>
      <form onSubmit={handleSubmit} className="card p-3 mb-4">
        <div className="mb-2">
          <input className="form-control" placeholder="Titulli" value={form.titulli}
            onChange={e => setForm({ ...form, titulli: e.target.value })} required />
        </div>
        <div className="mb-2">
          <textarea className="form-control" placeholder="Përmbajtja" rows={4} value={form.permbajtja}
            onChange={e => setForm({ ...form, permbajtja: e.target.value })} />
        </div>
        <div className="mb-2">
          <input className="form-control" placeholder="Slug (p.sh. rreth-nesh)" value={form.slug}
            onChange={e => setForm({ ...form, slug: e.target.value })} required />
        </div>
        <div className="mb-2">
          <select className="form-control" value={form.statusi}
            onChange={e => setForm({ ...form, statusi: e.target.value })}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
        <button className="btn btn-primary">{editing ? 'Ndrysho' : 'Shto'}</button>
        {editing && <button className="btn btn-secondary ms-2" onClick={() => setEditing(null)}>Anulo</button>}
      </form>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Titulli</th>
            <th>Slug</th>
            <th>Statusi</th>
            <th>Veprime</th>
          </tr>
        </thead>
        <tbody>
          {pages.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.titulli}</td>
              <td>{p.slug}</td>
              <td>{p.statusi}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(p)}>Ndrysho</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p.id)}>Fshi</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Pages;