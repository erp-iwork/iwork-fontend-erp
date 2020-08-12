import React, { Component, useState } from 'react';
import Page from '../../components/Page';
import {
    Col, Row, Card, CardHeader, Table,
    Button, CardBody, Input, Label
} from 'reactstrap';
import "./Manufacturing.scss"
import status from '../../constant/status'
import { updateQuantity } from '../../store/manufacturing/action'
import { connect } from 'react-redux'
import { identifyCustomProduct } from './functions/identifyCustomProduct'
import { updateCustomProduct } from './functions/updateCustomProduct'
import Swal from 'sweetalert2'

const UpdateComponents = ({ orderID, quantity }) => {
    const [state, setState] = useState({
        exportData: { amount: 0, percentage: 0 },
        localData: { amount: 0, percentage: 0 },
        wastedData: { amount: 0, percentage: 0 }
    })

    const [failure, setFailure] = useState({
        exportData: false,
        localData: false,
        wastedData: false,
        invalidPercentage: false
    })
    
    const handleChange = ({ target: { name, value } }) =>
        setState({ ...state, [name]: { amount: value, percentage: Math.round((value / quantity) * 100) } })


    const handleUpdate = async () => {
        var totalPercentage = 0
        var emptyValue = false
        var components = {}
        for (var prop in state) {
            totalPercentage += state[prop]['percentage']
            components[prop] = { amount: state[prop]['amount'], percentage: state[prop]['percentage'] }
        }

        var updated = { ...failure }

        for (var prop in state) {
            if (state[prop].amount === 0) {
                updated[prop] = true
                emptyValue = true
            }
        }

        if (totalPercentage > 100) setFailure({ ...failure, invalidPercentage: true })
        setFailure(updated)
        if (!failure.invalidPercentage && !emptyValue) {
            const response = await updateCustomProduct(orderID, components)
            if (response) {
                Swal.fire({
                    title: "Added Sub Components",
                    icon: "success",
                    position: "top-right",
                    timer: 1000,
                    showConfirmButton: false
                }).then(_ => window.location.reload())
            }
        }
    }

    return (
        <div>
            <Row>
                <Col>
                    <Label for="exportedAmount">
                        Exported Amount
                    </Label>
                    <Input type="number" id="exportedAmount" name="exportData" onChange={handleChange} />
                    <div style={{ color: "red", display: failure.exportData? "flex" : "none" }}>Please enter exported amount</div>
                </Col>
                <Col>
                    <Label for="localAmount">
                        Local Amount
                    </Label>
                    <Input type="number" id="localAmount" name="localData" onChange={handleChange} />
                    <div style={{ color: "red", display: failure.localData? "flex" : "none" }}>Please enter local amount</div>
                </Col>
                <Col>
                    <Label for="wastedAmount">
                        Wasted Amount
                    </Label>
                    <Input type="number" id="wastedAmount" name="wastedData" onChange={handleChange} />
                    <div style={{ color: "red", display: failure.wastedData? "flex" : "none" }}>Please enter wasted amount</div>
                </Col>
            </Row>
            <Row>
                <Col style={{ display: "flex", justifyContent: "center" }}>
                    <Button color="primary" outline onClick={handleUpdate}>Update Products</Button>
                </Col>
            </Row>
        </div>
    )
}

class SingleOrderPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order: props.location.state,
            hasComponents: false
        }
        this.calculateTotalPrice = this.calculateTotalPrice.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async componentDidMount() {
        const orders = this.props.location.state.manufacture_item_set.map((item, index) => {
            return {
                componentId: item.componentId,
                newQuantity: ''
            }
        })
        this.setState({ orders });
        const hasComponents = await identifyCustomProduct(this.state.order.orderNumber)
        this.setState({ hasComponents })
    }

    calculateTotalPrice() {
        var price = 0
        var quantity = 0
        this.state.order.manufacture_item_set.forEach(item => {
            price += item.price
            quantity += item.quantity
        })
        return { price, quantity }
    }

    handleChange = (data) => {
        var orders = this.state.orders
        orders[data.index][data.name] = parseInt(data.value)
        this.setState({ orders })
    }

    updateBomQuantity = () => {
        const { order } = this.state
        this.setState({ lockPage: false });
        this.props.updateQuantity(order.orderNumber, this.state.orders)
    }

    render() {
        const { order } = this.state
        return (
            <Page title="Single Order" breadcrumbs={[{ name: 'Manufacturing', active: true }]}>
                <div class="steps d-flex flex-wrap flex-sm-nowrap justify-content-between padding-top-2x padding-bottom-1x">
                    <div class="step completed">
                        <div class="step-icon-wrap">
                            <div class="step-icon"><i class="pe-7s-cart"></i></div>
                        </div>
                        <h4 class="step-title">Created</h4>
                    </div>
                    <div class="step completed">
                        <div class="step-icon-wrap">
                            <div class="step-icon"><i class="pe-7s-config"></i></div>
                        </div>
                        <h4 class="step-title">Work in Progress</h4>
                    </div>

                    <div class={order.status_manufacture_order ?
                        order.status_manufacture_order[0].status === status.manuFactured ||
                            order.status_manufacture_order[0].status === status.quantityCheck ||
                            order.status_manufacture_order[0].status === status.finished ||
                            order.status_manufacture_order[0].status === status.received || order.status_manufacture_order[0].status === status.confirmed ?
                            ("step completed") : ("step") : null}>
                        <div class="step-icon-wrap">
                            <div class="step-icon"><i class="pe-7s-config"></i></div>
                        </div>
                        <h4 class="step-title">Manufactured</h4>
                    </div>

                    <div class={order.status_manufacture_order ?
                        order.status_manufacture_order[0].status === status.quantityCheck ||
                            order.status_manufacture_order[0].status === status.finished ||
                            order.status_manufacture_order[0].status === status.received
                            || order.status_manufacture_order[0].status === status.confirmed ?
                            ("step completed") : ("step") : null}>
                        <div class="step-icon-wrap">
                            <div class="step-icon"><i class="pe-7s-config"></i></div>
                        </div>
                        <h4 class="step-title">Quantity Checked</h4>
                    </div>

                    <div class={order.status_manufacture_order ?
                        order.status_manufacture_order[0].status === status.finished || order.status_manufacture_order[0].status === status.received ?
                            ("step completed") : ("step") : null}>
                        <div class="step-icon-wrap">
                            <div class="step-icon"><i class="pe-7s-config"></i></div>
                        </div>
                        <h4 class="step-title">Finished</h4>
                    </div>
                    <div class={order.status_manufacture_order ? order.status_manufacture_order[0].status === status.received ? ("step completed") : ("step") : null}>
                        <div class="step-icon-wrap">
                            <div class="step-icon"><i class="pe-7s-home"></i></div>
                        </div>
                        <h4 class="step-title">Recieved</h4>
                    </div>
                </div>

                <Card className='padding'>
                    <Row sm={12} md={12} >
                        <Col md={4}>
                            <CardHeader >
                                Order Information
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col>
                                        MO ID:
                                    </Col>
                                    <Col>
                                        <b>{order.orderNumber}</b>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        Product Name :
                                    </Col>
                                    <Col>
                                        <b>{order.requiredProductName}</b>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        Sales Price :
                                    </Col>
                                    <Col>
                                        <b>{order.retailPrice}</b>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        Total Price :
                                    </Col>
                                    <Col>
                                        <b>{this.calculateTotalPrice().price}</b>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        Total Quantity :
                                    </Col>
                                    <Col>
                                        <b>{this.calculateTotalPrice().quantity}</b>
                                    </Col>
                                </Row>
                                <b>Quantity</b>
                                <Col>{order.requiredProductQuantity}</Col>
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
                                            <th>MO#</th>
                                            <th>Material Name</th>
                                            <th>Material Cost</th>
                                            <th>Estimated Quantity</th>
                                            <th>
                                                {order.status_manufacture_order[0].status === status.quantityCheck ?
                                                        "Used Quantity": null}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.manufacture_item_set ? order.manufacture_item_set.map((item, index) => (
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{item.componentName}</td>
                                                <td>{item.price}</td>
                                                <td>{item.quantity}</td>
                                                <td>
                                                    {
                                                        order.status_manufacture_order[0].status === status.quantityCheck ?
                                                            <Input type='number' placeholder="Used Quantity" max={item.quantity} onChange={
                                                                (event) => this.handleChange({
                                                                    value: event.target.value,
                                                                    name: 'newQuantity',
                                                                    index
                                                                })} /> : null}
                                                </td>
                                            </tr>
                                        )) : null}
                                    </tbody>
                                </Table>



                                //new addeded inputs 
                                <Col>
                                    <Card>
                                        <CardHeader>Categorize Manufactured outputs</CardHeader>
                                        <CardBody>
                                            <Form>
                                                <Row>
                                                    <Col md={6} sm={12}>
                                                        <FormGroup>
                                                            <Label for="For_Export" sm={12}>For Export</Label>
                                                            <Col sm={12}>
                                                                <Input placeholder="Enter amount to be exported " name="ToExport" onChange={console.log('export selected ')} />

                                                            </Col>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col>
                                                        <FormGroup>
                                                            <Label for="For_Local" sm={12}>For Local Use </Label>
                                                            <Col sm={12}>
                                                                <Input placeholder="Enter amount for the local usage " name="ToExport" onChange={console.log('export selected ')} />

                                                            </Col>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={6} sm={12}>
                                                        <FormGroup>
                                                            <Label for="Waste" sm={12}>Waste</Label>
                                                            <Col sm={12}>
                                                                <Input placeholder="Enter amount to be thrown away" name="Waste" onChange={console.log('Waste selected  ')} />

                                                            </Col>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col >
                                                        <Button color='primary' onClick={console.log('button clicked ')}>
                                                            SUBMIT
                                        </Button>
                                                    </Col>

                                                </Row>

                                            </Form>
                                        </CardBody>
                                    </Card>

                                </Col>




                            </CardBody>
                        </Col>
                    </Row>
                    <CardBody>
                        {order.status_manufacture_order[0].status === status.quantityCheck ?
                        <div>
                            <Row style={{ display: "flex", justifyContent: "center" }}>
                                <Button color='primary' className='pl-5 pr-5' onClick={this.updateBomQuantity} disabled={
                                    order.status_manufacture_order[0].status === status.confirmed} style={{ marginBottom: 20 }}>
                                    Confirm BOM
                                </Button>
                            </Row>
                            {this.state.hasComponents? <UpdateComponents orderID={this.state.order.orderNumber} quantity={this.calculateTotalPrice().quantity} /> : null}
                        </div>
                        : null}
                    </CardBody>
                </Card>
            </Page>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        errors: state.manuFacturingReducer.errors,
        loading_manufactured_orders: state.manuFacturingReducer.loading_manufactured_orders,
        orders: state.manuFacturingReducer.orders,
        loading_manufacture: state.manuFacturingReducer.loading_manufacture,
        success: state.manuFacturingReducer.success,
        updatedOrders: state.manuFacturingReducer.orders
    }
}

export default connect(mapStateToProps, { updateQuantity })(SingleOrderPage)
