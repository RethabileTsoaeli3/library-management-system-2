import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';

import Login from './components/Login';
import Dashboard from './pages/Dashboard';
import BookManagement from './pages/BookManagement';
import Transactions from './pages/Transactions';
import UserManagement from './pages/UserManagement';

function App() {

    return (
        <BrowserRouter>

            <Routes>

                {/* Login Page */}
                <Route
                    path="/login"
                    element={<Login />}
                />

                {/* Dashboard */}
                <Route
                    path="/"
                    element={
                        <Layout>
                            <Dashboard />
                        </Layout>
                    }
                />

                {/* Books */}
                <Route
                    path="/books"
                    element={
                        <Layout>
                            <BookManagement />
                        </Layout>
                    }
                />

                {/* Transactions */}
                <Route
                    path="/transactions"
                    element={
                        <Layout>
                            <Transactions />
                        </Layout>
                    }
                />

                {/* Users */}
                <Route
                    path="/users"
                    element={
                        <Layout>
                            <UserManagement />
                        </Layout>
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;