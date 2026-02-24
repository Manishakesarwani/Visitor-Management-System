import { Link } from "react-router-dom"
import { UseLogout } from "../hooks/UseLogout"
import { UseAuthorizationContext } from "../hooks/UseAuthorizationContext";

const Navbar = () => {

    const {logout} = UseLogout();
    const {user} = UseAuthorizationContext();
    

    const handleClick = () => {
        logout();
    }
    
  return (
    <header>
        <div className="container">
            <Link to="/">
                <h1><span><i className="bi bi-file-person"></i></span><span>Visitor Management System</span></h1>
            </Link>
            <nav>
                {user && (
                    <div>
                        <span>{user.Role} - {user.Name}({user.Username})</span>
                        <button type="button" onClick={handleClick}>Logout</button>
                    </div>
                )}
                {!user && (
                    <div>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>
                        <Link to="/self/visitors">Register as visitor</Link>
                    </div>
                )}
            </nav>
            
        </div>
    </header>
  )
}

export default Navbar