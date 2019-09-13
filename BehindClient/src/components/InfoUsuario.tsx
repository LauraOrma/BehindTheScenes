import React from "react";
import "../styles/infousuario.css";
import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";

const InfoUsuario: React.FC = () => {

    return (
        <div className="more-info contact Blackbox">
            <p className="name">Peter Petercio</p>
            <p className="profesion">Actor</p>     
            <p className="phone">688 88 88 88</p>
            <p className="email">peter@peter.com</p>
            <p className="description">Aaksjkd adlñaskdlaskdj ñasldkjaslkdja ñalskdjaslkdjasldj ñaslkdjañlskdjañsk ñaklsdjñalskdjñaskdjaksjd alñksdjñaskdjakdsj</p>
        </div>
    );
};

export default InfoUsuario;