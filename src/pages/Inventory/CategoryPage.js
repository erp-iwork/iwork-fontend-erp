import React, { Component } from 'react';
import Page from '../../components/Page';
import { Card, CardTitle, Row, Col, CardSubtitle, CardText, CardBody, CardHeader } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBox, faScrewdriver, faShareAlt } from '@fortawesome/free-solid-svg-icons'
import './Inventory.scss'


class CategoryPage extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <Page
                title="Categories"
                breadcrumbs={[{ name: 'Categories', active: true }]}
                className="CardPage"
            >
                <Row>
                    <Col md={4}>
                        <Card className='box' >
                            <CardBody>
                                <Row >
                                    <Col className='icons' md={3}>
                                        <FontAwesomeIcon icon={faShareAlt} size="5x" spin />
                                    </Col>
                                    <Col size='lg'>
                                        <h3>Consumable Goods</h3>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className='box' >
                            <CardBody>
                                <Row >
                                    <Col className='icons' md={3}>
                                        <FontAwesomeIcon color='primary' icon={faBox} size="5x" spin />
                                    </Col>
                                    <Col size='lg' >
                                        <h3 color='primary'>Stored Goods</h3>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className='box' >
                            <CardBody>
                                <Row >
                                    <Col className='icons' md={3}>
                                        <FontAwesomeIcon icon={faScrewdriver} color='primary' size="5x" spin />
                                    </Col>
                                    <Col size='lg'>
                                        <h3>Services</h3>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>

                </Row>
            </Page>

        );
    }
}

export default CategoryPage;