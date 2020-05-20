import React, { Component } from 'react';
import Page from '../../components/Page';
import { MdAssignment } from "react-icons/md";
import {
    Card, CardBody, CardHeader, Button, Table, Modal,
    ModalHeader, ModalBody, ModalFooter, Row
} from 'reactstrap';
import PageSpinner from '../../components/PageSpinner'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getMasterData } from '../../store/company/action'
import routes from '../../config/routes'

const Data = ({ item, index, toggle }) => {
    return (
        <tbody>
            <tr>
                <th scope="row">{index + 1}</th>
                <td>{item.productName}</td>
                <td>{item.productType}</td>
                <td>{item.productCategory}</td>
                <td>{item.productPrice}</td>
                <td>{item.unitOfMeasurement}</td>
                <td>
                    <Button size='sm' color='primary' onClick={() => toggle(item)} >
                        See Product
                    </Button>
                </td>
            </tr>
        </tbody>
    )
}

class ViewAllMasterData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            data: { productName: '', productType: '', productCategory: '', productPrice: '', unitOfMeasurement: '' }
        }
        this.toggle = this.toggle.bind(this)
    }

    componentDidMount() {
        this.props.getMasterData()
    }

    toggle = (data) => {
        return this.setState({
            modal: !this.state.modal,
            data: !this.state.modal? data : this.state.data
        })
    }

    render() {
        if (this.props.loading) return <PageSpinner />
        if (this.props.masterData.length === 0) return <h2>No products to show</h2>
        const { data } = this.state
        return (
            <Page
                title="All Master Data"
                breadcrumbs={[{ name: 'All Master Data', active: true }]}
                className="TablePage">
                <Modal
                    isOpen={this.state.modal}
                    backdrop="static"
                    className={this.props.className}>
                    <ModalHeader>
                        Item Information
                    </ModalHeader>
                    <ModalBody>
                        <Row>Product Name: {data.productName}</Row>
                        <Row>Category: {data.productCategory}</Row>
                        <Row>Type: {data.productType}</Row>
                        <Row>Price: {data.productPrice}</Row>
                        <Row>Unit of Measurement: {data.unitOfMeasurement}</Row>
                  </ModalBody>
                  <ModalFooter>
                      <Button onClick={() => this.toggle()}>
                          Close
                      </Button>
                  </ModalFooter>
                </Modal>
                <Card className="mb-3">
                    <CardHeader>All Products</CardHeader>
                    <CardBody>
                        <Table responsive >
                            <thead>
                                <tr align='left'>
                                    <th>ID #</th>
                                    <th>Product Name</th>
                                    <th>Product Type</th>
                                    <th>Product Category</th>
                                    <th>Product Price</th>
                                    <th>Unit of Measurement</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                                {this.props.masterData.reverse().map((item, index) => (
                                    <Data item={item} key={index} index={index} toggle={this.toggle} />
                                ))}
                        </Table>
                    </CardBody>
                </Card>
            </Page>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        loading: state.companyReducer.loading,
        masterData: state.companyReducer.masterData
    }
}
const mapDispatchToProps = { getMasterData }

export default connect(mapStateToProps, mapDispatchToProps)(ViewAllMasterData)