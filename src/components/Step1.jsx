import React, { useState } from 'react'
import { useNavigate, redirect } from "react-router-dom";
import ContentHeader from './ContentHeader';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Step1 = () => {
    const [input, setInput] = useState({
        name: "",
        email: "",
        phone: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput((prevValue) => {
            return { ...prevValue, [name]: value }
        })
    }

    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);

    const handleSubmit = e => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        setValidated(true);
        this.setState({ validated: true });
        // navigate('/step2', { state: { name: input.name, email: input.email, phone: input.phone } });
        return redirect('/step2')
    };
    return (
        <main className="content-container">
            <ContentHeader contentTitle="Personal Info" contentDescription="Please provide your name, email address and phone number." />
            <Form className="form-container" noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control onChange={handleChange} name="name" value={input.name} type="text" placeholder="" required />
                    <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="" controlId="email">
                    <Form.Label>Email Adress</Form.Label>
                    <Form.Control onChange={handleChange} name="email" value={input.email} type="email" placeholder="" required />
                    <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="" controlId="email">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control onChange={handleChange} name="phone" value={input.phone} type="phone" placeholder="e.g. +1 234 567 890" required />
                    <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
                </Form.Group>

                <Button type="submit">
                    Next Step
                </Button>
            </Form>
        </main>
    )
}

export default Step1

// <form onSubmit={handleSubmit} className="needs-validation" noValidate>
//                 <div>
//                     <div>
//                         <div className="invalid-feedback">This field is required.</div>
//                         <label for="name">Name</label>
//                         <input onChange={handleChange} id="name" type="text" name="name" value={input.name} placeholder="" className="form-control" required />
//                     </div>
//                     <label for="email">Email Adress</label>
//                     <input onChange={handleChange} id="email" type="email" name="email" value={input.email} placeholder="" className="form-control" required />
//                     <label for="phone">Phone Number</label>
//                     <input onChange={handleChange} id="phone" type="text" name="phone" value={input.phone} placeholder="e.g. +1 234 567 890" className="form-control" required />
//                 </div>
//                 <button type="submit" className="btn">Next Step</button>
//             </form>
