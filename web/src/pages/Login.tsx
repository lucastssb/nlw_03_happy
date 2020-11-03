import React, { useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import api from "../services/api";

import "../styles/pages/login.css";

import logoImg from "../images/logo-login-page.svg";


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  function handleLogin(event: FormEvent) {
    event.preventDefault();

    api.post('auth/login', {
      email: email,
      password: password,
    }).then(response => {
      console.log(response);
    })
    
    
  }

  return (
    <div id="login-page">
      <main>
        <img src={logoImg} alt="Happy" />
        <div className="location">
          <strong>João Pessoa</strong>
          <span>Paraíba</span>
        </div>
      </main>
      <div id="login-form">
        <form onSubmit={handleLogin} className="create-login-form">
          <fieldset>

            <legend>Fazer login</legend>

            <div className="input-block">
              <label htmlFor="email">Email</label>
              <input 
                value={email}
                onChange={event => setEmail(event.target.value)}
                type="text" 
                id="email" 
              />
            </div>

            <div className="input-block">
              <label htmlFor="password">Senha</label>
              <input 
                value={password}
                onChange={event => setPassword(event.target.value)}
                type="password" 
                id="password" 
              />
            </div>

            <div className="options-block">
                <label className="remember-login">
                    <input type="checkbox" id="remember"/>
                    <span className="checkbox-custom">Lembrar-me</span>
                </label>
                <Link to="/">Esqueci minha senha</Link>
            </div>

          </fieldset>
          <button className="confirm-button" type="submit">
            Entrar
          </button>
        </form>
        <Link to="/" className="back-button">
          <FiArrowLeft size={26} color="#15C3D6" />
        </Link>
      </div>
    </div>
  );
}
