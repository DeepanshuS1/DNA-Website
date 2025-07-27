# DNA - Developers of Next-Gen Applications

A professional website for the DNA coding community, built with React and Vite.

## About DNA Community

DNA (Developers of Next-Gen Applications) is a thriving coding community dedicated to fostering innovation, collaboration, and professional growth in the technology sector. Our main goals are:

- **Develop**: Create innovative next-generation applications using cutting-edge technologies
- **Network**: Build meaningful professional connections with developers worldwide
- **Achieve**: Reach career goals through continuous learning and collaboration

## Features

- **Responsive Design**: Fully responsive website that works on all devices
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Interactive Navigation**: Smooth scrolling navigation with mobile menu
- **Team Showcase**: Meet our leadership team
- **Events Section**: Stay updated with upcoming workshops and hackathons
- **Contact Form**: Get in touch with the community

## Technology Stack

- **React 19.1.0**: Modern React with latest features
- **Vite**: Fast build tool and development server
- **CSS3**: Custom CSS with Flexbox and Grid layouts
- **Google Fonts**: Inter font family for modern typography

## Project Structure

```
src/
├── components/
│   ├── Header.jsx       # Navigation header with mobile menu
│   ├── Hero.jsx         # Hero section with CTA buttons
│   ├── Goals.jsx        # Community goals showcase
│   ├── About.jsx        # About the community
│   ├── Team.jsx         # Team members display
│   ├── Events.jsx       # Upcoming events
│   ├── Contact.jsx      # Contact form and info
│   └── Footer.jsx       # Footer with social links
├── App.jsx              # Main app component
├── main.jsx             # React app entry point
└── index.css            # Global styles and responsive design
```

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd DNA-Website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Sections Overview

### 1. Home Page (Hero Section)
- Community introduction with DNA branding
- Clear value proposition
- Call-to-action buttons for engagement

### 2. Goals Section
- Three main goals: Develop, Network, Achieve
- Interactive cards with icons and descriptions
- Responsive grid layout

### 3. About Section
- Detailed community description
- Mission and vision statements
- Community values and objectives

### 4. Team Section
- Leadership team showcase
- Roles: Founder, Co-Founder, Manager, Event Lead
- Professional avatars and descriptions

### 5. Events Section
- Upcoming workshops and hackathons
- Event details with dates, times, and locations
- Interactive event cards

### 6. Contact Section
- Contact form for inquiries
- Community contact information
- Office hours and location details

## Responsive Design

The website is fully responsive with breakpoints at:
- Desktop: 1200px and above
- Tablet: 768px - 1199px
- Mobile: Below 768px

Features include:
- Mobile-first approach
- Collapsible navigation menu
- Flexible grid layouts
- Optimized typography scaling
- Touch-friendly interactive elements

## Customization

### Colors
The website uses a modern purple gradient theme:
- Primary: `#667eea` to `#764ba2`
- Text: `#333` (dark) and `#666` (medium)
- Background: `#ffffff` and `#f8f9fa`

### Typography
- Font Family: Inter (Google Fonts)
- Headings: 700, 600, 500 weight
- Body: 400 weight
- Links: 500 weight

### Components
Each component is modular and can be easily customized:
- Update team member information in `Team.jsx`
- Modify events in `Events.jsx`
- Customize goals in `Goals.jsx`
- Update contact information in `Contact.jsx`

## Deployment

### Build for Production
```bash
npm run build
```

The build files will be generated in the `dist` folder.

### Deploy to Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure redirects for SPA routing

### Deploy to Vercel
1. Connect your repository to Vercel
2. Vercel will automatically detect Vite configuration
3. Deploy with default settings

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Contact

For questions or support, please contact the DNA community at:
- Email: DNA@dnacommunity.dev
- Phone: +91 7355351255

---

Built with ❤️ by the DNA Community Team+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
