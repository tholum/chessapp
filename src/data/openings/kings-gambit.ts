import type { Opening } from '../../types';

const kingsGambit: Opening = {
  id: 'kings-gambit',
  name: "King's Gambit",
  eco: 'C33',
  side: 'white',
  summary:
    "One of the oldest and most romantic openings, where White sacrifices the f-pawn with 2.f4 to rip open the center and the f-file, aiming for rapid development and a fierce attack on Black's king.",
  whyBeginner:
    'The King’s Gambit is a wonderful way to learn the value of the initiative: you give up a pawn for fast development, open lines, and attacking chances. It teaches you to play actively and punish slow defense.',
  keyIdeas: [
    'Sacrifice the f-pawn to open the f-file and center',
    'Develop quickly and aim at the f7 weakness',
    'Castle kingside to put the rook on the open f-file',
    'Play actively to justify the gambit pawn',
    'Strike in the center with d4 to free your pieces',
  ],
  variations: [
    {
      id: 'accepted-knight',
      name: "King's Gambit Accepted: Knight Defense",
      trigger: 'If Black plays 2...exf4, accepting the gambit, then defends with 3...g5.',
      steps: [
        {
          san: 'e4',
          explanation: 'White claims the center and opens lines for the pieces.',
        },
        {
          san: 'e5',
          explanation: 'Black mirrors, contesting the center.',
        },
        {
          san: 'f4',
          explanation:
            'The King’s Gambit: White offers the f-pawn to open lines and seize the initiative.',
        },
        {
          san: 'exf4',
          explanation:
            'Black accepts the gambit, winning a pawn but giving White open lines.',
        },
        {
          san: 'Nf3',
          explanation:
            'White develops the knight and prevents Black’s ...Qh4+ check.',
        },
        {
          san: 'g5',
          explanation:
            'Black grabs space and tries to hold onto the extra f4 pawn.',
        },
        {
          san: 'h4',
          explanation:
            'White challenges the g5 pawn at once, trying to pry open Black’s kingside.',
        },
        {
          san: 'g4',
          explanation:
            'Black pushes forward, attacking the f3-knight to keep the extra pawn.',
        },
        {
          san: 'Ne5',
          explanation:
            'White hops into the strong e5 outpost (the Kieseritzky), eyeing f7 and g4.',
        },
        {
          san: 'Nf6',
          explanation:
            'Black develops the knight and prepares to challenge White’s center.',
        },
        {
          san: 'd4',
          explanation:
            'White builds a powerful pawn center and opens the c1-bishop toward f4.',
        },
        {
          san: 'd6',
          explanation:
            'Black hits the e5-knight, forcing it to declare its intentions.',
        },
        {
          san: 'Nd3',
          explanation:
            'The knight retreats to d3, where it defends f4 and stays active.',
        },
      ],
    },
    {
      id: 'falkbeer',
      name: 'Falkbeer Countergambit',
      trigger: 'If Black declines with 2...d5, striking in the center instead of taking on f4.',
      steps: [
        { san: 'e4', explanation: 'White takes the center.' },
        { san: 'e5', explanation: 'Black contests the center.' },
        {
          san: 'f4',
          explanation: 'White offers the King’s Gambit.',
        },
        {
          san: 'd5',
          explanation:
            'The Falkbeer Countergambit: Black counterattacks in the center instead of grabbing on f4.',
        },
        {
          san: 'exd5',
          explanation: 'White captures the d5 pawn, opening the center.',
        },
        {
          san: 'e4',
          explanation:
            'Black pushes the pawn forward, gaining space and cramping White.',
        },
        {
          san: 'd3',
          explanation:
            'White challenges the advanced e4 pawn to dissolve Black’s spearhead.',
        },
        {
          san: 'Nf6',
          explanation:
            'Black develops the knight and prepares to regain the d5 pawn.',
        },
        {
          san: 'dxe4',
          explanation: 'White captures, simplifying and staying a pawn up.',
        },
        {
          san: 'Nxe4',
          explanation:
            'Black recaptures with the knight, reaching an active but balanced position.',
        },
        {
          san: 'Nf3',
          explanation:
            'White develops the knight, controls the center, and prepares to castle.',
        },
        {
          san: 'Bc5',
          explanation:
            'Black develops the bishop actively, eyeing White’s weakened kingside.',
        },
      ],
    },
  ],
};

export default kingsGambit;
