import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { formatDate } from "@/utils/dateConvert";

const styles = StyleSheet.create({
  page: { backgroundColor: "#f3f4f6", position: "relative" },
  container: { padding: 24, border: "1px solid #f3f4f6", zIndex: 1 },
  watermark: {
    position: "absolute",
    top: "400px",
    left: "70px",
    transform: "translate(-50%, -50%) rotate(-45deg)",
    fontSize: 100,
    color: "#d1d5db",
    opacity: 0.5,
    zIndex: 0,
    textAlign: "center",
    fontWeight: 900,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottom: 1,
    borderColor: "#d1d5db",
    paddingBottom: 16,
    marginBottom: 16,
  },
  logoSection: { flexDirection: "column", alignItems: "flex-start" },
  logo: { height: 120, width: 120 },
  textGray: { color: "#6b7280", fontSize: 10, marginLeft: 25 },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  detailsContainer: {
    fontSize: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  detailItem: { width: "48%", marginBottom: 4 },
  table: { display: "table", width: "100%", marginTop: 16, fontSize: 10 },
  tableRow: { flexDirection: "row" },
  tableHeader: { backgroundColor: "#f3f4f6", fontWeight: "bold" },
  tableHeaderCell: {
    flex: 1,
    padding: 6,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#3a4052",
    borderStyle: "dashed",
    textAlign: "center",
  },
  tableDataCell: {
    flex: 1,
    padding: 6,
    borderBottomWidth: 1,
    borderColor: "#d1d5db",
    borderStyle: "dashed",
    textAlign: "center",
  },
  totals: { alignItems: "flex-end", marginTop: "2px" },
  totalsValue: {
    backgroundColor: "#d8d8d9",
    border: "1px solid #d1d5db",
    padding: 6,
    fontSize: 10,
    lineHeight: 2,
  },
  footer: {
    position: "absolute",
    bottom: 5,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 8,
    color: "#6b7280",
    paddingTop: 8,
    borderTop: "1px solid #d1d5db",
  },
});

const DownloadStatement = ({ investment, profits }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.watermark}>e-Statement</Text>

      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={[styles.logoSection, { marginTop: -25 }]}>
            <Image
              style={styles.logo}
              src="/images/logo/Rtemis.png"
              alt="Rtemis Logo"
            />
            <Text style={[styles.textGray, { marginTop: -30 }]}>
              {" "}
              www.rtemisbd.com
            </Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={styles.textGray}>
              Issue Date: {formatDate(new Date()) || "N/A"}
            </Text>
            <Text style={styles.textGray}>
              PR Name:{" "}
              {investment?.project?.PRManagersDetails?.[0]?.name || "N/A"}
            </Text>
            <Text style={styles.textGray}>
              PR Mobile:{" "}
              {investment?.project?.PRManagersDetails?.[0]?.phoneNumber ||
                "N/A"}
            </Text>
          </View>
        </View>

        {/* Personal Details */}
        <Text style={styles.sectionTitle}>Personal Details</Text>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailItem}>
            Investor Name: {investment?.userId?.name || "N/A"}
          </Text>
          <Text style={styles.detailItem}>
            NID Number:{" "}
            {investment?.userId?.personalDetails?.nidOrPassportNo || "N/A"}
          </Text>
          <Text style={styles.detailItem}>
            Investor ID: {investment?.id || "N/A"}
          </Text>
          <Text style={styles.detailItem}>
            Mobile: {investment?.userId?.phoneNumber || "N/A"}
          </Text>
          <Text style={styles.detailItem}>
            Email: {investment?.userId?.email || "N/A"}
          </Text>
          <Text style={styles.detailItem}>
            Address: {investment?.userId?.address?.addressLine1 || "N/A"}
          </Text>
        </View>

        {/* Investment Details */}
        <Text style={styles.sectionTitle}>Investment Details</Text>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailItem}>
            Project Name: {investment?.project?.projectTitle || "N/A"}
          </Text>
          <Text style={styles.detailItem}>
            Project Type: {investment?.project?.projectType?.name || "N/A"}
          </Text>
          <Text style={styles.detailItem}>
            Amount of Investment : BDT{" "}
            {investment?.investmentAmount?.toLocaleString() || "N/A"}
          </Text>
          <Text style={styles.detailItem}>
            Number of Share: {investment?.totalBuyShare || "N/A"} Share
          </Text>
          {investment?.durationOfInvest ? (
            <Text style={styles.detailItem}>
              Duration of Investment : {investment?.durationOfInvest || "N/A"}{" "}
              Years
            </Text>
          ) : (
            ""
          )}
        </View>

        {/* Profit Disbursement Summary */}
        <Text style={styles.sectionTitle}>Profit Disbursement Summary</Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            {[
              "Date",
              // "Inv.Amount",
              "Profit Ratio",
              "Profit Count",
              "Return Type",
              "Profit Month",
              "Status",
            ].map((header) => (
              <Text style={styles.tableHeaderCell} key={header}>
                {header}
              </Text>
            ))}
          </View>
          {profits?.map((profit) => (
            <View style={styles.tableRow} key={profit?._id}>
              <Text style={styles.tableDataCell}>
                {formatDate(profit?.createdAt) || "N/A"}
              </Text>
              {/* <Text style={styles.tableDataCell}>
                Tk {investment?.investmentAmount?.toLocaleString() || "N/A"}
              </Text> */}
              <Text style={styles.tableDataCell}>
                {profit?.percentageOfProfit || "N/A"}%
              </Text>

              <Text style={styles.tableDataCell}>
                Tk {profit?.profitCount?.toLocaleString() || "N/A"}
              </Text>
              <Text style={styles.tableDataCell}>
                {profit?.returnType || "N/A"}
              </Text>
              {/* Profit Month or Date Range */}
              <Text style={styles.tableDataCell}>
                {profit?.returnType !== "Monthly" ? (
                  <>
                    <Text>{`${formatDate(
                      profit?.fromProfitCountDate
                    )} to`}</Text>
                    <Text>{formatDate(profit?.toProfitCountDate)}</Text>
                  </>
                ) : (
                  <>
                    <Text>{profit?.profitGiveMonths || "N/A"}-</Text>
                    <Text>{profit?.profitGiveYear || "N/A"}</Text>
                  </>
                )}
              </Text>
              {/* Payment Status */}
              <Text style={styles.tableDataCell}>
                <Text
                  style={{
                    fontWeight: "bold",
                    color:
                      profit?.paymentStatus === "Paid"
                        ? "green"
                        : profit?.paymentStatus === "Pending"
                        ? "red"
                        : "black",
                  }}
                >
                  {profit?.paymentStatus || "N/A"}
                </Text>
              </Text>
            </View>
          ))}
        </View>

        {/* Totals */}
        <View style={styles.totals}>
          <View style={styles.totalsValue}>
            <Text>
              Total Profit Count: BDT{" "}
              {investment?.totalProfitAmount?.toLocaleString() || "N/A"}
            </Text>
            <Text>
              Total Paid Amount: BDT{" "}
              {investment?.totalPaidProfitAmount?.toLocaleString() || "N/A"}
            </Text>
            <Text style={{ borderTop: "1px solid #86868a", paddingTop: 6 }}>
              Total Due Amount: BDT{" "}
              {investment?.totalDueProfitAmount?.toLocaleString() || "N/A"}
            </Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>Page 01 of 01</Text>
    </Page>
  </Document>
);

export default DownloadStatement;
