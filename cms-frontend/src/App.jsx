import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Posts from './pages/Posts';
import Categories from './pages/Categories';
import Tags from './pages/Tags';
import Comments from './pages/Comments';
import Pages from './pages/Pages';
import Media from './pages/Media';
import Settings from './pages/Settings';
import Newsletter from './pages/Newsletter';
import Users from './pages/Users';
import Roles from './pages/Roles';
import Subscriptions from './pages/Subscriptions';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import Home from './pages/public/Home';
import PostDetail from './pages/public/PostDetail';
import CreatePost from './pages/public/CreatePost';
import Profile from './pages/public/Profile';
import PostsByCategory from './pages/public/PostsByCategory';
import PostsByTag from './pages/public/PostsByTag';
import EditPost from './pages/public/EditPost';

function Layout({ children }) {
  const location = useLocation();
  const isLogin = location.pathname === '/login' || location.pathname === '/' || location.pathname === '/register' || location.pathname.startsWith('/blog');
  return (
    <div className="d-flex">
      {!isLogin && <Sidebar />}
      <div className="flex-grow-1">{children}</div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<PrivateRoute adminOnly><Dashboard /></PrivateRoute>} />
          <Route path="/posts" element={<PrivateRoute adminOnly><Posts /></PrivateRoute>} />
          <Route path="/categories" element={<PrivateRoute adminOnly><Categories /></PrivateRoute>} />
          <Route path="/tags" element={<PrivateRoute adminOnly><Tags /></PrivateRoute>} />
          <Route path="/comments" element={<PrivateRoute adminOnly><Comments /></PrivateRoute>} />
          <Route path="/pages" element={<PrivateRoute adminOnly><Pages /></PrivateRoute>} />
          <Route path="/media" element={<PrivateRoute adminOnly><Media /></PrivateRoute>} />
          <Route path="/settings" element={<PrivateRoute adminOnly><Settings /></PrivateRoute>} />
          <Route path="/newsletter" element={<PrivateRoute adminOnly><Newsletter /></PrivateRoute>} />
          <Route path="/users" element={<PrivateRoute adminOnly><Users /></PrivateRoute>} />
          <Route path="/roles" element={<PrivateRoute adminOnly><Roles /></PrivateRoute>} />
          <Route path="/subscriptions" element={<PrivateRoute adminOnly><Subscriptions /></PrivateRoute>} />
          <Route path="/blog" element={<PublicRoute><Home /></PublicRoute>} />
          <Route path="/blog/post/:id" element={<PublicRoute><PostDetail /></PublicRoute>} />
          <Route path="/blog/create" element={<PublicRoute><CreatePost /></PublicRoute>} />
          <Route path="/blog/profile" element={<PublicRoute><Profile /></PublicRoute>} />
          <Route path="/blog/category/:id" element={<PublicRoute><PostsByCategory /></PublicRoute>} />
          <Route path="/blog/tag/:id" element={<PublicRoute><PostsByTag /></PublicRoute>} />
          <Route path="/blog/edit/:id" element={<PublicRoute><EditPost /></PublicRoute>} />

        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;