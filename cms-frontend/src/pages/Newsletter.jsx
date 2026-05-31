import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

function Newsletter() {
  const [subscribers, setSubscribers] = useState([]);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) navigate('/login');
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    const res = await API.get('/newsletter');
    setSubscribers(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post('/newsletter', { email });
    setEmail('');
    fetchSubscribers();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      await API.delete(`/newsletter/${id}`);
      fetchSubscribers();
    }
  };

  return (
    <div className="main-content">
      <div className="topbar">
        <p style={{ fontWeight: '600', fontSize: '15px', color: '#7c3a00' }}>Newsletter</p>
        <div className="avatar-circle">A</div>
      </div>
      <div className="page-content">
        <div className="content-card">
          <div className="card-title">Add Subscriber</div>
          <form onSubmit={handleSubmit}>
            <label className="form-label-custom">Email</label>
            <input className="form-control-custom" placeholder="email@example.com" type="email" value={email}
              onChange={e => setEmail(e.target.value)} required />
            <button type="submit" className="btn-primary-custom">Add Subscriber</button>
          </form>
        </div>

        <div className="content-card">
          <div className="card-title">All Subscribers ({subscribers.length})</div>
          <table className="table-clean">
            <thead>
              <tr>
                <th>Email</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map(s => (
                <tr key={s.id}>
                  <td>{s.email}</td>
                  <td><span className={`badge-${s.statusi === 'active' ? 'published' : 'archived'}`}>{s.statusi}</span></td>
                  <td style={{ color: '#b06030' }}>{new Date(s.data_abonimit).toLocaleDateString()}</td>
                  <td>
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

export default Newsletter;