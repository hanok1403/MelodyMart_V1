import React, { useState, useEffect } from 'react';
import { ListGroup, Button, Modal } from 'react-bootstrap';

const Customers = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
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

    const handleShowModal = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setSelectedUser(null);
        setShowModal(false);
    };

    return (
        <div>
            <h1>Registered Users</h1>
            {error && <p>Error: {error}</p>}
            <ListGroup>
                {users.map((user, index) => (
                    <ListGroup.Item key={user._id} className="d-flex justify-content-between align-items-center">
                        <span>{index + 1}. {user.username}</span>
                        <Button variant="info" onClick={() => handleShowModal(user)}>Details</Button>
                    </ListGroup.Item>
                ))}
            </ListGroup>

            {selectedUser && (
                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Customer Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p><strong>Username:</strong> {selectedUser.username}</p>
                        <p><strong>Email:</strong> {selectedUser.email}</p>
                        <p><strong>Role:</strong> {selectedUser.role}</p>
                        <p><strong>Orders:</strong> {selectedUser.orders}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};

export default Customers;
