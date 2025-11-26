// client/src/pages/HomeScreen.jsx

import React from 'react';
import { Link } from 'react-router-dom';
// Assuming these paths based on previous steps and your file uploads
import backgroundHeroImage from '../assets/images/background_1.png'; 
import backgroundStatsImage from '../assets/images/background_2.png'; // <-- NEW BACKGROUND IMAGE

const HomeScreen = () => {
 const styles = {
  // --- HERO SECTION STYLES (background_1.jpg) ---
  container: {
   minHeight: '85vh',
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'center',
   alignItems: 'center',
   textAlign: 'center',
   backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${backgroundHeroImage})`,
   backgroundSize: 'cover',
   backgroundPosition: 'center',
   color: 'white',
   overflow: 'hidden',
  },
  contentWrapper: {
   maxWidth: '1000px',
   padding: '60px 20px',
   margin: '0 auto',
   zIndex: 1,
  },
  h1: {
   fontSize: '3.8em',
   color: '#007bff',
   marginBottom: '20px',
   fontWeight: 800,
   textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
  },
  subHeadline: {
   fontSize: '1.4em',
   color: '#e0e0e0',
   marginBottom: '40px',
   maxWidth: '700px',
   margin: '0 auto 40px auto',
   textShadow: '1px 1px 3px rgba(0,0,0,0.5)',
  },
  ctaContainer: {
   display: 'flex',
   justifyContent: 'center',
   gap: '20px',
   marginBottom: '60px',
   flexWrap: 'wrap',
  },
  primaryCta: {
   display: 'inline-block',
   padding: '15px 35px',
   fontSize: '1.3em',
   backgroundColor: '#28a745',
   color: 'white',
   textDecoration: 'none',
   borderRadius: '8px',
   fontWeight: 600,
  },
  secondaryCta: {
   display: 'inline-block',
   padding: '15px 35px',
   fontSize: '1.3em',
   backgroundColor: 'transparent',
   color: '#007bff',
   textDecoration: 'none',
   borderRadius: '8px',
   border: '2px solid #007bff',
  },
  // --- INTRODUCTION SECTION STYLES ---
  introSection: {
   backgroundColor: '#ffffff',
   padding: '60px 20px',
   width: '100%',
   textAlign: 'center',
   color: '#333',
   maxWidth: '1000px',
   margin: '0 auto',
  },
  // --- STATISTICS SECTION STYLES (background_2.jpg) ---
  statsSection: {
   backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url(${backgroundStatsImage})`,
   backgroundSize: 'cover',
   backgroundPosition: 'center',
   padding: '80px 20px',
   width: '100%',
   textAlign: 'center',
   color: 'white', // White text for dark background
  },
  statsGrid: {
   display: 'grid',
   gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
   gap: '40px',
   maxWidth: '1100px',
   margin: '40px auto 0 auto',
  },
  statItem: {
   backgroundColor: 'rgba(0, 0, 0, 0.4)', // Slightly transparent black box
   border: '1px solid #007bff',
   padding: '30px',
   borderRadius: '10px',
   boxShadow: '0 6px 18px rgba(0, 0, 0, 0.5)',
  },
  statNumber: {
   fontSize: '3em',
   fontWeight: 700,
   color: '#28a745', // Highlight color
   marginBottom: '10px',
  },
  statText: {
   fontSize: '1.2em',
   color: '#e0e0e0',
   textShadow: '1px 1px 2px #000',
  },
  // --- DETAILED STATS/GRAPH SECTION ---
  detailedStatsSection: {
   padding: '60px 20px',
   maxWidth: '1000px',
   margin: '0 auto',
   textAlign: 'center',
  },
  graphContainer: {
   display: 'flex',
   justifyContent: 'space-around',
   alignItems: 'flex-start',
   gap: '30px',
   marginTop: '40px',
   flexWrap: 'wrap',
  },
  statBlock: {
   flex: 1,
   minWidth: '300px',
   padding: '20px',
   backgroundColor: '#f9f9f9',
   borderRadius: '8px',
   textAlign: 'left',
   borderTop: '4px solid #ffc107',
  },
  statDetail: {
   marginBottom: '10px',
   padding: '8px 0',
   borderBottom: '1px dotted #ccc',
  },
  // --- KEY HIGHLIGHTS SECTION STYLES ---
  highlightsSection: {
   backgroundColor: '#f8f8f8',
   padding: '60px 20px',
   width: '100%',
   textAlign: 'center',
   color: '#333',
  },
  highlightsGrid: {
   display: 'grid',
   gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
   gap: '30px',
   maxWidth: '1000px',
   margin: '40px auto 0 auto',
  },
  highlightItem: {
   backgroundColor: '#fff',
   padding: '25px',
   borderRadius: '10px',
   boxShadow: '0 4px 15px rgba(0, 0, 0, 0.07)',
   borderLeft: '5px solid #28a745',
   textAlign: 'left',
  },
  highlightTitle: {
   fontWeight: 700,
   color: '#28a745',
   marginBottom: '10px',
   fontSize: '1.3em',
  },
  highlightDescription: {
   fontSize: '1em',
   color: '#666',
  },
 };

 const highlights = [
  { title: 'Comprehensive Evaluation', description: 'Covers logical reasoning, pattern recognition, problem-solving agility, memory processing, and verbal understanding.' },
  { title: 'Adaptive Difficulty', description: 'Intelligent scoring models measure your performance relative to question complexity for a precise result.' },
  { title: 'Instant Reports', description: 'Clear, insightful results with breakdowns that help you understand your strengths and growth areas.' },
  { title: 'User-Friendly Design', description: 'Clean layouts, intuitive navigation, and guidance at every step of the assessment.' },
 ];

 // Simulated High-Level Statistics (used in statsSection)
 const highLevelStatistics = [
  { number: '100K+', text: 'Tests Completed Annually' },
  { number: '98%', text: 'User Satisfaction Rate' },
  { number: '20+', text: 'Years of Cognitive Research' },
 ];

 // Detailed Statistics (used in detailedStatsSection)
 const detailedStats = {
  global: [
   { label: 'Global Average IQ', value: '100' },
   { label: 'Top Scoring Countries (Avg)', value: '102 - 108' },
   { label: 'Common Range (68% of Population)', value: '85 - 115' },
  ],
  demographics: [
   { label: 'Average Score (Male)', value: '100.5' },
   { label: 'Average Score (Female)', value: '99.5' },
   { label: 'Peak Cognitive Age', value: '25 - 35 years' },
  ]
 };

 return (
  <>
   {/* 1. Hero Section with Background Image 1 */}
   <div style={styles.container}>
    <div style={styles.contentWrapper}>
     <h1 style={styles.h1}>Measure Your Cognitive Strength With Precision</h1>
     <p style={styles.subHeadline}>
      Our advanced IQ testing platform delivers accurate, research-based insights into your reasoning, memory, analytical thinking, and problem-solving abilities.
     </p>
     
     <div style={styles.ctaContainer}>
      <Link to='/quiz' style={styles.primaryCta}>
       Start Your IQ Test →
      </Link>
      <Link to='/about' style={styles.secondaryCta}>
       Explore How It Works →
      </Link>
    </div>
    </div>
   </div>

   {/* 2. Introduction Section */}
   <div style={styles.introSection}>
    <h2 style={{ fontSize: '2em', color: '#333', marginBottom: '20px' }}>Unlock Your Cognitive Potential</h2>
    <p style={{ fontSize: '1.1em', maxWidth: '800px', margin: '0 auto 40px auto', color: '#666' }}>
     Understanding your cognitive abilities shouldn’t require complicated forms, outdated test formats, or vague results. Our platform provides a **modern, reliable, and user-centered approach** to IQ evaluation. Each assessment is built with scientific rigor, ensuring an experience that is both scientifically meaningful and easy to navigate.
    </p>
   </div>

   {/* 3. High-Level Statistics Section with Background Image 2 */}
   <div style={styles.statsSection}>
    <h2 style={{ fontSize: '2.5em', color: '#007bff', marginBottom: '20px', textShadow: '2px 2px 4px #000' }}>Platform Impact & Trust</h2>
    <p style={{ fontSize: '1.1em', maxWidth: '800px', margin: '0 auto 40px auto', color: '#e0e0e0', textShadow: '1px 1px 2px #000' }}>
     Join thousands of users who trust our platform for accurate, insightful, and accessible cognitive assessments.
    </p>
    <div style={styles.statsGrid}>
     {highLevelStatistics.map((stat, index) => (
      <div key={index} style={styles.statItem}>
       <div style={styles.statNumber}>{stat.number}</div>
       <div style={styles.statText}>{stat.text}</div>
      </div>
     ))}
    </div>
   </div>
        
   {/* 4. Detailed Statistics & Visualization Section */}
   <div style={styles.detailedStatsSection}>
    <h2 style={{ fontSize: '2.5em', color: '#343a40', marginBottom: '20px' }}>IQ Score Benchmarks & Insights</h2>
    <p style={{ fontSize: '1.1em', maxWidth: '800px', margin: '0 auto 40px auto', color: '#666' }}>
     Contextualize your potential results using established global and demographic averages.
    </p>
    
    <div style={styles.graphContainer}>
     {/* Detailed Statistics Block: Global & Demographics */}
     <div style={styles.statBlock}>
      <h3 style={{ color: '#007bff', marginBottom: '15px' }}>Global & Demographic Averages</h3>
      {detailedStats.global.map((item, index) => (
       <div key={'g'+index} style={styles.statDetail}>
        **{item.label}:** <span style={{ float: 'right', fontWeight: 'bold', color: '#28a745' }}>{item.value}</span>
       </div>
      ))}
      {detailedStats.demographics.map((item, index) => (
       <div key={'d'+index} style={styles.statDetail}>
        **{item.label}:** <span style={{ float: 'right', fontWeight: 'bold', color: '#28a745' }}>{item.value}</span>
       </div>
      ))}
     </div>

     {/* Graph/Image Visualization Placeholder */}
     <div style={{ flex: 1, minWidth: '350px' }}>
      <h3 style={{ color: '#007bff', marginBottom: '15px' }}>Score Distribution Visual</h3>
                
     </div>
    </div>
   </div>

   {/* 5. Key Highlights Section */}
   <div style={styles.highlightsSection}>
    <h2 style={{ fontSize: '2.5em', color: '#343a40', marginBottom: '30px' }}>Key Highlights</h2>
    <div style={styles.highlightsGrid}>
     {highlights.map((item, index) => (
      <div key={index} style={styles.highlightItem}>
       <h3 style={styles.highlightTitle}>{item.title}</h3>
       <p style={styles.highlightDescription}>{item.description}</p>
      </div>
     ))}
    </div>
   </div>
  </>
 );
};

export default HomeScreen;

// import React from 'react';
// import { Link } from 'react-router-dom';
// import backgroundImage from '../assets/images/cognitive_strength_bg.png'; // <-- IMPORT THE IMAGE

// const HomeScreen = () => {
//  const styles = {
//   container: {
//    // Remove fixed padding and max-width for the hero section
//    // The hero will now take full width and height
//    minHeight: '85vh', // Ensure it covers enough viewport height
//    display: 'flex',
//    flexDirection: 'column',
//    justifyContent: 'center',
//    alignItems: 'center',
//    textAlign: 'center',
   
//    // Background styles
//    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${backgroundImage})`, // Dark overlay + image
//    backgroundSize: 'cover',
//    backgroundPosition: 'center',
//    color: 'white', // Ensure text is readable against dark background
//    position: 'relative', // Needed for potential overlays/absolute positioning
//    overflow: 'hidden', // Hide any overflow from image
//   },
//   contentWrapper: { // A new div to hold content within the background, for proper centering and max-width
//    maxWidth: '1000px',
//    padding: '60px 20px',
//    margin: '0 auto',
//    zIndex: 1, // Ensure content is above any potential pseudo-element overlays
//   },
//   h1: {
//    fontSize: '3.8em', // Slightly larger for impact
//    color: '#007bff', // Keep brand color
//    marginBottom: '20px',
//    fontWeight: 800,
//    textShadow: '2px 2px 4px rgba(0,0,0,0.5)', // Add text shadow for readability
//   },
//   subHeadline: {
//    fontSize: '1.4em', // Slightly larger
//    color: '#e0e0e0', // Lighter color for readability
//    marginBottom: '40px',
//    maxWidth: '700px',
//    margin: '0 auto 40px auto',
//    textShadow: '1px 1px 3px rgba(0,0,0,0.5)',
//   },
//   ctaContainer: {
//    display: 'flex',
//    justifyContent: 'center',
//    gap: '20px',
//    marginBottom: '60px',
//    flexWrap: 'wrap', // Allow CTAs to wrap on smaller screens
//   },
//   primaryCta: {
//    display: 'inline-block',
//    padding: '15px 35px', // Slightly more padding
//    fontSize: '1.3em', // Slightly larger font
//    backgroundColor: '#28a745',
//    color: 'white',
//    textDecoration: 'none',
//    borderRadius: '8px',
//    transition: 'background-color 0.3s, transform 0.2s',
//    fontWeight: 600,
//    ':hover': { // Hover effect
//     backgroundColor: '#218838',
//     transform: 'translateY(-2px)',
//    },
//   },
//   secondaryCta: {
//    display: 'inline-block',
//    padding: '15px 35px',
//    fontSize: '1.3em',
//    backgroundColor: 'transparent', // Transparent background
//    color: '#007bff', // Brand color for text
//    textDecoration: 'none',
//    borderRadius: '8px',
//    border: '2px solid #007bff', // Border with brand color
//    transition: 'background-color 0.3s, color 0.3s, transform 0.2s',
//    ':hover': { // Hover effect
//     backgroundColor: '#007bff',
//     color: 'white',
//     transform: 'translateY(-2px)',
//    },
//   },
//   // New styles for the statistics section
//   statsSection: {
//    backgroundColor: '#f0f4f8', // Light background for contrast
//    padding: '60px 20px',
//    width: '100%',
//    textAlign: 'center',
//    color: '#333',
//   },
//   statsGrid: {
//    display: 'grid',
//    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
//    gap: '30px',
//    maxWidth: '1000px',
//    margin: '40px auto 0 auto',
//   },
//   statItem: {
//    backgroundColor: '#fff',
//    padding: '30px',
//    borderRadius: '10px',
//    boxShadow: '0 6px 18px rgba(0, 0, 0, 0.08)',
//    transition: 'transform 0.3s ease-in-out',
//    ':hover': {
//     transform: 'translateY(-5px)',
//    },
//   },
//   statNumber: {
//    fontSize: '3em',
//    fontWeight: 700,
//    color: '#007bff',
//    marginBottom: '10px',
//   },
//   statText: {
//    fontSize: '1.1em',
//    color: '#666',
//   },
//   // Existing highlights section styles (might need adjustments for global use if moved)
//   highlightsSection: { // Renamed for clarity, assumed to be below the hero
//    backgroundColor: '#ffffff',
//    padding: '60px 20px',
//    width: '100%',
//    textAlign: 'center',
//    color: '#333',
//   },
//   highlightsGrid: {
//    display: 'grid',
//    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', // Adjust minmax for better layout
//    gap: '30px',
//    maxWidth: '1000px',
//    margin: '40px auto 0 auto',
//   },
//   highlightItem: {
//    backgroundColor: '#fdfdfd',
//    padding: '25px',
//    borderRadius: '10px',
//    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.07)',
//    borderLeft: '5px solid #28a745', // Use a different highlight color
//    textAlign: 'left',
//   },
//   highlightTitle: {
//    fontWeight: 700,
//    color: '#28a745', // Use highlight color
//    marginBottom: '10px',
//    fontSize: '1.3em',
//   },
//   highlightDescription: {
//    fontSize: '1em',
//    color: '#666',
//   },
//  };

//  const highlights = [
//   { title: 'Comprehensive Evaluation', description: 'Covers logical reasoning, pattern recognition, problem-solving agility, memory processing, and verbal understanding.' },
//   { title: 'Adaptive Difficulty', description: 'Intelligent scoring models measure your performance relative to question complexity for a precise result.' },
//   { title: 'Instant Reports', description: 'Clear, insightful results with breakdowns that help you understand your strengths and growth areas.' },
//   { title: 'User-Friendly Design', description: 'Clean layouts, intuitive navigation, and guidance at every step of the assessment.' },
//  ];

//  const statistics = [
//   { number: '100K+', text: 'Tests Completed Annually' },
//   { number: '98%', text: 'User Satisfaction Rate' },
//   { number: '20+', text: 'Years of Cognitive Research' },
//  ];

//  return (
//   <>
//    {/* Hero Section with Background Image */}
//    <div style={styles.container}>
//     <div style={styles.contentWrapper}>
//      <h1 style={styles.h1}>Measure Your Cognitive Strength With Precision</h1>
//      <p style={styles.subHeadline}>
//       Our advanced IQ testing platform delivers accurate, research-based insights into your reasoning, memory, analytical thinking, and problem-solving abilities.
//      </p>
     
//      <div style={styles.ctaContainer}>
//       <Link to='/quiz' style={styles.primaryCta}>
//        Start Your IQ Test →
//       </Link>
//       <Link to='/about' style={styles.secondaryCta}>
//        Explore How It Works →
//       </Link>
//      </div>
//     </div>
//    </div>

//    {/* Introduction Section */}
//    <div style={{ ...styles.highlightsSection, backgroundColor: '#ffffff' }}> {/* Reusing highlightsSection style for general sections */}
//     <h2 style={{ fontSize: '2em', color: '#333', marginBottom: '20px' }}>Unlock Your Cognitive Potential</h2>
//     <p style={{ fontSize: '1.1em', maxWidth: '800px', margin: '0 auto 40px auto', color: '#666' }}>
//      Understanding your cognitive abilities shouldn’t require complicated forms, outdated test formats, or vague results. Our platform provides a **modern, reliable, and user-centered approach** to IQ evaluation. Each assessment is built with scientific rigor, ensuring an experience that is both scientifically meaningful and easy to navigate.
//     </p>
//    </div>

//    {/* Statistics Section */}
//    <div style={styles.statsSection}>
//     <h2 style={{ fontSize: '2.5em', color: '#343a40', marginBottom: '20px' }}>Why Choose Our Platform?</h2>
//     <p style={{ fontSize: '1.1em', maxWidth: '800px', margin: '0 auto 40px auto', color: '#555' }}>
//      Join thousands of users who trust our platform for accurate, insightful, and accessible cognitive assessments.
//     </p>
//     <div style={styles.statsGrid}>
//      {statistics.map((stat, index) => (
//       <div key={index} style={styles.statItem}>
//        <div style={styles.statNumber}>{stat.number}</div>
//        <div style={styles.statText}>{stat.text}</div>
//       </div>
//      ))}
//     </div>
//    </div>

//    {/* Key Highlights Section */}
//    <div style={{ ...styles.highlightsSection, backgroundColor: '#f8f8f8' }}>
//     <h2 style={{ fontSize: '2.5em', color: '#343a40', marginBottom: '30px' }}>Key Highlights</h2>
//     <div style={styles.highlightsGrid}>
//      {highlights.map((item, index) => (
//       <div key={index} style={styles.highlightItem}>
//        <h3 style={styles.highlightTitle}>{item.title}</h3>
//        <p style={styles.highlightDescription}>{item.description}</p>
//       </div>
//      ))}
//     </div>
//    </div>
//   </>
//  );
// };

// export default HomeScreen;