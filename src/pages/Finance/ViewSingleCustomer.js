import React, { Component } from 'react'
import Page from '../../components/Page'
import { Col, Row, Card, CardHeader, Table, CardBody } from 'reactstrap'
import './SingleView.scss'
import { connect } from 'react-redux'
import { getSingleOrder } from '../../store/order/action'
import PageSpinner from '../../components/PageSpinner'

class ViewSingleCustomer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            details: this.props.location.state
        }
    }

    render() {
        //if (!this.props.order.orderNumber) return <PageSpinner />
        const { details } = this.state
        return (
            <Page title="View Single Customer" breadcrumbs={[{ name: 'Single Customer', active: true }]}>
                <Card className='padding'>
                    <CardBody>
                        <Row className="singleRow" md={8}>Customer Name: <b className="rowValue">Nib Bank</b></Row>
                        <Row className="singleRow" md={8}>Customer Name: <b className="rowValue">Nib Bank</b></Row>
                        <Row className="singleRow" md={8}>Customer Name: <b className="rowValue">Nib Bank</b></Row>
                        <Row className="singleRow" md={8}>Customer Name: <b className="rowValue">Nib Bank</b></Row>
                        <Row className="singleRow" md={8}>Customer Name: <b className="rowValue">Nib Bank</b></Row>
                        <Row className="singleRow" md={8}>Customer Name: <b className="rowValue">Nib Bank</b></Row> 
                    </CardBody>
                </Card>
            </Page>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        order: state.ordersReducer.order,
        items: state.ordersReducer.items
    }
}

export default connect(mapStateToProps, { getSingleOrder })(ViewSingleCustomer)