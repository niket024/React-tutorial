import React, { Component } from 'react';
import { FormErrors } from './FormErrors';

import './Form.css';
const visible='none';

class Form extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            formErrors: { email: '', password: '' },
            emailValid: false,
            passwordValid: false,
            formValid: false,

        }
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value },
            () => { this.validateField(name, value) });
    }
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;

        switch (fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                break;
            case 'password':
                passwordValid = value.length >= 6;
                fieldValidationErrors.password = passwordValid ? '' : ' is too short';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            emailValid: emailValid,
            passwordValid: passwordValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({ formValid: this.state.emailValid && this.state.passwordValid });
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }
    loginSuccess() {
        alert("Login success!!");
        visible='block';
        console.log(visible);
    }

    render() {
        const classes = `inputStyle form-control center-block`
        const mystyle = {
            color: "red",
            width: "50%",
            marginLeft: "125px",
            textAlign: "center"
        };
        return (

            <form className="demoForm">
                <div className="text-center " style={{ display: visible}}>Login success!</div>
                <h2 className="text-center">Sign up</h2>
                <div className="panel panel-default" style={mystyle}>
                    <FormErrors formErrors={this.state.formErrors} />
                </div>
                <div className="text-center">

                    <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input type="email" required className={classes} name="email"
                                placeholder="Email"
                                value={this.state.email}
                                onChange={this.handleUserInput} />
                        </div>
                    </div>
                    <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className={classes} name="password"
                                placeholder="Password"
                                value={this.state.password}
                                onChange={this.handleUserInput} />
                        </div>
                    </div>
                    <button type="submit" disabled={!this.state.formValid} className="btn btn-primary" style={{ background: "blue" }} onClick={this.loginSuccess}>
                        Sign up
                    </button>
                </div>
            </form>
        )
    }
}
export default Form;