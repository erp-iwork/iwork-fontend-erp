import React, { Component } from 'react';
import Page from '../../components/Page';

import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Form,
    FormFeedback,
    FormGroup,
    FormText,
    Input,
    Label,
    Row,
  } from 'reactstrap';

class AddEmployeePage extends Component {
    state = {  }
    render() { 
        return ( 
            <Page title="Add Employee" breadcrumbs={[{ name: 'Add Employee', active: true }]}>

<Col xl={6} lg={12} md={12}>
          <Card>
            <CardHeader>Form Grid</CardHeader>
            <CardBody>
              <Form>
                <FormGroup row>
                  <Label for="exampleEmail" sm={2}>
                    Email
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="email"
                      name="email"
                      placeholder="with a placeholder"
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="examplePassword" sm={2}>
                    Password
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="password"
                      name="password"
                      placeholder="password placeholder"
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleSelect" sm={2}>
                    Select
                  </Label>
                  <Col sm={10}>
                    <Input type="select" name="select" />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleSelectMulti" sm={2}>
                    Select Multiple
                  </Label>
                  <Col sm={10}>
                    <Input type="select" name="selectMulti" multiple />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleText" sm={2}>
                    Text Area
                  </Label>
                  <Col sm={10}>
                    <Input type="textarea" name="text" />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleFile" sm={2}>
                    File
                  </Label>
                  <Col sm={10}>
                    <Input type="file" name="file" />
                    <FormText color="muted">
                      This is some placeholder block-level help text for the
                      above input. It's a bit lighter and easily wraps to a new
                      line.
                    </FormText>
                  </Col>
                </FormGroup>
                <FormGroup tag="fieldset" row>
                  <Label for="checkbox2" sm={2}>
                    Radio
                  </Label>
                  <Col sm={10}>
                    <FormGroup check>
                      <Label check>
                        <Input type="radio" name="radio2" /> Option one is this
                        and that—be sure to include why it's great
                      </Label>
                    </FormGroup>
                    <FormGroup check>
                      <Label check>
                        <Input type="radio" name="radio2" /> Option two can be
                        something else and selecting it will deselect option one
                      </Label>
                    </FormGroup>
                    <FormGroup check disabled>
                      <Label check>
                        <Input type="radio" name="radio2" disabled /> Option
                        three is disabled
                      </Label>
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="checkbox2" sm={2}>
                    Checkbox
                  </Label>
                  <Col sm={{ size: 10 }}>
                    <FormGroup check>
                      <Label check>
                        <Input type="checkbox" id="checkbox2" /> Check me out
                      </Label>
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup check row>
                  <Col sm={{ size: 10, offset: 2 }}>
                    <Button>Submit</Button>
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
 
export default AddEmployeePage;