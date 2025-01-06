import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home } from './pages/Home';
import { Library } from './pages/Library';
import { TranscriptionDetail } from './pages/TranscriptionDetail';

export const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Link to="/" className="text-xl font-bold text-blue-600">
                Absolute
              </Link>
              <div className="flex space-x-4">
                <Link to="/" className="text-gray-600 hover:text-gray-900">
                  Accueil
                </Link>
                <Link to="/library" className="text-gray-600 hover:text-gray-900">
                  Bibliothèque
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/library" element={<Library />} />
          <Route path="/transcription/:id" element={<TranscriptionDetail />} />
        </Routes>
      </div>
    </Router>
  );
};
