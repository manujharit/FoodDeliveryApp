# FoodDeliveryApp 🍔🚴‍♂️

A full-stack food delivery web application leveraging **React (Vite)** on the frontend and an **Express (Node.js)** proxy server on the backend to elegantly fetch, transform, and serve restaurant data from the Swiggy API.

---

## ✨ Project Details & Features

This application mirrors a modern food delivery platform, utilizing real-time API integrations and offering a snappy, dynamic user experience. 

### Key Features:
- **Dynamic Restaurant Discovery**: View restaurant carousels, filter by tags, and explore new culinary options based on active datasets.
- **Detailed Menus & Offers**: Drill down into specific restaurants to view their menus, categorized items, and current promotional offers.
- **Integrated Cart System**: Users can add items to their cart, increment/decrement quantities, and review their order. Global state is efficiently managed via **Redux Toolkit**.
- **Location-Based Data**: The proxy server fetches localized restaurant data based on geographic coordinates (Latitude / Longitude).
- **Graceful Loading States**: Implements 'Shimmer' UI components to provide users with a polished experience while asynchronous data is fetching.
- **Responsive UI**: Fully responsive, mobile-first design crafted using **SCSS** following strict **BEM (Block Element Modifier)** methodology.

---

## 🚀 What Can Be Done (Future Enhancements)

While the core discovery and cart logic is robust, there are several exciting avenues for future development:

1. **User Authentication**: Implement user signup, login, and JWT-based session management.
2. **User Profiles & Order History**: Allow users to save their favorite restaurants, multiple delivery addresses, and view past orders.
3. **Dark Mode Theme**: Leverage SCSS variables to introduce a seamless night-time browsing experience.
---

## 🏗️ Project Structure

This project is built as a **monorepo** containing two main directories:

- `/client` - The frontend web application.
- `/server` - The backend API proxy server.

```text
FoodDeliveryApp/
├── client/                 # Frontend React Application
│   ├── src/                # React components, Redux slices, and utils
│   ├── tests/              # Playwright E2E tests
│   ├── package.json
│   ├── playwright.config.ts
│   └── vite.config.js
├── server/                 # Backend Node.js/Express Application
│   ├── src/
│   │   ├── clients/        # Axios clients (SwiggyClient)
│   │   ├── handlers/       # Express route handlers
│   │   ├── helpers/        # Business logic & API aggregation
│   │   ├── routes/         # Express router configurations
│   │   └── utils/          # Data transformation and filtration utilities
│   ├── index.js            # Server entry point
│   └── package.json
├── .husky/                 # Git pre-commit hooks
└── package.json            # Root configuration and workspace scripts
```

---

## 🛠️ Tech Stack & Libraries

### Frontend (`/client`)
- **Core Framework**: React 19, React Router v8
- **Build Tool**: Vite
- **State Management**: Redux Toolkit & React-Redux
- **Styling**: SCSS (Strict BEM Methodology)
- **Network**: Axios
- **Testing**: Playwright (E2E)
- **Linting & Formatting**: ESLint (v9), Stylelint, Prettier

### Backend (`/server`)
- **Core Framework**: Node.js, Express
- **Network**: Axios (for upstream API fetching)
- **Architecture**: ES Modules (`"type": "module"`)
- **Testing**: Jest (Experimental VM Modules), Supertest (API Integration), Axios-Mock-Adapter
- **Linting & Formatting**: ESLint, Prettier, Nodemon

### Workspace (Root)
- **Task Runner**: Concurrently (to run client and server simultaneously)
- **Git Hooks**: Husky & Lint-Staged (checks linting & tests diffs prior to commits)

---

## 🏁 Getting Started

### 1. Installation

To install all dependencies across the root, client, and server workspaces, simply run `npm install` in the root directory.

```bash
npm install
npm run postinstall # Installs client and server dependencies
```

### 2. Running Locally

You can spin up both the React frontend and the Express backend simultaneously using the root start script:

```bash
npm start
```
- **Frontend** will be available at: `http://localhost:3001`
- **Backend** will be available at: `http://localhost:3000`

### 3. Testing 🧪

Testing has been thoroughly configured across the stack with **>95% coverage** on the server.

To run both Playwright (E2E) and Jest (Server Integration/Unit) test suites:
```bash
npm test
```
To run tests individually:
- Client (Playwright): `cd client && npx playwright test`
- Server (Jest): `cd server && npm run test`

### 4. Code Quality & Linting 🧹

The project maintains strict code quality standards utilizing ESLint, Stylelint, and Prettier.

To lint JavaScript/React files across the workspace:
```bash
npm run lint
```
To automatically fix JS linting issues:
```bash
npm run lint:fix
```

To lint SCSS/CSS files in the client:
```bash
npm run stylelint
```
To automatically fix SCSS/CSS linting issues:
```bash
npm run stylelint:fix
```

> **Note**: A Husky `pre-commit` hook is actively configured. Attempting to commit code that breaks ESLint rules or fails related test cases will safely abort the commit.

### 5. Cleaning & Reinstalling 🧹

If you need to perform a fresh install, clean `node_modules`, npm cache, and ensure you're on the correct Node version (via `.nvmrc`):
```bash
npm run clean
```

---

## 📬 Contact Information

**Manuj Haritwal**
- **Email**: manuj.haritwal01@gmail.com
- **GitHub**: [manujharit](https://github.com/manujharit)