import React, { Component } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import Logo from "../../assets/img/logo/Logo.jpg";

const styles = StyleSheet.create({
  title: {
    paddingLeft: 100,
    paddingBottom: 10,
    fontSize: 16,
  },

  root: {
    width: "100vh",
    height: "100vh",
    backgroundColor: "#d1d1d1",
    padding: 10,
  },

  text: {
    color: "#686868",
  },

  Header: {
    fontSize: 13,
    padding: 30,
  },

  logo: {
    height: 40,
    width: 40,
  },

  SIVStyling: {
    padding: 30,
  },

  table: {
    padding: 10,
  },

  textBody: {
    fontSize: 12,
    color: "#686868",
  },
  textBody2: {
    fontSize: 8,
    color: "#686868",
  },

  tableRow: {
    flexDirection: "row",
  },

  tableColHeader: {
    width: "17%",
    borderStyle: "solid",
    borderColor: "#686868",
    borderBottomColor: "#686868",
    backgroundColor: "#11669F",
    borderWidth: 1,
    borderTopWidth: 0,
  },

  tableColHeader1: {
    width: "10%",
    borderStyle: "solid",
    borderColor: "#686868",
    borderBottomColor: "#686868",
    backgroundColor: "#11669F",
    borderWidth: 1,
    borderTopWidth: 0,
  },

  tableCol: {
    width: "17%",
    borderStyle: "solid",
    borderColor: "#686868",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },

  tableCol1: {
    width: "10%",
    borderStyle: "solid",
    borderColor: "#686868",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },

  tableCellHeader: {
    fontSize: 10,
    color: "#FFFFFF",
  },

  tableCell: {
    color: "#686868",
    fontSize: 10,
  },
  line: {
    width: "auto",
    borderStyle: "solid",
    borderColor: "#11669F",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  total: {
    fontSize: 12,
    color: "#686868",
    marginLeft: 400,
  },
});

class SIVPdf extends Component {
  render() {
    return (
      <Document>
        <Page
          size="A5"
          style={{
            padding: 10,
          }}
        >
          {/* <View container xs={12} display="flex" style={styles.Header}>
            <View
              style={{
                flexDirection: "row",
                marginTop: 100,
                justifyContent: "space-between",
                display: "flex",
              }}
            >
              <View item>
                <Image source={Logo} alt="" style={styles.logo} />
                <Text style={styles.text} variant="body2">
                  Sparta ERP
                </Text>
              </View>

              <View item>
                <View style={{ height: 5 }} />
                <Text style={styles.text} variant="body2" gutterBottom>
                  Issued By : {localStorage.getItem("username")}
                </Text>
                <View style={{ height: 5 }} />

                <Text style={styles.text} variant="body2" gutterBottom>
                  SIV Date : {this.props.sivs.sivDate}
                </Text>
              </View>
            </View>
          </View> */}
          <View container xs={12} display="flex" style={styles.Header}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                display: "flex",
              }}
            >
              <View item>
                <Image source={Logo} alt="" style={styles.logo} />
                <Text style={styles.text} variant="body2">
                  Sparta ERP
                </Text>
              </View>
              <View>
                <Text style={styles.textBody}>Your Company</Text>
                <View
                  style={{
                    height: 3,
                  }}
                />

                <Text style={styles.textBody}>Your Location</Text>
                <View
                  style={{
                    height: 3,
                  }}
                />
                <Text style={styles.textBody}>Mobile : +251 91 147 5672</Text>
                <View
                  style={{
                    height: 3,
                  }}
                />
                <Text style={styles.textBody}>Website : YourWebsite.com</Text>
              </View>
            </View>
          </View>
          <Text style={styles.title} align="center">
            Store Issue Voucher
          </Text>
          <View style={styles.line}></View>

          <View
            style={{
              display: "flex",
              justifyContent: "flex-start",
              padding: 20,
            }}
          >
            <Text style={styles.textBody} variant="body2" color="">
              Sales Number : {this.props.sivs.order}
            </Text>
            <Text style={styles.textBody} variant="body2" gutterBottom>
              Issued By : {localStorage.getItem("username")}
            </Text>
            <View style={{ height: 5 }} />

            <Text style={styles.textBody} variant="body2" gutterBottom>
              SIV Date : {this.props.sivs.sivDate}
            </Text>
          </View>

          <View
            style={{
              height: 20,
            }}
          ></View>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader1}>
                <Text style={styles.tableCellHeader}>S-#</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>ItemName</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Quantity</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>UoM</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Unit Price</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Amount</Text>
              </View>
            </View>
            {this.props.siv_item
              ? this.props.siv_item.map((item, index) => {
                  return (
                    <View key={item.itemName} style={styles.tableRow}>
                      <View style={styles.tableCol1}>
                        <Text style={styles.tableCell}>{index + 1}</Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{item.itemName}</Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{item.quantity}</Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          {item.unitOfMeasurement}
                        </Text>
                      </View>

                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{item.cost}</Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{item.amount}</Text>
                      </View>
                    </View>
                  );
                })
              : null}
          </View>
          <View
            style={{
              paddingLeft: 20,
              paddingBottom: 100,
            }}
          >
            <View
              style={{
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <Text style={styles.textBody} variant="body2" color="">
                Issued By : {localStorage.getItem("username")}
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                justifyContent: "flex-start",
                paddingTop: 15,
              }}
            >
              <Text style={styles.textBody} variant="body2" color="">
                Signature : _______________________
              </Text>
            </View>
          </View>

          <View style={styles.line} />

          <View
            container
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text variant="caption" style={styles.textBody2}>
              Phone : +2519 1234 56 77
            </Text>
            <Text style={styles.textBody2}>Website : YourWebsite.com</Text>
            <Text style={styles.textBody2}>Email : YourEmail@gmail.com</Text>
          </View>
        </Page>
      </Document>
    );
  }
}

export default SIVPdf;
