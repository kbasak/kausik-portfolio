# 🚀 Kausik Basak — Developer Portfolio

> Personal portfolio website built with **Angular 19**, showcasing my experience as a Java Backend Developer with 3.6 years of professional expertise in Spring Boot, Microservices, and AWS.

🌐 **Live:** [kausikbasak.vercel.app](https://kausikbasak.vercel.app)

---

## ✨ Features

- **Hero Section** — Typewriter role animation, floating tech badges, aurora background
- **About** — Personal bio, info grid, achievement cards
- **Skills** — Categorized skill badges with staggered animations
- **Experience** — Accordion expand/collapse cards with animated indicators
- **Projects** — Domain-colored card grid (Banking, Fintech, Healthcare)
- **Education** — Degree card with animated CGPA progress bar
- **Certifications** — Badge-style cards with issuer branding
- **Contact Form** — Fully functional form powered by EmailJS (no backend required)
- **Scroll Animations** — Custom `ScrollRevealDirective` using Intersection Observer API
- **Responsive** — Mobile-first design, works across all screen sizes

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Angular 19.2 (Standalone Components) |
| Styling | Pure SCSS (no Tailwind) |
| Fonts | Syne · JetBrains Mono · DM Sans |
| Email | EmailJS v4 (`@emailjs/browser`) |
| Deployment | Vercel |
| Node | v20.20.0 |
| Angular CLI | 19.2.19 |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── core/
│   │   └── models/
│   │       └── portfolio.model.ts        ← TypeScript interfaces
│   ├── data/
│   │   └── portfolio.data.ts             ← Single source of truth
│   ├── features/
│   │   ├── hero/
│   │   ├── about/
│   │   ├── skills/
│   │   ├── experience/
│   │   ├── projects/
│   │   ├── education/
│   │   ├── certifications/
│   │   └── contact/
│   └── shared/
│       ├── components/
│       │   ├── navbar/
│       │   ├── footer/
│       │   ├── skill-badge/
│       │   └── section-title/
│       └── directives/
│           └── scroll-reveal.directive.ts
├── styles/
│   ├── _variables.scss                   ← CSS custom properties
│   ├── _typography.scss                  ← Font definitions
│   └── _animations.scss                  ← @keyframes
└── styles.scss                           ← Global reset + scroll reveal
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v20+
- Angular CLI v19+

### Installation

```bash
# Clone the repository
git clone https://github.com/basak-kausik/kausik-portfolio.git
cd kausik-portfolio

# Install dependencies
npm install

# Start development server
ng serve

# Open in browser
http://localhost:4200
```

### Build for Production

```bash
ng build
```

Output is generated in the `dist/` folder.

---

## 📧 Contact Form Setup

The contact form uses [EmailJS](https://www.emailjs.com) — no backend required.

To configure your own:
1. Create a free EmailJS account
2. Add a Gmail service → note the **Service ID**
3. Create an email template → note the **Template ID**
4. Copy your **Public Key** from Account settings
5. Replace the placeholder values in `contact.component.ts`:

```typescript
private readonly SERVICE_ID  = 'your_service_id';
private readonly TEMPLATE_ID = 'your_template_id';
private readonly PUBLIC_KEY  = 'your_public_key';
```

---

## 🎨 Design System

| Token | Value |
|---|---|
| Background | `#0a0f1e` |
| Accent | `#38bdf8` (Sky Blue) |
| Indigo | `#818cf8` |
| Emerald | `#34d399` |
| Font Display | Syne |
| Font Mono | JetBrains Mono |
| Font Body | DM Sans |

---

## 📄 License

MIT — feel free to use this as inspiration for your own portfolio.

---

*Built with ❤️ while learning Angular 19 from scratch.*