import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!localStorage.getItem('token')) navigate('/login');
    API.get('/posts').then(res => setPosts(res.data));
    API.get('/comments').then(res => setComments(res.data));
    API.get('/users').then(res => setUsers(res.data));
  }, []);

  return (
    <div className="main-content">
      <div className="topbar">
        <div>
          <p style={{ fontWeight: '600', fontSize: '15px', color: '#7c3a00' }}>Dashboard</p>
          <span style={{ fontSize: '11px', color: '#b06030' }}>Welcome back, {user?.emri}</span>
        </div>
        <div className="avatar-circle">{user?.emri?.charAt(0).toUpperCase()}</div>
      </div>

      <div className="page-content">
        <div className="row g-3 mb-4">
          <div className="col-md-3">
            <div className="stat-card">
              <div style={{ fontSize: '12px', color: '#b06030', marginBottom: '6px' }}>
                <i className="ti ti-file-text" aria-hidden="true"></i> Posts
              </div>
              <div style={{ fontSize: '26px', fontWeight: '600', color: '#7c3a00' }}>{posts.length}</div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stat-card" style={{ borderTopColor: '#5b9bd5' }}>
              <div style={{ fontSize: '12px', color: '#b06030', marginBottom: '6px' }}>
                <i className="ti ti-message" aria-hidden="true"></i> Comments
              </div>
              <div style={{ fontSize: '26px', fontWeight: '600', color: '#7c3a00' }}>{comments.length}</div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stat-card" style={{ borderTopColor: '#6abf69' }}>
              <div style={{ fontSize: '12px', color: '#b06030', marginBottom: '6px' }}>
                <i className="ti ti-users" aria-hidden="true"></i> Users
              </div>
              <div style={{ fontSize: '26px', fontWeight: '600', color: '#7c3a00' }}>{users.length}</div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stat-card" style={{ borderTopColor: '#9b59b6' }}>
              <div style={{ fontSize: '12px', color: '#b06030', marginBottom: '6px' }}>
                <i className="ti ti-eye" aria-hidden="true"></i> Views
              </div>
              <div style={{ fontSize: '26px', fontWeight: '600', color: '#7c3a00' }}>0</div>
            </div>
          </div>
        </div>

        <div className="content-card">
          <div className="card-title">Recent Posts</div>
          <table className="table-clean">
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {posts.slice(0, 5).map(p => (
                <tr key={p.id}>
                  <td>{p.titulli}</td>
                  <td>
                    <span className={`badge-${p.statusi}`}>{p.statusi}</span>
                  </td>
                  <td style={{ color: '#b06030' }}>
                    {new Date(p.data_publikimit || Date.now()).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="content-card">
          <div className="card-title">Recent Comments</div>
          <table className="table-clean">
            <thead>
              <tr>
                <th>Comment</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {comments.slice(0, 5).map(c => (
                <tr key={c.id}>
                  <td>{c.permbajtja}</td>
                  <td><span className={`badge-${c.statusi === 'approved' ? 'published' : 'draft'}`}>{c.statusi}</span></td>
                  <td style={{ color: '#b06030' }}>{new Date(c.data).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;