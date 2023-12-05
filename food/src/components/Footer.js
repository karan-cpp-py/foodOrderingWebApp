import React from 'react'

const Footer = () => {
  return (
    <div>
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div className="col-md-4 d-flex align-items-center">
          <span className="text-muted">© 2023 FooBar</span>
        </div>

        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex"></ul>
      </footer>
    </div>
  )
}

export default Footer