import React, {useEffect} from 'react';
import {Link, RouteComponentProps} from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import * as actions from "../_actions/actions";
import {IGlobalState} from "../_reducers/reducer";
import {connect} from "react-redux";
import {ICountry} from "../_interfaces/interfaceICountry";
import {IState} from "../_interfaces/interfaceIState";
import "../styles/newcasting.css";
import jwt from 'jsonwebtoken'

interface IProps {
}

interface IPropsGlobal {
    setToken: (t: string) => void;
    email: string;
    setCountry: (country: ICountry[]) => void;
    country: ICountry[];
    setState: (state: IState[]) => void;
    state: IState[];
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

const NewCasting: React.FC<IProps & IPropsGlobal & RouteComponentProps> = props => {
    const classes = useStyles();
    //Form values
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [rol, setRol] = React.useState('');
    const [error, setError] = React.useState("");
    //Select properties
    const [category, setCategory] = React.useState(false);
    const [categoryOpen, setCategoryOpen] = React.useState(false);
    const [type, setType] = React.useState(false);
    const [typeOpen, setTypeOpen] = React.useState(false);
    const [city, setCity] = React.useState(false);
    const [cityOpen, setCityOpen] = React.useState(false);
    const [country, setCountry] = React.useState(false);
    const [countryOpen, setCountryOpen] = React.useState(false);
    const [state, setState] = React.useState(false);
    const [stateOpen, setStateOpen] = React.useState(false);
    const [success, setSuccess] = React.useState(false);


    const updateName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
        setError("");
    };
    const updateDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
        setError("");
    };
    const updateRol = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRol(event.target.value);
        setError("");
    };

    useEffect(() => {
        const country = fetch("http://localhost:3040/api/getcountry", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            if (response.ok) {
                response.json().then(countries => {
                        props.setCountry(countries);
                    }
                )
            }
        });
    }, []);

    function handleCategoryOpen() {
        setCategoryOpen(true)
    }

    function handleCategoryClose() {
        setCategoryOpen(false);
    }

    function handleCategoryChange(event: any) {
        setCategory(event.target.value);
    }

    function handleTypeOpen() {
        setTypeOpen(true)
    }

    function handleTypeClose() {
        setTypeOpen(false);
    }

    function handleTypeChange(event: any) {
        setType(event.target.value);
    }

    function handleCityOpen() {
        setCityOpen(true)
    }

    function handleCityClose() {
        setCityOpen(false);
    }

    function handleCityChange(event: any) {
        setCity(event.target.value);
    }

    function handleCountryChange(event: any) {
        setCountry(event.target.value);
    }

    function handleCountryClose() {
        setCountryOpen(false);
    }

    function handleCountryOpen(event: any) {
        setCountryOpen(true)
    }

    function handleStateChange(event: any) {
        setState(event.target.value);
    }

    function handleStateClose() {
        setStateOpen(false);
    }

    function handleStateOpen(event: any) {
        setStateOpen(true)
    }

    function CrearCasting() {
        let decode = jwt.decode(localStorage.getItem('jwt') || '');
        fetch("http://localhost:3040/api/newCasting", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                category: category,
                type: type,
                city: city,
                country: country,
                state: state,
                description: description,
                //@ts-ignore
                owner: decode.id_user,
                rol: rol
            })
        })
            .then(response => {
                if (response.ok) {
                    response
                        .text() //el text()es una promesa
                        .then(token => {
                            console.log("Casting sucessfully added");
                            props.history.push('/Site');
                        });
                } else {
                    setError("Usuario o Contraseña incorrectos");
                }
            })
            .catch(err => {
                setError("Usuario o Contraseña incorrectos.");
            });
    }

    return (
        <div className="background-pattern-img">
            <div className="container createcasting">
                <div className=" row formcast">
                    <div className="col s12">
                        <h3 className="castingtext1">Creador de castings</h3>
                        <h5 className="castingtext2">Los actores de Behind The Scenes podrán verlo</h5>
                    </div>
                    <form autoComplete="off">
                        <div className="col s12 input-field castingnameadd">
                            <input className="castingnameadd" type="text" id="name" onChange={updateName}/>
                            <label className="castingnameadd">Name</label>
                        </div>

                        {/* SELECT CATEGORÍA */}

                        <div className="col s4">
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="castingcategory">Category</InputLabel>
                                <Select
                                    open={categoryOpen}
                                    onClose={handleCategoryClose}
                                    onOpen={handleCategoryOpen}
                                    value={category}
                                    onChange={handleCategoryChange}
                                    inputProps={{
                                        name: 'category',
                                        id: 'castingcategory',

                                    }
                                    }>
                                    <MenuItem value="TV">TV</MenuItem>
                                    <MenuItem value="Movie">Film</MenuItem>
                                    <MenuItem value="Theater">Theater</MenuItem>
                                </Select>

                            </FormControl>
                        </div>

                        {/* SELECT tipo */}
                        <div className="col s4">
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="castingtype">Type</InputLabel>
                                <Select
                                    open={typeOpen}
                                    onClose={handleTypeClose}
                                    onOpen={handleTypeOpen}
                                    value={type}
                                    onChange={handleTypeChange}
                                    inputProps={{
                                        name: 'type',
                                        id: 'castingtype',
                                    }}
                                >
                                    <MenuItem value='Open'>Abierto</MenuItem>
                                    <MenuItem value='Selection'>Selection</MenuItem>
                                </Select>
                            </FormControl>
                        </div>

                        {/* INPUT ROLES */}
                        <div className="col s4 input-field castingnameadd">
                            <input className="castingnameadd" type="number" min="1" id="rol" onChange={updateRol}/>
                            <label className="castingnameadd">Roles</label>
                        </div>


                        {/* SELECT CIUDAD */}
                        <div className="col s4">
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="castingcity">City</InputLabel>
                                <Select
                                    open={cityOpen}
                                    onClose={handleCityClose}
                                    onOpen={handleCityOpen}
                                    value={city}
                                    onChange={handleCityChange}
                                    inputProps={{
                                        name: 'category',
                                        id: 'castingcity',
                                    }}>
                                    <MenuItem value='Madrid'>Madrid</MenuItem>
                                    <MenuItem value='Málaga'>Málaga</MenuItem>
                                    <MenuItem value='Barcelona'>Barcelona</MenuItem>
                                </Select>

                            </FormControl>
                        </div>

                        {/* SELECT PAÍS */}
                        <div className="col s4">
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="castingcountry">Country</InputLabel>
                                <Select
                                    open={countryOpen}
                                    onClose={handleCountryClose}
                                    onOpen={handleCountryOpen}
                                    value={country}
                                    onChange={handleCountryChange}
                                    inputProps={{
                                        name: 'Country',
                                        id: 'castingcountry',
                                    }}>
                                    {props.country.map(country => (
                                        <MenuItem key={country.id} value={country.id}>{country.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>

                        {/* SELECT Provincia */}
                        <div className="col s4">
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="castingState">State</InputLabel>
                                <Select
                                    open={stateOpen}
                                    onClose={handleStateClose}
                                    onOpen={handleStateOpen}
                                    value={state}
                                    onChange={handleStateChange}
                                    inputProps={{
                                        name: 'State',
                                        id: 'castingState',
                                    }}>
                                    <MenuItem value='28'>Madrid</MenuItem>
                                    <MenuItem value='29'>Málaga</MenuItem>
                                    <MenuItem value='8'>Barcelona</MenuItem>
                                </Select>
                            </FormControl>
                        </div>

                        {/* INPUT DESCRIPCION  */}
                        <div className="col s12 input-field castingnameadd">
                            <input className="castingnameadd" type="text" id="description"
                                   onChange={updateDescription}/>
                            <label className="castingnameadd">Description</label>
                        </div>

                        {/* BOTONES */}
                        <div className="col s12">
                            <div className="cajabotones">
                                <Link to="/Site">
                                <input type="button" defaultValue="Publicate Casting" className="btn continue b2"
                                       onClick={CrearCasting}/>
                                </Link>
                                {/* <Link to="/Site">
                                    <input type="button" defaultValue="Back" className="btn continue offset-l2 b1"/>
                                </Link> */}
                            </div>
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
    state: state.state
});

const mapDispatchToProps = {
    setToken: actions.setToken,
    setCountry: actions.setCountry,
    setState: actions.setState,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewCasting);
