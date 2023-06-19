import React from 'react'

const SummaryCard = () => {
    return (
        <div className="main-sumcard-container">
            <div className="plans-container">
                <div className="plan-container">
                    <div className="plan-name-container"><p>Arcade</p><p><a className="light-grey-text" href="/step2">change</a></p></div>
                    <div><p className="">$90/yr</p></div>
                </div>
                <div className="addons-container">
                    <p className="light-grey-text">Online service</p><p>$10/yr</p>
                </div>
            </div>
            <div className="total-container">
                <p className="light-grey-text">Total(per year)</p>
                <p className="total-price">$120/yr</p>
            </div>
        </div>
    )
}

export default SummaryCard
