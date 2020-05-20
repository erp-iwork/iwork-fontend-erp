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
            items: '',
            can_be_manufactured: false,
            productName: '', productType: '', productCategory: '', productPrice: '',
            price: ''
        }
        this.handleChange = this.handleChange.bind(this)
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

    handleChange = event => {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }

    render() {
        let { order_items: items } = this.state
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
                                        <Input id="productCategory" placeholder="Product Category"  name="productCategory" onChange={this.handleChange} />
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
                                            <Input name="" type="checkbox" id="checkbox1" onChange={
                                                (event) => this.handleChange({ target: { name: event.target.name, value: event.target.checked }}) 
                                            }/>
                                            <Label for="checkbox1">Can Be Manufactured</Label>
                                        </Col>
                                        <Col sm={4} md={4}>
                                            <Input  type="checkbox" id="checkbox2" onChange={
                                                (event) => this.handleChange({ target: { name: event.target.name, value: event.target.checked }}) 
                                            }/>
                                            <Label for="checkbox2">Can Be Sold</Label>
                                        </Col>
                                        <Col sm={12} md={4}>
                                            <Input  type="checkbox" id="checkbox3" onChange={
                                                (event) => this.handleChange({ target: { name: event.target.name, value: event.target.checked }}) 
                                            }/>
                                        <Label for="checkbox3">Can Be Purchased</Label>
                                        </Col>
                                    </Row>
                                </FormGroup>
                                <hr></hr>
                                <FormGroup>
                                    {items.map((v, i) => (
                                        <Row>
                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label md={12}>Item Name</Label>
                                                    <Col md={12}>
                                                        <Input></Input>
                                                    </Col>
                                                </FormGroup>
                                            </Col>
                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label md={12}>
                                                        Unit Of Measurment
                                                </Label>
                                                    <Col md={12}>
                                                        <Input type='select' value=''>
                                                            <option>Litre</option>
                                                            <option>KM</option>
                                                            <option>Liter</option>
                                                        </Input>
                                                    </Col>
                                                </FormGroup>
                                            </Col>
                                            <Col md={3}>
                                                <FormGroup>
                                                    <Label md={12}>
                                                        Quantity
                                                </Label>
                                                    <Col md={12}>
                                                        <Input type='number' value=''>
                                                        </Input>
                                                    </Col>
                                                </FormGroup>
                                            </Col>
                                            <Col md={1}>
                                                <FormGroup>
                                                    <Label>
                                                        Remove
                                                    </Label>
                                                    <Button onClick={() => this.handleRemoveItem(i)}>-</Button>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        ))}
                                    <Button onClick={() => this.handleAddItem()} color='primary'>Add Another One</Button>
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