# Mritunjai Singh - Portfolio Website

A modern, responsive portfolio website showcasing projects, skills, and professional experience. Built with React, TypeScript, and Tailwind CSS.

## 🌟 Features

- **Modern Design**: Clean and professional UI with smooth animations
- **Dark/Light Mode**: Toggle between themes with persistent preference
- **Responsive**: Fully responsive design that works on all devices
- **Performance Optimized**: Built with Vite for fast load times
- **SEO Friendly**: Proper meta tags and semantic HTML
- **Smooth Animations**: Intersection Observer based animations
- **Glass Morphism**: Modern glassmorphic design elements

## 🚀 Live Demo

- **Portfolio**: [Your Portfolio URL]
- **Projects**:
  - [KolamCraft](https://kolamcraft.netlify.app)
  - [MentorAid](https://mentoraid.netlify.app)
  - [Amphitheatre Booking](https://amphitheatre-booking-git-main-mritunjai-singhs-projects.vercel.app)

## 🛠️ Technologies Used

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + Radix UI
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Theme Management**: next-themes
- **Animations**: Framer Motion concepts with CSS animations

## 📦 Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/mritunjai-prog/portfolio.git
cd portfolio
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

The application will be available at `http://localhost:8080`

## 🏗️ Build & Deploy

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

### Deploy to Netlify

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
4. Deploy!

Or use the Netlify CLI:
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Vercel will auto-detect Vite settings
4. Deploy!

Or use the Vercel CLI:
```bash
npm install -g vercel
vercel --prod
```

## 📁 Project Structure

```
vivid-realm-main/
├── public/              # Static assets
├── src/
│   ├── assets/         # Images and media
│   ├── components/     # React components
│   │   ├── ui/        # shadcn/ui components
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── Experience.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── Navbar.tsx
│   │   ├── Projects.tsx
│   │   └── Skills.tsx
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utility functions
│   ├── pages/         # Page components
│   ├── App.tsx        # Main App component
│   ├── main.tsx       # Entry point
│   └── index.css      # Global styles
├── index.html
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts
```

## 🎨 Customization

### Update Personal Information

1. **Hero Section**: Edit `src/components/Hero.tsx`
2. **About Section**: Edit `src/components/About.tsx`
3. **Projects**: Edit `src/components/Projects.tsx`
4. **Skills**: Edit `src/components/Skills.tsx`
5. **Experience**: Edit `src/components/Experience.tsx`
6. **Contact Info**: Edit `src/components/Contact.tsx`

### Update Theme Colors

Edit the CSS variables in `src/index.css`:
```css
:root {
  --primary: 270 70% 50%;  /* Purple primary color */
  --accent: 280 80% 60%;   /* Accent color */
  /* ... */
}
```

### Add New Components

```bash
# Add shadcn/ui components
npx shadcn-ui@latest add [component-name]
```

## 🧪 Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🐛 Known Issues

- Some npm packages have moderate vulnerabilities (development dependencies only)
- Run `npm audit` for details

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Mritunjai Singh**
- GitHub: [@mritunjai-prog](https://github.com/mritunjai-prog)
- LinkedIn: [Mritunjai Singh](https://linkedin.com/in/mritunjai-singh)
- Email: mritunjay045k@gmail.com

## 🙏 Acknowledgments

- Built with [Lovable](https://lovable.dev)
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Icons from [Lucide](https://lucide.dev)

---

⭐ If you like this project, please give it a star on GitHub!
