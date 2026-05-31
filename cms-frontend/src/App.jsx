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
import Home from './pages/public/Home';

function Layout({ children }) {
  const location = useLocation();
  const isLogin = location.pathname === '/login' || location.pathname === '/' || location.pathname === '/register';
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
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/posts" element={<PrivateRoute><Posts /></PrivateRoute>} />
          <Route path="/categories" element={<PrivateRoute><Categories /></PrivateRoute>} />
          <Route path="/tags" element={<PrivateRoute><Tags /></PrivateRoute>} />
          <Route path="/comments" element={<PrivateRoute><Comments /></PrivateRoute>} />
          <Route path="/pages" element={<PrivateRoute><Pages /></PrivateRoute>} />
          <Route path="/media" element={<PrivateRoute><Media /></PrivateRoute>} />
          <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
          <Route path="/newsletter" element={<PrivateRoute><Newsletter /></PrivateRoute>} />
          <Route path="/users" element={<PrivateRoute><Users /></PrivateRoute>} />
          <Route path="/roles" element={<PrivateRoute><Roles /></PrivateRoute>} />
          <Route path="/subscriptions" element={<PrivateRoute><Subscriptions /></PrivateRoute>} />
          <Route path="/blog" element={<Home />} />
          function Home() {
export default Home;
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;