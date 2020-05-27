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
        if (username.length <= 0) this.setState({ errorUsername: true })
        if (password.length <= 0) this.setState({ errorPassword: true })
        if (!this.state.errorUsername && !this.state.errorPassword) {
            var user = {}
            user['username'] = username
            user['password'] = password
            user['email'] = account.email
            user['employe'] = account.employeId
            user['department'] = account.department.departmentId
            user['role'] = account.roles.roleId
            user['claim'] = account.level.levelId
            user['is_admin'] = is_admin
            await this.props.addAccount(user)
            this.setState({ redirect: true })
        }
    }

    render() {
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
                        {this.state.errorUsername ? <Label style={{ color: "red" }}>Username is required</Label> : ""}
                    </FormGroup>
                    <FormGroup>
                        <Label for='password'>Password</Label>
                        <Input type='password' name="password" required onChange={this.handleChange} />
                        {this.state.errorPassword ? <Label style={{ color: "red" }}>Password is required</Label> : ""}
                    </FormGroup>
                    {/* <FormGroup className="checkbox">
                        <Label for="is_admin">Is Admin?</Label>
                        <Input type="checkbox" name="is_admin" onClick={(e) => this.handleChange({ target: { name: 'is_admin', value: e.target.checked } })} />
                    </FormGroup> */}
                    <Error error={this.props.errors.username} />
                    <hr />
                    {this.props.loading ? (
                        <Button size="lg" className="bg-gradient-theme-left border-0" block>
                            <SpinnerLoader />
                        </Button>
                    ) : (
                            <Button size="lg" className="bg-gradient-theme-left border-0" block onClick={this.handleSubmit}>
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
        loading: state.hrReducer.loading
    }
}

const mapDispatchToProps = {
    addAccount: actions.addAccount
}

export default connect(mapStateToProps, mapDispatchToProps)(AddAccount)