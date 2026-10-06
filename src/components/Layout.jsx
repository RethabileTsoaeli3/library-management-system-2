import { useState } from 'react';
import Navbar from './Navbar';

function Layout({ children }) {
    const [showSidebar, setShowSidebar] = useState(true);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', fontFamily: 'sans-serif' }}>
            
            {/* Top Header Navigation Bar */}
            <header
                style={{
                    height: '60px',
                    backgroundColor: '#212529',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 20px',
                    zIndex: 1000
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    {/* Logo & Title */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '220px' }}>
                        <span style={{ fontSize: '20px' }}>🎓</span>
                        <span style={{ fontWeight: 'bold', fontSize: '18px' }}>Library System</span>
                    </div>

                    {/* Hamburger Toggle Icon Button */}
                    <button
                        onClick={() => setShowSidebar(!showSidebar)}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: '#fff',
                            fontSize: '20px',
                            cursor: 'pointer',
                            padding: '5px 10px'
                        }}
                    >
                        ☰
                    </button>
                </div>

                {/* Top Right User Profile Menu */}
                <div style={{ cursor: 'pointer', fontSize: '18px' }}>
                    👤 ▾
                </div>
            </header>

            {/* Main Body (Sidebar + Content Area) */}
            <div style={{ display: 'flex', flex: 1 }}>
                
                {/* Left Sidebar */}
                {showSidebar && <Navbar />}

                {/* Main Content Area */}
                <main
                    style={{
                        flex: 1,
                        backgroundColor: '#f8f9fa',
                        padding: '30px',
                        boxSizing: 'border-box',
                        width: '100%'
                    }}
                >
                    {children}
                </main>

            </div>
        </div>
    );
}

export default Layout;