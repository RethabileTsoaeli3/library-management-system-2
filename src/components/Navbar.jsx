import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('loggedIn');
        navigate('/login');
    };

    const linkStyle = {
        color: '#a6adba',
        textDecoration: 'none',
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontSize: '14px',
        transition: '0.2s'
    };

    return (
        <aside
            style={{
                width: '240px',
                minWidth: '240px',
                backgroundColor: '#212529',
                display: 'flex',
                flexDirection: 'column',
                paddingTop: '10px'
            }}
        >
            <Link to="/" style={linkStyle}>📊 Dashboard</Link>
            <Link to="/transactions" style={linkStyle}>📊 Transactions</Link>
            <Link to="/books" style={linkStyle}>📖 Books</Link>
            <Link to="/users" style={linkStyle}>👤 Users</Link>
            
            <button
                onClick={handleLogout}
                style={{
                    ...linkStyle,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    width: '100%',
                    textAlign: 'left'
                }}
            >
                🚪 Logout
            </button>
        </aside>
    );
}

export default Navbar;