import React, { Component } from 'react';
import Page from '../../components/Page';
import { Card, CardBody, CardHeader, Col, Modal, ModalFooter, Table, Row, Button, ModalHeader, ModalBody } from 'reactstrap';
import { MdDelete, MdRemoveRedEye } from "react-icons/md";
import { connect } from 'react-redux'
import { deleteCompany, getCompany } from '../../store/company/action'
import PageSpinner from '../../components/PageSpinner'
import Swal from "sweetalert2"
import './Finance.scss'

const Customer = ({ company, index, deleteCompany, toggle }) => {
    return (
        <tr >
            <th scope="row">{index + 1}</th>
            <td>{company.customerName}</td>
            <td>{company.generalManger}</td>
            <td>{company.email}</td>
            <td>{company.contactPerson}</td>
            <td>{company.workingField}</td>
            <td>{company.paymentOption}</td>
            <td>{company.tinNumber}</td>
            <td >
                <Row >
                    <Button color='danger' size='sm' onClick={() => deleteCompany(company.customerId)} className='spacing'>
                        <MdDelete />
                    </Button>
                    <Button onClick={() => toggle(company)} color='primary' size='sm' >
                        <MdRemoveRedEye />
                    </Button>
                </Row>
            </td>
        </tr>
    )
}

class ViewAllCustomersPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companies: [],
            modal: false,
            customer: {
                customerName: '', generalManger: '', email: '', contactPerson: '',
                workingField: '', paymentOption: '', tinNumber: ''
            }
        }
        this.deleteCustomer = this.deleteCustomer.bind(this)
        this.toggle = this.toggle.bind(this)
    }

    async componentDidMount() {
        if (!this.props.lists) {
            await this.props.getCompany()
        }
    }

    toggle = (customer) => {
        return this.setState({
            modal: !this.state.modal,
            customer: !this.state.modal ? customer : this.state.customer
        })
    }

    deleteCustomer(id) {
        this.props.deleteCompany(id).then(res => {
            if (res) {
                Swal.fire({
                    title: "Delteing Account...",
                    icon: "warning",
                    position: 'top-right',
                    showCancelButton: false,
                    allowOutsideClick: false,
                    showConfirmButton: false,
                    onDestroy: () => this.componentDidMount()
                })
            }
        })
    }

    render() {
        if (this.props.loading) return <PageSpinner />
        if (this.props.companys.length === 0) return <h2>No Customers have been registered</h2>
        const { customer } = this.state
        return (
            <Page title="All Customers" breadcrumbs={[{ name: 'Finance', active: true }]}>
                <Modal
                    isOpen={this.state.modal}
                    backdrop="static"
                    className={this.props.className}>
                    <ModalHeader>
                        <b> {customer.customerName}</b>
                    </ModalHeader>
                    <ModalBody>
                        <Col>
                            <Row><Col><b>General Manager</b>:</Col>
                                <Col>{customer.generalManger}</Col>
                            </Row>
                            <Row><Col><b>Email</b>:</Col>
                                <Col>{customer.email}</Col>
                            </Row>
                            <Row><Col><b>Contact Person</b>:</Col>
                                <Col>{customer.contactPerson}</Col>
                            </Row>
                            <Row><Col><b> Working Field</b>:</Col>
                                <Col>{customer.workingField}</Col>
                            </Row>
                            <Row><Col><b> Payment Option</b>:</Col>
                                <Col>{customer.paymentOption}</Col>
                            </Row>
                            <Row><Col><b>Tin Number </b> :</Col>
                                <Col>{customer.tinNumber}</Col>
                            </Row>
                        </Col>

                    </ModalBody>
                    <ModalFooter>
                        <Button color='primary' onClick={() => this.toggle()}>
                            Close
                      </Button>
                    </ModalFooter>
                </Modal>
                <Col>
                    <Card className="mb-3">
                        <CardHeader>All Customers</CardHeader>
                        <CardBody>
                            <Table responsive>
                                <thead>
                                    <tr align='left'>
                                        <th>#</th>
                                        <th>Customer Name</th>
                                        <th>General Manager</th>
                                        <th>Email</th>
                                        <th>Contact Person</th>
                                        <th>Working Field</th>
                                        <th>Payment Option</th>
                                        <th>Tin-Number</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.lists ? this.props.lists.slice(0).reverse().map((item, index) => (
                                        <Customer key={index} company={item} index={index} deleteCompany={this.deleteCustomer} toggle={this.toggle} />
                                    )) : this.props.companys.slice(0).reverse().map((item, index) => (
                                        <Customer key={index} company={item} index={index} deleteCompany={this.deleteCustomer} toggle={this.toggle} />
                                    ))}
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>
            </Page>
        )
    }
}

const mapStateToProps = (state) => ({
    loading: state.companyReducer.loading,
    companys: state.companyReducer.companys,
    errors: state.companyReducer.errors,
})

export default connect(mapStateToProps, { getCompany, deleteCompany })(ViewAllCustomersPage)