import React from 'react';
import {RouteComponentProps} from 'react-router-dom'
import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import * as actions from "../_actions/actions";
import NewCasting from './NewCasting';
import {IGlobalState} from "../_reducers/reducer";
import {connect} from "react-redux";
import NavbarProfile from './NavbarProfile';
import Footer from './Footer';

interface IProps {
}

interface IPropsGlobal {
    setToken: (t: string) => void;
    name: string;
}

const CastingForm: React.FC<RouteComponentProps> = props => {
    return (
        <div>
            <NavbarProfile history={props.history} location={props.location} match={props.match}/>
            <div id="registermod">
                <NewCasting {...props}/>
            </div>
            <Footer/>
        </div>
    );
};

const mapStateToProps = (state: IGlobalState) => ({
    name: state.email
});

const mapDispatchToProps = {
    setToken: actions.setToken
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CastingForm);
