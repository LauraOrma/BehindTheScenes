import React, {useEffect} from "react";
import {Link, RouteComponentProps} from 'react-router-dom'
import NavbarProfile from "./NavbarProfile";
import "../styles/alltalents.css";
import UserCard from './UserCard';
import {IUser} from "../_interfaces/interfaceIUser";
import {IGlobalState} from "../_reducers/reducer";
import * as actions from "../_actions/actions";
import {connect} from "react-redux";
import Footer from "./Footer";

interface IProps {
}

interface IPropsGlobal {
    token: string
    setUser: (user: IUser[]) => void;
    user: IUser[];
}

const AllTalents: React.FC<IProps & IPropsGlobal & RouteComponentProps> = props => {
    useEffect(() => {
        fetch("http://localhost:3040/api/getAllUsers", {
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
            <NavbarProfile history={props.history} location={props.location} match={props.match}/>
            <div className="all-talents">
                <div className="slogan-text">
                    <div className="Big-talents-Slogan">
                        ¿Buscas actores para tu proyecto    ?
                    </div>
                    <div className="Medium-talents-Slogan">
                        Busca actores y actrices en nuestra base de datos
                    </div>
                </div>
            </div>
            <div className="important">
                <Link className="important" to="/ProfilePage">¿Quieres modificar tu perfil? Haz click aquí</Link>
            </div>
            <div className="container all-user-cards">
                <div className="row">
                    {props.user.map(user => (
                        <div className="col s3" key={user.id_user}>
                            <UserCard key={user.id_user} firstname={user.firstName} lastname={user.lastName}
                                      profesion={user.profesion} img={user.profile_img} id_user={user.id_user} gender={user.gender}
                                      city={user.city} country={user.country} description={user.description}/>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

const mapStateToProps = (state: IGlobalState) => ({
    token: state.token,
    user: state.user
});

const mapDispatchToProps = {
    setToken: actions.setToken,
    setUser: actions.setUser
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AllTalents);
