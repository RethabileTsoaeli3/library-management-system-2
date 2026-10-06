import React, {useState} from "react";

function Dashboard() {

    const [books, setBooks] = useState(() => {
    try {
        const savedBooks = localStorage.getItem('books');

        return savedBooks
            ? JSON.parse(savedBooks)
            : [];
    } catch (error) {
        console.error('Error loading books:', error);
        return [];
    }
});

    const stats = {
        totalBooks: 100,
        availableBooks: 70,
        borrowedBooks: 25,
        totalUsers: 40
    };

    const recentActivities = [
        {id: 1, user: 'Mahlajoane', book: 'The Crooked Path', action: 'Borrowed', date: '20-08-2025'},
        {id: 2, user: 'Rosy', book: 'The Power of Positive Thinking', action: 'Returned', date: '13-08-2026'},
        {id: 3, user: 'Thabo', book: 'Pride and Prejudice', action: 'Borrowed', date: '30-09-2027'}
    ];

    const cardStyle = {
        border: '1px solid #ddd',
        borderRadius: '10px',
        padding: '20px',
        backgroundColor: '#fff',
        textAlign: 'center',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    };

    const numberStyle = {
        fontSize: '30px',
        fontWeight: 'bold',
        margin: '10px 0'
    };

    const tableCell = {
        border: '1px solid #ddd',
        padding: '12px',
        textAlign: 'left'
    };

    return (
        <div
            style={{
                width: '100%',
                maxWidth: '1100px',
                margin: '0 auto',
                fontFamily: 'Arial, sans-serif',
                boxSizing: 'border-box'
            }}>

            {/* Dashboard Heading */}

            <h1>Library Management Dashboard</h1>

            <p style={{ marginBottom: '30px' }}>
                Welcome to Library Management System
            </p>

            {/* STATISTICS */}
          

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns:
                        'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '20px',
                    marginBottom: '35px'
                }}>

                {/* Total Books */}

                <div style={cardStyle}>

                    <h3>Total Books</h3>

                    <p style={numberStyle}>
                        {stats.totalBooks}
                    </p>

                    <p>
                        Books crrently in library
                    </p>

                </div>


                {/* Available Books */}

                <div
                    style={{
                        ...cardStyle,
                        borderTop: '4px solid #664caf'
                    }}>

                    <h3>Available Books</h3>

                    <p
                        style={{
                            ...numberStyle,
                            color: '#574caf'
                        }}
                    >
                        {stats.availableBooks}
                    </p>

                    <p>
                        Ready to borrow
                    </p>

                </div>


                {/* Borrowed Books */}

                <div
                    style={{
                        ...cardStyle,
                        borderTop: '4px solid #f436b8'
                    }}>

                    <h3>Borrowed Books</h3>

                    <p
                        style={{
                            ...numberStyle,
                            color: '#f436d1'
                        }}>
                        {stats.borrowedBooks}
                    </p>

                    <p>
                        Currently borrowed
                    </p>

                </div>


                {/* Total Users */}

                <div
                    style={{
                        ...cardStyle,
                        borderTop: '4px solid #2196F3'
                    }}>

                    <h3>Total Users</h3>

                    <p
                        style={{
                            ...numberStyle,
                            color: '#2196F3'
                        }}>
                        {stats.totalUsers}
                    </p>

                    <p>
                        Registered users
                    </p>

                </div>

            </div>

            {/* LIBRARY OVERVIEW */}
           

            <h2>Library Overview</h2>

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns:
                        'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '20px',
                    marginBottom: '35px'
                }}>

                {/* Books Overview */}

                <div style={cardStyle}>

                    <h3>Books</h3>

                    <p>
                        <strong>{stats.totalBooks}</strong> total books
                    </p>

                    <p>
                        <strong>{stats.availableBooks}</strong> available
                    </p>

                    <p>
                        <strong>{stats.borrowedBooks}</strong> borrowed
                    </p>

                </div>


                {/* Users Overview */}

                <div style={cardStyle}>

                    <h3>Users</h3>

                    <p>
                        <strong>{stats.totalUsers}</strong>
                        {' '}registered users
                    </p>

                    <p>
                        Members can borrow and return books,
                        for a given period of time.
                    </p>

                </div>


                {/* Transactions Overview */}

                <div style={cardStyle}>

                    <h3>Transactions</h3>

                    <p>
                        <strong>{stats.borrowedBooks}</strong>
                        {' '}active borrowed books
                    </p>

                    <p>
                        Manage borrowing and returns from the
                        Transactions page.
                    </p>

                </div>

            </div>

            {/* CURRENT BOOK AVAILABILITY */}
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
    <h2
        style={{
            margin: '0 0 15px 0',
            fontSize: '20px',
            color: '#343a40'
        }}
    >
        Current Book Availability
    </h2>

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
                <th style={{ padding: '14px' }}>
                    Book
                </th>

                <th style={{ padding: '14px' }}>
                    Author
                </th>

                <th style={{ padding: '14px' }}>
                    Available Copies
                </th>

                <th style={{ padding: '14px' }}>
                    Status
                </th>
            </tr>
        </thead>

        <tbody>
            {books.map((book) => {

                const lowStock = book.stock < 2;

                return (
                    <tr
                        key={book.id}
                        style={{
                            borderBottom: '1px solid #e9ecef',

                            // Highlight low-stock books
                            backgroundColor: lowStock
                                ? '#f8bec3'
                                : 'transparent'
                        }}
                    >
                        <td style={{ padding: '14px' }}>
                            {book.title}
                        </td>

                        <td style={{ padding: '14px' }}>
                            {book.author}
                        </td>

                        <td
                            style={{
                                padding: '14px',
                                fontWeight: '600'
                            }}
                        >
                            {book.stock}
                        </td>

                        <td style={{ padding: '14px' }}>
                            {lowStock ? (
                                <span
                                    style={{
                                        color: '#856404',
                                        fontWeight: '600'
                                    }}
                                >
                                    ⚠ Low Stock
                                </span>
                            ) : (
                                <span
                                    style={{
                                        color: '#198754',
                                        fontWeight: '600'
                                    }}
                                >
                                    Available
                                </span>
                            )}
                        </td>
                    </tr>
                );
            })}

            {books.length === 0 && (
                <tr>
                    <td
                        colSpan="4"
                        style={{
                            padding: '30px',
                            textAlign: 'center',
                            color: '#6c757d'
                        }}>
                    
                        No books available.
                    </td>
                </tr>
            )}
        </tbody>
    </table>
</div>

            {/* RECENT ACTIVITIES */}

            <h2>Recent Activities</h2>

            <div
                style={{
                    width: '100%',
                    overflowX: 'auto'
                }}>

                <table
                    style={{
                        width: '100%',
                        minWidth: '650px',
                        borderCollapse: 'collapse',
                        backgroundColor: '#fff'
                    }}>

                    <thead>

                        <tr>

                            <th style={tableCell}>
                                User
                            </th>

                            <th style={tableCell}>
                                Book
                            </th>

                            <th style={tableCell}>
                                Action
                            </th>

                            <th style={tableCell}>
                                Date
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {recentActivities.map((activity) => (

                            <tr key={activity.id}>

                                <td style={tableCell}>
                                    {activity.user}
                                </td>

                                <td style={tableCell}>
                                    {activity.book}
                                </td>

                                <td style={tableCell}>
                                    {activity.action}
                                </td>

                                <td style={tableCell}>
                                    {activity.date}
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default Dashboard;