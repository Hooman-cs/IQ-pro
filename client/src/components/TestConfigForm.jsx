import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTestConfig, updateTestConfig, resetConfigSuccess } from '../slices/configSlice';

const TestConfigForm = () => {
  const dispatch = useDispatch();
  const { testConfig, loading, error, success } = useSelector((state) => state.config);

  const [durationMinutes, setDurationMinutes] = useState(15);
  const [totalQuestions, setTotalQuestions] = useState(15);
  const [distribution, setDistribution] = useState([]);
  const [formError, setFormError] = useState(null);

  const difficulties = ['easy', 'medium', 'hard'];

  // 1. Fetch config on component mount
  useEffect(() => {
    dispatch(fetchTestConfig());
  }, [dispatch]);

  // 2. Load fetched config into local state
  useEffect(() => {
    if (testConfig) {
      setDurationMinutes(testConfig.durationMinutes);
      setTotalQuestions(testConfig.totalQuestions);
      // Map the distribution array from backend to local state
      const initialDist = difficulties.map(diff => {
        const item = testConfig.difficultyDistribution.find(d => d.difficulty === diff);
        return { 
          difficulty: diff, 
          count: item ? item.count : 0 
        };
      });
      setDistribution(initialDist);
    }
  }, [testConfig]);

  // Handle changes to the difficulty counts
  const handleDistributionChange = (difficulty, count) => {
    const newCount = parseInt(count) || 0;
    setDistribution(prevDist =>
      prevDist.map(item =>
        item.difficulty === difficulty ? { ...item, count: newCount } : item
      )
    );
  };

  // Helper function to calculate the sum of distributed questions
  const getDistributionSum = () => {
    return distribution.reduce((sum, item) => sum + item.count, 0);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setFormError(null);
    dispatch(resetConfigSuccess()); // Clear previous success/error

    const sum = getDistributionSum();

    // Validation 1: Sum of difficulty counts must not exceed totalQuestions
    if (sum > totalQuestions) {
      setFormError(`Total distributed questions (${sum}) exceeds Total Questions (${totalQuestions}). Please adjust.`);
      return;
    }

    // Validation 2: Ensure all difficulty entries are included (even with 0 count)
    const distributionToSend = distribution.map(({ difficulty, count }) => ({
      difficulty,
      count,
    }));

    const configData = {
      durationMinutes,
      totalQuestions,
      difficultyDistribution: distributionToSend,
    };
    
    dispatch(updateTestConfig(configData));
  };

  const inputStyle = { width: '100%', padding: '10px', marginTop: '5px', boxSizing: 'border-box' };
  const buttonStyle = (color) => ({ padding: '10px 15px', background: color, color: 'white', border: 'none', cursor: 'pointer', marginTop: '15px', marginRight: '10px' });
  const sum = getDistributionSum();

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h3>Test Configuration Settings</h3>
      
      {loading && <p>Loading/Saving configuration...</p>}
      {(error || formError) && <p style={{ color: 'red' }}>Error: {error || formError}</p>}
      {success && <p style={{ color: 'green' }}>Configuration updated successfully!</p>}
      
      <form onSubmit={submitHandler}>

        {/* Duration and Total Questions */}
        <div style={{ display: 'flex', gap: '30px', marginBottom: '20px' }}>
          <div>
            <label htmlFor='duration'>Duration (Minutes)</label>
            <input
              id='duration'
              type='number'
              min='1'
              value={durationMinutes}
              onChange={(e) => setDurationMinutes(parseInt(e.target.value) || 1)}
              required
              style={{ ...inputStyle, width: '150px' }}
            />
          </div>
          <div>
            <label htmlFor='total'>Total Questions in Test</label>
            <input
              id='total'
              type='number'
              min='1'
              value={totalQuestions}
              onChange={(e) => setTotalQuestions(parseInt(e.target.value) || 1)}
              required
              style={{ ...inputStyle, width: '150px' }}
            />
          </div>
        </div>

        {/* Difficulty Distribution */}
        <h4>Difficulty Distribution</h4>
        <div style={{ display: 'flex', gap: '20px', marginBottom: '10px' }}>
          {difficulties.map((diff) => {
            const currentItem = distribution.find(d => d.difficulty === diff);
            return (
              <div key={diff}>
                <label htmlFor={diff}>{diff.charAt(0).toUpperCase() + diff.slice(1)} Count</label>
                <input
                  id={diff}
                  type='number'
                  min='0'
                  max={totalQuestions} // Max cap to total questions
                  value={currentItem ? currentItem.count : 0}
                  onChange={(e) => handleDistributionChange(diff, e.target.value)}
                  required
                  style={{ ...inputStyle, width: '100px' }}
                />
              </div>
            );
          })}
        </div>

        {/* Validation Summary */}
        <div style={{ marginTop: '10px', padding: '10px', border: `1px solid ${sum > totalQuestions ? 'red' : 'green'}`, borderRadius: '3px' }}>
          <p>Distributed Questions Sum: **{sum}**</p>
          <p>Remaining Random Questions: **{Math.max(0, totalQuestions - sum)}**</p>
          {sum > totalQuestions && <p style={{ color: 'red', fontWeight: 'bold' }}>Error: Sum exceeds Total Questions!</p>}
        </div>

        <button type='submit' style={buttonStyle('darkgreen')}>
          Save Test Configuration
        </button>
      </form>
    </div>
  );
};

export default TestConfigForm;