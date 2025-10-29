import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listMyResults } from '../slices/resultSlice';
import api from '../utils/api';

const HistoryScreen = () => {
  const dispatch = useDispatch();
  
  // Use 'myResults' state from resultSlice
  const { myResults, loading, error } = useSelector((state) => state.result);

  useEffect(() => {
    // Fetch the list of results for the logged-in user
    dispatch(listMyResults());
  }, [dispatch]);

  const calculatePercentage = (correct, total) => {
      return total > 0 ? ((correct / total) * 100).toFixed(1) : 0;
  };

  const handleDownloadCertificate = async (resultId) => {
    try {
      // Use the authenticated API instance (api.js)
      const response = await api.get(`/certificates/${resultId}`, {
        responseType: 'blob', // Handle binary data
      });

      // Client-side file download logic
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
      console.error('Certificate Download Failed:', error);
      alert('Failed to download certificate. Please ensure you are logged in.');
    }
  };

  if (loading) return <div style={{ padding: '20px', textAlign: 'center' }}>Loading history...</div>;
  if (error) return <div style={{ padding: '20px', color: 'red', textAlign: 'center' }}>Error loading history: {error}</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ borderBottom: '2px solid #eee', paddingBottom: '10px' }}>My Quiz History</h1>

      {myResults.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <p style={{ fontSize: '1.2em' }}>You have not completed any quizzes yet.</p>
          <Link to='/quiz' style={{ textDecoration: 'none', padding: '10px 20px', background: 'green', color: 'white', borderRadius: '5px', marginTop: '20px', display: 'inline-block' }}>
            Start a Test
          </Link>
        </div>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr>
              <th style={{ padding: '10px', border: '1px solid #ccc', backgroundColor: '#f4f4f4', textAlign: 'left' }}>Date</th>
              <th style={{ padding: '10px', border: '1px solid #ccc', backgroundColor: '#f4f4f4', textAlign: 'center' }}>Score</th>
              <th style={{ padding: '10px', border: '1px solid #ccc', backgroundColor: '#f4f4f4', textAlign: 'center' }}>Correct (%)</th>
              <th style={{ padding: '10px', border: '1px solid #ccc', backgroundColor: '#f4f4f4', textAlign: 'center' }}>Details</th>
              <th style={{ padding: '10px', border: '1px solid #ccc', backgroundColor: '#f4f4f4', textAlign: 'center' }}>Certificate</th>
            </tr>
          </thead>
          <tbody>
            {myResults.map((result) => (
              <tr key={result._id}>
                <td style={{ padding: '10px', border: '1px solid #ccc' }}>{new Date(result.createdAt).toLocaleDateString()}</td>
                <td style={{ padding: '10px', border: '1px solid #ccc', textAlign: 'center', fontWeight: 'bold' }}>{result.totalScore}</td>
                <td style={{ padding: '10px', border: '1px solid #ccc', textAlign: 'center' }}>
                  {result.correctAnswers} / {result.questionsAttempted} ({calculatePercentage(result.correctAnswers, result.questionsAttempted)}%)
                </td>
                <td style={{ padding: '10px', border: '1px solid #ccc', textAlign: 'center' }}>
                  <Link 
                    to={`/result/${result._id}`} 
                    style={{ textDecoration: 'none', color: '#007bff', fontWeight: 'bold' }}
                  >
                    View
                  </Link>
                </td>
                <td style={{ padding: '10px', border: '1px solid #ccc', textAlign: 'center' }}>
        {result.certificatePurchased ? (
            // --- MODIFIED JSX: Use a button to call the authenticated handler ---
            <button
                onClick={() => handleDownloadCertificate(result._id)}
                style={{ 
                    textDecoration: 'none', 
                    color: 'darkgreen', 
                    fontWeight: 'bold',
                    background: 'none', // Make it look like a link
                    border: 'none',
                    padding: '0',
                    cursor: 'pointer',
                    fontSize: 'inherit',
                }}
                title="Download Certificate"
            >
                Download
            </button>
        ) : (
            <Link 
                to={`/result/${result._id}`} 
                style={{ textDecoration: 'none', color: 'orange' }}
            >
                Purchase
            </Link>
        )}
    </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HistoryScreen;