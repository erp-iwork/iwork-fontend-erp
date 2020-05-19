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
                    <Col md={4} sm={12} xs={12}>
                        <Card className='box' >
                            <CardBody>
                                <Row >
                                    <Col className='icons' md={3} sm={12} xs={12}>
                                        <FontAwesomeIcon icon={faShareAlt} size="5x" color="#7D7D7D"  transform={{ rotate: 42 }} />
                                    </Col>
                                    <Col >
                                        <h4>Consumable Goods</h4>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md={4} sm={12} xs={12}>
                        <Card className='box' >
                            <CardBody>
                                <Row >
                                    <Col className='icons' md={3}>
                                        <FontAwesomeIcon color='primary' icon={faBox} size="5x" color="#7D7D7D" transform={{ rotate: -42 }} />
                                    </Col>
                                    <Col size='lg' >
                                        <h4>Stored Goods</h4>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md={4} sm={12} xs={12}>
                        <Card className='box' >
                            <CardBody>
                                <Row >
                                    <Col className='icons' md={3} xs={12} sm={12}>
                                        <FontAwesomeIcon icon={faScrewdriver} color='primary' color="#7D7D7D" size="5x" transform={{ rotate: -2 }} />
                                    </Col>
                                    <Col size='lg'>
                                        <h4>Services</h4>
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