import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Button } from 'reactstrap'
import Page from '../../components/Page';
import { MdCheckCircle } from "react-icons/md";
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
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.value) {
            this.props.deleteEmploye(employeId);
          }
        });
    }

    render() {
        if (!this.props.employees.length) return <PageSpinner />
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
                                        <tr>
                                            <th>#</th>
                                            <th>First Name</th>
                                            <th>Email</th>
                                            <th>Hired Date</th>
                                            <th>Phone Number</th>
                                            <th>Term Of Employment</th>
                                            <th colSpan={2} align="center">Account</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.props.employees.map((employeeInfos, index) => (
                                            <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{employeeInfos.firstName + ' ' + employeeInfos.lastName}</td>
                                                <td>{employeeInfos.email}</td>
                                                <td>{employeeInfos.hiredDate}</td>
                                                <td>{employeeInfos.telephone}</td>
                                                <td>{employeeInfos.termOfEmployment}</td>
                                                <td>
                                                    <Button color='success'>
                                                        <MdCheckCircle />
                                                    </Button>
                                                </td>
                                                <td>
                                                    <Link to={{
                                                        pathname: routes.employeeProfile,
                                                        state: employeeInfos.employeId
                                                    }}>
                                                        <Button color='primary'>
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