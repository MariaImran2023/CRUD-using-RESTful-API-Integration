import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './home.css';

const Home = () => {
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [updatedName, setUpdatedName] = useState(' ');
    const [updatedEmail, setUpdatedEmail] = useState(' ');
    const [id, setId] = useState(' ');
    const [showDeleteModal, SetshowDeleteModal] = useState(false)
    const [deleteUser, setDeleteUser] = useState(null);


    useEffect(() => {
        axios.get('http://localhost:3030/users')
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, []);

    const openModal = (user) =>
    {
        setSelectedUser(user)
        setUpdatedName(user.name)
        setUpdatedEmail(user.email)
        setId(user.id)
        setShowModal(true)
    }

    const closeModal = () =>
    {
        setSelectedUser(null)
        setShowModal(false)
    }

    const handleUpdate = (e) =>
    {
        e.preventDefault()
        axios.put( `http://localhost:3030/users/${selectedUser.id}`, {name: updatedName, email: updatedEmail}) //the object keys for the updated user data should match the expected format in your backend. thats why name and email is written
        .then(res => {
            const updatedData = data.map(user => 
                user.id === selectedUser.id ? res.data : user
            );
            setData(updatedData);
            closeModal();
        })
        .catch(err => console.log(err));
    }

    const openDeleteModal = (user_id) =>
    {
        setDeleteUser(user_id)
        SetshowDeleteModal(true)
    }

    const closeDeleteModal = () =>
    {
        setDeleteUser(null);
        SetshowDeleteModal(false)
    }

    const handleDelete = () =>
    {
        axios.delete(`http://localhost:3030/users/${deleteUser}`)
        .then(res => {
            setData(data.filter(user => user.id !== deleteUser));
            SetshowDeleteModal(false)
        })
    }

    return (
        <div className="wrapper">
            <div className="container">
                <h2 className='text-center mb-4' style={{ color: 'white', marginTop: '20px', fontWeight: 'bold' }}>Users List</h2>
                <Link to={"/create"} className="btn btn-primary" style={{ marginBottom: "20px" }}>Add a New User</Link>
                <table className='table table-striped table-bordered'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((d, i) => (
                            <tr key={i}>
                                <td>{d.id}</td>
                                <td>{d.name}</td>
                                <td>{d.email}</td>
                                <td>
                                    <Link to={`/view/${d.id}`} className='btn btn-primary button'>View</Link>
                                    <button className='btn btn-success button' onClick={() => openModal(d)}>Update</button>
                                    <button className='btn btn-danger button' onClick={() => openDeleteModal(d.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && selectedUser && (
                <div className="modal show" tabIndex="-1" style={{ display: 'block' }} data-bs-backdrop="static">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Update User Info</h5>
                            </div>
                            <div className="modal-body">
                               <div className="mb-3">
                                    <label htmlFor="ID" className="form-label">ID</label>
                                    <input type="text" disabled={true} className="form-control" id="ID" value={id} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="updateName" className="form-label">Name</label>
                                    <input type="text" className="form-control" id="updateName" value={updatedName} onChange={(e) => setUpdatedName(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="updateEmail" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="updateEmail" value={updatedEmail} onChange={(e) => setUpdatedEmail(e.target.value)} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                                <button type="button" className="btn btn-success" onClick={handleUpdate}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showDeleteModal && deleteUser && (
                <div className="modal" tabIndex="-1" style={{ display: 'block' }} data-bs-backdrop="static">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Confirm Deletion</h5>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={closeDeleteModal}>Close</button>
                      <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete this User</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
        </div>
    );
};

export default Home;
