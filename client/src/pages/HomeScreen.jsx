import React from 'react';
import { Link } from 'react-router-dom';

const HomeScreen = () => {
 const styles = {
  container: {
   padding: '60px 20px',
   maxWidth: '1000px',
   margin: '0 auto',
   textAlign: 'center',
   minHeight: '60vh',
  },
  h1: {
   fontSize: '3.5em',
   color: '#007bff',
   marginBottom: '15px',
   fontWeight: 700,
  },
  subHeadline: {
   fontSize: '1.3em',
   color: '#555',
   marginBottom: '40px',
   maxWidth: '700px',
   margin: '0 auto 40px auto',
  },
  ctaContainer: {
   display: 'flex',
   justifyContent: 'center',
   gap: '20px',
   marginBottom: '60px',
  },
  primaryCta: {
   display: 'inline-block',
   padding: '15px 30px',
   fontSize: '1.2em',
   backgroundColor: '#28a745',
   color: 'white',
   textDecoration: 'none',
   borderRadius: '8px',
   transition: 'background-color 0.3s',
   fontWeight: 600,
  },
  secondaryCta: {
   display: 'inline-block',
   padding: '15px 30px',
   fontSize: '1.2em',
   backgroundColor: '#f0f0f0',
   color: '#333',
   textDecoration: 'none',
   borderRadius: '8px',
   border: '1px solid #ccc',
   transition: 'background-color 0.3s',
  },
  highlightsGrid: {
   display: 'grid',
   gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
   gap: '30px',
   textAlign: 'left',
   marginTop: '40px',
   padding: '40px 0',
   borderTop: '1px solid #eee',
  },
  highlightItem: {
   backgroundColor: '#fff',
   padding: '20px',
   borderRadius: '8px',
   boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
   borderLeft: '4px solid #007bff',
  },
  highlightTitle: {
   fontWeight: 600,
   color: '#007bff',
   marginBottom: '10px',
  },
 };

 const highlights = [
  { title: 'Comprehensive Evaluation', description: 'Covers logical reasoning, pattern recognition, problem-solving agility, memory processing, and verbal understanding.' },
  { title: 'Adaptive Difficulty', description: 'Intelligent scoring models measure your performance relative to question complexity for a precise result.' },
  { title: 'Instant Reports', description: 'Clear, insightful results with breakdowns that help you understand your strengths and growth areas.' },
  { title: 'User-Friendly Design', description: 'Clean layouts, intuitive navigation, and guidance at every step of the assessment.' },
 ];

 return (
  <div style={styles.container}>
   <h1 style={styles.h1}>Measure Your Cognitive Strength With Precision</h1>
   <p style={styles.subHeadline}>
    Our advanced IQ testing platform delivers accurate, research-based insights into your reasoning, memory, analytical thinking, and problem-solving abilities.
   </p>
   
   <div style={styles.ctaContainer}>
    <Link to='/quiz' style={styles.primaryCta}>
     Start Your IQ Test →
    </Link>
    {/* NOTE: Linking to /about, which now contains "How it Works" content */}
    <Link to='/about' style={styles.secondaryCta}>
     Explore How It Works →
    </Link>
   </div>

   <p style={{ fontSize: '1.1em', maxWidth: '800px', margin: '0 auto 20px auto', color: '#666' }}>
    Understanding your cognitive abilities shouldn’t require complicated forms. Our platform provides a **modern, reliable, and user-centered approach** to IQ evaluation.
   </p>

   <div style={styles.highlightsGrid}>
    {highlights.map((item, index) => (
     <div key={index} style={styles.highlightItem}>
      <h3 style={styles.highlightTitle}>{item.title}</h3>
      <p style={{ fontSize: '0.9em', color: '#666' }}>{item.description}</p>
     </div>
    ))}
   </div>
  </div>
 );
};

export default HomeScreen;


