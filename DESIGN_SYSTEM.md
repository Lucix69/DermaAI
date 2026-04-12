# DermaAI Design System

## Color Palette

### Primary Colors
- **Sage Green**: `#8b9a8d` - Primary brand color
- **Soft Pink**: `#ffd4d4` - Accent color
- **Light Beige**: `#f5e9e4` - Secondary background
- **Warm White**: `#fdfbf8` - Main background

### Supporting Colors
- **Soft Peach**: `#f5c5c5` - Gradients
- **Mint Green**: `#a8c4a8` - Gradients

## Typography

- **Font Family**: System fonts (default Tailwind)
- **Headings**: 
  - H1: 2xl-6xl (responsive)
  - H2: xl-4xl (responsive)
  - H3: lg-2xl (responsive)
  - H4: base-xl

## Spacing

- **Border Radius**: 
  - Cards: 12px (rounded-xl)
  - Buttons: 8px (rounded-lg)
  - Small elements: 6px (rounded-md)

- **Shadows**: Subtle, soft shadows for depth
  - Cards: shadow-lg
  - Elevated elements: shadow-xl

## Components

### Buttons
- **Primary**: Sage green background with white text
- **Secondary**: Light beige background
- **Outline**: Border with transparent background

### Cards
- White background
- Subtle border (#e8e3dd)
- 12px border radius
- Hover effects with shadow

### Inputs
- Light background (#fafaf9)
- Rounded corners
- Focus states with sage green ring

## Layout

- **Max Width**: 7xl (1280px) for main content
- **Padding**: 4-8 responsive spacing
- **Grid**: Responsive 1-3 column layouts

## Interaction States

- **Hover**: Scale 1.05 or subtle shadow increase
- **Active**: Scale 0.95
- **Focus**: Ring with primary color

## Design Principles

1. **Minimal & Clean**: Lots of white space, uncluttered layouts
2. **Soft & Trustworthy**: Rounded corners, pastel colors
3. **Healthcare Feel**: Professional yet approachable
4. **Responsive**: Mobile-first design approach
5. **Accessibility**: High contrast ratios, clear focus states

## Page Structure

### 1. Landing Page
- Hero with CTA buttons
- Features (4 cards)
- How It Works (3 steps)
- Testimonials (3 cards)
- CTA section

### 2. Login/Signup
- Centered card layout
- Social login options
- Form validation states

### 3. Assessment (Questionnaire)
- Progress bar
- Card-based questions
- Radio button selections
- Navigation buttons

### 4. Upload Image
- Drag & drop zone
- Image preview
- Guidelines sidebar
- Analysis loading state

### 5. Results
- Summary cards
- Morning routine (5 steps)
- Night routine (4 steps)
- Additional tips
- Action buttons

### 6. Dashboard
- Profile overview
- Recent analysis
- Progress chart
- History timeline
- Quick actions sidebar

### 7. Chat Assistant
- Floating button (bottom-right)
- Expandable chat window
- Message bubbles
- Input field

## Navigation

- **Sticky top navbar**: White with backdrop blur
- **Logo**: Gradient icon + brand name
- **Links**: Home, Assessment, Upload, Dashboard
- **Mobile**: Hamburger menu

## Footer

- **4 columns**: Brand, Quick Links, Legal, Contact
- Social links
- Copyright notice
- Disclaimer

## Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## Animation

- Smooth transitions (200-300ms)
- Motion/React for complex animations
- Hover effects on interactive elements
- Loading spinners for async operations

## Accessibility

- Semantic HTML
- ARIA labels where needed
- Keyboard navigation support
- Color contrast WCAG AA compliant
- Focus indicators visible
