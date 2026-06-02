import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PublicSubscriptions() {
  const [plans, setPlans] = useState([]);
  const [mySubscription, setMySubscription] = useState(null);
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    axios.get('http://localhost:5000/api/subscriptions/plans')
      .then(res => setPlans(res.data.filter(p => p.statusi === 'active')))
      .catch(console.error);

    axios.get('http://localhost:5000/api/subscriptions/my', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => {
      const active = res.data.find(s => s.statusi === 'active');
      setMySubscription(active || null);
    }).catch(console.error);
  }, []);

  const handleSubscribe = async (plan) => {
    try {
      const dataFillimit = new Date().toISOString().slice(0, 19).replace('T', ' ');
      const dataMbarimit = new Date(Date.now() + plan.kohezgjatja_dite * 24 * 60 * 60 * 1000)
        .toISOString().slice(0, 19).replace('T', ' ');

      await axios.post('http://localhost:5000/api/subscriptions',
        { user_id: user.id, plan_id: plan.id, data_fillimit: dataFillimit, data_mbarimit: dataMbarimit },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setMsg(`Subscribed to ${plan.emertimi} successfully!`);
      setTimeout(() => navigate('/blog'), 2000);
    } catch (err) {
      setMsg('Error subscribing!');
    }
  };

  return (
    <div>
      <nav style={{ background: '#7c3a00', padding: '12px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4 style={{ color: 'white', margin: 0, cursor: 'pointer' }} onClick={() => navigate('/blog')}>← CMS Blog</h4>
      </nav>

      <div style={{ maxWidth: '800px', margin: '32px auto', padding: '0 16px' }}>
        <h2 style={{ color: '#7c3a00', marginBottom: '8px' }}>Subscription Plans</h2>

        {mySubscription && (
          <div style={{ background: '#d4edda', border: '1px solid #c3e6cb', borderRadius: '10px', padding: '16px', marginBottom: '24px' }}>
            <p style={{ margin: 0, color: '#155724' }}>
              ✅ You are subscribed to <strong>{mySubscription.plani}</strong> — expires {new Date(mySubscription.data_mbarimit).toLocaleDateString()}
            </p>
          </div>
        )}

        {msg && <p style={{ color: 'green', marginBottom: '16px' }}>{msg}</p>}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          {plans.map(plan => (
            <div key={plan.id} style={{ background: '#8c5d3460', border: '1px solid #eee', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
              <h3 style={{ color: '#7c3a00', margin: '0 0 8px' }}>{plan.emertimi}</h3>
              <p style={{ fontSize: '28px', fontWeight: '700', color: '#7c3a00', margin: '8px 0' }}>{plan.cmimi}€</p>
              <p style={{ color: '#3a1313', fontSize: '13px', marginBottom: '8px' }}>{plan.kohezgjatja_dite} days</p>
              <p style={{ color: '#3a1313', fontSize: '14px', marginBottom: '16px' }}>{plan.pershkrimi}</p>
              <button onClick={() => handleSubscribe(plan)}
                style={{ background: '#7c3a00', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '8px', cursor: 'pointer', width: '100%' }}>
                Subscribe
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PublicSubscriptions;