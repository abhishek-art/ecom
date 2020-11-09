import React, {useState} from 'react'
import { Button, Col, Container, Form, FormCheck, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap'
import {Login} from '../../Redux/User/ActionCreators'
import {connect} from 'react-redux'
import Layout from '../../Components/Layout/Layout'

const mapDispatchToProps = (dispatch) => ({
    Login : (user) => dispatch(Login(user))
})

function SignIn(props) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const loginUser = (e) => {

        var user = {
            username, password
        }
        e.preventDefault()
        props.Login(user)
    }
    
        return (
            <Layout>
                <Container>
                <Form onSubmit={loginUser}>
                    <Row style={{padding: "20px"}}>
                        <Col md={{span: 6, offset: 3}}>
                            <FormGroup>
                                <FormLabel>Username</FormLabel>
                                <FormControl type="text" placeholder="Enter Your Username"
                                 value={username} onChange={(e)=> setUsername(e.target.value)}
                                 />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>Password</FormLabel>
                                <FormControl type="password" placeholder="Password" 
                                value={password} onChange={(e)=>setPassword(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormCheck type="checkbox" label="Keep me logged In"/>
                            </FormGroup>
                            <Button type="submit">Login</Button>
                        </Col>
                    </Row>
                </Form>
                </Container>
            </Layout>
        )    
}

export default connect( null , mapDispatchToProps)(SignIn)