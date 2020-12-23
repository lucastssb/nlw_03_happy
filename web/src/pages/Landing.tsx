import React from "react";
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';


import '../styles/pages/landing.css';

import logoImg from '../images/logo.svg';

export default function Landing() {
  return (
    <div id="page-landing">
      <div className="content-wrapper">
      <header>
        <img src={logoImg} alt="Happy" />
        <div className="location">
          <strong>João Pessoa</strong>
          <span>Paraíba</span>
        </div>
      </header>

        <main>
          <h1>Leve feliciade para o mundo</h1>
          <p>Visite os orfanatos e mude o dia de muitas crianças.</p>
        </main>

        <Link to="/login" className="restrictAreaAccessButton">
          <span>Acesso restrito</span>
        </Link>

        <Link to="/app" className="enter-app">
          <FiArrowRight size={26} color="rgba(0,0,0,0.6)" />
        </Link>
      </div>
    </div>
  );
};