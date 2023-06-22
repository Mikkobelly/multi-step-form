import React from 'react'
import thankYouIcon from "../images/icon-thank-you.svg";

const Step5 = () => {
    return (
        <main className="content-container">
            <img src={thankYouIcon} className='thank-icon' alt='icon'></img>
            <h1 className='thank-title'>Thank you!</h1>
            <p className='light-grey-text'>
                Thank you for confirming your subscription!
                We hope you have fun using our platform. If you ever need support,
                please feel free to email us at <a href="mailto: support@loremgaming.com" className='mail'>support@loremgaming.com</a>.
            </p>
        </main>
    )
}

export default Step5
