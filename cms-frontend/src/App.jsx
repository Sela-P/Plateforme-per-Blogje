import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Sidebar from './components/Sidebar';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';


const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Posts = lazy(() => import('./pages/Posts'));
const Categories = lazy(() => import('./pages/Categories'));
const Tags = lazy(() => import('./pages/Tags'));
const Comments = lazy(() => import('./pages/Comments'));
const Pages = lazy(() => import('./pages/Pages'));
const Media = lazy(() => import('./pages/Media'));
const Settings = lazy(() => import('./pages/Settings'));
const Newsletter = lazy(() => import('./pages/Newsletter'));
const Users = lazy(() => import('./pages/Users'));
const Roles = lazy(() => import('./pages/Roles'));
const Subscriptions = lazy(() => import('./pages/Subscriptions'));

const Home = lazy(() => import('./pages/public/Home'));
const PostDetail = lazy(() => import('./pages/public/PostDetail'));
const CreatePost = lazy(() => import('./pages/public/CreatePost'));
const Profile = lazy(() => import('./pages/public/Profile'));
const PostsByCategory = lazy(() => import('./pages/public/PostsByCategory'));
const PostsByTag = lazy(() => import('./pages/public/PostsByTag'));
const EditPost = lazy(() => import('./pages/public/EditPost'));

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
         <Suspense fallback={<div>Loading...</div>}>

        <Routes>

          <Route
              path="/dashboard"
              element={
                <PrivateRoute adminOnly>
                  <Dashboard />
                </PrivateRoute>
              }
            />

            <Route
              path="/posts"
              element={
                <PrivateRoute adminOnly>
                  <Posts />
                </PrivateRoute>
              }
            />
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
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
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
}

export default App;