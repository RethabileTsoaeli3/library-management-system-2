import React, { useState } from 'react';

function Users() {

    // USERS
    const [users, setUsers] = useState([
        {
            id: 1,
            name: 'Mahlajoane',
            email: 'mahlajoane@gmail.com',
            password: '246',
            role: 'Member'
        },
        {
            id: 2,
            name: 'Rosy',
            email: 'rosy@gmail.com',
            password: '246',
            role: 'Member'
        },
        {
            id: 3,
            name: 'Thabo',
            email: 'thabo@gmail.com',
            password: '246',
            role: 'Member'
        },
        {
            id: 4,
            name: 'Admin',
            email: 'admin@gmail.com',
            password: '1234',
            role: 'Admin'
        }
    ]);

    // ADD / UPDATE USER FORM
    const [showAddForm, setShowAddForm] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Member');

    // EDIT USER
    const [editingId, setEditingId] = useState(null);

    // ADMIN LOGIN
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [loginMessage, setLoginMessage] = useState('');

    // ADMIN LOGIN
    const handleAdminLogin = (e) => {
        e.preventDefault();

        const admin = users.find(
            (user) =>
                user.email === loginEmail &&
                user.password === loginPassword &&
                user.role === 'Admin'
        );

        if (admin) {
            setIsAdmin(true);
            setLoginMessage('Login successful!');
            setLoginEmail('');
            setLoginPassword('');
        } else {
            setLoginMessage('Invalid Admin email or password.');
        }
    };

    // ADD USER
    const handleAddUser = (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            alert('Please fill in all fields.');
            return;
        }

        const newUser = {
            id: users.length + 1,
            name: name,
            email: email,
            password: password,
            role: role
        };

        setUsers([...users, newUser]);

        setName('');
        setEmail('');
        setPassword('');
        setRole('Member');

        setShowAddForm(false);
    };

    // EDIT USER
    const handleEdit = (user) => {
        setEditingId(user.id);
        setName(user.name);
        setEmail(user.email);
        setPassword(user.password);
        setRole(user.role);
        setShowAddForm(true);
    };

    // UPDATE USER
    const handleUpdateUser = (e) => {
        e.preventDefault();

        const updatedUsers = users.map((user) => {
            if (user.id === editingId) {
                return {
                    ...user,
                    name: name,
                    email: email,
                    password: password,
                    role: role
                };
            }

            return user;
        });

        setUsers(updatedUsers);

        setName('');
        setEmail('');
        setPassword('');
        setRole('Member');
        setEditingId(null);
        setShowAddForm(false);
    };

    // DELETE USER
    const handleDelete = (id) => {
        setUsers(users.filter((user) => user.id !== id));
    };

    return (
        <div
            style={{
                maxWidth: '1200px',
                margin: '0 auto',
                width: '100%'
            }}
        >

            {/* ADMIN LOGIN */}

            {!isAdmin && (
                <div
                    style={{
                        backgroundColor: '#ffffff',
                        borderRadius: '10px',
                        padding: '25px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                        border: '1px solid #e9ecef',
                        maxWidth: '500px',
                        margin: '50px auto'
                    }}
                >

                    <h2 style={{ marginTop: 0 }}>
                        Admin Login
                    </h2>

                    <p style={{ color: '#6c757d' }}>
                        Please login as an administrator to manage users.
                    </p>

                    <form onSubmit={handleAdminLogin}>

                        {/* EMAIL */}

                        <input
                            type="email"
                            placeholder="Admin Email"
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '10px',
                                marginBottom: '12px',
                                borderRadius: '6px',
                                border: '1px solid #ced4da',
                                boxSizing: 'border-box'
                            }}
                        />

                        {/* PASSWORD */}

                        <input
                            type="password"
                            placeholder="Admin Password"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '10px',
                                marginBottom: '12px',
                                borderRadius: '6px',
                                border: '1px solid #ced4da',
                                boxSizing: 'border-box'
                            }}
                        />

                        {/* LOGIN BUTTON */}

                        <button
                            type="submit"
                            style={{
                                backgroundColor: '#0d6efd',
                                color: '#ffffff',
                                border: 'none',
                                borderRadius: '6px',
                                padding: '10px 20px',
                                cursor: 'pointer'
                            }}
                        >
                            Login
                        </button>

                        {/* LOGIN MESSAGE */}

                        {loginMessage && (
                            <p style={{ marginTop: '12px' }}>
                                {loginMessage}
                            </p>
                        )}

                    </form>

                </div>
            )}

            {/* ADMIN VIEW */}

            {isAdmin && (
                <div>

                    {/* HEADER */}

                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '25px'
                        }}
                    >

                        <div style={{ textAlign: 'left' }}>

                            <h1
                                style={{
                                    margin: 0,
                                    fontSize: '28px',
                                    color: '#1a1d20',
                                    fontWeight: '600'
                                }}
                            >
                                User Management
                            </h1>

                            <p
                                style={{
                                    margin: '6px 0 0',
                                    color: '#6c757d',
                                    fontSize: '14px'
                                }}
                            >
                                Manage library members and system administrators
                            </p>

                        </div>

                        {/* ADD USER BUTTON */}

                        <button
                            onClick={() => {
                                setShowAddForm(!showAddForm);

                                // Clear edit mode when opening a new form
                                if (showAddForm) {
                                    setEditingId(null);
                                    setName('');
                                    setEmail('');
                                    setPassword('');
                                    setRole('Member');
                                }
                            }}
                            style={{
                                backgroundColor: '#0d6efd',
                                color: '#ffffff',
                                border: 'none',
                                borderRadius: '6px',
                                padding: '10px 18px',
                                fontSize: '14px',
                                fontWeight: '500',
                                cursor: 'pointer'
                            }}
                        >
                            {showAddForm ? 'Close Form' : '+ Add User'}
                        </button>

                    </div>


                    {/* ADD / UPDATE USER FORM */}

                    {showAddForm && (
                        <div
                            style={{
                                backgroundColor: '#ffffff',
                                borderRadius: '10px',
                                padding: '20px',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                                border: '1px solid #e9ecef',
                                marginBottom: '25px'
                            }}
                        >

                            <h3
                                style={{
                                    margin: '0 0 15px 0',
                                    fontSize: '16px',
                                    color: '#343a40',
                                    fontWeight: '600'
                                }}
                            >
                                {editingId ? 'Update User' : 'Create New Account'}
                            </h3>

                            <form
                                onSubmit={
                                    editingId
                                        ? handleUpdateUser
                                        : handleAddUser
                                }
                                style={{
                                    display: 'flex',
                                    gap: '15px',
                                    flexWrap: 'wrap'
                                }}
                            >

                                {/* NAME */}

                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    style={{
                                        flex: '1',
                                        minWidth: '180px',
                                        padding: '10px 14px',
                                        borderRadius: '6px',
                                        border: '1px solid #ced4da',
                                        fontSize: '14px'
                                    }}
                                />

                                {/* EMAIL */}

                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    style={{
                                        flex: '1.5',
                                        minWidth: '220px',
                                        padding: '10px 14px',
                                        borderRadius: '6px',
                                        border: '1px solid #ced4da',
                                        fontSize: '14px'
                                    }}
                                />

                                {/* PASSWORD */}

                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    style={{
                                        flex: '1',
                                        minWidth: '180px',
                                        padding: '10px 14px',
                                        borderRadius: '6px',
                                        border: '1px solid #ced4da',
                                        fontSize: '14px'
                                    }}
                                />

                                {/* ROLE */}

                                <select
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    style={{
                                        padding: '10px 14px',
                                        borderRadius: '6px',
                                        border: '1px solid #ced4da',
                                        fontSize: '14px',
                                        backgroundColor: '#fff'
                                    }}
                                >

                                    <option value="Member">
                                        Member
                                    </option>

                                    <option value="Admin">
                                        Admin
                                    </option>

                                </select>

                                {/* SAVE / UPDATE BUTTON */}

                                <button
                                    type="submit"
                                    style={{
                                        backgroundColor: '#198754',
                                        color: '#ffffff',
                                        border: 'none',
                                        borderRadius: '6px',
                                        padding: '10px 20px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {editingId ? 'Update User' : 'Save User'}
                                </button>

                            </form>

                        </div>
                    )}


                    {/* USERS TABLE */}

                    <div
                        style={{
                            backgroundColor: '#ffffff',
                            borderRadius: '10px',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                            border: '1px solid #e9ecef',
                            overflow: 'hidden'
                        }}
                    >

                        <table
                            style={{
                                width: '100%',
                                borderCollapse: 'collapse',
                                textAlign: 'left'
                            }}
                        >

                            <thead>

                                <tr
                                    style={{
                                        backgroundColor: '#f8f9fa',
                                        borderBottom: '2px solid #e9ecef'
                                    }}
                                >

                                    <th style={{ padding: '16px 20px' }}>
                                        ID
                                    </th>

                                    <th style={{ padding: '16px 20px' }}>
                                        Name
                                    </th>

                                    <th style={{ padding: '16px 20px' }}>
                                        Email
                                    </th>

                                    <th style={{ padding: '16px 20px' }}>
                                        Role
                                    </th>

                                    <th style={{ padding: '16px 20px' }}>
                                        Actions
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {users.map((user) => (

                                    <tr key={user.id}>

                                        <td style={{ padding: '16px 20px' }}>
                                            #{user.id}
                                        </td>

                                        <td style={{ padding: '16px 20px' }}>
                                            {user.name}
                                        </td>

                                        <td style={{ padding: '16px 20px' }}>
                                            {user.email}
                                        </td>

                                        <td style={{ padding: '16px 20px' }}>
                                            {user.role}
                                        </td>

                                        <td style={{ padding: '16px 20px' }}>

                                            {/* EDIT BUTTON */}

                                            <button
                                                onClick={() => handleEdit(user)}
                                                style={{
                                                    color: '#0d6efd',
                                                    background: 'transparent',
                                                    border: '1px solid #0d6efd',
                                                    padding: '5px 10px',
                                                    marginRight: '8px',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                Edit
                                            </button>

                                            {/* DELETE BUTTON */}

                                            <button
                                                onClick={() => handleDelete(user.id)}
                                                style={{
                                                    color: '#dc3545',
                                                    background: 'transparent',
                                                    border: '1px solid #dc3545',
                                                    padding: '5px 10px',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                Delete
                                            </button>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>
            )}

        </div>
    );
}

export default Users;