import React, { useState } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
  const navigate = useNavigate();

  const {showAlert, setProgress} = props

  const [credentials, setCredentials] = useState({ email: '', password: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setProgress(20)
    const response = await fetch(`${process.env.REACT_APP_API_KEY}/api/v1/auth/login`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password }), // body data type must match "Content-Type" header
    })
    const data = await response.json()
    setProgress(40)
    if(data.success){
      localStorage.setItem('keepSafeToken', data.authtoken)
      navigate('/');
      setProgress(100)
      showAlert('Logged in Successfully', 'success')
    } else {
      setProgress(100)
      showAlert(data.error, 'danger')
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <Container className="d-flex justify-content-center align-items-center my-3">
      <Card className="d-flex justify-content-center align-items-center shadow-lg login-card">
        <Card.Body className="d-flex flex-column">
          <div className="d-flex flex-row mt-2">
            <span className="h1 fw-bold my-2 mb-0">Welcome Back!</span>
          </div>

          <h5 className="fw-normal my-3 pb-3" style={{ letterSpacing: '1px' }}>
            Sign into your account
          </h5>
          <Form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <Form.Group className="mb-4">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                id="email"
                name="email"
                onChange={onChange}
                type="email"
                placeholder="Enter email"
                value={credentials.email}
                autoComplete="true"
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
              Login
            </Button>
          </Form>
          <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>
            Don't have an account?
            <LinkContainer to="/signup">
              <Button variant="link">Sign Up</Button>
            </LinkContainer>
          </p>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Login
