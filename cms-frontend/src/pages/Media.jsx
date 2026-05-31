import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

function Media() {
  const [media, setMedia] = useState([]);
  const [form, setForm] = useState({ emri_skedarit: '', lloji: '', rruga: '' });
  const [editing, setEditing] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) navigate('/login');
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    const res = await API.get('/media');
    setMedia(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await API.put(`/media/${editing}`, form);
      setEditing(null);
    } else {
      await API.post('/media', form);
    }
    setForm({ emri_skedarit: '', lloji: '', rruga: '' });
    fetchMedia();
  };

  const handleEdit = (m) => {
    setEditing(m.id);
    setForm({ emri_skedarit: m.emri_skedarit, lloji: m.lloji, rruga: m.rruga });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      await API.delete(`/media/${id}`);
      fetchMedia();
    }
  };

  return (
    <div className="main-content">
      <div className="topbar">
        <p style={{ fontWeight: '600', fontSize: '15px', color: '#7c3a00' }}>Media</p>
        <div className="avatar-circle">A</div>
      </div>
      <div className="page-content">
        <div className="content-card">
          <div className="card-title">{editing ? 'Edit Media' : 'Add New Media'}</div>
          <form onSubmit={handleSubmit}>
            <label className="form-label-custom">File Name</label>
            <input className="form-control-custom" placeholder="filename.jpg" value={form.emri_skedarit}
              onChange={e => setForm({ ...form, emri_skedarit: e.target.value })} required />
            <label className="form-label-custom">Type</label>
            <select className="form-control-custom" value={form.lloji}
              onChange={e => setForm({ ...form, lloji: e.target.value })}>
              <option value="">Select type...</option>
              <option value="image">Image</option>
              <option value="video">Video</option>
              <option value="document">Document</option>
            </select>
            <label className="form-label-custom">URL</label>
            <input className="form-control-custom" placeholder="https://..." value={form.rruga}
              onChange={e => setForm({ ...form, rruga: e.target.value })} required />
            {form.rruga && form.lloji === 'image' && (
              <img src={form.rruga} alt="preview" style={{ width: '100%', maxHeight: '150px', objectFit: 'cover', borderRadius: '8px', marginBottom: '12px' }} />
            )}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button type="submit" className="btn-primary-custom">{editing ? 'Update' : 'Add Media'}</button>
              {editing && <button type="button" className="btn-edit-custom" onClick={() => setEditing(null)}>Cancel</button>}
            </div>
          </form>
        </div>

        <div className="content-card">
          <div className="card-title">All Media</div>
          <table className="table-clean">
            <thead>
              <tr>
                <th>Preview</th>
                <th>File Name</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {media.map(m => (
                <tr key={m.id}>
                  <td>
                    {m.lloji === 'image' ? (
                      <img src={m.rruga} alt={m.emri_skedarit} style={{ width: '50px', height: '35px', objectFit: 'cover', borderRadius: '6px' }} />
                    ) : (
                      <div style={{ width: '50px', height: '35px', background: '#fde8d0', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <i className="ti ti-file" style={{ color: '#b06030' }} aria-hidden="true"></i>
                      </div>
                    )}
                  </td>
                  <td>{m.emri_skedarit}</td>
                  <td style={{ color: '#b06030' }}>{m.lloji}</td>
                  <td>
                    <button className="btn-edit-custom" onClick={() => handleEdit(m)}>Edit</button>
                    <button className="btn-delete-custom" onClick={() => handleDelete(m.id)}>Delete</button>
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

export default Media;