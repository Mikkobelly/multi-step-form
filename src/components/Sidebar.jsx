import React from "react";
import { NavLink } from 'react-router-dom';

const sidebarSource = [
    {
        num: 1,
        path: "/",
        title: "YOUR INFO"
    },
    {
        num: 2,
        path: "/step2",
        title: "SELECT PLAN"
    },
    {
        num: 3,
        path: "/step3",
        title: "ADD-ONS"
    },
    {
        num: 4,
        path: "/step4",
        title: "SUMMARY"
    }
]

const Sidebar = (props) => {
    let activeStyle = {
        backgroundColor: "hsl(228, 100%, 84%)",
        color: "hsl(243, 100%, 62%)"
    };

    return <div className="sidebar-container">
        {sidebarSource.map((item) => {
            return <div key={item.num} className="sidebar-content-container">
                <div><NavLink to={item.path} className="sidebar-step" style={({ isActive }) => isActive ? activeStyle : undefined}>{item.num}</NavLink></div>
                <div><p className="light-grey-text">step {item.num}</p><p className="sidebar-title">{item.title}</p></div>
            </div>
        })}
    </div>
}

export default Sidebar;
