import type { Opening } from '../../types';

const frenchDefense: Opening = {
  id: 'french-defense',
  name: 'French Defense',
  eco: 'C02',
  side: 'black',
  summary:
    "A solid, strategic answer to 1.e4 where Black plays 1...e6 followed by 2...d5, challenging White's center while accepting a slightly cramped but very sturdy position with clear pawn-break plans.",
  whyBeginner:
    'The French teaches structure and planning: Black gets a reliable setup, a clear pawn break with ...c5, and rarely falls for early tactics. You learn to play with a plan rather than memorize forcing lines.',
  keyIdeas: [
    'Challenge the center with ...e6 and ...d5',
    'Use the ...c5 pawn break to hit the d4 pawn',
    'Develop pieces behind the solid pawn chain',
    'Watch the slightly passive light-squared bishop and aim to activate it',
    'Castle early and keep the king safe',
  ],
  variations: [
    {
      id: 'advance',
      name: 'Advance Variation',
      trigger: 'A common beginner reply: White grabs space with 3.e5.',
      steps: [
        {
          san: 'e4',
          explanation: 'White takes the center.',
        },
        {
          san: 'e6',
          explanation:
            'Black prepares ...d5, the foundation of the French Defense.',
        },
        {
          san: 'd4',
          explanation: 'White builds a broad pawn center.',
        },
        {
          san: 'd5',
          explanation: 'Black challenges the center at once.',
        },
        {
          san: 'e5',
          explanation: "White pushes by to gain space — the Advance Variation.",
        },
        {
          san: 'c5',
          explanation:
            "Black's key break, hitting the base of White's pawn chain at d4.",
        },
        {
          san: 'c3',
          explanation: 'White props up the d4 pawn.',
        },
        {
          san: 'Nc6',
          explanation: 'Black develops and adds pressure to d4.',
        },
        {
          san: 'Nf3',
          explanation: 'White develops and defends d4 again.',
        },
        {
          san: 'Qb6',
          explanation:
            'Black eyes d4 and the b2 pawn, a typical French queen sortie.',
        },
        {
          san: 'Be2',
          explanation: 'White develops the bishop and prepares to castle.',
        },
        {
          san: 'Nh6',
          explanation:
            'Black routes the knight toward f5 to pile on d4, avoiding ...Nf6 which e5 blocks.',
        },
      ],
    },
    {
      id: 'exchange',
      name: 'Exchange Variation',
      trigger: 'If White simplifies with the Exchange Variation 3.exd5.',
      steps: [
        {
          san: 'e4',
          explanation: 'White takes the center.',
        },
        {
          san: 'e6',
          explanation: 'Black prepares ...d5.',
        },
        {
          san: 'd4',
          explanation: 'White builds the center.',
        },
        {
          san: 'd5',
          explanation: 'Black strikes at the center.',
        },
        {
          san: 'exd5',
          explanation: "White trades — the symmetrical Exchange Variation.",
        },
        {
          san: 'exd5',
          explanation:
            'Black recaptures, freeing the once-passive light-squared bishop.',
        },
        {
          san: 'Nf3',
          explanation: 'White develops a knight.',
        },
        {
          san: 'Nf6',
          explanation: 'Black develops symmetrically toward the center.',
        },
        {
          san: 'Bd3',
          explanation: 'White develops the bishop to an active square.',
        },
        {
          san: 'Bd6',
          explanation: 'Black mirrors, placing the bishop on a good diagonal.',
        },
        {
          san: 'O-O',
          explanation: 'White castles to safety.',
        },
        {
          san: 'O-O',
          explanation: 'Black castles too, with a balanced, easy position.',
        },
      ],
    },
    {
      id: 'tarrasch',
      name: 'Tarrasch Variation',
      trigger: 'If White plays the flexible Tarrasch with 3.Nd2.',
      steps: [
        {
          san: 'e4',
          explanation: 'White takes the center.',
        },
        {
          san: 'e6',
          explanation: 'Black prepares ...d5.',
        },
        {
          san: 'd4',
          explanation: 'White builds the center.',
        },
        {
          san: 'd5',
          explanation: 'Black challenges the center.',
        },
        {
          san: 'Nd2',
          explanation:
            "White develops the knight to d2 — the Tarrasch, keeping the c-pawn free and avoiding a pin.",
        },
        {
          san: 'c5',
          explanation:
            'Black hits the center immediately, exploiting that d2 blocks the d4 defender.',
        },
        {
          san: 'exd5',
          explanation: 'White clarifies the center.',
        },
        {
          san: 'exd5',
          explanation:
            'Black recaptures with the e-pawn, opening lines for the pieces.',
        },
        {
          san: 'Ngf3',
          explanation: 'White develops the kingside knight.',
        },
        {
          san: 'Nc6',
          explanation: 'Black develops and pressures d4.',
        },
        {
          san: 'Bb5',
          explanation: 'White pins the knight to add pressure on the center.',
        },
        {
          san: 'Bd6',
          explanation:
            'Black develops the bishop actively, ready to castle and play around the isolated pawn.',
        },
      ],
    },
  ],
};

export default frenchDefense;
