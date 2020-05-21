import React from 'react';
import Typography from '../../components/Typography'
import SIVPdf from './Printable_SIV';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Page from '../../components/Page';
import { Button, CardBody, Col, Table } from 'reactstrap';

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

    // this.props.getSiv(this.props.location.state.order);

  }
  submit(e) {
    e.preventDefault();
  }


  render() {
    return (
      <Page
        title="SIV"
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
                  <b>SIV Status : </b> Something
                  </Typography>
                <Typography
                  style={classes.text}
                  variant="body2"
                  gutterBottom
                >
                  <b>Warehouse Name : </b> Something
                  </Typography>
                <Typography
                  style={classes.text}
                  variant="body2"
                  gutterBottom
                >
                  <b>Issued By :</b>Something
                  </Typography>
                <Typography
                  style={classes.text}
                  variant="body2"
                  gutterBottom
                >
                  <b>SIV Date :</b> Something
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
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                  </tr>
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
                <SIVPdf />
              }
              fileName={"SIV_"}
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


export default SIV;
