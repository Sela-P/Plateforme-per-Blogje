import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!localStorage.getItem('token')) navigate('/login');
    API.get('/posts').then(res => setPosts(res.data));
    API.get('/comments').then(res => setComments(res.data));
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark px-4">
        <span className="navbar-brand">CMS Blog</span>
        <div>
          <span className="text-white me-3">Mirësevini, {user?.emri}</span>
          <button className="btn btn-outline-light btn-sm" onClick={logout}>Dil</button>
        </div>
      </nav>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-4">
            <div className="card text-white bg-primary p-3">
              <h5>Artikuj</h5>
              <h2>{posts.length}</h2>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-white bg-success p-3">
              <h5>Komente</h5>
              <h2>{comments.length}</h2>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <h5>Artikujt e fundit</h5>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Titulli</th>
                <th>Statusi</th>
              </tr>
            </thead>
            <tbody>
              {posts.slice(0, 5).map(p => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.titulli}</td>
                  <td>{p.statusi}</td>
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