# Sentence Construction Tool

A web application that helps users practice sentence construction by filling in blanks with appropriate words.

## Features

- Interactive sentence completion exercises
- 30-second timer for each question
- 4 word options to choose from
- Ability to unselect words
- Auto-navigation to next question when timer ends
- Comprehensive result page showing:
  - Overall score
  - Correct and incorrect answers
  - Correct answers for incorrectly answered questions
- Responsive design for all screen sizes

## Tech Stack

- React 19
- TypeScript
- Tailwind CSS
- React Router
- React Icons

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Sentence-Construction-Tool
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
src/
├── components/     # Reusable components
├── contexts/       # React context providers
├── pages/          # Page components
├── types/          # TypeScript type definitions
└── App.tsx         # Main application component
```

## Key Components

- `Examination.tsx`: Main quiz interface
- `Result.tsx`: Results and feedback page
- `Timer.tsx`: 30-second countdown timer
- `Button.tsx`: Reusable button component

## Features in Detail

### Question Flow
1. Each question displays a sentence with blanks
2. Users have 4 word options to choose from
3. Timer starts automatically (30 seconds)
4. Next button enables only when all blanks are filled
5. Auto-navigation when timer expires

### Result Page
- Displays overall score out of 10
- Shows each question with:
  - User's answer
  - Correct/incorrect status
  - Correct answer (if wrong)
- Color-coded feedback based on performance

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
