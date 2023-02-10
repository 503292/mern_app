import React, { useState, useEffect, useContext } from "react";
import { useHttp } from "../hooks/http.hook";
import {useMessage} from '../hooks/message.hook'
import {AuthContext} from '../context/AuthContext'

const AuthPage = () => {
  const auth = useContext(AuthContext)
  const { loading,error, request, clearError } = useHttp();
  const message = useMessage()
  const [form, setForm] = useState({ email: "", password: "" });

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])


  const changeHandle = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const registerHandle = async () => {
    try {
      const data = await request("/api/auth/register", "POST", { ...form });
      message(data.message)
    } catch (e) {}
  };
  const loginHandle = async () => {
    try {
      const data = await request("/api/auth/login", "POST", { ...form });
      auth.login(data.token, data.userId)
    } catch (e) {}
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h2>Укорочення ссилок</h2>
        <div className="card darken-1">
          <div className="card-content white-text">
            <span className="card-title">Авторизація</span>
            <div>
              <div className="input-field">
                <input
                placeholder="Введіть емейл"
                id="email"
                type="text"
                name="email"
                onChange={changeHandle}
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field">
                <input
                placeholder="Введіть пароль"
                  id="password"
                  type="text"
                  name="password"
                  onChange={changeHandle}
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              onClick={loginHandle}
              className="btn yellow darken-4"
              style={{ marginRight: "10px" }}
              disabled={loading}
            >
              Ввійти
            </button>

            <button
              onClick={registerHandle}
              className="btn grey lighten-1 black-text"
              disabled={loading}
            >
              Реєстрація
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
