import React from 'react'
import {
    Col,
    FormGroup, Input, Label, Row
} from 'reactstrap'

const BOM = ({ index , materialName, unitOfMeasurement, quantity, cost }) => {
    return (
        <Row >
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
export default BOM