import React from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Navigationbar = () => {
  const handleLogout = () => {
    localStorage.removeItem('keepSafeToken')
  }
  return (
    <Navbar className="shadow" sticky="top" bg="dark" variant="dark" expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>KeepSafe</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about">
              <Nav.Link>About</Nav.Link>
            </LinkContainer>
          </Nav>
          {!localStorage.getItem('keepSafeToken') ? (
            <>
              <LinkContainer to="/login">
                <Button variant="light" className="mx-3">
                  Login
                </Button>
              </LinkContainer>
              <LinkContainer to="/signup">
                <Button variant="light">Sign Up</Button>
              </LinkContainer>
            </>
          ) : (
            <LinkContainer to="/login">
              <Button variant="light" onClick={handleLogout}>
                Logout
              </Button>
            </LinkContainer>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigationbar
