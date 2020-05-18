
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
import "./Sales.scss";
import ViewAllOrdersPage from "./ViewAllOrdersPage";
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Error from '../../components/error'
import actions from '../../store/sales/action'
import PageSpinner from '../../components/PageSpinner'

class CreateOrdersPage extends Component {
    constructor() {
        super();
        this.state = {
            fieldName: "",
            orderNumber: "",
            orderName: "",
            company: "",
            description: "",
            discount: "",
            itemQuantity: 0,
            InventoryItem: "",
            shipmentAddress: "",
            order_items: [{ InventoryItem: "", quantity: 1 }]
        }
    }

    componentDidMount() {
        this.props.getAllCompany()
        this.props.getAllItem()
        this.props.getAllOrder()
    }

    handleAddItem = () => {
        this.setState({
          order_items: this.state.order_items.concat([
            { InventoryItem: "", quantity: 1 },
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
            InventoryItem: evt.target.value,
          };
        });
    
        this.setState({ order_items: neworder_items });
    }

    ItemQuantityChange = (idx) => (evt) => {
        const neworder_items = this.state.order_items.map((item, sidx) => {
          if (idx !== sidx) return item;
          return { ...item, quantity: evt.target.value, name: evt.target.name };
        });
    
        this.setState({ order_items: neworder_items });
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        let { order_items: items } = this.state;
        if (!this.props.companys[0]) return <PageSpinner />
        return (
            <Page title="Create Order" breadcrumbs={[{ name: 'Create Order', active: true }]}>
                <Row>
                    <Col md={6} sm={12}>
                        <Card>
                            <CardHeader>Order Information</CardHeader>
                            <CardBody>
                                <Form>
                                    <FormGroup>
                                        <Label for="exampleSelect" sm={5}>
                                            Customer
                                            </Label>
                                        <Col sm={12}>
                                            <Input type="select" name="gender" onChange={this.handleChange}>
                                                <option aria-label="None" value="" disabled>Customer Name</option>
                                                {this.props.companys.map((comp, idx) => (
                                                    <option value={comp.companyId} key={idx}>
                                                        {comp.companyName}
                                                    </option>
                                                ))}
                                            </Input>
                                            <Error
                                                error={
                                                    this.props.errors.company
                                                    ? this.props.errors.company
                                                    : null
                                                }
                                            />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="examplePassword" sm={12}>
                                            Shipment Address
                                    </Label>
                                        <Col sm={12}>
                                            <Input
                                                name="shipmentAddress"
                                                placeholder=" Shipment Address"
                                                onChange={this.handleChange}
                                            />
                                            <Error
                                                error={
                                                    this.props.errors.shipmentAddress
                                                    ? this.props.errors.shipmentAddress
                                                    : null
                                                }
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
                                            />
                                            <Error
                                                error={
                                                    this.props.errors.description
                                                    ? this.props.errors.description
                                                    : null
                                                }
                                            />
                                        </Col>
                                    </FormGroup>

                                    <CardHeader>Item Information</CardHeader>
                                    {items.map((v, i) => {
                                        return (
                                            <Row className='duplicatedForm' key={i}>
                                                <Col md={6}>
                                                    <Input value={v} onChange={this.ItemNameChange(i)} type="select" name="Item Name">
                                                        <option aria-label="None" value="" disabled>Item Name</option>
                                                        {this.props.items.map((_item) => (
                                                            <option value={_item.InventoryItemId}>
                                                            {_item.itemName}
                                                            </option>
                                                        ))}
                                                    </Input>
                                                </Col>
                                                <Col md={5}>
                                                    <Input
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
                                        this.props.errors.item_order ? this.props.errors.item_order.map((item) => (
                                        <Error
                                            error={
                                            item.InventoryItem

                                            }
                                        />
                                        )

                                        ) : null
                                    }
                                    <Error
                                        error={
                                        this.props.errors.itemName
                                            ? this.props.errors.itemName
                                            : null
                                        }
                                    />
                                    <Button
                                        onClick={() => this.handleAddItem()}
                                        size='sm'
                                        color='primary'
                                    >
                                        Add Another Item
                                    </Button>
                                    </FormGroup>
                                    <FormGroup align='center'>
                                        <Button color='primary' onClick={this.submit}>Place Order</Button>
                                    </FormGroup>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md={6} sm={12}>
                        <Card >
                            <CardHeader>Recent Orders</CardHeader>
                            <CardBody>
                                <Table responsive className="scrollTable">
                                    <thead>
                                        <tr>
                                            <th> ID</th>
                                            <th >Customer</th>
                                            <th>Sales Person</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td >Mark</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">2</th>
                                            <td >Jacob</td>
                                            <td>Thornton</td>
                                            <td>@fat</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">3</th>
                                            <td >Larry</td>
                                            <td>the Bird</td>
                                            <td>@twitter</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">3</th>
                                            <td>Larry</td>
                                            <td>the Bird</td>
                                            <td>@twitter</td>
                                        </tr>

                                        <tr>
                                            <th scope="row">3</th>
                                            <td>Larry</td>
                                            <td>the Bird</td>
                                            <td>@twitter</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">3</th>
                                            <td>Larry</td>
                                            <td>the Bird</td>
                                            <td>@twitter</td>
                                        </tr>

                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>

                    </Col>

                </Row>

                <ViewAllOrdersPage />

            </Page>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      loading: state.salesReducer.loading,
      errors: state.salesReducer.errors,
      items: state.salesReducer.items,
      companys: state.salesReducer.companys,
      success: state.salesReducer.success,
      orders:state.salesReducer.orders
    }
}
const mapDispatchToProps = {
    createOrder: actions.createOrder,
    getAllItem: actions.getAllItem,
    getAllCompany: actions.getAllCompany,
    getAllOrder: actions.getAllOrder
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrdersPage)