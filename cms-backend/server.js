const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const postRoutes = require('./routes/posts');
app.use('/api/posts', postRoutes);

const categoryRoutes = require('./routes/categories');
app.use('/api/categories', categoryRoutes);

const tagRoutes = require('./routes/tags');
app.use('/api/tags', tagRoutes);
//pages
const pageRoutes = require('./routes/pages');
app.use('/api/pages', pageRoutes);

const mediaRoutes = require('./routes/media');
app.use('/api/media', mediaRoutes);

const settingRoutes = require('./routes/settings');
app.use('/api/settings', settingRoutes);

const newsletterRoutes = require('./routes/newsletter');
app.use('/api/newsletter', newsletterRoutes);

const subscriptionRoutes = require('./routes/subscriptions');
app.use('/api/subscriptions', subscriptionRoutes);

const roleRoutes = require('./routes/roles');
app.use('/api/roles', roleRoutes);

const postViewRoutes = require('./routes/postViews');
app.use('/api/postviews', postViewRoutes);

const userRoleRoutes = require('./routes/userRoles');
app.use('/api/userroles', userRoleRoutes);

const userClaimRoutes = require('./routes/userClaims');
app.use('/api/userclaims', userClaimRoutes);

const postTagRoutes = require('./routes/postTags');
app.use('/api/posttags', postTagRoutes);

const notificationRoutes = require('./routes/notifications');
app.use('/api/notifications', notificationRoutes);

const auditLogRoutes = require('./routes/auditLog');
app.use('/api/auditlog', auditLogRoutes);

const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);

const refreshTokenRoutes = require('./routes/refreshTokens');
app.use('/api/refreshtokens', refreshTokenRoutes);


app.get('/', (req, res) => {
  res.json({ message: 'CMS Blog API po punon!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveri po ekzekutohet ne portin ${PORT}`);
});