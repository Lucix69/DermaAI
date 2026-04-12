import { Link } from 'react-router';
import { Sparkles, Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8b9a8d] to-[#a8c4a8] flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-semibold">DermaAI</span>
            </div>
            <p className="text-sm text-muted-foreground">
              AI-powered personalized skincare analysis and recommendations for healthier, glowing skin.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/assessment" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Skin Assessment
                </Link>
              </li>
              <li>
                <Link to="/upload" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Upload Image
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <Link to="/login" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 text-primary" />
                <span className="text-sm text-muted-foreground">support@dermaai.com</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 text-primary" />
                <span className="text-sm text-muted-foreground">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-primary" />
                <span className="text-sm text-muted-foreground">
                  123 Health St, Suite 100<br />
                  San Francisco, CA 94103
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-center text-sm text-muted-foreground">
            © 2026 DermaAI. All rights reserved. | Disclaimer: This is an AI-powered tool for educational purposes. Please consult a dermatologist for medical advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
