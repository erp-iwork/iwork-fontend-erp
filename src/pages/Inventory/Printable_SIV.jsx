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
  root: {
    width: "100vh",
    height: "100vh",
    backgroundColor: "#d1d1d1",
    padding: 10,
  },
  title: {
    fontWeight: 600,
  },

  text: {
    color: "#686868",
  },
  Header: {
    fontSize: 13,
    padding: 30,
  },
  logo: {
    height: 80,
    width: 80,
    marginTop: 10,
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
  tableRow: {
    // margin: "auto",
    flexDirection: "row",
  },
  tableColHeader: {
    width: "20%",
    borderStyle: "solid",
    borderColor: "#686868",
    borderBottomColor: "#000",
    backgroundColor: "#11669F",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCol: {
    width: "20%",
    borderStyle: "solid",
    borderColor: "#686868",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCellHeader: {
    // margin: "auto",
    fontSize: 12,
    // fontWeight: 500,
    color: "#FFFFFF",
  },
  tableCell: {
    // margin: "auto",
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
          size="A4"
          style={{
            padding: 30,
          }}
        >
          {/* <View container xs={12} display="flex" style={styles.Header}>
            <View
              container
              style={{
                flexDirection: "row",
                marginTop: 100,
              }}
            >
              <View item>
                <View style={{ height: 5 }} />

                <Text style={styles.text} variant="body2" gutterBottom>
                  Warehouse Name: {this.props.sivs.warehouseName}
                </Text>
                <View style={{ height: 5 }} />

                <Text style={styles.text} variant="body2" gutterBottom>
                  Issued By : {localStorage.getItem("username")}
                </Text>
                <View style={{ height: 5 }} />

                <Text style={styles.text} variant="body2" gutterBottom>
                  SIV Date : {this.props.sivs.sivDate}
                </Text>
              </View>

              <View
                item
                style={{
                  marginLeft: 160,
                }}
              >
              </View>
            </View>
          </View> */}

          <View container xs={12} display="flex" style={styles.Header}>
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
              Order Number : {this.props.sivs.order}
            </Text>
          </View>

          <View
            style={{
              height: 20,
            }}
          ></View>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>#</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>ItemName</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Quantity</Text>
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
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{index + 1}</Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{item.itemName}</Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{item.quantity}</Text>
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
              display: "flex",
              paddingTop: 20,
              marginLeft: 450,
            }}
          ></View>
          <View
            style={{
              paddingLeft: 20,
            }}
          >
            <View
              style={{
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <Text style={styles.textBody} variant="body2" color="">
                Recipient Name : _______________________
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
                Recipient Signature : _______________________
              </Text>
            </View>
          </View>

          {/* </View> */}
        </Page>
      </Document>
    );
  }
}

export default SIVPdf;
