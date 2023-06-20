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
        monthlyPrice: "$9/mo",
        yearlyPrice: "$90/yr",
        benefit: "2 months free"
    },
    {
        planTitle: "advanced",
        imgSrc: advancedIcon,
        monthlyPrice: "$12/mo",
        yearlyPrice: "$120/yr",
        benefit: "2 months free"
    },
    {
        planTitle: "Pro",
        imgSrc: proIcon,
        monthlyPrice: "$15/mo",
        yearlyPrice: "$150/yr",
        benefit: "2 months free"
    }
]

const Step2 = () => {
    const navigate = useNavigate();
    const { userData, setUserData } = useContext(AppContext);
    const [plan, setPlan] = useState({
        planTitle: userData.plan ? userData.plan.planTitle : '',
        payment: userData.plan ? userData.plan.payment : 'monthly'
    });

    // Run when user selects a plan (title)
    const handlePlanSelect = (e) => {
        const { id } = e.target;
        setPlan((prev) => {
            return { ...prev, planTitle: id };
        })
    }

    // Run when user switches plans (monthly or yearly)
    const handleSwitch = (e) => {
        setPlan((prev) => {
            return prev.payment === 'monthly' ? { ...prev, payment: 'yearly' } : { ...prev, payment: 'monthly' };
        })
    }

    // Run when user press 'Next step' button and updates userData state
    const handleNextClick = () => {
        // Run if user doesn't choose any plan
        if (plan.planTitle === '') {
            alert('Please choose a plan.');
            return;
        }

        setUserData((prev) => {
            // console.log('Next Step pressed: ', { ...prev, plan })
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
                            price={plan.payment === 'monthly' ? item.monthlyPrice : item.yearlyPrice}
                            benefit={plan.payment === 'yearly' && item.benefit}
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
                        checked={plan.payment === 'yearly' ? true : false}
                        id="plan-switch"
                    />
                    <label htmlFor="plan-switch" className="switch-label">Yearly</label>
                </div>
            </Form>
            <div className="button-container">
                <Link className="go-back-link light-grey-text" to="/">Go Back</Link>
                <Button onClick={handleNextClick} className='next__btn'>
                    Next Step
                </Button>
            </div>
        </main>
    )
}

export default Step2