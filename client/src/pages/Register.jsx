import { useState, useContext } from 'react';
import { authService } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await authService.register({ username, email, password });
        setUser(data.user);
        navigate('/');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
            <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;