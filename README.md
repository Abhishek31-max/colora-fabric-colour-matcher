# Colora – Fabric Colour Matcher

A premium, full-stack web application designed to help users find the perfect fabric matches using AI-powered color analysis.

## Features
- **Intelligent Colour Matching**: Uses CIELAB color space and Delta E (CIE76) formula for perceptual color matching accuracy.
- **Image Analysis**: Client-side color extraction using Canvas API.
- **Modern UI**: Minimalistic, professional design with smooth Framer Motion animations.
- **Real-time Results**: Dynamic match percentage and stock availability display.
- **Responsive**: Seamless experience on both desktop and mobile devices.

## Tech Stack
- **Frontend**: Next.js 15+ (App Router), React 19, Framer Motion, Lucide Icons.
- **Backend**: Next.js API Routes.
- **Database**: MongoDB Atlas.
- **Styling**: Vanilla CSS (Tailwind-free for maximum flexibility).

## Getting Started

### 1. Prerequisites
- Node.js (Latest LTS)
- MongoDB Atlas account (or local MongoDB)

### 2. Environment Setup
Create a `.env.local` file in the root directory:
```env
MONGODB_URI=your_mongodb_connection_string
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Seed Data
Populate the database with sample fabric items:
```bash
node src/scripts/seed.js
```

### 5. Run Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

## Deployment on Vercel
1. Push the code to a GitHub repository.
2. Link the repository to your Vercel project.
3. Add the `MONGODB_URI` environment variable in the Vercel Dashboard.
4. Deploy!

## Testing
To run the included unit tests:
```bash
npm test
```
(Note: You may need to set up a test runner like Jest if not already configured in your environment).
