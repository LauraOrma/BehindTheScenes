import React, {useEffect} from "react";
import {RouteComponentProps} from 'react-router-dom'
import {makeStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import "../styles/useredit.css";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {ICountry} from "../_interfaces/interfaceICountry";
import {IState} from "../_interfaces/interfaceIState";
import {IGlobalState} from "../_reducers/reducer";
import * as actions from "../_actions/actions";
import {connect} from "react-redux";
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

const useStyles = makeStyles(theme => ({
    button: {
        display: 'block',
        marginTop: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));


const UserEdit: React.FC<IProps & IPropsGlobal & RouteComponentProps> = props => {
    const classes = useStyles();
    const me = props.user[0];
    const countryId = me.country === null ? 'ES' : me.country.substring(0, 2).toUpperCase();
    const [firstname, setFirstName] = React.useState(me.firstName);
    const [lastname, setLastName] = React.useState(me.lastName);
    const [email, setEmail] = React.useState(me.email);
    const [phone, setPhone] = React.useState(me.phone);
    const [education, setEducation] = React.useState(me.education);
    const [city, setCity] = React.useState(me.city);
    const [profesion, setProfesion] = React.useState(me.profesion);
    const [description, setDescription] = React.useState(me.description);
    const [profesionOpen, setProfesionOpen] = React.useState(false);
    const [gender, setGender] = React.useState(me.gender);
    const [genderOpen, setGenderOpen] = React.useState(false);
    const [country, setCountry] = React.useState(countryId);
    const [countryOpen, setCountryOpen] = React.useState(false);
    const [videobook, setVideobook] = React.useState(me.videobook);
    const [image, setImage] = React.useState();
    const [error, setError] = React.useState('');

    useEffect(() => {
        let elems = document.querySelectorAll('.modaluseredit');
        M.Modal.init(elems, {});
        M.updateTextFields();
        }, []);

    function handleProfesionOpen() {
        setProfesionOpen(true);
    }

    function handleProfesionClose() {
        setProfesionOpen(false);
    }

    function handleProfesionChange(event: any) {
        setProfesion(event.target.value);
    }

    function handleGenderOpen() {
        setGenderOpen(true);
    }

    function handleGenderClose() {
        setGenderOpen(false);
    }

    function handleGenderChange(event: any) {
        setGender(event.target.value);
    }

    function handleCountryOpen() {
        setCountryOpen(true);
    }

    function handleCountryClose() {
        setCountryOpen(false);
    }

    function handleCountryChange(event: any) {
        setCountry(event.target.value);
    }


    function handleFirstNameChange(event: any) {
        setFirstName(event.target.value);
    }

    function handleLastNameChange(event: any) {
        setLastName(event.target.value);
    }

    function handleEmailChange(event: any) {
        setEmail(event.target.value);
    }

    function handlePhoneChange(event: any) {
        setPhone(event.target.value);
    }

    function handleEducationChange(event: any) {
        setEducation(event.target.value);
    }


    function handleCityChange(event: any) {
        setCity(event.target.value);
    }

    function handleDescriptionChange(event: any) {
        setDescription(event.target.value);
    }

    function handleVideobookChange(event: any) {
        setVideobook(event.target.value);
    }

    function editInfo() {
        fetch("http://localhost:3040/api/setProfileData", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: me.id_user,
                firstname: firstname,
                lastname: lastname,
                email: email,
                gender: gender,
                phone: phone,
                profesion: profesion,
                education: education,
                city: city,
                country: country,
                description: description,
                videobook: videobook,
                rLink: window.location.href
            })
        })
            .then(response => {
                if (response.ok) {
                    response
                        .text() //el text()es una promesa
                        .then(u => {
                            props.history.replace(`/ProfilePage/rel`);
                            setTimeout(() => {
                                props.history.replace(`/ProfilePage`);
                            })
                        });
                } else {
                    setError("Something happened");
                }
            })
            .catch(err => {
                setError("Something happened");
            });
    }

    return (
        <div className="container">
            <div className="row useredit">
                {/* ENCABEZADO */}
                <div className="row useredit" id="useredit">

                    <div className="col s12">
                        <h5 className="text1">Edita o agrega información sobre ti</h5>
                    </div>
                    <form action="http://localhost:3040/api/setProfileData" method="post" encType="multipart/form-data">
                        <input type="hidden" name="id" value={me.id_user}/>
                        {/* EDITAR NOMBRE */}
                        <div className="col s6 input-field">
                            <input name="firstname" type="text" id="name-edit" value={firstname}
                                   onChange={handleFirstNameChange}/>
                            <label>Name</label>
                        </div>
                        {/* EDITAR APELLIDO */}
                        <div className="col s6 input-field">
                            <input name="lastname" type="text" id="lastname-edid" value={lastname}
                                   onChange={handleLastNameChange}/>
                            <label>Last Name</label>
                        </div>

                        {/* EDITAR EMAIL */}
                        <div className="col s12 input-field">
                            <input name="email" type="text" id="email-edit" value={email} onChange={handleEmailChange}/>
                            <label>E-mail</label>
                        </div>

                        {/* EDITAR PROFESIÓN/PROFESIONES */}
                        <div className="col s6 input-field">
                            <FormControl>
                                <InputLabel htmlFor="userprofesion">Profession</InputLabel>
                                <Select
                                    name="profesion"
                                    open={profesionOpen}
                                    onClose={handleProfesionClose}
                                    onOpen={handleProfesionOpen}
                                    value={profesion}
                                    onChange={handleProfesionChange}
                                    inputProps={{
                                        name: 'profesion',
                                        id: 'userprofesion',
                                    }}>
                                    <MenuItem value="Actor">Actor</MenuItem>
                                    <MenuItem value="Actress">Actress</MenuItem>
                                    <MenuItem value="Dancer">Dancer</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        {/* EDITAR GÉNERO */}

                        <div className="col s6 input-field">
                            <FormControl>
                                <InputLabel htmlFor="userGender">Gender</InputLabel>
                                <Select
                                    name="gender"
                                    open={genderOpen}
                                    onClose={handleGenderClose}
                                    onOpen={handleGenderOpen}
                                    value={gender}
                                    onChange={handleGenderChange}
                                    inputProps={{
                                        name: 'gender',
                                        id: 'userGender',
                                    }}>
                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value="Female">Female</MenuItem>
                                </Select>
                            </FormControl>
                        </div>

                        {/* EDITAR EDUCACIÓN */}
                        <div className="col s6 input-field">
                            <input name="education" type="text" id="education-edit" value={education}
                                   onChange={handleEducationChange}/>
                            <label>Education</label>
                        </div>

                        {/* EDITAR TELÉFONO */}
                        <div className="col s6 input-field">
                            <input name="phone" type="text" id="phone-edit" value={phone} onChange={handlePhoneChange}/>
                            <label>Phone</label>
                        </div>
                        {/* EDITAR BIOGRAFÍA/DESCRIPCIÓN */}
                        <div className="col s12 input-field">
                            <input name="education" type="text" id="description-edit" value={description}
                                   onChange={handleDescriptionChange}/>
                            <label>Descripcion</label>
                        </div>

                        {/* EDITAR VIDEOBOOK */}
                        <div className="col s12 input-field">
                            <input name="videobook" type="text" id="videobook-edit" value={videobook}
                                   onChange={handleVideobookChange}/>
                            <label>Videobook</label>
                        </div>

                        {/* EDITAR CIUDAD*/}

                        <div className="col s12 input-field">
                            <input name="city" type="text" id="city-edit" value={city} onChange={handleCityChange}/>
                            <label>City</label>
                        </div>

                        {/* SELECT PAÍS */}
                        <div className="col s12 countryedituser">
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="usercountry">Country</InputLabel>
                                <Select
                                    open={countryOpen}
                                    onClose={handleCountryClose}
                                    onOpen={handleCountryOpen}
                                    value={country}
                                    onChange={handleCountryChange}
                                    inputProps={{
                                        name: 'country',
                                        id: 'usercountry',
                                    }}>
                                    <MenuItem value="ES">España</MenuItem>
                                    <MenuItem value="PT">Portugal</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className="Edit-button">
                            <input type="button" value="Edit" className="btn btn-editar"
                                   onClick={editInfo}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: IGlobalState) => ({
    email: state.email,
    token: state.token,
    country: state.country,
    state: state.state,
    user: state.user
});

const mapDispatchToProps = {
    setToken: actions.setToken,
    setCountry: actions.setCountry,
    setState: actions.setState,
    setUser: actions.setUser
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserEdit);
