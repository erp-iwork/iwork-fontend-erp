
import React, { Component } from 'react';
import Page from '../../components/Page';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Form,
    Row,
    FormGroup,
    Input,
    Table,
    Label,
} from 'reactstrap';
import "./Procurment.scss";
import { connect } from 'react-redux'
import Error from '../../components/error'
import { getCreatedOrders, getSuppliers, getMasterdata, addPurchaseOrder } from '../../store/procurement/action'
import PageSpinner from '../../components/PageSpinner'
import Loader from '../../components/loader'

class CreatePurchaseOrder extends Component {
    constructor() {
        super();
        this.state = {
            fieldName: "",
            orderNumber: "",
            orderName: "",
            supplier: "",
            description: "",
            discount: "",
            itemQuantity: 0,
            InventoryItem: "",
            shipmentAddress: "",
            submitted: false,
            lockPage: false,
            order_items: [{ masterData_id: "", purchaseQuantity: 1 }]
        }
        this.handleAddItem = this.handleAddItem.bind(this)
        this.handleRemoveItem = this.handleRemoveItem.bind(this)
        this.ItemNameChange = this.ItemNameChange.bind(this)
        this.ItemQuantityChange = this.ItemQuantityChange.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.submit = this.submit.bind(this)
    }

    componentDidMount() {
        this.props.getCreatedOrders()
        this.props.getSuppliers()
        this.props.getMasterdata()
    }

    updateOrders() {
        this.props.getCreatedOrders()
    }

    handleAddItem = () => {
        this.setState({
            order_items: this.state.order_items.concat([
                { masterData_id: "", purchaseQuantity: 1 },
            ])
        })
    }

    handleRemoveItem = (idx) => {
        this.setState({
            order_items: this.state.order_items.filter((s, sidx) => idx !== sidx),
        })
    }

    ItemNameChange = (idx) => (evt) => {
        const neworder_items = this.state.order_items.map((item, sidx) => {
            if (idx !== sidx) return item;
            return {
                ...item,
                masterData_id: evt.target.value,
            };
        });

        this.setState({ order_items: neworder_items })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.success && !this.state.lockPage) {
            this.setState({ company: "", description: "", shipmentAddress: "", lockPage: true })
        }
    }

    ItemQuantityChange = (idx) => (evt) => {
        const neworder_items = this.state.order_items.map((item, sidx) => {
            if (idx !== sidx) return item;
            return { ...item, purchaseQuantity: evt.target.value };
        });

        this.setState({ order_items: neworder_items });
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    submit = () => {
        this.props.addPurchaseOrder({
            "purchase_item_order": this.state.order_items,
            "orderdBy": localStorage.getItem('username'),
            "description": this.state.description,
            suplier_id: this.state.supplier
        });
        this.setState({ lockPage: false })
        if (this.props.success) {
            this.setState({
                supplier: "", description: ""
            })
            this.updateOrders()
        }
    }

    render() {
        let { order_items: items } = this.state
        if (this.props.loading_orders || this.props.loading_suppliers || this.props.loading_masterdata) return <PageSpinner />
        const {
            supplier, description
        } = this.state
        return (
            <Page title="Procurment" breadcrumbs={[{ name: 'Create Purchase Order', active: true }]}>
                <Row>
                    <Col md={6} sm={12}>
                        <Card>
                            <CardHeader>Order Information</CardHeader>
                            <CardBody>
                                <Form>
                                    <FormGroup>
                                        <Label for="exampleSelect" sm={5}>
                                            Supplier
                                            </Label>
                                        <Col sm={12}>
                                            <Input type="select" name="supplier" value={supplier} onChange={this.handleChange}>
                                                <option aria-label="None" value="" disabled>Supplier Name</option>
                                                {this.props.suppliers.map((supplier, idx) => (
                                                    <option value={supplier.suplierId} key={idx}>
                                                        {supplier.suplierName}
                                                    </option>
                                                ))}
                                            </Input>
                                            <Error
                                                error={
                                                    this.props.errors.purchaseOrder.suplier_id
                                                        ? this.props.errors.purchaseOrder.suplier_id
                                                        : null}
                                            />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup >
                                        <Label for="exampleText" sm={4}>
                                            Description
                                    </Label>
                                        <Col sm={12}>
                                            <Input placeholder=" Description About the Order" type="textarea"
                                                name="description"
                                                onChange={this.handleChange}
                                                value={description} />
                                            <Error
                                                error={
                                                    this.props.errors.purchaseOrder.description
                                                        ? this.props.errors.purchaseOrder.description
                                                        : null} />
                                        </Col>
                                    </FormGroup>
                                    <CardHeader>Item Information</CardHeader>
                                    {items.map((v, i) => {
                                        return (
                                            <Row className='duplicatedForm' key={i}>
                                                <Col md={6}>
                                                    <Input onChange={this.ItemNameChange(i)} value={v.InventoryItemId} type="select">
                                                        <option aria-label="None" value="" disabled selected></option>
                                                        {this.props.masterdata.map((_item, idx) => (
                                                            <option value={_item.productId} key={idx}>
                                                                {_item.productName}
                                                            </option>
                                                        ))}
                                                    </Input>
                                                </Col>
                                                <Col md={5}>
                                                    <Input
                                                        type='number'
                                                        defaultValue={1}
                                                        placeholder={`Item #${i + 1} quantity`}
                                                        onChange={this.ItemQuantityChange(i)}
                                                    >
                                                    </Input>
                                                </Col>
                                                <Col md={1}>
                                                    <Button onClick={() => this.handleRemoveItem(i)}>-</Button>
                                                </Col>
                                            </Row>
                                        );
                                    })}
                                    <FormGroup>
                                        {
                                            this.props.errors.purchaseOrder.purchase_item_order
                                                ? this.props.errors.purchaseOrder.purchase_item_order.map(err => (
                                                    <div>
                                                        <Error
                                                            error={
                                                                err.masterData_id
                                                                    ? err.masterData_id
                                                                    : null} />
                                                        <Error
                                                            error={
                                                                err.purchaseQuantity
                                                                    ? err.purchaseQuantity
                                                                    : null} />
                                                    </div>


                                                ))
                                                : null}



                                    </FormGroup>
                                    <FormGroup>
                                        <Button
                                            onClick={() => this.handleAddItem()}
                                            size='sm'
                                            color='primary'
                                        >
                                            Add Another Item
                                    </Button>
                                    </FormGroup>
                                    <FormGroup align='center'>
                                        <Button color='primary' onClick={this.submit}>
                                            {this.props.loading_purchase ? <Loader /> : "Place Order"}
                                        </Button>
                                    </FormGroup>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md={6} sm={12}>
                        <Card >
                            <CardHeader>Recent Purchase Orders</CardHeader>
                            <CardBody>
                                <Table responsive className="scrollTable">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Supplier</th>
                                            <th>Orderd By</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.props.orders ? this.props.orders.slice(0)
                                            .reverse().slice(0, 9).map((order, index) => (
                                                <tr key={index}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{order.suplier.suplierName}</td>
                                                    <td>{order.orderdBy}</td>
                                                    <td>{order.status_purchase_order[0]['status']}</td>
                                                </tr>
                                            )) : ""}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Page>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading_orders: state.procurementReducer.loading_orders,
        loading_suppliers: state.procurementReducer.loading_suppliers,
        loading_masterdata: state.procurementReducer.loading_masterdata,
        loading_purchase: state.procurementReducer.loading_purchase,
        errors: state.procurementReducer.errors,
        orders: state.procurementReducer.orders,
        suppliers: state.procurementReducer.suppliers,
        masterdata: state.procurementReducer.masterdata,
        success: state.procurementReducer.success
    }
}

export default connect(mapStateToProps, {
    getCreatedOrders, getSuppliers, getMasterdata, addPurchaseOrder
})(CreatePurchaseOrder)