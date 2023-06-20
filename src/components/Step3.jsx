import React, { useState, useContext } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from '../App';
import { Form, Button } from 'react-bootstrap';
import ContentHeader from './ContentHeader';

const addOns = [
    {
        addOnsTitle: "Online Services",
        description: "Access to multiplayer games",
        monthlyPrice: 1,
        yearlyPrice: 10
    },
    {
        addOnsTitle: "Larger storage",
        description: "Extra 1TB of cloud save",
        monthlyPrice: 2,
        yearlyPrice: 20
    },
    {
        addOnsTitle: "Customizable profile",
        description: "Extra 1TB of cloud save",
        monthlyPrice: 2,
        yearlyPrice: 20
    }
]


const Step3 = () => {
    const navigate = useNavigate();
    const { userData, setUserData } = useContext(AppContext);
    const [selectedAddOns, setSelectedAddOns] = useState(userData.addOns ? userData.addOns : []);

    // Run when user selects add-ons
    const handleCheck = (e) => {
        const { id, checked } = e.target;
        const foundAddOn = addOns.find(item => item.addOnsTitle === id);
        if (checked) {
            setSelectedAddOns((prev) => {
                return [...prev, foundAddOn]
            })
        } else {
            setSelectedAddOns((prev) => {
                const filtered = prev.filter(item => item.addOnsTitle !== id)
                return filtered;
            })
        }
    }

    // Run when user press 'Next step' button and updates userData state
    const handleNextClick = () => {
        setUserData((prev) => {
            // console.log('Next Step pressed: ', { ...prev, addOns: selectedAddOns })
            return { ...prev, addOns: selectedAddOns }
        })

        navigate('/step4')
    };


    return (
        <main className="content-container">
            <ContentHeader contentTitle="Pick add-ons" contentDescription="Add-ons help your gaming experince." />
            <Form className="form-container">
                <div>
                    {addOns.map((item) => (
                        <div key={item.addOnsTitle} className="check-box-container">
                            <input onClick={handleCheck} type="checkbox" className="custom-control-input" id={item.addOnsTitle} />
                            <label className="check-box-label" htmlFor="add-ons-1k">
                                <div>
                                    <p className="add-ons-title">{item.addOnsTitle}</p>
                                    <p className="light-grey-text">{item.description}</p>
                                </div>
                                <p>{userData.plan.paymentPlan && userData.plan.paymentPlan === 'yearly' ? `+$${item.yearlyPrice}/yr` : `+$${item.monthlyPrice}/mo`}</p>
                            </label>
                        </div>
                    )
                    )}
                </div>
                <div className="button-container">
                    <Link className="go-back-link light-grey-text" to={{ pathname: "/step2" }}>Go Back</Link>
                    <Button onClick={handleNextClick} className='next__btn'>Next Step</Button>
                </div>
            </Form>
        </main>
    )
}

export default Step3
