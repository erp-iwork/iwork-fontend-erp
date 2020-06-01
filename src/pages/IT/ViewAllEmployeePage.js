import React, { Component } from 'react'
import {
    Card, CardBody, CardHeader, Col, Table, Button, Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from 'reactstrap'
import Page from '../../components/Page'
import { MdLibraryAdd } from "react-icons/md"
import { Link } from 'react-router-dom'
import { connect } from "react-redux"
import actions from '../../store/it/action'
import routes from '../../config/routes'
import PageSpinner from '../../components/PageSpinner'
import ModelCusttom from '../popupNotification/customModal'
import SuccessModal from '../popupNotification/success'

class AllEmployees extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modal: false,
            modal_backdrop: false,
            modal_nested_parent: false,
            modal_nested: false,
            backdrop: true,
            showModal: false,
            showSuccess: true,
            email: '',
        };
        this.cancel = this.cancel.bind(this)
        this.doSomething = this.doSomething.bind(this)
        this.okFun = this.okFun.bind(this)

    }
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
        this.setState({
            showModal: true
        })
        this.setState({
            email: email
        })

    }

    doSomething() {
        this.props.deleteAccount(this.state.email);

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
        this.props.getUsers()
    }

    render() {
        if (this.props.get_user_loading) return <PageSpinner />
        if (this.props.users.length === 0) return <h2>No employees yet.</h2>
        return (
            <Page
                title="All Employees"
                breadcrumbs={[{ name: 'IT', active: true }]}
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
                                    <tr align='left'>
                                        <th>#</th>
                                        <th>Full Name</th>
                                        <th>Email</th>
                                        <th>Hired Date</th>
                                        <th>Phone Number</th>
                                        <th>Term Of Employment</th>
                                        <th align='center'>Account</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.users.map((employeeInfos, index) => (
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{employeeInfos.firstName + ' ' + employeeInfos.lastName}</td>
                                            <td>{employeeInfos.email}</td>
                                            <td>{employeeInfos.hiredDate}</td>
                                            <td>{employeeInfos.telephone}</td>
                                            <td >{employeeInfos.termOfEmployment}</td>
                                            <td >
                                                {employeeInfos.has_account ? (
                                                    <Button size='sm' onClick={() => this.deleteFun(employeeInfos.email)}>Delete</Button>
                                                ) : (
                                                        <Link to={{ pathname: routes.addAccount, state: { account: employeeInfos } }}>
                                                            <Button size='sm' color='primary'>
                                                                <MdLibraryAdd />
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
                {this.props.delete_user_success ? (<SuccessModal title={"Congratulations!"} message={"Account deleted successfully"} show={this.state.showSuccess} okFun={this.okFun} />) : null}
                {this.state.showModal && !this.props.delete_user_success ? (<ModelCusttom doSomething={this.doSomething} cancel={this.cancel} />) : null}
            </Page>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        errors: state.itReducer.errors,
        users: state.itReducer.users,
        delete_user_loading: state.itReducer.delete_user_loading,
        get_user_loading: state.itReducer.get_user_loading,

        delete_user_success: state.itReducer.delete_user_success,
        get_user_success: state.itReducer.get_user_success
    };
}

const mapDispatchToProps = {
    addAccount: actions.addAccount,
    getUsers: actions.getUsers,
    deleteAccount: actions.deleteAccount,
}

export default connect(mapStateToProps, mapDispatchToProps)(AllEmployees)