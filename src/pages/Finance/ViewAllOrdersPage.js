import React, { Component } from 'react';
import Page from '../../components/Page';
import { Card, CardBody, CardHeader, Button, Table } from 'reactstrap';
import PageSpinner from '../../components/PageSpinner'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getOrders } from '../../store/order/action'
import { getInvoice } from '../../store/Invoice/action'
import routes from '../../config/routes'
import { PDFDownloadLink } from "@react-pdf/renderer";
import Invoice from './INVOICE'
import { filter } from '../../useCases' 
import { updateFilter } from '../../store/search/action'
import filters from '../../constant/filters'

const Order = ({ order, index, data, handlePrint }) => {
    return (
        <tbody>
            <tr>
                <th scope="row">{index + 1}</th>
                <td>{order.customer}</td>
                <td>{order.salesPerson}</td>
                <td>{order.shipmentAddress}</td>
                <td>{order.status}</td>
                <td>
                    {order.orderNumber === data.currentOrder && data.success ?
                        <PDFDownloadLink
                            document={<Invoice data={data.invoices} invoice_item={data.invoice_item} />}
                            fileName={`Invoice_${order.orderNumber}.pdf`}>
                            <Button size='sm' color='success'>Download</Button>
                        </PDFDownloadLink> :
                        <Button size='sm' color='primary' onClick={() => handlePrint(order.orderNumber)}>
                            Generate PDF
                          </Button>
                    }
                </td>
                <td>
                    <Link to={{ pathname: routes.ViewSingleOrderPage, state: order }}>
                        <Button size='sm' color='primary'>
                            See Order
                        </Button>
                    </Link>
                </td>
            </tr>
        </tbody>
    )
}

class ViewAllOrdersPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order: '',
            orders: [],
            show: false,
            lockPage: false
        }
        this.handlePrint = this.handlePrint.bind(this)
    }

    componentDidMount() {
        this.props.getOrders()
    }

    componentDidUpdate(prevProps, prevState) {
        if (!this.props.loading && !this.state.lockPage) {
            updateFilter('Type', null)
            updateFilter(filters.ADVANCED_DATE, null)
            this.setState({
                orders: this.props.orders,
                lockPage: true
            })
        }
    }

    handlePrint(order) {
        this.props.getInvoice(order)
        this.setState({ show: true, order })
    }

    render() {
        if (this.props.loading) return <PageSpinner />
        const deliveredOrders = this.state.orders ? this.state.orders.filter((order) => {
            return (order.status === "Delivered") || (order.status === "Invoiced")
        }) : ""

        const filtered = filter({
            name: { value: this.props.searchValue, tag: 'customer' },
            date: { value: this.props.filter[filters.DATE._type], tag: 'orderDate' },
            advancedDate: { value: this.props.filter[filters.ADVANCED_DATE], tag: 'orderDate' }
        }, deliveredOrders)

        return (
            <Page
                title="All Sales Orders"
                breadcrumbs={[{ name: 'Finance', active: true }]}
                className="TablePage"
                hasFilter={true}
                hasAdvancedDate={true}
            >
                <Card className="mb-3">
                    <CardHeader>All Sales Orders</CardHeader>
                    <CardBody>
                        <Table responsive >
                            <thead>
                                <tr align='left'>
                                    <th>N0</th>
                                    <th>Customer</th>
                                    <th>Sales Person</th>
                                    <th>Shipment Address</th>
                                    <th>Status</th>
                                    <th>Generate Invoice</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            {filtered.map((item, index) => (
                                <Order order={item} key={index} index={index} data={{
                                    currentOrder: this.state.order,
                                    success: this.props.success,
                                    invoices: this.props.invoices,
                                    invoice_item: this.props.invoice_item
                                }} handlePrint={this.handlePrint} />
                            ))}
                        </Table>
                    </CardBody>
                </Card>
            </Page>
        )
    }
}


const mapStateToProps = (state) => ({
    loading: state.ordersReducer.loading,
    orders: state.ordersReducer.orders,
    status: state.ordersReducer.status,
    invoices: state.invoiceReducer.invoices,
    invoice_item: state.invoiceReducer.invoice_item,
    success: state.invoiceReducer.success,
    filter: state.searchData.filter,
    searchValue: state.searchData.value
})

export default connect(mapStateToProps, { getOrders, getInvoice, updateFilter })(ViewAllOrdersPage)