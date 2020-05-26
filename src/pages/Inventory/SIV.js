import React from 'react';
import Typography from '../../components/Typography'
import SIVPdf from './Printable_SIV';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Page from '../../components/Page';
import { Button, CardBody, Col, Table } from 'reactstrap'
import { getSiv } from '../../store/Siv/action'
import { connect } from 'react-redux'
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
    height: 130,
    borderRadius: 0,
    padding: 10,
  },
  text: {
    color: '#FFFFFF',
  },
  Header: {
    padding: 30,
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
    margin: "auto",
    color: '#686868',
    fontSize: 12
  },
};
class SIV extends React.Component {
  componentDidMount() {
    this.props.getSiv(this.props.location.state.order)
  }
  submit(e) {
    e.preventDefault();
  }

  render() {
    if (this.props.loading) return <PageSpinner />
    console.log(this.props.sivs)
    return (
      <Page
        title="Inventory"
        breadcrumbs={[{ name: 'SIV', active: true }]}
      >
        <hr />
        <div
          style={{
            height: 100,
          }}
        ></div>
        <div style={classes.pdf}>
          <div style={classes.Card}>
            <div
              container
              xs={12}
              display="flex"
              justify="space-between"
              style={classes.Header}
            >
              <div>
                <div
                  container
                  style={{
                    marginTop: 10,
                    marginLeft: 10,
                  }}
                >
                  {/* <img src={Logo} alt="" style={classes.logo} /> */}
                  <Typography
                    variant="h6"

                    style={classes.text}

                  >
                    NAZO
                    </Typography>
                </div>
              </div>
              <div >
                <Typography
                  style={classes.text}
                  variant="body2"
                  gutterBottom
                >
                  <b>SIV Status : </b> {this.props.sivs.sivStatus}
                  </Typography>
                <Typography
                  style={classes.text}
                  variant="body2"
                  gutterBottom
                >
                  <b>Warehouse Name : </b> {this.props.sivs.warehouseName}
                  </Typography>
                <Typography
                  style={classes.text}
                  variant="body2"
                  gutterBottom
                >
                  <b>Issued By :</b> {localStorage.getItem('username')}
                  </Typography>
                <Typography
                  style={classes.text}
                  variant="body2"
                  gutterBottom
                >
                  <b>SIV Date :</b> {this.props.sivs.sivDate}
                  </Typography>
              </div>
            </div>
          </div>
          <Col>
            <CardBody>
              <Table size="sm">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Item Name</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.sivs.siv_item.map((item, index) => (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{item.itemName}</td>
                      <td>{item.quantity}</td>
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
                <Button size='sm' /> :
                <div >
                  <Button style={{
                    marginLeft: 8,
                    color: '#11669F'

                  }} fontSize='large' />
                  <Typography style={{
                    color: '#818181'

                  }}
                  >
                    Print SIV
                    </Typography>
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
    loading: state.sivReducer.loading,
    sivs: state.sivReducer.sivs,
    siv_item: state.sivReducer.siv_item,
    success: state.sivReducer.success,
  }
}


export default connect(mapStateToProps, { getSiv })(SIV)
