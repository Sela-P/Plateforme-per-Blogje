import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({ emri: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', form);
      setSuccess('Registration successful! Redirecting...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Error during registration');
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ width: '52px', height: '52px', background: '#fff0e6', borderRadius: '14px', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <i className="ti ti-user-plus" style={{ color: '#c05621', fontSize: '24px' }} aria-hidden="true"></i>
          </div>
          <h4 style={{ fontSize: '20px', fontWeight: '600', color: '#7c3a00' }}>Create Account</h4>
          <p style={{ fontSize: '13px', color: '#b06030', marginTop: '4px' }}>Join CMS Blog today</p>
        </div>
        {error && <div className="alert alert-danger" style={{ fontSize: '13px' }}>{error}</div>}
        {success && <div className="alert alert-success" style={{ fontSize: '13px' }}>{success}</div>}
        <form onSubmit={handleRegister}>
          <label className="form-label-custom">Full Name</label>
          <input type="text" className="form-control-custom" placeholder="Your name..." value={form.emri}
            onChange={e => setForm({ ...form, emri: e.target.value })} required />
          <label className="form-label-custom">Email</label>
          <input type="email" className="form-control-custom" placeholder="email@example.com" value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })} required />
          <label className="form-label-custom">Password</label>
          <input type="password" className="form-control-custom" placeholder="••••••••" value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })} required />
          <button type="submit" className="btn-primary-custom" style={{ width: '100%', padding: '10px', marginTop: '8px' }}>
            Create Account
          </button>
          <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '13px', color: '#b06030' }}>
            Already have an account? <a href="/login" style={{ color: '#c05621', fontWeight: '500' }}>Login here</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;