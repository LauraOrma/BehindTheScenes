import React, {useEffect} from 'react';
import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import {Link, RouteComponentProps} from 'react-router-dom';
import CastingCard from './CastingCard';
import "../styles/site.css";
import * as actions from "../_actions/actions";
import {IGlobalState} from "../_reducers/reducer";
import {connect} from "react-redux";
import {ICasting} from "../_interfaces/interfaceICasting";
import NavbarProfile from './NavbarProfile';
import UserCard from './UserCard';
import Footer from './Footer';
import {IUser} from "../_interfaces/interfaceIUser";

interface IProps {
}

interface IPropsGlobal {
    token: string
    setCasting: (casting: ICasting[]) => void;
    casting: ICasting[];
    setUser: (user: IUser[]) => void;
    user: IUser[];
}

const Site: React.FC<IProps & IPropsGlobal & RouteComponentProps> = props => {


    useEffect(() => {
        fetch("http://localhost:3040/api/getLastCastings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            if (response.ok) {
                response.json().then(castings => {
                        props.setCasting(castings);
                    }
                )
            }
        });
    }, []);

    useEffect(() => {
        fetch("http://localhost:3040/api/getLastUsers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            if (response.ok) {
                response.json().then(users => {
                        props.setUser(users);
                    }
                )
            }
        });
    }, []);

    return (
        <div>
            <NavbarProfile {...props}/>
            {/* BUSCADOR DE CASTINGS */}
            <div className="search-casting">
                <div className="container">
                    <p className="text2"></p>

                    <p className="text2"></p>
                </div>
            </div>
            <div className="important">
                <Link className="important" to="/CreateCasting">Añadir un nuevo casting </Link>
            </div>
            {/* ULTIMOS 4 CASTINGS PUBLICADOS */}
            <div className="container Last">
                <h5 className="lastcastingspublic">Últimos Castings Publicados:</h5>
                <div className="row">
                    {props.casting.map(casting => (
                        <div className="col s3" key={casting.id_casting}>
                            <CastingCard key={casting.id_casting} id_casting={casting.id_casting}
                                         category={casting.category} name={casting.name} rol={casting.rol}
                                         city={casting.city} country={casting.country}/>
                        </div>
                    ))}
                </div>
            </div>
            {/* ULTIMOS 4 USUARIOS AÑADIDOS A LA DB */}
            <div className="container Last">
                <h5 className="lastcastingspublic">Últimos usuarios registrados en nuestra página:</h5>
                <div className="row">
                    {props.user.map(user => (
                        <div className="col s3" key={user.id_user}>
                            <UserCard key={user.id_user} firstname={user.firstName} lastname={user.lastName}
                                      profesion={user.profesion} city={user.city} country={user.country} gender={user.gender}
                                      description={user.description} img={user.profile_img} id_user={user.id_user}/>
                        </div>
                    ))}
                </div>
            </div>
            <div className="footer"><Footer/></div>
        </div>
    );
};

const mapStateToProps = (state: IGlobalState) => ({
    token: state.token,
    email: state.email,
    casting: state.casting,
    user: state.user
});

const mapDispatchToProps = {
    setToken: actions.setToken,
    setCasting: actions.setCasting,
    setUser: actions.setUser
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Site);


