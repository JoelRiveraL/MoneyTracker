import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const PDFDocument = ({ data }: { data: Array<any> }) => {
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#E4E4E4',
      padding: 20,
    },
    title: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
        color: '#333333',
      },
    table: {
      display: 'flex',
      width: 'auto',
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#bfbfbf',
    },
    tableRow: {
      flexDirection: 'row',
    },
    tableCellHeader: {
      flex: 1, // Ocupa el mismo ancho para cada celda
      padding: 8,
      fontSize: 12,
      fontWeight: 'bold',
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#bfbfbf',
      textAlign: 'center', // Centra el texto
      
    },
    tableCell: {
      flex: 1, // Ocupa el mismo ancho para cada celda
      padding: 8,
      fontSize: 10,
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#bfbfbf',
      textAlign: 'center', // Centra el texto
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Payment Report</Text>
        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableRow}>
            <Text style={styles.tableCellHeader}>ID</Text>
            <Text style={styles.tableCellHeader}>Nombre</Text>
            <Text style={styles.tableCellHeader}>Precio</Text>
            <Text style={styles.tableCellHeader}>Descripcion</Text>
            <Text style={styles.tableCellHeader}>Estado</Text>
          </View>
          {/* Table Rows */}
          {data.map((payment) => (
            <View style={styles.tableRow} key={payment.id}>
              <Text style={styles.tableCell}>{payment.id}</Text>
              <Text style={styles.tableCell}>{payment.name}</Text>
              <Text style={styles.tableCell}>{payment.price}</Text>
              <Text style={styles.tableCell}>{payment.description}</Text>
              <Text style={styles.tableCell}>{payment.status}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default PDFDocument;
