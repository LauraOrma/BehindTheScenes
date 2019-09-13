import React from 'react';
import "../styles/usercardstyle.css";
import {Link} from "react-router-dom";


const RecipeReviewCard = (props: any) => {
    let name = props.firstname + ' ' + props.lastname;
    console.log(props);
    return (
        <div className="cardtalentsimportant">
            <div className="avatarimageusercard">
                <img src={'http://localhost:3040/' + props.img} alt={'profileImg' + props.id_user}/>
            </div>
            <div className="cardtalentsinfo">
                <p className="bigname2">{name}</p>
                <p className="professioncardcardgender2">{props.profesion}, {props.gender}</p>
                <p className="citiycardcard">{props.city}, {props.country}</p>
            </div>
            <div>
                <button className="seeprofilebtn2"><Link to={'/TalentProfile/'+props.id_user}> Ver Perfil </Link></button>
            </div>
        </div>
    );
};
export default RecipeReviewCard