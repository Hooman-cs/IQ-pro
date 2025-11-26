import React from 'react';

const AboutUsScreen = () => {
 const styles = {
  container: {
   maxWidth: '1000px',
   margin: '0 auto',
   padding: '40px 20px',
   lineHeight: '1.7',
   color: '#333',
  },
  h2: {
   color: '#007bff',
   borderBottom: '2px solid #dee2e6',
   paddingBottom: '15px',
   marginBottom: '40px',
   fontSize: '2.5em',
   textAlign: 'center',
  },
  section: {
   marginBottom: '50px',
   padding: '30px',
   backgroundColor: '#fff',
   borderRadius: '10px',
   boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
  },
  h3: {
   color: '#343a40',
   marginBottom: '20px',
   fontSize: '1.8em',
   borderBottom: '1px solid #f0f0f0',
   paddingBottom: '10px',
  },
  list: {
   listStyleType: 'disc',
   paddingLeft: '25px',
   marginBottom: '20px',
  },
  listItem: {
   marginBottom: '10px',
   fontSize: '1.1em',
  },
  stepGrid: {
   display: 'grid',
   gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
   gap: '30px',
   marginTop: '20px',
  },
  stepItem: {
   backgroundColor: '#f8f8f8',
   padding: '25px',
   borderRadius: '8px',
   borderLeft: '5px solid #28a745',
   boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
  },
  stepTitle: {
   fontWeight: 700,
   color: '#28a745',
   marginBottom: '10px',
   fontSize: '1.2em',
  },
  cognitiveDomain: {
   backgroundColor: '#e9f7ef', // Light green background
   padding: '15px',
   borderRadius: '8px',
   marginBottom: '15px',
   borderLeft: '4px solid #007bff',
  },
  domainTitle: {
   fontWeight: 600,
   color: '#007bff',
   marginBottom: '5px',
   fontSize: '1.1em',
  }
 };

 const steps = [
  { title: '1. Start the Assessment', description: 'Begin with a structured sequence of questions designed to measure various cognitive functions. Each question type is carefully selected for scientific validity.' },
  { title: '2. Timed, Guided Experience', description: 'You’ll move through timed sections with clear instructions, ensuring fairness and consistency across all participants. The interface minimizes distractions.' },
  { title: '3. Intelligent Scoring', description: 'Our adaptive scoring engine uses difficulty-weighted scoring and cognitive domain mapping to produce a balanced and accurate IQ estimate.' },
  { title: '4. Detailed Report Delivery', description: 'Within seconds, you’ll receive a full report outlining your IQ score, percentile comparison, cognitive domain performance, and suggestions for improvement.' },
 ];

 const cognitiveAreas = [
  { title: 'Logical Reasoning', description: 'How well you identify relationships, draw conclusions, and solve abstract problems.' },
  { title: 'Numerical Processing', description: 'Your ability to analyze numerical patterns and perform mental calculations with accuracy.' },
  { title: 'Verbal Comprehension', description: 'Understanding language-based information, analogies, and conceptual relationships.' },
  { title: 'Spatial Reasoning', description: 'How effectively you interpret shapes, patterns, and visual structures.' },
  { title: 'Working Memory', description: 'Your ability to retain and manipulate information under time constraints.' },
 ];

 return (
  <div style={styles.container}>
   <h2 style={styles.h2}>About Our Platform: Science, Structure & Purpose</h2>
   
   {/* Our Purpose */}
   <div style={styles.section}>
    <h3 style={styles.h3}>Our Purpose: Clarity in Cognitive Measurement</h3>
    <p>
     We believe cognitive assessment should be **accessible, understandable, and grounded in real science**. Traditional IQ tests are often outdated, difficult to interpret, or locked behind inaccessible formats. Our platform modernizes that experience by offering scientifically structured assessments supported by a smooth digital interface.
    </p>
    <p>
     Our mission is to bring clarity to cognitive measurement — helping you understand **how you think**, not just what your score is. Whether you’re evaluating your abilities out of curiosity, preparing for academic challenges, or seeking data for self-development, we aim to provide accurate insights that empower informed decision-making.
    </p>
   </div>

   {/* Scientific Foundations */}
   <div style={styles.section}>
    <h3 style={styles.h3}>Scientific Foundations</h3>
    <p>Our test structure is rigorously built around principles from:</p>
    <ul style={styles.list}>
     <li style={styles.listItem}>**Cognitive Psychology:** Understanding how individuals process information, solve problems, and interpret patterns.</li>
     <li style={styles.listItem}>**Psychometrics:** Ensuring that every question contributes to fair, statistically consistent scoring.</li>
     <li style={styles.listItem}>**Standardized Assessment Design:** Balancing the difficulty and structure of questions for accurate measurement of intelligence indicators.</li>
    </ul>
    <p>
     Each test undergoes regular review and refinement to ensure consistency, reliability, and alignment with contemporary testing standards.
    </p>
   </div>

   {/* What We Measure */}
   <div style={styles.section}>
    <h3 style={styles.h3}>What We Measure: Core Cognitive Areas</h3>
    <p>Our IQ test aims to evaluate multiple core cognitive areas:</p>
    <div className="cognitive-areas-grid"> {/* Placeholder for grid if using external CSS or responsive grid */}
     {cognitiveAreas.map((area, index) => (
      <div key={index} style={styles.cognitiveDomain}>
       <p style={styles.domainTitle}>{area.title}</p>
       <p style={{ fontSize: '0.95em', color: '#666' }}>{area.description}</p>
      </div>
     ))}
    </div>
    <p style={{ marginTop: '20px' }}>
     These domains together form a holistic view of your cognitive strengths, providing a comprehensive profile rather than just a single number.
    </p>
   </div>

   {/* How It Works / Step-by-Step Process */}
   <div style={styles.section}>
    <h3 style={styles.h3}>How It Works: Step-by-Step Assessment</h3>
    <div style={styles.stepGrid}>
     {steps.map((step, index) => (
      <div key={index} style={styles.stepItem}>
       <p style={styles.stepTitle}>{step.title}</p>
       <p style={{ fontSize: '0.95em', color: '#555' }}>{step.description}</p>
      </div>
     ))}
    </div>
   </div>
  </div>
 );
};

export default AboutUsScreen;

// import React from 'react';

// const AboutUsScreen = () => {
//  const styles = {
//   container: {
//    maxWidth: '900px',
//    margin: '0 auto',
//    padding: '40px 20px',
//    lineHeight: '1.7',
//   },
//   h2: {
//    color: '#007bff',
//    borderBottom: '2px solid #eee',
//    paddingBottom: '10px',
//    marginBottom: '30px',
//    fontSize: '2em',
//   },
//   section: {
//    marginBottom: '50px',
//    padding: '20px',
//    backgroundColor: '#fff',
//    borderRadius: '8px',
//    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
//   },
//   h3: {
//    color: '#343a40',
//    marginBottom: '15px',
//    fontSize: '1.5em',
//   },
//   list: {
//    listStyleType: 'disc',
//    paddingLeft: '20px',
//   },
//   step: {
//    marginBottom: '20px',
//    borderLeft: '3px solid #28a745',
//    paddingLeft: '15px',
//   },
//   stepTitle: {
//    fontWeight: 'bold',
//    color: '#28a745',
//    marginBottom: '5px',
//   },
//  };

//  const steps = [
//   { title: '1. Start the Assessment', description: 'Begin with a structured sequence of questions designed to measure various cognitive functions. Each question type is carefully selected for scientific validity.' },
//   { title: '2. Timed, Guided Experience', description: 'You’ll move through timed sections with clear instructions, ensuring fairness and consistency across all participants. The interface minimizes distractions.' },
//   { title: '3. Intelligent Scoring', description: 'Our adaptive scoring engine uses difficulty-weighted scoring and cognitive domain mapping to produce a balanced and accurate IQ estimate.' },
//   { title: '4. Detailed Report Delivery', description: 'Within seconds, you’ll receive a full report outlining your IQ score, percentile comparison, cognitive domain performance, and suggestions for improvement.' },
//  ];

//  return (
//   <div style={styles.container}>
//    <h2 style={styles.h2}>About Our Platform & Scientific Rigor</h2>
   
//    {/* Our Purpose */}
//    <div style={styles.section}>
//     <h3 style={styles.h3}>Our Purpose: Clarity in Cognitive Measurement</h3>
//     <p>
//      We believe cognitive assessment should be **accessible, understandable, and grounded in real science**. Traditional IQ tests are often outdated or locked behind inaccessible formats. Our platform modernizes that experience by offering scientifically structured assessments supported by a smooth digital interface.
//     </p>
//     <p>
//      Our mission is to help you understand **how you think**, not just what your score is, empowering informed decisions for personal growth or professional development.
//     </p>
//    </div>

//    {/* Scientific Foundations */}
//    <div style={styles.section}>
//     <h3 style={styles.h3}>Scientific Foundations</h3>
//     <p>Our test structure is rigorously built around principles from:</p>
//     <ul style={styles.list}>
//      <li>**Cognitive Psychology:** Understanding how individuals process information and solve problems.</li>
//      <li>**Psychometrics:** Ensuring fair, statistically consistent, and reliable scoring.</li>
//      <li>**Standardized Assessment Design:** Balancing question difficulty and structure for accurate measurement.</li>
//     </ul>
//    </div>

//    {/* How It Works / Step-by-Step Process */}
//    <div style={styles.section}>
//     <h3 style={styles.h3}>How It Works: Step-by-Step Assessment</h3>
//     {steps.map((step, index) => (
//      <div key={index} style={styles.step}>
//       <p style={styles.stepTitle}>{step.title}</p>
//       <p>{step.description}</p>
//      </div>
//     ))}
//    </div>
//   </div>
//  );
// };

// export default AboutUsScreen;