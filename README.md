# Word Counter - Real-Time Premium Text Analysis Engine

A highly optimized, fully responsive, and premium Word Counter web application. Built with modern web technologies, it features an elegant glassmorphic UI and powerful real-time text analysis capabilities.

## ✨ Features

- **Real-Time Analysis**: Instantly calculates word count, character count (with and without spaces), sentences, paragraphs, and reading time.
- **100% Client-Side**: All parsing and analysis happens securely in your browser. No data is ever sent to a server.
- **Multi-Format Document Support**: Upload documents directly into the editor. The app extracts raw text locally.
- **Auto-Save**: Your text is automatically saved to your browser's local storage. You won't lose your work if you accidentally close the tab.
- **Premium UI**: Designed with glassmorphism, dynamic glow effects, custom typography, and micro-animations.

## 📄 Supported File Formats

The application features built-in robust parsers for:
- `.txt`, `.md`, `.csv`, `.json` (Plain text formats)
- `.pdf` (Parsed using Mozilla's `pdfjs-dist`)
- `.docx` (Parsed using `mammoth`)

## 🛠️ Technology Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Parsers**: `mammoth` (DOCX), `pdfjs-dist` (PDF)

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository and navigate into the project directory:
```bash
git clone https://github.com/velionlabs-business/Word-Counter.git
cd Word-Counter
```

2. Install the dependencies:
```bash
npm install
```

### Development

Start the local development server:
```bash
npm run dev
```

### Build & Deploy

To build the application for production:
```bash
npm run build
```

To automatically build and deploy the application to GitHub Pages:
```bash
npm run deploy
```

## 📐 Architecture

The application strictly adheres to SOLID principles and Separation of Concerns:
- **Core Engine**: Pure TypeScript logic (`TextAnalyzer.ts`) decoupled from the UI for optimal performance.
- **Custom Hooks**: Dedicated React hooks (`useTextEngine.ts`, `useFileParser.ts`) bridge the pure logic and browser APIs with the components.
- **UI Components**: Modular, reusable React components styled with Tailwind CSS.

---
*Built with ❤️ using React & Tailwind CSS*
