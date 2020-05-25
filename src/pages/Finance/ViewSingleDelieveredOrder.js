import React, { Component } from 'react';
import Page from '../../components/Page';
import { Col, Row, Card, CardHeader, Table, CardBody, Input, Button } from 'reactstrap';
import { invoiceOrder } from '../../store/procurement/action'
import { connect } from 'react-redux'
import Loader from '../../components/loader'

class ViewSingleDelieveredOrderPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order: this.props.location.state,
            orders: []
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
    }

    handleChange = (data) => {
        var orders = this.state.orders
        orders[data.index][data.name] = data.value
        this.setState({ orders })
    }

    invoice = () => {
        const { order } = this.state
        this.props.invoiceOrder(order.purchaseOrderNumber, this.state.orders)
    }

    render() {
        const { order } = this.state
        return (
            <Page title="Finance" breadcrumbs={[{ name: 'Delivered Order', active: true }]}>
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
                                <b>Description</b>
                                <Col>{order.description}</Col>
                            </CardBody>
                        </Col>
                        <Col md={8}>
                            <CardHeader>Item Information</CardHeader>
                            <CardBody>
                                <Table className="scrollTableSales">
                                    <thead>
                                        <tr>
                                            <th>Item ID</th>
                                            <th>Item Name</th>
                                            <th>Quantity</th>
                                            <th>Old Price</th>
                                            <th>Update Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.purchase_item_order.map((item, index) => (
                                            <tr>
                                            <th scope="row">1</th>
                                            <td>{item.masterData.productName}</td>
                                            <td>{item.purchaseQuantity}</td>
                                            <td>{item.masterData.productPrice}</td>
                                            <td md={2}>
                                                <div class='col-xs-2'>
                                                    <Input type='number' placeholder='New Price' onChange={
                                                        (event) => this.handleChange({
                                                            value: event.target.value,
                                                            name: 'newPrice',
                                                            index
                                                        })
                                                    } />
                                                    <Input type='number' placeholder="Margin" onChange={
                                                        (event) => this.handleChange({
                                                            value: event.target.value,
                                                            name: 'margin',
                                                            index
                                                        })
                                                    } /> %
                                                </div>
                                            </td>
                                        </tr>
                                        ))}
                                    </tbody>
                                    <Button onClick={this.invoice}>
                                        {this.props.loading_invoice ? <Loader /> : "Invoice Order" }
                                    </Button>
                                </Table>
                            </CardBody>
                        </Col>
                    </Row>
                </Card>


            </Page>
        );
    }
}

const mapStateToProps = (state) => ({
    loading_invoice: state.procurementReducer.loading_invoice,
    success: state.procurementReducer.success
})

export default connect(mapStateToProps, { invoiceOrder })(ViewSingleDelieveredOrderPage)