import React from 'react';
import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import "../styles/cardsita.css";
import ModalEdit from './ModalEdit';

const Cardsita = (props: any) => {
    let name = props.firstName + ' ' + props.lastName;
    let imgUrl = 'http://localhost:3040/' + props.img;
    return (
        <div className="cardprof">
            <div className="avatar-image">
                <img src={imgUrl} alt={props.img} />
            </div>
            <p className="userprof user-name-card">{name}</p>
            <p className="userprof city-country">{props.city}, {props.country}</p>
            <p className="userprof profesion">{props.profesion}</p>
            <p className="userprof studies">{props.education}</p>
            <div className="aboutme-card">
                <p className="aboutme-card aboutt">About me</p>
                <p className="aboutme-card desciptionuser-card">{props.description}</p>
            </div>
            <div className="col s12 userphone">
                <i className="contacticon1 tiny material-icons icon-white">phone</i>{props.phone}
            </div>
            <div className="col s12 usermail">
                <i className="contacticon2 tiny material-icons icon-white">email</i>{props.mail}
            </div>
            <div>
                <ModalEdit {...props} />
            </div>
            <div>
                <div>

                    <form
                        action={'http://localhost:3040/api/setProfileData/img/' + props.id_user}
                        method="post" encType="multipart/form-data">
                        <input name="img" className="upload-avatar-image subidasmall" type="file" />
                        <input name="url" type="hidden" value={window.location.href} className="upload-avatar-image" />
                        <input type="submit" className="Edit-button" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Cardsita;