import React from 'react';
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
    root: {
        backgroundColor: '#d1d1d1',
        padding: 30
    },
    pdf: {
        paddingTop: 40,
        paddingRight: 50,
        paddingLeft: 40
    },
    logo: {
        height: 100,
        width: 120,
        marginTop: 10,
    },
    text: {
        color: '#000000',
        fontWeight: 10,
        marginTop: 25
    },
    textBody: {
        fontSize: 12,
        color: '#686868'
    },
    header: {
        flexDirection: 'row'
    },
    column: {
        flexDirection: 'column',
        marginBottom: 200
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
        fontSize: 12,
        color: '#FFFFFF'
    },
    tableCell: {
        color: '#686868',
        fontSize: 12
    },
    line: {
        width: "auto",
        borderStyle: "solid",
        borderColor: '#11669F',
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0
    },
    total: {
        fontSize: 12,
        color: '#686868',
        marginLeft: 400
    }
});

function PdfDocument({ data }) {
    const { customer } = data
    return (
        <Document>
            <Page style={styles.pdf}>
                <View style={{
                    height: 40
                }} />
                <>
                    <View container style={styles.header}>
                        <View item xs={6}>
                            <Text style={styles.textBody}  >
                                Your Company
                                </Text>
                            <View style={{
                                height: 10
                            }}>

                            </View>
                            <Text style={styles.textBody}  >
                                Your Location
                                </Text>
                            <View style={{
                                height: 10
                            }}>
                            </View>
                            <Text style={styles.textBody} >
                                Mobile : +251 91 147 5672
                                </Text>
                            <View style={{
                                height: 10
                            }}>

                            </View>
                            <Text style={styles.textBody} >
                                Website : YourWebsite.com
                                </Text>
                        </View>

                        <View item xs={6}>
                            <View container style={{
                                marginLeft: 200,
                                flexDirection: 'row'

                            }}>
                                {/* <Image source={Logo} alt='' style={styles.logo} /> */}
                            </View>
                        </View>
                    </View>
                    {/* =============================== HEADER =++++++++============== */}
                    <View style={{
                        height: 25
                    }} />
                    <View style={styles.line} />
                    <View style={{
                        height: 25
                    }} />
                    <View container style={styles.header}>
                        <View item >
                            <Text align='left' style={styles.textBody} variant='body2' color=''>Invoice To</Text>
                            <View style={{
                                height: 10
                            }} />
                            <View style={{
                                marginLeft: 10,
                            }}>
                                <View style={{
                                    height: 10
                                }} />
                                <View container style={{
                                    flexDirection: 'row',
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}>
                                    <View item>
                                        <Text align='right' style={{
                                            color: '#11669F',
                                            fontSize: 12
                                        }}>Company name : <Text style={styles.textBody} >{customer.customerName} </Text> </Text>
                                    </View>
                                </View>
                                <View style={{
                                    height: 10
                                }} />
                                <View container style={{
                                    flexDirection: 'row',
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}>
                                    <Text align='right' style={{
                                        color: '#11669F',
                                        fontSize: 12
                                    }} >
                                        Working field: <Text style={styles.textBody} >{customer.workingField} </Text> </Text>
                                </View>

                                <View style={{
                                    height: 10
                                }} />
                                <View container style={{
                                    flexDirection: 'row',
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}>

                                    <Text align='right' style={{
                                        color: '#11669F',
                                        fontSize: 12
                                    }} >
                                        General manager : <Text style={styles.textBody} >{customer.generalManger} </Text>
                                    </Text>
                                </View>
                                <View style={{
                                    height: 10
                                }} />
                                <View container style={{
                                    flexDirection: 'row',
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}>

                                    <Text align='right' style={{
                                        color: '#11669F',
                                        fontSize: 12
                                    }} >
                                        Contact person : <Text style={styles.textBody} >{customer.contactPerson} </Text>
                                    </Text>
                                </View>
                                <View style={{
                                    height: 10
                                }} />
                                <View container style={{
                                    flexDirection: 'row',
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}>
                                    <View item >

                                        <Text align='right' style={{
                                            color: '#11669F',
                                            fontSize: 12
                                        }} >
                                            E-mail Address : <Text style={styles.textBody} >{customer.email} </Text>
                                        </Text>
                                    </View>
                                </View>
                                <View style={{
                                    height: 10
                                }} />
                                <View container style={{
                                    flexDirection: 'row',
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}>
                                    <View item >
                                        <Text align='right' style={{
                                            color: '#11669F',
                                            fontSize: 12
                                        }}>Tin number : <Text style={styles.textBody} >{customer.tinNumber} </Text> </Text>
                                    </View>
                                </View>
                                <View style={{
                                    height: 10
                                }} />
                                <View container style={{
                                    flexDirection: 'row',
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}>
                                    <View item >
                                        <Text align='right' style={{
                                            color: '#11669F',
                                            fontSize: 12
                                        }}>Payment option : <Text style={styles.textBody} >{customer.paymentOption} </Text></Text>
                                    </View>
                                </View>
                                <View style={{ height: 10 }} /></View>
                        </View>
                        <View item style={{
                            marginLeft: 150,
                            marginTop: 30
                        }}>
                            <View container style={{
                                flexDirection: 'row',
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}>
                                <View item>
                                    <Text align='right' style={{
                                        color: '#11669F',
                                        fontSize: 12
                                    }}>Order no: <Text style={styles.textBody} >
                                            {data.order}
                                        </Text> </Text>
                                </View>
                                <View style={{ width: 10 }}>
                                </View>
                            </View>
                            <View style={{
                                height: 10
                            }} />
                            <View container style={{
                                flexDirection: 'row',
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}>
                                <View item >
                                    <Text style={{
                                        color: '#11669F',
                                        fontSize: 12
                                    }}>Invoice No: <Text style={styles.textBody} >
                                            {data.invoiceId}
                                        </Text></Text>
                                </View>
                            </View>
                            <View style={{
                                height: 10
                            }} />

                            <View container style={{
                                flexDirection: 'row',
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}>
                                <View item >
                                    <Text style={{
                                        color: '#11669F',
                                        fontSize: 12
                                    }}>Invoice Date :<Text style={styles.textBody} >
                                            {data.date}
                                        </Text></Text>
                                </View>
                            </View>
                        </View>
                        <View>
                            <View style={{
                                height: 10
                            }}>
                            </View>
                            <View container style={{
                                flexDirection: 'row',
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}>

                                <View style={{
                                    width: 10
                                }} />
                            </View>
                            <View style={{
                                height: 10
                            }} />
                        </View>
                    </View>
                    <View style={{
                        height: 20
                    }} />

                    <View style={styles.line} />

                    <View style={{
                        height: 20
                    }} />
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>#</Text>
                            </View>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>Item Name</Text>
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
                    </View>
                    {data.invoice_item ? data.invoice_item.map((item, index) => {
                        return (
                            <View key={index} style={styles.tableRow}>
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
                                    <Text style={styles.tableCell}>{item.unitPrice}</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>{item.quantity * item.unitPrice}</Text>
                                </View>
                            </View>
                        );
                    }) : null}
                    <View style={{
                        height: 40
                    }} />
                    <View style={{
                        marginLeft: 300
                    }}>
                        <View container style={{
                            flexDirection: 'row',
                            display: 'flex',
                            justifyContent: 'space-between',
                            paddingBottom: 5,
                        }}>
                            <View item >
                                <Text align='right' style={{
                                    color: '#11669F',
                                    fontSize: 12
                                }}>Sub Total: </Text>
                            </View>
                            <View style={{
                                width: 10
                            }}>
                            </View>
                            <View item>
                                <Text align='right' style={styles.textBody} >
                                    {data.subTotal}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.line} />
                        <View style={{ height: 5 }} />
                        <View container style={{
                            flexDirection: 'row',
                            display: 'flex',
                            justifyContent: 'space-between',
                            paddingBottom: 5
                        }}>
                            <View item >
                                <Text align='right' style={{
                                    color: '#11669F',
                                    fontSize: 12
                                }}>Tax :</Text>
                            </View>
                            <View style={{
                                width: 10
                            }}>

                            </View>
                            <View item>
                                <Text align='right' style={styles.textBody} >
                                    {data.Tax}
                                </Text>
                            </View>

                        </View>
                        <View style={styles.line} />
                        <View style={{ height: 5 }} />
                        <View container style={{
                            flexDirection: 'row',
                            display: 'flex',
                            justifyContent: 'space-between',
                            paddingBottom: 5
                        }}>
                            <View item >
                                <Text align='right' style={{
                                    color: '#11669F',
                                    fontSize: 12
                                }}>Total :</Text>
                            </View>
                            <View style={{ width: 10 }}></View>
                            <View item>
                                <Text align='right' style={styles.textBody} >
                                    {data.Total}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.line} />
                    </View>
                    <View style={{ height: 100 }} />
                    <View style={styles.line} />
                    <View container style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        <Text variant='caption' style={styles.textBody}>Phone : +2519 1234 56 77</Text>
                        <Text style={styles.textBody}>Website : YourWebsite.com</Text>
                        <Text style={styles.textBody}>Email : YourEmail@gmail.com</Text>
                    </View>
                </>

                <View style={styles.tableRow}>
                </View>
            </Page>
        </Document >
    );
}
export default PdfDocument