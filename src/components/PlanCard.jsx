import React, { useState } from 'react'
import Card from 'react-bootstrap/Card';


const PlanCard = (props) => {
    const [isCardClicked, setCardClick] = useState(false)

    const handleClick = () => {
        setCardClick(prevState => !prevState)
    }

    const clickedStyle = {
        backgroundColor: "hsl(217, 100%, 97%)",
        border: "2px solid black"
    }

    return (
        <Card onClick={handleClick} style={isCardClicked ? clickedStyle : undefined}>
            <Card.Img variant="top" src={props.imgSrc} className="plan-icon" />
            <Card.Body>
                <Card.Title>{props.planTitle}</Card.Title>
                <Card.Text className="light-grey-text">{props.price}</Card.Text>
                <Card.Text>{props.benefit}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default PlanCard
