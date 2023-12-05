import React, {useState} from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
    const[credentials,setCredentials] = useState({name:"",email:"",password:"",geolocation:""})

    const handleSubmit = async(e)=> {
        e.preventDefault();
        const response = fetch("http://localhost:8000/api/signup",{
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify({name:credentials.name, email:credentials.email, password:credentials.password, location:credentials.geolocation})
        });
        const json = (await response).json()
        console.log(json)
        if(!json.success){
            alert("enter valid credentials")
        }
        else{
            alert("success")
        }
    }

    const onChange = (event)=> {
        setCredentials({...credentials,[event.target.name]:event.target.value})
    }

    return (
        <>
            <div className='container'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">userName</label>
                        <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input name='email' value={credentials.email} onChange={onChange} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input name='password' value={credentials.password} onChange={onChange} type="password" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
                        <input name='geolocation' value={credentials.geolocation} onChange={onChange} type="text" className="form-control" id="exampleInputAddress1" />
                    </div>
                    <button type="submit" className="btn btn-success">Register</button>
                    <Link to="/login" className='m-3 btn btn-danger'>Already a user?</Link>
                </form>
            </div>
        </>
    )
}

export default Signup