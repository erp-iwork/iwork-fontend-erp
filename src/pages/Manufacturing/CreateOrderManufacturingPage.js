import React, { Component } from 'react'
import Page from "../../components/Page"
import {
    Button, Card, CardBody, CardHeader, Col,
    Form, FormGroup, Input, Label, Row, Alert,
} from 'reactstrap'
import { connect } from 'react-redux'
import { getMasterdata, addManufacturingOrder } from '../../store/manufacturing/action'
import PageSpinner from '../../components/PageSpinner'
import Error from '../../components/error/index'
import CustomAlert from '../../components/error/Alert'

import Loader from '../../components/loader'
import BOM from './billOfMaterial'



class CreateOrderManufacturingPage extends Component {
    constructor(props) {
        super(props)
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
            endDate: '',
            customCategory: '',
            showalert:false,

        }
        this.handleChange = this.handleChange.bind(this)
        this.setProducts = this.setProducts.bind(this)
    }
    handleChange = event => {
   
        const { name, value } = event.target
        if (name === "productMaterial") {
          
            this.setState({
                showalert:!this.state.showalert,
                productMaterial: this.state.canBeManudactured[value]['product_material'] ? this.state.canBeManudactured[value]['product_material'] : null, dropdown: true,
                productID: this.state.canBeManudactured[value]['productId'] ? this.state.canBeManudactured[value]['productId'] : null
            })
        } else {
            this.setState({ [name]: value })
        }
    }

    componentDidMount() {
        console.log('hello');
        
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
                quantity: item.materialQuantity * quantity,
                price: item.materialCost * quantity,
                unitOfMesurement: item.materialUnitOfMeasurement
            }
        })
        this.props.addManufacturingOrder({
            requiredProduct: productID,
            manufacturePerson: localStorage.getItem('username'),
            description,
            manufatureStartDate: startDate, manufatureEndDate: endDate,
            requiredProductQuantity: quantity,
            manufacture_item_set: manufacture_item_set
        })
    }

    render() {
        let { dropdown } = this.state
        if (this.props.loading_masterdata) return <PageSpinner />
        const canBeManudactured = this.props.masterdata.filter((data) => { return data.isManufactured })
        this.setProducts(canBeManudactured)
        var errors = {}
        if (this.props.errors) {
            errors = this.props.errors
        }
        return (
            <Page title="Create Order" breadcrumbs={[{ name: 'Manufacturing', active: true }]}>

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
                                                <Error error={errors.requiredProduct ? errors.requiredProduct : null} />

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
                                                <Error error={errors.manufacturePerson ? errors.manufacturePerson : null} />
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
                                                <Error error={errors.requiredProductQuantity ? errors.requiredProductQuantity : null} />
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
                                            cost={item.materialCost}
                                            quantity={item.materialQuantity}
                                        />
                                    ))}
                                    {
                                        errors.manufacture_item_set ? errors.manufacture_item_set.map((err) => (
                                            <div>
                                                <Error error={err.price ? err.price : null} />
                                                <Error error={err.billOfMaterial ? err.billOfMaterial : null} />
                                                <Error error={err.quantity ? err.quantity : null} />
                                                <Error error={err.unitOfMesurement ? err.unitOfMesurement : null} />
                                                <hr />

                                            </div>
                                        )
                                        ) : null
                                    }
                                    {errors.item ? (
                                        <Col>
                                            <Alert color="danger">
                                                {errors.item}
                                            </Alert>
                                        </Col>
                                    ) : null}
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
                                        <Error error={errors.description ? errors.description : null} />
                                    </Col>
                                </FormGroup>
                                <Row>
                                    <Col sm={12} md={6}>
                                        <FormGroup >
                                            <Label for="startDate" sm={12}>
                                                Manufacturing Start Date
                                            </Label>
                                            <Col sm={12}>
                                                <Input type="date" name="startDate" id="startDate" onChange={this.handleChange} />
                                                <Error error={errors.manufatureStartDate ? errors.manufatureStartDate : null} />
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
                                                <Error error={errors.manufatureEndDate ? errors.manufatureEndDate : null} />
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <FormGroup align='center'>
                                    <Button color='primary' type="submit">
                                        {this.props.loading_manufacture ? <Loader /> : "Add Order"}
                                    </Button>
                                </FormGroup>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>

                {/* This alert is applicable for only backend problem with error type <error> */}
{/* 
                {errors.error && this.state.showalert? (
                    console.log("xxxxxxxxxxxxxx"),
                    
                    <CustomAlert
                        msg={errors.error}
                        type="danger"
                    />


                ) : null}

                {this.props.success && this.state.showalert? (<CustomAlert
                    type="success"
                    msg=" Congratulation!  Your data registered successfully"
                />
                )
                    : null
                } */}

            </Page >
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