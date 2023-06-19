import React from 'react'
import { Link, useNavigate, useLocation } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ContentHeader from './ContentHeader';
import SummaryCard from './SummaryCard'

const Step4 = () => {
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
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
                        <Button type="submit">
                            Confirm
                        </Button>
                    </div>
                </Form>
            </main>
        </div>
    )
}

export default Step4
