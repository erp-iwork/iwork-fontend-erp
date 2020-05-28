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
                itemName: '', quantity: '', retailPrice: '', unitOfMeasurement: '', catagory: {},
                productType: ''
            },
            items: [],
            done: false
        }
        this.toggle = this.toggle.bind(this)
    }

    toggle = (item) => {
        console.log(item)
        return this.setState({
            modal: !this.state.modal, item
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (!this.props.loading_items && !this.state.done) {
            this.setState({
                items: this.props.items,
                done: true
            })
        }
    }

    componentDidMount() {
        this.props.getItemsByCategory(this.props.location.state)
    }

    render() {
        if (!this.state.done) return <PageSpinner />
        const {
             quantity, retailPrice, catagory, productType, unitOfMeasurement
        } = this.state.item

        if (this.props.items.item_catagory.length === 0 || this.props.items.item_catagory === null) return <h2>No items in this Category yet</h2>
        return (
            <Page
                title="All Products"
                breadcrumbs={[{ name: 'Inventory', active: true }]}
                className="TablePage">
                <Modal
                    isOpen={this.state.modal}
                    backdrop="static"
                    className={this.props.className}>
                    <ModalHeader>
                        {this.state.item.itemName}
                    </ModalHeader>
                    <ModalBody>
                        <Row><Col >Quantity: </Col><Col>{quantity}</Col></Row>
                        <Row><Col >Retail Price: </Col><Col>{retailPrice}</Col></Row>
                        <Row><Col >Category: </Col><Col>{catagory.catagory}</Col></Row>


                        <Row><Col >Units: </Col><Col>{unitOfMeasurement}</Col></Row>
                        <Row><Col >Product Type: </Col><Col>{productType}</Col></Row>
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