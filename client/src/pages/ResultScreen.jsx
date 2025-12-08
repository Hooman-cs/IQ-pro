// client/src/pages/ResultScreen.jsx

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getResultDetails, setResultDetails } from '../slices/resultSlice'; 
import api from '../utils/api'; // Import authenticated API instance

const ResultScreen = () => {
 const { id: resultId } = useParams();
 const dispatch = useDispatch();
 
 const { resultDetails, loading, error } = useSelector((state) => state.result);
 
 const [purchaseLoading, setPurchaseLoading] = useState(false);
 const [purchaseError, setPurchaseError] = useState(null);
 const [displayPrice, setDisplayPrice] = useState(null);

 useEffect(() => {
  if (resultId) {
   dispatch(getResultDetails(resultId));
  }
 }, [dispatch, resultId]);

 const calculatePercentage = (correct, total) => {
  return total > 0 ? ((correct / total) * 100).toFixed(1) : 0;
 };
 
 // --- HANDLERS FOR CERTIFICATE ACTIONS ---

 // NEW HANDLER: For initiating and verifying the RazorPay purchase
 const handlePurchaseCertificate = async () => {
  if (purchaseLoading || resultDetails.certificatePurchased) return;
  setPurchaseLoading(true);
  setPurchaseError(null);

  // Check for RazorPay script. (Assumes <script src="https://checkout.razorpay.com/v1/checkout.js"></script> is in index.html)
  if (!window.Razorpay) {
   alert('RazorPay script not loaded. Cannot initiate payment. Please check your HTML setup.');
   setPurchaseLoading(false);
   return;
  }
  
  try {
   // 1. Get the RazorPay Order ID from your backend
   const { data } = await api.post('/payments/create-order', { resultId });

   // RazorPay amounts are in the smallest currency unit (e.g., paise for INR)
   setDisplayPrice(data.amount / 100); 

   // 2. Configure the RazorPay Checkout Options
   const options = {
    key: data.keyId,
    amount: data.amount,
    currency: data.currency,
    name: 'IQ Testing Platform',
    description: `Certificate for Test ID: ${resultId}`,
    order_id: data.orderId,
    handler: async function (response) {
     // This function runs on SUCCESSFUL payment
     setPurchaseLoading(true); // Re-engage loading state during verification
     try {
      // 3. Send payment details to your backend for signature verification
      const verifyData = {
       razorpay_order_id: response.razorpay_order_id,
       razorpay_payment_id: response.razorpay_payment_id,
       razorpay_signature: response.razorpay_signature,
       resultId: resultId, // Pass resultId back to link payment to certificate
      };
     
      const { data: verificationData } = await api.post('/payments/verify', verifyData);

      alert('Payment successful! Certificate access granted.');

      // CRITICAL: Update Redux state with the new result details object
      if (verificationData.resultDetails) {
       dispatch(setResultDetails(verificationData.resultDetails)); 
      }

     } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Unknown verification error.';
      setPurchaseError(`Verification Failed: ${errorMsg}`);
      console.error('Verification Error:', err.response?.data || err);
     } finally {
      setPurchaseLoading(false);
     }
    },
    prefill: {
     name: data.userName,
     email: data.userEmail,
     contact: '', 
    },
    notes: { resultId: resultId },
    theme: { color: '#3b82f6' }, // Taildwind blue-500 equivalent
   };

   // 4. Open the RazorPay Checkout Widget
   const rzp = new window.Razorpay(options);
   rzp.on('payment.failed', function (response) {
    setPurchaseError(response.error.description);
    console.error('Payment Failed:', response.error);
    setPurchaseLoading(false);
   });
   rzp.open();

  } catch (err) {
   // Handles errors before the widget opens (e.g., order creation failure)
   const errorMsg = err.response?.data?.message || 'Failed to create payment order.';
   setPurchaseError(errorMsg);
   console.error(err);
   setPurchaseLoading(false);
  }
 };


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
 
 if (loading) return <div className="p-6 text-center text-blue-600 font-medium">Loading result...</div>;
 if (error) return <div className="p-6 text-red-600 text-center font-medium border border-red-300 bg-red-50 mx-auto max-w-lg">Error loading result: {error}</div>;
 if (!resultDetails) return <div className="p-6 text-center text-gray-700">Result not found.</div>;

 const scorePercentage = calculatePercentage(resultDetails.correctAnswers, resultDetails.questionsAttempted);

 return (
  <div className="p-6 max-w-2xl mx-auto my-6 bg-white rounded-xl shadow-2xl border border-gray-100 text-center">
   <h1 className="text-3xl font-bold text-blue-600 border-b-2 border-gray-200 pb-3 mb-6">
      Test Result Details
    </h1>
   
   <div className="mb-6 space-y-2">
    <p className="text-xl font-bold text-gray-700">
        Total Score: <span className="text-green-600">{resultDetails.totalScore}</span>
      </p>
    <p className="text-lg text-gray-600">
        Correct Answers: {resultDetails.correctAnswers} / {resultDetails.questionsAttempted}
      </p>
    <p className="text-2xl font-extrabold">
        Percentage: <span className="text-yellow-600">{scorePercentage}%</span>
      </p>
   </div>

   {/* Certificate Section */}
   <div className="border-t border-dashed border-gray-400 pt-6">
    <h2>Certificate Status</h2>
    
    {/* Purchase Error Display */}
    {purchaseError && (
        <p className="text-red-700 bg-red-100 p-2 rounded-md mb-3 font-medium">
          Error: {purchaseError}
        </p>
      )}
    
    {purchaseLoading && (
        <p className="text-orange-600 font-medium mb-3 animate-pulse">
          {displayPrice ? `Waiting for payment of INR ${displayPrice.toFixed(2)}...` : 'Initiating payment order...'}
        </p>
      )}

    {/* Price Display (only before purchase) */}
    {displayPrice && !resultDetails.certificatePurchased && 
        <p className="text-xl font-bold text-red-600 mb-4">
          Certificate Price: INR {displayPrice.toFixed(2)}
        </p>
    }

    {resultDetails.certificatePurchased ? ( 
      <>
        <p className="text-green-600 font-bold text-lg mb-4">
            Certificate successfully purchased!
        </p>
        <div className="flex justify-center gap-4 mt-4">
          <button 
            onClick={handlePreviewCertificate} // PREVIEW BUTTON
            className="py-2 px-4 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition duration-150 shadow-md"
          >
            Preview Certificate
          </button>
          <button 
            onClick={handleDownloadCertificate} // DOWNLOAD BUTTON
            className="py-2 px-4 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition duration-150 shadow-md"
          >
            Download Certificate
          </button>
        </div>
      </>
    ) : (
      <>
        <p className="text-gray-600 mb-4">Certificate available for purchase.</p>
        <button 
          onClick={handlePurchaseCertificate} 
          disabled={purchaseLoading}
          className="py-2 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-150 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {purchaseLoading ? 'Processing...' : 'Purchase Certificate'}
        </button>
      </>
    )}
   </div>

   <div className="mt-8 pt-4 border-t border-gray-200">
     <Link to='/history' className="text-blue-600 hover:text-blue-800 font-semibold transition duration-150">
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
// // MODIFICATION 1: Import setResultDetails action from the slice
// import { getResultDetails, setResultDetails } from '../slices/resultSlice'; 
// import api from '../utils/api'; // Import authenticated API instance

// const ResultScreen = () => {
//  const { id: resultId } = useParams();
//  const dispatch = useDispatch();
 
//  const { resultDetails, loading, error } = useSelector((state) => state.result);
 
//  // MODIFICATION 2: Use standard state setters and add displayPrice
//  const [purchaseLoading, setPurchaseLoading] = useState(false);
//  const [purchaseError, setPurchaseError] = useState(null);
//  const [displayPrice, setDisplayPrice] = useState(null);

//  useEffect(() => {
//   if (resultId) {
//    dispatch(getResultDetails(resultId));
//   }
//  }, [dispatch, resultId]);

//  const calculatePercentage = (correct, total) => {
//   return total > 0 ? ((correct / total) * 100).toFixed(1) : 0;
//  };
 
//  // --- HANDLERS FOR CERTIFICATE ACTIONS ---

//  // NEW HANDLER: For initiating and verifying the RazorPay purchase
//  const handlePurchaseCertificate = async () => {
//   if (purchaseLoading || resultDetails.certificatePurchased) return;
//   setPurchaseLoading(true);
//   setPurchaseError(null);

//   // Check for RazorPay script. (Assumes <script src="https://checkout.razorpay.com/v1/checkout.js"></script> is in index.html)
//   if (!window.Razorpay) {
//    alert('RazorPay script not loaded. Cannot initiate payment.');
//    setPurchaseLoading(false);
//    return;
//   }
  
//   try {
//    // 1. Get the RazorPay Order ID from your backend
//    const { data } = await api.post('/payments/create-order', { resultId });

//    // RazorPay amounts are in the smallest currency unit (e.g., paise for INR)
//    setDisplayPrice(data.amount / 100); 

//    // 2. Configure the RazorPay Checkout Options
//    const options = {
//     key: data.keyId,
//     amount: data.amount,
//     currency: data.currency,
//     name: 'IQ Testing Platform',
//     description: `Certificate for Test ID: ${resultId}`,
//     order_id: data.orderId,
//     handler: async function (response) {
//      // This function runs on SUCCESSFUL payment
//      setPurchaseLoading(true); // Re-engage loading state during verification
//      try {
//       // 3. Send payment details to your backend for signature verification
//       const verifyData = {
//        razorpay_order_id: response.razorpay_order_id,
//        razorpay_payment_id: response.razorpay_payment_id,
//        razorpay_signature: response.razorpay_signature,
//        resultId: resultId, // Pass resultId back to link payment to certificate
//       };
     
//       const { data: verificationData } = await api.post('/payments/verify', verifyData);

//       alert('Payment successful! Certificate access granted.');

//       // CRITICAL: Update Redux state with the new result details object
//       if (verificationData.resultDetails) {
//        dispatch(setResultDetails(verificationData.resultDetails)); 
//       }

//      } catch (err) {
//       const errorMsg = err.response?.data?.message || err.message || 'Unknown verification error.';
//       setPurchaseError(`Verification Failed: ${errorMsg}`);
//       console.error('Verification Error:', err.response?.data || err);
//      } finally {
//       setPurchaseLoading(false);
//      }
//     },
//     prefill: {
//      name: data.userName,
//      email: data.userEmail,
//      contact: '', 
//     },
//     notes: { resultId: resultId },
//     theme: { color: '#007bff' },
//    };

//    // 4. Open the RazorPay Checkout Widget
//    const rzp = new window.Razorpay(options);
//    rzp.on('payment.failed', function (response) {
//     setPurchaseError(response.error.description);
//     console.error('Payment Failed:', response.error);
//     setPurchaseLoading(false);
//    });
//    rzp.open();

//   } catch (err) {
//    // Handles errors before the widget opens (e.g., order creation failure)
//    const errorMsg = err.response?.data?.message || 'Failed to create payment order.';
//    setPurchaseError(errorMsg);
//    console.error(err);
//    setPurchaseLoading(false);
//   }
//  };


//  // Handler for making the authenticated API call for direct DOWNLOAD
//  const handleDownloadCertificate = async (e) => {
//    e.preventDefault(); 
//    if (!resultId) return;
   
//    try {
//      // Note: The download request does NOT include the 'preview=true' query
//      const response = await api.get(`/certificates/${resultId}`, {
//        responseType: 'blob', 
//      });

//      // Download logic (forces download via Content-Disposition: attachment)
//      const blob = new Blob([response.data], { type: 'application/pdf' });
//      const url = window.URL.createObjectURL(blob);
//      const link = document.createElement('a');
//      link.href = url;
//      link.setAttribute('download', `Certificate-${resultId}.pdf`); 
     
//      document.body.appendChild(link);
//      link.click();
//      link.remove();
//      window.URL.revokeObjectURL(url); 

//    } catch (error) {
//      const errorMessage = error.response?.data?.message || 'Failed to download certificate.';
//      console.error('Certificate Download Failed:', error);
//      alert(errorMessage);
//    }
//  };

//  // Handler for PREVIEWING the certificate (opens inline in new tab)
//  const handlePreviewCertificate = () => {
//    if (!resultId) return;

//    try {
//      // Perform the authenticated request to get the PDF blob, requesting the inline header
//      api.get(`/certificates/${resultId}?preview=true`, {
//        responseType: 'blob',
//      }).then(response => {
//        const blob = new Blob([response.data], { type: 'application/pdf' });
//        const url = URL.createObjectURL(blob);
//        window.open(url, '_blank'); // Open the blob URL in a new tab
//      }).catch(error => {
//        const errorMessage = error.response?.data?.message || 'Failed to preview certificate.';
//        alert(errorMessage);
//        console.error('Preview Failed:', error);
//      });

//    } catch (error) {
//      alert('Failed to initiate preview request.', error);
//    }
//  };
 

//  // --- END HANDLERS ---
 
//  if (loading) return <div style={{ padding: '20px', textAlign: 'center' }}>Loading result...</div>;
//  if (error) return <div style={{ padding: '20px', color: 'red', textAlign: 'center' }}>Error loading result: {error}</div>;
//  if (!resultDetails) return <div style={{ padding: '20px', textAlign: 'center' }}>Result not found.</div>;

//  const scorePercentage = calculatePercentage(resultDetails.correctAnswers, resultDetails.questionsAttempted);

//  return (
//   <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', textAlign: 'center', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
//    <h1 style={{ color: '#007bff', borderBottom: '2px solid #eee', paddingBottom: '10px', marginBottom: '20px' }}>Test Result Details</h1>
   
//    <div style={{ marginBottom: '20px' }}>
//     <p style={{ fontSize: '1.2em', fontWeight: 'bold' }}>Total Score: <span style={{ color: '#28a745' }}>{resultDetails.totalScore}</span></p>
//     <p style={{ fontSize: '1.2em' }}>Correct Answers: {resultDetails.correctAnswers} / {resultDetails.questionsAttempted}</p>
//     <p style={{ fontSize: '1.5em', fontWeight: 'bold' }}>Percentage: <span style={{ color: '#ffc107' }}>{scorePercentage}%</span></p>
//    </div>

//    {/* NEW: Display price if fetched */}
//    {displayPrice && !resultDetails.certificatePurchased && <p style={{ fontWeight: 'bold', color: '#dc3545' }}>Certificate Price: INR {displayPrice.toFixed(2)}</p>}

//    <div style={{ borderTop: '1px dashed #ccc', paddingTop: '20px' }}>
//     <h2>Certificate Status</h2>
    
//     {/* Purchase Error Display */}
//     {purchaseError && <p style={{ color: 'red' }}>{purchaseError}</p>}
//     {purchaseLoading && <p style={{ color: 'orange' }}>{displayPrice ? 'Waiting for payment...' : 'Initiating payment order...'}</p>}

//     {resultDetails.certificatePurchased ? ( 
//       <>
//         <p style={{ color: 'green', fontWeight: 'bold' }}>Certificate successfully purchased!</p>
//         <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '10px' }}>
//           <button 
//             onClick={handlePreviewCertificate} // PREVIEW BUTTON
//             style={{ padding: '10px 20px', background: 'gray', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
//           >
//             Preview Certificate
//           </button>
//           <button 
//             onClick={handleDownloadCertificate} // DOWNLOAD BUTTON
//             style={{ padding: '10px 20px', background: 'darkgreen', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
//           >
//             Download Certificate
//           </button>
//         </div>
//       </>
//     ) : (
//       <>
//         <p>Certificate available for purchase.</p>
//         {/* MODIFICATION 3: Replaced Link with Button and added handler */}
//         <button 
//           onClick={handlePurchaseCertificate} 
//           disabled={purchaseLoading}
//           style={{ padding: '10px 20px', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px', display: 'inline-block', marginTop: '10px', cursor: purchaseLoading ? 'not-allowed' : 'pointer' }}
//         >
//           {purchaseLoading ? 'Processing...' : 'Purchase Certificate'}
//         </button>
//       </>
//     )}
//    </div>

//    <div style={{ marginTop: '30px' }}>
//      <Link to='/history' style={{ textDecoration: 'none', color: '#007bff' }}>
//        &larr; Back to History
//      </Link>
//    </div>
//   </div>
//  );
// };

// export default ResultScreen;