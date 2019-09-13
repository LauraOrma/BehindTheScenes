import React from "react";
import { Link } from "react-router-dom";
import Icon from '@material-ui/core/Icon';
import "../styles/footer.css";
import "materialize-css/dist/css/materialize.min.css";  


const Footer: React.FC = () => {
 return (
    <footer className="page-footer">
    <div className="container">
      <div className="row">
        <div className="col l6 s12">
          <h5 className="white-text">Behind the Scenes</h5>
          <p className="grey-text text-lighten-4">Publicación de castings y base de datos de actores</p>
        </div>
        <div className="col l4 offset-l2 s12">
          <h5 className="white-text-footer">Contacta con nosotros a través de nuestras redes sociales:</h5>
          <ul>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
    </div>
    <div className="footer-copyright">
      <div className="container">
      © 2019 Behind The Scenes
      </div>
    </div>
  </footer>
 );
};

export default Footer;