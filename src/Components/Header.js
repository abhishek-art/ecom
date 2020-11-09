import React from 'react'
import { Nav, Navbar, NavItem, NavLink as Navlink} from 'react-bootstrap'
import { NavLink, Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {logoutUser} from '../Redux/User/ActionCreators'

function Header() {

    const dispatch = useDispatch()

    const logout = () => {
        localStorage.clear()
        dispatch(logoutUser())
    }

    const authenticated = useSelector(state => state.user.authenticated)
    if(authenticated){
        return (
            <div>
                <Navbar bg="dark" className="justify-content-between" variant="dark" style={{zIndex: 1}}>
                <Link to="/" className="navbar-brand">Company Logo</Link>
                    <Nav>
                        <NavItem><Navlink onClick={logout}>SignOut</Navlink></NavItem>
                    </Nav>
                </Navbar>
            </div>
        )
    }
    else{
        return (
            <div>
                <Navbar bg="dark" className="justify-content-between" variant="dark" style={{zIndex: 1}}>
                <Link to="/" className="navbar-brand">Company Logo</Link>
                    <Nav>
                        <NavItem><NavLink to="/signin" className="nav-link">SignIn</NavLink></NavItem>
                        <NavItem><NavLink to="/signup" className="nav-link">SignUp</NavLink></NavItem>
                    </Nav>
                </Navbar>
            </div>
        )
    }
}

export default Header