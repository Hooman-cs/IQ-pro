import React from 'react';

const FAQScreen = () => {
  const styles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      lineHeight: '1.6',
    },
    h2: {
      color: '#007bff',
      borderBottom: '2px solid #eee',
      paddingBottom: '10px',
      marginBottom: '20px',
    },
    question: {
      fontWeight: 'bold',
      marginTop: '15px',
      color: '#343a40',
    },
    answer: {
      marginBottom: '10px',
    }
  };

  const faqItems = [
    { 
      question: 'What does this IQ test measure?', 
      answer: 'Our test measures several cognitive domains, including logical reasoning, spatial awareness, numerical ability, and verbal comprehension. It provides a comprehensive score of your overall cognitive capabilities.' 
    },
    { 
      question: 'How long does the test take?', 
      answer: 'The test is designed to be completed in approximately 45 minutes, but you are given a total of 60 minutes to ensure adequate time for review.' 
    },
    { 
      question: 'How is my IQ score calculated?', 
      answer: 'Your score is calculated based on the number of correct answers adjusted for the difficulty level of the questions, compared against the performance of a standardized group.' 
    },
    { 
      question: 'Do I have to pay for the test?', 
      answer: 'The test itself is free to take. However, a small fee is required to purchase and download your personalized, verified certificate of achievement.' 
    },
  ];

  return (
    <div style={styles.container}>
      <h2 style={styles.h2}>Frequently Asked Questions (FAQ)</h2>
      {faqItems.map((item, index) => (
        <div key={index}>
          <p style={styles.question}>Q: {item.question}</p>
          <p style={styles.answer}>A: {item.answer}</p>
        </div>
      ))}
    </div>
  );
};

export default FAQScreen;