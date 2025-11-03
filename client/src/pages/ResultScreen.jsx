import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getResultDetails } from '../slices/resultSlice'; 
import api from '../utils/api'; // Import authenticated API instance

const ResultScreen = () => {
  const { id: resultId } = useParams();
  const dispatch = useDispatch();
  
  const { resultDetails, loading, error } = useSelector((state) => state.result);
  const [purchaseLoading, _setPurchaseLoading] = useState(false);
  const [purchaseError, _setPurchaseError] = useState(null);

  useEffect(() => {
    if (resultId) {
      dispatch(getResultDetails(resultId));
    }
  }, [dispatch, resultId]);

  const calculatePercentage = (correct, total) => {
    return total > 0 ? ((correct / total) * 100).toFixed(1) : 0;
  };
  
  // --- HANDLERS FOR CERTIFICATE ACTIONS ---

  // Handler for making the authenticated API call for direct DOWNLOAD
  const handleDownloadCertificate = async (e) => {
      e.preventDefault(); 
      if (!resultId) return;
      
      try {
          // Note: The download request does NOT include the 'preview=true' query
          const response = await api.get(`/certificates/${resultId}`, {
              responseType: 'blob', 
          });

          // Download logic (forces download via Content-Disposition: attachment)
          const blob = new Blob([response.data], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `Certificate-${resultId}.pdf`); 
          
          document.body.appendChild(link);
          link.click();
          link.remove();
          window.URL.revokeObjectURL(url); 

      } catch (error) {
          const errorMessage = error.response?.data?.message || 'Failed to download certificate.';
          console.error('Certificate Download Failed:', error);
          alert(errorMessage);
      }
  };

  // Handler for PREVIEWING the certificate (opens inline in new tab)
  const handlePreviewCertificate = () => {
      if (!resultId) return;

      try {
          // Perform the authenticated request to get the PDF blob, requesting the inline header
          api.get(`/certificates/${resultId}?preview=true`, {
              responseType: 'blob',
          }).then(response => {
              const blob = new Blob([response.data], { type: 'application/pdf' });
              const url = URL.createObjectURL(blob);
              window.open(url, '_blank'); // Open the blob URL in a new tab
          }).catch(error => {
              const errorMessage = error.response?.data?.message || 'Failed to preview certificate.';
              alert(errorMessage);
              console.error('Preview Failed:', error);
          });

      } catch (error) {
          alert('Failed to initiate preview request.', error);
      }
  };

  // --- END HANDLERS ---
  
  // Note: Purchase logic is missing here but assumed to exist for demonstration

  if (loading) return <div style={{ padding: '20px', textAlign: 'center' }}>Loading result...</div>;
  if (error) return <div style={{ padding: '20px', color: 'red', textAlign: 'center' }}>Error loading result: {error}</div>;
  if (!resultDetails) return <div style={{ padding: '20px', textAlign: 'center' }}>Result not found.</div>;

  const scorePercentage = calculatePercentage(resultDetails.correctAnswers, resultDetails.questionsAttempted);

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', textAlign: 'center', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
      <h1 style={{ color: '#007bff', borderBottom: '2px solid #eee', paddingBottom: '10px', marginBottom: '20px' }}>Test Result Details</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <p style={{ fontSize: '1.2em', fontWeight: 'bold' }}>Total Score: <span style={{ color: '#28a745' }}>{resultDetails.totalScore}</span></p>
        <p style={{ fontSize: '1.2em' }}>Correct Answers: {resultDetails.correctAnswers} / {resultDetails.questionsAttempted}</p>
        <p style={{ fontSize: '1.5em', fontWeight: 'bold' }}>Percentage: <span style={{ color: '#ffc107' }}>{scorePercentage}%</span></p>
      </div>

      <div style={{ borderTop: '1px dashed #ccc', paddingTop: '20px' }}>
        <h2>Certificate Status</h2>
        
        {/* Purchase Error Display */}
        {purchaseError && <p style={{ color: 'red' }}>{purchaseError}</p>}
        {purchaseLoading && <p style={{ color: 'orange' }}>Initiating purchase...</p>}

        {resultDetails.certificatePurchased ? ( 
            <>
                <p style={{ color: 'green', fontWeight: 'bold' }}>Certificate successfully purchased!</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '10px' }}>
                    <button 
                        onClick={handlePreviewCertificate} // PREVIEW BUTTON
                        style={{ padding: '10px 20px', background: 'gray', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                    >
                        Preview Certificate
                    </button>
                    <button 
                        onClick={handleDownloadCertificate} // DOWNLOAD BUTTON
                        style={{ padding: '10px 20px', background: 'darkgreen', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                    >
                        Download Certificate
                    </button>
                </div>
            </>
        ) : (
            <>
                <p>Certificate available for purchase.</p>
                {/* Placeholder for actual purchase button/logic */}
                <Link to={`/purchase/${resultId}`} 
                    style={{ textDecoration: 'none', padding: '10px 20px', background: '#007bff', color: 'white', borderRadius: '5px', display: 'inline-block', marginTop: '10px' }}
                >
                    Purchase Certificate
                </Link>
            </>
        )}
      </div>

      <div style={{ marginTop: '30px' }}>
          <Link to='/history' style={{ textDecoration: 'none', color: '#007bff' }}>
              &larr; Back to History
          </Link>
      </div>
    </div>
  );
};

export default ResultScreen;




// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams, Link } from 'react-router-dom';
// import { getResultDetails, setResultDetails } from '../slices/resultSlice';
// import api from '../utils/api';

// const ResultScreen = () => {
//   // const { id: resultId } = useParams();
//   // const resultId = resultDetails?._id;
//   const { id } = useParams(); 
//   const resultId = id;
//   const dispatch = useDispatch();

//   const { resultDetails, loading, error } = useSelector((state) => state.result);

//   const [purchaseLoading, setPurchaseLoading] = useState(false);
//   const [purchaseError, setPurchaseError] = useState(null);
//   const [displayPrice, setDisplayPrice] = useState(null);

//   // Existing handleDownloadCertificate remains the same
//   const handleDownloadCertificate = async () => {

//     if (!resultId) return;
    
//     try {
//       // 1. Use the authenticated API instance (axios) to fetch the certificate
//       const response = await api.get(`/certificates/${resultId}`, {
//         responseType: 'blob', // IMPORTANT: Tells Axios to handle binary data
//       });

//       // 2. Create a Blob object from the response data (the PDF file)
//       const blob = new Blob([response.data], { type: 'application/pdf' });
      
//       // 3. Create a temporary URL and link element to trigger the download
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement('a');
//       link.href = url;
      
//       // Set the suggested filename
//       link.setAttribute('download', `Certificate-${resultId}.pdf`); 
      
//       // Append to body, click, and clean up
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//       window.URL.revokeObjectURL(url); // Release the temporary URL

//     } catch (error) {
//       console.error('Certificate Download Failed:', error);
//       alert('Failed to download certificate. Please ensure you are logged in and have purchased it.');
//     }
//   };

//   // --- NEW RAZORPAY HANDLER ---
//   const handlePurchaseCertificate = async () => {
//     if (purchaseLoading || resultDetails.certificatePurchased) return;
//     setPurchaseLoading(true);
//     setPurchaseError(null);

//     try {
//       // 1. Get the RazorPay Order ID from your backend
//       const { data } = await api.post('/payments/create-order', { resultId });

//       setDisplayPrice(data.amount);

//       // 2. Configure the RazorPay Checkout Options
//       const options = {
//         key: data.keyId,
//         amount: data.amount,
//         currency: data.currency,
//         name: 'IQ Testing Platform',
//         description: `Certificate for Test ID: ${resultId}`,
//         // image: '/logo.png', // Optional logo URL
//         order_id: data.orderId,
//         handler: async function (response) {
//           // This function runs on SUCCESSFUL payment
//           setPurchaseLoading(true); // Keep loading state during verification
//           try {
//             // 3. Send payment details to your backend for signature verification
//             const verifyData = {
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_signature: response.razorpay_signature,
//               resultId: resultId, // Pass resultId back to link payment to certificate
//             };
            
//             const { data } = await api.post('/payments/verify', verifyData);

//             alert('Payment successful! Certificate access granted.');

//             // --- NEW: Directly update the Redux state with the returned object ---
//             if (data.resultDetails) {
//                  dispatch(setResultDetails(data.resultDetails)); // Use the new action
//             } else {
//                  // Fallback if data structure is unexpectedly missing
//                  console.error("Verification successful but updated result data is missing from server response.");
//             }

//           } catch (err) {
//             // setPurchaseError('Payment verification failed. Please contact support.');
//             // console.error('Verification Error:', err);
//             const errorMsg = err.response?.data?.message || err.message || 'Unknown verification error.';
//             setPurchaseError(`Verification Failed: ${errorMsg}`);
//             console.error('Verification Error:', err.response?.data || err);
//           } finally {
//             setPurchaseLoading(false);
//           }
//         },
//         prefill: {
//           name: data.userName,
//           email: data.userEmail,
//           contact: '', // You can prefill contact if available
//         },
//         notes: {
//           resultId: resultId,
//         },
//         theme: {
//           color: '#007bff',
//         },
//       };

//       // 4. Open the RazorPay Checkout Widget
//       const rzp = new window.Razorpay(options);
//       rzp.on('payment.failed', function (response) {
//         setPurchaseError(response.error.description);
//         console.error('Payment Failed:', response.error);
//         setPurchaseLoading(false);
//       });
//       rzp.open();

//     } catch (err) {
//       const errorMsg = err.response?.data?.message || 'Failed to create payment order.';
//       setPurchaseError(errorMsg);
//       console.error(err);
//     } finally {
//       // Only set loading to false here if the RazorPay widget failed to open
//       // Otherwise, the loading state is managed by the handler function
//       if (!window.Razorpay) {
//          setPurchaseLoading(false);
//       }
//     }
//   };
  
//   useEffect(() => {
//     if (resultId) {
//       dispatch(getResultDetails(resultId));
//     }
//   }, [dispatch, resultId]);

//   if (loading) return <div style={{ padding: '20px', textAlign: 'center' }}>Loading result...</div>;
//   if (error) return <div style={{ padding: '20px', color: 'red', textAlign: 'center' }}>Error: {error}</div>;
//   if (!resultDetails) return <div style={{ padding: '20px', textAlign: 'center' }}>No result found.</div>;

//   const { totalScore, questionsAttempted, correctAnswers } = resultDetails;

//   const getPercentage = (count, total) => (total > 0 ? ((count / total) * 100).toFixed(0) : 0);

//   return (
//     <div style={{ padding: '20px', maxWidth: '700px', margin: '30px auto', border: '2px solid #007bff', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
//       <h1 style={{ textAlign: 'center', color: '#007bff', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
//         Test Results
//       </h1>

//       <div style={{ textAlign: 'center', margin: '20px 0' }}>
//         <p style={{ fontSize: '1.2em', fontWeight: 'bold' }}>Test Taker: {resultDetails.user.username}</p>
//         <p style={{ fontSize: '1.2em' }}>Date: {new Date(resultDetails.createdAt).toLocaleDateString()}</p>
//       </div>

//       <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center' }}>
//         <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>Total Performance</h3>
//         <p style={{ fontSize: '2.5em', fontWeight: 'bolder', color: 'green' }}>Score: {totalScore}</p>
//         <p>Correct Answers: **{correctAnswers}** / {questionsAttempted} ({getPercentage(correctAnswers, questionsAttempted)}%)</p>
//       </div>

//       {/* --- NEW CERTIFICATE SECTION --- */}
//       <div style={{ textAlign: 'center', marginTop: '40px', padding: '20px', borderTop: '1px solid #ccc' }}>
//         <h3>Official Certificate</h3>
//         {purchaseError && <p style={{ color: 'red' }}>{purchaseError}</p>}
//         {purchaseLoading && <p style={{ color: 'blue' }}>Processing payment...</p>}

//         {resultDetails?.certificatePurchased ? ( // Check for null before accessing field
//           <>
//             <p style={{ color: 'green', fontWeight: 'bold' }}>Certificate successfully purchased!</p>
//             <button 
//                 onClick={handleDownloadCertificate}
//                 style={{ padding: '10px 20px', background: 'darkgreen', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '10px' }}
//             >
//                 Download Certificate
//             </button>
//           </>
//         ) : (
//           <>
//             <p>Get your official, verifiable certificate for **₹
//               {displayPrice !== null ? (displayPrice / 100).toFixed(2) : 'XX.XX'}
//               **.</p>
//             <button 
//               onClick={handlePurchaseCertificate}
//               disabled={purchaseLoading || !resultDetails} // Disable if loading or details haven't loaded
//               style={{ padding: '10px 20px', background: 'orange', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '10px' }}
//             >
//               {purchaseLoading ? 'Processing...' : `Purchase Certificate (₹${displayPrice !== null ? (displayPrice / 100).toFixed(2) : 'XX.XX'})`}
//             </button>
//           </>
//         )}
//       </div>

//       <div style={{ textAlign: 'center', marginTop: '30px' }}>
//         <Link to='/' style={{ textDecoration: 'none', padding: '10px 20px', background: '#007bff', color: 'white', borderRadius: '5px' }}>
//           Go to Home
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default ResultScreen;