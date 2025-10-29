import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listMyResults } from '../slices/resultSlice';

const DashboardScreen = () => {
  const dispatch = useDispatch();
  
  const { userInfo } = useSelector((state) => state.auth);
  const { myResults, loading, error } = useSelector((state) => state.result);

  useEffect(() => {
    // Fetch the list of results to show the latest one
    dispatch(listMyResults());
  }, [dispatch]);

  const latestResult = myResults.length > 0 ? myResults[0] : null;

  const calculatePercentage = (correct, total) => {
      return total > 0 ? ((correct / total) * 100).toFixed(1) : 0;
  };

  const styles = {
    container: { padding: '30px', maxWidth: '800px', margin: '30px auto', border: '1px solid #ddd', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.05)' },
    welcome: { color: '#007bff', borderBottom: '2px solid #eee', paddingBottom: '15px', marginBottom: '30px' },
    cardContainer: { display: 'flex', gap: '20px', justifyContent: 'space-between' },
    card: (bg) => ({
      flex: 1,
      padding: '25px',
      borderRadius: '8px',
      textAlign: 'center',
      color: 'white',
      backgroundColor: bg,
      textDecoration: 'none',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      transition: '0.3s',
    }),
    statsSection: { marginTop: '40px', padding: '20px', borderTop: '1px solid #ccc' },
    statBox: { padding: '15px', border: '1px solid #007bff', borderRadius: '5px', textAlign: 'center', backgroundColor: '#e6f7ff' }
  };

  if (loading) return <div style={{ padding: '20px', textAlign: 'center' }}>Loading dashboard...</div>;
  if (error) return <div style={{ padding: '20px', color: 'red', textAlign: 'center' }}>Error loading data: {error}</div>;

  return (
    <div style={styles.container}>
      <h1 style={styles.welcome}>Welcome back, {userInfo.username}!</h1>

      {/* Action Cards: Start Test and History */}
      <div style={styles.cardContainer}>
        <Link to='/quiz' style={styles.card('#28a745')}>
          <h2 style={{ margin: 0 }}>Start a New Test</h2>
          <p style={{ margin: '5px 0 0 0' }}>Jump right back in!</p>
        </Link>
        <Link to='/history' style={styles.card('#007bff')}>
          <h2 style={{ margin: 0 }}>View All History</h2>
          <p style={{ margin: '5px 0 0 0' }}>Review your past scores.</p>
        </Link>
      </div>

      {/* Latest Result Summary */}
      <div style={styles.statsSection}>
        <h3 style={{ marginBottom: '20px' }}>Latest Performance Summary</h3>
        
        {latestResult ? (
          <div style={styles.statBox}>
            <p style={{ fontSize: '1.1em', marginBottom: '5px' }}>
              Test Taken On: <strong>{new Date(latestResult.createdAt).toLocaleDateString()}</strong>
            </p>
            <p style={{ fontSize: '2em', fontWeight: 'bolder', color: 'darkgreen', margin: '5px 0' }}>
              Score: {latestResult.totalScore}
            </p>
            <p style={{ fontSize: '1.2em' }}>
              Correct: {latestResult.correctAnswers} / {latestResult.questionsAttempted} ({calculatePercentage(latestResult.correctAnswers, latestResult.questionsAttempted)}%)
            </p>
            <Link 
              to={`/result/${latestResult._id}`} 
              style={{ textDecoration: 'none', color: '#007bff', fontWeight: 'bold', marginTop: '10px', display: 'inline-block' }}
            >
              View Full Details &rarr;
            </Link>
          </div>
        ) : (
          <p style={{ textAlign: 'center', padding: '15px', border: '1px dashed #ccc' }}>
            No completed tests found. Start your first test now!
          </p>
        )}
      </div>

    </div>
  );
};

export default DashboardScreen;