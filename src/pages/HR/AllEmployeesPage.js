import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Button } from 'reactstrap'
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
            okModal: false,
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
    doSomething(employeId) {
        this.props.deleteEmploye(employeId);
        this.setState({
            okModal: true,
            modelShow: false

        })
    }
    cancel() {
        this.setState({
            modelShow: false
        })
    }
    deleteFun() {
        this.setState({
            modelShow: true
        })


    }

    render() {
        const employeeInfo = this.props.employees;

        if (this.props.fetch_loader) return <PageSpinner />

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
                                        {employeeInfo ?
                                            employeeInfo.map((employeeInfos, index) => (
                                                <tr align='left' key={index}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{employeeInfos.firstName + ' ' + employeeInfos.lastName}</td>
                                                    <td >{employeeInfos.email}</td>
                                                    <td>{employeeInfos.hiredDate}</td>
                                                    <td>{employeeInfos.telephone}</td>
                                                    <td>{employeeInfos.termOfEmployment}</td>
                                                    <td>
                                                        <Button size='sm' color='danger' onClick={() => this.deleteFun()}>
                                                            <MdDelete />
                                                        </Button>
                                                        {this.state.modelShow ? (<CustomModal doSomething={() => this.doSomething(employeeInfos.employeId)} cancel={() => this.cancel()} />) : null}
                                                        {this.props.okModal ? (<SuccessModal type="" title="Unable to delete" message="Unable to delete the data" okFun={() => this.okFun()} />) : null}
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

            </Page>


        );
    }
}

const mapStateToProps = (state) => {
    return {
        success: state.hrReducer.success,
        loading: state.hrReducer.loading,
        fetch_loader: state.hrReducer.fetch_loader,
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