import React from 'react'
import Typography from '../../components/Typography'
import SIVPdf from './Printable_GRV';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Page from '../../components/Page';
import { Button, CardBody, Col, Table, Row } from 'reactstrap'
import { getGRV } from '../../store/inventory/action'
import { connect } from 'react-redux'
import Logo from '../../assets/img/logo/Sparta2.svg'

import PageSpinner from '../../components/PageSpinner'

const classes = {
  pdf: {
    width: '792px',
    height: '450px',
    backgroundColor: '#FFFFFF',
    marginLeft: 100,
    padding: 5,
  },
  Card: {
    backgroundColor: '#4083B0',
    minHeight: 130,
    maxHeight: 'auto',
    borderRadius: 0,
    padding: 10,
  },
  text: {
    color: '#FFFFFF',
  },
  logo: {
    height: 50,
    width: 80,
    marginTop: 10,
  },
  SIVStyling: {
    padding: 30,
  },
  textBody: {
    color: '#686868',
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderColor: '#686868',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0
  },
  tableRow: {
    flexDirection: "row"
  },
  tableColHeader: {
    width: "20%",
    borderStyle: "solid",
    borderColor: '#686868',
    borderBottomColor: '#000',
    backgroundColor: '#11669F',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tableCol: {
    width: "20%",
    borderStyle: "solid",
    borderColor: '#686868',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tableCellHeader: {
    margin: "auto",
    fontSize: 12,
    color: '#FFFFFF'
  },
  tableCell: {
    margin: "auto",
    color: '#686868',
    fontSize: 12
  },
};
class GRV extends React.Component {
  componentDidMount() {
    this.props.getGRV(this.props.location.state.order)
  }
  submit(e) {
    e.preventDefault()
  }

  calculatePrice(items) {
    var sum = 0
    items.forEach(item => sum += item.price)
    return sum
  }

  render() {
    if (this.props.loading_grv) return <PageSpinner />
    const { grv } = this.props
    console.log(grv)
    const totalPrice = this.calculatePrice(grv.GRVItems)
    return (
      <Page
        title="GRV"
        breadcrumbs={[{ name: 'Inventory', active: true }]}
      >
        <hr />
        <div style={{
          height: 100
        }}></div>
        <div style={classes.pdf}>
          <div style={classes.Card}>
            <Row className="d-flex justify-content-between align-items-center"

            >
              <Col>
                <img src={Logo} alt="" style={classes.logo} />


                <Typography
                  variant="h6"
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: '#fff',
                    paddingTop: 20

                  }}>
                  SPARTA ERP
                    </Typography>
              </Col>
              <Col >
                <Typography style={classes.text}>
                  <b>PO # :</b> {grv.GRVID}
                </Typography>

                <Typography style={classes.text}>
                  <b>Recieved By :</b> {localStorage.getItem('username')}
                </Typography>
                <Typography style={classes.text}>
                  <b>GRV Date :</b> {grv.date}
                </Typography>
              </Col>
            </Row>
          </div>
          <Col>
            <CardBody>
              <Table size="sm">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Batch Number</th>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Unit</th>
                    <th>Unit Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {grv.GRVItems.map((item, index) => (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{item.itemID}</td>
                      <td>{item.itemName}</td>
                      <td>Unit Goes Here</td>
                      <td>{item.quantity}</td>
                      <td>{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardBody>
          </Col>
          <div
            style={{
              paddingLeft: 20,
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
              }}
            >
              <Typography
                style={classes.textBody}
                variant="body2"
                color=""
              >
                <b>Total Price :</b> {totalPrice}
              </Typography>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
              }}
            >
              <Typography
                style={classes.textBody}
                variant="body2"
                color=""
              >
                <b>Recipient Name :</b> _______________________
                </Typography>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
                paddingTop: 15,
              }}
            >
              <Typography
                style={classes.textBody}
                variant="body2"
                color=""
              >
                <b>Recipient Signature :</b> _______________________
                </Typography>
            </div>
          </div>
        </div>
        <div style={{
          marginLeft: 400,
          paddingTop: 20
        }}>
          {
            this.props.success ? (<PDFDownloadLink
              document={
                <SIVPdf grv_item={this.props.grv.GRVItems} grv={this.props.grv} totalPrice={totalPrice} />
              }
              fileName={"GRV_" + this.props.grv.GRVID + ".pdf"}
              style={{
                textDecoration: 'none',
              }}
            >
              {({ loading }) => (loading ?
                <Button size='sm' /> :
                <div >
                  <Button color='primary' size='sm' >
                    Print GRV
                  </Button>
                </div>
              )}
            </PDFDownloadLink>) : null
          }
        </div>
      </Page>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    loading_grv: state.inventoryReducer.loading_grv,
    grv: state.inventoryReducer.grv,
    success: state.inventoryReducer.grv
  }
}


export default connect(mapStateToProps, { getGRV })(GRV)
