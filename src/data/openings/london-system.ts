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
  variations: [
    {
      id: 'main',
      name: 'Main Line',
      trigger: "Black sets up symmetrically with ...d5 and a Queen's-Pawn structure.",
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
    },
    {
      id: 'kings-indian-setup',
      name: "King's-Indian Setup",
      trigger: "If Black fianchettoes with ...g6 and ...Bg7, King's-Indian style.",
      steps: [
        {
          san: 'd4',
          explanation: 'White takes the center with the queen\'s pawn.',
        },
        {
          san: 'Nf6',
          explanation: 'Black develops the knight and heads for a flexible setup.',
        },
        {
          san: 'Bf4',
          explanation: 'The London bishop comes out early, outside the pawn chain.',
        },
        {
          san: 'g6',
          explanation: "Black prepares a King's-Indian fianchetto to pressure the long diagonal.",
        },
        {
          san: 'e3',
          explanation: 'White builds the solid London structure and frees the f1-bishop.',
        },
        {
          san: 'Bg7',
          explanation: "Black fianchettoes, aiming the bishop at White's center and queenside.",
        },
        {
          san: 'Nf3',
          explanation: 'White develops the knight and supports d4.',
        },
        {
          san: 'O-O',
          explanation: 'Black castles quickly behind the fianchetto.',
        },
        {
          san: 'h3',
          explanation: "A useful London prophylaxis: it stops ...Nh5 hitting the f4-bishop.",
        },
        {
          san: 'd6',
          explanation: 'Black supports a future ...e5 break in the center.',
        },
        {
          san: 'Be2',
          explanation: 'White develops modestly and prepares to castle.',
        },
        {
          san: 'Nbd7',
          explanation: 'Black develops the knight, preparing the ...e5 break.',
        },
        {
          san: 'O-O',
          explanation: 'White castles, completing a safe, harmonious setup.',
        },
        {
          san: 'e5',
          explanation: 'Black strikes in the center, the thematic counter to the London.',
        },
      ],
    },
    {
      id: 'early-c5',
      name: 'Early ...c5',
      trigger: 'If Black immediately challenges the center with an early ...c5.',
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
          explanation: 'The London bishop develops outside the pawn chain.',
        },
        {
          san: 'c5',
          explanation: "Black strikes at d4 at once, the most direct try against the London.",
        },
        {
          san: 'e3',
          explanation: 'White calmly reinforces d4 instead of releasing the tension.',
        },
        {
          san: 'Nc6',
          explanation: 'Black develops a knight and adds pressure to d4.',
        },
        {
          san: 'c3',
          explanation: 'White props up d4 with a pawn, keeping the center rock-solid.',
        },
        {
          san: 'Nf6',
          explanation: 'Black develops the second knight toward the center.',
        },
        {
          san: 'Nd2',
          explanation: 'White develops flexibly, keeping the f3 square free for the other knight.',
        },
        {
          san: 'e6',
          explanation: "Black opens the f8-bishop's diagonal and supports d5.",
        },
        {
          san: 'Ngf3',
          explanation: 'White completes the knight development, fully supporting d4.',
        },
        {
          san: 'Bd6',
          explanation: "Black offers to trade off White's strong London bishop.",
        },
        {
          san: 'Bg3',
          explanation: 'White keeps the prized bishop, sidestepping the trade.',
        },
        {
          san: 'O-O',
          explanation: 'Black castles to safety, ready to play on the queenside.',
        },
      ],
    },
  ],
};

export default londonSystem;
