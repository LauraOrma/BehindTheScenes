import React from 'react';
import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import "../styles/cardsita.css";
import jwt from "jsonwebtoken";

function IdCardsita(props: any) {
    let name = props.firstName + ' ' + props.lastName;
    let imgUrl = 'http://localhost:3040/' + props.img;
    let decode = jwt.decode(localStorage.getItem('jwt') || '');
    //@ts-ignore
    let id_user = decode.id_user;
    return (
        <div className="cardprof2">
            <div className="avatar-image"><img src={imgUrl} alt={props.img}/></div>
            <p className="userprof user-name-card">{name}</p>
            <p className="userprof city-country">{props.city}, {props.country}</p>
            <p className="userprof profesion">{props.profesion}</p>
            <p className="userprof studies">{props.education}</p>
            <div className="aboutme-card descard">
                <p className="aboutme-card aboutt">About me</p>
                <p className="aboutme-card desciptionuser-card descroption">{props.description}</p>
            
            <div className="col s12 userphone userphone2">
                <i className="contacticon1 tiny material-icons icon-white">phone</i>{props.phone}
            </div>
            <div className="col s12 usermail usermail2">
                <i className="contacticon2 tiny material-icons icon-white">email</i>{props.mail}
            </div>
            </div>
        </div>
    );
}

export default IdCardsita;