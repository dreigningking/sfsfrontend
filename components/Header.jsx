import { useDispatch } from "react-redux"
import ApplicationLogo from "./ApplicationLogo"
import { showLogin } from "@/lib/redux/slices/authModalSlice"
import { useGetUserQuery } from "../lib/redux/apis/endpoints/auth"
import { Button } from "reactstrap"
import { showRegister } from "../lib/redux/slices/authModalSlice"

const Header = () => {

  const { data: user } = useGetUserQuery()

  const dispatch = useDispatch()

  return (
    <nav className="navbar">
      <div className="pt-0 pt-md-2 px-3 px-md-5 w-100 d-flex justify-content-between align-items-center">
        <ApplicationLogo />

        {user ?
          <p className="mb-0 h4">{user.name} 👦</p>:
          <div className="d-flex gap-2">
            <Button onClick={() => dispatch(showLogin())} color="primary" >Login</Button>
            <Button onClick={() => dispatch(showRegister())} color="danger" outline >Register</Button>
          </div>
        }
        
      </div>
    </nav>
  )
}

export default Header