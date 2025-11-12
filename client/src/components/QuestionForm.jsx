import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    createQuestion, 
    updateQuestion, 
    fetchCategories, // Kept for populating category dropdown
    resetQuestionSuccess, 
} from '../slices/questionSlice'; 
import api from '../utils/api'; 

// Component now accepts props: 'question' (for editing) and 'onSuccess' (callback)
const QuestionForm = ({ question, onSuccess }) => {
    const dispatch = useDispatch();
    const { 
        loading, 
        error, 
        success,
        availableCategories,
        categoryLoading,
        categoryError
    } = useSelector((state) => state.question);

    // --- State Initialization ---
    // Use the 'question' prop for initial state when editing, otherwise use default/empty values
    const [questionText, setQuestionText] = useState(question?.text || '');
    const [category, setCategory] = useState(question?.category || ''); 
    const [difficulty, setDifficulty] = useState(question?.difficulty || 'easy');
    const [options, setOptions] = useState(question?.options || Array(4).fill({ text: '', imageUrl: '' }));
    const [correctAnswerIndex, setCorrectAnswerIndex] = useState(question?.correctAnswerIndex || 0);
    const [questionImage, setQuestionImage] = useState(question?.imageUrl || ''); 
    const [uploading, setUploading] = useState(false);
    
    // Logic for new category input is kept since it's unique to this form
    const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
    
    // --- Effects ---

    // Fetch categories on load
    useEffect(() => {
        dispatch(fetchCategories()); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);
    
    // Handle successful submission
    useEffect(() => {
        if (success) {
            // Call the parent's success handler (to close form, refresh list, etc.)
            onSuccess();
            dispatch(resetQuestionSuccess());
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [success, dispatch]); 

    // --- Handlers ---
    
    const uploadFileHandler = async (e, isOption = false, optionIndex = null) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);

        try {
            const { data } = await api.post('/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
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
    
    const handleCategoryChange = (e) => {
        const value = e.target.value;
        if (value === '__NEW_CATEGORY__') {
            setCategory(''); // Clear category so user must input
            setShowNewCategoryInput(true);
        } else {
            setCategory(value);
            setShowNewCategoryInput(false);
        }
    };

    const resetForm = () => {
        setQuestionText(question?.text || '');
        setDifficulty(question?.difficulty || 'easy');
        setCategory(question?.category || ''); 
        setShowNewCategoryInput(false); 
        setOptions(question?.options || Array(4).fill({ text: '', imageUrl: '' }));
        setCorrectAnswerIndex(question?.correctAnswerIndex || 0);
        setQuestionImage(question?.imageUrl || '');
    };

    const submitHandler = (e) => {
        e.preventDefault();
        
        // **CRITICAL FIX: Explicitly check for category being empty before submission**
        if (showNewCategoryInput && !category.trim()) {
            alert('Please enter a name for the new category.');
            return;
        }

        if (!questionText || !category.trim() || options.some(opt => !opt.text && !opt.imageUrl)) {
            alert('Please fill in question text, category, and all option texts/images.');
            return;
        }

        const questionData = {
            text: questionText,
            category: category.trim(), // Ensure no leading/trailing whitespace
            difficulty,
            options,
            correctAnswerIndex,
            imageUrl: questionImage,
        };

        if (question?._id) {
            // Update mode: use the ID from the prop
            dispatch(updateQuestion({ id: question._id, questionData }));
        } else {
            // Create mode
            dispatch(createQuestion(questionData));
        }
    };
    
    // --- Styles (simplified) ---
    const styles = {
        form: { marginBottom: '30px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' },
        input: { width: '100%', padding: '8px', boxSizing: 'border-box' },
        buttonGroup: { marginTop: '15px', display: 'flex', gap: '10px' }
    };
    const buttonStyle = (bg) => ({ padding: '8px 15px', border: 'none', borderRadius: '4px', cursor: 'pointer', color: 'white', backgroundColor: bg });

    return (
        <form onSubmit={submitHandler} style={styles.form}>
            <h3>{question ? 'Edit Question' : 'Create New Question'}</h3>
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
            
            {/* QUESTION IMAGE UPLOAD */}
            <div style={{ marginBottom: '15px' }}>
                <label>Question Image:</label>
                <input type='file' onChange={(e) => uploadFileHandler(e)} />
                {uploading && <p>Uploading...</p>}
                {questionImage && <img src={questionImage} alt="Question" style={{ maxWidth: '150px', marginTop: '10px' }} />}
            </div>

            {/* CATEGORY INPUT LOGIC (Dropdown or Textbox) */}
            <div style={{ marginBottom: '15px' }}>
                <label>Category:</label>
                {categoryLoading ? (
                    <p>Loading categories...</p>
                ) : categoryError ? (
                    <p style={{ color: 'red' }}>Error loading categories: {categoryError}</p>
                ) : (
                    <select
                        value={showNewCategoryInput ? '__NEW_CATEGORY__' : category}
                        onChange={handleCategoryChange}
                        style={styles.input}
                        required={!showNewCategoryInput}
                    >
                        {/* Changed initial empty option to a disabled placeholder */}
                        <option value='' disabled>Select a Category</option> 
                        {availableCategories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                        <option value='__NEW_CATEGORY__'>-- Add New Category --</option>
                    </select>
                )}
            </div>

            {showNewCategoryInput && (
                <div style={{ marginBottom: '15px', marginTop: '10px' }}>
                    <label>New Category Name:</label>
                    <input
                        type='text'
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        style={styles.input}
                        placeholder="Enter New Category Name"
                        required
                    />
                </div>
            )}

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
                <button type='submit' style={buttonStyle('#28a745')} disabled={loading || uploading || categoryLoading}>
                    {question ? 'Update Question' : 'Create Question'}
                </button>
                <button type='button' onClick={resetForm} style={buttonStyle('#6c757d')}>
                    Reset
                </button>
            </div>
        </form>
    );
};

export default QuestionForm;