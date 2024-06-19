import { useAuth } from "../hooks/useAuth"

const Header = () => {
    const { user } = useAuth();
  return (
    <>
        <div>
        <div>Welcome, {user.user_name}</div>
        <button>Logout</button>
        </div>

    </>
  )
}
export default Header