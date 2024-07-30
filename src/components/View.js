import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';

const View = () => {
    let navigate = useNavigate()
    const {id} = useParams()
    const [user, setUser] = useState(null)

    useEffect(() => {
        axios.get(`http://localhost:3030/users/${id}`)
        .then(res => setUser(res.data))
        .catch(err => console.log(err))
    }, [id])

    if (!user) {
        return <div>Loading...</div>;
    }
    

  return (
    <div style={{ backgroundColor: "#205934", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="container mt-5" >
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-body p-4">
                            <h3 className="card-title text-center mb-4" style={{color: "#205934", fontWeight: "bold"}}>User Details</h3>
                            <h5>ID</h5>
                            <div style={{width: '100%', color: 'white', backgroundColor: '#205934', marginBottom: '20px', padding: '10px 20px', borderRadius: '10px'}}>{user.id}</div>
                            <h5>Name</h5>
                            <div style={{width: '100%', color: 'white', backgroundColor: '#205934', marginBottom: '20px', padding: '10px 20px', borderRadius: '10px'}}>{user.name}</div>
                            <h5>Email Address</h5>
                            <div style={{width: '100%', color: 'white', backgroundColor: '#205934', marginBottom: '20px', padding: '10px 20px', borderRadius: '10px'}}>{user.email}</div>
                            <div className="d-flex justify-content-center">
                                <button className="btn btn-danger" onClick={() => navigate('/')}>Back to Users List</button>
                            </div>                        
                        </div>
                    </div>
                </div> 
            </div>
        </div>
    </div>
  )
}

export default View
