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
    if (window.confirm('Are you sure?')) {
      await API.delete(`/subscriptions/plans/${id}`);
      fetchPlans();
    }
  };

  return (
    <div className="main-content">
      <div className="topbar">
        <p style={{ fontWeight: '600', fontSize: '15px', color: '#7c3a00' }}>Subscriptions</p>
        <div className="avatar-circle">A</div>
      </div>
      <div className="page-content">
        <div className="content-card">
          <div className="card-title">{editing ? 'Edit Plan' : 'Add New Plan'}</div>
          <form onSubmit={handleSubmit}>
            <label className="form-label-custom">Plan Name</label>
            <input className="form-control-custom" placeholder="e.g. Basic, Premium" value={form.emertimi}
              onChange={e => setForm({ ...form, emertimi: e.target.value })} required />
            <label className="form-label-custom">Price (€)</label>
            <input className="form-control-custom" placeholder="9.99" type="number" value={form.cmimi}
              onChange={e => setForm({ ...form, cmimi: e.target.value })} required />
            <label className="form-label-custom">Duration (days)</label>
            <input className="form-control-custom" placeholder="30" type="number" value={form.kohezgjatja_dite}
              onChange={e => setForm({ ...form, kohezgjatja_dite: e.target.value })} required />
            <label className="form-label-custom">Description</label>
            <input className="form-control-custom" placeholder="Plan description..." value={form.pershkrimi}
              onChange={e => setForm({ ...form, pershkrimi: e.target.value })} />
            <div style={{ display: 'flex', gap: '8px' }}>
              <button type="submit" className="btn-primary-custom">{editing ? 'Update Plan' : 'Add Plan'}</button>
              {editing && <button type="button" className="btn-edit-custom" onClick={() => setEditing(null)}>Cancel</button>}
            </div>
          </form>
        </div>

        <div className="content-card">
          <div className="card-title">All Plans ({plans.length})</div>
          <table className="table-clean">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Duration</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {plans.map(p => (
                <tr key={p.id}>
                  <td style={{ fontWeight: '500' }}>{p.emertimi}</td>
                  <td style={{ color: '#7c3a00', fontWeight: '600' }}>{p.cmimi}€</td>
                  <td style={{ color: '#b06030' }}>{p.kohezgjatja_dite} days</td>
                  <td><span className={`badge-${p.statusi === 'active' ? 'published' : 'archived'}`}>{p.statusi}</span></td>
                  <td>
                    <button className="btn-edit-custom" onClick={() => handleEdit(p)}>Edit</button>
                    <button className="btn-delete-custom" onClick={() => handleDelete(p.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="content-card">
          <div className="card-title">Active Subscriptions ({subscriptions.length})</div>
          <table className="table-clean">
            <thead>
              <tr>
                <th>Plan</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map(s => (
                <tr key={s.id}>
                  <td>{s.plani}</td>
                  <td style={{ color: '#b06030' }}>{new Date(s.data_fillimit).toLocaleDateString()}</td>
                  <td style={{ color: '#b06030' }}>{new Date(s.data_mbarimit).toLocaleDateString()}</td>
                  <td><span className={`badge-${s.statusi === 'active' ? 'published' : 'archived'}`}>{s.statusi}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Subscriptions;