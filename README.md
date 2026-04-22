<div align="center">
  <h1>✨ DermaAI ✨</h1>
  <p><strong>Your Personal AI-Powered Skincare Assistant</strong></p>
</div>

<br />

## 📖 About The Project

**DermaAI** is a modern Full-Stack web application designed to revolutionize personal skincare routines. Finding the right skincare products and understanding your skin type can be an expensive, overwhelming, and frustrating journey. DermaAI bridges this gap by acting as your personal dermatologist.

Users can take a comprehensive assessment questionnaire, receive tailored skincare routines, and **upload a picture of their face for an immediate AI analysis**—all from an incredibly intuitive and seamless dashboard. 

### 🛡️ Why is it helpful? (Privacy First)
* **Zero Image Storage:** To strictly maintain user privacy, all uploaded photos are handled directly in **server RAM (in-memory)** for real-time analysis and are **instantly discarded**. Your pictures are *never* stored in our database or server files.
* **Continuous Tracking:** Track your skin's health progress over time with built-in analytics, current streaks, and historical logs.
* **Tailored Routines:** Stop guessing. Get customized morning and evening skincare regimens based on data-driven feedback.

---

## 💻 Full-Stack Architecture & Technologies

This project is built using a highly scalable, modern SERN/PERN-like stack.

### 🎨 Frontend (Client)
* **Core:** React 18, Vite, TypeScript
* **Styling:** Tailwind CSS
* **Components:** Shadcn UI & Radix UI (Accessible, customizable UI)
* **Routing:** React Router DOM
* **Data Visualization:** Recharts
* **Icons:** Lucide React

### ⚙️ Backend (Server)
* **Core:** Node.js, Express.js, TypeScript
* **Authentication:** JWT (JSON Web Tokens), Bcrypt (Password Hashing)
* **File Uploads:** Multer (MemoryStorage engine for strict privacy)
* **Architecture:** RESTful API principles

### 🗄️ Database layer
* **Database:** SQLite (Lightweight & efficient relational database)
* **ORM:** Prisma (Type-safe database interactions and schema management)

---

## 🚀 Key Features

* **Secure Authentication:** Full JWT-based registration and login system with encrypted passwords.
* **Smart Dashboard:** A visually stunning dashboard featuring real-time health progress charts, analysis history, and daily skincare tips.
* **Dynamic AI Assessments:** Answer key questions about your lifestyle and skin concerns to get actionable data.
* **Camera & File Integration:** Effortlessly upload images directly from your device's file system or snap a picture right from your camera.
* **Database Driven:** Clean tracking of total analyses and historical data safely securely within a relational database.

---

## 🛠️ Getting Started (Local Development)

Follow these steps to run DermaAI locally on your machine.

### Prerequisites
* [Node.js](https://nodejs.org/en/) (v18+)
* [pnpm](https://pnpm.io/) (Recommended) or npm

### 1. Clone the repository
```bash
git clone https://github.com/Lucix69/DermaAI.git
cd DermaAI
```

### 2. Frontend Setup
```bash
# Install frontend dependencies
pnpm install

# Start the Vite development server
pnpm run dev
```

### 3. Backend Setup
Open a new terminal and navigate to the backend folder:
```bash
cd backend

# Install backend dependencies
pnpm install

# Set up Prisma Database
pnpm exec prisma generate
pnpm exec prisma migrate dev --name init

# Start the Express server
pnpm run dev
```

Your frontend should now be running on `http://localhost:5173` and connected to your local backend API!

---
