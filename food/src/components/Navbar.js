import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';


const Navbar = (props) => {
  let data = useCart()
  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken")
    navigate("/login")
  }
  const loadCart = () => {
    setCartView(true)
  }

  const items = useCart();
  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-success">
          <div className="container-fluid">
            <Link className="navbar-brand fs-1 fst-italic" to="/">FoodBar</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto mb-1">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                </li>
                {
                  (localStorage.getItem("authToken"))
                    ?
                    <div className='d-flex'>
                      <li className='nav-item'><Link className='nav-link active fs-5' aria-current="page" to="/myorder">My Orders</Link></li>
                      <li className='nav-item'><Link className='btn bg-white text-success mx-2' onClick={loadCart}>My Cart <Badge pill bg='danger'>{data.length}</Badge></Link></li>
                      {cartView ? <Modal onClose={() => setCartView(false)}><Cart></Cart></Modal> : ""}
                      <li className='nav-item'><div className='btn bg-white text-success mx-2' onClick={handleLogout}>Logout</div></li>
                    </div>
                    :
                    <div className='d-flex'>
                      <li className='nav-item'><Link className="btn bg-white text-success mx-1" to="/login">Login</Link></li>
                      <li className='nav-item'><Link className="btn bg-white text-success mx-1" to="/signup">Signup</Link></li>
                    </div>
                }
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}

export default Navbar