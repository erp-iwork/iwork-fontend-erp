import logo200Image from '../../assets/img/logo/Sparta.svg';
import React from 'react';
import { Button, Form, FormGroup, Input, Label, Container } from 'reactstrap';
import './styles.scss'
import actions from '../../store/hr/action'
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import SpinnerLoader from '../../components/loader'
import routes from '../../config/routes'
import Error from '../../components/error'

class AddAccount extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '', password: '', is_admin: false, redirect: false,
            account: this.props.location.state.account,
            errorUsername: false,
            errorPassword: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange = event => {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }

    handleSubmit = async event => {
        event.preventDefault()
        const { username, password, is_admin, account } = this.state

        var user = {}
        user['username'] = username
        user['password'] = password
        user['email'] = account.email
        user['employe'] = account.employeId
        user['department'] = account.department.departmentId
        user['role'] = account.roles.roleId
        user['claim'] = account.level.levelId
        user['is_admin'] = is_admin

        this.props.addAccount(user)

    }


    render() {
        if (this.props.it_register_success) {
            return <Redirect to={routes.itEmployeePage} />
        }
        if (this.state.redirect && this.props.success) return <Redirect to={routes.itEmployeePage} />
        return (
            <Container className="container">
                <Form onSubmit={this.handleSubmit} className="form" noValidate formNoValidate>
                    <div className="text-center pb-4">
                        <img
                            src={logo200Image}
                            className="rounded"
                            style={{ width: 60, height: 60, cursor: 'pointer' }}
                            alt="logo"
                        />
                    </div>
                    <FormGroup>
                        <Label for='username'>Username</Label>
                        <Input type='text' id="username" required name='username' onChange={this.handleChange} />
                        <Error error={this.props.errors.username ? this.props.errors.username : null} />
                        <Error error={this.props.errors.email ? this.props.errors.email : null} />
                    </FormGroup>
                    <FormGroup>
                        <Label for='password'>Password</Label>
                        <Input type='password' name="password" required onChange={this.handleChange} />
                        <Error error={this.props.errors.password ? this.props.errors.password : null} />
                    </FormGroup>
                    <FormGroup className="checkbox">
                        <Label for="is_admin">Is Admin?</Label>
                        <Input type="checkbox" name="is_admin" onClick={(e) => this.handleChange({ target: { name: 'is_admin', value: e.target.checked } })} />
                    </FormGroup>

                    <hr />
                    {this.props.loading ? (
                        <Button size="lg" color='primary' block>
                            <SpinnerLoader />
                        </Button>
                    ) : (
                            <Button size="lg" color='primary' block onClick={this.handleSubmit}>
                                Register Account
                            </Button>
                        )
                    }
                </Form>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        success: state.hrReducer.success,
        errors: state.hrReducer.errors,
        loading: state.hrReducer.loading,
        it_register_success: state.hrReducer.it_register_success
    }
}

const mapDispatchToProps = {
    addAccount: actions.addAccount
}

export default connect(mapStateToProps, mapDispatchToProps)(AddAccount)