import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import { Form, Button } from 'react-bootstrap';
import ContentHeader from './ContentHeader';


const Step1 = () => {
    const { userData, setUserData } = useContext(AppContext);
    const [input, setInput] = useState({
        name: userData.userInfo ? userData.userInfo.name : '',
        email: userData.userInfo ? userData.userInfo.email : '',
        phone: userData.userInfo ? userData.userInfo.phone : ''
    });
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');

    const navigate = useNavigate();


    // Update the input state when user interacts
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput((prevValue) => {
            return { ...prevValue, [name]: value }
        })
        name === 'name' && validateName(value);
        name === 'email' && validateEmail(value);
        name === 'phone' && validatePhone(value);
    }

    // Check for errors in name input
    const validateName = (val) => {
        setNameError('');
        if (val === '') {
            setNameError('This field is required');
            return false;
        }
        return true;
    }

    // Check for errors in email input
    const validateEmail = (val) => {
        setEmailError('');
        if (val === '') {
            setEmailError('This field is required');
            return false;
        } else if ((val.indexOf('@') === -1
            || val.indexOf('.') === -1)) {
            setEmailError('Invalid email format')
            return false;
        }
        return true;
    }

    // Check for errors in phone input
    const validatePhone = (val) => {
        setPhoneError('');
        let pattern = /^[0-9,+]+$/;
        if (val === '') {
            setPhoneError('This field is required');
            return false;
        } else if (!val.match(pattern)) {
            setPhoneError('Invalid format for phone number');
            return false;
        }
        return true;
    }

    // Run when user press 'Next step' button and updates userData state
    const handleNextClick = () => {
        validateName(input.name);
        validateEmail(input.email);
        validatePhone(input.phone);
        if (!validateName(input.name) || !validateEmail(input.email) || !validatePhone(input.phone)) {
            alert('Please make change(s) to your input.')
            return;
        }
        setUserData((prev) => {
            return { ...prev, userInfo: { ...input } }
        })
        navigate('/step2')
    };

    return (
        <main className="content-container">
            <ContentHeader contentTitle="Personal Info" contentDescription="Please provide your name, email address and phone number." />
            <Form className="form-container">
                <Form.Group className="" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control onChange={handleChange} name="name" value={input.name} type="text" placeholder="" required />
                    <p className='feedback'>{nameError}</p>
                </Form.Group>
                <Form.Group className="" controlId="email">
                    <Form.Label>Email Adress</Form.Label>
                    <Form.Control onChange={handleChange} name="email" value={input.email} type="email" placeholder="" required />
                    <p className='feedback'>{emailError}</p>
                </Form.Group>
                <Form.Group className="" controlId="phone">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control onChange={handleChange} name="phone" value={input.phone} type="phone" placeholder="e.g. +1 234 567 890" required />
                    <p className='feedback'>{phoneError}</p>
                </Form.Group>
            </Form>
            <Button onClick={handleNextClick} className='next__btn'>
                Next Step
            </Button>
        </main>
    )
}

export default Step1