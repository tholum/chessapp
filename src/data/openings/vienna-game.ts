import type { Opening } from '../../types';

const viennaGame: Opening = {
  id: 'vienna-game',
  name: 'Vienna Game',
  eco: 'C25',
  side: 'white',
  summary:
    'A flexible king-pawn opening where White develops the queen’s knight to c3 first, supporting a later f4 break or a calm, solid setup. It blends classical development with the option of a kingside pawn storm.',
  whyBeginner:
    'The Vienna develops a piece toward the center on move two and keeps White’s plans simple: finish development, castle, and decide later whether to play the aggressive f4 or stay solid. The patterns are natural and forgiving.',
  keyIdeas: [
    'Develop the knight to c3 to support the center',
    'Keep the option of an f4 pawn break for kingside play',
    'Fianchetto or develop the bishop and castle quickly',
    'Control the center before launching any attack',
    'Stay flexible — choose between solid and aggressive plans',
  ],
  variations: [
    {
      id: 'main-g3',
      name: 'Main Line with g3',
      trigger: 'Black develops classically with 2...Nc6 and 3...Nf6 — White chooses a solid fianchetto setup.',
      steps: [
        {
          san: 'e4',
          explanation:
            'White claims the center and opens lines for the queen and bishop.',
        },
        {
          san: 'e5',
          explanation: 'Black mirrors, contesting the center.',
        },
        {
          san: 'Nc3',
          explanation:
            'The Vienna move: White develops the knight, defending e4 and eyeing d5.',
        },
        {
          san: 'Nc6',
          explanation: 'Black develops a knight and supports the e5 pawn.',
        },
        {
          san: 'g3',
          explanation:
            'White prepares to fianchetto the bishop, controlling the long light-squared diagonal.',
        },
        {
          san: 'Nf6',
          explanation:
            'Black develops the knight and pressures the e4 pawn.',
        },
        {
          san: 'Bg2',
          explanation:
            'White completes the fianchetto; the bishop bears down on the center and queenside.',
        },
        {
          san: 'Bc5',
          explanation:
            'Black develops the bishop actively, aiming at White’s f2 square.',
        },
        {
          san: 'Nge2',
          explanation:
            'White develops the other knight, keeping the f-pawn free to advance later.',
        },
        {
          san: 'd6',
          explanation:
            'Black supports e5 and opens a path for the light-squared bishop.',
        },
        {
          san: 'O-O',
          explanation:
            'White castles, tucking the king safely behind the fianchettoed bishop.',
        },
        {
          san: 'O-O',
          explanation: 'Black castles too, completing development.',
        },
      ],
    },
    {
      id: 'vienna-gambit',
      name: 'Vienna Gambit',
      trigger: 'If Black plays 2...Nf6, White can offer the sharp 3.f4 gambit.',
      steps: [
        { san: 'e4', explanation: 'White takes the center.' },
        { san: 'e5', explanation: 'Black contests the center.' },
        {
          san: 'Nc3',
          explanation: 'White develops the knight, defending e4.',
        },
        {
          san: 'Nf6',
          explanation: 'Black develops and attacks the e4 pawn.',
        },
        {
          san: 'f4',
          explanation:
            'The Vienna Gambit: White attacks e5 and opens the f-file for a kingside assault.',
        },
        {
          san: 'd5',
          explanation:
            "Black's strongest reply, hitting back in the center rather than grabbing the f4 pawn.",
        },
        {
          san: 'fxe5',
          explanation: 'White captures the e5 pawn, opening lines.',
        },
        {
          san: 'Nxe4',
          explanation:
            'Black grabs the e4 pawn with the knight, keeping material balance.',
        },
        {
          san: 'Nf3',
          explanation:
            'White develops the knight, controls e5, and prepares to castle.',
        },
        {
          san: 'Be7',
          explanation: 'Black develops the bishop and prepares to castle.',
        },
        {
          san: 'd3',
          explanation:
            'White challenges the e4-knight, gaining time and central space.',
        },
        {
          san: 'Nxc3',
          explanation:
            'Black trades the knight before it gets chased away.',
        },
        {
          san: 'bxc3',
          explanation:
            'White recaptures, reinforcing the center and opening the b-file.',
        },
      ],
    },
  ],
};

export default viennaGame;
