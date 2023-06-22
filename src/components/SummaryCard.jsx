import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { AppContext } from '../App';

const SummaryCard = () => {
    const { userData } = useContext(AppContext);
    const { plan, addOns } = userData;

    // Calculate total price of selected plan + optional add-ons
    const addOnsTotal = addOns.map((item) => {
        return plan.paymentPlan === 'monthly' ? item.monthlyPrice : item.yearlyPrice;
    })
    const totalPrice = [...addOnsTotal, plan.price].reduce((acc, curr) => acc + curr)

    return (
        <div className="main-sumcard-container">
            <div className="plans-container">
                <div className="plan-container">
                    <div className="plan-name-container">
                        <p>{plan.planTitle}</p>
                        <p>
                            <Link className="light-grey-text" to="/step2">change</Link>
                        </p>
                    </div>
                    <div>
                        <p className="">${plan.price}/{plan.paymentPlan === 'monthly' ? 'mo' : 'yr'}</p>
                    </div>
                </div>
                <div className="addons-container">
                    {addOns.length > 0 && addOns.map((item) => {
                        return <div key={item.addOnsTitle} className='addon'>
                            <p className="light-grey-text">{item.addOnsTitle}</p>
                            <p>{plan.paymentPlan === 'monthly' ? `$${item.monthlyPrice}/mo` : `$${item.yearlyPrice}/yr`}</p>
                        </div>
                    })}
                </div>
            </div>
            <div className="total-container">
                <p className="light-grey-text">Total(per year)</p>
                <p className="total-price">{plan.paymentPlan === 'monthly' ? `$${totalPrice}/mo` : `$${totalPrice}/yr`}</p>
            </div>
        </div>
    )
}

export default SummaryCard
