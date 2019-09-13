import React, {useEffect} from "react";
import {Link, RouteComponentProps} from 'react-router-dom'
import "../styles/idcasting.css";
import NavbarProfile from "./NavbarProfile";
import Footer from "./Footer";
import {ICasting} from "../_interfaces/interfaceICasting";
import {IUser} from "../_interfaces/interfaceIUser";
import {IGlobalState} from "../_reducers/reducer";
import * as actions from "../_actions/actions";
import {connect} from "react-redux";

interface IProps {
}

interface IPropsGlobal {
    token: string
    setCasting: (casting: ICasting[]) => void;
    casting: ICasting[];
    setUser: (user: IUser[]) => void;
    user: IUser[];
}

const IdCasting: React.FC<IProps & IPropsGlobal & RouteComponentProps> = props => {
        useEffect(() => {
            // @ts-ignore
            let id = props.match.params.id;
            fetch("http://localhost:3040/api/getCastings/" + id, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(response => {
                if (response.ok) {
                    response.json().then(castings => {
                        console.log(castings);
                        props.setCasting(castings);
                    })
                }
            })
        }, [props.user]);


        const casting = props.casting[0];
        if (casting === undefined) {
            return (<div></div>);
        } else {
            let fecha = new Date(casting.dateadd);
            let options = {year: 'numeric', month: 'long', day: 'numeric', hour:'numeric', minute:'numeric'};
            return (
                <div>
                    <NavbarProfile history={props.history} location={props.location} match={props.match}/>
                    <div className="background-ny">
                        <div className="container castingid">
                            <div className="castingidtext container">
                                <p className="nombrecastingid">Casting Para {casting.name || ''}</p>
                                < div className="infocastingid container">
                                    <p className="ciudad-paiscastingid">{casting.city}, {casting.country}</p>
                                    <p className="categoryacastingid">{casting.category} CASTING</p>
                                    <p className="tipocastingid">Tipo: {casting.type}</p>
                                    <p className="fechacastingid">Fecha de
                                        Publicación: {fecha.toLocaleDateString("es-ES", options)}</p>
                                    <p className="idusuariocastingid">¿Quién ha publicado este casting? <Link className="linkcast"
                                        to={'/TalentProfile/' + casting.owner}> <span className="NAMEWHITE">{casting.userfirstname} {casting.userlastname}</span></Link></p>
                                    <p className="rolcastingid">Papeles disponibles: {casting.rol}</p>
                                    <p className="descripcioncastingid">Información: {casting.description} </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    < Footer/>
                </div>
            );
        }
    }
;
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
)(IdCasting);