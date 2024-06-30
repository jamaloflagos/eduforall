import { useAuth } from "../hooks/useAuth";
import '../styles/Header.css';

const Header = () => {
    const { user, logoutUser } = useAuth();

  return (
    <>
        <div className="header">
          <h4>Welcome, {user.user_name}</h4>
          <button onClick={logoutUser}>Logout</button>
        </div>
    </>
  )
}
export default Header