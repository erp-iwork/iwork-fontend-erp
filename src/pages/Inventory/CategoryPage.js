import React, { Component } from 'react';
import Page from '../../components/Page';
import { Card, Row, Col, CardBody, Button, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShareAlt } from '@fortawesome/free-solid-svg-icons'
import './Inventory.scss'
import PageSpinner from '../../components/PageSpinner'
import { getExistingCategories, checkToast, addCategory } from '../../store/inventory/action'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import routes from '../../config/routes'
// import { ToastContainer } from "react-toastr";
import './Inventory.scss'

class CategoryPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryID: null,
            showCategoryField: false,
            category: ''
        }
        this.addCategoryField = this.addCategoryField.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.addCategory = this.addCategory.bind(this)


    }
    componentDidMount() {
        this.props.getExistingCategories()
    }
    addCategoryField() {
        this.setState({ showCategoryField: true })

    }
    async handleChange(e) {
        this.setState({ category: e.target.value })
        if (e.key === 'Enter') {

            await this.props.addCategory(e.target.value)
            if (this.props.add_category_success) {
                this.setState({
                    showCategoryField: false
                })
            }


        }

    }

    async addCategory() {
        await this.props.addCategory(this.state.category)

        if (this.props.add_category_success) {
            this.setState({
                showCategoryField: false
            })
        }



    }

    render() {
        if (this.props.loading_categories) return <PageSpinner />
        if (this.props.success && this.state.categoryID !== null) {
            return <Redirect to={{
                pathname: routes.ViewAllItems,
                state: this.state.categoryID
            }} />
        }
        if (this.props.categories.length === 0) return <Page title="Categories" breadcrumbs={[{ name: 'Inventory', active: true }]}> No Categories have been registered</Page>
        return (
            <Page
                title="Categories"
                breadcrumbs={[{ name: 'Inventory', active: true }]}
                className="CardPage"
            >
                <Row>
                    <Col md={2}>
                        <Button size='sm' color='primary' onClick={this.addCategoryField} >
                            Add New Category
                </Button>
                    </Col>
                    <Col md={10}>
                        {this.state.showCategoryField ?
                            <Row>
                                <Col>
                                    <Input onKeyPress={this.handleChange} type='text' placeholder='Enter Your New Category Here' />
                                </Col>
                                <Col>
                                    <Button onClick={this.addCategory} size='sm' color='primary'>
                                        Submit Category
                            </Button>
                                </Col>
                            </Row>

                            : null}
                    </Col>
                </Row>
                <Row>
                    {this.props.categories.map((item, index) => (
                        <Col md={4} sm={12} xs={12} onClick={() => this.setState({ categoryID: item.catagoryId })}>
                            <Card className='box' >
                                <CardBody>
                                    <Row>
                                        <Col className='icons' md={3} sm={12} xs={12}>
                                            <FontAwesomeIcon icon={faShareAlt} size="5x" color="#7D7D7D" transform={{ rotate: 42 }} />
                                        </Col>
                                        <Col >
                                            <h4>{item.catagory}</h4>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Page>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading_categories: state.inventoryReducer.loading_categories,
        categories: state.inventoryReducer.categories,
        success: state.inventoryReducer.success,
        add_category_success: state.inventoryReducer.add_category_success
    }
}

export default connect(mapStateToProps, { getExistingCategories, checkToast, addCategory })(CategoryPage)