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
    Label,
} from 'reactstrap';
import './Finance.scss'

class AddMasterDataPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order_items: [],
            items: '', lockPage: false,
            can_be_manufactured: false, can_be_sold: false, can_be_purchased: false,
            productName: '', productType: '', productCategory: '', productPrice: '',
            price: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.ItemNameChange = this.ItemNameChange.bind(this)
        this.ItemUnitChange = this.ItemUnitChange.bind(this)
        this.ItemQuantityChange = this.ItemQuantityChange.bind(this)
    }

    handleAddItem = () => {
        this.setState({
            order_items: this.state.order_items.concat([
                { InventoryItem: "", quantity: 1, unit: "" },
            ])
        })
    }

    componentDidUpdate(prevProps, prevState) {
        const { can_be_manufactured, lockPage } = this.state
        if (can_be_manufactured && !lockPage) {
            this.setState({ lockPage: true })
            this.handleAddItem()
        }
    }

    handleRemoveItem = (idx) => {
        this.setState({
            order_items: this.state.order_items.filter((s, sidx) => idx !== sidx),
        })
    }

    handleChange = event => {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }

    ItemNameChange = (idx) => (evt) => {
        const neworder_items = this.state.order_items.map((item, sidx) => {
            if (idx !== sidx) return item;
            return {
                ...item,
                InventoryItem: evt.target.value,
            };
        });

        this.setState({ order_items: neworder_items })
    }

    ItemUnitChange = (idx) => (evt) => {
        const neworder_items = this.state.order_items.map((item, sidx) => {
            if (idx !== sidx) return item;
            return { ...item, unit: evt.target.value };
        });

        this.setState({ order_items: neworder_items });
    }

    ItemQuantityChange = (idx) => (evt) => {
        const neworder_items = this.state.order_items.map((item, sidx) => {
            if (idx !== sidx) return item;
            return { ...item, quantity: evt.target.value };
        });

        this.setState({ order_items: neworder_items });
    }

    render() {
        let { order_items: items, can_be_manufactured } = this.state
        return (
            <Page
                title="Master Data"
                breadcrumbs={[{ name: 'Add Master Data', active: true }]}
            >
                <Col lg={12} md={12}>
                    <Card>
                        <CardHeader>Add Master Data</CardHeader>
                        <CardBody>
                            <Form>
                                <FormGroup >
                                    <Label for="productName" sm={2}>Product Name</Label>
                                    <Col sm={12}>
                                        <Input id="productName" placeholder="Product Name" onChange={this.handleChange} name="productName" />
                                    </Col>
                                </FormGroup>
                                <FormGroup >
                                    <Label for="productType" sm={2}>Product Type</Label>
                                    <Col sm={12}>
                                        <Input
                                            id="productType"
                                            type="select"
                                            name="productType"
                                            onChange={this.handleChange}
                                        >
                                            <option value="Consumable">Consumable</option>
                                            <option value="Stored">Stored</option>
                                            <option value="Service">Service</option>
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup >
                                    <Label for="productCategory" sm={2}>Product Category</Label>
                                    <Col sm={12}>
                                        <Input id="productCategory" placeholder="Product Category" name="productCategory" onChange={this.handleChange} />
                                    </Col>
                                </FormGroup>
                                <FormGroup >
                                    <Label for="price" sm={2}>
                                        Price
                                    </Label>
                                    <Col sm={12}>
                                        <Input
                                            placeholder="Price"
                                            id="price"
                                            name="price"
                                            type="number"
                                            onChange={this.handleChange}
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <Row className='isManufactured'>
                                        <Col sm={12} md={4}>
                                            <Input name="can_be_manufactured" type="checkbox" id="checkbox1" onChange={
                                                (event) => this.handleChange({ target: { name: event.target.name, value: event.target.checked }}) 
                                            }/>
                                            <Label for="checkbox1">Can Be Manufactured</Label>
                                        </Col>
                                        <Col sm={4} md={4}>
                                            <Input name="can_be_sold" type="checkbox" id="checkbox2" onChange={
                                                (event) => this.handleChange({ target: { name: event.target.name, value: event.target.checked }}) 
                                            }/>
                                            <Label for="checkbox2">Can Be Sold</Label>
                                        </Col>
                                        <Col sm={12} md={4}>
                                            <Input name="can_be_purchased" type="checkbox" id="checkbox3" onChange={
                                                (event) => this.handleChange({ target: { name: event.target.name, value: event.target.checked }}) 
                                            }/>
                                        <Label for="checkbox3">Can Be Purchased</Label>
                                        </Col>
                                    </Row>
                                </FormGroup>
                                <hr></hr>
                                <FormGroup>
                                    {items.map((v, i) => (
                                        <Row style={{ display: can_be_manufactured ? "flex" : "none" }}>
                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label md={12} for="item_name">Item Name</Label>
                                                    <Col md={12}>
                                                        <Input type="text" id="item_name" name="item_name" onChange={this.ItemNameChange(i)} />
                                                    </Col>
                                                </FormGroup>
                                            </Col>
                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label md={12} for="unit_of_measurement">Unit Of Measurment</Label>
                                                    <Col md={12}>
                                                        <Input type='select' defaultValue={""} id="unit_of_measurement" name="unit_of_measurement" onChange={this.ItemUnitChange(i)}>
                                                            <option disabled></option>
                                                            <option>Litre</option>
                                                            <option>KM</option>
                                                            <option>Liter</option>
                                                        </Input>
                                                    </Col>
                                                </FormGroup>
                                            </Col>
                                            <Col md={3}>
                                                <FormGroup>
                                                    <Label md={12} for="item_quantity">Quantity</Label>
                                                    <Col md={12}>
                                                        <Input type='number' id="item_quantity" onChange={this.ItemQuantityChange(i)} />
                                                    </Col>
                                                </FormGroup>
                                            </Col>
                                            <Col md={1}>
                                                <FormGroup className="removeButton">
                                                    <Button onClick={() => this.handleRemoveItem(i)}>-</Button>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        ))}
                                    <Button onClick={() => this.handleAddItem()} color='primary'
                                        style={{ display: can_be_manufactured? "flex" : "none", marginLeft: "1%" }}
                                    >Add Another One</Button>
                                </FormGroup>
                                <FormGroup align='center'>
                                    <Col >
                                        <Button onClick={() => this.handleAddItem()} color='primary'>Submit</Button>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Page>
        );
    }
}

export default AddMasterDataPage;