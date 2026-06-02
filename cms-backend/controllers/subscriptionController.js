const db = require('../config/db');

const getPlans = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM SubscriptionPlans');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createPlan = async (req, res) => {
  const { emertimi, cmimi, kohezgjatja_dite, pershkrimi } = req.body;
  try {
    const [r] = await db.query(
      'INSERT INTO SubscriptionPlans (emertimi, cmimi, kohezgjatja_dite, pershkrimi) VALUES (?,?,?,?)',
      [emertimi, cmimi, kohezgjatja_dite, pershkrimi]
    );
    res.status(201).json({ message: 'Plani u krijua', id: r.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updatePlan = async (req, res) => {
  const { emertimi, cmimi, kohezgjatja_dite, pershkrimi, statusi } = req.body;
  try {
    await db.query(
      'UPDATE SubscriptionPlans SET emertimi=?, cmimi=?, kohezgjatja_dite=?, pershkrimi=?, statusi=? WHERE id=?',
      [emertimi, cmimi, kohezgjatja_dite, pershkrimi, statusi, req.params.id]
    );
    res.json({ message: 'U ndryshua' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deletePlan = async (req, res) => {
  try {
    await db.query('DELETE FROM SubscriptionPlans WHERE id=?', [req.params.id]);
    res.json({ message: 'U fshi' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUserSubscriptions = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT us.*, sp.emertimi as plani FROM UserSubscriptions us LEFT JOIN SubscriptionPlans sp ON us.plan_id = sp.id WHERE us.user_id = ?',
      [req.user.id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllSubscriptions = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT us.*, sp.emertimi as plani, u.emri as user_emri 
       FROM UserSubscriptions us 
       LEFT JOIN SubscriptionPlans sp ON us.plan_id = sp.id
       LEFT JOIN Users u ON us.user_id = u.id`
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createSubscription = async (req, res) => {
  const { user_id, plan_id, data_fillimit, data_mbarimit } = req.body;
  try {
    const [r] = await db.query(
      'INSERT INTO UserSubscriptions (user_id, plan_id, data_fillimit, data_mbarimit, aktivizuar_nga) VALUES (?,?,?,?,?)',
      [user_id, plan_id, data_fillimit, data_mbarimit, req.user.id]
    );
    res.status(201).json({ message: 'Abonimi u aktivizua', id: r.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getPlans, createPlan, updatePlan, deletePlan, getUserSubscriptions, createSubscription, getAllSubscriptions  };