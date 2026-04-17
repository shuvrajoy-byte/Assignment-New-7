import { HashRouter, Routes, Route } from 'react-router-dom'; 
import { Toaster } from 'react-hot-toast';
import { TimelineProvider } from './context/TimelineContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import FriendDetail from './pages/FriendDetail';
import Timeline from './pages/Timeline';
import Stats from './pages/Stats';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <HashRouter>
      <TimelineProvider>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/friend/:id" element={<FriendDetail />} />
              <Route path="/timeline" element={<Timeline />} />
              <Route path="/stats" element={<Stats />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>


      <Toaster 
        position="top-center" 
        toastOptions={{
    
      style: {
      background: '#244D3F', 
      color: '#fff',         
      padding: '16px',
      borderRadius: '10px',
      fontSize: '14px',
      fontWeight: '500',
      },
      success: {
     
      iconTheme: {
        primary: '#fff',
        secondary: '#244D3F',
        },
        },
        }}
      />
      </TimelineProvider>
    </HashRouter>
  );
}