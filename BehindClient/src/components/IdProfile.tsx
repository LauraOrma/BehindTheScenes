import React, {useEffect} from "react";
import {RouteComponentProps} from 'react-router-dom'
import "../styles/navbar.css";
import "../styles/profilepage.css";
import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import NavbarProfile from './NavbarProfile';
import IdCardsita from "./IdCardsita";
import YoutubeVideo from "./YoutubeVideo";
import Footer from "./Footer";
import {ICasting} from "../_interfaces/interfaceICasting";
import {IUser} from "../_interfaces/interfaceIUser";
import {IGlobalState} from "../_reducers/reducer";
import * as actions from "../_actions/actions";
import {connect} from "react-redux";

interface IProps {
}

interface IPropsGlobal {
    token: string;
    email: string;
    setCasting: (casting: ICasting[]) => void;
    casting: ICasting[];
    setUser: (user: IUser[]) => void;
    user: IUser[];
}

const IdProfile: React.FC<IProps & IPropsGlobal & RouteComponentProps> = props => {
    useEffect(() => {
        // @ts-ignore
        let id = props.match.params.id;
        fetch("http://localhost:3040/api/getProfileData", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id
            })
        }).then(response => {
            if (response.ok) {
                response.json().then(user => {
                        props.setUser(user);
                    }
                )
            }
        });
    }, []);

    if (props.user.length !== 1) {
        return (<div/>)
    } else {
        const me = props.user[0];
        let name = me.firstName + ' ' + me.lastName;
        let cv: string = me.curriculum !== '' ? 'http://localhost:3040/' + me.curriculum : window.location.href;
        return (
            <div>
                <NavbarProfile history={props.history} location={props.location} match={props.match}/>
                <div className="general">
                    <div className="top-image"/>
                    <div className="container">
                        <div className="row">
                            <div className="col s4 cardsita">
                                <IdCardsita firstName={me.firstName} lastName={me.lastName} city={me.city}
                                            country={me.country} profesion={me.profesion} education={me.education}
                                            description={me.description} phone={me.phone} mail={me.email}
                                            img={me.profile_img} id_user={me.id_user} {...props}/>
                            <div >
                                <i className="material-icons small icon-white pdf">picture_as_pdf</i><a className="pdf" href={cv}>Descargar CV</a>    
                            </div>
                            
                            </div>
                            <div className="col s5 nameuser-prof">
                                {name}
                                <p className="videobook-title"><i
                                    className="material-icons left prefix">share</i>{name} Videobook</p>
                            </div>
                            <div className="col s3">
                            </div>
                            <div className="col s4">
                            </div>
                            <div className="col s8 video">
                                <YoutubeVideo video={me.videobook}/>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
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
)(IdProfile);