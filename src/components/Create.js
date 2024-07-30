import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    let navigate = useNavigate()

    const handleClick = (e) =>
    {
        e.preventDefault();
        axios.post('http://localhost:3030/users', {name, email})
        .then(res => {
            setEmail(" ")
            setName(" ")
            alert('Data Posted Successfully')
            navigate('/')
        })
    }
    
  return (
    <div style={{ backgroundColor: "#205934", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="container mt-5" >
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-body p-4">
                            <h3 className="card-title text-center mb-4" style={{color: "#205934", fontWeight: "bold"}}>Add a New User</h3>
                            <form className="login-form" onSubmit={handleClick}>
                                <div className="form-group mb-3">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" className="form-control" id="name" placeholder="Enter name" autoComplete="username" onChange={(e) => setName(e.target.value)}  />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="email">Email address</label>
                                    <input type="email" className="form-control" id="email" placeholder="Enter email" autoComplete="username" onChange={(e) => setEmail(e.target.value)} />
                                </div>
                               
                                <button type="submit" className="btn w-100 mb-3" style={{backgroundColor: "#205934", color: "white"}}>
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div> 
            </div>
        </div>
    </div>
  )
}

export default Login
