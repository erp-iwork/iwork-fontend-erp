import React, { Component } from 'react';
import {
    Card, CardBody, CardHeader, Col, Table, Button, Modal,
    ModalBody, ModalFooter, ModalHeader, Row
} from 'reactstrap';
import Page from '../../components/Page';
import { getItemsByCategory } from '../../store/inventory/action'
import PageSpinner from '../../components/PageSpinner'
import { connect } from 'react-redux'
import { filter } from '../../useCases' 
import { updateFilter } from '../../store/search/action'
import filters from '../../constant/filters'

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
        updateFilter('Type', null)
        updateFilter(filters.ADVANCED_DATE, null)
    }

    render() {
        if (!this.state.done) return <PageSpinner />
        const {
            retailPrice, catagory, productType, unitOfMeasurement, quantity
        } = this.state.item

        if (this.props.items.item_catagory.length === 0 || this.props.items.item_catagory === null) {
            return (
                <Page title="All Products" breadcrumbs={[{ name: 'Inventory', active: true }]}>
                    No Items have been registered in this Category
                </Page>
            )
        }
        const filtered = filter({
            name: { value: this.props.searchValue, tag: 'itemName' }
        }, this.props.items.item_catagory)
        return (
            <Page
                title="All Products"
                breadcrumbs={[{ name: 'Inventory', active: true }]}
                className="TablePage"
            >
                <Modal
                    isOpen={this.state.modal}
                    backdrop="static"
                    className={this.props.className}>
                    <ModalHeader>
                        {this.state.item.itemName}
                    </ModalHeader>
                    <ModalBody>
                        <Row><Col>Quantity: </Col><Col>{quantity}</Col></Row>
                        <Row><Col>Unit Price: </Col><Col>{retailPrice}</Col></Row>
                        <Row><Col>Category: </Col><Col>{catagory.catagory}</Col></Row>
                        <Row><Col>UoM: </Col><Col>{unitOfMeasurement}</Col></Row>
                        <Row><Col>Product Type: </Col><Col>{productType}</Col></Row>
                        <Row><Col>Quantity: </Col><Col>{quantity}</Col></Row>
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
                                    {filtered.map((item, index) => (
                                        <tr align='left' key={index}>
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
        success: state.inventoryReducer.success,
        filter: state.searchData.filter,
        searchValue: state.searchData.value
    }
}

export default connect(mapStateToProps, { getItemsByCategory, updateFilter })(ViewAllItems)