import React from 'react';
//para usar ancora, tipo a href (to)
import { Link } from 'react-router-dom'; 

import './Header.css';

//importar as imagens
import logo from '../assets/logo.svg';
import camera from '../assets/camera.svg';

// import { Container } from './styles';

export default function Header() {
  return (
    //com as {} é possivel inserir javascript (variaveis, expresões...)
    <header id="main-header">
        <div className="header-content">
            <Link to="/">
                <img src={logo} alt="InstaVM" />
            </Link>
            <Link to="/new">
                <img src={camera} alt="Enviar Post" />
            </Link>
        </div>

    </header>
  );
}
