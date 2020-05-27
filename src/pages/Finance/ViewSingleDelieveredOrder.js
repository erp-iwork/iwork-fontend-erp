import React, { Component } from 'react';
import Page from '../../components/Page';
import { Col, Row, Card, CardHeader, Table, CardBody, Input, Button } from 'reactstrap';
import { invoiceOrder, getSingleOrder } from '../../store/procurement/action'
import { connect } from 'react-redux'
import Loader from '../../components/loader'
import status from '../../constant/status'
import PageSpinner from '../../components/PageSpinner'
import './SingleView.scss'
import Error from '../../components/error'

class ViewSingleDelieveredOrderPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order: this.props.location.state,
            orders: [],
            lockPage: false
        }
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        const orders = this.props.location.state.purchase_item_order.map((item, index) => {
            return {
                purchaseItemId: item.purchaseItemId,
                itemName: item.masterData.productName,
                newPrice: '',
                margin: ''
            }
        })
        this.setState({ orders })
        this.props.getSingleOrder(this.props.location.state.purchaseOrderNumber)
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.success && !this.state.lockPage) {
            this.props.getSingleOrder(this.state.order.purchaseOrderNumber).then(res => {
                this.setState({ lockPage: true })
            })
        }
    }

    handleChange = (data) => {
        var orders = this.state.orders
        orders[data.index][data.name] = parseInt(data.value)
        this.setState({ orders })
    }

    invoice = () => {
        const { order } = this.state
        this.props.invoiceOrder(order.purchaseOrderNumber, this.state.orders)
    }

    render() {
        const { order } = this.props
        if (this.props.loading_single_order) return <PageSpinner />
        return (
            <Page title="Delivered Orders" breadcrumbs={[{ name: 'Finance', active: true }]}>
                <Card className='padding'>
                    <Row sm={12} md={12} >
                        <Col md={4}>
                            <CardHeader>Order Information</CardHeader>
                            <CardBody>
                                <Row>
                                    <Col>Order Id:</Col>
                                    <Col><b>{order.purchaseOrderNumber}</b></Col>
                                </Row>
                                <Row><Col>Order Date :</Col>
                                    <Col><b>{order.purchaseOrderDate}</b></Col>
                                </Row>
                                <Row><Col>Status :</Col>
                                    <Col><b>{order.status_purchase_order[0]['status']}</b></Col>
                                </Row>
                                <b>Description</b>
                                <Col>{order.description}</Col>
                            </CardBody>
                        </Col>
                        <Col md={8}>
                            <CardHeader>Item Information</CardHeader>
                            <CardBody>
                                <Table className="scrollTableSaless">
                                    <thead>
                                        <tr>
                                            <th>Item ID</th>
                                            <th>Item Name</th>
                                            <th>Quantity</th>
                                            <th>Cost Price</th>
                                            <th>Sales Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.purchase_item_order.map((item, index) => (
                                            <tr>
                                                <th scope="row">1</th>
                                                <td>{item.masterData.productName}</td>
                                                <td>{item.purchaseQuantity}</td>
                                                <td>{item.masterData.productPrice}</td>
                                                <td align='right'>
                                                    <Col >
                                                        <Input type='number' placeholder='New Price' onChange={
                                                            (event) => this.handleChange({
                                                                value: event.target.value,
                                                                name: 'newPrice',
                                                                index
                                                            })
                                                        } />
                                                    </Col>
                                                    <Col >
                                                        <Input type='number' placeholder="Margin" onChange={
                                                            (event) => this.handleChange({
                                                                value: event.target.value,
                                                                name: 'margin',
                                                                index
                                                            })
                                                        } />
                                                    </Col>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <Error error={this.props.errors.error} />
                                    <Button align='center' color='primary' onClick={this.invoice} disabled={
                                        order.status_purchase_order[0]['status'] === status.invoiced
                                    }>
                                        {this.props.loading_invoice ? <Loader /> : "Invoice Order"}
                                    </Button>
                                </Table>
                            </CardBody>
                        </Col>
                    </Row>
                </Card>
            </Page>
        )
    }
}

const mapStateToProps = (state) => ({
    errors: state.procurementReducer.errors,
    loading_single_order: state.procurementReducer.loading_single_order,
    loading_invoice: state.procurementReducer.loading_invoice,
    success: state.procurementReducer.success,
    order: state.procurementReducer.order,
    loading_orders: state.procurementReducer.loading_orders,
    orders: state.procurementReducer.orders,
    status: state.procurementReducer.status,
})

export default connect(mapStateToProps, { invoiceOrder, getSingleOrder })(ViewSingleDelieveredOrderPage)