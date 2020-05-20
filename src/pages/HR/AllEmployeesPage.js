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

class AllEmployees extends Component {
    constructor(props) {
        super(props)
        this.state = {
            employeeInfo: []
        }
    }

    componentDidMount() {
        this.props.getEmploye()
    }

    deleteFun(employeId) {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this Action!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.value) {
            Swal.fire({
                title: "Delteing Account...",
                icon: "warning",
                showCancelButton: false,
                allowOutsideClick: false,
                showConfirmButton: false
            })
            this.props.deleteEmploye(employeId);
          }
        })
    }

    render() {
        if (this.props.loading) return <PageSpinner />
        if (this.props.employees.length === 0) return <h2>No employees yet.</h2>
        return (
            <Page
                title="All Employees"
                breadcrumbs={[{ name: 'All Employees', active: true }]}
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
                                        {this.props.employees.map((employeeInfos, index) => (
                                            <tr align='left' key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{employeeInfos.firstName + ' ' + employeeInfos.lastName}</td>
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
                                        ))}
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
      loading: state.hrReducer.loading,
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