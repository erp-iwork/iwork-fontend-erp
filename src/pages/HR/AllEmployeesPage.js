import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Button } from 'reactstrap'
import Page from '../../components/Page';
import { MdDelete } from "react-icons/md";
import { connect } from "react-redux"
import { Link } from 'react-router-dom'
import actions from '../../store/hr/action'
import routes from '../../config/routes'
import PageSpinner from '../../components/PageSpinner'
import ModelCusttom from '../popupNotification/customModal'
import SuccessModal from '../popupNotification/success'

class AllEmployees extends Component {
    constructor(props) {
        super(props)
        this.state = {
            employeeInfo: [],
            done: false,
            showModal: false,
            showSuccess: true,
            email: '',
        }
        this.cancel = this.cancel.bind(this)
        this.doSomething = this.doSomething.bind(this)
        this.okFun = this.okFun.bind(this)
        this.deleteFun = this.deleteFun.bind(this)
    }


    deleteFun(email) {

        this.setState({
            showModal: true
        })

        this.setState({
            email: email
        })

    }

    doSomething() {
        this.props.deleteEmploye(this.state.email);

    }
    cancel() {
        this.setState({
            showModal: false
        })
    }
    okFun() {
        this.setState({
            showSuccess: false,
        })
    }

    componentDidMount() {
        this.props.getEmploye()
    }



    render() {

        const employeeInfo = this.props.employees;

        if (this.props.fetch_employee_loading) return <PageSpinner />

        if (this.props.employees === null && this.props.success)
            return (
                <Page title="All Employees" breadcrumbs={[{ name: 'Human Resource', active: true }]} className="TablePage">
                    <h1>No Employees Yet.</h1>
                </Page>
            )
        return (
            <Page
                title="All Employees"
                breadcrumbs={[{ name: 'Human Resource', active: true }]}
                className="TablePage"
            >
                <Row>
                    <Col>
                        <Card className="mb-3">
                            <CardHeader>All Employees</CardHeader>
                            <CardBody>
                                <Table responsive>
                                    <thead>
                                        <tr  >
                                            <th>#</th>
                                            <th  >First Name</th>
                                            <th>Email</th>
                                            <th>Hired Date</th>
                                            <th>Phone Number</th>
                                            <th>Term Of Employment</th>
                                            <th colSpan={2} align="center">Account</th>


                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            employeeInfo ? employeeInfo.map((employeeInfos, index) => (
                                                <tr align='left' key={index}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td >{employeeInfos.firstName + " " + employeeInfos.lastName}</td>
                                                    <td >{employeeInfos.email}</td>
                                                    <td>{employeeInfos.hiredDate}</td>
                                                    <td>{employeeInfos.telephone}</td>
                                                    <td>{employeeInfos.termOfEmployment}</td>
                                                    <td>
                                                        <Button size='sm' color='danger' onClick={() => this.deleteFun(employeeInfos.employeId)}>
                                                            <MdDelete />
                                                        </Button>
                                                    </td>
                                                    <td>
                                                        <Link to={{
                                                            pathname: routes.employeeProfile,
                                                            state: employeeInfos.employeId
                                                        }}>
                                                            <Button size='sm' color='primary'>
                                                                See Profile
                                                                    </Button>
                                                        </Link>
                                                    </td>
                                                </tr>

                                            )) : null
                                        }
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                {this.props.delete_empoyee_success ? (<SuccessModal title={"Congratulations!"} message={"Employe deleted successfully"} show={this.state.showSuccess} okFun={this.okFun} />) : null}
                {this.state.showModal && !this.props.delete_empoyee_success ? (<ModelCusttom doSomething={this.doSomething} cancel={this.cancel} />) : null}
            </Page>


        );
    }
}

const mapStateToProps = (state) => {
    return {
        success: state.hrReducer.success,
        loading: state.hrReducer.loading,
        delete_empoyee_loading: state.hrReducer.delete_empoyee_loading,
        fetch_employee_loading: state.hrReducer.fetch_employee_loading,

        delete_empoyee_success: state.hrReducer.delete_empoyee_success,
        users: state.hrReducer.users,
        employees: state.hrReducer.employees,
        errors: state.hrReducer.errors
    }
}

const mapDispatchToProps = {
    getEmploye: actions.getEmploye,
    deleteEmploye: actions.deleteEmploye
}

export default connect(mapStateToProps, mapDispatchToProps)(AllEmployees)