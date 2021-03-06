import React, { Component } from 'react';
import Page from '../../components/Page';
import { Col, Row, Card, CardHeader, Table, CardBody } from 'reactstrap';
import './Procurment.scss';
import { connect } from 'react-redux'
import { getSingleOrder } from '../../store/procurement/action'
import PageSpinner from '../../components/PageSpinner'

class ViewSinglePurchaseOrderPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            details: this.props.location.state,
            order: {},
            done: false
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (!(this.props.loading_single_order === true || this.props.loading_single_order === undefined) && !this.state.done) {
            this.setState({
                order: this.props.order,
                done: true
            })
        }
    }

    componentDidMount() {
        if (this.props.location.state) {
            this.props.getSingleOrder(this.props.location.state.purchaseOrderNumber)
        }
    }

    render() {
        if (!this.state.done) return <PageSpinner />
        const { order } = this.state
        return (
            <Page title="Single Purchase Order" breadcrumbs={[{ name: 'Procurment', active: true }]}>
                <Card className='padding'>
                    <Row sm={12} md={12} >
                        <Col md={4}>
                            <CardHeader >
                                Order Information
                        </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col>
                                        Order ID:
                                    </Col>
                                    <Col>
                                        <b>{order.purchaseOrderNumber}</b>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        Supplier Name:
                                    </Col>
                                    <Col>
                                        <b>{order.suplier.suplierName}</b>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        Order Date :
                                    </Col>
                                    <Col>
                                        <b>{order.purchaseOrderDate}</b>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        Status :
                                    </Col>
                                    <Col>
                                        <b>{order.status_purchase_order[0]['status']}</b>
                                    </Col>
                                </Row>
                                <b>Description</b>
                                <Col>{order.description}</Col>
                            </CardBody>
                        </Col>
                        <Col md={8}>
                            <CardHeader >
                                Item Information
                        </CardHeader>
                            <CardBody>
                                <Table responsive className="scrollTableSales">
                                    <thead>
                                        <tr>
                                            <th>Product #</th>
                                            <th>Product Name</th>
                                            <th>Unit Price</th>
                                            <th>Quantity</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.purchase_item_order.map((item, index) => (
                                            <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{item.masterData.productName}</td>
                                                <td>{item.itemCost}</td>
                                                <td>{item.purchaseQuantity}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Col>
                    </Row>
                </Card>
            </Page>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading_single_order: state.procurementReducer.loading_single_order,
        order: state.procurementReducer.order,
    }
}

export default connect(mapStateToProps, { getSingleOrder })(ViewSinglePurchaseOrderPage)