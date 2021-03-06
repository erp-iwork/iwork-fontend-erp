import React, { Component } from 'react'
import Page from '../../components/Page'
import {
    Button, Card, CardBody, CardHeader, Col, Form,
    FormGroup, Input, Label, Row
} from 'reactstrap'
import Error from '../../components/error'
import CustomAlert from '../../components/error/Alert'
import { connect } from "react-redux"
import actions from '../../store/hr/action'
import { countries, regions, termsOfEmployment, getCity } from './data'
import Spinner from '../../components/loader'
import AllEmployees from './AllEmployeesPage'
import PageSpinner from '../../components/PageSpinner'

class AddEmployee extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: "", lastName: "", email: "", telephone: "",
            termOfEmployment: "", country: "", city: "", region: "",
            birthDate: "", hiredDate: "", depValue: "", rolValue: "",
            levValue: "", gender: "",
            deps: [],
            rol: [],
            lev: [],
            username: "",
            password: "",
            complete: true,
            redirect: false,
            lockPage: false
        }
        this.submit = this.submit.bind(this)
        this.departmentDropDown = this.departmentDropDown.bind(this)
        this.levelDropDown = this.levelDropDown.bind(this)
        this.roleDropDown = this.roleDropDown.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.deleteFun = this.deleteFun.bind(this)
    }

    componentDidMount() {
        this.props.getDepartment()
        this.props.getEmploye()
    }



    submit = () => {
        this.setState({ complete: false, lockPage: false })
        this.props.addNewEmployee(this.state)
    }

    departmentDropDown(e) {
        this.setState({
            depValue: e.target.value,
        });
        this.props.department.forEach((value) => {
            if (
                value.departmentId === parseInt(e.target.value) &&
                value.department_roles !== null
            ) {
                this.setState({
                    rol: value.department_roles,
                });
            }
        });
    }

    roleDropDown(e) {
        this.setState({
            rolValue: e.target.value,
        });
        this.state.rol.forEach((value) => {
            if (value.roleId === parseInt(e.target.value) && value.role_levels != null) {
                this.setState({ lev: value.role_levels })
            }
        })
    }

    levelDropDown(e) {
        this.setState({
            levValue: e.target.value,
        });
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }
    deleteFun(employeId) {
        this.props.deleteEmploye(employeId)
    }
    render() {
        const {
            country, region, firstName, lastName, email, birthDate, city, telephone,
            termOfEmployment, depValue, levValue, rolValue, hiredDate, gender
        } = this.state


        if (this.props.fetch_department_loading) return <PageSpinner />
        else if (this.props.department.length === 0) return <h2>No departments. Please add departments. </h2>

        return (
            <>
                <Page
                    title="Add Employee"
                    breadcrumbs={[{ name: 'Human Resource', active: true }]}
                    className="FormPage"
                >
                    <Col lg={12} md={24}>
                        <Card>
                            <CardHeader>Add employee</CardHeader>
                            <CardBody>
                                <Form>
                                    <Row>
                                        <Col md={6}>
                                            <FormGroup >
                                                <Label for="exampleEmail" sm={5}>
                                                    First Name
                                            </Label>
                                                <Col sm={12}>
                                                    <Input
                                                        name="firstName"
                                                        placeholder="First Name"
                                                        onChange={this.handleChange}
                                                        value={firstName}
                                                    />
                                                    <Error
                                                        error={
                                                            this.props.errors.firstName
                                                                ? this.props.errors.firstName
                                                                : null
                                                        }
                                                    />
                                                </Col>
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="examplePassword" sm={5}>
                                                    Last Name
                                            </Label>
                                                <Col sm={12}>
                                                    <Input
                                                        name="lastName"
                                                        placeholder=" Last Name"
                                                        onChange={this.handleChange}
                                                        value={lastName}
                                                    />
                                                    <Error
                                                        error={
                                                            this.props.errors.lastName
                                                                ? this.props.errors.lastName
                                                                : null
                                                        }
                                                    />
                                                </Col>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <FormGroup >
                                                <Label for="exampleEmail" sm={5}>
                                                    Email
                                            </Label>
                                                <Col sm={12}>
                                                    <Input
                                                        name="email"
                                                        placeholder="Email"
                                                        onChange={this.handleChange}
                                                        value={email}
                                                    />
                                                    <Error
                                                        error={
                                                            this.props.errors.email ? this.props.errors.email : null
                                                        }
                                                    />
                                                </Col>
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="examplePassword" sm={5}>
                                                    Phone Number
                                            </Label>
                                                <Col sm={12}>
                                                    <Input
                                                        name="telephone"
                                                        placeholder="Phone Number"
                                                        onChange={this.handleChange}
                                                        value={telephone}
                                                    />
                                                    <Error
                                                        error={
                                                            this.props.errors.telephone
                                                                ? this.props.errors.telephone
                                                                : null
                                                        }
                                                    />
                                                </Col>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <FormGroup >
                                                <Label for="exampleEmail" sm={5}>
                                                    Birthdate
                                            </Label>
                                                <Col sm={12}>
                                                    <Input
                                                        type="date"
                                                        name="birthDate"
                                                        placeholder="Birth Date"
                                                        onChange={this.handleChange}
                                                        value={birthDate}
                                                    />
                                                    <Error
                                                        error={
                                                            this.props.errors.birthDate
                                                                ? this.props.errors.birthDate
                                                                : null
                                                        }
                                                    />
                                                </Col>
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="exampleSelect" sm={5}>
                                                    Gender
                                            </Label>
                                                <Col sm={12}>
                                                    <Input type="select" value={gender} name="gender" onChange={this.handleChange}>
                                                        <option value="" selected disabled>Select Gender </option>
                                                        <option>Male</option>
                                                        <option>Female</option>
                                                    </Input>
                                                </Col>
                                                <Error
                                                    error={
                                                        this.props.errors.gender
                                                            ? this.props.errors.gender
                                                            : null
                                                    }
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={4}>
                                            <FormGroup>
                                                <Label for="exampleSelect" sm={5}>
                                                    Department
                                            </Label>
                                                <Col sm={12}>
                                                    <Input type="select" onChange={this.departmentDropDown} value={depValue}>
                                                        <option aria-label="dep" selected disabled value="" > Select Department </option>
                                                        {this.props.department.map((dep, index) => (
                                                            <option value={dep.departmentId} key={index}>
                                                                {dep.departmentName}
                                                            </option>
                                                        ))}
                                                    </Input>
                                                    <Error
                                                        error={
                                                            this.props.errors.department
                                                                ? this.props.errors.department
                                                                : null}
                                                    />
                                                </Col>
                                            </FormGroup>
                                        </Col>
                                        <Col md={4}>
                                            <FormGroup>
                                                <Label for="exampleSelect" sm={5}>
                                                    Role
                                            </Label>
                                                <Col sm={12}>
                                                    <Input type="select" id='test' onChange={this.roleDropDown} value={rolValue}>
                                                        <option aria-label="None" disabled selected > Select Role</option>
                                                        {this.state.rol.map((rols) => (
                                                            <option value={rols.roleId} key={rols.roleId}>
                                                                {rols.role}
                                                            </option>
                                                        ))}
                                                    </Input>
                                                    <Error
                                                        error={
                                                            this.props.errors.roles ? this.props.errors.roles : null}
                                                    />
                                                </Col>
                                            </FormGroup>
                                        </Col>
                                        <Col md={4}>
                                            <FormGroup>
                                                <Label for="exampleSelect" sm={5}>
                                                    Level
                                            </Label>
                                                <Col sm={12}>
                                                    <Input type="select" id='test1' onChange={this.levelDropDown} value={levValue}>
                                                        <option aria-label="None" disabled selected value="" >Select Level</option>
                                                        {this.state.lev.map((levs) => (
                                                            <option value={levs.levelId} key={levs.levelId}>
                                                                {levs.level}
                                                            </option>
                                                        ))}
                                                    </Input>
                                                    <Error
                                                        error={
                                                            this.props.errors.level ? this.props.errors.level : null
                                                        }
                                                    />
                                                </Col>
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col md={6}>
                                            <FormGroup >
                                                <Label for="exampleEmail" sm={5}>
                                                    Hired Date
                                            </Label>
                                                <Col sm={12}>
                                                    <Input
                                                        name="hiredDate"
                                                        type="date"
                                                        onChange={this.handleChange}
                                                        value={hiredDate}
                                                    />
                                                    <Error
                                                        error={
                                                            this.props.errors.hiredDate
                                                                ? this.props.errors.hiredDate
                                                                : null
                                                        }
                                                    />
                                                </Col>
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="exampleSelect" sm={5}>
                                                    Term Of Employment
                                            </Label>
                                                <Col sm={12}>
                                                    <Input type="select" name="termOfEmployment" value={termOfEmployment} onChange={this.handleChange}>
                                                        <option aria-label="None" selected disabled value="" > Select Term Of Employment</option>
                                                        {termsOfEmployment.map((item, index) => (
                                                            <option key={index} value={item}>{item}</option>
                                                        ))}
                                                    </Input>
                                                    <Error
                                                        error={
                                                            this.props.errors.termOfEmployment
                                                                ? this.props.errors.termOfEmployment
                                                                : null
                                                        }
                                                    />
                                                </Col>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={4}>
                                            <FormGroup>
                                                <Label for="exampleSelect" sm={5}>Country</Label>
                                                <Col sm={12}>
                                                    <Input type="select" name="country" value={country} onChange={this.handleChange}>
                                                        <option aria-label="None" selected disabled value="" >Select Country</option>
                                                        {countries.map((item, index) => (
                                                            <option key={item} value={item}>{item}</option>
                                                        ))}
                                                    </Input>
                                                    <Error
                                                        error={
                                                            this.props.errors.country
                                                                ? this.props.errors.country
                                                                : null
                                                        }
                                                    />
                                                </Col>
                                            </FormGroup>
                                        </Col>
                                        <Col md={4}>
                                            <FormGroup>
                                                <Label for="exampleSelect" sm={5}>Region</Label>
                                                <Col sm={12}>
                                                    <Input type="select" name="region" value={region} onChange={this.handleChange}>
                                                        <option aria-label="None" value="" disabled selected > Select Region</option>
                                                        {this.state.country ?
                                                            regions[this.state.country].map((item, index) => (
                                                                <option key={item} value={item}>{item}</option>
                                                            )) : ""
                                                        }
                                                    </Input>
                                                    <Error
                                                        error={
                                                            this.props.errors.region
                                                                ? this.props.errors.region
                                                                : null
                                                        }
                                                    />
                                                </Col>
                                            </FormGroup>
                                        </Col>
                                        <Col md={4}>
                                            <FormGroup>
                                                <Label for="exampleSelect" sm={5}>City</Label>
                                                <Col sm={12}>
                                                    <Input type="select" name="city" onChange={this.handleChange} value={city}>
                                                        <option aria-label="None" disabled selected value="" >Select City</option>
                                                        {this.state.country ?
                                                            getCity(region, country).map((item, index) => (
                                                                <option key={item} value={item}>{item}</option>
                                                            )) : ""
                                                        }
                                                    </Input>
                                                    <Error
                                                        error={
                                                            this.props.errors.city ? this.props.errors.city : null
                                                        }
                                                    />
                                                </Col>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <FormGroup row align='center'>
                                        <Col>
                                            <Button color='primary' onClick={this.submit}>
                                                {this.props.post_employee_loading ? <Spinner /> : "Add Employee"}
                                            </Button>
                                        </Col>
                                    </FormGroup>
                                </Form>
                            </CardBody>
                        </Card>
                        {
                            this.props.post_employee_success ? (
                                <CustomAlert type={"success"} msg={"Congratulations! your data registered successfully!"}
                                />
                            ) : null

                        }
                    </Col>

                    <AllEmployees />

                </Page>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        employees: state.hrReducer.employees,
        errors: state.hrReducer.errors,
        department: state.hrReducer.department,

        delete_empoyee_success: state.hrReducer.delete_empoyee_success,
        fetch_employee_success: state.hrReducer.fetch_employee_success,
        fetch_department_success: state.hrReducer.fetch_department_success,
        post_employee_success: state.hrReducer.post_employee_success,
        fetch_single_employee_success: state.hrReducer.fetch_single_employee_success,

        delete_empoyee_loading: state.hrReducer.delete_empoyee_loading,
        fetch_employee_loading: state.hrReducer.fetch_employee_loading,
        fetch_department_loading: state.hrReducer.fetch_department_loading,
        post_employee_loading: state.hrReducer.post_employee_loading,
        fetch_single_employee_loading: state.hrReducer.fetch_single_employee_loading,
    };
}

const mapDispatchToProps = {
    addNewEmployee: actions.addNewEmployee,
    getEmploye: actions.getEmploye,
    getDepartment: actions.getDepartment,
    deleteEmploye: actions.deleteEmploye
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEmployee)