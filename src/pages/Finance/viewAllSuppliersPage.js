import React, { Component } from 'react';
import Page from '../../components/Page';
import { Card, CardBody, CardHeader, Col, Table, Button } from 'reactstrap';
import { MdDelete } from "react-icons/md";
import { connect } from 'react-redux'
import { deleteSupplier, getSupplier } from '../../store/company/action'
import PageSpinner from '../../components/PageSpinner'
import Swal from "sweetalert2"

const Customer = ({ company, index, deleteCompany }) => {
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
                <Col align='center'>
                    <Button color='danger' size='sm' onClick={() => deleteCompany(company.suplierId)}>
                        <MdDelete />
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
        if (!(this.props.suppliers[0])) return <PageSpinner />
        console.log(this.props.suppliers)
        return (
            <Page title="All Customers" breadcrumbs={[{ name: 'All Supplier', active: true }]}>
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
                                        <Customer key={index} company={item} index={index} deleteCompany={this.deleteSupplier} />
                                    )) : this.props.suppliers.slice(0).reverse().map((item, index) => (
                                        <Customer key={index} company={item} index={index} deleteCompany={this.deleteSupplier} />
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
    suppliers: state.companyReducer.suppliers,
    errors: state.companyReducer.errors,
})

export default connect(mapStateToProps, { getSupplier, deleteSupplier })(ViewAllSuppliers)