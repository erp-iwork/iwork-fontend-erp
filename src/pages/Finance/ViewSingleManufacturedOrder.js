import React, { Component } from 'react';
import Page from '../../components/Page';
import { Col, Row, Card, CardHeader, Table, CardBody, Input, Button } from 'reactstrap';
import { getSingleManufacturedOrder, invoiceProduct } from '../../store/manufacturing/action'
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
            margin: 0,
            lockPage: false
        }
        this.invoice = this.invoice.bind(this)
    }

    componentDidMount() {
        this.props.getSingleManufacturedOrder(this.props.location.state.orderNumber)
    }

    invoice = () => {
        this.props.invoiceProduct(this.props.order.orderNumber, {
            status: status.finished,
            margin: parseInt(this.state.margin)
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.success && !this.state.lockPage) {
            this.props.getSingleManufacturedOrder(this.state.order.orderNumber)
            this.setState({ lockPage: true })
        }
    }

    render() {
        const { order } = this.props
        if (!this.props.location.state.orderNumber) {
            return <PageSpinner />
        }
        if (this.props.loading_single_order) return <PageSpinner />
        return (
            <Page title="Delivered Orders" breadcrumbs={[{ name: 'Finance', active: true }]}>
                <Card className='padding'>
                    <Row sm={12} md={12} >
                        <Col md={4}>
                            <CardHeader>Order Information</CardHeader>
                            <CardBody>
                                <Row>
                                    <Col>MO Id:</Col>
                                    <Col><b>{order.orderNumber}</b></Col>
                                </Row>
                                <Row>
                                    <Col>Product Name:</Col>
                                    <Col><b>{order.requiredProductName}</b></Col>
                                </Row>
                                <Row><Col>Order Date :</Col>
                                    <Col><b>{order.status_manufacture_order ? order.status_manufacture_order[0]['date'] : null}</b></Col>
                                </Row>
                                <Row><Col>Cost :</Col>
                                    <Col><b>{order.cost}</b></Col>
                                </Row>
                                <Row><Col>Status :</Col>
                                    <Col><b>{order.status_manufacture_order ? order.status_manufacture_order[0]['status'] : null}</b></Col>
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
                                            <th>Cost Prices</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.manufacture_item_set.map((item, index) => (
                                            <tr key={index}>
                                                <th scope="row">{item.componentId}</th>
                                                <td>{item.componentName}</td>
                                                <td>{item.quantity}</td>
                                                <td>{item.price}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <Row style={{ marginTop: 15 }}>
                                        <Col style={{
                                            display: order.status_manufacture_order[0]['status'] === status.finished ? 'none' : 'flex', flexDirection: 'row', alignItems: 'center'
                                        }}>
                                            <Input onChange={event => this.setState({
                                                    margin: event.target.value
                                                })}
                                                type="number"
                                            />
                                        </Col>
                                        <Col>
                                            <Button align='center' color='primary' onClick={this.invoice} disabled={
                                                order.status_manufacture_order[0]['status'] === status.finished
                                            }>
                                                {this.props.loading_invoice ? <Loader /> : "Margin Update"}
                                            </Button>
                                        </Col>
                                        {this.props.errors.errors ? <Error error={[this.props.errors.errors.margin]} /> : ""}
                                    </Row>
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
    loading_single_order: state.manuFacturingReducer.loading_single_order,
    order: state.manuFacturingReducer.order,
    errors: state.manuFacturingReducer.errors,
    loading_invoice: state.manuFacturingReducer.loading_invoice,
    success: state.manuFacturingReducer.success
})

export default connect(mapStateToProps, { getSingleManufacturedOrder, invoiceProduct })(ViewSingleDelieveredOrderPage)