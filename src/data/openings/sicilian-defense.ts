import type { Opening } from '../../types';

const sicilianDefense: Opening = {
  id: 'sicilian-defense',
  name: 'Sicilian Defense',
  eco: 'B50',
  side: 'black',
  summary:
    'Black answers 1.e4 with 1...c5, fighting for the center asymmetrically and creating dynamic, unbalanced positions with strong counterattacking chances.',
  whyBeginner:
    'This simple ...d6/...Nc6 setup gives Black a solid, easy-to-learn structure that avoids symmetrical equality and teaches counterplay on the queenside.',
  keyIdeas: [
    'Trade a flank pawn for a central pawn to gain the half-open c-file',
    "Use the half-open c-file for rook pressure against White's queenside",
    'Develop knights actively and strike with ...e5 or ...e6 plans',
    'Aim for queenside counterplay rather than passive defense',
    'Keep the position unbalanced to play for a win as Black',
  ],
  steps: [
    {
      san: 'e4',
      explanation: "White opens with the king's pawn, grabbing the center.",
    },
    {
      san: 'c5',
      explanation:
        'Black challenges the center from the side, unbalancing the game right away.',
    },
    {
      san: 'Nf3',
      explanation: 'White develops the knight and prepares to push d4.',
    },
    {
      san: 'd6',
      explanation: "Black supports a future ...e5 or ...Nf6 and opens the c8-bishop's diagonal.",
    },
    {
      san: 'd4',
      explanation: 'White strikes in the center to open lines for the pieces.',
    },
    {
      san: 'cxd4',
      explanation: "Black captures, trading a flank pawn for White's central pawn.",
    },
    {
      san: 'Nxd4',
      explanation: 'White recaptures with the knight, reaching the Open Sicilian.',
    },
    {
      san: 'Nf6',
      explanation:
        'Black develops and attacks e4, gaining a tempo and forcing White to defend.',
    },
    {
      san: 'Nc3',
      explanation: 'White defends e4 and develops naturally toward the center.',
    },
    {
      san: 'Nc6',
      explanation:
        "Black develops the second knight, pressuring White's d4 knight and the center.",
    },
    {
      san: 'Be2',
      explanation: 'White prepares to castle with a solid, flexible setup.',
    },
    {
      san: 'e5',
      explanation:
        'Black strikes back in the center, gaining space and challenging the d4 knight (a thematic Sicilian break).',
    },
  ],
};

export default sicilianDefense;
