import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../App';
import { Form } from 'react-bootstrap';
import ContentHeader from './ContentHeader';
import PlanCard from './PlanCard';
import arcadeIcon from '../images/icon-arcade.svg';
import proIcon from '../images/icon-pro.svg';
import advancedIcon from '../images/icon-advanced.svg';

const plans = [
    {
        planTitle: 'Arcade',
        imgSrc: arcadeIcon,
        monthlyPrice: 9,
        yearlyPrice: 90,
        benefit: '2 months free'
    },
    {
        planTitle: 'Advanced',
        imgSrc: advancedIcon,
        monthlyPrice: 12,
        yearlyPrice: 120,
        benefit: '2 months free'
    },
    {
        planTitle: 'Pro',
        imgSrc: proIcon,
        monthlyPrice: 15,
        yearlyPrice: 150,
        benefit: '2 months free'
    }
];


const Step2 = () => {
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
            return {
                ...prev,
                planTitle: id,
                price: plan.paymentPlan === 'monthly' ? foundPlan.monthlyPrice : foundPlan.yearlyPrice
            };
        })

        // Updates userData state as well
        setUserData((prev) => {
            return {
                ...prev,
                plan: {
                    planTitle: id,
                    paymentPlan: plan.paymentPlan,
                    price: plan.paymentPlan === 'monthly' ? foundPlan.monthlyPrice : foundPlan.yearlyPrice
                }
            }
        })
    }

    // Run when user switches plans (monthly or yearly)
    const handleSwitch = () => {
        // Find currently selected plan from plans array
        const foundPlan = plans.find((item) => item.planTitle === plan.planTitle);

        // Update both paymentPlan and price based on it
        setPlan((prev) => {
            return prev.paymentPlan === 'monthly' ? {
                ...prev,
                paymentPlan: 'yearly',
                price: foundPlan.yearlyPrice
            } : {
                ...prev,
                paymentPlan: 'monthly',
                price: foundPlan.monthlyPrice
            };
        });

        // Updates userData state as well
        setUserData((prev) => {
            return {
                ...prev,
                plan: prev.plan.paymentPlan === 'monthly' ? {
                    planTitle: foundPlan.planTitle,
                    paymentPlan: 'yearly',
                    price: foundPlan.yearlyPrice
                } : {
                    planTitle: foundPlan.planTitle,
                    paymentPlan: 'monthly',
                    price: foundPlan.monthlyPrice
                }
            };
        });
    };

    const switchLabelStyle = {
        color: 'hsl(231, 11%, 63%)'
    }


    return (
        <main className='content-container'>
            <ContentHeader
                contentTitle='Select Your Plan'
                contentDescription='You have the option of monthly or yearly billing.'
            />

            <Form className='form-container'>
                <div className='plancard-box'>
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
                <div className='switch-box'>
                    <label
                        htmlFor='plan-switch'
                        className='switch__label'
                        style={plan.paymentPlan === 'monthly' ? switchLabelStyle : null}
                    >
                        Monthly
                    </label>
                    <Form.Check
                        onChange={handleSwitch}
                        type='switch'
                        checked={plan.paymentPlan === 'yearly' ? true : false}
                        id='plan-switch'
                    />
                    <label
                        htmlFor='plan-switch'
                        className='switch__label'
                        style={plan.paymentPlan === 'yearly' ? switchLabelStyle : null}
                    >
                        Yearly
                    </label>
                </div>
            </Form>

            <div className='button-box'>
                <Link className='go-back light-gray-text' to='/'>Go Back</Link>
                <Link to='/step3' className='next__btn'>
                    Next Step
                </Link>
            </div>
        </main>
    )
}

export default Step2;