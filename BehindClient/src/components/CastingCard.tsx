import React from 'react';
import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import "../styles/castingcards.css";
import {Link} from "react-router-dom";

function CastingCard(props: any) {
    let roleString: string = Number(props.rol) <= 1 ? 'role' : 'roles';
    let url: string = '/CastingId/' + props.id_casting;
    return (
        <div className="card cardcastingg horizontal">
            <div className="card-stacked">
                <div className="cat">
                    <p>{props.category}</p>
                </div>
                <div className="card-action titlename">
                    <Link to={url} className="castingname">{props.name}</Link>
                </div>
                <div className="card-content">
                    <p>{props.rol} {roleString}</p>
                    <p>{props.city}, {props.country}</p>
                </div>
            </div>
        </div>
    );
}

export default CastingCard;