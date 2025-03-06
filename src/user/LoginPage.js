import React from 'react';
import Header from '../components/header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginPage.css';

function LoginPage() {
  return (
    <div className="login-page">
      <Header />
      <div className="login-container">
        <h2 className="login-title">Welcome back</h2>
        <p className="login-subtitle">Please log into your account</p>
        <form className="login-form">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Email or Username"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            Sign in
          </button>
        </form>
        <div className="login-footer">
          New customer? <a href="https://fake.link">Join PetDesigner</a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
