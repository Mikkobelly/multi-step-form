import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import { validateName, validateEmail, validatePhone } from './Step1';
import { Form, Button } from 'react-bootstrap';
import ContentHeader from './ContentHeader';
import SummaryCard from './SummaryCard';


const Step4 = () => {
    const { userData } = useContext(AppContext);
    const navigate = useNavigate();

    // Run when user presses 'confirm' button
    const handleSubmit = (e) => {
        // Prevent reloading the page
        e.preventDefault();
        const { name, email, phone } = userData.userInfo;

        // Check if user has provided required info
        if (!validateName(name) || !validateEmail(email) || !validatePhone(phone)) {
            alert('Please provide personal info in Step 1. After filling the form, click "Next Step" to register your data.');
            // Redirect user to step1
            navigate('/')
            return;
        }

        navigate('/step5');
    }


    return (
        <div>
            <main className='content-container'>
                <ContentHeader
                    contentTitle='Finishing up'
                    contentDescription='Double-check everything looks OK before confirming.'

                />

                <Form onSubmit={handleSubmit} className='form-container summary'>
                    <SummaryCard />
                    <div className='button-box'>
                        <Link className='go-back light-gray-text' to='/step3'>Go Back</Link>
                        <Button type='submit' className='confirm__btn'>
                            Confirm
                        </Button>
                    </div>
                </Form>
            </main>
        </div>
    )
}

export default Step4;
