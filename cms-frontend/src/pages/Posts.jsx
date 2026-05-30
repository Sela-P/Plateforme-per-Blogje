import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ titulli: '', permbajtja: '', statusi: 'draft' });
  const [editing, setEditing] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) navigate('/login');
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const res = await API.get('/posts');
    setPosts(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await API.put(`/posts/${editing}`, form);
      setEditing(null);
    } else {
      await API.post('/posts', form);
    }
    setForm({ titulli: '', permbajtja: '', statusi: 'draft' });
    fetchPosts();
  };

  const handleEdit = (post) => {
    setEditing(post.id);
    setForm({ titulli: post.titulli, permbajtja: post.permbajtja, statusi: post.statusi });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Je i sigurt?')) {
      await API.delete(`/posts/${id}`);
      fetchPosts();
    }
  };

  return (
    <div className="container mt-4">
      <h3>Menaxhimi i Artikujve</h3>
      <form onSubmit={handleSubmit} className="card p-3 mb-4">
        <div className="mb-2">
          <input className="form-control" placeholder="Titulli" value={form.titulli}
            onChange={e => setForm({ ...form, titulli: e.target.value })} required />
        </div>
        <div className="mb-2">
          <textarea className="form-control" placeholder="Përmbajtja" rows={4} value={form.permbajtja}
            onChange={e => setForm({ ...form, permbajtja: e.target.value })} />
        </div>
        <div className="mb-2">
          <select className="form-control" value={form.statusi}
            onChange={e => setForm({ ...form, statusi: e.target.value })}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>
        <button className="btn btn-primary">{editing ? 'Ndrysho' : 'Shto'}</button>
        {editing && <button className="btn btn-secondary ms-2" onClick={() => setEditing(null)}>Anulo</button>}
      </form>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Titulli</th>
            <th>Statusi</th>
            <th>Veprime</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.titulli}</td>
              <td>{p.statusi}</td>
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

export default Posts;