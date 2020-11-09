import React, {useState} from 'react'
import { Row, Col, Form, FormGroup, FormControl, FormLabel, Button, Container } from 'react-bootstrap'
import {useDispatch} from 'react-redux'
import Layout from '../../Components/Layout/Layout'
import { signupUser } from '../../Redux/User/ActionCreators'

function SignUp() {

    const dispatch = useDispatch()

    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setMail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const signup = (e) => {
        e.preventDefault()
        const user = {firstname, lastname, email, username, password}
        dispatch(signupUser(user))
    }

    return (
        <Layout>
        <Container>
            <Row>
                <Col md={{span:6, offset: 3}}>
                    <Form onSubmit={signup}>
                        <Form.Row className="justify-content-between">
                        <FormGroup>
                            <FormLabel>First Name</FormLabel>
                            <FormControl type="text" placeholder="First Name" 
                            value={firstname} onChange={(e)=> setFirstname(e.target.value)}/>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl type="text" placeholder="Last Name"
                            value={lastname} onChange={(e)=> setLastname(e.target.value)}/>
                        </FormGroup>
                        </Form.Row>
                        <FormGroup>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl type="email" placeholder="Enter Your Email"
                            value={email} onChange={(e)=> setMail(e.target.value)}/>
                        </FormGroup>
                        <Form.Row className="justify-content-between">
                        <FormGroup>
                            <FormLabel>Username</FormLabel>
                            <FormControl type="text" placeholder="Username"
                            value={username} onChange={(e)=> setUsername(e.target.value)}/>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Create Password</FormLabel>
                            <FormControl type="password" placeholder="Password"
                            value={password} onChange={(e)=> setPassword(e.target.value)}/>
                        </FormGroup>
                        </Form.Row>
                        <Button type="submit">SignUp</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    </Layout>
    )
}

export default SignUp