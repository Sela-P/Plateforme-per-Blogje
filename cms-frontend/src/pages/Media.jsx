import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

function Media() {
  const [media, setMedia] = useState([]);
  const [form, setForm] = useState({ emri_skedarit: '', lloji: '', rruga: '' });
  const [editing, setEditing] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) navigate('/login');
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    const res = await API.get('/media');
    setMedia(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await API.put(`/media/${editing}`, form);
      setEditing(null);
    } else {
      await API.post('/media', form);
    }
    setForm({ emri_skedarit: '', lloji: '', rruga: '' });
    fetchMedia();
  };

  const handleEdit = (m) => {
    setEditing(m.id);
    setForm({ emri_skedarit: m.emri_skedarit, lloji: m.lloji, rruga: m.rruga });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Je i sigurt?')) {
      await API.delete(`/media/${id}`);
      fetchMedia();
    }
  };

  return (
    <div className="container mt-4">
      <h3>Menaxhimi i Mediave</h3>
      <form onSubmit={handleSubmit} className="card p-3 mb-4">
        <div className="mb-2">
          <input className="form-control" placeholder="Emri i skedarit" value={form.emri_skedarit}
            onChange={e => setForm({ ...form, emri_skedarit: e.target.value })} required />
        </div>
        <div className="mb-2">
          <input className="form-control" placeholder="Lloji (image/video)" value={form.lloji}
            onChange={e => setForm({ ...form, lloji: e.target.value })} />
        </div>
        <div className="mb-2">
          <input className="form-control" placeholder="Rruga (URL)" value={form.rruga}
            onChange={e => setForm({ ...form, rruga: e.target.value })} required />
        </div>
        <button className="btn btn-primary">{editing ? 'Ndrysho' : 'Shto'}</button>
        {editing && <button className="btn btn-secondary ms-2" onClick={() => setEditing(null)}>Anulo</button>}
      </form>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Emri</th>
            <th>Lloji</th>
            <th>Rruga</th>
            <th>Veprime</th>
          </tr>
        </thead>
        <tbody>
          {media.map(m => (
            <tr key={m.id}>
              <td>{m.id}</td>
              <td>{m.emri_skedarit}</td>
              <td>{m.lloji}</td>
              <td>{m.rruga}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(m)}>Ndrysho</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(m.id)}>Fshi</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Media;