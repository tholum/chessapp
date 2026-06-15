import type { Opening } from '../../types';

const queensGambit: Opening = {
  id: 'queens-gambit',
  name: "Queen's Gambit Declined",
  eco: 'D30',
  side: 'white',
  summary:
    "White offers a flank pawn to deflect Black's central pawn, gaining a strong center and easy development in a classic queen-pawn opening.",
  whyBeginner:
    "It teaches sound central control and harmonious development without sharp tactics, and the 'gambit' is safe because White can usually regain the pawn.",
  keyIdeas: [
    "Use the c4 pawn to pressure and undermine Black's d5 center",
    'Develop pieces toward the center and castle quickly',
    'Pin the f6 knight with Bg5 to increase pressure on d5',
    'Aim for the minority attack or central play in the middlegame',
    'Maintain a strong, flexible pawn center rather than rushing',
  ],
  steps: [
    {
      san: 'd4',
      explanation: "White takes the center with the queen's pawn.",
    },
    {
      san: 'd5',
      explanation: 'Black stakes an equal claim in the center.',
    },
    {
      san: 'c4',
      explanation:
        "The Queen's Gambit: White offers the c-pawn to pull Black's d-pawn away from the center.",
    },
    {
      san: 'e6',
      explanation:
        'Black declines the gambit, solidly supporting the d5 pawn and opening the f8-bishop.',
    },
    {
      san: 'Nc3',
      explanation: 'White develops a knight and adds pressure on the d5 square.',
    },
    {
      san: 'Nf6',
      explanation: 'Black develops and defends d5 again, contesting the center.',
    },
    {
      san: 'Bg5',
      explanation: 'White pins the f6 knight, increasing pressure on d5.',
    },
    {
      san: 'Be7',
      explanation: "Black breaks the pin's sting and prepares to castle.",
    },
    {
      san: 'e3',
      explanation: 'White opens a path for the f1-bishop and solidifies the center.',
    },
    {
      san: 'O-O',
      explanation: 'Black castles to safety, completing kingside development.',
    },
    {
      san: 'Nf3',
      explanation: 'White develops the last minor piece, preparing to castle.',
    },
    {
      san: 'h6',
      explanation:
        'Black questions the bishop, gaining a small kingside foothold before continuing development.',
    },
  ],
};

export default queensGambit;
