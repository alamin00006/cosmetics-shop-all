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
import { formatBDT } from "@/utils/formateBDT";

const styles = StyleSheet.create({
  page: {
    width: "794px", // A4 width
    height: "1123px", // A4 height
    margin: 0,
    padding: 20,
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottom: "1.5px solid #0da848",
    paddingBottom: 10,
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 120,
    objectFit: "contain",
  },
  companyDetails: {
    flexDirection: "column",
    alignItems: "flex-end",
    textAlign: "right",
    color: "#4a4a4a",
    marginTop: 12,
  },
  title: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    color: "#0da848",
    marginBottom: 20,
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    fontSize: 12,
    color: "#000",
    marginTop: 2,
  },
  table: { display: "table", width: "100%", marginTop: 16, fontSize: 10 },
  tableRow: { flexDirection: "row" },
  tableHeader: { backgroundColor: "#0da848", fontWeight: "bold", fontSize: 12 },
  tableHeaderCell: {
    flex: 1,
    padding: 6,
    color: "white",
    textAlign: "center",
  },
  tableDataCell: {
    flex: 1,
    padding: "15px 5px",
    textAlign: "center",
    color: "black",
    backgroundColor: "#F3F4F6",
    fontSize: 12,
  },
  totalBox: {
    backgroundColor: "#f1f1f1",
    padding: "12px 0",
    textAlign: "right",
  },
  footer: {
    backgroundColor: "#0da848",
    color: "white",
    paddingVertical: 10,
    textAlign: "center",
    width: "100%",
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  bulletPoint: {
    fontSize: 12,
    color: "#000",
    marginBottom: 5,
  },
});

const Invoice = ({ investment }) => {
  return (
    <Document>
      <Page style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={{ marginTop: -25 }}>
            <Image
              src="/images/logo/Rtemis.png"
              style={styles.logo}
              alt="logo"
            />
            <Text style={[styles.text, { marginLeft: 20, marginTop: -30 }]}>
              www.rtemisbd.com
            </Text>
          </View>
          <View style={styles.companyDetails}>
            <Text style={styles.text}>Phone: 01894733945</Text>
            <Text style={styles.text}>Email: sharikana.invest@gmail.com</Text>
            <Text style={styles.text}>
              Head office: House-23, Road-03, Dhanmondi, Dhaka
            </Text>
          </View>
        </View>

        <Text style={styles.title}>INVOICE</Text>

        {/* Bill To and Invoice Details */}
        <View style={styles.section}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View>
              <Text style={styles.sectionTitle}>Bill To,</Text>
              <Text style={styles.text}>
                Name: {investment?.userId?.name || "N/A"}
              </Text>
              <Text style={[styles.text, { margin: "5px 0", width: "48%" }]}>
                Address: {investment?.userId?.address?.addressLine1 || "N/A"},{" "}
                {investment?.userId?.address?.addressLine2 || ""}
              </Text>
              <Text style={styles.text}>
                Contact No: {investment?.userId?.phoneNumber || "N/A"}
              </Text>
            </View>
            <View style={{ textAlign: "right" }}>
              <Text style={styles.sectionTitle}>Invoice Details</Text>
              <Text style={styles.text}>
                Issue Date: {formatDate(investment?.createdAt) || "N/A"}
              </Text>
              <Text style={styles.text}>
                Invoice No: {investment?.id?._id || "N/A"}
              </Text>
            </View>
          </View>
        </View>

        {/* Invoice Table */}
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            {[
              "No",
              "Project Name",
              "Number of Slot",
              "Slot Price",
              "Total Amount",
            ].map((header) => (
              <Text style={styles.tableHeaderCell} key={header}>
                {header}
              </Text>
            ))}
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableDataCell}>01</Text>
            <Text style={styles.tableDataCell}>
              {investment?.project?.projectTitle || "N/A"}
            </Text>
            <Text style={styles.tableDataCell}>
              {investment?.totalBuyShare || "N/A"} Slot(s)
            </Text>
            <Text style={styles.tableDataCell}>
              BDT {formatBDT(investment?.project?.perShareValue) || "N/A"}
            </Text>
            <Text style={styles.tableDataCell}>
              BDT {formatBDT(investment?.investmentAmount) || "N/A"}
            </Text>
          </View>
        </View>

        {/* Payment Details */}
        <View style={styles.section}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 40,
            }}
          >
            <View style={{ flex: 1, marginRight: 10 }}>
              <Text style={styles.sectionTitle}>Payment Details,</Text>
              <Text style={styles.text}>Payment Type: Bank Transfer</Text>
            </View>
            <View style={[styles.totalBox, { flex: 1 }]}>
              <Text
                style={{ paddingHorizontal: 12, fontSize: 12, marginBottom: 8 }}
              >
                Sub Total: BDT{" "}
                {formatBDT(investment?.investmentAmount) || "N/A"}
              </Text>
              <Text
                style={{
                  backgroundColor: "#0da848",
                  color: "white",
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  fontSize: 12,
                  textAlign: "right",
                  marginBottom: 8,
                }}
              >
                Total: BDT {formatBDT(investment?.investmentAmount) || "N/A"}
              </Text>
              <View
                style={{ paddingHorizontal: 12, fontSize: 12, marginBottom: 8 }}
              >
                {investment?.status !== "Approved" ? (
                  <Text style={{ color: "red" }}>
                    Due: BDT {formatBDT(investment?.investmentAmount) || "N/A"}
                  </Text>
                ) : (
                  <Text style={{ color: "red" }}>Due: BDT 0.00</Text>
                )}
              </View>
              <View
                style={{ paddingHorizontal: 12, fontSize: 12, marginBottom: 8 }}
              >
                {investment?.status !== "Approved" ? (
                  <Text style={{ color: "green" }}>Received: BDT 0.00</Text>
                ) : (
                  <Text style={{ color: "green" }}>
                    Received: BDT{" "}
                    {formatBDT(investment?.investmentAmount) || "N/A"}
                  </Text>
                )}
              </View>
            </View>
          </View>
        </View>

        {/* Terms and Conditions */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { marginTop: 20 }]}>
            Terms & Conditions:
          </Text>
          <Text style={styles.bulletPoint}>
            • Payments must be completed by the due date; all investments are
            non-refundable.
          </Text>
          <Text style={styles.bulletPoint}>
            • Ownership rights and returns depend on the project type and are
            outlined in the respective agreement.
          </Text>
          <Text style={styles.bulletPoint}>
            • Sharikana is not liable for unforeseen losses; disputes will be
            resolved under [Jurisdiction] laws.
          </Text>
          <Text style={styles.bulletPoint}>
            • Payments must be completed by the due date; all investments are
            non-refundable.
          </Text>
          <Text style={styles.bulletPoint}>
            • Ownership rights and returns depend on the project type and are
            outlined in the respective agreement.
          </Text>
          <Text style={styles.bulletPoint}>
            • Sharikana is not liable for unforeseen losses; disputes will be
            resolved under [Jurisdiction] laws.
          </Text>
          <Text style={styles.bulletPoint}>
            • Payments must be completed by the due date; all investments are
            non-refundable.
          </Text>
          <Text style={styles.bulletPoint}>
            • Ownership rights and returns depend on the project type and are
            outlined in the respective agreement.
          </Text>
          <Text style={styles.bulletPoint}>
            • Sharikana is not liable for unforeseen losses; disputes will be
            resolved under [Jurisdiction] laws.
          </Text>
        </View>

        {/* Footer Section */}
        <View style={styles.footer}>
          <Text style={[styles.text, { textAlign: "center", color: "white" }]}>
            Corporate office: Flat-4A, House no: 157, Block-E, Road no: 12,
            Banani, Dhaka 1213 (Sharikana)
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default Invoice;
