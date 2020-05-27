import React, { Component } from 'react';
import Page from "../../components/Page";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Form,
    FormGroup,
    Input,
    Label,
    Row,
} from 'reactstrap';
import { connect } from 'react-redux'
import { getMasterdata, addManufacturingOrder } from '../../store/manufacturing/action'
import PageSpinner from '../../components/PageSpinner'
import Error from '../../components/error'
import Loader from '../../components/loader'
import routes from '../../config/routes'
import { Redirect } from 'react-router-dom'

const BOM = ({ index, materialName, unitOfMeasurement, quantity, cost }) => {
    return (
        <Row>
            <Col sm={12} md={3}>
                <FormGroup >
                    <Label for="exampleSelect" sm={12}>
                        Material Name
                </Label>
                    <Col sm={12}>
                        <Input disabled type="text" value={materialName} placeholder='Material Name' name="select" />
                    </Col>
                </FormGroup>
            </Col>
            <Col sm={12} md={3}>
                <FormGroup >
                    <Label for="exampleSelect" sm={12}>
                        Unit Of Measurment
                </Label>
                    <Col sm={12}>
                        <Input type="text" disabled value={unitOfMeasurement} />
                    </Col>
                </FormGroup>
            </Col>
            <Col sm={12} md={3}>
                <FormGroup >
                    <Label for="exampleSelect" sm={12}>Cost</Label>
                    <Col sm={12}>
                        <Input type="text" disabled value={cost} />
                    </Col>
                </FormGroup>
            </Col>
            <Col sm={12} md={3}>
                <FormGroup>
                    <Label for="exampleSelect" sm={12}>Quantity</Label>
                    <Col sm={12}>
                        <Input type="text" disabled value={quantity} />
                    </Col>
                </FormGroup>
            </Col>
        </Row>
    )
}

class CreateOrderManufacturingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order_items: [],
            dropdown: false,
            productMaterial: [],
            productID: null,
            canBeManudactured: [],
            lockPage: false,
            quantity: null,
            description: '',
            startDate: '',
            endDate: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.setProducts = this.setProducts.bind(this)
    }
    handleChange = event => {
        const { name, value } = event.target
        if (name === "productMaterial") {
            this.setState({
                productMaterial: this.state.canBeManudactured[value]['product_material'], dropdown: true,
                productID: this.state.canBeManudactured[value]['productId']
            })
        } else {
            this.setState({ [name]: value })
        }
    }

    componentDidMount() {
        this.props.getMasterdata()
    }

    setProducts(canBeManudactured) {
        if (!this.state.lockPage) {
            this.setState({ canBeManudactured, lockPage: true })
        }
    }

    submit = event => {
        event.preventDefault()
        const { productID, productMaterial, description, quantity, startDate, endDate } = this.state
        const manufacture_item_set = productMaterial.map((item, index) => {
            return {
                billOfMaterial: item.materialId,
                quantity: item.materialQuantity,
                price: item.cost * quantity,
                unitOfMeasurement: item.materialUnitOfMeasurement
            }
        })
        this.props.addManufacturingOrder({
            requiredProduct: productID,
            manufacturePerson: localStorage.getItem('username'),
            description,
            manufatureStartDate: startDate, manufatureEndDate: endDate,
            requiredProductQuantity: quantity,
            manufacture_item_set
        })
    }

    render() {
        let { dropdown } = this.state
        if (this.props.success) return <Redirect to={routes.ViewAllOrdersManufacturing} />
        if (this.props.loading_masterdata) return <PageSpinner />
        const canBeManudactured = this.props.masterdata.filter((data) => { return data.isManufactured })
        this.setProducts(canBeManudactured)
        var errors = {}
        if (this.props.errors.errors) {
            errors = this.props.errors.errors
        }
        console.log(errors)
        return (
            <Page title="Manufacturing" breadcrumbs={[{ name: 'Create Order', active: true }]}>
                <Col md={12}>
                    <Card>
                        <CardHeader>Order Information</CardHeader>
                        <CardBody>
                            <Form onSubmit={this.submit}>
                                <Row>
                                    <Col sm={12} md={4}>
                                        <FormGroup >
                                            <Label for="productMaterial" sm={12}>
                                                Required Product
                                            </Label>
                                            <Col sm={12}>
                                                <Input name="productMaterial" type="select" id="productMaterial" onChange={this.handleChange}>
                                                    <option selected></option>
                                                    {canBeManudactured.map((item, index) => (
                                                        <option value={index}>{item.productName}</option>
                                                    ))}
                                                </Input>
                                                <Error error={errors.requiredProduct} />
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                    <Col sm={12} md={4}>
                                        <FormGroup>
                                            <Label for="exampleEmail" sm={12}>Personnel</Label>
                                            <Col sm={12}>
                                                <Input
                                                    disabled
                                                    placeholder="The Person Requesting The Order"
                                                    value={localStorage.getItem('username')}
                                                />
                                                <Error error={errors.manufacturePerson} />
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                    <Col sm={12} md={4}>
                                        <FormGroup >
                                            <Label for="quantity" sm={12}>
                                                Quantity
                                            </Label>
                                            <Col sm={12}>
                                                <Input type="number" name='quantity' id="quantity" onChange={this.handleChange} />
                                                <Error error={errors.requiredProductQuantity} />
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <div style={{ display: dropdown ? "" : "none" }}>
                                    <Col>
                                    </Col>
                                    <h4>Bill Of Materials</h4>
                                    <hr />
                                        {this.state.productMaterial.map((item, index) => (
                                            <BOM key={index}
                                                materialName={item.materialName}
                                                unitOfMeasurement={item.materialUnitOfMeasurement}
                                                cost={item.cost}
                                                quantity={item.materialQuantity}
                                            />
                                        ))}
                                        {/* <Error error={errors.manufacture_item_set} /> */}
                                    <hr />
                                </div>
                                <FormGroup >
                                    <Label for="description" sm={12}>
                                        Description
                                    </Label>
                                    <Col sm={12}>
                                        <Input
                                            type='textarea'
                                            name="description"
                                            id="description"
                                            placeholder="Description"
                                            onChange={this.handleChange}
                                        />
                                        <Error error={errors.description} />
                                    </Col>
                                </FormGroup>
                                <Row>
                                    <Col sm={12} md={6}>
                                        <FormGroup >
                                            <Label for="startDate" sm={12}>
                                                Manufactuting Start Date
                                            </Label>
                                            <Col sm={12}>
                                                <Input type="date" name="startDate" id="startDate" onChange={this.handleChange} />
                                                <Error error={errors.manufatureStartDate} />
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                    <Col sm={12} md={6}>
                                        <FormGroup >
                                            <Label for="endDate" sm={12}>
                                                Manufacturing End Date
                                            </Label>
                                            <Col sm={12}>
                                                <Input type="date" name="endDate" id="endDate" onChange={this.handleChange} />
                                                <Error error={errors.manufatureEndDate} />
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <FormGroup align='center'>
                                    <Button color='primary' type="submit">
                                        { this.props.loading_manufacture? <Loader /> : "Add Order" }
                                    </Button>
                                </FormGroup>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Page>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        errors: state.manuFacturingReducer.errors,
        success: state.manuFacturingReducer.success,
        loading_masterdata: state.manuFacturingReducer.loading_masterdata,
        loading_manufacture: state.manuFacturingReducer.loading_manufacture,
        masterdata: state.manuFacturingReducer.masterdata
    }
}

export default connect(mapStateToProps, { getMasterdata, addManufacturingOrder })(CreateOrderManufacturingPage)