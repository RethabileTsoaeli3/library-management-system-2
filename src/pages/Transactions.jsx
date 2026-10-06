import React, { useState } from 'react';

function Transactions() {
    // Get Books From Local Storage
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
console.log('Books in Transactions:', books);

    // Transactions
const [transactions, setTransactions] = useState(() => {
const savedTransactions =localStorage.getItem('transactions');

        return savedTransactions
            ? JSON.parse(savedTransactions)
            : [];
    });

    // Form values
const [user, setUser] = useState('');
const [selectedBook, setSelectedBook] = useState('');
const [action, setAction] = useState('Borrowed');


    // SAVE BOOKS
const saveBooks = (updatedBooks) => {
setBooks(updatedBooks);

        localStorage.setItem(
            'books',
            JSON.stringify(updatedBooks)
        );
    };

    // SAVE TRANSACTIONs
const saveTransactions = (updatedTransactions) => {
setTransactions(updatedTransactions);

        localStorage.setItem(
            'transactions',
            JSON.stringify(updatedTransactions)
        );
    };

    // HANDLE TRANSACTION
const handleTransaction = (e) => {
e.preventDefault();

        if (!user || !selectedBook) {
            alert('Please select a user and a book.');
            return;
        }


        // Find selected book

const book = books.find(
book => book.id === Number(selectedBook)
        );
        if (!book) {
            alert('Book not found.');
            return;
        }

        // BORROW BOOK
if (action === 'Borrowed') {
// Check stock
    if (book.stock <= 0) {
        alert('This book is currently out of stock.');
        return;
            }

// Decrease stock
const updatedBooks = books.map(bookItem => {
    if (bookItem.id === book.id) {
        const newStock = bookItem.stock - 1;
        return {...bookItem,stock: newStock,status: newStock > 0? 'Available': 'Out of Stock'
                    };
                }return bookItem;
            });
            saveBooks(updatedBooks);

        }

        // RETURN BOOK

        if (action === 'Returned') {
            // Increase stock
            const updatedBooks = books.map(bookItem => {
                if (bookItem.id === book.id) {
                    const newStock = bookItem.stock + 1;

                    return {...bookItem,stock: newStock,status: 'Available'};
                }return bookItem;
            });
            saveBooks(updatedBooks);
        }

        // CREATE TRANSACTION

        const newTransaction = {id: Date.now(),user: user,book: book.title,action: action,date: new Date().toISOString().split('T')[0]
        };
        const updatedTransactions = [...transactions,newTransaction];
        saveTransactions(updatedTransactions);


        // Clear form
        setUser('');
        setSelectedBook('');
        setAction('Borrowed');
    };


    return (
    <div style={{maxWidth: '1200px',margin: '0 auto',width: '100%'}}>

            {/* HEADER */}
             <div style={{marginBottom: '25px',textAlign: 'left'}}>
                <h1 style={{
                        margin: 0,
                        fontSize: '28px',
                        color: '#1a1d20',
                        fontWeight: '600'
                    }}>
                    Transactions
                </h1>

                <p style={{
                        margin: '6px 0 0',
                        color: '#6c757d',
                        fontSize: '14px'
                    }}>
                    Borrow and return books and manage library transactions
                </p>

            </div>

            {/* TRANSACTION FORM */}
            <div
                style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '10px',
                    padding: '20px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                    border: '1px solid #e9ecef',
                    marginBottom: '25px'
                }} >

                <h3
                    style={{
                        margin: '0 0 15px 0',
                        fontSize: '16px',
                        color: '#343a40'
                    }}>
                    New Transaction
                </h3>
                
                <form
                    onSubmit={handleTransaction}
                    style={{
                        display: 'flex',
                        gap: '15px',
                        flexWrap: 'wrap'
                    }}>

                    {/* USER */}

                    <input
                        type="text"
                        placeholder="Enter User Name"
                        value={user}
                        onChange={(e) =>
                            setUser(e.target.value)
                        }
                        style={{
                            padding: '10px 14px',
                            borderRadius: '6px',
                            border: '1px solid #ced4da',
                            fontSize: '14px',
                            minWidth: '200px'
                        }}/>


                    {/* BOOK */}

                    <select
                        value={selectedBook}
                        onChange={(e) =>
                            setSelectedBook(e.target.value)
                        }
                        style={{
                            padding: '10px 14px',
                            borderRadius: '6px',
                            border: '1px solid #ced4da',
                            fontSize: '14px',
                            minWidth: '250px'
                        }}>

                        <option value="">
                            Select Book
                        </option>

                        {books.map(book => (

                            <option
                                key={book.id}
                                value={book.id}>
                                {book.title} — Stock: {book.stock}
                            </option>

                        ))}

                    </select>
                    
                    {/* ACTION */}

                    <select value={action}
                        onChange={(e) =>
                            setAction(e.target.value)
                        }
                        style={{
                            padding: '10px 14px',
                            borderRadius: '6px',
                            border: '1px solid #ced4da',
                            fontSize: '14px'
                        }}>

                        <option value="Borrowed">
                            Borrow Book
                        </option>

                        <option value="Returned">
                            Return Book
                        </option>
                        </select>


                    {/* BUTTON */}

                    <button
                        type="submit"
                        style={{
                            backgroundColor: '#0d6efd',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '10px 20px',
                            fontSize: '14px',
                            fontWeight: '500',
                            cursor: 'pointer'
                        }}>
                        Save Transaction
                    </button>
                    </form>
                    </div>


            {/* TRANSACTIONS TABLE */}
            <div
                style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '10px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                    border: '1px solid #e9ecef',
                    overflowX: 'auto'
                }}>

                <table
                    style={{
                        width: '100%',
                        minWidth: '700px',
                        borderCollapse: 'collapse',
                        textAlign: 'left'
                        }}>

                    <thead>

                        <tr
                            style={{
                                backgroundColor: '#f8f9fa',
                                borderBottom: '2px solid #e9ecef',
                                color: '#495057',
                                fontSize: '13px'
                            }}>

                            <th style={{ padding: '16px 20px' }}>
                                ID
                            </th>

                            <th style={{ padding: '16px 20px' }}>
                                User
                            </th>

                            <th style={{ padding: '16px 20px' }}>
                                Book
                            </th>

                            <th style={{ padding: '16px 20px' }}>
                                Action
                            </th>

                            <th style={{ padding: '16px 20px' }}>
                                Date
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        {transactions.map((tx, index) => (

                            <tr
                                key={tx.id}
                                style={{
                                    borderBottom:
                                        index === transactions.length - 1
                                            ? 'none'
                                            : '1px solid #e9ecef'
                                }}>

                                <td
                                    style={{
                                        padding: '16px 20px'
                                    }}>
                                    #{tx.id}
                                </td>


                                <td
                                    style={{
                                        padding: '16px 20px',
                                        fontWeight: '500'
                                    }}>
                                    {tx.user}
                                </td>


                                <td
                                    style={{
                                        padding: '16px 20px'
                                    }}>
                                    {tx.book}
                                </td>


                                <td
                                    style={{
                                        padding: '16px 20px'
                                    }}>

                                    <span
                                        style={{
                                            padding: '6px 12px',
                                            borderRadius: '20px',
                                            fontSize: '12px',
                                            fontWeight: '600',
                                            backgroundColor:
                                                tx.action === 'Returned'
                                                    ? '#e6f4ea'
                                                    : '#e8f0fe',
                                            color:
                                                tx.action === 'Returned'
                                                    ? '#137333'
                                                    : '#1a73e8'
                                        }}>
                                        {tx.action}
                                    </span>

                                </td>


                                <td
                                    style={{
                                        padding: '16px 20px',
                                        color: '#6c757d'
                                    }}>
                                    {tx.date}
                                </td>

                            </tr>

                        ))}


                        {transactions.length === 0 && (

                            <tr>
                                <td
                                    colSpan="5"
                                    style={{
                                        padding: '30px',
                                        textAlign: 'center',
                                        color: '#6c757d'
                                    }}>
                                    No transactions yet.
                                </td>
                                </tr>

                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default Transactions;