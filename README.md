# Password Analyzer

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Password Analyzer** is a modern, 100% client-side security tool that helps you quantify password security before adversaries do. It evaluates password entropy, crack time, estimated compute cost, and identifies common vulnerabilities and patterns—all happening instantaneously in your browser with zero data transmission.

## ✨ Features

- **Live Evaluation Engine:** Instantly evaluates password entropy and applies heuristic penalties for patterns, repeated characters, and keyboard walks.
- **Actionable Tips:** Provides dynamic tips and feedback on how to improve your password strength based on its specific characteristics.
- **100% Client-Side:** Absolute privacy. Your passwords never leave your device and are never sent to a backend API. Network interception is mathematically impossible.
- **Secure Password Generator:** Includes a built-in cryptographically secure password generator for creating strong, uncrackable passwords.
- **Test Bench:** An interactive widget to explore and verify the heuristic rules and penalties used by the engine.
- **Beautiful UI/UX:** Styled with Tailwind CSS and enhanced with smooth, micro-interactions powered by Framer Motion.

## 🛠️ Technology Stack

- [Next.js](https://nextjs.org/) (React Framework)
- [TypeScript](https://www.typescriptlang.org/) (Strict typing)
- [Tailwind CSS](https://tailwindcss.com/) (Styling & Layout)
- [Framer Motion](https://www.framer.com/motion/) (Animations)
- [Lucide React](https://lucide.dev/) (Icons)
- [Jest](https://jestjs.io/) (Testing)

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps:

### Prerequisites

You need Node.js and npm (or yarn/pnpm) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/AdhavBai/password-analyzer.git
   ```

2. Navigate into the project directory:
   ```bash
   cd password-analyzer
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```
   *(or `yarn install` / `pnpm install`)*

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## 🧪 Testing

The project uses Jest for unit testing, especially for validating the core evaluation engine rules.

Run the test suite with:
```bash
npm run test
```

## 🧠 Methodology

Our evaluation engine combines raw Shannon entropy calculations with heuristic penalty deductions to accurately model real-world vulnerabilities.
- **Raw Entropy:** Calculated based on the character sets utilized and total string length, mapping it to estimated crack times and monetary compute costs.
- **Heuristic Penalties:** Entropy alone can be deceiving. The engine actively deducts points for predictable patterns, sequences (e.g., `abc`, `123`), repeated characters (e.g., `aaaa`), and keyboard walks (e.g., `qwerty`).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/AdhavBai/password-analyzer/issues).

## 📄 License

This project is licensed under the MIT License.
