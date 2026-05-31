import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

function Users() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ emri: '', email: '', password: '' });
  const [editing, setEditing] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) navigate('/login');
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await API.get('/users');
    setUsers(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await API.put(`/users/${editing}`, form);
      setEditing(null);
      setForm({ emri: '', email: '', password: '' });
      fetchUsers();
    }
  };

  const handleEdit = (u) => {
    setEditing(u.id);
    setForm({ emri: u.emri, email: u.email, password: '' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      await API.delete(`/users/${id}`);
      fetchUsers();
    }
  };

  return (
    <div className="main-content">
      <div className="topbar">
        <p style={{ fontWeight: '600', fontSize: '15px', color: '#7c3a00' }}>Users</p>
        <div className="avatar-circle">A</div>
      </div>
      <div className="page-content">
        {editing && (
          <div className="content-card">
            <div className="card-title">Edit User</div>
            <form onSubmit={handleSubmit}>
              <label className="form-label-custom">Name</label>
              <input className="form-control-custom" placeholder="Name..." value={form.emri}
                onChange={e => setForm({ ...form, emri: e.target.value })} required />
              <label className="form-label-custom">Email</label>
              <input className="form-control-custom" placeholder="Email..." value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })} required />
              <label className="form-label-custom">New Password (optional)</label>
              <input className="form-control-custom" placeholder="Leave blank to keep current..." type="password" value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })} />
              <div style={{ display: 'flex', gap: '8px' }}>
                <button type="submit" className="btn-primary-custom">Update User</button>
                <button type="button" className="btn-edit-custom" onClick={() => setEditing(null)}>Cancel</button>
              </div>
            </form>
          </div>
        )}

        <div className="content-card">
          <div className="card-title">All Users ({users.length})</div>
          <table className="table-clean">
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div className="avatar-circle" style={{ width: '28px', height: '28px', fontSize: '11px' }}>
                        {u.emri?.charAt(0).toUpperCase()}
                      </div>
                      {u.emri}
                    </div>
                  </td>
                  <td style={{ color: '#b06030' }}>{u.email}</td>
                  <td style={{ color: '#b06030' }}>{new Date(u.created_at).toLocaleDateString()}</td>
                  <td>
                    <button className="btn-edit-custom" onClick={() => handleEdit(u)}>Edit</button>
                    <button className="btn-delete-custom" onClick={() => handleDelete(u.id)}>Delete</button>
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

export default Users;