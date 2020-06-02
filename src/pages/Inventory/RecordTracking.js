import React, { Component } from 'react';
import Page from '../../components/Page';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { getRecords, getExistingCategories, getRecordsByType } from '../../store/inventory/action'
import PageSpinner from '../../components/PageSpinner'
import { connect } from 'react-redux'
import type from '../../constant/transactions'

class RecordTracking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            records: [],
            done: false
        }
    }

    componentDidMount() {
        this.props.getRecordsByType(type.in)

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
                            <CardHeader>Received Items</CardHeader>
                            <CardBody>
                                <Table responsive>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Transaction ID</th>
                                            <th>Product ID</th>
                                            <th>Product Name</th>
                                            <th>Unit Price</th>
                                            <th>Product Category</th>
                                            <th>Order ID</th>
                                            <th>Amount</th>
                                            <th>Quantity</th>
                                            <th>Transaction Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.props.records ? this.props.records.map((item, index) => (
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{item.transactionId}</td>
                                                <td>{item.productId}</td>
                                                <td>{item.productName}</td>
                                                <td>{item.itemCost}</td>
                                                <td>{item.productCategory}</td>
                                                <td>{item.orderId}</td>
                                                <td>{item.amount}</td>
                                                <td>{item.purchaseQuantity}</td>
                                                <td>{item.transactionDate}</td>
                                            </tr>
                                        )) : null}
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

export default connect(mapStateToProps, { getExistingCategories, getRecords, getRecordsByType })(RecordTracking)