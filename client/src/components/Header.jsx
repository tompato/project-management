import logo from './assets/logo.png';

export default function Header() {
  return (
    <nav className="navbar bg-light mb-4 p-0">
        <div className="container">
            <a href="/" className="navbar-brand">
                <div className="d-flex align-items-center">
                    <img src={logo} alt="Logo" className="me-2" />
                    <span>Project Management</span>
                </div>
            </a>
        </div>    
    </nav>
  )
}
