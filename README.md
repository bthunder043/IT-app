# ITFinder Nigeria 🇳🇬⚡

A modern dark-themed React app for Computer Engineering students to find industrial training (IT) placements at top Nigerian tech companies.

## Features

- 🔍 **Browse & Search** – 12 Nigerian tech companies with filters by category, sort by rating/slots/name
- 🏢 **Company Details Modal** – Full contact info (email, phone, website, LinkedIn, Instagram), open positions, duration, about
- 📝 **Apply Form** – Multi-section form with validation; saves application to localStorage
- 📋 **My Applications** – View all submitted applications with status tracking; delete applications
- 📱 **Fully Responsive** – Mobile-first design that works on all screen sizes
- 🌑 **Dark Theme** – Vibrant cyan, green, orange, and purple accents on deep dark backgrounds

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Install & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app runs at **http://localhost:5173**

## Tech Stack
- **React 18** + **Vite 5**
- CSS Modules (no external UI library)
- Google Fonts: Syne (display) + DM Sans (body)
- localStorage for persisting applications

## Companies Featured
1. Andela Nigeria
2. Flutterwave  
3. Paystack
4. Interswitch Group
5. Konga Online Shopping
6. MTN Nigeria
7. Cowrywise
8. SystemSpecs
9. Softcom Limited
10. IHS Towers Nigeria
11. Carbon (OneFi)
12. Terragon Group

## Pages
| Page | Route | Description |
|------|--------|-------------|
| Companies | `home` | Browse and filter all companies |
| Apply | `apply` | Submit an application |
| My Applications | `applications` | View saved applications |

---

Built for Nigerian Computer Engineering students 🎓
