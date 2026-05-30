import { BrowserRouter, Routes, Route } from 'react-router-dom';
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


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/tags" element={<Tags />} />
        <Route path="/comments" element={<Comments />} />
        <Route path="/pages" element={<Pages />} />
        <Route path="/media" element={<Media />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/newsletter" element={<Newsletter />} />
        <Route path="/users" element={<Users />} />
        <Route path="/roles" element={<Roles />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;