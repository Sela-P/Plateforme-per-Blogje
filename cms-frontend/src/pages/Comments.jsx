import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

function Comments() {
  const [comments, setComments] = useState([]);
  const [form, setForm] = useState({ post_id: '', permbajtja: '' });
  const [editing, setEditing] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) navigate('/login');
    fetchComments();
  }, []);

  const fetchComments = async () => {
    const res = await API.get('/comments');
    setComments(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await API.put(`/comments/${editing}`, form);
      setEditing(null);
    } else {
      await API.post('/comments', form);
    }
    setForm({ post_id: '', permbajtja: '' });
    fetchComments();
  };

  const handleEdit = (comment) => {
    setEditing(comment.id);
    setForm({ post_id: comment.post_id, permbajtja: comment.permbajtja });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Je i sigurt?')) {
      await API.delete(`/comments/${id}`);
      fetchComments();
    }
  };

  return (
    <div className="container mt-4">
      <h3>Menaxhimi i Komenteve</h3>
      <form onSubmit={handleSubmit} className="card p-3 mb-4">
        <div className="mb-2">
          <input className="form-control" placeholder="ID e Artikullit" value={form.post_id}
            onChange={e => setForm({ ...form, post_id: e.target.value })} required />
        </div>
        <div className="mb-2">
          <textarea className="form-control" placeholder="Përmbajtja" rows={3} value={form.permbajtja}
            onChange={e => setForm({ ...form, permbajtja: e.target.value })} required />
        </div>
        <button className="btn btn-primary">{editing ? 'Ndrysho' : 'Shto'}</button>
        {editing && <button className="btn btn-secondary ms-2" onClick={() => setEditing(null)}>Anulo</button>}
      </form>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Post ID</th>
            <th>Përmbajtja</th>
            <th>Statusi</th>
            <th>Veprime</th>
          </tr>
        </thead>
        <tbody>
          {comments.map(c => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.post_id}</td>
              <td>{c.permbajtja}</td>
              <td>{c.statusi}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(c)}>Ndrysho</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(c.id)}>Fshi</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Comments;