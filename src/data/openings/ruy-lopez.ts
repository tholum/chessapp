import type { Opening } from '../../types';

const ruyLopez: Opening = {
  id: 'ruy-lopez',
  name: 'Ruy Lopez (Spanish)',
  eco: 'C60',
  side: 'white',
  summary:
    'One of the oldest and most respected openings, where White pins or pressures the knight defending e5 with Bb5, building long-term positional pressure.',
  whyBeginner:
    'It teaches deep opening principles: indirect pressure on the center, smart piece placement, and the value of the bishop pair, while remaining solid and well-mapped.',
  keyIdeas: [
    'Apply indirect pressure on e5 via the pinned knight',
    'Keep the strong light-squared bishop active and retreat it rather than trade',
    'Castle early and use Re1 to support the center',
    'Aim for the d4 break to challenge Black\'s center later',
    'Play for slow positional buildup and the bishop pair',
  ],
  variations: [
    {
      id: 'main',
      name: 'Main Line',
      trigger: 'The Morphy Defense with 3...a6, the classical main line.',
      steps: [
        {
          san: 'e4',
          explanation: 'White claims the center and frees pieces.',
        },
        {
          san: 'e5',
          explanation: 'Black contests the center symmetrically.',
        },
        {
          san: 'Nf3',
          explanation: 'White develops and attacks the e5 pawn.',
        },
        {
          san: 'Nc6',
          explanation: 'Black defends e5 with a developing move.',
        },
        {
          san: 'Bb5',
          explanation:
            'The Spanish move: the bishop pins the knight to indirectly pressure the e5 pawn.',
        },
        {
          san: 'a6',
          explanation:
            "Black's Morphy Defense, asking the bishop to declare its intentions.",
        },
        {
          san: 'Ba4',
          explanation:
            'White keeps the bishop on the strong diagonal rather than trading it off.',
        },
        {
          san: 'Nf6',
          explanation: 'Black develops and attacks the e4 pawn, gaining a tempo.',
        },
        {
          san: 'O-O',
          explanation:
            "White castles to safety and sidesteps worries about defending e4 (it's protected indirectly).",
        },
        {
          san: 'Be7',
          explanation:
            'Black develops the bishop to a solid square, preparing to castle.',
        },
        {
          san: 'Re1',
          explanation:
            'White puts the rook on the e-file, reinforcing the e4 pawn and central pressure.',
        },
        {
          san: 'b5',
          explanation: 'Black gains space on the queenside and kicks the bishop away.',
        },
        {
          san: 'Bb3',
          explanation:
            'The bishop retreats to a great diagonal, again eyeing the sensitive f7 square.',
        },
        {
          san: 'd6',
          explanation:
            'Black solidifies e5 and opens lines for development, reaching a classic Closed Ruy Lopez.',
        },
      ],
    },
    {
      id: 'berlin',
      name: 'Berlin Defense',
      trigger: 'If Black plays the rock-solid 3...Nf6, attacking e4 immediately.',
      steps: [
        { san: 'e4', explanation: 'White claims the center.' },
        { san: 'e5', explanation: 'Black contests the center.' },
        { san: 'Nf3', explanation: 'White develops and hits e5.' },
        { san: 'Nc6', explanation: 'Black defends the e5 pawn.' },
        {
          san: 'Bb5',
          explanation: 'The Spanish bishop pins the knight defending e5.',
        },
        {
          san: 'Nf6',
          explanation:
            "Black ignores the bishop and counterattacks e4 — the famously solid Berlin Defense.",
        },
        {
          san: 'O-O',
          explanation:
            'White castles, calmly offering the e4 pawn since recaptures regain it with a lead in development.',
        },
        {
          san: 'Nxe4',
          explanation: 'Black grabs the pawn, the main point of the Berlin.',
        },
        {
          san: 'd4',
          explanation:
            'White strikes in the center, opening lines and challenging the e5 pawn.',
        },
        {
          san: 'Nd6',
          explanation: 'Black retreats the knight, attacking the b5 bishop.',
        },
        {
          san: 'Bxc6',
          explanation: 'White trades to damage Black\'s pawns and regain material balance.',
        },
        {
          san: 'dxc6',
          explanation: 'Black recaptures, keeping the structure compact toward the center.',
        },
        {
          san: 'dxe5',
          explanation: 'White wins back the pawn, reaching the famous Berlin endgame structure.',
        },
        {
          san: 'Nf5',
          explanation: 'Black repositions the knight to an active square eyeing d4 and e3.',
        },
      ],
    },
    {
      id: 'exchange',
      name: 'Exchange Variation',
      trigger: 'After 3...a6, White trades on c6 to win the simple, structural battle.',
      steps: [
        { san: 'e4', explanation: 'White claims the center.' },
        { san: 'e5', explanation: 'Black contests the center.' },
        { san: 'Nf3', explanation: 'White develops and attacks e5.' },
        { san: 'Nc6', explanation: 'Black defends the e5 pawn.' },
        { san: 'Bb5', explanation: 'The Spanish pin on the c6 knight.' },
        {
          san: 'a6',
          explanation: "Black's Morphy Defense, questioning the bishop.",
        },
        {
          san: 'Bxc6',
          explanation:
            'The Exchange Variation: White trades the bishop to give Black doubled c-pawns.',
        },
        {
          san: 'dxc6',
          explanation:
            'Black recaptures toward the center, opening the diagonal for the c8-bishop.',
        },
        {
          san: 'O-O',
          explanation:
            'White castles, planning to play on the healthier kingside pawn majority.',
        },
        {
          san: 'f6',
          explanation: 'Black solidly defends the e5 pawn to keep the center intact.',
        },
        {
          san: 'd4',
          explanation: 'White strikes at the center to open the position for the better structure.',
        },
        {
          san: 'exd4',
          explanation: 'Black captures to avoid losing the e5 pawn.',
        },
        {
          san: 'Nxd4',
          explanation: 'White recaptures with a centralized knight and an easy, pleasant game.',
        },
      ],
    },
  ],
};

export default ruyLopez;
