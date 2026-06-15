import type { Opening } from '../../types';

const englishOpening: Opening = {
  id: 'english-opening',
  name: 'English Opening',
  eco: 'A10',
  side: 'white',
  summary:
    "A flexible flank opening where White plays 1.c4, staking a claim on the d5 square from the side and steering the game into rich positional waters without committing the center pawns early.",
  whyBeginner:
    "It teaches control of the center from the flank, flexible piece development, and the powerful fianchettoed bishop on g2. The plans are calm and instructive, with fewer sharp memorized traps than 1.e4 openings.",
  keyIdeas: [
    'Use the c4 pawn to control and pressure the d5 square',
    'Fianchetto the bishop to g2 for long-diagonal pressure',
    'Develop knights to c3 and f3 before committing the center',
    'Castle early and keep a flexible pawn structure',
    'Aim for a later d4 or e4 break once your pieces are ready',
  ],
  variations: [
    {
      id: 'symmetrical',
      name: 'Symmetrical Variation',
      trigger: 'Black mirrors with 1...c5, the solid and most common reply.',
      steps: [
        {
          san: 'c4',
          explanation:
            'The English Opening: White controls the d5 square from the flank without blocking the center.',
        },
        {
          san: 'c5',
          explanation: 'Black mirrors, fighting for the d4 square symmetrically.',
        },
        {
          san: 'Nf3',
          explanation: 'White develops a knight and prepares a kingside fianchetto.',
        },
        {
          san: 'Nc6',
          explanation: 'Black develops a knight toward the center, mirroring again.',
        },
        {
          san: 'g3',
          explanation: 'White prepares to fianchetto the bishop onto the long diagonal.',
        },
        {
          san: 'g6',
          explanation: 'Black copies the plan, heading for a fianchetto as well.',
        },
        {
          san: 'Bg2',
          explanation:
            'The bishop takes the long diagonal, eyeing the center and the d5 square.',
        },
        {
          san: 'Bg7',
          explanation: 'Black develops the bishop to the symmetrical long diagonal.',
        },
        {
          san: 'Nc3',
          explanation: 'White develops the second knight, adding control over d5 and e4.',
        },
        {
          san: 'Nf6',
          explanation: 'Black develops the knight and contests the center squares.',
        },
        {
          san: 'O-O',
          explanation: 'White castles, tucking the king safely behind the fianchetto.',
        },
        {
          san: 'O-O',
          explanation: 'Black castles too, completing a sound symmetrical setup.',
        },
      ],
    },
    {
      id: 'reversed-sicilian',
      name: 'Reversed Sicilian',
      trigger: 'If Black plays 1...e5, giving White a Sicilian Defense with an extra tempo.',
      steps: [
        {
          san: 'c4',
          explanation: 'White opens with the English, controlling d5 from the side.',
        },
        {
          san: 'e5',
          explanation:
            "Black grabs central space; this is a Sicilian Defense reversed, with White a tempo up.",
        },
        {
          san: 'Nc3',
          explanation: 'White develops a knight and fights for the key d5 square.',
        },
        {
          san: 'Nf6',
          explanation: 'Black develops and defends, eyeing the e4 and d5 squares.',
        },
        {
          san: 'Nf3',
          explanation: 'White develops the second knight and pressures the e5 pawn.',
        },
        {
          san: 'Nc6',
          explanation: 'Black defends the e5 pawn with a natural developing move.',
        },
        {
          san: 'g3',
          explanation: 'White prepares the fianchetto, the heart of the English setup.',
        },
        {
          san: 'd5',
          explanation:
            'Black strikes in the center to gain space, the most challenging try.',
        },
        {
          san: 'cxd5',
          explanation: 'White captures, opening the c-file and undermining the center.',
        },
        {
          san: 'Nxd5',
          explanation: 'Black recaptures with the knight, centralizing it.',
        },
        {
          san: 'Bg2',
          explanation:
            'The bishop completes the fianchetto and pressures the d5 knight along the long diagonal.',
        },
        {
          san: 'Nb6',
          explanation: 'Black retreats the knight to a safe square, keeping the structure intact.',
        },
        {
          san: 'O-O',
          explanation: 'White castles, finishing a harmonious and flexible development.',
        },
        {
          san: 'Be7',
          explanation: 'Black develops the bishop and prepares to castle next.',
        },
      ],
    },
  ],
};

export default englishOpening;
