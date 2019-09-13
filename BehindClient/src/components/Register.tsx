import React from 'react';
import {RouteComponentProps} from 'react-router-dom';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import "../styles/register.css";
import {connect} from "react-redux";
import * as actions from "../_actions/actions";
import {IGlobalState} from "../_reducers/reducer";

interface IProps {
}

interface IPropsGlobal {
    setToken: (t: string) => void;
    setEmail: (u: string) => void;
    token: string;
}

function TabPanel(props: any) {
    const {children, value, index, ...other} = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-force-tabpanel-${index}`}
            aria-labelledby={`scrollable-force-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index: any) {
    return {
        id: `scrollable-force-tab-${index}`,
        'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));

const Login: React.FC<IProps & IPropsGlobal & RouteComponentProps> = props => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    function handleChange(event: any, newValue: any) {
        setValue(newValue);
    }

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [fName, setFName] = React.useState("");
    const [lName, setLName] = React.useState("");
    const [error, setError] = React.useState("");

    const updateEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
        setError("");
    };
    const updatePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        setError("");
    };
    const updateFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFName(event.target.value);
        setError("");
    };
    const updateLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLName(event.target.value);
        setError("");
    };

    const signIn = () => {
        fetch("http://localhost:3040/api/auth", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then(response => {
                if (response.ok) {
                    response
                        .text() //el text()es una promesa
                        .then(token => {
                            props.setToken(token);
                            localStorage.setItem("jwt", token);
                            props.history.push('/Site')
                        });
                } else {
                    setError("Usuario o Contraseña incorrectos");
                }
            })
            .catch(err => {
                setError("Usuario o Contraseña incorrectos.");
            });
    };

    const SignUp = () => {
        fetch("http://localhost:3040/api/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                pass: password,
                fName: fName,
                lName: lName
            })
        })
            .then(response => {
                if (response.ok) {
                    response
                        .text() //el text()es una promesa
                        .then(token => {
                            localStorage.setItem("jwt", token);
                            props.setToken(token);
                            props.history.replace('/ProfilePage')
                        });
                } else {
                    setError("Usuario o Contraseña incorrectos");
                }
            })
            .catch(err => {
                setError("Usuario o Contraseña incorrectos.");
            });
    };
    return (
        <div className={classes.root}>
            <Tabs
                value={value}
                onChange={handleChange}
                scrollButtons="on"
                indicatorColor="primary"
                textColor="primary"
            >
                <Tab label="Registro" {...a11yProps(0)} />
                <Tab label="Inicia Sesión" {...a11yProps(1)} />

            </Tabs>

            <TabPanel value={value} index={0}>
                <div className="row">
                    <div className="col s12">
                        <div className="row register" id="registermod">
                            <div className="col s12">
                                <h5 className="welcome">Bienvenido a</h5>
                                <h4>Behind The Scenes</h4>
                            </div>
                            <form name="SignUp" action="http://localhost:3000/signup" method="post">
                                <div className="col s6 input-field">
                                    <input name="firstName" type="text" id="name" onChange={updateFirstName}/>
                                    <label>Nombre</label>
                                </div>
                                <div className="col s6 input-field">
                                    <input name="lastName" type="text" id="lastname" onChange={updateLastName}/>
                                    <label>Apellido</label>
                                </div>
                                <div className="col s12 input-field">
                                    <input name="email" type="text" id="email" onChange={updateEmail}/>
                                    <label>E-mail</label>
                                </div>
                                <div className="col s12 input-field">
                                    <input name="password" type="password" id="password" onChange={updatePassword}/>
                                    <label>Password</label>
                                </div>
                                {/*<HorizontalLabelPositionBelowStepper/>*/}
                                <input type="button" value="Regístrate" className="btn continue " onClick={SignUp}/>
                            </form>
                        </div>
                    </div>
                </div>
            </TabPanel>
            <TabPanel value={value} index={1    }>
                <div className="row">
                    <div className="col s12">
                        <div className="row register" id="registermod">
                            <div className="col s12">
                                <h5 className="welcome">Bienvenido de nuevo a</h5>
                                <h4>Behind The Scenes</h4>
                            </div>
                            <div className="col s12 input-field">
                                <input type="text" id="loginEmail" onChange={updateEmail}/>
                                <label>E-mail</label>
                            </div>
                            <div className="col s12 input-field">
                                <input type="password" id="loginPassword" onChange={updatePassword}/>
                                <label>Password</label>
                            </div>
                            <input type="button" value="Log in" className="btn continue " onClick={signIn}/>
                        </div>
                    </div>
                </div>
            </TabPanel>
        </div>
    );
};

const mapDispatchToProps = {
    setToken: actions.setToken,
    setEmail: actions.setEmail,
};

const mapStateToProps = (state: IGlobalState) => ({
    token: state.token,
    email: state.email
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);