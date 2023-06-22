import React, { useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from '../App';
import { validateName, validateEmail, validatePhone } from './Step1';
import { Form, Button } from 'react-bootstrap';
import ContentHeader from './ContentHeader';
import SummaryCard from './SummaryCard';


const Step4 = () => {
    const { userData } = useContext(AppContext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        // Prevent reloading the page
        e.preventDefault();
        const { name, email, phone } = userData.userInfo;

        // Check if user has provided required info
        if (!validateName(name) || !validateEmail(email) || !validatePhone(phone)) {
            alert('Please provide personal info in Step 1. After filling the form, click "Next Step" to register your data.');
            navigate('/step1')
            return;
        }

        navigate('/step5');
    }
    return (
        <div>
            <main className="content-container">
                <ContentHeader contentTitle="Finishing up" contentDescription="Double-check everything looks OK before confirming." />
                <Form onSubmit={handleSubmit} className="form-container">
                    <SummaryCard />
                    <div className="button-container">
                        <Link className="go-back-link light-grey-text" to="/step3">Go Back</Link>
                        <Button type="submit" className="confirm__btn">
                            Confirm
                        </Button>
                    </div>
                </Form>
            </main>
        </div>
    )
}

export default Step4
