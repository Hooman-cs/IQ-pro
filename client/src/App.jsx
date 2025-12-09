import React, { lazy, Suspense } from 'react'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';

// ==========================================================
// 1. ABSOLUTE MINIMUM EAGER IMPORTS (Keep only critical ones)
// ==========================================================
// We keep the Header, Footer, and PrivateRoute helper eager, 
// and only one or two core screens if they are tiny and non-negotiable.
// Let's even make them lazy to maximize splitting!

// ==========================================================
// 2. LAZY IMPORTS (ALL PAGES are now lazy-loaded for max Code Splitting)
// ==========================================================
const HomeScreen = lazy(() => import('./pages/HomeScreen'));
const LoginScreen = lazy(() => import('./pages/LoginScreen'));
const RegisterScreen = lazy(() => import('./pages/RegisterScreen'));
const ForgotPasswordScreen = lazy(() => import('./pages/ForgotPasswordScreen'));
const ResetPasswordScreen = lazy(() => import('./pages/ResetPasswordScreen'));
const FAQScreen = lazy(() => import('./pages/FAQScreen')); 
const AboutUsScreen = lazy(() => import('./pages/AboutUsScreen')); 
const ContactUsScreen = lazy(() => import('./pages/ContactUsScreen'));
const PrivacyPolicyScreen = lazy(() => import('./pages/PrivacyPolicyScreen'));
const TermsAndConditionsScreen = lazy(() => import('./pages/TermsAndConditionsScreen'));

// Private/Admin Routes (already lazy, just keeping them listed)
const DashboardScreen = lazy(() => import('./pages/DashboardScreen'));
const QuizScreen = lazy(() => import('./pages/QuizScreen'));
const ResultScreen = lazy(() => import('./pages/ResultScreen'));
const HistoryScreen = lazy(() => import('./pages/HistoryScreen'));
const AdminDashboardScreen = lazy(() => import('./pages/AdminDashboardScreen'));


function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        {/* Suspense fallback shows a message while the lazy-loaded components are downloading */}
        <Suspense fallback={<div className="text-center py-10 text-xl text-blue-600">Loading Content...</div>}>
          <Routes>
            {/* ========================================================================= */}
            {/* PUBLIC/LAZY ROUTES: Each is now a separate, small chunk. */}
            {/* ========================================================================= */}
            <Route path='/' element={<HomeScreen />} />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/forgotpassword' element={<ForgotPasswordScreen />} />
            <Route path='/resetpassword/:resettoken' element={<ResetPasswordScreen />} />
            <Route path='/faq' element={<FAQScreen />} />
            <Route path='/about' element={<AboutUsScreen />} />
            <Route path='/contact' element={<ContactUsScreen />} />
            <Route path='/privacy-policy' element={<PrivacyPolicyScreen />} />
            <Route path='/terms' element={<TermsAndConditionsScreen />} />
            
            {/* ========================================================================= */}
            {/* PRIVATE/LAZY ROUTES (User Dashboard and Test Flow) */}
            {/* ========================================================================= */}
            <Route path='' element={<PrivateRoute />}>
              <Route path='/dashboard' element={<DashboardScreen />} />
              <Route path='/quiz' element={<QuizScreen />} /> 
              <Route path='/result/:id' element={<ResultScreen />} />
              <Route path='/history' element={<HistoryScreen />} />
            </Route>

            {/* ========================================================================= */}
            {/* ADMIN/LAZY ROUTES */}
            {/* ========================================================================= */}
            <Route path='' element={<PrivateRoute adminOnly={true} />}>
              <Route path='/admin' element={<AdminDashboardScreen />} />
            </Route>
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </Router>
  );
}

export default App;



// import React, { lazy, Suspense } from 'react'; // Import lazy and Suspense
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Header from './components/Header';
// import Footer from './components/Footer';
// import PrivateRoute from './components/PrivateRoute';

// // ==========================================================
// // 1. EAGER IMPORTS (for critical initial load pages)
// // ==========================================================
// import HomeScreen from './pages/HomeScreen';
// import LoginScreen from './pages/LoginScreen';
// import RegisterScreen from './pages/RegisterScreen';
// import ForgotPasswordScreen from './pages/ForgotPasswordScreen';
// import ResetPasswordScreen from './pages/ResetPasswordScreen';
// import FAQScreen from './pages/FAQScreen'; 
// import AboutUsScreen from './pages/AboutUsScreen'; 
// import ContactUsScreen from './pages/ContactUsScreen';
// import PrivacyPolicyScreen from './pages/PrivacyPolicyScreen';
// import TermsAndConditionsScreen from './pages/TermsAndConditionsScreen';


// // ==========================================================
// // 2. LAZY IMPORTS (for less critical or private/admin routes)
// // =g= These will be loaded in separate chunks only when needed.
// // ==========================================================
// const DashboardScreen = lazy(() => import('./pages/DashboardScreen'));
// const QuizScreen = lazy(() => import('./pages/QuizScreen'));
// const ResultScreen = lazy(() => import('./pages/ResultScreen'));
// const HistoryScreen = lazy(() => import('./pages/HistoryScreen'));
// const AdminDashboardScreen = lazy(() => import('./pages/AdminDashboardScreen'));


// function App() {
//   return (
//     <Router>
//       <Header />
//       <main className='py-3'>
//         {/* Suspense fallback shows a message while the lazy-loaded components are downloading */}
//         <Suspense fallback={<div className="text-center py-10 text-xl text-blue-600">Loading Content...</div>}>
//           <Routes>
//             {/* ========================================================================= */}
//             {/* PUBLIC/EAGER ROUTES: Loaded immediately in the main bundle */}
//             {/* ========================================================================= */}
//             <Route path='/' element={<HomeScreen />} />
//             <Route path='/login' element={<LoginScreen />} />
//             <Route path='/register' element={<RegisterScreen />} />
//             <Route path='/forgotpassword' element={<ForgotPasswordScreen />} />
//             <Route path='/resetpassword/:resettoken' element={<ResetPasswordScreen />} />
//             <Route path='/faq' element={<FAQScreen />} />
//             <Route path='/about' element={<AboutUsScreen />} />
//             <Route path='/contact' element={<ContactUsScreen />} />
//             <Route path='/privacy-policy' element={<PrivacyPolicyScreen />} />
//             <Route path='/terms' element={<TermsAndConditionsScreen />} />
            
//             {/* ========================================================================= */}
//             {/* PRIVATE/LAZY ROUTES (User Dashboard and Test Flow) */}
//             {/* ========================================================================= */}
//             <Route path='' element={<PrivateRoute />}>
//               <Route path='/dashboard' element={<DashboardScreen />} />
//               <Route path='/quiz' element={<QuizScreen />} /> 
//               <Route path='/result/:id' element={<ResultScreen />} />
//               <Route path='/history' element={<HistoryScreen />} />
//             </Route>

//             {/* ========================================================================= */}
//             {/* ADMIN/LAZY ROUTES */}
//             {/* ========================================================================= */}
//             <Route path='' element={<PrivateRoute adminOnly={true} />}>
//               <Route path='/admin' element={<AdminDashboardScreen />} />
//             </Route>
//           </Routes>
//         </Suspense>
//       </main>
//       <Footer />
//     </Router>
//   );
// }

// export default App;