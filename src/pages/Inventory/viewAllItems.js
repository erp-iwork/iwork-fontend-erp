import React, { Component } from 'react';
import {
    Card, CardBody, CardHeader, Col, Table, Button, Modal,
    ModalBody, ModalFooter, ModalHeader, Row
} from 'reactstrap';
import Page from '../../components/Page';
import { getItemsByCategory } from '../../store/inventory/action'
import PageSpinner from '../../components/PageSpinner'
import { connect } from 'react-redux'

class ViewAllItems extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modal: false,
            item: {
                itemName: '', quantity: '', retailPrice: '', unitOfMeasurement: '', category: '',
                productType: ''
            }
        }
        this.toggle = this.toggle.bind(this)
    }

    toggle = (item) => {
        return this.setState({
            modal: !this.state.modal, item
        })
    }


    componentDidMount() {
        this.props.getItemsByCategory(this.props.location.state)
    }

    render() {
        if (this.props.loading_items) return <PageSpinner />
        if (this.props.items.item_catagory.length === 0) return <h2>No items in this Category yet</h2>
        const {
            itemName, quantity, retailPrice, category, productType, unitOfMeasurement
        } = this.state.item
        return (
            <Page
                title="Inventory"
                breadcrumbs={[{ name: 'All Items', active: true }]}
                className="TablePage">
                <Modal
                    isOpen={this.state.modal}
                    backdrop="static"
                    className={this.props.className}>
                    <ModalHeader>
                        {this.state.item.itemName}
                    </ModalHeader>
                    <ModalBody>
                        <Row>Quantity: {quantity}</Row>
                        <Row>Retail Price: {retailPrice}</Row>
                        <Row>Units: {unitOfMeasurement}</Row>
                        <Row>Product Type: {productType}</Row>
                        <Row>Category: {category}</Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button color='primary' onClick={() => this.toggle(this.state.item)}>
                            Close
                      </Button>
                    </ModalFooter>
                </Modal>

                <Col>
                    <Card className="mb-4">
                        <CardHeader>Inventory Status</CardHeader>
                        <CardBody>
                            <Table responsive>
                                <thead>
                                    <tr align='left'>
                                        <th>#</th>
                                        <th>Item Name</th>
                                        <th>Quantity</th>
                                        <th>Retail Price</th>
                                        <th>Unit</th>
                                        <th>Product Type</th>
                                        <th>Category</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.items.item_catagory.map((item, index) => (
                                        <tr align='left'>
                                            <th scope="row">{index + 1}</th>
                                            <td>{item.itemName}</td>
                                            <td>{item.quantity}</td>
                                            <td>{item.retailPrice}</td>
                                            <td>{item.unitOfMeasurement}</td>
                                            <td>{item.productType}</td>
                                            <td>{item.catagory.catagory}</td>
                                            <td>
                                                <Button size='sm' color='primary' onClick={() => this.toggle(item)}>
                                                    See Item
                                                </Button>
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
        loading_items: state.inventoryReducer.loading_items,
        items: state.inventoryReducer.items,
        success: state.inventoryReducer.success
    }
}

export default connect(mapStateToProps, { getItemsByCategory })(ViewAllItems)