import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify({ email: credentials.email, password: credentials.password }))
    const response = await fetch("http://localhost:8000/api/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const jason = await response.json()
    console.log(jason.success)
    if (!jason.success) {
      alert("enter valid credentials")
    }
    else {
      localStorage.setItem("userEmail",credentials.email);
      localStorage.setItem("authToken",jason.authToken)
      console.log(localStorage.getItem("authToken"))
      navigate("/")
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <>
      <div className='container'>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input name='email' value={credentials.email} onChange={onChange} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input name='password' value={credentials.password} onChange={onChange} type="password" className="form-control" id="exampleInputPassword1" />
          </div>
          <button type="submit" className="btn btn-success">Login</button>
          <Link to="/signup" className='m-3 btn btn-danger'>New user?</Link>
        </form>
      </div>
    </>
  )
}

export default Login