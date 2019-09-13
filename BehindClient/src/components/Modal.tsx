import React, {useEffect} from "react";
import {RouteComponentProps} from 'react-router-dom'
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import Register from "./Register";
import "../styles/Modal.css";
import AppBar from '@material-ui/core/AppBar';

const Modal: React.FC<RouteComponentProps> = props => {
    useEffect(() => {
        let elems = document.querySelectorAll('.modal');
        M.Modal.init(elems, {});
    });

    return (
        <div>
            <a className="btn join btn-large teal modal-trigger" data-target="login"> Join Now </a>
            <AppBar position="static" color="default">
                <div id="login" className="modal">
                    <div className="modal-content center">
                        <Register {...props}/>
                    </div>
                </div>
            </AppBar>
        </div>
    );
};

export default Modal;