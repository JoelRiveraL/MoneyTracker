import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDFDocument from './PDFDocument'; // Asegúrate de que el componente PDFDocument esté bien importado

const PDFLinkComponent = ({ data }: { data: any }) => {
  return (
    <PDFDownloadLink document={<PDFDocument data={data} />} fileName="document.pdf">
      {({ blob, url, loading, error }) =>
        loading ? 'Generating PDF...' : 'Download PDF'
      }
    </PDFDownloadLink>
  );
};

export default PDFLinkComponent;
