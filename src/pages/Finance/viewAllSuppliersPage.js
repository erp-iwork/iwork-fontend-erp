import React, { Component } from 'react';
import Page from '../../components/Page';
import { Card, CardBody, Modal, ModalFooter, ModalHeader, ModalBody, CardHeader, Col, Table, Button } from 'reactstrap';
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
                    <Button onClick={toggle()} color='primary' size='sm' >
                        <MdRemoveRedEye />
                    </Button>
                </Col>
            </td>
        </tr>
    )
}

class ViewAllSuppliers extends Component {

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

    constructor(props) {
        super(props);
        this.state = {
            companies: []
        }
        this.deleteSupplier = this.deleteSupplier.bind(this)
    }

    async componentDidMount() {
        if (!this.props.lists) {
            await this.props.getSupplier()
        }
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
        return (
            <Page title="All Customers" breadcrumbs={[{ name: 'All Supplier', active: true }]}>

                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle()}
                    className={this.props.className}>
                    <ModalHeader toggle={this.toggle()}>Modal title</ModalHeader>
                    <ModalBody>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna
                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                        ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        Duis aute irure dolor in reprehenderit in voluptate velit
                        esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                        occaecat cupidatat non proident, sunt in culpa qui officia
                        deserunt mollit anim id est laborum.
                  </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle()}>
                            Do Something
                    </Button>{' '}
                        <Button color="secondary" onClick={this.toggle()}>
                            Cancel
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