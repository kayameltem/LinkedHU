import React from 'react'
import { Button, Form } from 'react-bootstrap'
import ContactCard from './contactCard/ContactCard'

const ContactForm = () => {
  return (
    <div>
            <ContactCard/>
        <Form id="contact-form">
      <div className="row justify-content-center">
        
          <div className="col-lg-5  col-md-6 col-sm-12">
            <Form.Group className="mb-3" controlId="contact-form-phone-number1">
              <Form.Label>Phone Number 1</Form.Label>
              <Form.Control type="phone" placeholder="Enter your phone number" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="contact-form-email1">
            <Form.Label>Email Address 1</Form.Label>
            <Form.Control type="email" placeholder="Enter your email" />
          </Form.Group>
            
          </div>
    
        <div className="col-lg-5 offset-lg-1 col-md-6 col-sm-12">
        <Form.Group className="mb-3" controlId="contact-form-phone-number2">
              <Form.Label>Phone Number 2</Form.Label>
              <Form.Control type="phone" placeholder="Enter your phone number" />
            </Form.Group>
          <Form.Group className="mb-3" controlId="contact-form-email2">
            <Form.Label>Email Address 2</Form.Label>
            <Form.Control type="email" placeholder="Enter your email" />
          </Form.Group>
        </div>

        <hr/>
        <div className="row justify-content-center">
            
        <div className="col-lg-5 col-md-6 col-sm-12">
        <Form.Group className="mb-3" controlId="form-phone-number2">
              <Form.Label>LinkedIN</Form.Label>
              <Form.Control type="socialAccount" placeholder="Your LinkedIN Account" />
            </Form.Group>
          <Form.Group className="mb-3" controlId="contact-form-instagram">
            <Form.Label>Instagram</Form.Label>
            <Form.Control type="socailAccount" placeholder="Your Instagram Account" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="contact-form-twitter">
            <Form.Label>Twitter</Form.Label>
            <Form.Control type="socialAccount" placeholder="Your Twitter Account" />
          </Form.Group>
        </div>
        <div className="col-lg-5 offset-lg-1 col-md-6 col-sm-12">
        <Form.Group className="mb-3" controlId="contact-form-github">
              <Form.Label>GitHUB</Form.Label>
              <Form.Control type="socialAccount" placeholder="Your GitHUB Account" />
            </Form.Group>
          <Form.Group className="mb-3" controlId="contact-form-facebook">
            <Form.Label>Facebook</Form.Label>
            <Form.Control type="socialAccount" placeholder="Your Facebook Account" />
          </Form.Group>
        </div>


        <Button className = "col-lg-2" variant="secondary" >Edit</Button>
      </div>
      </div>
    </Form>
    </div>
  )
}

export default ContactForm