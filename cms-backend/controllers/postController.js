const db = require('../config/db');

const getPosts = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Posts');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getPost = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Posts WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Not found!' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createPost = async (req, res) => {
  const { titulli, permbajtja, category_id, statusi, imazhi } = req.body;
  try {
    const [r] = await db.query(
      'INSERT INTO Posts (titulli, permbajtja, user_id, category_id, statusi, imazhi) VALUES (?,?,?,?,?,?)',
      [titulli, permbajtja, req.user.id, category_id, statusi || 'draft', imazhi]
    );
    res.status(201).json({ message: 'Created successfully!', id: r.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updatePost = async (req, res) => {
  const { titulli, permbajtja, category_id, statusi, imazhi } = req.body;
  try {
    await db.query(
      'UPDATE Posts SET titulli=?, permbajtja=?, category_id=?, statusi=?, imazhi=? WHERE id=?',
      [titulli, permbajtja, category_id, statusi, imazhi, req.params.id]
    );
    res.json({ message: 'Changed successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deletePost = async (req, res) => {
  try {
    await db.query('DELETE FROM Posts WHERE id=?', [req.params.id]);
    res.json({ message: 'Deleted successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const searchPosts = async (req, res) => {
  try {
    const q = `%${req.query.q}%`;
    const [rows] = await db.query(
      'SELECT * FROM Posts WHERE (titulli LIKE ? OR permbajtja LIKE ?) AND statusi = "published"',
      [q, q]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getPostsByCategory = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT p.*, c.emertimi as category_name FROM Posts p JOIN Categories c ON p.category_id = c.id WHERE p.statusi = "published" AND p.category_id = ?',
      [req.params.id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getPostsByTag = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT Posts.*, Tags.emertimi as tag_name 
       FROM Posts 
       JOIN PostTags ON Posts.id = PostTags.post_id 
       JOIN Tags ON PostTags.tag_id = Tags.id 
       WHERE Posts.statusi = "published" AND Tags.id = ?`,
      [req.params.id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getPosts, getPost, createPost, updatePost, deletePost, searchPosts, getPostsByCategory, getPostsByTag };