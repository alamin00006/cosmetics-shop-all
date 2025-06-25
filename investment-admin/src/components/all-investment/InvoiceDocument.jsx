import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#35B0A7",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#35B0A7",
    marginBottom: 5,
    textDecoration: "underline",
  },
  text: {
    fontSize: 12,
    color: "#000000",
    marginBottom: 5,
  },
  boldTextWithBackground: {
    fontWeight: "bold",
    padding: 2,
    borderRadius: 4,
    color: "#22b3a6", // Green color
  },

  section: {
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    paddingVertical: 8,
  },
  column: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tableHeader: {
    fontWeight: "bold",
    fontSize: 10,
    textAlign: "center",
    backgroundColor: "#35B0A7",
    color: "white",
    borderWidth: 1,
    borderColor: "#000000",
    paddingVertical: 8,
  },
  tableRow: {
    fontSize: 10,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#000000",
    paddingVertical: 8,
  },
  totalRow: {
    fontWeight: "bold",
    fontSize: 10,
    textAlign: "center",
    backgroundColor: "#f0f0f0",
    borderWidth: 1,
    borderColor: "#000000",
    paddingVertical: 8,
  },
  noteArea: {
    width: "100%",
    marginBottom: 20,
  },
  footer: {
    backgroundColor: "#35B0A7",
    color: "white",
    padding: 10,
    fontSize: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
});

const InvoiceDocument = ({ data }) => {
  const profitSummary = [
    {
      No: 1,
      Date: "2024-01-01",
      RatioCount: "5%",
      PaidBy: "Brac Bank",
      ReferenceID: "123456",
      ReceivedBy: "Jane Doe",
      ProfitCount: 1000,
      PaidAmount: 9000,
      DueAmount: 1000,
    },
    {
      No: 2,
      Date: "2024-02-01",
      RatioCount: "4%",
      PaidBy: "Brac Bank",
      ReferenceID: "654321",
      ReceivedBy: "Jane Doe",
      ProfitCount: 800,
      PaidAmount: 7000,
      DueAmount: 1000,
    },
  ];

  const totalProfitCount = profitSummary.reduce(
    (total, item) => total + item.ProfitCount,
    0
  );
  const totalPaidAmount = profitSummary.reduce(
    (total, item) => total + item.PaidAmount,
    0
  );
  const totalDueAmount = profitSummary.reduce(
    (total, item) => total + item.DueAmount,
    0
  );

  const formattedDate = new Date().toLocaleDateString();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>SHARIKANA</Text>
            <Text style={styles.title}>Statement</Text>
          </View>
          <View>
            <Text style={styles.text}>Date: {formattedDate}</Text>
            <Text style={styles.text}>PR Name: Md. Amir Khan</Text>
            <Text style={styles.text}>PR Mobile: 01234567899</Text>
          </View>
        </View>

        {/* Personal Details */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>Personal Details</Text>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.text}>Profile Name</Text>
              <Text style={[styles.text, styles.boldTextWithBackground]}>
                {data?.personalDetails?.profileName}
              </Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.text}>NID Number</Text>
              <Text style={[styles.text, styles.boldTextWithBackground]}>
                {data?.personalDetails?.nidNumber}
              </Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.text}>Profile ID</Text>
              <Text style={[styles.text, styles.boldTextWithBackground]}>
                {data?.personalDetails?.profileId}
              </Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.text}>Mobile</Text>
              <Text style={[styles.text, styles.boldTextWithBackground]}>
                {data?.personalDetails?.mobile}
              </Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.text}>Email</Text>
              <Text style={[styles.text, styles.boldTextWithBackground]}>
                {data?.personalDetails?.email}
              </Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.text}>Address</Text>
              <Text style={[styles.text, styles.boldTextWithBackground]}>
                {data?.personalDetails?.address}
              </Text>
            </View>
          </View>
        </View>

        {/* Return Details */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>Return Details</Text>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.text}>Return Date</Text>
              <Text style={[styles.text, styles.boldTextWithBackground]}>
                {data?.returnDetails?.returnDate}
              </Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.text}>Return Type</Text>
              <Text style={[styles.text, styles.boldTextWithBackground]}>
                {data?.returnDetails?.returnType}
              </Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.text}>Return Ratio</Text>
              <Text style={[styles.text, styles.boldTextWithBackground]}>
                {data?.returnDetails?.returnRatio}
              </Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.text}>Average Ratio</Text>
              <Text style={[styles.text, styles.boldTextWithBackground]}>
                {data?.returnDetails?.averageRatio}
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.text}>Profit Count</Text>
              <Text style={[styles.text, styles.boldTextWithBackground]}>
                {data?.returnDetails?.profitCount}
              </Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.text}>Total Profit Count</Text>
              <Text style={[styles.text, styles.boldTextWithBackground]}>
                {totalProfitCount}
              </Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.text}>Paid Amount</Text>
              <Text style={[styles.text, styles.boldTextWithBackground]}>
                BDT {totalPaidAmount.toLocaleString()} TK
              </Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.text}>Due Amount</Text>
              <Text style={[styles.text, styles.boldTextWithBackground]}>
                BDT {totalDueAmount.toLocaleString()} TK
              </Text>
            </View>
          </View>
        </View>

        {/* Profit Disburse Summary */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>Profit Disburse Summary</Text>
          <View style={styles.row}>
            <Text style={styles.tableHeader}>No</Text>
            <Text style={styles.tableHeader}>Date</Text>
            <Text style={styles.tableHeader}>Ratio Count</Text>
            <Text style={styles.tableHeader}>Paid By</Text>
            <Text style={styles.tableHeader}>Reference ID</Text>
            <Text style={styles.tableHeader}>Received By</Text>
            <Text style={styles.tableHeader}>Profit Count</Text>
            <Text style={styles.tableHeader}>Paid Amount</Text>
            <Text style={styles.tableHeader}>Due Amount</Text>
          </View>
          {/* Map through profitSummary to render each row */}
          {profitSummary.map((profit, index) => (
            <View style={styles.row} key={index}>
              <Text style={styles.tableRow}>{profit.No}</Text>
              <Text style={styles.tableRow}>{profit.Date}</Text>
              <Text style={styles.tableRow}>{profit.RatioCount}</Text>
              <Text style={styles.tableRow}>{profit.PaidBy}</Text>
              <Text style={styles.tableRow}>{profit.ReferenceID}</Text>
              <Text style={styles.tableRow}>{profit.ReceivedBy}</Text>
              <Text style={styles.tableRow}>{profit.ProfitCount}</Text>
              <Text style={styles.tableRow}>BDT {profit.PaidAmount.toLocaleString()} TK</Text>
              <Text style={styles.tableRow}>BDT {profit.DueAmount.toLocaleString()} TK</Text>
            </View>
          ))}
        </View>

        {/* Total Amounts */}
        <View style={styles.section}>
          <View style={styles.row}>
            <View style={styles.column}></View>
            <View style={styles.column}>
              <View style={styles.row}>
                <Text style={styles.totalRow}>Total Profit Count:</Text>
                <Text style={styles.totalRow}>
                  BDT {totalProfitCount.toLocaleString()} TK
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.totalRow}>Total Paid Amount:</Text>
                <Text style={styles.totalRow}>
                  BDT {totalPaidAmount.toLocaleString()} TK
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.totalRow}>Total Due Amount:</Text>
                <Text style={styles.totalRow}>
                  BDT {totalDueAmount.toLocaleString()} TK
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.noteArea}>
          <Text style={styles.subtitle}>Note:</Text>
          <Text style={styles.text}>
            Payment is non-refundable and non-transferable.
          </Text>
        </View>

        <View style={styles.footer}>
          <Text>www.sharikan.com.bd</Text>
          <Text>Contact: 01234567899</Text>
        </View>
      </Page>
    </Document>
  );
};

export default InvoiceDocument;
