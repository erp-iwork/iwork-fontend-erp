import React, { Component } from 'react';
import Page from '../../components/Page';
import { Card,  Row, Col,  CardBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShareAlt } from '@fortawesome/free-solid-svg-icons'
import './Inventory.scss'
import PageSpinner from '../../components/PageSpinner'
import { getExistingCategories } from '../../store/inventory/action'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import routes from '../../config/routes'

class CategoryPage extends Component {
    constructor(props) {
        super(props);
        this.state = {   
            categoryID: null
        }
    }

    componentDidMount() {
        this.props.getExistingCategories()
    }

    render() {
        if (this.props.loading_categories) return <PageSpinner />
        if (this.props.success && this.state.categoryID !== null) {
            return <Redirect to={{
                pathname: routes.ViewAllItems,
                state: this.state.categoryID
            }} />
        }
        if (this.props.categories.length === 0) return <h2>No Categories have been registered</h2>
        return (
            <Page
                title="Inventory"
                breadcrumbs={[{ name: 'Categories', active: true }]}
                className="CardPage"
            >
                <Row>
                    {this.props.categories.map((item, index) => (
                        <Col md={4} sm={12} xs={12} onClick={() => this.setState({ categoryID: item.catagoryId })}>
                            <Card className='box' >
                                <CardBody>
                                    <Row>
                                        <Col className='icons' md={3} sm={12} xs={12}>
                                            <FontAwesomeIcon icon={faShareAlt} size="5x" color="#7D7D7D"  transform={{ rotate: 42 }} />
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
        success: state.inventoryReducer.success
    }
}

export default connect(mapStateToProps, { getExistingCategories })(CategoryPage)