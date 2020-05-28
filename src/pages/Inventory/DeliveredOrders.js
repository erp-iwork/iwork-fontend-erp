import React, { Component } from 'react';
import Page from '../../components/Page';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { getRecordsByType, getExistingCategories } from '../../store/inventory/action'
import PageSpinner from '../../components/PageSpinner'
import { connect } from 'react-redux'
import type from '../../constant/transactions'

class DeliveredOrders extends Component {
    constructor(props) {
        super(props)
        this.state = {
            records: [],
            done: false
        }
    }

    componentDidMount() {
        this.props.getRecordsByType(type.out)
    }

    componentDidUpdate(prevProps, prevState) {
        if (!this.props.loading_records && !this.state.done) {
            this.setState({
                records: this.props.records,
                done: true
            })
        }
    }

    render() {
        if (this.props.loading_records) return <PageSpinner />
        return (
            <Page
                title="Record Tracking"
                breadcrumbs={[{ name: 'Inventory', active: true }]}
            >
                <Row>
                    <Col>
                        <Card className="mb-3">
                            <CardHeader>Delivered Orders</CardHeader>
                            <CardBody>
                                <Table responsive>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Transaction ID</th>
                                            <th>Product ID</th>
                                            <th>Product Name</th>
                                            <th>Unit Price</th>
                                            <th>Order ID</th>
                                            <th>Amount</th>
                                            <th>Quantity</th>
                                            <th>Product Category</th>
                                            <th>Transaction Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.records.slice(0).reverse().map((item, index) => (
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{item.transactionId}</td>
                                                <td>{item.orderItem.InventoryItem.InventoryItemId}</td>
                                                <td>{item.orderItem.itemName}</td>
                                                <td>-{item.orderItem.InventoryItem.cost}</td>
                                                <td>{item.orderId}</td>
                                                <td>-{item.amount}</td>
                                                <td>{item.orderItem.quantity}</td>
                                                <td>{item.orderItem.InventoryItem.catagory.catagory}</td>
                                                <td>{item.transactionDate}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Page>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        loading_categories: state.inventoryReducer.loading_categories,
        loading_records: state.inventoryReducer.loading_records,
        records: state.inventoryReducer.records,
        categories: state.inventoryReducer.categories,
    }
}

export default connect(mapStateToProps, { getExistingCategories, getRecordsByType })(DeliveredOrders)