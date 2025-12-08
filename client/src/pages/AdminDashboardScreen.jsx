// client/src/pages/AdminDashboardScreen.jsx

import React, { useEffect, useState } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions, deleteQuestion } from '../slices/questionSlice';
import QuestionForm from '../components/QuestionForm'; 
import TestConfigForm from '../components/TestConfigForm';
import UserList from '../components/UserList';

const AdminDashboardScreen = () => {
  const dispatch = useDispatch();
  const { questions, loading, error, success } = useSelector((state) => state.question);
  const { userInfo } = useSelector((state) => state.auth);

  // State to control the active tab/view: 'questions', 'config', 'users'
  const [activeTab, setActiveTab] = useState('questions'); 
  // State to control question view: 'list', 'create', 'edit'
  const [questionMode, setQuestionMode] = useState('list'); 
  const [questionToEdit, setQuestionToEdit] = useState(null); 

  // --- NEW PAGINATION STATE ---
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 20; // Define how many items to show per page

  // Fetch questions only when the 'questions' tab is active
  useEffect(() => {
    // Only fetch if admin and on the questions tab, and not currently editing/creating 
    if (userInfo && userInfo.isAdmin && activeTab === 'questions') {
        if (questionMode === 'list') { 
            // Reset page to 1 whenever we switch back to the list view
            setCurrentPage(1); 
            dispatch(fetchQuestions());
        }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, userInfo, activeTab, questionMode]); // Added questionMode to trigger refresh when switching back to list

  // Handler to refresh the list after any successful Question CRUD operation
  const handleQuestionSuccess = () => {
    setQuestionMode('list'); 
    setQuestionToEdit(null); 
    // The useEffect above will handle dispatch(fetchQuestions()) and resetting the page
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
    
    // --- PAGINATION LOGIC ---
    const totalPages = Math.ceil(questions.length / questionsPerPage);
    const indexOfLastQuestion = currentPage * questionsPerPage;
    const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
    // Slice the questions array to get only the questions for the current page
    const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);

    const paginate = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };


  // --- RENDERING LOGIC ---

  // Renders the list view (default mode)
  const renderList = () => (
    <>
      <button 
        onClick={() => setQuestionMode('create')} 
        className="py-2 px-4 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-150 mb-6 cursor-pointer"
      >
        Create New Question
      </button>

      {/* Status Messages */}
      {loading && <p className="text-blue-600 font-medium my-3">Loading questions...</p>}
      {error && <p className="text-red-600 bg-red-100 p-3 rounded-md my-3">Error: {error}</p>}
      {success && <p className="text-green-600 bg-green-100 p-3 rounded-md my-3">Operation successful! List refreshing...</p>}
      
      {/* Question List Table */}
      {questions.length === 0 && !loading ? (
        <p className="p-4 border border-gray-300 rounded-md text-gray-600">No questions found in the database.</p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Question Text</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Difficulty</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* Map over the currently visible questions */}
              {currentQuestions.map((q) => (
                <tr key={q._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{q._id.substring(18)}...</td>
                  <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">{q.text.substring(0, 50)}...</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{q.difficulty}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      className="text-blue-600 hover:text-blue-900 transition duration-150 mr-3 p-1.5 border border-blue-600 rounded-md hover:bg-blue-50"
                      onClick={() => editHandler(q)} // Pass the whole question object
                    >
                      Edit
                    </button>
                    <button 
                      className="text-red-600 hover:text-red-900 transition duration-150 p-1.5 border border-red-600 rounded-md hover:bg-red-50"
                      onClick={() => deleteHandler(q._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    
    {/* --- PAGINATION CONTROLS --- */}
    {questions.length > questionsPerPage && (
        <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
            <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="py-2 px-4 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 disabled:opacity-50 transition"
            >
                &larr; Previous Page
            </button>
            
            <span className="text-sm text-gray-600">
                Page <b>{currentPage}</b> of <b>{totalPages}</b>
            </span>
            
            <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="py-2 px-4 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 disabled:opacity-50 transition"
            >
                Next Page &rarr;
            </button>
        </div>
    )}
    </>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto my-6 bg-white rounded-xl shadow-xl border border-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

      {/* --- Tab Navigation --- */}
      <div className="border-b border-gray-200 flex space-x-4 mb-6">
        {['questions', 'config', 'users'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)} 
            className={`py-2 px-4 font-medium text-sm transition duration-150 focus:outline-none 
                        ${activeTab === tab 
                          ? 'border-b-2 border-blue-600 text-blue-600 bg-gray-50' 
                          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`
            }
          >
            {tab === 'questions' && 'Question Management'}
            {tab === 'config' && 'Test Configuration'}
            {tab === 'users' && 'User Management'}
          </button>
        ))}
      </div>

      {/* --- Tab Content --- */}
      
      {/* Question Management Tab Content */}
      {activeTab === 'questions' && (
        <div className="mt-6">
          {questionMode !== 'list' && (
            <button 
              onClick={() => setQuestionMode('list')} 
              className="py-2 px-4 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition duration-150 mb-6 cursor-pointer mr-3"
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
        </div>
      )}

      {/* Test Configuration Tab Content */}
      {activeTab === 'config' && (
        <div className="mt-6">
          <TestConfigForm />
          
        </div>
      )}
      
      {/* User Management Tab Content */}
      {activeTab === 'users' && (
        <div className="mt-6">
          <UserList />
        </div>
      )}
      
    </div>
  );
};

export default AdminDashboardScreen;





// // client/src/pages/AdminDashboardScreen.jsx

// import React, { useEffect, useState } from 'react'; 
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchQuestions, deleteQuestion } from '../slices/questionSlice';
// import QuestionForm from '../components/QuestionForm'; 
// import TestConfigForm from '../components/TestConfigForm';
// import UserList from '../components/UserList';

// const AdminDashboardScreen = () => {
//   const dispatch = useDispatch();
//   const { questions, loading, error, success } = useSelector((state) => state.question);
//   const { userInfo } = useSelector((state) => state.auth);

//   // State to control the active tab/view: 'questions', 'config', 'users'
//   const [activeTab, setActiveTab] = useState('questions'); 
//   // State to control question view: 'list', 'create', 'edit'
//   const [questionMode, setQuestionMode] = useState('list'); 
//   const [questionToEdit, setQuestionToEdit] = useState(null); 

//   // Fetch questions only when the 'questions' tab is active
//   useEffect(() => {
//     // Only fetch if admin and on the questions tab, and not currently editing/creating 
//     // where the local state of the question might be stale before submit.
//     if (userInfo && userInfo.isAdmin && activeTab === 'questions') {
//         if (questionMode === 'list') { 
//             dispatch(fetchQuestions());
//         }
//     }
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [dispatch, userInfo, activeTab, questionMode]); // Added questionMode to trigger refresh when switching back to list

//   // Handler to refresh the list after any successful Question CRUD operation
//   const handleQuestionSuccess = () => {
//     setQuestionMode('list'); 
//     setQuestionToEdit(null); 
//     // Dispatch fetchQuestions will run due to the dependency array of useEffect
//   };

//   const deleteHandler = (id) => {
//     if (window.confirm('Are you sure you want to delete this question?')) {
//       dispatch(deleteQuestion(id));
//     }
//   };

//   const editHandler = (question) => {
//     setQuestionToEdit(question);
//     setQuestionMode('edit');
//   };

//   // --- RENDERING LOGIC ---

//   // Renders the list view (default mode)
//   const renderList = () => (
//     <>
//       <button 
//         onClick={() => setQuestionMode('create')} 
//         className="py-2 px-4 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-150 mb-6 cursor-pointer"
//       >
//         Create New Question
//       </button>

//       {/* Status Messages */}
//       {loading && <p className="text-blue-600 font-medium my-3">Loading questions...</p>}
//       {error && <p className="text-red-600 bg-red-100 p-3 rounded-md my-3">Error: {error}</p>}
//       {success && <p className="text-green-600 bg-green-100 p-3 rounded-md my-3">Operation successful! List refreshing...</p>}
      
//       {/* Question List Table */}
//       {questions.length === 0 && !loading ? (
//         <p className="p-4 border border-gray-300 rounded-md text-gray-600">No questions found in the database.</p>
//       ) : (
//         <div className="overflow-x-auto shadow-lg rounded-lg">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Question Text</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Difficulty</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {questions.map((q) => (
//                 <tr key={q._id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{q._id.substring(18)}...</td>
//                   <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">{q.text.substring(0, 50)}...</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{q.difficulty}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                     <button 
//                       className="text-blue-600 hover:text-blue-900 transition duration-150 mr-3 p-1.5 border border-blue-600 rounded-md hover:bg-blue-50"
//                       onClick={() => editHandler(q)} // Pass the whole question object
//                     >
//                       Edit
//                     </button>
//                     <button 
//                       className="text-red-600 hover:text-red-900 transition duration-150 p-1.5 border border-red-600 rounded-md hover:bg-red-50"
//                       onClick={() => deleteHandler(q._id)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </>
//   );

//   return (
//     <div className="p-6 max-w-7xl mx-auto my-6 bg-white rounded-xl shadow-xl border border-gray-100">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

//       {/* --- Tab Navigation --- */}
//       <div className="border-b border-gray-200 flex space-x-4 mb-6">
//         {['questions', 'config', 'users'].map(tab => (
//           <button 
//             key={tab}
//             onClick={() => setActiveTab(tab)} 
//             className={`py-2 px-4 font-medium text-sm transition duration-150 focus:outline-none 
//                         ${activeTab === tab 
//                           ? 'border-b-2 border-blue-600 text-blue-600 bg-gray-50' 
//                           : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`
//             }
//           >
//             {tab === 'questions' && 'Question Management'}
//             {tab === 'config' && 'Test Configuration'}
//             {tab === 'users' && 'User Management'}
//           </button>
//         ))}
//       </div>

//       {/* --- Tab Content --- */}
      
//       {/* Question Management Tab Content */}
//       {activeTab === 'questions' && (
//         <div className="mt-6">
//           {questionMode !== 'list' && (
//             <button 
//               onClick={() => setQuestionMode('list')} 
//               className="py-2 px-4 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition duration-150 mb-6 cursor-pointer mr-3"
//             >
//               &larr; Back to Question List
//             </button>
//           )}

//           {questionMode === 'list' && renderList()}

//           {questionMode === 'create' && (
//             <QuestionForm onSuccess={handleQuestionSuccess} question={null} />
//           )}

//           {questionMode === 'edit' && questionToEdit && (
//             <QuestionForm onSuccess={handleQuestionSuccess} question={questionToEdit} />
//           )}
//         </div>
//       )}

//       {/* Test Configuration Tab Content */}
//       {activeTab === 'config' && (
//         <div className="mt-6">
//           <TestConfigForm />
//         </div>
//       )}
      
//       {/* User Management Tab Content */}
//       {activeTab === 'users' && (
//         <div className="mt-6">
//           <UserList />
//         </div>
//       )}
      
//     </div>
//   );
// };

// export default AdminDashboardScreen;