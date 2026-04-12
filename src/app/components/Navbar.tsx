import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { Menu, X, Sparkles, User, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { isAuthenticated, signOut, getCurrentUser } from "../../services/authService";
import { toast } from "sonner";

export function Navbar() {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [userName, setUserName] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {

    const checkAuth = () => {
      const authenticated = isAuthenticated();
      setIsAuth(authenticated);

      if (authenticated) {
        const user = getCurrentUser();
        setUserName(user?.name || "");
      }
    };

    checkAuth();

    const interval = setInterval(checkAuth, 1000);

    return () => clearInterval(interval);

  }, [location]);

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    signOut();
    setIsAuth(false);
    setUserName("");
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-between items-center h-16">

          {/* Logo */}

          <Link to="/" className="flex items-center gap-2">

            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8b9a8d] to-[#a8c4a8] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>

            <span className="text-xl font-semibold text-foreground">
              DermaAI
            </span>

          </Link>


          {/* Desktop Navigation */}

          <div className="hidden md:flex items-center gap-8">

            <Link
              to="/"
              className={`transition-colors ${
                isActive("/") ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Home
            </Link>

            <Link
              to="/assessment"
              className={`transition-colors ${
                isActive("/assessment") ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Assessment
            </Link>

            <Link
              to="/upload"
              className={`transition-colors ${
                isActive("/upload") ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Upload Image
            </Link>

            <Link
              to="/dashboard"
              className={`transition-colors ${
                isActive("/dashboard") ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Dashboard
            </Link>

          </div>


          {/* Auth Buttons */}

          <div className="hidden md:flex items-center gap-3">

            {isAuth ? (
              <>
                <span className="text-sm text-muted-foreground">
                  Hi, {userName}!
                </span>

                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    <User className="w-4 h-4 mr-2" />
                    Login
                  </Button>
                </Link>

                <Link to="/login">
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    Get Started
                  </Button>
                </Link>
              </>
            )}

          </div>


          {/* Mobile Menu Button */}

          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

        </div>

      </div>


      {/* Mobile Menu */}

      {mobileMenuOpen && (

        <div className="md:hidden py-4 space-y-3 border-t border-border">

          <Link
            to="/"
            className="block px-4 py-2 text-muted-foreground hover:text-foreground"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>

          <Link
            to="/assessment"
            className="block px-4 py-2 text-muted-foreground hover:text-foreground"
            onClick={() => setMobileMenuOpen(false)}
          >
            Assessment
          </Link>

          <Link
            to="/upload"
            className="block px-4 py-2 text-muted-foreground hover:text-foreground"
            onClick={() => setMobileMenuOpen(false)}
          >
            Upload Image
          </Link>

          <Link
            to="/dashboard"
            className="block px-4 py-2 text-muted-foreground hover:text-foreground"
            onClick={() => setMobileMenuOpen(false)}
          >
            Dashboard
          </Link>


          <div className="px-4 pt-3 space-y-2">

            {isAuth ? (
              <Button
                variant="ghost"
                className="w-full"
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
              >
                Logout
              </Button>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                </Link>

                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Get Started
                  </Button>
                </Link>
              </>
            )}

          </div>

        </div>

      )}

    </nav>
  );
}