import React, { useState } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
  const navigate = useNavigate()

  const {setProgress, showAlert} = props

  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: '',
  })

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setProgress(20)
    const { name, email, password, cpassword } = credentials;
    if(cpassword === password){
    const response = await fetch(`${process.env.REACT_APP_API_KEY}/api/v1/auth/createuser`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }), // body data type must match "Content-Type" header
    })
    const data = await response.json()
    setProgress(60)
    if (data.success) {
      localStorage.setItem('keepSafeToken', data.authtoken)
      navigate('/')
      showAlert('Account Created Successfully', 'success')
      setProgress(100)
    } else {
      showAlert(data.error, 'danger')
      setProgress(100)
    }
  }else {
    showAlert('Passwords do not match', 'danger')
    setProgress(100)
  }
}
  return (
    <Container className="d-flex justify-content-center align-items-center my-3">
      <Card className="d-flex justify-content-center align-items-center shadow-lg login-card">
        <Card.Body className="d-flex flex-column">
          <div className="d-flex flex-row mt-2">
            <span className="h1 fw-bold my-2 mb-0">SIGN UP</span>
          </div>

          <h5 className="fw-normal my-3 pb-3" style={{ letterSpacing: '1px' }}>
            Enter details to create a new account
          </h5>
          <Form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <Form.Group className="mb-4">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                id="name"
                name="name"
                onChange={onChange}
                type="text"
                placeholder="Enter your full name"
                value={credentials.name}
                required
                minLength={3}
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                id="email"
                name="email"
                onChange={onChange}
                type="email"
                placeholder="Enter email"
                value={credentials.email}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                id="password"
                name="password"
                onChange={onChange}
                type="password"
                placeholder="Password"
                autoComplete="true"
                value={credentials.password}
                required
                minLength={6}
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                id="cpassword"
                name="cpassword"
                onChange={onChange}
                type="password"
                placeholder="Confirm your password"
                autoComplete="true"
                value={credentials.cpassword}
                required
                minLength={6}
              />
            </Form.Group>
            <Button
              type="submit"
              value="Submit"
              className="my-2 px-5"
              variant="dark"
              style={{ width: '100%' }}
              size="lg"
            >
              Sign Up
            </Button>
          </Form>
          <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>
            Already have an account?
            <LinkContainer to="/login">
              <Button variant="link">Login</Button>
            </LinkContainer>
          </p>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Signup
