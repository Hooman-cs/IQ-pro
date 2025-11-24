import React from 'react';

const AboutUsScreen = () => {
 const styles = {
  container: {
   maxWidth: '900px',
   margin: '0 auto',
   padding: '40px 20px',
   lineHeight: '1.7',
  },
  h2: {
   color: '#007bff',
   borderBottom: '2px solid #eee',
   paddingBottom: '10px',
   marginBottom: '30px',
   fontSize: '2em',
  },
  section: {
   marginBottom: '50px',
   padding: '20px',
   backgroundColor: '#fff',
   borderRadius: '8px',
   boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  h3: {
   color: '#343a40',
   marginBottom: '15px',
   fontSize: '1.5em',
  },
  list: {
   listStyleType: 'disc',
   paddingLeft: '20px',
  },
  step: {
   marginBottom: '20px',
   borderLeft: '3px solid #28a745',
   paddingLeft: '15px',
  },
  stepTitle: {
   fontWeight: 'bold',
   color: '#28a745',
   marginBottom: '5px',
  },
 };

 const steps = [
  { title: '1. Start the Assessment', description: 'Begin with a structured sequence of questions designed to measure various cognitive functions. Each question type is carefully selected for scientific validity.' },
  { title: '2. Timed, Guided Experience', description: 'You’ll move through timed sections with clear instructions, ensuring fairness and consistency across all participants. The interface minimizes distractions.' },
  { title: '3. Intelligent Scoring', description: 'Our adaptive scoring engine uses difficulty-weighted scoring and cognitive domain mapping to produce a balanced and accurate IQ estimate.' },
  { title: '4. Detailed Report Delivery', description: 'Within seconds, you’ll receive a full report outlining your IQ score, percentile comparison, cognitive domain performance, and suggestions for improvement.' },
 ];

 return (
  <div style={styles.container}>
   <h2 style={styles.h2}>About Our Platform & Scientific Rigor</h2>
   
   {/* Our Purpose */}
   <div style={styles.section}>
    <h3 style={styles.h3}>Our Purpose: Clarity in Cognitive Measurement</h3>
    <p>
     We believe cognitive assessment should be **accessible, understandable, and grounded in real science**. Traditional IQ tests are often outdated or locked behind inaccessible formats. Our platform modernizes that experience by offering scientifically structured assessments supported by a smooth digital interface.
    </p>
    <p>
     Our mission is to help you understand **how you think**, not just what your score is, empowering informed decisions for personal growth or professional development.
    </p>
   </div>

   {/* Scientific Foundations */}
   <div style={styles.section}>
    <h3 style={styles.h3}>Scientific Foundations</h3>
    <p>Our test structure is rigorously built around principles from:</p>
    <ul style={styles.list}>
     <li>**Cognitive Psychology:** Understanding how individuals process information and solve problems.</li>
     <li>**Psychometrics:** Ensuring fair, statistically consistent, and reliable scoring.</li>
     <li>**Standardized Assessment Design:** Balancing question difficulty and structure for accurate measurement.</li>
    </ul>
   </div>

   {/* How It Works / Step-by-Step Process */}
   <div style={styles.section}>
    <h3 style={styles.h3}>How It Works: Step-by-Step Assessment</h3>
    {steps.map((step, index) => (
     <div key={index} style={styles.step}>
      <p style={styles.stepTitle}>{step.title}</p>
      <p>{step.description}</p>
     </div>
    ))}
   </div>
  </div>
 );
};

export default AboutUsScreen;







// import React from 'react';

// const AboutUsScreen = () => {
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
//     section: {
//       marginBottom: '30px',
//     },
//     h3: {
//       color: '#343a40',
//       marginBottom: '10px',
//     },
//   };

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.h2}>About the IQ Testing Platform</h2>
      
//       <div style={styles.section}>
//         <h3 style={styles.h3}>Our Mission</h3>
//         <p>
//           Our mission is to provide an accessible, scientifically-backed tool for individuals worldwide to measure and understand their cognitive abilities. We believe self-awareness of intellectual strengths is the first step toward personal and professional growth.
//         </p>
//       </div>

//       <div style={styles.section}>
//         <h3 style={styles.h3}>Test Development</h3>
//         <p>
//           The test content was developed by a team of cognitive psychologists and psychometricians. It uses adaptive algorithms to ensure accuracy and reliability, providing you with a result that is both meaningful and comparable to international standards.
//         </p>
//       </div>

//       <div style={styles.section}>
//         <h3 style={styles.h3}>Commitment to Privacy</h3>
//         <p>
//           We are committed to protecting your data. All test results and personal information are stored securely and kept confidential. We use anonymized data strictly for enhancing our test accuracy.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default AboutUsScreen;