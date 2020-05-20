import React, { Component } from 'react';
import Page from '../../components/Page';
import {
    Card, CardBody, Modal, ModalFooter, ModalHeader,
    ModalBody, CardHeader, Col, Table, Button, Row
} from 'reactstrap';
import { MdDelete, MdRemoveRedEye } from "react-icons/md";
import { connect } from 'react-redux'
import { deleteSupplier, getSupplier } from '../../store/company/action'
import PageSpinner from '../../components/PageSpinner'
import Swal from "sweetalert2"
import './Finance.scss'


const Customer = ({ company, index, deleteCompany, toggle }) => {
    return (
        <tr align='left'>
            <th scope="row">{index + 1}</th>
            <td>{company.suplierName}</td>
            <td>{company.generalManger}</td>
            <td>{company.email}</td>
            <td>{company.contactPerson}</td>
            <td>{company.workingField}</td>
            <td>{company.paymentOption}</td>
            <td>{company.tinNumber}</td>
            <td>
                <Col>
                    <Button color='danger' size='sm' onClick={() => deleteCompany(company.suplierId)} className='spacing'>
                        <MdDelete />
                    </Button>
                    <Button onClick={() => toggle(company)} color='primary' size='sm' >
                        <MdRemoveRedEye />
                    </Button>
                </Col>
            </td>
        </tr>
    )
}

class ViewAllSuppliers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companies: [],
            modal: false,
            supplier: {}
        }
        this.deleteSupplier = this.deleteSupplier.bind(this)
        this.toggle = this.toggle.bind(this)
    }

    async componentDidMount() {
        if (!this.props.lists) {
            await this.props.getSupplier()
        }
    }

    toggle = (supplier) => {
        return this.setState({
            modal: !this.state.modal,
            supplier: !this.state.modal? supplier : this.state.supplier
        })
    }

    deleteSupplier(id) {
        this.props.deleteSupplier(id).then(res => {
            if (res) {
                Swal.fire({
                    title: "Delteing Account...",
                    icon: "warning",
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
        if (this.props.suppliers.length === 0) return <h2>No suppliers have been registered</h2>
        const { supplier } = this.state
        return (
            <Page title="All Customers" breadcrumbs={[{ name: 'All Supplier', active: true }]}>
                <Modal
                    isOpen={this.state.modal}
                    backdrop="static"
                    className={this.props.className}>
                    <ModalHeader>
                        {supplier.suplierName}
                    </ModalHeader>
                    <ModalBody>
                        <Row>General Manager: {supplier.generalManger}</Row>
                        <Row>Email: {supplier.email}</Row>
                        <Row>Contact Person: {supplier.contactPerson}</Row>
                        <Row>Working Field: {supplier.workingField}</Row>
                        <Row>Payment Option: {supplier.paymentOption}</Row>
                        <Row>Tin Number: {supplier.tinNumber}</Row>
                  </ModalBody>
                  <ModalFooter>
                      <Button onClick={() => this.toggle()}>
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
                                        <th>Supplier Name</th>
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
                                        <Customer key={index} company={item} index={index} deleteCompany={this.deleteSupplier} toggle={this.toggle} />
                                    )) : this.props.suppliers.slice(0).reverse().map((item, index) => (
                                        <Customer key={index} company={item} index={index} deleteCompany={this.deleteSupplier} toggle={this.toggle} />
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
    suppliers: state.companyReducer.suppliers,
    errors: state.companyReducer.errors,
})

export default connect(mapStateToProps, { getSupplier, deleteSupplier })(ViewAllSuppliers)