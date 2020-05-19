import React, { Component } from 'react';
import Page from '../../components/Page';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Form,
    FormGroup,
    Input,
    Row,
    Label,
} from 'reactstrap';
import AllCustomers from "./viewAllCutomersPage";
import './Finance.scss'
import Error from '../../components/error'
import { connect } from 'react-redux'
import { addCompany, getCompany } from '../../store/company/action'
import Loader from '../../components/loader'
import PageSpinner from '../../components/PageSpinner'

class AddCustomerPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companyName: "",
            generalManger: "",
            contactPerson: "",
            workingField: "",
            paymentOption: "",
            email: "",
            tinNumber: "",
            companys: [],
            loading: false
        }
        this.submit = this.submit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = event => {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }

    submit = async (e) => {
        e.preventDefault();
        const newCompany = {
          companyName: this.state.companyName,
          generalManger: this.state.generalManger,
          contactPerson: this.state.contactPerson,
          workingField: this.state.workingField,
          paymentOption: this.state.paymentOption,
          email: this.state.email,
          tinNumber: this.state.tinNumber,
        }
        this.setState({ loading: true })
        this.props.addCompany(newCompany).then(res => this.setState({ loading: false }))
        if (this.props.success) {
          this.setState({
            companyName: "",
            generalManger: "",
            contactPerson: "",
            workingField: "",
            paymentOption: "",
            email: "",
            tinNumber: ""
          })
        }
    }

    render() {
        return (
            <Page title="Add Customer" breadcrumbs={[{ name: 'Add Customer', active: true }]}>
                <Col lg={12} md={12} className='padding'>
                    <Card>
                        <CardHeader>ADD A NEW CUSTOMER TO WORK WITH</CardHeader>
                        <CardBody>
                            <Form>
                                <Row>
                                    <Col md={6} sm={12}>
                                        <FormGroup>
                                            <Label for="exampleEmail" sm={12}>
                                                Customer Name
                                    </Label>
                                            <Col sm={12}>
                                                <Input placeholder="Enter Customer Name" name="companyName" onChange={this.handleChange} />
                                                <Error
                                                    error={
                                                    this.props.errors.companyName
                                                        ? this.props.errors.companyName
                                                        : null
                                                    }
                                                />
                                            </Col>
                                        </FormGroup>

                                        <FormGroup>
                                            <Label for="examplePassword" sm={12}>
                                                General Manager
                                            </Label>
                                            <Col sm={12}>
                                                <Input placeholder="General Manager" name="generalManger" onChange={this.handleChange} />
                                                <Error
                                                    error={
                                                    this.props.errors.generalManger
                                                        ? this.props.errors.generalManger
                                                        : null
                                                    }
                                                />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="examplePassword" sm={12}>Contact Person</Label>
                                            <Col sm={12}>
                                                <Input
                                                    placeholder="Contact Person" name="contactPerson" onChange={this.handleChange}
                                                />
                                            </Col>
                                            <Error
                                                error={
                                                this.props.errors.contactPerson
                                                    ? this.props.errors.contactPerson
                                                    : null
                                                }
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="examplePassword" sm={12}>
                                                Tin Number
                                    </Label>
                                            <Col sm={12}>
                                                <Input
                                                    type="number"
                                                    placeholder="Tin Number"
                                                    name="tinNumber"
                                                    onChange={this.handleChange}
                                                />
                                                <Error
                                                    error={
                                                        this.props.errors.tinNumber
                                                        ? this.props.errors.tinNumber
                                                        : null
                                                    }
                                                />
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <Label for="exampleEmail" sm={12}>
                                                Customer Email
                                    </Label>
                                            <Col sm={12}>
                                                <Input
                                                    type="email"
                                                    name="email"
                                                    placeholder="Customer Email"
                                                    onChange={this.handleChange}
                                                />
                                                <Error
                                                    error={
                                                    this.props.errors.email ? this.props.errors.email : null
                                                    }
                                                />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label sm={12} for="exampleSelect">Payment Option</Label>
                                            <Col>
                                                <Input type="select" name="paymentOption" placeholder="Select payment option" onChange={this.handleChange}>
                                                    <option aria-label="None" value="Select payment option" />
                                                    <option>TOT</option>
                                                    <option>VAT</option>
                                                </Input>
                                                <Error
                                                    error={
                                                        this.props.errors.paymentOption
                                                        ? this.props.errors.paymentOption
                                                        : null
                                                    }
                                                />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="examplePassword" sm={12}>Field Of Work</Label>
                                            <Col sm={12}>
                                                <Input
                                                    placeholder="Field Of Work"
                                                    name="workingField"
                                                    onChange={this.handleChange}
                                                />
                                                <Error
                                                    error={
                                                    this.props.errors.workingField
                                                        ? this.props.errors.workingField
                                                        : null
                                                    }
                                                />
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <FormGroup >
                                    <Col align='center'>
                                        <Button color='primary' onClick={this.submit}>
                                            {this.state.loading? <Loader /> : "Add Customer"}
                                        </Button>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
                <AllCustomers lists={this.props.companys} />
            </Page>
        );
    }
}

const mapStateToProps = (state) => ({
    companys: state.companyReducer.companys,
    errors: state.companyReducer.errors,
    success: state.companyReducer.success
})

export default connect(mapStateToProps, { addCompany, getCompany })(AddCustomerPage)