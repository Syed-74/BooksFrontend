import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import { useLocation, useNavigate } from 'react-router-dom';
import '../component/Home.css'
// Configure the worker source for PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

function MyPdfViewer() {
  const { state } = useLocation();
  const navigate = useNavigate(); // For navigation
  const pdfUrl = state?.pdfUrl;

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [imgLoadingy, setImgLoadingy] = useState(false)
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  if (imgLoadingy) {
    return (
      <div className="w-[100%] h-screen ">
        <div class="loader"></div>
      </div>

    )

  }
  return (
    <div className="p-4 bg-gray-100 min-h-screen flex flex-col mb-10 items-center">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)} // Navigate back
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition 
             text-sm sm:text-base md:text-lg lg:text-xl 
             px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3 md:py-4"
      >
        ← Back
      </button>


      {/* Styled container for the PDF viewer */}
      <div className="w-full max-w-4xl flex flex-col justify-center items-center gap-4 bg-white shadow-lg rounded-lg overflow-hidden border bg-gray-200 border-gray-300 p-4">
        <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
          {/* Pagination text */}
          <div className=" text-center text-gray-700 font-semibold text-sm sm:text-base md:text-lg">
            Page {pageNumber} of {numPages}
          </div>

          {/* Render each page inside a responsive wrapper */}
          {Array.from({ length: numPages }, (_, index) => (
            <div key={index} className="mb-4 flex justify-center">
              <Page
                pageNumber={index + 1}
                renderAnnotationLayer={false}
                renderTextLayer={false}
                className="scale-50 sm:scale-50 md:scale-110 lg:scale-125 w-full max-w-4xl"
              />
            </div>
          ))}
        </Document>

      </div>
    </div>
  );
}

export default MyPdfViewer;
