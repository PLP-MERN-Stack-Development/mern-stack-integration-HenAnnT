import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostView from './pages/PostView';
import PostForm from './pages/PostForm';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import Home from './pages/Home';

function App() {
    return (
        <Router>
            <Navbar /> {/* rendered on every page */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/posts/:id" element={<PostView />} />
                <Route path="/create" element={<PostForm />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    );
}

export default App;
