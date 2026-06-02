# 🏯 JQuest — Learn Japanese Through Adventure

**JQuest** is a gamified Japanese-language tutor built as a single-page web app. Progress through six themed worlds — from basic Hiragana to advanced Kanji mastery — while battling yokai in turn-based RPG combat powered by the vocabulary you learn.

---

## ✨ Features

- **6 Worlds, 200+ Lessons** — Hiragana & Katakana, Grammar Forge, Core 2000 Vocabulary, Kanji Chronicles, and a mixed-review Mastery Gauntlet
- **RPG Combat** — Battle Japanese yokai (kitsune, tengu, oni, yuki-onna, and more) using spell cards fueled by your knowledge
- **Interactive Mini-Games** — Character Match, Fill-in-the-Blank, Sentence Builder, and Conversation challenges
- **Audio Pronunciation** — 500+ native-speaker audio clips for kana, words, and phrases
- **Spellbook** — Track every character and word you've learned in your personal JSpellbook
- **Mascot Companions** — Unlock cute mascots that guide and encourage you
- **Progress Persistence** — Your progress is saved locally in the browser via Zustand

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [React 19](https://react.dev) + [TypeScript](https://typescriptlang.org) |
| Build | [Vite 7](https://vite.dev) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) |
| State | [Zustand 5](https://zustand.docs.pmnd.rs) |
| Animation | [Framer Motion](https://motion.dev) |
| Routing | [React Router 7](https://reactrouter.com) |
| Icons | [Lucide React](https://lucide.dev) |

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org) v18 or higher
- npm (comes with Node.js)

### Install & Run

```bash
# Clone the repository
git clone https://github.com/warlockmonti/JQuest.git
cd JQuest

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will open at **http://localhost:5174**.

### Build for Production

```bash
npm run build
npm run preview
```

## 🎮 How to Play

1. **Landing Page** — Start your journey and choose your mascot companion
2. **Dashboard** — Pick a world and select a lesson
3. **Lessons** — Learn through interactive slides covering kana, vocabulary, grammar, or kanji
4. **Practice** — Reinforce what you learned with mini-games (Character Match, Fill-in-the-Blank, Sentence Builder)
5. **RPG Combat** — Battle yokai by answering questions correctly to deal damage with spell cards

## 📁 Project Structure

```
JQuest/
├── public/
│   ├── audio/          # 500+ pronunciation WAV files
│   ├── assets/         # Yokai & protagonist sprites
│   └── mascots/        # Mascot companion images
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── games/      # Mini-game components (RPGCombat, CharacterMatch, etc.)
│   │   └── ui/         # Base UI components (Button, KanaHover)
│   ├── data/           # Lesson content, kana data, RPG data
│   ├── hooks/          # Custom hooks (useAudio, useSpeechRecognition)
│   ├── lib/            # Utilities (question generator, pixel sprites)
│   ├── pages/          # Route pages (Landing, Dashboard, Lesson, RPG)
│   └── store/          # Zustand stores (game state, RPG state)
├── index.html
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## 📄 License

MIT
