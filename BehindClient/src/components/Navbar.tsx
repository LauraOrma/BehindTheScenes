import React from "react";
import "../styles/navbar.css";
import { Link } from "react-router-dom";
import Icon from '@material-ui/core/Icon';

const Navbar: React.FC = () => {
 return (
   <nav>
       <Link to="#" className="brand-logo left title">BEHIND THE SCENES</Link>
       <Link to="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons right">menu</i></Link>
        <ul className="right hide-on-med-and-down">
       <li>
        <Link className = "home" to="/">
            HOME
        </Link>
       </li>
       <li>
        <Link className = "about" to="/About">
            SOBRE NOSOTROS
        </Link>
       </li>
       <li className = "about">
       <Link className = "about" to="/About">
            TALENTOS
        </Link>
       </li>
       <li className = "resources">
        <Link to="/Resources">
            RECURSOS <Icon>arrow_drop_down</Icon>
        </Link>
       </li>
     </ul>



    <ul className="sidenav" id="mobile-demo">
        <li><Link to="">HOME</Link></li>
        <li><Link to="">ABOUT</Link></li>
        <li><Link to="">TALENT</Link></li>
        <li><Link to="">RESOURCES</Link></li>
    </ul>
   </nav>
 );
};

export default Navbar;


