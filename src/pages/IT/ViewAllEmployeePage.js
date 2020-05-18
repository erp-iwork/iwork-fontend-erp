import React, { Component } from 'react'
import {
    Card, CardBody, CardHeader, Col, Table, Button, Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from 'reactstrap'
import Page from '../../components/Page' 
import { MdCheckCircle } from "react-icons/md"
import { Link } from 'react-router-dom'
import { connect } from "react-redux"
import Swal from "sweetalert2"
import actions from '../../store/hr/action'
import routes from '../../config/routes'
import PageSpinner from '../../components/PageSpinner'

class AllEmployees extends Component {
    state = {
        modal: false,
        modal_backdrop: false,
        modal_nested_parent: false,
        modal_nested: false,
        backdrop: true,
    };

    toggle = modalType => () => {
        if (!modalType) {
            return this.setState({
                modal: !this.state.modal,
            });
        }

        this.setState({
            [`modal_${modalType}`]: !this.state[`modal_${modalType}`],
        });
    }; 

    deleteFun(email) {
        Swal.fire({
          title: "Are you sure?",
          text: "This user will be deleted permamently!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.value) {
            this.props.deleteAccount(email);
          }
        });
    }

    componentDidMount() {
        this.props.getEmploye()
    }

    render() {
        if (!this.props.employees[0]) return <PageSpinner />
        return (
            <Page
                title="All Employees"
                breadcrumbs={[{ name: 'All Employees', active: true }]}
                className="TablePage">
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle()}
                    className={this.props.className}>
                    <ModalHeader toggle={this.toggle()}>Modal title</ModalHeader>
                    <ModalBody>
                        Create An Account For <b>Mark</b> as a Something!!
                  </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggle()}>
                            Cancel
                    </Button>{' '}
                        <Button color="primary" onClick={this.toggle()}>
                            Create
                    </Button>
                    </ModalFooter>
                </Modal>

                <Col>
                    <Card className="mb-4">
                        <CardHeader>All Employees</CardHeader>
                        <CardBody>
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Full Name</th>
                                        <th>Email</th>
                                        <th>Hired Date</th>
                                        <th>Phone Number</th>
                                        <th>Term Of Employment</th>
                                        <th>Account</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.employees.map((employeeInfos, index) => (
                                        <tr key={index}>
                                            <th scope="row">{employeeInfos.employeId}</th>
                                            <td>{employeeInfos.firstName + ' ' + employeeInfos.lastName}</td>
                                            <td>{employeeInfos.email}</td>
                                            <td>{employeeInfos.hiredDate}</td>
                                            <td>{employeeInfos.telephone}</td>
                                            <td>{employeeInfos.termOfEmployment}</td>
                                            <td>
                                                {employeeInfos.has_account? (
                                                    <Button onClick={() => this.deleteFun(employeeInfos.email)}>Delete</Button>
                                                ): (
                                                    <Link to={{ pathname: routes.addAccount, state: { account: employeeInfos } }}>
                                                        <Button color='primary'>
                                                            <MdCheckCircle />
                                                        </Button>
                                                    </Link>
                                                )}
                                            </td>
                                            <td>
                                                <Link to={{ pathname: routes.employeeProfile, state: employeeInfos.employeId }}>
                                                    <Button
                                                        size='sm'
                                                        color='primary'>
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
            </Page>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      loading: state.hrReducer.loading,
      users: state.hrReducer.users,
      employees: state.hrReducer.employees,
      errors: state.hrReducer.errors,
    };
}

const mapDispatchToProps = {
    addAccount: actions.addAccount,
    getEmploye: actions.getEmploye,
    deleteAccount: actions.deleteAccount,
}

export default connect(mapStateToProps, mapDispatchToProps)(AllEmployees)