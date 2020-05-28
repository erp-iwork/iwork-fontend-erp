import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Button, Spinner } from 'reactstrap'
import Page from '../../components/Page';
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2"
import { connect } from "react-redux"
import { Link } from 'react-router-dom'
import actions from '../../store/hr/action'
import routes from '../../config/routes'
import PageSpinner from '../../components/PageSpinner'
import CustomModal from '../popupNotification/customModal';
import SuccessModal from "../popupNotification/success"

class AllEmployees extends Component {
    constructor(props) {
        super(props)
        this.state = {
            employeeInfo: [],
            done: false,
            modelShow: false,
            okModal: true,
            isConfirmed: false,
            employeId: '',


        }
    }

    componentDidMount() {
        this.props.getEmploye()
    }


    okFun() {
        this.setState({
            modelShow: false,
            okModal: false,

        })
    }
    doSomething() {
        this.setState({
            modelShow: false,
        })
        const employe = this.state.employeId;
        // this.props.deleteEmploye(employe);

    }
    cancel() {
        this.setState({
            modelShow: false
        })
    }

    deleteFun(employeId) {
        this.setState({
            modelShow: true,
            employeId: employeId

        })
    }

    render() {
        const employeeInfo = this.props.employees;
        const deleteSuccess = this.props.employee_delete_success;
        const deleteLoader = this.props.employee_delete_loader;
        console.log(deleteLoader);



        if (this.props.employee_fetch_loader) return <PageSpinner />

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
                className="TablePage">
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
                                        {employeeInfo ?
                                            employeeInfo.splice(0).reverse().map((employeeInfos, index) => (
                                                <tr align='left' key={index}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{employeeInfos.firstName + ' ' + employeeInfos.lastName}</td>
                                                    <td >{employeeInfos.email}</td>
                                                    <td>{employeeInfos.hiredDate}</td>
                                                    <td>{employeeInfos.telephone}</td>
                                                    <td>{employeeInfos.termOfEmployment}</td>
                                                    <td>
                                                        <Button size='sm' color='danger' onClick={() => this.deleteFun(employeeInfos.employeId)}>
                                                            {
                                                                deleteLoader ? (
                                                                    console.log(employeeInfos.firstName),

                                                                    <Spinner />
                                                                ) : <MdDelete />
                                                            }
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
                                            )) : null}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                {deleteSuccess ? (<SuccessModal show={this.state.okModal} type="Deleted" title="Deleted" message="Your data deleted successfully" okFun={() => this.okFun()} />) : null}
                {this.state.modelShow ? (<CustomModal doSomething={() => this.doSomething()} cancel={() => this.cancel()} />) : null}

            </Page>


        );
    }
}

const mapStateToProps = (state) => {
    return {
        success: state.hrReducer.success,
        loading: state.hrReducer.loading,
        employee_fetch_loader: state.hrReducer.employee_fetch_loader,
        employee_fetch_success: state.hrReducer.employee_fetch_success,
        employee_delete_loader: state.hrReducer.employee_delete_loader,
        employee_delete_success: state.hrReducer.employee_delete_success,
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