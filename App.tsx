import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import BooksPage from "./pages/books/BooksPage";
import BookDetailPage from "./pages/books/BookDetailPage";
import MyLoansPage from "./pages/loans/MyLoansPage";
import AdminBooksPage from "./pages/admin/AdminBooksPage";
import AdminLoansPage from "./pages/admin/AdminLoansPage";
import NotFound from "./pages/NotFound";
import AdminUsersPage from "@/pages/admin/AdminUsersPage";
import AdminFeaturedBooksPage from "@/pages/admin/AdminFeaturedBooksPage";
import FeaturedBooksPage from "@/pages/FeaturedBooksPage";

const queryClient = new QueryClient();

// Protected route wrapper
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { status, user } = useAuth();
  
  if (status === 'loading') {
    return <div>Carregando...</div>;
  }
  
  if (status === 'unauthenticated') {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Admin only route wrapper
const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const { status, isAdmin } = useAuth();
  
  if (status === 'loading') {
    return <div>Carregando...</div>;
  }
  
  if (status === 'unauthenticated') {
    return <Navigate to="/login" replace />;
  }
  
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/books/:id" element={<BookDetailPage />} />
            <Route path="/featured" element={<FeaturedBooksPage />} />
            
            {/* Protected Routes */}
            <Route path="/my-loans" element={
              <ProtectedRoute>
                <MyLoansPage />
              </ProtectedRoute>
            } />
            
            {/* Admin Routes */}
            <Route path="/admin/books" element={
              <AdminRoute>
                <AdminBooksPage />
              </AdminRoute>
            } />
            <Route path="/admin/loans" element={
              <AdminRoute>
                <AdminLoansPage />
              </AdminRoute>
            } />
            <Route path="/admin/users" element={
              <AdminRoute>
                <AdminUsersPage />
              </AdminRoute>
            } />
            <Route path="/admin/featured" element={
              <AdminRoute>
                <AdminFeaturedBooksPage />
              </AdminRoute>
            } />
            
            {/* 404 - Not Found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
