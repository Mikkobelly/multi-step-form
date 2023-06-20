import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';


const PlanCard = ({ id, imgSrc, planTitle, price, benefit, handleClick, selectedPlan }) => {
    const clickedStyle = {
        backgroundColor: "hsl(217, 100%, 97%)",
        border: "2px solid black"
    }

    return (
        <Card onClick={handleClick} id={id} style={selectedPlan === planTitle ? clickedStyle : null}>
            <Card.Img variant="top" src={imgSrc} className="plan-icon" id={id} />
            <Card.Body id={id}>
                <Card.Title id={id}>{planTitle}</Card.Title>
                <Card.Text id={id} className="light-grey-text">{price}</Card.Text>
                <Card.Text id={id}>{benefit}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default PlanCard
