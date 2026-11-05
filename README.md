<div align="center">

  <img src="https://img.icons8.com/isometric/96/open-book.png" alt="BookStation Logo" width="100" height="100" />

  # 📚 BookStation (Front-End)

  **A modern, responsive, and high-performance Online Bookstore & E-Library platform built with Next.js and Tailwind CSS.**

  [![Live Demo](https://img.shields.io/badge/Live_Demo-bookstationed.vercel.app-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://bookstationed.vercel.app)
  [![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0+-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

</div>

---

## 📖 Overview

**BookStation** is an interactive, modern web application designed for book lovers, students, and readers to seamlessly discover, explore, and purchase or borrow books online. Built with the powerful Next.js App Router framework, it ensures ultra-fast page loads, seamless navigation, and an intuitive user interface tailored across desktop, tablet, and mobile devices.

---

## ✨ Key Features

- 🔍 **Interactive Book Discovery:** Filter, search, and browse books by category, genre, author, and price.
- 📱 **Fully Responsive UI:** Designed mobile-first using Tailwind CSS for clean layout adaptivity.
- 🛒 **Dynamic Cart & Checkout:** Effortlessly add titles to cart and manage orders with real-time feedback.
- 🔐 **User Authentication:** Secure signup/login UI with personalized user profiles and order histories.
- ⚡ **Optimized Performance:** Server-Side Rendering (SSR) and Client Components tuned for speed and SEO.
- 🌐 **Seamless API Integration:** Fetch dynamic catalog data, manage user states, and communicate with the backend seamlessly.

---

## 🛠️ Tech Stack & Tooling

| Domain | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | [Next.js](https://nextjs.org/) | React Framework for SSR and Static Site Generation |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS framework |
| **Icons** | [Lucide React](https://lucide.dev/) / React Icons | Modern, lightweight icon sets |
| **Deployment** | [Vercel](https://vercel.com/) | Cloud platform for frontend hosting & CD/CI pipelines |

---

## 🚀 Getting Started

Follow these steps to set up and run **BookStation** locally on your machine.

### Prerequisites

Make sure you have Node.js and a package manager installed:
- **Node.js**: `v18.x` or higher
- **npm** / **yarn** / **pnpm**

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/shamsulalamcodes/bookStationFront.git
   cd bookStationFront
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add your backend API endpoint or keys:
   ```env
   NEXT_PUBLIC_API_BASE_URL=https://your-api-domain.com/api
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open in Browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application live.

---

## 📂 Project Directory Structure

```text
bookStationFront/
├── public/              # Static assets (images, icons, favicon)
├── src/
│   ├── app/             # Next.js App Router (pages & layouts)
│   ├── components/      # Reusable UI components (Navbar, Footer, Cards, Modals)
│   ├── hooks/           # Custom React hooks
│   ├── services/        # API calls & data fetching logic
│   ├── styles/          # Global styles & Tailwind configs
│   ├── types/           # TypeScript interfaces & types (if applicable)
│   └── utils/           # Helper functions & utility methods
├── .env.local           # Environment variables
├── next.config.js       # Next.js configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── package.json         # Dependencies & project scripts
```

---

## 🛠️ Scripts & Commands

| Command | Description |
| :--- | :--- |
| `npm run dev` | Runs the app in development mode at `localhost:3000` |
| `npm run build` | Builds the optimized production application |
| `npm run start` | Starts the production server |
| `npm run lint` | Runs ESLint to check for code formatting and code quality issues |

---

## 🌍 Live Deployment

This application is deployed on Vercel. 

- **Live URL:** [bookstationed.vercel.app](https://bookstationed.vercel.app)

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/shamsulalamcodes/bookStationFront/issues).

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git checkout -b feature/AmazingFeature`)
5. Open a Pull Request

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
  <sub>Built with ❤️ by <a href="https://github.com/shamsulalamcodes">shamsulalamcodes</a></sub>
</div>