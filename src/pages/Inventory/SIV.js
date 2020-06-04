import React from 'react';
import Typography from '../../components/Typography'
import SIVPdf from './Printable_SIV';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Page from '../../components/Page';
import { Button, CardBody, Row, Col, Table } from 'reactstrap'
import { getSiv } from '../../store/Siv/action'
import { connect } from 'react-redux'
import PageSpinner from '../../components/PageSpinner'
import Logo from "../../assets/img/logo/Logo.jpg";


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
    height: 130,
    borderRadius: 0,
    padding: 10,
  },
  text: {
    color: '#FFFFFF',
  },
  Header: {
    padding: 10,
  },
  logo: {
    height: 80,
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
    // margin: "auto",
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
    color: '#686868',
    fontSize: 12
  },
};
class SIV extends React.Component {
  constructor(){
    super();
    this.state={
      total:''
    }
  }
  componentDidMount() {
    this.props.getSiv(this.props.location.state.order);

  }
  submit(e) {
    e.preventDefault();
  }



  render() {
    if (this.props.loading) return <PageSpinner />
    console.log(this.props.sivs)
    return (
      <Page
        title="SIV"
        breadcrumbs={[{ name: 'Inventory', active: true }]}
      >
        <hr />
        <div style={classes.pdf}>
          <div style={classes.Card}>
            <Row>
              <Col>

                <img src={Logo} alt="" style={classes.logo} />
                <Typography
                  style={classes.text}

                >
                  <b>Your Company Name</b>
                </Typography>
              </Col>
              <Col >
                <Typography
                  style={classes.text}
                >
                  <b>SIV Status : </b> {this.props.sivs.sivStatus}
                </Typography>
                <Typography
                  style={classes.text}
                >
                  <b>Warehouse Name : </b> {this.props.sivs.warehouseName}
                </Typography>
                <Typography
                  style={classes.text}
                >
                  <b>Issued By :</b> {localStorage.getItem('username')}
                </Typography>
                <Typography
                  style={classes.text}
                >
                  <b>SIV Date :</b> {this.props.sivs.sivDate}
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
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>UoM</th>
                    <th>Unit Price</th>
                    <th>Amount</th>


                  </tr>
                </thead>
                <tbody>
                  {this.props.sivs.siv_item ? this.props.sivs.siv_item.map((item, index) => (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{item.itemName}</td>
                      <td>{item.quantity}</td>
                      <td>{item.unitOfMeasurement}</td>
                      <td>{item.cost}</td>
                      <td>{item.amount}</td>

                    </tr>
                  )) : null}
                </tbody>
              </Table>
            </CardBody>
          </Col>

          <div
            style={{
              paddingLeft: 20,
            }}
          >
            <Typography style={{
              paddingLeft: 500
            }}>
              <b>Total  Price :</b> {this.props.sivs.totalCost}
            </Typography>
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
                <SIVPdf siv_item={this.props.sivs.siv_item} sivs={this.props.sivs} />
              }
              fileName={"SIV_" + this.props.sivs.sivId + ".pdf"}
              style={{
                textDecoration: 'none',
              }}
            >
              {({ loading }) => (loading ?
                <Button size='sm' color='primary'>
                  loading ...
                </Button> :
                <Button size='sm' color='primary'>
                  Print SIV
                  </Button>
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
    loading: state.sivReducer.loading,
    sivs: state.sivReducer.sivs,
    siv_item: state.sivReducer.siv_item,
    success: state.sivReducer.success,
  }
}


export default connect(mapStateToProps, { getSiv })(SIV)
