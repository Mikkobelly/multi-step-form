import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ContentHeader from './ContentHeader';
import PlanCard from './PlanCard';
import arcadeIcon from "../images/icon-arcade.svg";
import proIcon from "../images/icon-pro.svg";
import advancedIcon from "../images/icon-advanced.svg";

const plans = [
    {
        id: 1,
        planTitle: "Arcade",
        imgSrc: arcadeIcon,
        monthlyPrice: "$9/mo",
        yearlyPrice: "$90/yr",
        benefit: "2 months free"
    },
    {
        id: 2,
        planTitle: "advanced",
        imgSrc: advancedIcon,
        monthlyPrice: "$12/mo",
        yearlyPrice: "$120/yr",
        benefit: "2 months free"
    },
    {
        id: 3,
        planTitle: "Pro",
        imgSrc: proIcon,
        monthlyPrice: "$15/mo",
        yearlyPrice: "$150/yr",
        benefit: "2 months free"
    }
]

const Step2 = () => {
    let [isSwitched, setSwitch] = useState(true)

    const location = useLocation();
    if (location.state) {
        isSwitched = location.state.isSwitched;
    }

    const handleSwitch = () => {
        setSwitch((prevState) => {
            // console.log(!prevState)
            return !prevState;
        })
    }

    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/step3', { state: { isSwitched } });
    }

    return (
        <main className="content-container">
            <ContentHeader contentTitle="Select Your Plan" contentDescription="You have the option of monthly or yearly billing." />
            <Form onSubmit={handleSubmit} className="form-container">
                <div className="plancard-container">
                    {plans.map((item) => {
                        return <PlanCard key={item.id} imgSrc={item.imgSrc} planTitle={item.planTitle} price={isSwitched ? item.monthlyPrice : item.yearlyPrice} benefit={!isSwitched && item.benefit} />
                    })}
                    {/* <PlanCard imgSrc={arcadeIcon} planTitle="Arcade" price={isSwitched ? "$9/mo" : "$90/yr"} benefit={!isSwitched && "2 months free"} />
                    <PlanCard imgSrc={advancedIcon} planTitle="Advanced" price={isSwitched ? "$12/mo" : "$120/yr"} benefit={!isSwitched && "2 months free"} />
                    <PlanCard imgSrc={proIcon} planTitle="Pro" price={isSwitched ? "$15/mo" : "$150/yr"} benefit={!isSwitched && "2 months free"} /> */}
                </div>
                <div className="switch-container">
                    <label for="plan-switch" className="switch-label">Monthly</label>
                    <Form.Check onChange={handleSwitch} type="switch" id="plan-switch" />
                    <label for="plan-switch" className="switch-label">Yearly</label>
                </div>
                <div className="button-container">
                    <Link className="go-back-link light-grey-text" to="/">Go Back</Link>
                    <Button type="submit">
                        Next Step
                    </Button>
                </div>
            </Form>
        </main>
    )
}

export default Step2
export { plans }
