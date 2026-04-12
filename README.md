# DermaAI - AI-Powered Skincare Analysis System

A modern, responsive web application for personalized skincare analysis and recommendations using AI technology.

## Features

### 🏠 Landing Page
- Hero section with compelling CTAs
- Feature highlights (Skin Type Detection, Image Analysis, Personalized Routines, Progress Tracking)
- Step-by-step "How It Works" guide
- User testimonials
- Call-to-action sections

### 🔐 Authentication
- Login/Signup page with email/password
- Social login UI (Google placeholder)
- Password visibility toggle
- Remember me functionality
- Forgot password link

### 📋 Skin Assessment Questionnaire
- Multi-step form with 8 questions
- Progress bar tracking
- Radio button selections
- Previous/Next navigation
- Professional question flow

### 📸 Image Upload & Analysis
- Drag & drop file upload
- Image preview
- File validation (JPG/PNG, max 10MB)
- Photo guidelines sidebar
- AI analysis simulation
- Loading states with progress indicators

### 📊 Analysis Results
- Detected skin type display
- Confidence meter
- Identified concerns (tags)
- **Morning Routine** (5 steps):
  - Gentle Cleanser
  - Hydrating Toner
  - Niacinamide Serum
  - Lightweight Moisturizer
  - Broad-Spectrum Sunscreen
- **Night Routine** (4 steps):
  - Oil Cleanser
  - Gentle Cleanser
  - Treatment Serum
  - Night Moisturizer
- Each step includes product type, description, and reasoning
- Additional skincare tips
- Download & share options

### 📈 User Dashboard
- Profile overview with avatar
- Current skin type badge
- Latest analysis summary
- Skin health progress chart (Recharts)
- Analysis history timeline
- Quick action buttons
- Statistics cards (Total Analyses, Current Streak, Improvement)
- Daily skincare tips

### 💬 AI Chat Assistant
- Floating chat button (bottom-right)
- Expandable chat window
- Message history
- Real-time responses (simulated)
- Personalized skincare suggestions

### 🧭 Navigation
- Sticky top navbar
- Logo with gradient
- Responsive mobile menu
- Active page indicators
- Login/Get Started CTAs

### 📄 Footer
- Company information
- Quick links
- Legal pages
- Contact information
- Disclaimer

## Design System

### Color Palette
- **Sage Green** (`#8b9a8d`): Primary brand color
- **Soft Pink** (`#ffd4d4`): Accent color
- **Light Beige** (`#f5e9e4`): Secondary backgrounds
- **Warm White** (`#fdfbf8`): Main background

### Typography
- Clean, modern sans-serif fonts
- Responsive heading sizes
- Accessible contrast ratios

### Components
- **Rounded cards** (12-16px radius)
- **Subtle shadows** for depth
- **Smooth transitions** (200-300ms)
- **Gradient accents** for visual interest

### Responsive Design
- Mobile-first approach
- Breakpoints: Mobile (< 768px), Tablet (768-1024px), Desktop (> 1024px)
- Flexible grid layouts
- Touch-friendly UI elements

## Technology Stack

- **React** - UI framework
- **React Router** - Navigation
- **Tailwind CSS v4** - Styling
- **Lucide React** - Icons
- **Recharts** - Data visualization
- **Motion (Framer Motion)** - Animations
- **Radix UI** - Accessible components
- **TypeScript** - Type safety

## Pages & Routes

- `/` - Landing Page
- `/login` - Login/Signup Page
- `/assessment` - Skin Assessment Questionnaire
- `/upload` - Image Upload & Analysis
- `/results` - Analysis Results & Skincare Routine
- `/dashboard` - User Dashboard

## User Flow

1. **Landing Page** → User learns about the platform
2. **Assessment** → User completes questionnaire OR uploads image
3. **Results** → User receives personalized skincare routine
4. **Dashboard** → User tracks progress and views history
5. **Chat Assistant** → User gets ongoing support

## Key Features

✅ Fully responsive design (mobile, tablet, desktop)  
✅ Modern, clean, dermatology-inspired aesthetic  
✅ Soft pastel color palette  
✅ Card-based UI with subtle shadows  
✅ Interactive questionnaire with progress tracking  
✅ Drag-and-drop image upload  
✅ AI-powered analysis simulation  
✅ Personalized morning & night routines  
✅ Progress tracking with charts  
✅ Floating chat assistant  
✅ Complete user authentication flow  
✅ Analysis history & comparison  
✅ Accessibility features  
✅ Smooth animations & transitions  

## Frontend-Only Implementation

This is a **frontend-only** application with:
- Mock data for demonstrations
- Simulated AI analysis (3-second delay)
- Local state management
- No backend API calls
- Privacy-focused (no data storage)

## Design Principles

1. **Minimal & Professional**: Clean layouts with purposeful white space
2. **Trustworthy**: Healthcare-tech aesthetic with soft colors
3. **User-Friendly**: Intuitive navigation and clear CTAs
4. **Accessible**: WCAG AA compliant color contrast
5. **Responsive**: Seamless experience across all devices

## Components Library

### Reusable Components
- `Navbar` - Top navigation with mobile menu
- `Footer` - Site footer with links
- `ChatAssistant` - Floating chat widget
- `LoadingSpinner` - Loading state component
- UI components from Radix UI (Button, Card, Input, etc.)

## Notes

- All analysis results are simulated (frontend only)
- Images are not stored or processed on any server
- This is a demonstration/educational project
- For production use, integrate with actual AI APIs and backend

## Disclaimer

This application is for educational and demonstration purposes only. The AI recommendations are simulated and should not be used as medical advice. Always consult a licensed dermatologist for professional skincare guidance.

---

**Built with ❤️ using modern web technologies**
