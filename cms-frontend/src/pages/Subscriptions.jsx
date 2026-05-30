import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

function Subscriptions() {
  const [plans, setPlans] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [form, setForm] = useState({ emertimi: '', cmimi: '', kohezgjatja_dite: '', pershkrimi: '' });
  const [editing, setEditing] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) navigate('/login');
    fetchPlans();
    fetchSubscriptions();
  }, []);

  const fetchPlans = async () => {
    const res = await API.get('/subscriptions/plans');
    setPlans(res.data);
  };

  const fetchSubscriptions = async () => {
    const res = await API.get('/subscriptions/my');
    setSubscriptions(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await API.put(`/subscriptions/plans/${editing}`, form);
      setEditing(null);
    } else {
      await API.post('/subscriptions/plans', form);
    }
    setForm({ emertimi: '', cmimi: '', kohezgjatja_dite: '', pershkrimi: '' });
    fetchPlans();
  };

  const handleEdit = (p) => {
    setEditing(p.id);
    setForm({ emertimi: p.emertimi, cmimi: p.cmimi, kohezgjatja_dite: p.kohezgjatja_dite, pershkrimi: p.pershkrimi });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Je i sigurt?')) {
      await API.delete(`/subscriptions/plans/${id}`);
      fetchPlans();
    }
  };

  return (
    <div className="container mt-4">
      <h3>Planet e Abonimit</h3>
      <form onSubmit={handleSubmit} className="card p-3 mb-4">
        <div className="mb-2">
          <input className="form-control" placeholder="Emërtimi" value={form.emertimi}
            onChange={e => setForm({ ...form, emertimi: e.target.value })} required />
        </div>
        <div className="mb-2">
          <input className="form-control" placeholder="Çmimi" type="number" value={form.cmimi}
            onChange={e => setForm({ ...form, cmimi: e.target.value })} required />
        </div>
        <div className="mb-2">
          <input className="form-control" placeholder="Kohëzgjatja (ditë)" type="number" value={form.kohezgjatja_dite}
            onChange={e => setForm({ ...form, kohezgjatja_dite: e.target.value })} required />
        </div>
        <div className="mb-2">
          <input className="form-control" placeholder="Përshkrimi" value={form.pershkrimi}
            onChange={e => setForm({ ...form, pershkrimi: e.target.value })} />
        </div>
        <button className="btn btn-primary">{editing ? 'Ndrysho' : 'Shto Plan'}</button>
        {editing && <button className="btn btn-secondary ms-2" onClick={() => setEditing(null)}>Anulo</button>}
      </form>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Emërtimi</th>
            <th>Çmimi</th>
            <th>Ditë</th>
            <th>Veprime</th>
          </tr>
        </thead>
        <tbody>
          {plans.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.emertimi}</td>
              <td>{p.cmimi}€</td>
              <td>{p.kohezgjatja_dite}</td>
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

export default Subscriptions;