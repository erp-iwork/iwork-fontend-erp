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
            productName: '', productType: '', productCategory: '', productPrice: ''
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
                                    <Label for="exampleEmail" sm={2}>
                                        Product Name
                                    </Label>
                                    <Col sm={12}>
                                        <Input
                                            placeholder="Product Name"
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup >
                                    <Label for="examplePassword" sm={2}>
                                        Product Type
                                    </Label>
                                    <Col sm={12}>
                                        <Input
                                            type="select"
                                            name="select"
                                        >
                                            <option>Consumable</option>
                                            <option>Stored</option>
                                            <option>Service</option>

                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup >
                                    <Label for="examplePassword" sm={2}>
                                        Product Category
                                    </Label>
                                    <Col sm={12}>
                                        <Input
                                            type="select"
                                            name="select"
                                        >
                                            <option>Something</option>
                                            <option>Something</option>
                                            <option>Something</option>

                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup >
                                    <Label for="exampleEmail" sm={2}>
                                        Price
                                    </Label>
                                    <Col sm={12}>
                                        <Input
                                            placeholder="Price"
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label className='isManufactured'> </Label>
                                    <Col>
                                        <Input sm={12} md={12} type="checkbox" id="checkbox2" /> Can Be Manufactured
                                    </Col>
                                </FormGroup>
                                <hr></hr>
                                <FormGroup>
                                    {items.map((v, i) => (
                                        <Row>
                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label md={12}>
                                                        Item Name
                                                </Label>
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