import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiHelper from '../utils/apiHelper';
import './RegisterPage.css';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('customer');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setIsLoading(true);

        try {
            await apiHelper.post('/api/auth/register', { email, password, role });
            alert('Registration successful! You can now log in.');
            navigate('/login');
        } catch (error) {
            console.error('Registration failed:', error.message);
            setError('Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignIn = () => {
        navigate('/login');
    };

    return (
        <div className="register-container">
            <form className="form" onSubmit={handleRegister}>
                <span className="signup">Sign Up</span>
                {error && <div className="error-message">{error}</div>}
                <input
                    type="email"
                    placeholder="Email address"
                    className="form--input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="form--input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm password"
                    className="form--input"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <select
                    className="form--input"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                >
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                </select>
                <button type="submit" className="form--submit" disabled={isLoading}>
                    {isLoading ? 'Signing up...' : 'Sign up'}
                </button>
                <button type="button" className="form--signin" onClick={handleSignIn}>
                    Sign In
                </button>
            </form>
        </div>
    );
};

export default RegisterPage;
