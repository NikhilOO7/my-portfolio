# JARVIS Portfolio Website

![JARVIS Portfolio](https://img.shields.io/badge/Portfolio-JARVIS-1976ff.svg)
![Next.js](https://img.shields.io/badge/Next.js-15.3.0-black.svg)
![React](https://img.shields.io/badge/React-19.0.0-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-blue.svg)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0.0-38B2AC.svg)
![Three.js](https://img.shields.io/badge/Three.js-0.175.0-black.svg)
![NodeJS](https://img.shields.io/badge/Node.js-Express-green.svg)

A futuristic, AI-themed portfolio website with interactive elements, 3D visualizations, and JARVIS-inspired design.

## ✨ Features

- **Responsive Design**: Optimized for all devices using Tailwind CSS
- **3D Visualization**: Interactive brain structure using Three.js
- **AI Chatbot**: Intelligent assistant that answers questions about my skills and experience
- **Voice Control**: Navigate the site with voice commands
- **Music Player**: Background music with YouTube integration
- **Dynamic Content**: Animated sections using Framer Motion
- **Contact Form**: Email integration for direct communication
- **Interactive Map**: Location visualization with Leaflet
- **Continuous Deployment**: Automated deployment with Jenkins

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 15.3.0
- **Language**: TypeScript
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **3D Rendering**: Three.js & React Three Fiber
- **Icons**: Lucide React & React Icons
- **Maps**: Leaflet

### Backend
- **Server**: Express.js
- **AI Integration**: OpenAI API
- **Email Service**: Nodemailer with Gmail SMTP

### DevOps
- **CI/CD**: Jenkins Pipeline
- **Deployment**: PM2
- **Version Control**: Git & GitHub

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/NikhilOO7/my-portfolio.git
   cd my-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory with the following variables:
   ```
   # OpenAI API
   OPENAI_API_KEY=your_openai_api_key

   # Email Configuration
   EMAIL_USER=your_email@gmail.com
   EMAIL_APP_PASSWORD=your_app_password
   EMAIL_TO=your_email@outlook.com
   ```

4. **Start the development server**
   ```bash
   # Frontend
   npm run dev

   # Backend
   npm run backend
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 📌 Project Structure

```
my-portfolio/
├── src/
│   ├── app/                   # Next.js app directory
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   ├── about/             # About section
│   │   ├── skills/            # Skills section
│   │   ├── projects/          # Projects showcase
│   │   ├── writings/          # Blog/articles section
│   │   ├── contact/           # Contact page
│   │   └── api/               # API routes
│   │       ├── chatbot/       # AI chatbot API
│   │       └── contact/       # Contact form API
│   │
│   ├── components/            # Reusable UI components
│   ├── assets/                # Static assets
│   ├── data/                  # Data files
│   └── backend/               # Express server
│       ├── server.ts          # Server entry point
│       ├── routes/            # API routes
│       └── services/          # Backend services
│
├── public/                    # Static files
├── next.config.ts             # Next.js configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
├── Jenkinsfile                # CI/CD pipeline
└── package.json               # Dependencies and scripts
```

## 🔧 Configuration

### Jenkins CI/CD Pipeline

The project includes a Jenkins pipeline for automated deployment. To set it up:

1. Add the following credentials to Jenkins:
   - `openai-api-key`: Your OpenAI API key
   - `email-app-password`: Your Gmail app password

2. Configure the Jenkins pipeline using the provided Jenkinsfile

### Email Service

To use the contact form:

1. Enable 2-Step Verification in your Gmail account
2. Generate an App Password
3. Add it to your environment variables

## 📝 Usage

- **Interactive Elements**: Explore the chatbot, voice control, and music player
- **Portfolio Sections**: Navigate through projects, skills, and writings
- **Contact**: Use the contact form or direct email

## 🤝 Support

If you find my projects helpful, consider supporting my work:

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://www.buymeacoffee.com/nikhil007)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [OpenAI](https://openai.com/) - For the AI integration
- [Three.js](https://threejs.org/) - For 3D visualization
- [TailwindCSS](https://tailwindcss.com/) - For styling
- [Next.js](https://nextjs.org/) - For the framework
- [Framer Motion](https://www.framer.com/motion/) - For animations

---

Designed and developed by Nikhil Bindal