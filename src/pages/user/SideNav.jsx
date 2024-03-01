import React from "react";
import './SideNav.css';
import ProfilePic from './logo192.png';

const SideNav = () => {
    return (
        <>
            <aside>
                <div className="profile_pic">
                    <img src={ ProfilePic } alt="" />
                </div>
                
            </aside>
        </>
    )
}
export default SideNav;