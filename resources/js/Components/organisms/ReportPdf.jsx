import React, { useState, useEffect } from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Styling untuk PDF
const styles = StyleSheet.create({
    page: {
        padding: 20,
        fontSize: 10,
    },
    header: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
        fontWeight: 'bold',
    },
    table: {
        display: 'table',
        width: '100%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        marginBottom: 10,
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
    },
    tableCol: {
        width: '12.5%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        padding: 5,
    },
    tableCell: {
        textAlign: 'center',
        fontSize: 9,
        padding: 2,
    },
    tableHeader: {
        backgroundColor: '#f2f2f2',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 10,
    },
});

// Komponen untuk merender PDF
const ReportPdf = ({ data, users, instruments }) => (
    <Document>
        <Page style={styles.page}>
            <Text style={styles.header}>Return Instruments Report</Text>
            <View style={styles.table}>
                <View style={styles.tableRow}>
                    <Text style={[styles.tableCol, styles.tableHeader]}>ID</Text>
                    <Text style={[styles.tableCol, styles.tableHeader]}>Code</Text>
                    <Text style={[styles.tableCol, styles.tableHeader]}>Status</Text>
                    <Text style={[styles.tableCol, styles.tableHeader]}>Loan ID</Text>
                    <Text style={[styles.tableCol, styles.tableHeader]}>Name</Text>
                    <Text style={[styles.tableCol, styles.tableHeader]}>Instrument Name</Text>
                    <Text style={[styles.tableCol, styles.tableHeader]}>Return Date</Text>
                    <Text style={[styles.tableCol, styles.tableHeader]}>Created At</Text>
                </View>
                {data.map((item) => {
                    const user = users.find((u) => u.id === item.user_id);
                    const instrument = instruments.find((i) => i.id === item.instrument_id);

                    // Menghilangkan waktu dengan substring
                    const returnDate = item.return_date ? item.return_date.substring(0, 10) : 'Unknown';
                    const createdAt = item.created_at ? item.created_at.substring(0, 10) : 'Unknown';

                    return (
                        <View style={styles.tableRow} key={item.id}>
                            <Text style={[styles.tableCol, styles.tableCell]}>{item.id}</Text>
                            <Text style={[styles.tableCol, styles.tableCell]}>{item.return_instrument_code}</Text>
                            <Text style={[styles.tableCol, styles.tableCell]}>{item.status}</Text>
                            <Text style={[styles.tableCol, styles.tableCell]}>{item.loan_id}</Text>
                            <Text style={[styles.tableCol, styles.tableCell]}>{user ? user.name : 'Unknown'}</Text>
                            <Text style={[styles.tableCol, styles.tableCell]}>{instrument ? instrument.name : 'Unknown'}</Text>
                            <Text style={[styles.tableCol, styles.tableCell]}>{returnDate}</Text>
                            <Text style={[styles.tableCol, styles.tableCell]}>{createdAt}</Text>
                        </View>
                    );
                })}
            </View>
        </Page>
    </Document>
);

export default ReportPdf;
