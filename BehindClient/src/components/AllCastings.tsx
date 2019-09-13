import React, {useEffect} from "react";
import {Link, RouteComponentProps} from 'react-router-dom'
import "../styles/allcastings.css";
import "../styles/allcastingscards.css";
import NavbarProfile from "./NavbarProfile";
import AllCastingsCards from "./AllCastingsCards";
import {ICasting} from "../_interfaces/interfaceICasting";
import {IGlobalState} from "../_reducers/reducer";
import * as actions from "../_actions/actions";
import {connect} from "react-redux";
import Footer from "./Footer";

interface IProps {
}

interface IPropsGlobal {
    token: string
    setCasting: (casting: ICasting[]) => void;
    casting: ICasting[];
}

const AllCastings: React.FC<IProps & IPropsGlobal & RouteComponentProps> = props => {
    useEffect(() => {
        fetch("http://localhost:3040/api/getAllCastings", {
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

    return (
        <div>
            <NavbarProfile history={props.history} location={props.location} match={props.match}/>
            <div className="all-castings">
                <div className="slogan-text">
                    <div className="Big-big-Slogan">
                        ¿Buscando un nuevo papel?
                    </div>
                    <div className="Medium-medium-Slogan">
                        Tenemos nuevos castings que podrían interesarte.
                    </div>
                </div>
            </div>
            <div className="important">
                <Link className="important" to="/CreateCasting">¿Buscas personas para tu proyecto? Agrega un casting
                    desde aquí. </Link>
            </div>
            <div className="container row all-castings-cards">

                {props.casting.map(casting => (
                    <div className="col s6" key={casting.id_casting}>
                        <AllCastingsCards key={casting.id_casting}
                                          category={casting.category} name={casting.name} rol={casting.rol}
                                          city={casting.city} id_casting={casting.id_casting} country={casting.country}
                                          description={casting.description} dateadd={casting.dateadd}/>
                    </div>
                ))}

            </div>
            <Footer/>
        </div>
    );
};
const mapStateToProps = (state: IGlobalState) => ({
    token: state.token,
    casting: state.casting,
});

const mapDispatchToProps = {
    setToken: actions.setToken,
    setCasting: actions.setCasting,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AllCastings);