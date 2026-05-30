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
    if (window.confirm('Je i sigurt?')) {
      await API.delete(`/newsletter/${id}`);
      fetchSubscribers();
    }
  };

  return (
    <div className="container mt-4">
      <h3>Abonentët e Newsletter</h3>
      <form onSubmit={handleSubmit} className="card p-3 mb-4">
        <div className="mb-2">
          <input className="form-control" placeholder="Email" type="email" value={email}
            onChange={e => setEmail(e.target.value)} required />
        </div>
        <button className="btn btn-primary">Shto Abonent</button>
      </form>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Statusi</th>
            <th>Data</th>
            <th>Veprime</th>
          </tr>
        </thead>
        <tbody>
          {subscribers.map(s => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.email}</td>
              <td>{s.statusi}</td>
              <td>{new Date(s.data_abonimit).toLocaleDateString()}</td>
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(s.id)}>Fshi</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Newsletter;