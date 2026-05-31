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
    if (window.confirm('Are you sure?')) {
      await API.delete(`/settings/${id}`);
      fetchSettings();
    }
  };

  return (
    <div className="main-content">
      <div className="topbar">
        <p style={{ fontWeight: '600', fontSize: '15px', color: '#7c3a00' }}>Settings</p>
        <div className="avatar-circle">A</div>
      </div>
      <div className="page-content">
        <div className="content-card">
          <div className="card-title">{editing ? 'Edit Setting' : 'Add New Setting'}</div>
          <form onSubmit={handleSubmit}>
            <label className="form-label-custom">Key</label>
            <input className="form-control-custom" placeholder="setting_key" value={form.celesi}
              onChange={e => setForm({ ...form, celesi: e.target.value })} required />
            <label className="form-label-custom">Value</label>
            <input className="form-control-custom" placeholder="Setting value..." value={form.vlera}
              onChange={e => setForm({ ...form, vlera: e.target.value })} />
            <label className="form-label-custom">Description</label>
            <input className="form-control-custom" placeholder="Description..." value={form.pershkrimi}
              onChange={e => setForm({ ...form, pershkrimi: e.target.value })} />
            <div style={{ display: 'flex', gap: '8px' }}>
              <button type="submit" className="btn-primary-custom">{editing ? 'Update' : 'Add Setting'}</button>
              {editing && <button type="button" className="btn-edit-custom" onClick={() => setEditing(null)}>Cancel</button>}
            </div>
          </form>
        </div>

        <div className="content-card">
          <div className="card-title">All Settings</div>
          <table className="table-clean">
            <thead>
              <tr>
                <th>Key</th>
                <th>Value</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {settings.map(s => (
                <tr key={s.id}>
                  <td style={{ fontWeight: '500', color: '#7c3a00' }}>{s.celesi}</td>
                  <td>{s.vlera}</td>
                  <td style={{ color: '#b06030' }}>{s.pershkrimi}</td>
                  <td>
                    <button className="btn-edit-custom" onClick={() => handleEdit(s)}>Edit</button>
                    <button className="btn-delete-custom" onClick={() => handleDelete(s.id)}>Delete</button>
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

export default Settings;