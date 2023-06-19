import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Form';
import ContentHeader from './ContentHeader';

const addOns = [
    {
        id: 1,
        addOnsTitle: "Online Services",
        description: "Access to multiplayer games",
        monthlyPrice: "+$1/mo",
        yearlyPrice: "+$10/yr"
    },
    {
        id: 2,
        addOnsTitle: "Larger storage",
        description: "Extra 1TB of cloud save",
        monthlyPrice: "+$2/mo",
        yearlyPrice: "+$20/yr"
    },
    {
        id: 3,
        addOnsTitle: "Customizable profile",
        description: "Extra 1TB of cloud save",
        monthlyPrice: "+$2/mo",
        yearlyPrice: "+$20/yr"
    }
]


const Step3 = () => {
    const location = useLocation();
    let isSwitched = true;
    if (location.state) {
        isSwitched = location.state.isSwitched;
    }

    const [checked, setChecked] = useState(false);
    const handleCheck = (e) => {
        console.log(e.target.id)
        setChecked((prevState) => {
            return !prevState;
        })
    }

    const navigate = useNavigate();
    const [checkedId, setCheckedId] = useState([]);
    const handleSubmit = (e) => {
        e.preventDefault();
        const { id } = e.target;
        setCheckedId((prevValue) => {
            const checkedIdArry = [...prevValue, id]
            console.log(checkedIdArry)
            return checkedIdArry;
        })
        navigate('/step4');
    }

    return (
        <main className="content-container">
            <ContentHeader contentTitle="Pick add-ons" contentDescription="Add-ons help your gaming experince." />
            <Form className="form-container">
                <div>
                    {addOns.map((item) => {
                        return <div key={item.id} className="check-box-container">
                            <input onClick={handleCheck} type="checkbox" class="custom-control-input" id={item.id} />
                            <label className="check-box-label" for="add-ons-1k"><div><p className="add-ons-title">{item.addOnsTitle}</p><p className="light-grey-text">{item.description}</p></div><p>{isSwitched ? item.monthlyPrice : item.yearlyPrice}</p></label>
                        </div>
                    })}
                    {/* <div className="check-box-container">
                        <input type="checkbox" class="custom-control-input" id="add-ons-1" />
                        <label className="check-box-label" for="add-ons-1k"><div><p className="add-ons-title">Online Services</p><p className="light-grey-text">Access to multiplayer games</p></div><p>{isSwitched ? "+$1/mo" : "+$10/yr"}</p></label>
                    </div>
                    <div className="check-box-container">
                        <input type="checkbox" class="custom-control-input" id="add-ons-2" />
                        <label className="check-box-label" for="add-ons-2"><div><p className="add-ons-title">Larger storage</p><p className="light-grey-text">Extra 1TB of cloud save</p></div><p>{isSwitched ? "+$2/mo" : "+$20/yr"}</p></label>
                    </div>
                    <div className="check-box-container">
                        <input type="checkbox" class="custom-control-input" id="add-ons-3" />
                        <label className="check-box-label" for="add-ons-3"><div><p className="add-ons-title">Customizable profile</p><p className="light-grey-text">Custom theme on your profile</p></div><p>{isSwitched ? "+$2/mo" : "+$20/yr"}</p></label>
                    </div> */}
                </div>
                <div className="button-container">
                    <Link className="go-back-link light-grey-text" to={{ pathname: "/step2", state: isSwitched }}>Go Back</Link>
                    <Button onClick={handleSubmit} className="btn" type="submit">Next Step</Button>
                </div>
            </Form>
        </main>
    )
}

export default Step3
export { addOns }
