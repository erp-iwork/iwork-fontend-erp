
import Page from '../../../components/Page'
import React from 'react'
import { Bar } from 'react-chartjs-2'
// import InfiniteCalendar from 'react-infinite-calendar'
import {
    MdFormatAlignJustify,
    MdDirectionsCar,
    MdStarBorder,
    MdSettings
  } from 'react-icons/md';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
} from 'reactstrap'
import PageSpinner from '../../../components/PageSpinner'
import { connect } from 'react-redux'
import { getColor } from '../../../utils/colors'
import { NumberWidget, IconWidget } from '../../../components/Widget'
import { getRecords } from '../../../store/inventory/action'
import { transactionTypes } from '../../../constant/transactions'
import { getData } from './functions/getData'

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Augest', 'September', 'October', 'November', 'December']

const genLineData = (received, delivered) => {
  return {
    labels: MONTHS,
    datasets: [
      {
        label: 'Recipients',
        backgroundColor: getColor('primary'),
        borderColor: getColor('primary'),
        borderWidth: 1,
        data: received
      },
      {
        label: 'Withdrawals',
        backgroundColor: getColor('secondary'),
        borderColor: getColor('secondary'),
        borderWidth: 1,
        data: delivered
      },
    ],
  }
}

const getCustomData = (exported, local, wasted) => ({
    labels: ["Exports", "Local", "Wasted"],
    datasets: [
        {
            label: 'Manufactured Products',
            backgroundColor: getColor('primary'),
            borderColor: getColor('danger'),
            borderWidth: 1,
            data: [exported, local, wasted]
        }
    ]
})

const today = new Date()
const lastWeek = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - 7,
)

class DashboardPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      received: 0,
      delivered: 0,
      lockCount: false,
      customData: {},
      mappedProducts: {},
      receivedMontlyCounts: [],
      deliveredMontlyCounts: []
    }
  }

    componentDidMount() {
        // this is needed, because InfiniteCalendar forces window scroll
        window.scrollTo(0, 0)
        this.props.getRecords()
    }

  async componentDidUpdate(prevProps, prevState) {
    var received = 0
    var delivered = 0
    var receivedMontlyCounts = MONTHS.map(_ => 0)
    var deliveredMontlyCounts = MONTHS.map(_ => 0)
    var deli
    this.props.records.forEach(record => {
      if (record.transactionType === transactionTypes['Reception']['value']) {
        var index = new Date(record.transactionDate).getMonth()
        receivedMontlyCounts[index] = receivedMontlyCounts[index] + 1
        received++
      }
      else if (record.transactionType === transactionTypes['Withdrwal']['value']) {
        var index = new Date(record.transactionDate).getMonth()
        deliveredMontlyCounts[index] = deliveredMontlyCounts[index] + 1
        delivered++
      }

    })

    const mappedData = await getData()
    if (!this.state.lockCount) {
      this.setState({
        received, delivered, lockCount: true,
        receivedMontlyCounts, deliveredMontlyCounts,
        customData: mappedData
      })
    }
  }

  render() {
    const primaryColor = getColor('primary')
    const secondaryColor = getColor('secondary')
    const infoColor = getColor('info')
    if (this.props.loading_records) return <PageSpinner />
    const recordWidgets = [
        {
            bgColor: 'primary',
            icon: MdFormatAlignJustify,
            title: 'Received',
            subtitle: this.state.received,
        },
        {
            bgColor: 'secondary',
            icon: MdStarBorder,
            title: 'Delivered',
            subtitle: this.state.delivered,
        },
    ]
    return (
      <Page
        className="DashboardPage"
        title="Inventory"
        breadcrumbs={[{ name: 'Dashboard', active: true }]}
      >
        {/* <Row>
          <Col md={6} sm={6} xs={12}>
            <NumberWidget
              title="Recieved Items"
              subtitle="This month"
              number={this.state.received}
              color="primary"
              progress={{
                value: 75,
                label: 'Last month',
              }}
            />
          </Col>
          <Col md={6} sm={6} xs={12}>
            <NumberWidget
              title="Withdrawn Items"
              subtitle="This month"
              number={this.state.delivered}
              color="danger"
              progress={{
                value: 45,
                label: 'Last month',
              }}
            />
          </Col>
        </Row> */}
        <Row>
          {recordWidgets.map(
            ({ bgColor, icon, title, subtitle, ...restProps }, index) => (
              <Col key={index} lg={3} md={6} sm={6} xs={12} className="mb-3">
                <IconWidget
                  bgColor={bgColor}
                  icon={icon}
                  title={title}
                  subtitle={subtitle}
                  {...restProps}
                />
              </Col>
            )
          )}
          <Col md={12} sm={12}>
            <hr />
            <h4>Inventory Activity</h4>
            <hr />
          </Col>
          <Col md="12" sm="12" xs="12">
            <Card>
              <CardHeader>Receptions and Withdrawls <small> this year  </small> </CardHeader>
              <CardBody>
                <Bar data={genLineData(this.state.receivedMontlyCounts, this.state.deliveredMontlyCounts)} />
              </CardBody>
            </Card>
          </Col>
          <CardBody>
            <Row>
            <Col md={6} sm={6} xs={12}>
                <NumberWidget
                    title="Exported Items"
                    subtitle="This month"
                    number={this.state.customData.exportData?
                        this.state.customData.exportData.amount: 0
                    }
                    color="primary"
                    progress={{
                    value: 75,
                    label: 'Last month',
                }}
                />
            </Col>
            <Col md={6} sm={6} xs={12}>
                <NumberWidget
                    title="Local Items"
                    subtitle="This month"
                    number={this.state.customData.localData?
                        this.state.customData.localData.amount: 0
                    }                color="danger"
                    progress={{
                    value: 45,
                    label: 'Last month',
                    }}
                />
            </Col>
            </Row>
            <Row>
                <Col md={6} sm={6} xs={12}>
                    <NumberWidget
                        title="Wasted Items"
                        subtitle="This month"
                        number={this.state.customData.wastedData?
                            this.state.customData.wastedData.amount: 0
                        }
                        color="danger"
                        progress={{
                            value: 45,
                            label: 'Last month',
                        }}
                    />
                </Col>
            </Row>
        </CardBody>
          <Col md="12" sm="12" xs="12">
            <Card>
              <CardHeader>Exports / Local <small> this year  </small> </CardHeader>
              <CardBody>
                <Bar data={
                    getCustomData(
                        this.state.customData.exportData?
                        this.state.customData.exportData.amount : 0,
                        this.state.customData.localData?
                        this.state.customData.localData.amount : 0,
                        this.state.customData.wastedData?
                        this.state.customData.wastedData.amount : 0,
                    )
                }/>
              </CardBody>
            </Card>
          </Col>
          {/* <Col md="3" sm="12" xs="12">
            <InfiniteCalendar
              selected={today}
              minDate={lastWeek}
              width="100%"
              theme={{
                accentColor: secondaryColor,
                floatingNav: {
                  background: secondaryColor,
                  chevron: primaryColor,
                  color: '#FFF',
                },
                headerColor: primaryColor,
                selectionColor: secondaryColor,
                textColor: {
                  active: '#FFF',
                  default: '#333',
                },
                todayColor: infoColor,
                weekdayColor: primaryColor,
              }}
            />
          </Col> */}
        </Row>
      </Page>
    )
  }
}


const mapStateToProps = (state) => {
  return {
      loading_records: state.inventoryReducer.loading_records,
      records: state.inventoryReducer.records,
      filter: state.searchData.filter,
      searchValue: state.searchData.value
  }
}

export default connect(mapStateToProps, { getRecords })(DashboardPage)