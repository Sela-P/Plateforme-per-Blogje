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
    if (window.confirm('Je i sigurt?')) {
      await API.delete(`/roles/${id}`);
      fetchRoles();
    }
  };

  return (
    <div className="container mt-4">
      <h3>Menaxhimi i Roleve</h3>
      <form onSubmit={handleSubmit} className="card p-3 mb-4">
        <div className="mb-2">
          <input className="form-control" placeholder="Emërtimi i rolit" value={form.emertimi}
            onChange={e => setForm({ ...form, emertimi: e.target.value })} required />
        </div>
        <button className="btn btn-primary">{editing ? 'Ndrysho' : 'Shto'}</button>
        {editing && <button className="btn btn-secondary ms-2" onClick={() => setEditing(null)}>Anulo</button>}
      </form>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Emërtimi</th>
            <th>Veprime</th>
          </tr>
        </thead>
        <tbody>
          {roles.map(r => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.emertimi}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(r)}>Ndrysho</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(r.id)}>Fshi</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Roles;