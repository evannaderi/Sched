import React, { useState } from 'react';
import axios from 'axios';
import "../styles/Register.css";
import { Container, Row, Col } from "react-bootstrap";
import vector from "../images/table-meeting.png";
import logo from "../images/branding-notitle.png";
import emailIcon from "../images/email.png";
import passIcon from "../images/password.png";
import phoneIcon from "../images/phone.png";



const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    empId: 'NULL',
    positionId: 'NULL',
    title: 'NULL',
    dayAvail: 'NULL',
    endAvail: 'NULL',
    startAvail: 'NULL',
    managerIdent: false
  });

  const [formErrors, setFormErrors] = useState({
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = '';

    if (name === 'username') {
      if (value.length < 2) {
        error = 'Username must be at least 2 characters long.';
      }
    } 
    if (name === 'email') {
      // Example: Check if the email is a valid email address
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        error = 'Enter a valid email address.';
      }
    }

    // Update the form errors
    setFormErrors({
      ...formErrors,
      [name]: error,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://large.poosd-project.com/api/register', formData);
      console.log('Registration successful:', response.data);
      alert("Registered successfully.")
    } catch (err) {
      console.log('Error during registration:', err);
    }
  };

 

  let url = "/";
  return (
    <div id="register-body">
    <Container>
        <Row>
          <Col>
            <img src={logo} alt="sched logo" className="logo"></img>
          </Col>
          <Col className="title">
            <h1>Sched</h1>
          </Col>
        </Row>
        <Row className="row"> 
          <Col className="column">
            <img src={vector} className="business-photo" alt="business vector"/>
          </Col>
          <Col className="main-column">            
            <form id ="myForm" onSubmit={handleSubmit}>
            <div className='register-form'>
            <h1 class="font-family-katibeh">Register</h1>
            <div className='register-box'>
              <div class="firstName-input-group">  
              <h2 class="input-font">First Name</h2>
                <input type="text" name="firstName" placeholder="" required onChange={handleChange} />
              </div>
              <div class="lastName-input-group"> 
              <h2 class="input-font">Last Name</h2>
                <input type="text" name="lastName" placeholder="" required onChange={handleChange} />
              </div>
              <div class="user-input-group"> 
              <h2 class="input-font">Username</h2>
                <input type="text" name="username" placeholder="" required onChange={handleChange} />
                {formErrors.username && <div className="user-popup">{formErrors.username}</div>}
              </div>
              <div class="pass-input-group"> 
              <h2 class="input-font">Password</h2>
              <img src={passIcon} alt="pass icon" /> 
                <input type="password" name="password" placeholder="" required onChange={handleChange} />
              </div>
              <div class="email-input-group">
              <h2 class="input-font">Email</h2>
              <img src={emailIcon} alt="email icon" /> 
                <input type="email" name="email" placeholder="" required onChange={handleChange} />
                {formErrors.email && <div className="popup">{formErrors.email}</div>}
              </div>
              <div class="phone-input-group">
              <h2 class="input-font">Phone Number</h2>
              <img src={phoneIcon} alt="email icon" /> 
                <input type="text" name="phone" placeholder="" required onChange={handleChange} />
              </div>
            </div>
            <div class="managerID-input-group">
            <h2 class="input-font">Are you a manager or an employee?</h2>
            <div className="radio-toolbar">
              <input 
                type="radio" 
                value="Manager" 
                id="manager"
                name="title"
                required
                />
                <label for="manager" onClick={(e) => handleChange({ target: { name: 'managerIdent', value: true } })}>
                  Manager
                </label>
              <input 
              type="radio" 
              value="Employee" 
              id="employee"
              name="title"
              />
              <label for="employee" onClick={(e) => handleChange({ target: { name: 'managerIdent', value: false } })}>
                Employee
              </label>
            </div>
            </div>
            <button type="submit" className="submit-button">Sign Up</button>
            <p className="login-register-p">Have an account?  <a href={url} className="login-register-url">log in</a></p>
            </div>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
