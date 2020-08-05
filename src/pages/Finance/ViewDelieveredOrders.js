import React, { Component } from 'react';
import Page from '../../components/Page';
import { Card, CardBody, CardHeader, Col, Row, Table, Button } from 'reactstrap';
import { getCustomOrders } from '../../store/procurement/action'
import { connect } from 'react-redux'
import PageSpinner from '../../components/PageSpinner'
import { Link } from 'react-router-dom'
import routes from '../../config/routes'
import status from '../../constant/status'
import { filter, getCount } from '../../useCases' 
import { updateFilter } from '../../store/search/action'
import filters from '../../constant/filters'

const Order = ({ order, index }) => {
    return (
        <tr align="left">
            <th scope="row">{index + 1}</th>
            <td>{order.suplier.suplierName}</td>
            <td>{order.orderdBy}</td>
            <td>{getCount(order.purchaseOrderNumber)}</td>
            <td>{order.purchaseOrderDate}</td>
            <td>{order.status_purchase_order[0].status}</td>
            <td>
                <Link to={{ pathname: routes.ViewSingleDelieveredOrder, state: order }}>
                    <Button size='sm' color='primary' disabled={
                        order.status_purchase_order[0]['status'] === status.invoiced
                    }>
                        Invoice
                    </Button>
                </Link>
            </td>
        </tr>
    )
}

class ViewDelieveredOrdersPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            done: false
        }
    }

    componentDidMount() {
        this.props.getCustomOrders(status.delivered, status.invoiced)
    }

    componentDidUpdate(prevProps, prevState) {
        if (!this.props.loading_orders && !this.state.done) {
            updateFilter('Type', null)
            updateFilter(filters.ADVANCED_DATE, null)
            this.setState({
                orders: this.props.orders,
                done: true
            })
        }
    }

    render() {
        if (!this.state.done) return <PageSpinner />
        const filtered = filter({
            name: { value: this.props.searchValue, tag: 'orderdBy' },
            date: { value: this.props.filter[filters.DATE._type], tag: 'purchaseOrderDate' },
            advancedDate: { value: this.props.filter[filters.ADVANCED_DATE], tag: 'purchaseOrderDate' }
        }, this.props.orders)
        return (
            <Page
                title="Delivered Orders"
                breadcrumbs={[{ name: 'Finance', active: true }]}
                hasFilter={true}
                hasAdvancedDate={true}
            >
                <Row>
                    <Col>
                        <Card className="mb-3">
                            <CardHeader>Delievered Orders</CardHeader>
                            <CardBody>
                                <Table responsive>
                                    <thead>
                                        <tr>
                                            <th>N0</th>
                                            <th>Supplier</th>
                                            <th>Ordered By</th>
                                            <th>PO#</th>
                                            <th>Ordered Date</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filtered.slice(0).reverse().map((item, index) => (
                                            <Order key={index} index={index} order={item} />
                                        ))}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Page>
        );
    }
}

const mapStateToProps = (state) => ({
    loading_orders: state.procurementReducer.loading_orders,
    orders: state.procurementReducer.orders,
    filter: state.searchData.filter,
    searchValue: state.searchData.value
})

export default connect(mapStateToProps, { getCustomOrders, updateFilter })(ViewDelieveredOrdersPage)