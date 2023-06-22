import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import { AppContext } from '../App';
import { Form } from 'react-bootstrap';
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
    const { userData, setUserData } = useContext(AppContext);
    const [selectedAddOns, setSelectedAddOns] = useState(userData.addOns);

    // Run when user selects add-ons
    const handleCheck = (e) => {
        const { id, checked } = e.target;
        const foundAddOn = addOns.find(item => item.addOnsTitle === id);
        if (checked) {
            setSelectedAddOns((prev) => {
                return [...prev, foundAddOn]
            })

            // Updates userData state as well
            setUserData((prev) => {
                return { ...prev, addOns: [...prev.addOns, foundAddOn] }
            })
        } else {
            setSelectedAddOns((prev) => {
                const filtered = prev.filter(item => item.addOnsTitle !== id)
                return filtered;
            })

            setUserData((prev) => {
                const filteredAddons = prev.addOns.filter(item => item.addOnsTitle !== id)
                return { ...prev, addOns: filteredAddons };
            })
        }
    }


    // Find if the item is checked(selected)
    const isChecked = (itemTitle) => {
        return selectedAddOns.find((item) => item.addOnsTitle === itemTitle)
    }

    const clickedStyle = {
        backgroundColor: "hsl(217, 100%, 97%)",
        border: "2px solid black"
    }


    return (
        <main className="content-container">
            <ContentHeader contentTitle="Pick add-ons" contentDescription="Add-ons help your gaming experince." />
            <Form className="form-container">
                <div>
                    {addOns.map((item) => (
                        <div key={item.addOnsTitle} className="check-box-container" style={isChecked(item.addOnsTitle) ? clickedStyle : null}>
                            <input
                                onClick={handleCheck}
                                type="checkbox"
                                className="custom-control-input"
                                id={item.addOnsTitle}
                                defaultChecked={isChecked(item.addOnsTitle) ? true : false}
                            />
                            <label className="check-box-label" htmlFor={item.addOnsTitle}>
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
            </Form>
            <div className="button-container">
                <Link className="go-back-link light-grey-text" to="/step2">Go Back</Link>
                <Link to="/step4" className='next__btn'>Next Step</Link>
            </div>
        </main>
    )
}

export default Step3
