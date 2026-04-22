import { BrowserRouter, Routes, Route } from 'react-router';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ChatAssistant } from './components/ChatAssistant';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AdminRoute } from './components/AdminRoute';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { AssessmentPage } from './pages/AssessmentPage';
import { UploadPage } from './pages/UploadPage';
import { ResultsPage } from './pages/ResultsPage';
import { DashboardPage } from './pages/DashboardPage';
import { RemindersPage } from './pages/RemindersPage';
import { MonitoringPage } from './pages/MonitoringPage';
import { Toaster } from './components/ui/sonner';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Routes>
          {/* Login page - no navbar/footer */}
          <Route path="/login" element={<LoginPage />} />

          {/* All other pages with navbar and footer */}
          <Route
            path="/*"
            element={
              <>
                <Navbar />
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route
                      path="/assessment"
                      element={
                        <ProtectedRoute>
                          <AssessmentPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/upload"
                      element={
                        <ProtectedRoute>
                          <UploadPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/results"
                      element={
                        <ProtectedRoute>
                          <ResultsPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/dashboard"
                      element={
                        <ProtectedRoute>
                          <DashboardPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/reminders"
                      element={
                        <ProtectedRoute>
                          <RemindersPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/monitoring"
                      element={
                        <AdminRoute>
                          <MonitoringPage />
                        </AdminRoute>
                      }
                    />
                  </Routes>
                </main>
                <Footer />
                <ChatAssistant />
              </>
            }
          />
        </Routes>
        <Toaster />
      </div>
    </BrowserRouter>
  );
}
