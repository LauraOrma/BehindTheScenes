import React from "react";
import "../styles/navbar.css";
import {Link, RouteComponentProps} from 'react-router-dom';
import Icon from '@material-ui/core/Icon';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const NavbarProfile: React.FC<RouteComponentProps> = props => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    function handleClick(event: any) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    function logOut() {
        localStorage.removeItem('jwt');
        props.history.push("/")
    }

    return (

        <nav>
            <a href="/Site" className="brand-logo left title">BEHIND THE SCENES</a>
            <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i
                className="material-icons right">menu</i></a>
            <ul className="right hide-on-med-and-down">
                <li>
                    <Link className="home" to="/Site">
                        HOME
                    </Link>
                </li>
                <li>
                    <Link className="about" to="/AllCastings">
                        CASTINGS
                    </Link>
                </li>
                <li className="talent">
                    <Link className="about" to="/Talents">
                        TALENTOS
                    </Link>
                </li>
                <li className="resources">
                    <Link to="/Resources">
                        RECURSOS <Icon>arrow_drop_down</Icon>
                    </Link>
                </li>
                <li className="profile-page">
                    <Link to="#" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                        MI PERFIL <Icon>perm_identity</Icon>
                    </Link>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}><Link to="/ProfilePage" className="profile-dropdown">My
                            Profile</Link></MenuItem>
                        <MenuItem onClick={logOut}><Link to="/" className="profile-dropdown">Log Out</Link></MenuItem>
                    </Menu>
                </li>
            </ul>


            <ul className="sidenav" id="mobile-demo">
                <li><a href="">HOME</a></li>
                <li><a href="">CASTINGS</a></li>
                <li><a href="">TALENT</a></li>
                <li><a href="">RESOURCE</a></li>
            </ul>
        </nav>
    );
};

export default NavbarProfile;