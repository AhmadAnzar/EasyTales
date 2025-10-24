import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { StoryProvider } from './context/StoryContext';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import Landing from './pages/Landing';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Write from './pages/Write';
import Story from './pages/Story';
import MyStories from './pages/MyStories';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import './App.css';

const PlaceholderPage = ({ title }) => (
  <div style={{ padding: '2rem', textAlign: 'center' }}>
    <h1>{title}</h1>
    <p>This page is under construction.</p>
  </div>
);

const LoadingSpinner = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '50vh',
    flexDirection: 'column',
    gap: '1rem'
  }}>
    <div style={{ 
      border: '4px solid #f3f3f3',
      borderTop: '4px solid #3498db',
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      animation: 'spin 1s linear infinite'
    }}></div>
    <p>Loading...</p>
  </div>
);

const AppContent = () => {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="app">
        <NavBar />
        <main className="app-main">
          <LoadingSpinner />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="app">
      <Routes>
        {/* Landing page route - no NavBar/Footer for clean design */}
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        
        {/* App routes with NavBar/Footer */}
        <Route path="/*" element={
          <>
            <NavBar />
            <main className="app-main">
              <ErrorBoundary>
                <Routes>
                  <Route path="/home" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/write" element={<Write />} />
                  <Route path="/story/:id" element={<Story />} />
                  <Route path="/my-stories" element={<MyStories />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/privacy" element={<PlaceholderPage title="Privacy Policy" />} />
                  <Route path="/terms" element={<PlaceholderPage title="Terms of Service" />} />
                  <Route path="/guidelines" element={<PlaceholderPage title="Community Guidelines" />} />
                  <Route path="/faq" element={<PlaceholderPage title="Frequently Asked Questions" />} />
                  <Route path="/support" element={<PlaceholderPage title="Support" />} />
                </Routes>
              </ErrorBoundary>
            </main>
            <Footer />
          </>
        } />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <StoryProvider>
          <AppContent />
        </StoryProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
