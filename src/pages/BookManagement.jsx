import React, { useEffect,useState } from 'react';

function BookManagement() {

    const defaultBooks = [
        {id: 1,title: 'The monk who sold his ferrari',author: 'Rethabile.T',genre: 'Fiction',isbn: '978-80499373',initialQuantity: 5,stock: 5,status: 'Available'},
        {id: 2,title: 'The Richest Man in Babylon',author: 'Baatile.M',genre: 'Finance',isbn: '978-69769658',initialQuantity: 3,stock: 2,status: 'Available'},
    ];

  const [books, setBooks] = useState(() => {
    try {
        const savedBooks = localStorage.getItem('books');

        return savedBooks
            ? JSON.parse(savedBooks)
            : defaultBooks;
    } catch (error) {
        console.error('Error loading books:', error);
        return defaultBooks;
    }
});

    // New book input values
    const [newTitle, setNewTitle] = useState('');
    const [newAuthor, setNewAuthor] = useState('');
    const [newGenre, setNewGenre] = useState('');
    const [newIsbn, setNewIsbn] = useState('');
    const [newQuantity, setNewQuantity] = useState('');

    // Editing
    const [editingId, setEditingId] = useState(null);

    // Edit input values
    const [editTitle, setEditTitle] = useState('');
    const [editAuthor, setEditAuthor] = useState('');
    const [editGenre, setEditGenre] = useState('');
    const [editIsbn, setEditIsbn] = useState('');

    // Add Stock
    const [stockAmount, setStockAmount] = useState('');
    const [stockBookId, setStockBookId] = useState(null);

    // Save books to localStorage
    useEffect(() => {
        localStorage.setItem('books', JSON.stringify(books));
    }, [books]);

    // ADD NEW BOOK

    const handleAddBook = (e) => {

        e.preventDefault();

        if (
            !newTitle ||
            !newAuthor ||
            !newGenre ||
            !newIsbn ||
            !newQuantity
        ) {
            return;
        }

        const quantity = Number(newQuantity);
        if (quantity <= 0) {
            return;
        }

        const newBookObj = {id: Date.now(),title: newTitle,author: newAuthor,genre: newGenre,isbn: newIsbn,initialQuantity: quantity,stock: quantity,status: 'Available'};

        setBooks([...books, newBookObj]);

        // Clear form
        setNewTitle('');
        setNewAuthor('');
        setNewGenre('');
        setNewIsbn('');
        setNewQuantity('');
    };

    // DELETE BOOK
    const handleDelete = (id) => {

        setBooks(
            books.filter(book => book.id !== id)
        );
    };

    // EDIT

    const handleEdit = (book) => {

        setEditingId(book.id);

        setEditTitle(book.title);
        setEditAuthor(book.author);
        setEditGenre(book.genre);
        setEditIsbn(book.isbn);
    };

    // SAVE EDITED BOOKS
   

    const handleSaveEdit = (id) => {

        setBooks(
            books.map(book => {
                if (book.id === id) {

                    return {
                        ...book,
                        title: editTitle,
                        author: editAuthor,
                        genre: editGenre,
                        isbn: editIsbn
                    };
                } 
                return book;
            })
        );
        setEditingId(null);
    };

    // Add Stock
    const handleAddStock = (id) => {

        const amount = Number(stockAmount);

        if (!amount || amount <= 0) {
            return;
        }

        setBooks(
            books.map(book => {
                 if (book.id === id) {
                     const newStock = book.stock + amount;

                    return {
                        ...book,
                        stock: newStock,
                        status: newStock > 0
                            ? 'Available'
                            : 'Borrowed'
                    };
                }
                 return book;
            })
        );
        setStockAmount('');
        setStockBookId(null);
    };

    return (
    <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                width: '100%'
            }}>

            {/*Header*/}

            <div
                style={{
                    marginBottom: '25px',
                    textAlign: 'left'
                }}>

                <h1 style={{
                        margin: 0,
                        fontSize: '28px',
                        color: '#1a1d20',
                        fontWeight: '600'
                    }}>
                    Book Management
                </h1>

                <p style={{
                        margin: '6px 0 0',
                        color: '#6c757d',
                        fontSize: '14px'
                    }}>
                    Add, edit, and manage library inventory items
                </p>
                </div>

            {/* Add Book Form */}

            <div style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '10px',
                    padding: '20px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                    border: '1px solid #e9ecef',
                    marginBottom: '25px'
                }}>

                <h3 style={{
                        margin: '0 0 15px 0',
                        fontSize: '16px',
                        color: '#343a40',
                        fontWeight: '600'
                    }}>
                     Add New Book
                </h3>

                <form
                    onSubmit={handleAddBook}
                    style={{
                        display: 'flex',
                        gap: '15px',
                        flexWrap: 'wrap'
                    }}>

                    {/* Title */}
                    <input
                        type="text"
                        placeholder="Book Title"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        style={{
                            flex: '2',
                            minWidth: '180px',
                            padding: '10px 14px',
                            borderRadius: '6px',
                            border: '1px solid #ced4da',
                            fontSize: '14px',
                            outline: 'none'
                        }}/>

                    {/* Author */}
                     <input
                        type="text"
                        placeholder="Author"
                        value={newAuthor}
                        onChange={(e) => setNewAuthor(e.target.value)}
                        style={{
                            flex: '1',
                            minWidth: '150px',
                            padding: '10px 14px',
                            borderRadius: '6px',
                            border: '1px solid #ced4da',
                            fontSize: '14px',
                            outline: 'none'
                        }}/>


                    {/* Genre */}
                    <input
                        type="text"
                        placeholder="Genre"
                        value={newGenre}
                        onChange={(e) => setNewGenre(e.target.value)}
                        style={{
                            flex: '1',
                            minWidth: '140px',
                            padding: '10px 14px',
                            borderRadius: '6px',
                            border: '1px solid #ced4da',
                            fontSize: '14px',
                            outline: 'none'
                        }}/>


                    {/* ISBN */}
                    <input
                        type="text"
                        placeholder="ISBN"
                        value={newIsbn}
                        onChange={(e) => setNewIsbn(e.target.value)}
                        style={{
                            flex: '1',
                            minWidth: '150px',
                            padding: '10px 14px',
                            borderRadius: '6px',
                            border: '1px solid #ced4da',
                            fontSize: '14px',
                            outline: 'none'
                        }}/>


                    {/* Initial Quantity */}
                    <input
                        type="number"
                        min="1"
                        placeholder="Initial Quantity"
                        value={newQuantity}
                        onChange={(e) => setNewQuantity(e.target.value)}
                        style={{
                            flex: '1',
                            minWidth: '140px',
                            padding: '10px 14px',
                            borderRadius: '6px',
                            border: '1px solid #ced4da',
                            fontSize: '14px',
                            outline: 'none'
                        }}/>
                    {/* Add Button */}
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
                        + Add Book
                    </button>
                    </form>
                </div>


            {/* Book Table*/}
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
                        minWidth: '1000px',
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
                                Title
                            </th>

                            <th style={{ padding: '16px 20px' }}>
                                Author
                            </th>

                            <th style={{ padding: '16px 20px' }}>
                                Genre
                            </th>

                            <th style={{ padding: '16px 20px' }}>
                                ISBN
                            </th>

                            <th style={{ padding: '16px 20px' }}>
                                Initial Qty
                            </th>

                            <th style={{ padding: '16px 20px' }}>
                                Stock
                            </th>

                            <th style={{ padding: '16px 20px' }}>
                                Status
                            </th>

                            <th style={{ padding: '16px 20px' }}>
                                Actions
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        {books.map((book, index) => (

                            <React.Fragment key={book.id}>

                                <tr
                                    style={{
                                        borderBottom:
                                            index === books.length - 1
                                                ? 'none'
                                                : '1px solid #e9ecef'
                                    }}>

                                    {/* TITLE */}
                                    <td style={{ padding: '16px 20px' }}>

                                        {editingId === book.id ? (

                                            <input
                                                value={editTitle}
                                                onChange={(e) =>
                                                    setEditTitle(e.target.value)
                                                }/>

                                        ) : (
                                            book.title
                                        )}
                                        </td>


                                    {/* AUTHOR */}
                                    <td style={{ padding: '16px 20px' }}>

                                        {editingId === book.id ? (

                                            <input
                                                value={editAuthor}
                                                onChange={(e) =>
                                                    setEditAuthor(e.target.value)
                                                }/>

                                        ) : (
                                            book.author
                                        )}
                                        </td>


                                    {/* GENRE */}
                                    <td style={{ padding: '16px 20px' }}>

                                        {editingId === book.id ? (

                                            <input
                                                value={editGenre}
                                                onChange={(e) =>
                                                    setEditGenre(e.target.value)
                                                }/>

                                        ) : (
                                            book.genre
                                        )}
                                        </td>


                                    {/* ISBN */}
                                    <td style={{ padding: '16px 20px' }}>

                                        {editingId === book.id ? (

                                            <input
                                                value={editIsbn}
                                                onChange={(e) =>
                                                    setEditIsbn(e.target.value)
                                                }/>

                                        ) : (
                                            book.isbn
                                        )}
                                        </td>


                                    {/* INITIAL QUANTITY */}

                                    <td style={{ padding: '16px 20px' }}>
                                        {book.initialQuantity}
                                    </td>


                                    {/* CURRENT STOCK */}
                                    <td
                                        style={{
                                            padding: '16px 20px',
                                            fontWeight: '600'
                                        }}>
                                        {book.stock}
                                    </td>


                                    {/* STATUS */}

                                    <td style={{ padding: '16px 20px' }}>

                                        <span
                                            style={{
                                                padding: '6px 12px',
                                                borderRadius: '20px',
                                                fontSize: '12px',
                                                fontWeight: '600',
                                                display: 'inline-block',

                                                backgroundColor:
                                                    book.stock > 0
                                                        ? '#e6f4ea'
                                                        : '#fce8e6',

                                                color:
                                                    book.stock > 0
                                                        ? '#137333'
                                                        : '#c5221f'
                                            }}>
                                            {book.stock > 0
                                                ? 'Available'
                                                : 'Out of Stock'}
                                        </span>
                                        </td>


                                    {/* ACTIONS */}

                                    <td
                                        style={{
                                            padding: '16px 20px',
                                            whiteSpace: 'nowrap'
                                        }}>

                                        {editingId === book.id ? (
                                             <button
                                                onClick={() =>
                                                    handleSaveEdit(book.id)
                                                }
                                                style={{
                                                    marginRight: '8px',
                                                    cursor: 'pointer'
                                                }}>
                                                Save
                                            </button>

                                        ) : (

                                            <button
                                                onClick={() =>
                                                    handleEdit(book)
                                                }
                                                style={{
                                                    marginRight: '8px',
                                                    cursor: 'pointer'
                                                }}>
                                                Edit
                                            </button>)}


                                        <button
                                            onClick={() =>
                                                handleDelete(book.id)
                                            }
                                            style={{
                                                marginRight: '8px',
                                                cursor: 'pointer'
                                            }}>
                                            Delete
                                        </button>


                                        <button
                                            onClick={() => {
                                                setStockBookId(book.id);
                                                setStockAmount('');
                                            }}
                                            style={{
                                                cursor: 'pointer'
                                            }}>
                                            Add Stock
                                        </button>
                                    </td>
                                </tr>

                                {/* ADD STOCK ROW */}

                                {stockBookId === book.id && (
                                    <tr>
                                        <td
                                            colSpan="8"
                                            style={{
                                                padding: '15px 20px',
                                                backgroundColor: '#f8f9fa'
                                            }}>

                                            <input
                                                type="number"
                                                min="1"
                                                placeholder="Enter quantity"
                                                value={stockAmount}
                                                onChange={(e) =>
                                                    setStockAmount(e.target.value)
                                                }
                                                style={{
                                                    padding: '8px',
                                                    marginRight: '10px'
                                                }}/>


                                            <button
                                                onClick={() =>
                                                    handleAddStock(book.id)
                                                }
                                                style={{
                                                    padding: '8px 12px',
                                                    marginRight: '8px',
                                                    cursor: 'pointer'
                                                }}>
                                                Add Stock
                                            </button>


                                            <button
                                                onClick={() =>
                                                    setStockBookId(null)
                                                }
                                                style={{
                                                    padding: '8px 12px',
                                                    cursor: 'pointer'
                                                }}>
                                                Cancel
                                            </button>
                                            </td>
                                        </tr>
                                )}

                            </React.Fragment>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default BookManagement;
