import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
    localStorage.setItem('token', res.data.token);
    if (res.data.refreshToken) {
      localStorage.setItem('refreshToken', res.data.refreshToken);
    }
    localStorage.setItem('user', JSON.stringify(res.data.user));

    const role = res.data.user.role;
    if (role === 'admin' || role === 'editor') {
      navigate('/dashboard');
    } else {
      navigate('/blog');
    }
    } catch (err) {
    if (err.response?.status === 403) {
      setError('Your account has been deactivated!');
    } else {
      setError('Invalid email or password');
    }
   }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ width: '52px', height: '52px', background: '#fff0e6', borderRadius: '14px', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <i className="ti ti-pencil" style={{ color: '#c05621', fontSize: '24px' }} aria-hidden="true"></i>
          </div>
          <h4 style={{ fontSize: '20px', fontWeight: '600', color: '#7c3a00' }}>CMS Blog</h4>
          <p style={{ fontSize: '13px', color: '#b06030', marginTop: '4px' }}>Sign in to your account</p>
        </div>
        {error && <div className="alert alert-danger" style={{ fontSize: '13px' }}>{error}</div>}
        <form onSubmit={handleLogin}>
          <label className="form-label-custom">Email</label>
          <input type="email" className="form-control-custom" placeholder="email@example.com" value={email}
            onChange={e => setEmail(e.target.value)} required />
          <label className="form-label-custom">Password</label>
          <input type="password" className="form-control-custom" placeholder="••••••••" value={password}
            onChange={e => setPassword(e.target.value)} required />
          <button type="submit" className="btn-primary-custom" style={{ width: '100%', padding: '10px', marginTop: '8px' }}>
            Login
          </button>
          <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '13px', color: '#b06030' }}>
            Don't have an account? <a href="/register" style={{ color: '#c05621', fontWeight: '500' }}>Register here</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;