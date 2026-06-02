import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);  
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterMsg, setNewsletterMsg] = useState('');
  
  useEffect(() => {
    axios.get('http://localhost:5000/api/posts', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => {
      console.log(res.data);
      setPosts(res.data);
    }).catch(console.error);
    axios.get('http://localhost:5000/api/categories', {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  })
    .then(res => {
      setCategories(res.data);
    })
    .catch(console.error);

  }, []);



  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      setFilteredPosts([]);
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:5000/api/posts/search?q=${searchQuery}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      setFilteredPosts(res.data);
      setHasSearched(true);
    } catch (err) {
      console.error(err);
    }
  };

  const displayPosts = hasSearched
  ? filteredPosts
  : posts.filter(p => p.statusi === 'published');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleNewsletter = async (e) => {
  e.preventDefault();
  try {
    await axios.post('http://localhost:5000/api/newsletter', { email: newsletterEmail });
    setNewsletterMsg('Subscribed successfully!');
    setNewsletterEmail('');
  } catch (err) {
    setNewsletterMsg('Already subscribed or error!');
  }
  };

  const handleUnsubscribe = async () => {
  try {
    const res = await axios.get('http://localhost:5000/api/newsletter', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    const sub = res.data.find(s => s.email === newsletterEmail);
    if (!sub) { setNewsletterMsg('Email not found!'); return; }
    await axios.delete(`http://localhost:5000/api/newsletter/${sub.id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setNewsletterMsg('Unsubscribed successfully!');
    setNewsletterEmail('');
    } catch (err) {
    setNewsletterMsg('Error unsubscribing!');
   }
  };

  return (
    <div>
      <nav style={{ background: '#7c3a00', padding: '12px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4 style={{ color: 'white', margin: 0 }}> 𝐒𝐭✰𝐫𝐁𝐥𝐨𝐠</h4>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <button onClick={() => navigate('/blog/profile')} style={{ background: 'transparent', color: 'white', border: '1px solid white', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer' }}>
            Profile
          </button>
          <button onClick={() => navigate('/blog/create')} style={{ background: 'white', color: '#7c3a00', border: 'none', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer' }}>
            
            + Create Post
          </button>
          <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              background: 'white',
              border: '1.5px solid #ccc',
              borderRadius: '50px',
              padding: '6px 14px',
              gap: '8px',
              width: '280px'
            }}>
              <span style={{ fontSize: '16px', color: '#888' }}>🔎︎</span>
              <input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (!e.target.value) setFilteredPosts([]);
                }}
                style={{
                  border: 'none',
                  outline: 'none',
                  fontSize: '14px',
                  width: '100%',
                  background: 'transparent',
                  color: '#7c3a00'
                }}
              />
            </div>
          </form>

          <button
            onClick={handleLogout}
            style={{
              background: 'transparent',
              color: 'white',
              border: '1px solid white',
              padding: '6px 14px',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
          Log out
          </button>
        </div>
      </nav>
      

      <div style={{ maxWidth: '800px', margin: '32px auto', padding: '0 16px' }}>
        {displayPosts.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#888' }}>No posts yet.</p>
        ) : (
          displayPosts.map(post => (
            <div key={post.id} onClick={() => navigate(`/blog/post/${post.id}`)}
              style={{ background: 'white', border: '1px solid #eee', borderRadius: '10px', padding: '20px', marginBottom: '16px', cursor: 'pointer' }}>
              {post.imazhi && (
                <img src={`http://localhost:5000${post.imazhi}`}
                  style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '10px' }}
                  alt={post.titulli} />
              )}
              {post.category_id && (
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/blog/category/${post.category_id}`);
                  }}
                  style={{
                    background: '#fff0e6',
                    color: '#7c3a00',
                    padding: '3px 10px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    cursor: 'pointer',
                    marginBottom: '8px',
                    display: 'inline-block'
                  }}
                >
                  {categories.find(c => c.id === post.category_id)?.emertimi || 'Category'}
                </span>
              )}
              <h3 style={{ color: '#7c3a00', margin: '0 0 8px' }}>{post.titulli}</h3>
              <p style={{ color: '#666', fontSize: '14px' }}>{post.permbajtja?.substring(0, 150)}...</p>
            </div>
          ))
        )}
      </div>

      {/* Newsletter */}
      <div style={{ maxWidth: '800px', margin: '32px auto', padding: '24px', background: '#fff0e6', borderRadius: '10px', textAlign: 'center' }}>
        <h3 style={{ color: '#7c3a00', marginBottom: '8px' }}>Subscribe to Newsletter</h3>
        <p style={{ color: '#b06030', fontSize: '14px', marginBottom: '16px' }}>Get notified when new posts are published!</p>
        {newsletterMsg && <p style={{ color: 'green', marginBottom: '8px' }}>{newsletterMsg}</p>}
        <form onSubmit={handleNewsletter} style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
          <input type="email" value={newsletterEmail} onChange={e => setNewsletterEmail(e.target.value)}
            placeholder="Enter your email..." required
            style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px', width: '260px' }} />
          <button type="submit"
            style={{ background: '#7c3a00', color: 'white', border: 'none', padding: '8px 20px', borderRadius: '8px', cursor: 'pointer' }}>
            Subscribe
          </button>
          <button type="button" onClick={handleUnsubscribe}
          style={{ background: 'transparent', color: '#7c3a00', border: '1px solid #7c3a00', padding: '8px 20px', borderRadius: '8px', cursor: 'pointer' }}>
          Unsubscribe
          </button>
        </form>
      </div>

    </div>
  );
}

export default Home;

