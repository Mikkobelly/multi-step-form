import React from 'react'

const ContentHeader = (props) => {
    return (
        <div className="content-header">
            <h1></h1>
            <h3 className="content-title">{props.contentTitle}</h3>
            <p className="light-grey-text">{props.contentDescription}</p>
        </div>
    )
}

export default ContentHeader
