import React, { useContext, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from '../App';
import { Form, Button } from 'react-bootstrap';
import ContentHeader from './ContentHeader';
import PlanCard from './PlanCard';
import arcadeIcon from "../images/icon-arcade.svg";
import proIcon from "../images/icon-pro.svg";
import advancedIcon from "../images/icon-advanced.svg";

const plans = [
    {
        planTitle: "Arcade",
        imgSrc: arcadeIcon,
        monthlyPrice: 9,
        yearlyPrice: 90,
        benefit: "2 months free"
    },
    {
        planTitle: "advanced",
        imgSrc: advancedIcon,
        monthlyPrice: 12,
        yearlyPrice: 120,
        benefit: "2 months free"
    },
    {
        planTitle: "Pro",
        imgSrc: proIcon,
        monthlyPrice: 15,
        yearlyPrice: 150,
        benefit: "2 months free"
    }
]

const Step2 = () => {
    const navigate = useNavigate();
    const { userData, setUserData } = useContext(AppContext);
    const [plan, setPlan] = useState({
        planTitle: userData.plan.planTitle,
        paymentPlan: userData.plan.paymentPlan,
        price: userData.plan.price
    });

    // Run when user selects a plan (title)
    const handlePlanSelect = (e) => {
        // Find which plan was selected from plans array
        const { id } = e.target;
        const foundPlan = plans.find((item) => item.planTitle === id);

        // Update selected planTitle and set price accordingly
        setPlan((prev) => {
            return { ...prev, planTitle: id, price: plan.paymentPlan === 'monthly' ? foundPlan.monthlyPrice : foundPlan.yearlyPrice };
        })
    }

    // Run when user switches plans (monthly or yearly)
    const handleSwitch = (e) => {
        // Find currently selected plan from plans array
        const foundPlan = plans.find((item) => item.planTitle === plan.planTitle)

        // Update both paymentPlan and price based on it
        setPlan((prev) => {
            return prev.paymentPlan === 'monthly' ? { ...prev, paymentPlan: 'yearly', price: foundPlan.yearlyPrice } : { ...prev, paymentPlan: 'monthly', price: foundPlan.monthlyPrice };
        })
    }

    // Run when user press 'Next step' button and updates userData state
    const handleNextClick = () => {
        setUserData((prev) => {
            console.log('Next Step pressed: ', { ...prev, plan })
            return { ...prev, plan }
        })

        navigate('/step3')
    };

    return (
        <main className="content-container">
            <ContentHeader contentTitle="Select Your Plan" contentDescription="You have the option of monthly or yearly billing." />
            <Form className="form-container">
                <div className="plancard-container">
                    {plans.map((item) => {
                        return <PlanCard
                            key={item.planTitle}
                            id={item.planTitle}
                            imgSrc={item.imgSrc}
                            planTitle={item.planTitle}
                            price={plan.paymentPlan === 'monthly' ? `$${item.monthlyPrice}/mo` : `$${item.yearlyPrice}/yr`}
                            benefit={plan.paymentPlan === 'yearly' && item.benefit}
                            handleClick={handlePlanSelect}
                            selectedPlan={plan.planTitle}
                        />
                    })}
                </div>
                <div className="switch-container">
                    <label htmlFor="plan-switch" className="switch-label">Monthly</label>
                    <Form.Check
                        onChange={handleSwitch}
                        type="switch"
                        checked={plan.paymentPlan === 'yearly' ? true : false}
                        id="plan-switch"
                    />
                    <label htmlFor="plan-switch" className="switch-label">Yearly</label>
                </div>
            </Form>
            <div className="button-container">
                <Link className="go-back-link light-grey-text" to="/step1">Go Back</Link>
                <Button onClick={handleNextClick} className='next__btn'>
                    Next Step
                </Button>
            </div>
        </main>
    )
}

export default Step2