import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { loginAction } from '../../store/actions/authActions';

const Login = (props) => {
    const { login } = props;
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        login({username, password})
            .then(() => {
                history.push('/dashboard');
            })
            .catch(e => {
                setErrorMessage(e?.response?.data?.message || 'Something went wrong');
                console.log(e);
            })
    }

    return (
      <div>
        <div className="d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                <div className="brand-logo">
                    <h3 style={{color: '#000'}}>Eco-Admin</h3>
                </div>
                <h4>Hello! let's get started</h4>
                <h6 className="font-weight-light">Sign in to continue.</h6>
                <Form className="pt-3" onSubmit={handleSubmit}>
                  <Form.Group className="d-flex search-field">
                    <Form.Control 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        type="text"
                        placeholder="Username"
                        size="lg"
                        className="h-auto"
                    />
                  </Form.Group>
                  <Form.Group className="d-flex search-field">
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        size="lg"
                        className="h-auto"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                  {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
                  <div className="mt-3">
                    <button className="btn btn-block btn-primary btn-ln font-weight-medium auth-form-btn" type="submit">SIGN IN</button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>  
      </div>
    );
};

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = {
    login: loginAction
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
