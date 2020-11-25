import React from 'react'
import {Container, Row, Col, Nav, NavItem} from 'react-bootstrap'
import {NavLink} from 'react-router-dom'
import './style.css'

function Layout(props) {
    return (
        <div>
            {
                props.sidebar ? 
                <Container fluid>
                <Row>
                    <Col sm={2} className="sidebar">
                        <Nav className = 'flex-column' defaultActiveKey='/' style={{alignItems: 'center'}}>
                            <NavItem><NavLink to='/' className='nav-link'>Home</NavLink></NavItem>
                            <NavItem><NavLink to='/products' className='nav-link'>Products</NavLink></NavItem>
                            <NavItem><NavLink to ='/orders' className='nav-link'>Orders</NavLink></NavItem>
                            <NavItem><NavLink to ='/category' className='nav-link'>Categories</NavLink></NavItem>
                        </Nav>
                    </Col>
                    <Col sm={10} className = "content">
                        {props.children}
                    </Col>
                </Row>
                </Container>
                :
                props.children
            }
        </div>
    )
}

export default Layout
