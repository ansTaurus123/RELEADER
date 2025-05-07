# Realeader - AI Mental Health Platform

An AI-powered mental health platform that matches users with therapists using FAISS for vector search and open-source Hugging Face models for therapeutic conversations.

## Features

- AI therapist matching based on user preferences and goals
- Chat interface with AI therapists powered by Hugging Face models
- FAISS vector search for finding similar therapists
- Dark-themed UI with purple accents for a calming experience

## Tech Stack

- Frontend: React + Vite with Tailwind CSS and shadcn/ui
- Backend: Node.js with Express
- Vector Search: FAISS
- AI Models: Hugging Face Transformers
- Deployment: Vercel

## Deployment Guide

### GitHub Setup

```bash
# Initialize a Git repository
git init

# Add all files to the staging area
git add .

# Commit the changes
git commit -m "Initial commit: AI-powered mental health platform"

# Create a new repository on GitHub.com through the website
# Then connect your local repository to the remote GitHub repository
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push the changes to GitHub
git push -u origin main
```

### Vercel Deployment

1. Create a Vercel account at vercel.com and connect it to your GitHub
2. Import your GitHub repository
3. Configure the project:
   - Framework Preset: Vite
   - Build Command: npm run build
   - Output Directory: dist
   - Install Command: npm install
4. Add any required environment variables
5. Deploy the project

## Development

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

## License

MIT