// client/src/pages/HomeScreen.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import backgroundHeroImage from '../assets/images/background_1.png'; 
import backgroundStatsImage from '../assets/images/background_2.png'; 
import bellCurveImage from '../assets/images/bellcurve.png'; 
import maleFemaleBellCurveImage from '../assets/images/male_female_bellcurve.png'; // <-- NEW IMAGE IMPORT

const HomeScreen = () => {

const highLevelStatistics = [
 { number: '100K+', text: 'Tests Completed Annually' },
 { number: '98%', text: 'User Satisfaction Rate' },
 { number: '20+', text: 'Years of Cognitive Research' },
];

const highlights = [
 { title: 'Comprehensive Evaluation', description: 'Covers logical reasoning, pattern recognition, problem-solving agility, memory processing, and verbal understanding.' },
 { title: 'Adaptive Difficulty', description: 'Intelligent scoring models measure your performance relative to question complexity for a precise result.' },
 { title: 'Instant Reports', description: 'Clear, insightful results with breakdowns that help you understand your strengths and growth areas.' },
 { title: 'User-Friendly Design', description: 'Clean layouts, intuitive navigation, and guidance at every step of the assessment.' },
];

return (
 <>
 {/* 1. Hero Section with Background Image 1 */}
 <div 
  className="min-h-[85vh] flex flex-col justify-center items-center text-center text-white bg-cover bg-center overflow-hidden"
  style={{ 
  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${backgroundHeroImage})` 
  }}
 >
  <div className="max-w-4xl p-8 z-10">
  <h1 className="text-5xl md:text-6xl text-blue-400 mb-5 font-extrabold tracking-tight [text-shadow:2px_2px_4px_rgba(0,0,0,0.5)]">
   Measure Your Cognitive Strength With Precision
  </h1>
  <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto [text-shadow:1px_1px_3px_rgba(0,0,0,0.5)]">
   Our advanced IQ testing platform delivers accurate, research-based insights into your reasoning, memory, analytical thinking, and problem-solving abilities.
  </p>
  
  <div className="flex justify-center gap-6 flex-wrap">
   <Link to='/quiz' className="px-8 py-4 text-xl bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300 transform hover:scale-105 shadow-lg">
   Start Your IQ Test →
   </Link>
   <Link to='/about' className="px-8 py-4 text-xl bg-transparent text-blue-400 font-semibold rounded-lg border-2 border-blue-400 hover:bg-blue-400 hover:text-white transition duration-300 transform hover:scale-105">
   Explore How It Works →
   </Link>
  </div>
  </div>
 </div>

 {/* 2. Introduction Section */}
 <div className="bg-white py-16 px-4 text-center text-gray-800">
  <div className="max-w-4xl mx-auto">
  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-700">Unlock Your Cognitive Potential</h2>
  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
   Understanding your cognitive abilities shouldn’t require complicated forms, outdated test formats, or vague results. Our platform provides a **modern, reliable, and user-centered approach** to IQ evaluation. Each assessment is built with scientific rigor, ensuring an experience that is both scientifically meaningful and easy to navigate.
  </p>
  </div>
 </div>

 {/* 3. High-Level Statistics Section with Background Image 2 */}
 <div 
  className="py-20 px-4 text-center text-white bg-cover bg-center"
  style={{ 
  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url(${backgroundStatsImage})` 
  }}
 >
  <h2 className="text-4xl font-bold mb-4 text-blue-400 [text-shadow:2px_2px_4px_#000]">Platform Impact & Trust</h2>
  <p className="text-lg max-w-2xl mx-auto mb-10 text-gray-300">
  Join thousands of users who trust our platform for accurate, insightful, and accessible cognitive assessments.
  </p>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
  {highLevelStatistics.map((stat, index) => (
   <div 
   key={index} 
   className="bg-black/40 border border-blue-500/50 p-8 rounded-xl shadow-2xl transition duration-300 hover:scale-[1.02]"
   >
   <div className="text-5xl font-extrabold text-green-400 mb-2">{stat.number}</div>
   <div className="text-xl font-semibold text-gray-200">{stat.text}</div>
   </div>
  ))}
  </div>
 </div>
    
 {/* 4. IQ Score Benchmarks & Insights Section */}
 <div className="bg-gray-50 py-16 px-4">
  <div className="max-w-6xl mx-auto text-center">
  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-700">IQ Score Benchmarks & Insights</h2>
  <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
   Contextualize your potential results using established global and demographic averages.
  </p>
  
  <div className="flex flex-col lg:flex-row justify-between items-start gap-10">
   {/* Left Column: Overall Bell Curve with explanation */}
   <div className="flex-1 w-full bg-white p-6 rounded-xl shadow-lg border-t-4 border-yellow-500">
   <h3 className="text-2xl font-semibold text-blue-600 mb-4 pb-2 border-b">Global IQ Distribution</h3>
   <img 
    src={bellCurveImage} 
    alt="IQ Score Bell Curve Distribution" 
    className="w-full h-auto rounded-lg shadow-md mb-4" 
   />
   <p className="text-gray-700 text-sm leading-relaxed">
    This curve illustrates how IQ scores are distributed across a population, with the average IQ at 100. The majority (about 68%) fall between 85-115, indicating typical cognitive abilities. Scores deviate from the average as less common, representing exceptionally high or low intelligence.
   </p>
   </div>

   {/* Right Column: Male vs. Female Bell Curve with explanation */}
   <div className="flex-1 w-full bg-white p-6 rounded-xl shadow-lg border-t-4 border-blue-600">
   <h3 className="text-2xl font-semibold text-blue-600 mb-4 pb-2 border-b">IQ by Gender: Distribution Spread</h3>
   <img 
    src={maleFemaleBellCurveImage} 
    alt="IQ Scores: Men & Women Are Equally Smart" 
    className="w-full h-auto rounded-lg shadow-md mb-4" 
   />
   <p className="text-gray-700 text-sm leading-relaxed">
    While the average IQ score remains consistent (around 100) for both men and women, studies often show a difference in the **spread** of scores. Men tend to have a wider distribution, meaning there are proportionally more men at both the very high and very low ends of the IQ spectrum, while women's scores cluster more closely around the average.
   </p>
   </div>
  </div>
  </div>
 </div>

 {/* 5. Key Highlights Section */}
 <div className="bg-white py-16 px-4">
  <div className="max-w-5xl mx-auto text-center">
  <h2 className="text-3xl md:text-4xl font-bold mb-10 text-gray-700">Key Highlights</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
   {highlights.map((item, index) => (
   <div key={index} className="bg-gray-50 p-6 rounded-xl shadow-md border-l-4 border-green-500 text-left transition duration-300 hover:shadow-xl hover:-translate-y-1">
    {/* Placeholder for Icon */}
    <div className="text-3xl mb-3 text-green-600">🧠</div>
    <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
    <p className="text-gray-600 text-sm">{item.description}</p>
   </div>
   ))}
  </div>
  </div>
 </div>
 </>
);
};

export default HomeScreen;

// // client/src/pages/HomeScreen.jsx

// import React from 'react';
// import { Link } from 'react-router-dom';
// import backgroundHeroImage from '../assets/images/background_1.png'; 
// import backgroundStatsImage from '../assets/images/background_2.png'; 

// const HomeScreen = () => {
 
//  const highLevelStatistics = [
//   { number: '100K+', text: 'Tests Completed Annually' },
//   { number: '98%', text: 'User Satisfaction Rate' },
//   { number: '20+', text: 'Years of Cognitive Research' },
//  ];

//  const detailedStats = {
//   global: [
//    { label: 'Global Average IQ', value: '100' },
//    { label: 'Top Scoring Countries (Avg)', value: '102 - 108' },
//    { label: 'Common Range (68% of Population)', value: '85 - 115' },
//   ],
//   demographics: [
//    { label: 'Average Score (Male)', value: '100.5' },
//    { label: 'Average Score (Female)', value: '99.5' },
//    { label: 'Peak Cognitive Age', value: '25 - 35 years' },
//   ]
//  };

//  const highlights = [
//   { title: 'Comprehensive Evaluation', description: 'Covers logical reasoning, pattern recognition, problem-solving agility, memory processing, and verbal understanding.' },
//   { title: 'Adaptive Difficulty', description: 'Intelligent scoring models measure your performance relative to question complexity for a precise result.' },
//   { title: 'Instant Reports', description: 'Clear, insightful results with breakdowns that help you understand your strengths and growth areas.' },
//   { title: 'User-Friendly Design', description: 'Clean layouts, intuitive navigation, and guidance at every step of the assessment.' },
//  ];

//  return (
//   <>
//    {/* 1. Hero Section with Background Image 1 */}
//    <div 
//     className="min-h-[85vh] flex flex-col justify-center items-center text-center text-white bg-cover bg-center overflow-hidden"
//     style={{ 
//      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${backgroundHeroImage})` 
//     }}
//    >
//     <div className="max-w-4xl p-8 z-10">
//      <h1 className="text-5xl md:text-6xl text-blue-400 mb-5 font-extrabold tracking-tight [text-shadow:2px_2px_4px_rgba(0,0,0,0.5)]">
//       Measure Your Cognitive Strength With Precision
//      </h1>
//      <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto [text-shadow:1px_1px_3px_rgba(0,0,0,0.5)]">
//       Our advanced IQ testing platform delivers accurate, research-based insights into your reasoning, memory, analytical thinking, and problem-solving abilities.
//      </p>
     
//      <div className="flex justify-center gap-6 flex-wrap">
//       <Link to='/quiz' className="px-8 py-4 text-xl bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300 transform hover:scale-105 shadow-lg">
//        Start Your IQ Test →
//       </Link>
//       <Link to='/about' className="px-8 py-4 text-xl bg-transparent text-blue-400 font-semibold rounded-lg border-2 border-blue-400 hover:bg-blue-400 hover:text-white transition duration-300 transform hover:scale-105">
//        Explore How It Works →
//       </Link>
//      </div>
//     </div>
//    </div>

//    {/* 2. Introduction Section */}
//    <div className="bg-white py-16 px-4 text-center text-gray-800">
//     <div className="max-w-4xl mx-auto">
//      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-700">Unlock Your Cognitive Potential</h2>
//      <p className="text-lg text-gray-600 max-w-3xl mx-auto">
//       Understanding your cognitive abilities shouldn’t require complicated forms, outdated test formats, or vague results. Our platform provides a **modern, reliable, and user-centered approach** to IQ evaluation. Each assessment is built with scientific rigor, ensuring an experience that is both scientifically meaningful and easy to navigate.
//      </p>
//     </div>
//    </div>

//    {/* 3. High-Level Statistics Section with Background Image 2 */}
//    <div 
//     className="py-20 px-4 text-center text-white bg-cover bg-center"
//     style={{ 
//      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url(${backgroundStatsImage})` 
//     }}
//    >
//     <h2 className="text-4xl font-bold mb-4 text-blue-400 [text-shadow:2px_2px_4px_#000]">Platform Impact & Trust</h2>
//     <p className="text-lg max-w-2xl mx-auto mb-10 text-gray-300">
//      Join thousands of users who trust our platform for accurate, insightful, and accessible cognitive assessments.
//     </p>
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
//      {highLevelStatistics.map((stat, index) => (
//       <div 
//        key={index} 
//        className="bg-black/40 border border-blue-500/50 p-8 rounded-xl shadow-2xl transition duration-300 hover:scale-[1.02]"
//       >
//        <div className="text-5xl font-extrabold text-green-400 mb-2">{stat.number}</div>
//        <div className="text-xl font-semibold text-gray-200">{stat.text}</div>
//       </div>
//      ))}
//     </div>
//    </div>
        
//    {/* 4. Detailed Statistics & Visualization Section */}
//    <div className="bg-gray-50 py-16 px-4">
//     <div className="max-w-5xl mx-auto text-center">
//      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-700">IQ Score Benchmarks & Insights</h2>
//      <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
//       Contextualize your potential results using established global and demographic averages.
//      </p>
     
//      <div className="flex flex-col lg:flex-row justify-between items-start gap-10">
//       {/* Detailed Statistics Block: Global & Demographics */}
//       <div className="flex-1 w-full bg-white p-6 rounded-xl shadow-lg border-t-4 border-yellow-500">
//        <h3 className="text-2xl font-semibold text-blue-600 mb-4 pb-2 border-b">Global & Demographic Averages</h3>
//        {detailedStats.global.map((item, index) => (
//         <div key={'g'+index} className="flex justify-between items-center py-3 border-b border-gray-200 last:border-b-0 text-gray-700">
//          <strong className="text-lg">{item.label}</strong>
//          <span className="text-xl font-bold text-green-600">{item.value}</span>
//         </div>
//        ))}
//        <div className="mt-4 pt-4 border-t-2 border-dashed">
//         {detailedStats.demographics.map((item, index) => (
//          <div key={'d'+index} className="flex justify-between items-center py-3 border-b border-gray-200 last:border-b-0 text-gray-700">
//           <strong className="text-lg">{item.label}</strong>
//           <span className="text-xl font-bold text-green-600">{item.value}</span>
//         </div>
//         ))}
//        </div>
//       </div>

//       {/* Graph/Image Visualization Placeholder */}
//       <div className="flex-1 w-full bg-white p-6 rounded-xl shadow-lg border-t-4 border-blue-600">
//        <h3 className="text-2xl font-semibold text-blue-600 mb-4 pb-2 border-b">IQ Score Distribution</h3>
//        <p className="text-gray-500 mb-4">A visualization of the normalized cognitive curve.</p>
       
//       </div>
//      </div>
//     </div>
//    </div>

//    {/* 5. Key Highlights Section */}
//    <div className="bg-white py-16 px-4">
//     <div className="max-w-5xl mx-auto text-center">
//      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-gray-700">Key Highlights</h2>
//      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//       {highlights.map((item, index) => (
//        <div key={index} className="bg-gray-50 p-6 rounded-xl shadow-md border-l-4 border-green-500 text-left transition duration-300 hover:shadow-xl hover:-translate-y-1">
//         {/* Placeholder for Icon */}
//         <div className="text-3xl mb-3 text-green-600">🧠</div>
//         <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
//         <p className="text-gray-600 text-sm">{item.description}</p>
//        </div>
//       ))}
//      </div>
//     </div>
//    </div>
//   </>
//  );
// };

// export default HomeScreen;