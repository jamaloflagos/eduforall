import { useAuth } from "../hooks/useAuth"

const Header = () => {
    const { user, logoutUser } = useAuth();

  return (
    <>
        <div>
        <div>Welcome, {user.user_name}</div>
        <button onClick={logoutUser}>Logout</button>
        </div>

    </>
  )
}
export default Header