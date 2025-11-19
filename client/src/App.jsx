import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';

import HomeScreen from './pages/HomeScreen';
import LoginScreen from './pages/LoginScreen';
import RegisterScreen from './pages/RegisterScreen';
import ForgotPasswordScreen from './pages/ForgotPasswordScreen';
import ResetPasswordScreen from './pages/ResetPasswordScreen';

import DashboardScreen from './pages/DashboardScreen';
import AdminDashboardScreen from './pages/AdminDashboardScreen';
import QuizScreen from './pages/QuizScreen';
import ResultScreen from './pages/ResultScreen';
import HistoryScreen from './pages/HistoryScreen';
import FAQScreen from './pages/FAQScreen'; // NEW IMPORT
import AboutUsScreen from './pages/AboutUsScreen'; // NEW IMPORT
import ContactUsScreen from './pages/ContactUsScreen';

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Routes>
          <Route path='/' element={<HomeScreen />} />
          <Route path='/login' element={<LoginScreen />} />
          <Route path='/register' element={<RegisterScreen />} />
          <Route path='/forgotpassword' element={<ForgotPasswordScreen />} />
          <Route path='/resetpassword/:resettoken' element={<ResetPasswordScreen />} />
          <Route path='/faq' element={<FAQScreen />} />
          <Route path='/about' element={<AboutUsScreen />} />
          <Route path='/contact' element={<ContactUsScreen />} />
          
          <Route path='' element={<PrivateRoute />}>
            <Route path='/dashboard' element={<DashboardScreen />} />
            <Route path='/quiz' element={<QuizScreen />} /> 
            <Route path='/result/:id' element={<ResultScreen />} />
            <Route path='/history' element={<HistoryScreen />} />
            {/* Future private routes go here: */}
            {/* <Route path='/test' element={<TestScreen />} /> */}
          </Route>{/* We'll add more routes (e.g., /dashboard, /test) later */}

           <Route path='' element={<PrivateRoute adminOnly={true} />}>
            <Route path='/admin' element={<AdminDashboardScreen />} /> {/* <-- NEW ADMIN ROUTE */}
          </Route>
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;