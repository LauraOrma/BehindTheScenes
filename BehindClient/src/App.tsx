import React, {Component} from 'react';
import './App.css';
import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import {BrowserRouter, Redirect, Route, RouteProps} from 'react-router-dom';
import LandingPage from '../src/components/LandingPage';
import Site from '../src/components/Site';
import CastingForm from '../src/components/CastingForm';
import ProfilePage from '../src/components/ProfilePage';
import {IGlobalState} from "./_reducers/reducer";
import {connect} from "react-redux";
import AllCastings from "../src/components/AllCastings";
import AllTalents from "../src/components/AllTalents";
import IdProfile from './components/IdProfile';
import IdCasting from './components/IdCasting';
import * as actions from "./_actions/actions";
import jwt from "jsonwebtoken";


interface IProps {
}

interface PrivateRouterProps extends RouteProps {
    component: any
    authed: boolean;
}

interface IPropsGlobal {
    token: string;
}

const PrivateRoute = ({component: Component, authed, ...rest}: PrivateRouterProps) => (
    <Route {...rest} render={(props) => (
        authed === true
            ? <Component {...props} />
            : <Redirect to='/'/>
    )}/>
);

const App: React.FC<IProps & IPropsGlobal> = props => {
        let defTok = false;
        try {
            let tok = localStorage.getItem('jwt') || '';
            defTok = !(!props.token && tok === '');
        } catch (e) {
        }

        return (
            <BrowserRouter>
                <Route path="/" exact component={LandingPage}/>
                <PrivateRoute authed={defTok} path='/Site' component={Site}/>
                <PrivateRoute authed={defTok} path="/CreateCasting" exact component={CastingForm}/>
                <PrivateRoute authed={defTok} path="/ProfilePage" exact component={ProfilePage}/>
                <PrivateRoute authed={defTok} path="/AllCastings" exact component={AllCastings}/>
                <PrivateRoute authed={defTok} path="/Talents" exact component={AllTalents}/>
                <PrivateRoute authed={defTok} path="/CastingId/:id" exact component={IdCasting}/>
                <PrivateRoute authed={defTok} path="/TalentProfile/:id" exact component={IdProfile}/>
            </BrowserRouter>
        );
    }
;

const mapStateToProps = (state: IGlobalState) => ({
    token: state.token,
    email: state.email
});
const mapDispatchToProps = {
    setToken: actions.setToken,
    setCasting: actions.setCasting,
    setUser: actions.setUser
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);