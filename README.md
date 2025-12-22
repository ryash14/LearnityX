# LearnityX

A modern, AI-powered mock interview platform built with React, TypeScript, and Google's Generative AI. This application helps users prepare for job interviews by generating custom interview questions and providing real-time feedback on their responses.

## 🔗 Repository

[https://github.com/ryash14/LearnityX](https://github.com/ryash14/LearnityX)

## Features

### 🎯 Core Functionality
- **AI-Generated Interview Questions** - Leverages Google's Generative AI to create tailored interview questions based on job role, experience level, and tech stack
- **Real-Time Interview Simulation** - Conduct mock interviews with webcam recording and speech-to-text capabilities
- **Intelligent Feedback System** - Receive detailed AI-powered feedback on your interview responses
- **Personalized Dashboard** - Track your interview history and progress over time

### 🔐 Authentication & Security
- Secure user authentication powered by Clerk
- Protected routes for authenticated users only
- Session management and user profile handling

### 🎨 User Experience
- Modern, responsive UI built with Radix UI components
- Dark/Light theme support with next-themes
- Smooth animations with Tailwind CSS
- Intuitive navigation and breadcrumb system

### 🎤 Interview Features
- **Webcam Integration** - Record yourself during mock interviews
- **Speech-to-Text** - Convert your spoken answers to text automatically
- **Custom Interview Creation** - Create and edit interview sessions with specific parameters
- **Question Management** - Navigate through multiple interview questions seamlessly
- **Performance Tracking** - Review feedback and improve your interview skills

## Tech Stack

### Frontend
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **React Router v7** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework

### UI Components
- **Radix UI** - Accessible, unstyled component primitives
- **Lucide React** - Beautiful icon library
- **Sonner** - Toast notifications
- **React Fast Marquee** - Smooth scrolling animations

### Backend & Services
- **Firebase** - Backend services and data storage
- **Google Generative AI** - AI-powered question generation and feedback
- **Clerk** - Authentication and user management

### Form & Validation
- **React Hook Form** - Performant form handling
- **Zod** - TypeScript-first schema validation

### Additional Features
- **React Webcam** - Camera integration
- **React Hook Speech to Text** - Voice recognition

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm
- Firebase account
- Clerk account
- Google AI API key

### Installation

1. Clone the repository
```bash
git clone https://github.com/ryash14/LearnityX.git
cd LearnityX
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables

Create a `.env.local` file in the root directory:

```env
# Clerk Authentication
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id

# Google AI
VITE_GOOGLE_API_KEY=your_google_ai_api_key
```

4. Start the development server
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
├── src/
│   ├── assets/          # Static assets
│   ├── components/      # Reusable UI components
│   │   └── ui/         # Radix UI component wrappers
│   ├── config/         # Configuration files
│   ├── handlers/       # Business logic handlers
│   ├── layouts/        # Layout components
│   ├── lib/            # Utility functions
│   ├── provider/       # Context providers
│   ├── routes/         # Page components
│   ├── scripts/        # Utility scripts
│   ├── types/          # TypeScript type definitions
│   ├── App.tsx         # Main application component
│   └── main.tsx        # Application entry point
├── public/             # Public static files
├── .env.local          # Environment variables
├── vite.config.ts      # Vite configuration
├── tailwind.config.js  # Tailwind CSS configuration
└── tsconfig.json       # TypeScript configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Deployment

### Firebase Hosting

This project is configured for Firebase Hosting deployment.

1. Install Firebase CLI
```bash
npm install -g firebase-tools
```

2. Login to Firebase
```bash
firebase login
```

3. Build the project
```bash
npm run build
```

4. Deploy to Firebase
```bash
firebase deploy
```

## Key Routes

- `/` - Landing page
- `/signin` - User sign in
- `/signup` - User registration
- `/generate` - Dashboard (protected)
- `/generate/:interviewId` - Create/Edit interview (protected)
- `/generate/interview/:interviewId` - Interview preparation (protected)
- `/generate/interview/:interviewId/start` - Start mock interview (protected)
- `/generate/feedback/:interviewId` - View feedback (protected)

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Google Generative AI for powering the interview question generation
- Clerk for seamless authentication
- Firebase for backend infrastructure
- Radix UI for accessible component primitives
- The open-source community for amazing tools and libraries
