import React, { Component } from 'react';
import Page from '../../components/Page';
import { Card, CardBody, CardHeader, Col, Table, Button } from 'reactstrap';
import { MdDelete } from "react-icons/md";
import { connect } from 'react-redux'
import { deleteCompany, getCompany } from '../../store/company/action'
import PageSpinner from '../../components/PageSpinner'
import Swal from "sweetalert2"

const Customer = ({ company, index, deleteCompany }) => {
    return (
        <tr align='center'>
            <th scope="row">{index + 1}</th>
            <td>{company.customerName}</td>
            <td>{company.generalManger}</td>
            <td>{company.email}</td>
            <td>{company.contactPerson}</td>
            <td>{company.workingField}</td>
            <td>{company.paymentOption}</td>
            <td>{company.tinNumber}</td>
            <td>
                <Col align='center'>
                    <Button color='danger' size='sm' onClick={() => deleteCompany(company.customerId)}>
                        <MdDelete />
                    </Button>
                </Col>
            </td>
        </tr>
    )
}

class ViewAllCustomersPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companies: []
        }
        this.deleteCustomer = this.deleteCustomer.bind(this)
    }

    async componentDidMount() {
        if (!this.props.lists) {
            await this.props.getCompany()
        }
    }

    deleteCustomer(id) {
        this.props.deleteCompany(id).then(res => {
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
        if (!(this.props.companys[0])) return <PageSpinner />
        if (this.props.update) {
            if (!this.props.companys[0]) return <PageSpinner />
        }
        return (
            <Page title="All Customers" breadcrumbs={[{ name: 'All Customer', active: true }]}>
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
                                    {this.props.lists? this.props.lists.slice(0).reverse().map((item, index) => (
                                        <Customer key={index} company={item} index={index} deleteCompany={this.deleteCustomer} />
                                    )) : this.props.companys.slice(0).reverse().map((item, index) => (
                                        <Customer key={index} company={item} index={index} deleteCompany={this.deleteCustomer} />
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
    companys: state.companyReducer.companys,
    errors: state.companyReducer.errors,
})

export default connect(mapStateToProps, { getCompany, deleteCompany })(ViewAllCustomersPage)