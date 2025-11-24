import React from 'react';

const FAQScreen = () => {
 const styles = {
  container: {
   maxWidth: '800px',
   margin: '0 auto',
   padding: '40px 20px',
   lineHeight: '1.6',
  },
  h2: {
   color: '#007bff',
   borderBottom: '2px solid #dee2e6',
   paddingBottom: '10px',
   marginBottom: '30px',
   fontSize: '2em',
   textAlign: 'center',
  },
  faqItem: {
   backgroundColor: '#f9f9f9',
   padding: '20px',
   borderRadius: '8px',
   marginBottom: '15px',
   borderLeft: '5px solid #007bff',
  },
  question: {
   fontWeight: 'bold',
   marginTop: '0',
   color: '#343a40',
   marginBottom: '8px',
  },
  answer: {
   color: '#555',
   marginBottom: '0',
  }
 };

 const faqItems = [
  { 
   question: 'Is the test scientifically valid?', 
   answer: 'Yes. Our assessments follow established psychometric principles and cognitive testing frameworks, enabling consistent and reliable estimation of intelligence indicators.' 
  },
  { 
   question: 'How long does the test take?', 
   answer: 'Most users complete the assessment within 10–20 minutes, depending on pace and focus.' 
  },
  { 
   question: 'Is the test suitable for all ages?', 
   answer: 'It is designed primarily for teens and adults (ages 14+). Younger children may require age-appropriate testing solutions.' 
  },
  { 
   question: 'Can I retake the test?', 
   answer: 'Absolutely. Retesting can help track improvements or compare different cognitive states over time.' 
  },
  { 
   question: 'Will my data remain private?', 
   answer: 'Yes — we follow strict data protection protocols, ensuring your results remain confidential. We do not share your information with third parties.' 
  },
 ];

 return (
  <div style={styles.container}>
   <h2 style={styles.h2}>Frequently Asked Questions (FAQ)</h2>
   {faqItems.map((item, index) => (
    <div key={index} style={styles.faqItem}>
     <p style={styles.question}>{item.question}</p>
     <p style={styles.answer}>{item.answer}</p>
    </div>
   ))}
  </div>
 );
};

export default FAQScreen;






// import React from 'react';

// const FAQScreen = () => {
//   const styles = {
//     container: {
//       maxWidth: '800px',
//       margin: '0 auto',
//       padding: '20px',
//       lineHeight: '1.6',
//     },
//     h2: {
//       color: '#007bff',
//       borderBottom: '2px solid #eee',
//       paddingBottom: '10px',
//       marginBottom: '20px',
//     },
//     question: {
//       fontWeight: 'bold',
//       marginTop: '15px',
//       color: '#343a40',
//     },
//     answer: {
//       marginBottom: '10px',
//     }
//   };

//   const faqItems = [
//     { 
//       question: 'What does this IQ test measure?', 
//       answer: 'Our test measures several cognitive domains, including logical reasoning, spatial awareness, numerical ability, and verbal comprehension. It provides a comprehensive score of your overall cognitive capabilities.' 
//     },
//     { 
//       question: 'How long does the test take?', 
//       answer: 'The test is designed to be completed in approximately 45 minutes, but you are given a total of 60 minutes to ensure adequate time for review.' 
//     },
//     { 
//       question: 'How is my IQ score calculated?', 
//       answer: 'Your score is calculated based on the number of correct answers adjusted for the difficulty level of the questions, compared against the performance of a standardized group.' 
//     },
//     { 
//       question: 'Do I have to pay for the test?', 
//       answer: 'The test itself is free to take. However, a small fee is required to purchase and download your personalized, verified certificate of achievement.' 
//     },
//   ];

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.h2}>Frequently Asked Questions (FAQ)</h2>
//       {faqItems.map((item, index) => (
//         <div key={index}>
//           <p style={styles.question}>Q: {item.question}</p>
//           <p style={styles.answer}>A: {item.answer}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default FAQScreen;