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
    }
    setForm({ emri: '', email: '', password: '' });
    fetchUsers();
  };

  const handleEdit = (u) => {
    setEditing(u.id);
    setForm({ emri: u.emri, email: u.email, password: '' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Je i sigurt?')) {
      await API.delete(`/users/${id}`);
      fetchUsers();
    }
  };

  return (
    <div className="container mt-4">
      <h3>Menaxhimi i Përdoruesve</h3>
      {editing && (
        <form onSubmit={handleSubmit} className="card p-3 mb-4">
          <div className="mb-2">
            <input className="form-control" placeholder="Emri" value={form.emri}
              onChange={e => setForm({ ...form, emri: e.target.value })} required />
          </div>
          <div className="mb-2">
            <input className="form-control" placeholder="Email" value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div className="mb-2">
            <input className="form-control" placeholder="Fjalëkalim i ri (opsional)" type="password" value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })} />
          </div>
          <button className="btn btn-primary">Ndrysho</button>
          <button className="btn btn-secondary ms-2" onClick={() => setEditing(null)}>Anulo</button>
        </form>
      )}

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Emri</th>
            <th>Email</th>
            <th>Data</th>
            <th>Veprime</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.emri}</td>
              <td>{u.email}</td>
              <td>{new Date(u.created_at).toLocaleDateString()}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(u)}>Ndrysho</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(u.id)}>Fshi</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;