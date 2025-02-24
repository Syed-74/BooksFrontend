import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import { useLocation } from 'react-router-dom';

// Configure the worker source for PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

function MyPdfViewer() {
  const { state } = useLocation();
  const pdfUrl = state?.pdfUrl;

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className="p-4 bg-gray-100 min-h-screen flex flex-col mb-10 items-center">
      {/* Styled container for the PDF viewer */}
      <div className="w-full max-w-4xl flex justify-center items-center gap-10 bg-white shadow-lg rounded-lg overflow-hidden border bg-gray-200 border-gray-300">
        <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
          {/* Pagination text */}
          <div className="p-4 text-center text-gray-700 font-semibold">
            Page {pageNumber} of {numPages}
          </div>
          {/* Render each page inside a styled wrapper */}
          {Array.from({ length: numPages }, (_, index) => (
            <div key={index} className="mb-4">
              <Page
                pageNumber={index + 1}
                renderAnnotationLayer={false}
                renderTextLayer={false}
              />
            </div>
          ))}
        </Document>
      </div>
    </div>
  );
}

export default MyPdfViewer;
