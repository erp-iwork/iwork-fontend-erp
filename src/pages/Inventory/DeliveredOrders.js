import React, { Component } from 'react';
import Page from '../../components/Page';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { getRecordsByType, getExistingCategories } from '../../store/inventory/action'
import PageSpinner from '../../components/PageSpinner'
import { connect } from 'react-redux'
import type from '../../constant/transactions'

class DeliveredOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.props.getExistingCategories()
        this.props.getRecordsByType(type.out)
    }

    render() {
        if (this.props.loading_categories || this.props.loading_records) return <PageSpinner />
        console.log(this.props.records)
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
                                            <th>Cost</th>
                                            <th>Product Category</th>
                                            <th>Transaction Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.props.records.slice(0).reverse().map((item, index) => (
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{item.transactionId}</td>
                                                <td>{'item.transactionId'}</td>
                                                <td>{item.orderItem.itemName}</td>
                                                <td>{'item.transactionId'}</td>
                                                <td>{'item.transactionId'}</td>
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
        records: state.inventoryReducer.records
    }
}

export default connect(mapStateToProps, { getExistingCategories, getRecordsByType })(DeliveredOrders)