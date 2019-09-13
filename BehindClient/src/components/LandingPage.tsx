import React from "react";
import {RouteComponentProps} from 'react-router-dom'
import "../styles/landing.css";
import Login from "./Modal";
import Navbar from "./Navbar";
import Footer from "./Footer";

const LandingPage: React.FC<RouteComponentProps> = props => {
    return (
        <div> 
            <Navbar/> 
        <div className="landing-image">
            <div className="slogan-text">
                <div className="Big-Slogan">
                    Believe in your dreams
                </div>
                <div className="Medium-Slogan">
                    We have the necessary tools to lauch your career
                </div>
                <div className="join-now-button">
                    <Login {...props}/>
                </div>
            </div>
        </div>
        <Footer/>   
        </div>
    );
};

export default LandingPage;
