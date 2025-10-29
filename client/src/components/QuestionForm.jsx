import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchQuestions, 
  createQuestion, 
  updateQuestion, 
  deleteQuestion, 
  resetQuestionSuccess // <-- CORRECTED NAME
} from '../slices/questionSlice'; 
import api from '../utils/api'; // For image upload

const QuestionForm = () => {
  const dispatch = useDispatch();
  const { 
    questions, 
    loading, 
    error, 
    success 
  } = useSelector((state) => state.question);

  // State for form inputs (for creating/editing a question)
  const [questionText, setQuestionText] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const [options, setOptions] = useState(Array(4).fill({ text: '', imageUrl: '' }));
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(0);
  const [questionImage, setQuestionImage] = useState(''); // URL or path
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState(null); // ID of question being edited
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  
  // Fetch questions on load and after success
  useEffect(() => {
    dispatch(fetchQuestions());
    if (success) {
        // Reset form and success state after operation
        resetForm();
        dispatch(resetQuestionSuccess()); // <-- CORRECTED USAGE
        setEditingId(null);
    }
  }, [dispatch, success]);
  
  // Handler for uploading image (simplified example)
  const uploadFileHandler = async (e, isOption = false, optionIndex = null) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const { data } = await api.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (isOption) {
        const newOptions = [...options];
        newOptions[optionIndex] = { ...newOptions[optionIndex], imageUrl: data.imageUrl };
        setOptions(newOptions);
      } else {
        setQuestionImage(data.imageUrl);
      }
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
      alert('Image upload failed.');
    }
  };

  const handleOptionChange = (index, field, value) => {
    const newOptions = [...options];
    newOptions[index] = { ...newOptions[index], [field]: value };
    setOptions(newOptions);
  };
  
  const resetForm = () => {
    setQuestionText('');
    setDifficulty('easy');
    setOptions(Array(4).fill({ text: '', imageUrl: '' }));
    setCorrectAnswerIndex(0);
    setQuestionImage('');
    setEditingId(null);
    setShowQuestionForm(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!questionText || options.some(opt => !opt.text && !opt.imageUrl)) {
        alert('Please fill in question text and all option texts/images.');
        return;
    }

    const questionData = {
      text: questionText,
      difficulty,
      options,
      correctAnswerIndex,
      imageUrl: questionImage,
    };

    if (editingId) {
      dispatch(updateQuestion({ id: editingId, questionData }));
    } else {
      dispatch(createQuestion(questionData));
    }
  };
  
  const startEditHandler = (question) => {
    setEditingId(question._id);
    setQuestionText(question.text);
    setDifficulty(question.difficulty);
    setOptions(question.options);
    setCorrectAnswerIndex(question.correctAnswerIndex);
    setQuestionImage(question.imageUrl);
    setShowQuestionForm(true);
  };

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      dispatch(deleteQuestion(id));
    }
  };

  const styles = {
    // ... (Your CSS styles remain the same)
    container: { padding: '20px', maxWidth: '1000px', margin: '0 auto' },
    form: { marginBottom: '30px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' },
    table: { width: '100%', borderCollapse: 'collapse', marginTop: '20px' },
    th: { border: '1px solid #ccc', padding: '10px', backgroundColor: '#f4f4f4', textAlign: 'left' },
    td: { border: '1px solid #ccc', padding: '10px', verticalAlign: 'middle' },
    input: { width: '100%', padding: '8px', boxSizing: 'border-box' },
    buttonGroup: { marginTop: '15px', display: 'flex', gap: '10px' }
  };
  
  // NOTE: You'll need to define all the CSS variables inside the styles object or use a CSS file
  const buttonStyle = (bg) => ({ padding: '8px 15px', border: 'none', borderRadius: '4px', cursor: 'pointer', color: 'white', backgroundColor: bg });


  return (
    <div style={styles.container}>
      {/* -------------------- FORM TOGGLE -------------------- */}
      <button 
        onClick={() => {
            if (showQuestionForm && editingId) {
                resetForm(); // Cancel edit mode
            }
            setShowQuestionForm(!showQuestionForm);
        }}
        style={buttonStyle(showQuestionForm ? '#cc0000' : '#007bff')}
      >
        {showQuestionForm ? (editingId ? 'Cancel Edit' : 'Close Form') : 'Add New Question'}
      </button>

      {/* -------------------- QUESTION FORM -------------------- */}
      {showQuestionForm && (
        <form onSubmit={submitHandler} style={styles.form}>
          <h3>{editingId ? 'Edit Question' : 'Create New Question'}</h3>
          {loading && <p>Loading...</p>}
          {error && <p style={{ color: 'red' }}>Error: {error}</p>}

          {/* Question Text */}
          <div style={{ marginBottom: '15px' }}>
            <label>Question Text:</label>
            <textarea
              rows="3"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          {/* Question Image Upload */}
          <div style={{ marginBottom: '15px' }}>
            <label>Question Image:</label>
            <input type='file' onChange={(e) => uploadFileHandler(e)} />
            {uploading && <p>Uploading...</p>}
            {questionImage && <img src={questionImage} alt="Question" style={{ maxWidth: '150px', marginTop: '10px' }} />}
          </div>

          {/* Difficulty */}
          <div style={{ marginBottom: '15px' }}>
            <label>Difficulty:</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              style={styles.input}
            >
              <option value='easy'>Easy (1 pt)</option>
              <option value='medium'>Medium (3 pts)</option>
              <option value='hard'>Hard (6 pts)</option>
            </select>
          </div>

          {/* Options Input */}
          <div style={{ marginBottom: '15px' }}>
            <h4>Options (Max 4)</h4>
            {options.map((option, index) => (
              <div key={index} style={{ border: `1px solid ${correctAnswerIndex === index ? 'green' : '#eee'}`, padding: '10px', marginBottom: '10px' }}>
                <label style={{ fontWeight: 'bold' }}>Option {index + 1}:</label>
                <input
                  type='text'
                  value={option.text}
                  onChange={(e) => handleOptionChange(index, 'text', e.target.value)}
                  placeholder={`Option ${index + 1} Text`}
                  style={styles.input}
                />
                
                {/* Option Image Upload */}
                <input 
                    type='file' 
                    onChange={(e) => uploadFileHandler(e, true, index)} 
                    style={{ marginTop: '5px' }} 
                />
                {option.imageUrl && <img src={option.imageUrl} alt={`Option ${index+1}`} style={{ maxWidth: '80px', marginTop: '5px' }} />}

                {/* Correct Answer Radio */}
                <label style={{ marginLeft: '20px' }}>
                  <input
                    type='radio'
                    name='correctAnswer'
                    checked={correctAnswerIndex === index}
                    onChange={() => setCorrectAnswerIndex(index)}
                  />
                  Correct Answer
                </label>
              </div>
            ))}
          </div>

          <div style={styles.buttonGroup}>
            <button type='submit' style={buttonStyle('#28a745')} disabled={loading || uploading}>
              {editingId ? 'Update Question' : 'Create Question'}
            </button>
            <button type='button' onClick={resetForm} style={buttonStyle('#6c757d')}>
              Reset
            </button>
          </div>
        </form>
      )}

      {/* -------------------- QUESTION LIST -------------------- */}
      <h3>Existing Questions ({questions.length})</h3>
      {loading ? <p>Loading questions...</p> : error ? <p style={{ color: 'red' }}>{error}</p> : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Text</th>
              <th style={styles.th}>Diff.</th>
              <th style={styles.th}>Correct Ans</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question) => (
              <tr key={question._id}>
                <td style={styles.td}>{question._id.substring(18)}...</td>
                <td style={styles.td}>{question.text.substring(0, 50)}...</td>
                <td style={styles.td}>{question.difficulty}</td>
                <td style={styles.td}>{question.correctAnswerIndex + 1}</td>
                <td style={styles.td}>
                  <button onClick={() => startEditHandler(question)} style={buttonStyle('blue')}>Edit</button>
                  <button onClick={() => deleteHandler(question._id)} style={buttonStyle('red')}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default QuestionForm;