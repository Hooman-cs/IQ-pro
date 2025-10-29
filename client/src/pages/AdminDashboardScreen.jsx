import React, { useEffect, useState } from 'react'; // <-- IMPORT useState
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions, deleteQuestion } from '../slices/questionSlice';
import QuestionForm from '../components/QuestionForm'; // <-- NEW IMPORT
import TestConfigForm from '../components/TestConfigForm';
import UserList from '../components/UserList';

const AdminDashboardScreen = () => {
  const dispatch = useDispatch();
  const { questions, loading, error, success } = useSelector((state) => state.question);
  const { userInfo } = useSelector((state) => state.auth);

  // State to control the active tab/view: 'questions', 'config', 'users' (coming next)
  const [activeTab, setActiveTab] = useState('questions'); 
  // State to control question view: 'list', 'create', 'edit'
  const [questionMode, setQuestionMode] = useState('list'); 
  const [questionToEdit, setQuestionToEdit] = useState(null); 

  // Fetch questions only when the 'questions' tab is active
  useEffect(() => {
    if (userInfo && userInfo.isAdmin && activeTab === 'questions') {
      // Fetch only if we are in the list or a form view might need data
      if (questionMode !== 'edit' || !questionToEdit) { 
          dispatch(fetchQuestions());
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, userInfo, activeTab]); 

  // Handler to refresh the list after any successful Question CRUD operation
  const handleQuestionSuccess = () => {
    setQuestionMode('list'); 
    setQuestionToEdit(null); 
    dispatch(fetchQuestions()); 
  };

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      dispatch(deleteQuestion(id));
    }
  };

  const editHandler = (question) => {
    setQuestionToEdit(question);
    setQuestionMode('edit');
  };

  // --- RENDERING LOGIC ---

  // Renders the list view (default mode)
  const renderList = () => (
    <>
      <button 
        onClick={() => setQuestionMode('create')} 
        style={{ padding: '10px', background: 'green', color: 'white', border: 'none', marginBottom: '20px', cursor: 'pointer' }}
      >
        Create New Question
      </button>

      {/* Status Messages */}
      {loading && <p>Loading questions...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {success && <p style={{ color: 'green' }}>Operation successful! List refreshing...</p>}
      
      {/* Question List Table */}
      {questions.length === 0 && !loading ? (
        <p>No questions found in the database.</p>
      ) : (
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>ID</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Question Text</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Difficulty</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((q) => (
              <tr key={q._id}>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{q._id.substring(18)}...</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{q.text.substring(0, 50)}...</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{q.difficulty}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>
                  <button 
                    style={{ marginRight: '5px', padding: '5px', background: 'blue', color: 'white', border: 'none', cursor: 'pointer' }}
                    onClick={() => editHandler(q)} // Pass the whole question object
                  >
                    Edit
                  </button>
                  <button 
                    style={{ padding: '5px', background: 'red', color: 'white', border: 'none', cursor: 'pointer' }}
                    onClick={() => deleteHandler(q._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );

  return (
    <div style={{ padding: '20px' }}>
      <h1>Admin Dashboard</h1>

      {/* --- Tab Navigation --- */}
      <div style={{ borderBottom: '1px solid #ccc', marginBottom: '20px', display: 'flex' }}>
        <button 
          onClick={() => setActiveTab('questions')} 
          style={{ padding: '10px 20px', background: activeTab === 'questions' ? '#eee' : 'white', border: 'none', cursor: 'pointer', borderTop: '2px solid', borderColor: activeTab === 'questions' ? 'blue' : 'transparent' }}
        >
          Question Management
        </button>
        <button 
          onClick={() => setActiveTab('config')} 
          style={{ padding: '10px 20px', background: activeTab === 'config' ? '#eee' : 'white', border: 'none', cursor: 'pointer', borderTop: '2px solid', borderColor: activeTab === 'config' ? 'blue' : 'transparent' }}
        >
          Test Configuration
        </button>
        <button 
          onClick={() => setActiveTab('users')} 
          style={{ padding: '10px 20px', background: activeTab === 'users' ? '#eee' : 'white', border: 'none', cursor: 'pointer', borderTop: '2px solid', borderColor: activeTab === 'users' ? 'blue' : 'transparent' }}
        >
          User Management (Coming Soon)
        </button>
      </div>

      {/* --- Tab Content --- */}
      
      {/* Question Management Tab Content */}
      {activeTab === 'questions' && (
        <>
          {questionMode !== 'list' && (
            <button 
              onClick={() => setQuestionMode('list')} 
              style={{ padding: '10px', background: '#333', color: 'white', border: 'none', marginBottom: '20px', cursor: 'pointer', marginRight: '10px' }}
            >
              &larr; Back to Question List
            </button>
          )}

          {questionMode === 'list' && renderList()}

          {questionMode === 'create' && (
            <QuestionForm onSuccess={handleQuestionSuccess} question={null} />
          )}

          {questionMode === 'edit' && questionToEdit && (
            <QuestionForm onSuccess={handleQuestionSuccess} question={questionToEdit} />
          )}
        </>
      )}

      {/* Test Configuration Tab Content */}
      {activeTab === 'config' && (
        <TestConfigForm />
      )}
      
      {/* User Management Tab Content  */}
      {activeTab === 'users' && (
        <UserList />
      )}
      
    </div>
  );
};

export default AdminDashboardScreen;