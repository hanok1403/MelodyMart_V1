import React, { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';

const Customers = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("http://localhost:5000/admin/customers");
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                // Filter out users with role 'admin'
                const filteredUsers = data.filter(user => user.role !== 'admin');
                setUsers(filteredUsers);
            } catch (error) {
                setError(error.message);
                console.error("Error fetching data:", error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div>
            <h1>Registered Users</h1>
            {error && <p>Error: {error}</p>}
            <ListGroup>
                {users.map((user, index) => (
                    <ListGroup.Item key={user._id}>
                        {index + 1}. {user.username}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

export default Customers;
