import type { Opening } from '../../types';

const londonSystem: Opening = {
  id: 'london-system',
  name: 'London System',
  eco: 'D02',
  side: 'white',
  summary:
    'A solid, system-based opening where White develops the dark-squared bishop to f4 early and sets up the same reliable structure against almost anything Black plays.',
  whyBeginner:
    "It's a 'system' you can play on autopilot: the same easy setup works against most defenses, so you spend less time memorizing and more time understanding plans.",
  keyIdeas: [
    'Set up the same solid structure (d4, Bf4, e3, Nf3, Bd3, c3) against most defenses',
    'Keep the dark-squared bishop active outside the pawn chain',
    'Aim for kingside attacking ideas with Ne5 and queen/bishop battery',
    'Maintain a rock-solid center that is hard to break down',
    'Spend energy on plans, not memorization, thanks to the system approach',
  ],
  steps: [
    {
      san: 'd4',
      explanation: 'White takes the center with the queen\'s pawn.',
    },
    {
      san: 'd5',
      explanation: 'Black contests the center symmetrically.',
    },
    {
      san: 'Bf4',
      explanation:
        'The London move: the bishop develops outside the pawn chain before playing e3, avoiding it getting trapped.',
    },
    {
      san: 'Nf6',
      explanation: 'Black develops a knight toward the center.',
    },
    {
      san: 'e3',
      explanation: 'White solidifies the center and opens a path for the f1-bishop.',
    },
    {
      san: 'e6',
      explanation: "Black opens the f8-bishop's diagonal and supports d5.",
    },
    {
      san: 'Nf3',
      explanation: 'White develops the knight, reinforcing the d4 pawn.',
    },
    {
      san: 'Bd6',
      explanation: "Black challenges White's active bishop by offering a trade.",
    },
    {
      san: 'Bg3',
      explanation: 'White sidesteps the trade, keeping the strong bishop on its diagonal.',
    },
    {
      san: 'O-O',
      explanation: 'Black castles to safety.',
    },
    {
      san: 'Bd3',
      explanation: "White develops the light-squared bishop, aiming at Black's kingside.",
    },
    {
      san: 'c5',
      explanation:
        'Black strikes at White\'s center, the main way to seek counterplay against the London.',
    },
  ],
};

export default londonSystem;
