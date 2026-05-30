import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

function Settings() {
  const [settings, setSettings] = useState([]);
  const [form, setForm] = useState({ celesi: '', vlera: '', pershkrimi: '' });
  const [editing, setEditing] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) navigate('/login');
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const res = await API.get('/settings');
    setSettings(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await API.put(`/settings/${editing}`, form);
      setEditing(null);
    } else {
      await API.post('/settings', form);
    }
    setForm({ celesi: '', vlera: '', pershkrimi: '' });
    fetchSettings();
  };

  const handleEdit = (s) => {
    setEditing(s.id);
    setForm({ celesi: s.celesi, vlera: s.vlera, pershkrimi: s.pershkrimi });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Je i sigurt?')) {
      await API.delete(`/settings/${id}`);
      fetchSettings();
    }
  };

  return (
    <div className="container mt-4">
      <h3>Konfigurimet</h3>
      <form onSubmit={handleSubmit} className="card p-3 mb-4">
        <div className="mb-2">
          <input className="form-control" placeholder="Çelësi" value={form.celesi}
            onChange={e => setForm({ ...form, celesi: e.target.value })} required />
        </div>
        <div className="mb-2">
          <input className="form-control" placeholder="Vlera" value={form.vlera}
            onChange={e => setForm({ ...form, vlera: e.target.value })} />
        </div>
        <div className="mb-2">
          <input className="form-control" placeholder="Përshkrimi" value={form.pershkrimi}
            onChange={e => setForm({ ...form, pershkrimi: e.target.value })} />
        </div>
        <button className="btn btn-primary">{editing ? 'Ndrysho' : 'Shto'}</button>
        {editing && <button className="btn btn-secondary ms-2" onClick={() => setEditing(null)}>Anulo</button>}
      </form>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Çelësi</th>
            <th>Vlera</th>
            <th>Përshkrimi</th>
            <th>Veprime</th>
          </tr>
        </thead>
        <tbody>
          {settings.map(s => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.celesi}</td>
              <td>{s.vlera}</td>
              <td>{s.pershkrimi}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(s)}>Ndrysho</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(s.id)}>Fshi</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Settings;