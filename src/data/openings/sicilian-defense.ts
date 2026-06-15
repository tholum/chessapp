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
  variations: [
    {
      id: 'main',
      name: 'Main Line',
      trigger: 'If White plays the Open Sicilian with an early Nf3 and d4.',
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
    },
    {
      id: 'closed-sicilian',
      name: 'Closed Sicilian',
      trigger: 'If White avoids d4 and plays the Closed Sicilian with Nc3 and g3.',
      steps: [
        {
          san: 'e4',
          explanation: "White opens with the king's pawn, grabbing the center.",
        },
        {
          san: 'c5',
          explanation: 'Black answers with the Sicilian, fighting for the center asymmetrically.',
        },
        {
          san: 'Nc3',
          explanation: 'White develops the knight instead of striking with d4 (the Closed Sicilian).',
        },
        {
          san: 'Nc6',
          explanation: 'Black develops a knight and stakes a claim on the center.',
        },
        {
          san: 'g3',
          explanation: "White prepares to fianchetto the bishop for a slow, maneuvering game.",
        },
        {
          san: 'g6',
          explanation: 'Black mirrors the plan, heading for a strong fianchettoed bishop on g7.',
        },
        {
          san: 'Bg2',
          explanation: "White's bishop takes its home on the long diagonal.",
        },
        {
          san: 'Bg7',
          explanation: "Black's bishop eyes the center and White's queenside down the long diagonal.",
        },
        {
          san: 'd3',
          explanation: 'White supports e4 and keeps a flexible, closed structure.',
        },
        {
          san: 'd6',
          explanation: 'Black mirrors, supporting a later ...e5 and freeing the c8-bishop.',
        },
        {
          san: 'Nge2',
          explanation: 'White develops the knight to e2, keeping the f-pawn free to advance.',
        },
        {
          san: 'e5',
          explanation: 'Black grabs central space, a typical equalizing break in the Closed Sicilian.',
        },
      ],
    },
    {
      id: 'alapin',
      name: 'Alapin Variation',
      trigger: 'If White plays the Alapin with 2.c3, preparing a big pawn center.',
      steps: [
        {
          san: 'e4',
          explanation: "White opens with the king's pawn, grabbing the center.",
        },
        {
          san: 'c5',
          explanation: 'Black answers with the Sicilian, unbalancing the position.',
        },
        {
          san: 'c3',
          explanation: 'The Alapin: White prepares d4 to build a broad pawn center.',
        },
        {
          san: 'Nf6',
          explanation: "Black attacks e4 at once, a precise reply that hits White's setup.",
        },
        {
          san: 'e5',
          explanation: 'White pushes the pawn forward, kicking the knight to gain time.',
        },
        {
          san: 'Nd5',
          explanation: 'Black hops to d5, a strong central square where the knight is safe.',
        },
        {
          san: 'd4',
          explanation: 'White builds the broad center the Alapin aims for.',
        },
        {
          san: 'cxd4',
          explanation: 'Black captures to chip away at the center before it gets too big.',
        },
        {
          san: 'Nf3',
          explanation: 'White develops the knight, planning to recapture on d4.',
        },
        {
          san: 'Nc6',
          explanation: 'Black develops and adds pressure to the d4 pawn.',
        },
        {
          san: 'cxd4',
          explanation: 'White recaptures, reaching an open center with an isolated d-pawn.',
        },
        {
          san: 'd6',
          explanation: 'Black undermines the e5 pawn, the spearhead of White\'s center.',
        },
      ],
    },
  ],
};

export default sicilianDefense;
