import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Import image directly from src/assets with exact casing (Lab4.webp)
import bgImage from '../assets/Lab4.webp';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!email || !password) {
            setError('Please enter both email and password.');
            return;
        }

        localStorage.setItem('loggedIn', 'true');
        setError('');
        navigate('/');
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            width: '100vw',
            fontFamily: 'sans-serif',
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed'
        }}>
            <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                padding: '40px',
                borderRadius: '10px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                border: '1px solid #e9ecef',
                width: '100%',
                maxWidth: '400px',
                boxSizing: 'border-box'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <div style={{ fontSize: '32px', marginBottom: '8px' }}>🎓</div>
                    <h2 style={{ margin: 0, fontSize: '24px', color: '#1a1d20', fontWeight: '600' }}>
                        Library System
                    </h2>
                    <p style={{ margin: '6px 0 0', color: '#6c757d', fontSize: '14px' }}>
                        Sign in to access your dashboard
                    </p>
                </div>

                {error && (
                    <div style={{
                        backgroundColor: '#f8d7da',
                        color: '#842029',
                        padding: '10px 14px',
                        borderRadius: '6px',
                        fontSize: '14px',
                        marginBottom: '20px',
                        border: '1px solid #f5c2c7'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '14px', color: '#495057', fontWeight: '500' }}>
                            Email Address
                        </label>
                        <input
                            type="email"
                            placeholder="admin@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{
                                padding: '10px 14px',
                                borderRadius: '6px',
                                border: '1px solid #ced4da',
                                fontSize: '14px',
                                outline: 'none'
                            }}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '14px', color: '#495057', fontWeight: '500' }}>
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                padding: '10px 14px',
                                borderRadius: '6px',
                                border: '1px solid #ced4da',
                                fontSize: '14px',
                                outline: 'none'
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        style={{
                            backgroundColor: '#0d6efd',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '12px',
                            fontSize: '14px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            marginTop: '10px'
                        }}
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;