import React, {useEffect} from "react";
import {RouteComponentProps} from 'react-router-dom'
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import UserEdit from "./UserEdit";
import "../styles/modaledit.css";
import AppBar from '@material-ui/core/AppBar';
import {ICountry} from "../_interfaces/interfaceICountry";
import {IState} from "../_interfaces/interfaceIState";
import {IUser} from "../_interfaces/interfaceIUser";

interface IProps {
}

interface IPropsGlobal {
    setToken: (t: string) => void;
    email: string;
    setCountry: (country: ICountry[]) => void;
    country: ICountry[];
    setState: (state: IState[]) => void;
    state: IState[];
    setUser: (user: IUser[]) => void;
    user: IUser[];
}

const ModalEdit: React.FC<IProps & IPropsGlobal & RouteComponentProps> = props => {
    useEffect(() => {
        let elems = document.querySelectorAll('.modal');
        M.Modal.init(elems, {})
    }, []);

    return (
        <div>
            <a className="btn join btn-large teal modal-trigger modaleditbutton editbutton" data-target="login"> Edit
                profile</a>
            <AppBar position="static" color="default">
                <div id="login" className="modal">
                    <div className="modal-content center">
                        <UserEdit {...props}/>
                    </div>
                </div>
            </AppBar>
        </div>
    );
};

export default ModalEdit;