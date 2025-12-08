// client/src/pages/QuizScreen.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api'; 
import { getTestQuestions } from '../slices/questionSlice'; 
import { fetchTestConfig } from '../slices/configSlice';

// Helper function to format seconds into MM:SS
const formatTime = (totalSeconds) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const QuizScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { 
    testQuestions, 
    testLoading: questionsLoading,
    testError: questionsError    
  } = useSelector((state) => state.question); 
  
  const { testConfig, loading: configLoading } = useSelector((state) => state.config);
  const { userInfo } = useSelector((state) => state.auth);

  // Quiz State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { questionId: selectedIndex, ... }
  const [timeLeft, setTimeLeft] = useState(0); // Time in seconds
  const [testActive, setTestActive] = useState(false);
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // 1. Initial Data Fetch (Questions and Config)
  useEffect(() => {
    if (!userInfo) {
      navigate('/login'); // Redirect if not logged in
      return;
    }
    dispatch(fetchTestConfig());
    dispatch(getTestQuestions()); 
  }, [dispatch, navigate, userInfo]);
  
  // 2. Set Initial Timer when Config is loaded
  useEffect(() => {
    if (testConfig && testConfig.durationMinutes > 0 && !testActive) {
      setTimeLeft(testConfig.durationMinutes * 60);
    }
  }, [testConfig, testActive]);

  // 3. Handle Option Selection
  const handleSelectOption = (questionId, selectedIndex) => {
    setUserAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: selectedIndex,
    }));
  };

  // 4. Submission Handler (Wrapped in useCallback due to timer dependency)
  const handleSubmit = useCallback(async (isAutoSubmit = false) => {
    if (submissionLoading) return;
    setSubmissionLoading(true);
    setTestActive(false); // Stop the timer

    // Calculate time taken (Total allowed seconds - Time left)
    const totalAllowedSeconds = testConfig?.durationMinutes * 60;
    const timeSpent = Math.max(0, totalAllowedSeconds - timeLeft); // Ensure timeSpent is not negative

    // Prepare answers for backend
    const finalAnswers = testQuestions.map(q => ({
        questionId: q._id,
        // Send -1 if the user did not select an answer for this question
        selectedIndex: userAnswers[q._id] !== undefined ? userAnswers[q._id] : -1, 
    }));
    
    try {
      // Configuration is simple, headers can be sent directly
      const { data } = await api.post('/questions/submit', {
        userAnswers: finalAnswers,
        timeTakenSeconds: timeSpent,
      });
      
      // Navigate to the results screen
      navigate(`/result/${data.resultId}`); 

    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to submit test. Check network or server logs.';
      setSubmitError(errorMsg);
      console.error(err);
    } finally {
      setSubmissionLoading(false);
    }
  }, [userAnswers, timeLeft, testConfig, navigate, testQuestions, submissionLoading]); 

  
  // 5. Timer Logic
  useEffect(() => {
    let timerId;
    if (testActive && timeLeft > 0) {
      timerId = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && testActive) {
      // Time is up! Auto-submit
      handleSubmit(true);
    }
    return () => clearInterval(timerId); // Cleanup
  }, [testActive, timeLeft, handleSubmit]); 
  
  // 6. Start Test Button Handler
  const startTest = () => {
    if (testQuestions && testQuestions.length > 0 && testConfig) {
      setTestActive(true);
      setCurrentQuestionIndex(0); // Start from the first question
    }
  };
  
  const currentQuestion = testQuestions ? testQuestions[currentQuestionIndex] : null;
  const totalQuestions = testQuestions ? testQuestions.length : 0;
  
  // --- Rendering Logic ---

  if (configLoading || questionsLoading) {
    return <div className="p-6 text-center text-blue-600 font-medium text-lg">Loading test configuration and questions...</div>;
  }
  
  if (questionsError) {
    return <div className="p-6 text-red-600 text-center font-medium border border-red-300 bg-red-50 mx-auto max-w-xl">Error loading questions: {questionsError}</div>;
  }
  
  // --- Pre-Test View ---
  if (!testActive) {
    return (
      <div className="p-8 max-w-lg mx-auto my-10 text-center bg-white rounded-xl shadow-2xl border-t-4 border-blue-500">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">IQ Test Readiness Check</h2>
        <hr className="mb-6"/>
        <p className="text-lg text-gray-600 mb-2">
          The test consists of <strong className="text-blue-600">{totalQuestions} questions</strong>.
        </p>
        <p className="text-lg text-gray-600 mb-6">
          You have a <strong className="text-red-500">{testConfig?.durationMinutes} minute</strong> time limit.
        </p>
        <p className="text-md text-gray-500 mb-8">
          Your score will be calculated based on difficulty: Easy (1 pt), Medium (3 pts), Hard (6 pts).
        </p>
        <button 
          onClick={startTest}
          disabled={totalQuestions === 0}
          className="py-3 px-8 text-xl bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {totalQuestions > 0 ? 'Start Test' : 'No Questions Available'}
        </button>
      </div>
    );
  }

  // --- Active Test View ---
  return (
    <div className="p-6 max-w-4xl mx-auto my-6 bg-white rounded-xl shadow-xl border border-gray-100">
      <div className="flex justify-between items-center border-b border-gray-200 pb-3 mb-6">
        <span className="text-xl font-semibold text-gray-700">
          Question {currentQuestionIndex + 1} of {totalQuestions}
        </span>
        <span 
          className={`text-2xl font-extrabold ${timeLeft <= 60 ? 'text-red-600 animate-pulse' : 'text-green-600'}`}
        >
          Time Left: {formatTime(timeLeft)}
        </span>
      </div>

      {currentQuestion && (
        <div className="mb-8">
          {/* Question Text */}
          <p className="text-xl font-bold text-gray-800 mb-4">{currentQuestion.text}</p>
          
          {/* Question Image */}
          {currentQuestion.imageUrl && (
            <img 
              src={currentQuestion.imageUrl} 
              alt="Question" 
              className="max-w-full max-h-72 object-contain block mx-auto my-4 border border-gray-300 rounded-lg shadow-md" 
            />
          )}

          {/* Options Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {currentQuestion.options.map((option, index) => {
              const isSelected = userAnswers[currentQuestion._id] === index;
              return (
                <div 
                  key={index} 
                  onClick={() => handleSelectOption(currentQuestion._id, index)}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition duration-200 shadow-sm
                    ${isSelected 
                      ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-500' 
                      : 'border-gray-300 hover:border-blue-400 bg-white hover:bg-gray-50'}`
                  }
                >
                  <label className="flex items-start cursor-pointer w-full">
                    <input 
                      type='radio' 
                      checked={isSelected} 
                      readOnly // Make readOnly since clicks are handled on the div
                      className="mt-1 mr-3 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <div className="flex flex-col w-full">
                      <span className="text-gray-900 font-medium">{option.text}</span>
                      
                      {/* Option Image */}
                      {option.imageUrl && (
                        <img 
                          src={option.imageUrl} 
                          alt={`Option ${index + 1}`} 
                          className="max-w-full max-h-32 object-contain block mt-3 rounded-md" 
                        />
                      )}
                    </div>
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      )}
      
      {/* Status Messages */}
      {submitError && <p className="text-red-600 text-center p-3 bg-red-100 rounded-md my-4">{submitError}</p>}
      {submissionLoading && <p className="text-center text-blue-600 font-medium my-4">Submitting and grading test...</p>}

      {/* Navigation and Submit Buttons */}
      <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
        <button
          onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
          disabled={currentQuestionIndex === 0 || submissionLoading}
          className="py-2 px-4 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          &larr; Previous
        </button>

        {currentQuestionIndex < totalQuestions - 1 ? (
          <button
            onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
            disabled={submissionLoading}
            className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next &rarr;
          </button>
        ) : (
          <button
            onClick={() => handleSubmit(false)}
            disabled={submissionLoading}
            className="py-2 px-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submissionLoading ? 'Submitting...' : 'Finish Test & Submit'}
          </button>
        )}
      </div>

    </div>
  );
};

export default QuizScreen;





// import React, { useState, useEffect, useCallback } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import api from '../utils/api'; // Used for submission
// // IMPORTANT: This import is now correct because the thunk is exported
// import { getTestQuestions } from '../slices/questionSlice'; 
// import { fetchTestConfig } from '../slices/configSlice';

// // Helper function to format seconds into MM:SS
// const formatTime = (totalSeconds) => {
//   const minutes = Math.floor(totalSeconds / 60);
//   const seconds = totalSeconds % 60;
//   return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
// };

// const QuizScreen = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // Selector now targets the correct 'test' state variables
//   const { 
//     testQuestions, 
//     testLoading: questionsLoading, // Renamed for clarity in the component
//     testError: questionsError     // Renamed for clarity in the component
//   } = useSelector((state) => state.question); 
  
//   const { testConfig, loading: configLoading } = useSelector((state) => state.config);
//   const { userInfo } = useSelector((state) => state.auth);

//   // Quiz State
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [userAnswers, setUserAnswers] = useState({}); // { questionId: selectedIndex, ... }
//   const [timeLeft, setTimeLeft] = useState(0); // Time in seconds
//   const [testActive, setTestActive] = useState(false);
//   const [submissionLoading, setSubmissionLoading] = useState(false);
//   const [submitError, setSubmitError] = useState(null);

//   // 1. Initial Data Fetch (Questions and Config)
//   useEffect(() => {
//     if (!userInfo) {
//       navigate('/login'); // Redirect if not logged in
//       return;
//     }
//     dispatch(fetchTestConfig());
//     dispatch(getTestQuestions()); // Dispatch the correct thunk
//   }, [dispatch, navigate, userInfo]);
  
//   // 2. Set Initial Timer when Config is loaded
//   useEffect(() => {
//     if (testConfig && testConfig.durationMinutes > 0 && !testActive) {
//       setTimeLeft(testConfig.durationMinutes * 60);
//     }
//   }, [testConfig, testActive]);

//   // 3. Handle Option Selection
//   const handleSelectOption = (questionId, selectedIndex) => {
//     setUserAnswers(prevAnswers => ({
//       ...prevAnswers,
//       [questionId]: selectedIndex,
//     }));
//   };

//   // 4. Submission Handler (Wrapped in useCallback due to timer dependency)
//   const handleSubmit = useCallback(async (isAutoSubmit = false) => {
//     if (submissionLoading) return;
//     setSubmissionLoading(true);
//     setTestActive(false); // Stop the timer

//     // Calculate time taken (Total allowed seconds - Time left)
//     const totalAllowedSeconds = testConfig?.durationMinutes * 60;
//     const timeSpent = Math.max(0, totalAllowedSeconds - timeLeft); // Ensure timeSpent is not negative

//     // Prepare answers for backend
//     // Use testQuestions to iterate and ensure all questions are included
//     const finalAnswers = testQuestions.map(q => ({
//         questionId: q._id,
//         // Send -1 if the user did not select an answer for this question
//         selectedIndex: userAnswers[q._id] !== undefined ? userAnswers[q._id] : -1, 
//     }));
    
//     try {
//       const config = {
//           headers: {
//               'Content-Type': 'application/json',
//           },
//       };

//       const { data } = await api.post('/questions/submit', {
//         userAnswers: finalAnswers,
//         timeTakenSeconds: timeSpent,
//       }, config);
      
//       // Navigate to the results screen
//       navigate(`/result/${data.resultId}`); 

//     } catch (err) {
//       const errorMsg = err.response?.data?.message || 'Failed to submit test. Check network or server logs.';
//       setSubmitError(errorMsg);
//       console.error(err);
//     } finally {
//       setSubmissionLoading(false);
//     }
//   }, [userAnswers, timeLeft, testConfig, navigate, testQuestions, submissionLoading]); 

  
//   // 5. Timer Logic
//   useEffect(() => {
//     let timerId;
//     if (testActive && timeLeft > 0) {
//       timerId = setInterval(() => {
//         setTimeLeft(prevTime => prevTime - 1);
//       }, 1000);
//     } else if (timeLeft === 0 && testActive) {
//       // Time is up! Auto-submit
//       handleSubmit(true);
//     }
//     return () => clearInterval(timerId); // Cleanup
//   }, [testActive, timeLeft, handleSubmit]); // Include handleSubmit dependency
  
//   // 6. Start Test Button Handler
//   const startTest = () => {
//     if (testQuestions && testQuestions.length > 0 && testConfig) {
//       setTestActive(true);
//       setCurrentQuestionIndex(0); // Start from the first question
//     }
//   };
  
//   const currentQuestion = testQuestions ? testQuestions[currentQuestionIndex] : null;
//   const totalQuestions = testQuestions ? testQuestions.length : 0;
  
//   // --- Rendering Logic ---

//   if (configLoading || questionsLoading) {
//     return <div style={{ padding: '20px', textAlign: 'center' }}>Loading test configuration and questions...</div>;
//   }
  
//   if (questionsError) {
//     return <div style={{ padding: '20px', color: 'red', textAlign: 'center' }}>Error loading questions: {questionsError}</div>;
//   }
  
//   // ... (Rest of the component rendering remains the same, using currentQuestion, totalQuestions, etc.)

//   // --- Pre-Test View ---
//   if (!testActive) {
//     return (
//       <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', textAlign: 'center', border: '1px solid #ddd', borderRadius: '5px' }}>
//         <h2>IQ Test Readiness Check</h2>
//         <p>The test consists of **{totalQuestions} questions** and has a **{testConfig?.durationMinutes} minute** time limit.</p>
//         <p>Your score will be calculated based on difficulty: Easy (1 pt), Medium (3 pts), Hard (6 pts).</p>
//         <button 
//           onClick={startTest}
//           disabled={totalQuestions === 0}
//           style={{ padding: '15px 30px', fontSize: '1.2em', background: 'green', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '20px' }}
//         >
//           {totalQuestions > 0 ? 'Start Test' : 'No Questions Available'}
//         </button>
//       </div>
//     );
//   }

//   // --- Active Test View ---
//   return (
//     <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
//       <h2 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//         <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
//         <span style={{ color: timeLeft <= 60 ? 'red' : 'green', fontSize: '1.5em', fontWeight: 'bold' }}>
//           Time Left: {formatTime(timeLeft)}
//         </span>
//       </h2>
//       <hr />

//       {currentQuestion && (
//         <div style={{ marginBottom: '30px' }}>
//           {/* Question Text */}
//           <p style={{ fontSize: '1.2em', fontWeight: 'bold' }}>{currentQuestion.text}</p>
          
//           {/* Question Image */}
//           {currentQuestion.imageUrl && (
//             <img src={currentQuestion.imageUrl} alt="Question" style={{ maxWidth: '100%', maxHeight: '250px', display: 'block', margin: '15px 0' }} />
//           )}

//           {/* Options */}
//           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
//             {currentQuestion.options.map((option, index) => {
//               const isSelected = userAnswers[currentQuestion._id] === index;
//               return (
//                 <div 
//                   key={index} 
//                   onClick={() => handleSelectOption(currentQuestion._id, index)}
//                   style={{ 
//                     padding: '15px', 
//                     border: `2px solid ${isSelected ? 'blue' : '#ccc'}`,
//                     borderRadius: '5px',
//                     cursor: 'pointer',
//                     backgroundColor: isSelected ? '#e6f7ff' : 'white',
//                     transition: '0.2s',
//                   }}
//                 >
//                   <input 
//                     type='radio' 
//                     checked={isSelected} 
//                     onChange={() => handleSelectOption(currentQuestion._id, index)} 
//                     style={{ marginRight: '10px' }}
//                   />
//                   {/* Option Text */}
//                   <span>{option.text}</span>
                  
//                   {/* Option Image */}
//                   {option.imageUrl && (
//                     <img src={option.imageUrl} alt={`Option ${index + 1}`} style={{ maxWidth: '100%', maxHeight: '100px', display: 'block', marginTop: '10px' }} />
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       )}
      
//       {submitError && <p style={{color: 'red', textAlign: 'center'}}>{submitError}</p>}
//       {submissionLoading && <p style={{textAlign: 'center'}}>Submitting and grading test...</p>}

//       {/* Navigation and Submit Buttons */}
//       <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
//         <button
//           onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
//           disabled={currentQuestionIndex === 0}
//           style={{ padding: '10px 20px', background: '#555', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
//         >
//           &larr; Previous
//         </button>

//         {currentQuestionIndex < totalQuestions - 1 ? (
//           <button
//             onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
//             style={{ padding: '10px 20px', background: 'blue', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
//           >
//             Next &rarr;
//           </button>
//         ) : (
//           <button
//             onClick={() => handleSubmit(false)}
//             disabled={submissionLoading}
//             style={{ padding: '10px 20px', background: 'red', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
//           >
//             {submissionLoading ? 'Submitting...' : 'Finish Test & Submit'}
//           </button>
//         )}
//       </div>

//     </div>
//   );
// };

// export default QuizScreen;