import { Document, Page, Text, View, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer';
import { InvoiceData, CalculatedAmounts } from '../types/invoice';

const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontFamily: 'Times-Roman'
    },
    header: {
        marginBottom: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    headerLeft: {
        width: '65%',
        flexDirection: 'column'
    },
    topSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8
    },
    logo: {
        width: 45,
        height: 45,
        marginBottom: 10,
        objectFit: 'contain'
    },
    companyInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4
    },
    companyName: {
        fontSize: 14,
        marginBottom: 10,
        fontFamily: 'Times-Roman'
    },
    companySubName: {
        fontSize: 12,
        fontFamily: 'Times-Roman'
    },
    detailsSection: {
        marginTop: 2
    },
    companyDetails: {
        fontSize: 9,
        marginBottom: 1,
        color: '#374151'
    },
    emailDetails: {
        fontSize: 9,
        marginBottom: 1,
        color: '#374151',
        wordBreak: 'break-word'
    },
    headerRight: {
        width: '30%',
        alignItems: 'flex-end'
    },
    invoiceDetails: {
        fontSize: 10,
        marginBottom: 4,
        textAlign: 'right',
        color: '#374151'
    },
    title: {
        fontSize: 16,
        marginBottom: 15,
        fontWeight: 'bold'
    },
    section: {
        marginBottom: 20
    },
    table: {
        marginTop: 15,
        marginBottom: 15
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
        paddingVertical: 8
    },
    tableHeader: {
        backgroundColor: '#F3F4F6',
        fontWeight: 'bold'
    },
    tableCell: {
        flex: 1,
        fontSize: 10,
        padding: 5
    },
    amountSection: {
        marginTop: 30,
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        paddingTop: 15
    },
    amountRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5
    },
    amountLabel: {
        fontSize: 10,
        color: '#374151'
    },
    amountValue: {
        fontSize: 10,
        fontWeight: 'bold'
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB'
    },
    totalLabel: {
        fontSize: 12,
        fontWeight: 'bold'
    },
    totalValue: {
        fontSize: 12,
        fontWeight: 'bold'
    },
    signatureSection: {
        marginTop: 50,
        alignItems: 'flex-end'
    },
    signatureImage: {
        width: 150,
        height: 60,
        objectFit: 'contain'
    }
});

interface InvoicePDFProps {
    data: InvoiceData;
    amounts: CalculatedAmounts;
    signatureUrl?: string;
}

export default function InvoicePDF({ data, amounts, signatureUrl }: InvoicePDFProps) {
    return (
        <PDFViewer style={{ width: '100%', height: '800px' }}>
            <Document>
                <Page size="A4" style={styles.page}>
                    <View style={styles.header}>
                        <View style={styles.headerLeft}>
                            <Image src="/LOGO.png" style={{ ...styles.logo, width: 100, height: 100 }} />
                            <Text style={styles.companyName}>TSMC Creations India Pvt.Ltd.</Text>
                            <View style={styles.detailsSection}>
                                <Text style={styles.companyDetails}>GSTIN: 33AAJCT3867G1Z4</Text>
                                <Text style={styles.companyDetails}>Address: Chennai, Tamil Nadu - 600096</Text>
                                <Text style={styles.companyDetails}>India</Text>
                                <Text style={styles.emailDetails}>Email: support@lifedemy.in</Text>
                            </View>
                        </View>
                        <View style={styles.headerRight}>
                            <Text style={styles.invoiceDetails}>Invoice No: {data.invoice_no}</Text>
                            <Text style={styles.invoiceDetails}>Date: {data.date}</Text>
                            <Text style={styles.invoiceDetails}>Order No: {data.order_no}</Text>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.title}>Bill To:</Text>
                        <Text style={styles.companyDetails}>Name: {data.customer_name}</Text>
                        <Text style={styles.companyDetails}>Email: {data.customer_email}</Text>
                        {data.customer_gstin && (
                            <Text style={styles.companyDetails}>GSTIN: {data.customer_gstin}</Text>
                        )}
                        {data.customer_address && (
                            <Text style={styles.companyDetails}>Address: {data.customer_address}</Text>
                        )}
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.title}>Course Details:</Text>
                        <Text style={styles.companyDetails}>{data.description}</Text>
                    </View>

                    <View style={styles.amountSection}>
                        <View style={styles.amountRow}>
                            <Text style={styles.amountLabel}>MRP Amount:</Text>
                            <Text style={styles.amountValue}>Rs. {data.mrp.toFixed(2)}</Text>
                        </View>
                        <View style={styles.amountRow}>
                            <Text style={styles.amountLabel}>Discount:</Text>
                            <Text style={styles.amountValue}>Rs. {data.discount.toFixed(2)}</Text>
                        </View>
                        <View style={styles.amountRow}>
                            <Text style={styles.amountLabel}>Taxable Amount:</Text>
                            <Text style={styles.amountValue}>Rs. {amounts.taxableAmount.toFixed(2)}</Text>
                        </View>
                        <View style={styles.amountRow}>
                            <Text style={styles.amountLabel}>CGST (9%):</Text>
                            <Text style={styles.amountValue}>Rs. {amounts.cgst.toFixed(2)}</Text>
                        </View>
                        <View style={styles.amountRow}>
                            <Text style={styles.amountLabel}>SGST (9%):</Text>
                            <Text style={styles.amountValue}>Rs. {amounts.sgst.toFixed(2)}</Text>
                        </View>
                        <View style={styles.totalRow}>
                            <Text style={styles.totalLabel}>Total Amount:</Text>
                            <Text style={styles.totalValue}>Rs. {amounts.totalAmount.toFixed(2)}</Text>
                        </View>
                    </View>

                    {signatureUrl && (
                        <View style={styles.signatureSection}>
                            <Image src={signatureUrl} style={styles.signatureImage} />
                            <Text style={styles.companyDetails}>Authorized Signatory</Text>
                        </View>
                    )}
                </Page>
            </Document>
        </PDFViewer>
    );
}
