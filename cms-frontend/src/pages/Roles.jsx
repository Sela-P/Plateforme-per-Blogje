import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

function Roles() {
  const [roles, setRoles] = useState([]);
  const [form, setForm] = useState({ emertimi: '' });
  const [editing, setEditing] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) navigate('/login');
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    const res = await API.get('/roles');
    setRoles(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await API.put(`/roles/${editing}`, form);
      setEditing(null);
    } else {
      await API.post('/roles', form);
    }
    setForm({ emertimi: '' });
    fetchRoles();
  };

  const handleEdit = (r) => {
    setEditing(r.id);
    setForm({ emertimi: r.emertimi });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      await API.delete(`/roles/${id}`);
      fetchRoles();
    }
  };

  return (
    <div className="main-content">
      <div className="topbar">
        <p style={{ fontWeight: '600', fontSize: '15px', color: '#7c3a00' }}>Roles</p>
        <div className="avatar-circle">A</div>
      </div>
      <div className="page-content">
        <div className="content-card">
          <div className="card-title">{editing ? 'Edit Role' : 'Add New Role'}</div>
          <form onSubmit={handleSubmit}>
            <label className="form-label-custom">Role Name</label>
            <input className="form-control-custom" placeholder="e.g. Admin, Editor, Reader" value={form.emertimi}
              onChange={e => setForm({ ...form, emertimi: e.target.value })} required />
            <div style={{ display: 'flex', gap: '8px' }}>
              <button type="submit" className="btn-primary-custom">{editing ? 'Update' : 'Add Role'}</button>
              {editing && <button type="button" className="btn-edit-custom" onClick={() => setEditing(null)}>Cancel</button>}
            </div>
          </form>
        </div>

        <div className="content-card">
          <div className="card-title">All Roles ({roles.length})</div>
          <table className="table-clean">
            <thead>
              <tr>
                <th>ID</th>
                <th>Role Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {roles.map(r => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>
                    <span style={{ background: '#fff0e6', color: '#c05621', padding: '3px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '500' }}>
                      {r.emertimi}
                    </span>
                  </td>
                  <td>
                    <button className="btn-edit-custom" onClick={() => handleEdit(r)}>Edit</button>
                    <button className="btn-delete-custom" onClick={() => handleDelete(r.id)}>Delete</button>
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

export default Roles;