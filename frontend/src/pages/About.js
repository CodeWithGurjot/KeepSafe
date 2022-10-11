import React from 'react'
import { Card, Container } from 'react-bootstrap'

const About = () => {
  return (
    
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ letterSpacing: '1.5px' }}
      >
      <Card className="shadow about-box" style={{width: '60%', marginTop:'5%'}}>
        <Container>
          <h1 className="py-3">About US</h1>
          <h6 className="pb-4">
            KeepSafe is company that provides you a platform to keep your notes safe and secure on
            the cloud. Only you can access your notes by using correct credentials. Your notes are
            saved on the cloud which means you can access them from anywhere in the world. We do not
            disclose personal information of our user. You can store whatever secrets you want to
            store here.
          </h6>
        </Container>
    </Card>
      </Container>
  )
}

export default About
